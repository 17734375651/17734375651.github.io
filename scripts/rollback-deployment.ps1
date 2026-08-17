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
$primaryCommit = [string]$manifest.content.primaryCommit
$contactCopyFixCommit = [string]$manifest.content.contactCopyFixCommit
$baseCommit = [string]$manifest.base.commit
$remote = [string]$manifest.remote
$repository = [string]$manifest.repository
$publicUrl = [string]$manifest.publicUrl
$docsPath = Join-Path $repo ([string]$manifest.modifiedArtifact)
$patchPath = Join-Path $repo ([string]$manifest.patch.path)

Push-Location $repo
try {
    git rev-parse --is-inside-work-tree | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'RepoRoot is not a Git worktree.' }

    git cat-file -e "$primaryCommit`^{commit}"
    if ($LASTEXITCODE -ne 0) { throw "Primary content commit is unavailable: $primaryCommit" }

    git cat-file -e "$contactCopyFixCommit`^{commit}"
    if ($LASTEXITCODE -ne 0) { throw "Contact-copy fix commit is unavailable: $contactCopyFixCommit" }

    git merge-base --is-ancestor $baseCommit $primaryCommit
    if ($LASTEXITCODE -ne 0) { throw 'The recorded base is not an ancestor of the primary content commit.' }

    if (-not (Test-Path -LiteralPath $patchPath -PathType Leaf)) {
        throw "Rollback patch is missing: $patchPath"
    }
    $patchHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $patchPath).Hash.ToLowerInvariant()
    if ($patchHash -ne [string]$manifest.patch.sha256) {
        throw "Rollback patch hash mismatch: $patchHash"
    }

    if (-not (Test-Path -LiteralPath (Join-Path $docsPath 'index.html') -PathType Leaf)) {
        throw 'Modified artifact is missing docs/index.html.'
    }
    if (-not (Test-Path -LiteralPath (Join-Path $docsPath 'products\index.html') -PathType Leaf)) {
        throw 'Modified artifact is missing docs/products/index.html.'
    }

    Write-Output "MODE=$Mode"
    Write-Output "REPO=$repo"
    Write-Output "BASE_COMMIT=$baseCommit"
    Write-Output "PRIMARY_CONTENT_COMMIT=$primaryCommit"
    Write-Output "CONTACT_COPY_FIX_COMMIT=$contactCopyFixCommit"
    Write-Output "PATCH_SHA256=$patchHash"
    Write-Output "PUBLIC_URL=$publicUrl"
    Write-Output 'TARGET_PAGES_SOURCE=main:/docs'
    Write-Output 'ROLLBACK_PAGES_SOURCE=main:/'

    git apply --check -R --binary $patchPath
    if ($LASTEXITCODE -ne 0) { throw 'Reverse patch check failed.' }
    Write-Output 'REVERSE_PATCH_CHECK=PASS'

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

    git apply -R --binary $patchPath
    if ($LASTEXITCODE -ne 0) { throw 'Reverse patch apply failed.' }

    git add -- .gitignore docs site
    if ($LASTEXITCODE -ne 0) { throw 'Failed to stage rollback content.' }

    git commit -m 'rollback website deployment to baseline'
    if ($LASTEXITCODE -ne 0) { throw 'Rollback commit failed.' }

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
