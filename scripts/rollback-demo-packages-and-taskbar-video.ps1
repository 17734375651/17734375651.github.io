[CmdletBinding()]
param(
    [switch]$Apply,
    [string]$BaselineCommit = '599c3860f005717a7b6e2b686809f01184e2b891'
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location -LiteralPath $repoRoot

git cat-file -e "$BaselineCommit`^{commit}"
if ($LASTEXITCODE -ne 0) {
    throw "Baseline commit is unavailable: $BaselineCommit"
}

if (-not $Apply) {
    Write-Output 'rollback_mode=dry-run'
    Write-Output "baseline=$BaselineCommit"
    Write-Output 'scope=label/pdf demo packages, product attachment wiring, taskbar-free bleed video, generated Pages docs, tests and QA artifacts'
    Write-Output 'next=powershell -NoProfile -File scripts/rollback-demo-packages-and-taskbar-video.ps1 -Apply'
    exit 0
}

if (git status --porcelain) {
    throw 'Rollback requires a clean working tree so unrelated work is not overwritten.'
}

# Restore both the index and worktree to the release baseline. Paths introduced
# by this release are removed; prior tracked media and Pages output are restored.
git restore --source $BaselineCommit --staged --worktree -- .
if ($LASTEXITCODE -ne 0) {
    throw 'git restore failed'
}

Write-Output "rollback_applied=$BaselineCommit"
Write-Output 'expected=working tree now contains the complete inverse of this release'
Write-Output 'next=review the inverse diff, commit it, and push the deployment branch'
