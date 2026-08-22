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
$InitialReleaseCommit = 'aa7394eebe8de88d27ac4f025397d3fbbd717ff3'
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
if ($TargetCommit -eq $InitialReleaseCommit -or $commitAndParents.Count -ne 2 -or $commitAndParents[1] -ne $InitialReleaseCommit) {
    throw "Rollback target must be the single corrective child of $InitialReleaseCommit."
}

$originUrl = Get-GitFirstLine remote get-url origin
if ($originUrl -notmatch 'github\.com[:/]17734375651/17734375651\.github\.io(?:\.git)?$') {
    throw "Unexpected origin remote: $originUrl"
}
Invoke-Git cat-file '-e' "${TargetCommit}:docs/index.html" | Out-Null
Invoke-Git cat-file '-e' "${TargetCommit}:docs/.nojekyll" | Out-Null

$baselineChanged = @(Invoke-Git diff '--name-only' $BaselineCommit $TargetCommit)
$baselineRequired = @(
    'site/src/data/products.js',
    'site/src/data/site.js',
    'site/src/data/public-content.js',
    'site/scripts/generate-route-pages.mjs',
    'docs/products/multisize-bleed/index.html',
    'downloads/fangcun-multisize/0.9.0/public-manifest.json'
)
foreach ($path in $baselineRequired) {
    if ($baselineChanged -notcontains $path) {
        throw "Rollback target does not contain expected path: $path"
    }
}

$correctionChanged = @(Invoke-Git diff '--name-only' $InitialReleaseCommit $TargetCommit)
$correctionRequired = @(
    'downloads/fangcun-multisize/0.9.0/public-manifest.json',
    'downloads/fangcun-multisize/0.9.0/release-record.json',
    'downloads/fangcun-multisize/0.9.0/SHA256SUMS.txt',
    'site/src/data/products.js',
    'site/src/data/public-content.js',
    'site/tests/client-release-contract.test.mjs'
)
$correctionAllowed = @(
    'docs/404.html',
    'docs/assets/main-CC2Qy1_h.js',
    'docs/assets/main-Dg2edJKj.js',
    'docs/custom/requirements/index.html',
    'docs/downloads/index.html',
    'docs/guides/index.html',
    'docs/index.html',
    'docs/legal/privacy/index.html',
    'docs/legal/service/index.html',
    'docs/products/bleed/index.html',
    'docs/products/index.html',
    'docs/products/label/index.html',
    'docs/products/multisize-bleed/index.html',
    'docs/products/pdf/index.html',
    'docs/solutions/index.html',
    'docs/updates/index.html',
    'downloads/fangcun-multisize/0.9.0/SHA256SUMS.txt',
    'downloads/fangcun-multisize/0.9.0/public-manifest.json',
    'downloads/fangcun-multisize/0.9.0/release-record.json',
    'scripts/rollback-multisize-bleed-site.ps1',
    'site/downloads/index.html',
    'site/src/data/products.js',
    'site/src/data/public-content.js',
    'site/tests/client-release-contract.test.mjs'
)
foreach ($path in $correctionRequired) {
    if ($correctionChanged -notcontains $path) {
        throw "Corrective commit does not contain expected path: $path"
    }
}
$unexpectedCorrectionPaths = @($correctionChanged | Where-Object { $_ -notin $correctionAllowed })
if ($unexpectedCorrectionPaths.Count -ne 0) {
    throw "Corrective commit contains unexpected paths: $($unexpectedCorrectionPaths -join ', ')"
}

Write-Output "ROLLBACK_MODE=$Mode"
Write-Output "BASELINE_COMMIT=$BaselineCommit"
Write-Output "TARGET_COMMIT=$TargetCommit"
Write-Output 'TARGET_PAGES_SOURCE=main:/docs'
Write-Output "BASELINE_EXPECTED_PATHS=$($baselineRequired.Count)"
Write-Output "CORRECTION_PATHS=$($correctionChanged.Count)"

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
    Invoke-Git restore '--source' $BaselineCommit '--staged' '--worktree' '--' '.' | Out-Null
    $stagedTree = Get-GitFirstLine write-tree
    $baselineTree = Get-GitFirstLine rev-parse "$BaselineCommit^{tree}"
    if ($stagedTree -ne $baselineTree) {
        throw "Prepared rollback tree mismatch: expected $baselineTree, actual $stagedTree"
    }
    Invoke-Git commit '-m' 'Revert multi-size bleed-cut site release' | Out-Null
    $revertedHead = Get-GitFirstLine rev-parse 'HEAD'
    $revertedTree = Get-GitFirstLine rev-parse 'HEAD^{tree}'
    $baselineTree = Get-GitFirstLine rev-parse "$BaselineCommit^{tree}"
    if ($revertedTree -ne $baselineTree) {
        throw "Reverted tree mismatch: expected $baselineTree, actual $revertedTree"
    }
}
catch {
    & git -C $RepositoryRoot reset '--hard' $TargetCommit | Out-Null
    throw
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
    if ($LASTEXITCODE -ne 0 -or $tagCommit -ne $InitialReleaseCommit) {
        throw "Release tag $ReleaseTag does not resolve to initial release commit $InitialReleaseCommit."
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
