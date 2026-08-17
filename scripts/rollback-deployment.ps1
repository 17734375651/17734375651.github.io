[CmdletBinding()]
param(
    [ValidateSet('Check', 'Apply')]
    [string]$Mode = 'Check',

    [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path -LiteralPath $RepoRoot).Path
$manifestPath = Join-Path $repo 'artifacts\deployment-manifest.json'

if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    throw "Deployment manifest missing: $manifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
$contentCommit = [string]$manifest.content.commit
$baseCommit = [string]$manifest.base.commit
$remote = [string]$manifest.remote
$repository = [string]$manifest.repository
$publicUrl = [string]$manifest.publicUrl
$docsPath = Join-Path $repo ([string]$manifest.modifiedArtifact)

Push-Location $repo
try {
    git rev-parse --is-inside-work-tree | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'RepoRoot is not a Git worktree.' }

    git cat-file -e "$contentCommit`^{commit}"
    if ($LASTEXITCODE -ne 0) { throw "Content commit is unavailable: $contentCommit" }

    git merge-base --is-ancestor $baseCommit $contentCommit
    if ($LASTEXITCODE -ne 0) { throw 'The recorded base is not an ancestor of the content commit.' }

    if (-not (Test-Path -LiteralPath (Join-Path $docsPath 'index.html') -PathType Leaf)) {
        throw 'Modified artifact is missing docs/index.html.'
    }
    if (-not (Test-Path -LiteralPath (Join-Path $docsPath 'products\index.html') -PathType Leaf)) {
        throw 'Modified artifact is missing docs/products/index.html.'
    }

    Write-Output "MODE=$Mode"
    Write-Output "REPO=$repo"
    Write-Output "BASE_COMMIT=$baseCommit"
    Write-Output "CONTENT_COMMIT=$contentCommit"
    Write-Output "PUBLIC_URL=$publicUrl"
    Write-Output 'TARGET_PAGES_SOURCE=main:/docs'
    Write-Output 'ROLLBACK_PAGES_SOURCE=main:/'

    if ($Mode -eq 'Check') {
        if (Get-Command gh -ErrorAction SilentlyContinue) {
            try {
                $pages = gh api "repos/$repository/pages" 2>$null | ConvertFrom-Json
                if ($LASTEXITCODE -eq 0) {
                    Write-Output ("CURRENT_PAGES_SOURCE={0}:{1}" -f $pages.source.branch, $pages.source.path)
                }
            } catch {
                Write-Output 'CURRENT_PAGES_SOURCE=unavailable'
            }
        }
        Write-Output 'CHECK_RESULT=PASS'
        exit 0
    }

    $branch = (git branch --show-current).Trim()
    if ($branch -ne 'main') {
        throw "Apply mode must run from main; current branch is '$branch'."
    }
    $dirty = git status --porcelain
    if ($dirty) {
        throw 'Apply mode requires a clean working tree.'
    }

    git revert --no-edit $contentCommit
    if ($LASTEXITCODE -ne 0) { throw 'git revert failed.' }

    git push $remote main
    if ($LASTEXITCODE -ne 0) { throw 'git push failed.' }

    gh api -X PUT "repos/$repository/pages" -f 'source[branch]=main' -f 'source[path]=/' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'GitHub Pages source update failed.' }

    $confirmed = gh api "repos/$repository/pages" | ConvertFrom-Json
    if ($LASTEXITCODE -ne 0) { throw 'GitHub Pages source verification failed.' }
    if ($confirmed.source.branch -ne 'main' -or $confirmed.source.path -ne '/') {
        throw 'GitHub Pages source did not return to main:/.'
    }

    Write-Output 'APPLY_RESULT=PASS'
    Write-Output ("CURRENT_PAGES_SOURCE={0}:{1}" -f $confirmed.source.branch, $confirmed.source.path)
} finally {
    Pop-Location
}
