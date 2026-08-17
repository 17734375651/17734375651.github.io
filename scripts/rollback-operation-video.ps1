[CmdletBinding()]
param(
    [switch]$Apply,
    [string]$BaselineCommit = 'c74a86fdf1b35240125edca5f19d394e891eb1b5'
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location -LiteralPath $repoRoot

git cat-file -e "$BaselineCommit`^{commit}"
if ($LASTEXITCODE -ne 0) {
    throw "Baseline commit is unavailable: $BaselineCommit"
}

$trackedPaths = @(
    'site/src/App.jsx',
    'site/src/data/content.js',
    'site/src/data/products.js',
    'site/src/data/public-content.js',
    'site/src/data/site.js',
    'site/src/styles.css',
    'site/public/assets/media/bleed-operation-poster.webp',
    'site/public/assets/media/bleed-operation-redacted.mp4',
    'site/tests/media-contract.test.mjs',
    'site/tests/ui-content-contract.test.mjs',
    'docs'
)

$newFiles = @(
    'site/public/assets/downloads/bleed-redacted-demo-materials-20260814.zip',
    'site/public/assets/media/bleed-operation-sanitized-poster.webp',
    'site/public/assets/media/bleed-operation-sanitized.mp4',
    'site/tests/sanitized-video-build-contract.test.mjs',
    'scripts/build-sanitized-operation-video.ps1',
    'docs/assets/downloads/bleed-redacted-demo-materials-20260814.zip',
    'docs/assets/media/bleed-operation-sanitized-poster.webp',
    'docs/assets/media/bleed-operation-sanitized.mp4'
)

if (-not $Apply) {
    Write-Output "rollback_mode=dry-run"
    Write-Output "baseline=$BaselineCommit"
    Write-Output "restore=$($trackedPaths -join ',')"
    Write-Output "remove=$($newFiles -join ',')"
    Write-Output 'next=powershell -NoProfile -File scripts/rollback-operation-video.ps1 -Apply'
    exit 0
}

if (git status --porcelain) {
    throw 'Rollback requires a clean working tree so unrelated work is not overwritten.'
}

git restore --source $BaselineCommit -- $trackedPaths
if ($LASTEXITCODE -ne 0) {
    throw 'git restore failed'
}

foreach ($relativePath in $newFiles) {
    $candidate = [System.IO.Path]::GetFullPath((Join-Path $repoRoot $relativePath))
    if (-not $candidate.StartsWith($repoRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to remove a path outside the repository: $candidate"
    }
    if (Test-Path -LiteralPath $candidate) {
        Remove-Item -LiteralPath $candidate -Force
    }
}

Write-Output "rollback_applied=$BaselineCommit"
Write-Output 'next=review changes, commit, and push to the deployment branch'
