[CmdletBinding()]
param(
    [ValidateSet('Check', 'Apply')]
    [string]$Mode = 'Check',
    [string]$RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string]$TargetCommit = '',
    [switch]$Push,
    [switch]$RemoveRelease
)

$ErrorActionPreference = 'Stop'
$BaselineCommit = '736035cede985436a023d633f6c0ded40d71240b'
$ReleaseTag = 'fangcun-multisize-0.9.0'
$Repository = '17734375651/17734375651.github.io'

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
    $output = & git -C $RepositoryRoot @Arguments 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Arguments -join ' ') failed ($LASTEXITCODE): $($output -join [Environment]::NewLine)"
    }
    return @($output)
}

function Get-GitFirstLine {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
    $lines = @(Invoke-Git @Arguments)
    if ($lines.Count -eq 0) {
        throw "git $($Arguments -join ' ') returned no output."
    }
    return ([string]$lines[0]).Trim()
}

$RepositoryRoot = [IO.Path]::GetFullPath($RepositoryRoot)
if (-not (Test-Path -LiteralPath (Join-Path $RepositoryRoot '.git'))) {
    throw "Not a Git worktree: $RepositoryRoot"
}

Invoke-Git cat-file '-e' "$BaselineCommit^{commit}" | Out-Null
if (-not $TargetCommit) {
    $TargetCommit = Get-GitFirstLine rev-parse 'HEAD'
}
Invoke-Git cat-file '-e' "$TargetCommit^{commit}" | Out-Null
Invoke-Git merge-base '--is-ancestor' $BaselineCommit $TargetCommit | Out-Null

$parentLine = Get-GitFirstLine rev-list '--parents' '-n' '1' $TargetCommit
$commitAndParents = @($parentLine -split '\s+' | Where-Object { $_ })
if ($commitAndParents.Count -ne 2 -or $commitAndParents[1] -ne $BaselineCommit) {
    throw "Rollback target must be the single direct child of baseline $BaselineCommit."
}

$originUrl = Get-GitFirstLine remote get-url origin
if ($originUrl -notmatch 'github\.com[:/]17734375651/17734375651\.github\.io(?:\.git)?$') {
    throw "Unexpected origin remote: $originUrl"
}
Invoke-Git cat-file '-e' "${TargetCommit}:docs/index.html" | Out-Null
Invoke-Git cat-file '-e' "${TargetCommit}:docs/.nojekyll" | Out-Null

$changed = Invoke-Git diff '--name-only' $BaselineCommit $TargetCommit
$required = @(
    'site/src/data/products.js',
    'site/src/data/site.js',
    'site/src/data/public-content.js',
    'site/scripts/generate-route-pages.mjs',
    'docs/products/multisize-bleed/index.html',
    'downloads/fangcun-multisize/0.9.0/public-manifest.json'
)
foreach ($path in $required) {
    if ($changed -notcontains $path) {
        throw "Rollback target does not contain expected path: $path"
    }
}

Write-Output "ROLLBACK_MODE=$Mode"
Write-Output "BASELINE_COMMIT=$BaselineCommit"
Write-Output "TARGET_COMMIT=$TargetCommit"
Write-Output 'TARGET_PAGES_SOURCE=main:/docs'
Write-Output "EXPECTED_PATHS=$($required.Count)"

if ($Mode -eq 'Check') {
    Write-Output 'ROLLBACK_CHECK=PASS'
    exit 0
}

$status = Invoke-Git status '--porcelain=v1'
if ($status.Count -ne 0) {
    throw 'Apply requires a clean worktree.'
}
$head = Get-GitFirstLine rev-parse 'HEAD'
if ($head -ne $TargetCommit) {
    throw "Apply requires HEAD=$TargetCommit, actual HEAD=$head"
}

try {
    Invoke-Git revert '--no-commit' $TargetCommit | Out-Null
    $stagedTree = Get-GitFirstLine write-tree
    $baselineTree = Get-GitFirstLine rev-parse "$BaselineCommit^{tree}"
    if ($stagedTree -ne $baselineTree) {
        throw "Prepared rollback tree mismatch: expected $baselineTree, actual $stagedTree"
    }
    Invoke-Git commit '-m' 'Revert "Add multi-size bleed-cut product"' | Out-Null
}
catch {
    & git -C $RepositoryRoot revert '--abort' 2>$null
    & git -C $RepositoryRoot reset '--hard' $TargetCommit | Out-Null
    throw
}
$revertedHead = Get-GitFirstLine rev-parse 'HEAD'
$revertedTree = Get-GitFirstLine rev-parse 'HEAD^{tree}'
$baselineTree = Get-GitFirstLine rev-parse "$BaselineCommit^{tree}"
if ($revertedTree -ne $baselineTree) {
    throw "Reverted tree mismatch: expected $baselineTree, actual $revertedTree"
}

if ($Push) {
    Invoke-Git push origin 'HEAD:main' | Out-Null
    $remoteMain = Get-GitFirstLine ls-remote origin 'refs/heads/main'
    $remoteMainCommit = @($remoteMain -split '\s+' | Where-Object { $_ })[0]
    if ($remoteMainCommit -ne $revertedHead) {
        throw "Remote main verification failed: expected $revertedHead, actual $remoteMainCommit"
    }
}
if ($RemoveRelease) {
    $tagCommit = (& gh api "repos/$Repository/commits/$ReleaseTag" --jq '.sha' 2>&1 | Select-Object -First 1).ToString().Trim()
    if ($LASTEXITCODE -ne 0 -or $tagCommit -ne $TargetCommit) {
        throw "Release tag $ReleaseTag does not resolve to target commit $TargetCommit."
    }
    & gh release delete $ReleaseTag --repo $Repository --yes --cleanup-tag
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to remove release $ReleaseTag"
    }
}

Write-Output "REVERT_COMMIT=$revertedHead"
Write-Output 'REVERT_TREE_MATCH_BASELINE=True'
Write-Output "PUSHED=$([bool]$Push)"
Write-Output "RELEASE_REMOVED=$([bool]$RemoveRelease)"
Write-Output 'ROLLBACK_APPLY=PASS'
