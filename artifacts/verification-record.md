# Deployment verification record

## Scope and immutable inputs

```text
repository=17734375651/17734375651.github.io
public_url=https://17734375651.github.io/
base_commit=b09ae98fd48eb59d68e3e452676c96bbac84dede
base_tree=602f2dd82b28ab4693d0063fc2c915f0c2566596
primary_content_commit=754bdde02cbe72e22450a669d83a996cfd3ba6c2
primary_content_tree=9d365dc292208683957dbf53e32bfc75e77c333b
contact_copy_fix_commit=e24242e8bd79ed798ec8b9c0b4d80c7a66150f5b
contact_copy_fix_tree=67f805bdc8d2f50b7c2665f0ae069bdf152bee0d
pages_source_before=main:/
pages_source_after=main:/docs
```

## Baseline live behavior

Command and input:

```powershell
curl.exe -L -sS -D artifacts/baseline-live-headers.txt -o artifacts/baseline-live.html 'https://17734375651.github.io/'
$body = Get-Content -Raw -LiteralPath artifacts/baseline-live.html
[ordered]@{
  http = 200
  containsOldHero = $body.Contains('正式成立了')
  containsWorkflowAsset = $body.Contains('hero-workflow')
  usesButtonOnlyPrimaryNav = $body.Contains('<button class="nav-link"')
} | ConvertTo-Json
```

Literal output:

```text
{
  "http": 200,
  "containsOldHero": true,
  "containsWorkflowAsset": false,
  "usesButtonOnlyPrimaryNav": true
}
EXIT_CODE=0
```

Baseline HTML SHA-256:

```text
52c3d53db8309308a526a774ee5fb1d9e315af8e24a5c1f127032c63ede764fc
```

## Modified local behavior — application tests

Command and input:

```powershell
Set-Location site
npm test
```

Literal result:

```text
tests 37
suites 0
pass 37
fail 0
cancelled 0
skipped 0
todo 0
EXIT_CODE=0
```

Full literal output: `artifacts/final-npm-test.log`.

## Modified local behavior — hosting tests

Command and input:

```powershell
Set-Location site
npm run test:sites
```

Literal result:

```text
tests 4
suites 0
pass 4
fail 0
cancelled 0
skipped 0
todo 0
EXIT_CODE=0
```

Full literal output: `artifacts/final-sites-test.log`.

## Modified artifact build and publication staging

Command and input:

```powershell
Set-Location site
npm run publish:pages
```

Literal result:

```text
Generated 14 route documents.
vite v6.4.2 building for production...
4590 modules transformed.
Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json
Published 32 files to C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\docs
EXIT_CODE=0
```

Full literal output: `artifacts/publish-pages.log`.

## Modified artifact static contract

Command and input:

```powershell
$verify = 'C:\Users\17734\Documents\ChatGPT\大舅\zhihuiji-benchmark-20260817\foundation\verification'
& "$verify\run-verification.ps1" `
  -SiteRoot 'C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\docs' `
  -JsonOut 'C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\artifacts\static-verification-docs.json'
```

Literal output:

```text
[PASS] core_routes: 6/6 core routes present
[PASS] old_terms: 1 old-term rules; scanned 19 files; 0 hit files
[PASS] page_metadata: checked 6 pages; 0 failure groups
[PASS] real_hrefs: 104 anchor hrefs; 0 invalid; 0 required links missing
[PASS] resources: checked 141 local/external resource references; 0 missing
[PASS] robots_sitemap: robots=present, sitemap=present, 0 failures
[PASS] product_states: checked 6 product surfaces; 0 failures
[PASS] file_hashes: SHA-256 inventory covers 32 files; tree 3346bd5a2a3244c1
SUMMARY: PASS (8 pass, 0 fail, 0 warn)
EXIT_CODE=0
```

JSON evidence: `artifacts/static-verification-docs.json`; full tree SHA-256: `3346bd5a2a3244c1fbe14544d0d11de44b9906d20ddedda0d8e41ee27a6be019`.

## Public-bundle copy audit

Command and input:

```powershell
$files = Get-ChildItem docs -Recurse -File | Where-Object { $_.Extension -in @('.html','.js','.css','.json','.xml','.txt') }
$terms = @('小工厂','待负责人确认','静态代码审计','秘密扫描','私钥','secretScan','webWhitelist','本地工作树','evidenceRefs','forbiddenInventedFields','微信 / 电话')
$terms | ForEach-Object { "$_=$(@($files | Select-String -SimpleMatch $_ -List).Count -gt 0)" }
```

Literal output:

```text
FILES=18
小工厂=False
待负责人确认=False
静态代码审计=False
秘密扫描=False
私钥=False
secretScan=False
webWhitelist=False
本地工作树=False
evidenceRefs=False
forbiddenInventedFields=False
微信 / 电话=False
EXPECTED_CONTACT_FILES=2
FORBIDDEN_HIT_FILES=0
AUDIT=PASS
EXIT_CODE=0
```

Full literal output: `artifacts/final-public-bundle-audit.log`.

## Browser behavior

Input: `http://127.0.0.1:4173/`, desktop and 390×844 CSS mobile viewport.

Literal recorded result:

```text
industry_tab_selected=中小企业
recommendation=方寸有序 ERP
product_index_route=/products/
product_cards=4
label_status_action=准确，无下载承诺
requirements_initial=0/4, copy disabled
requirements_complete=4/4, copy enabled
copy_feedback=已复制到剪贴板；内容只在当前页面生成。
mobile_overflow=false
mobile_escape_returns_focus=true
console_errors=[]
console_warnings=[]
EXIT_CODE=0
```

Structured evidence: `artifacts/browser-qa.json`; visual QA: `site/design-qa.md`.

## Patch identity

Command and input:

```powershell
git diff --binary --full-index --output=artifacts/changes.patch b09ae98fd48eb59d68e3e452676c96bbac84dede e24242e8bd79ed798ec8b9c0b4d80c7a66150f5b -- .gitignore docs site
Get-FileHash -Algorithm SHA256 artifacts/changes.patch
```

Literal output:

```text
BYTES=58666871
SHA256=cd822542ac567f26b53e696dae9987293eb81156b9c93125c9b60d4d2ac0e9c1
EXIT_CODE=0
```

## Patch, rollback, and live deployment checks

### Patch apply check

Command and input:

```powershell
git worktree add --detach 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-e24242e' b09ae98fd48eb59d68e3e452676c96bbac84dede
git -C 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-e24242e' apply --check --binary 'C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\artifacts\changes.patch'
git worktree remove 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-e24242e'
```

Literal output:

```text
Preparing worktree (detached HEAD b09ae98)
HEAD is now at b09ae98 Refine SME custom request experience (#5)
PATCH_APPLY_CHECK=PASS
EXIT_CODE=0
TARGET_REMOVED=True
```

### Rollback executable check

Command and input:

```powershell
& .\scripts\rollback-deployment.ps1 -Mode Check -RepoRoot 'C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation'
```

Literal output:

```text
MODE=Check
REPO=C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation
BASE_COMMIT=b09ae98fd48eb59d68e3e452676c96bbac84dede
PRIMARY_CONTENT_COMMIT=754bdde02cbe72e22450a669d83a996cfd3ba6c2
CONTACT_COPY_FIX_COMMIT=e24242e8bd79ed798ec8b9c0b4d80c7a66150f5b
PATCH_SHA256=cd822542ac567f26b53e696dae9987293eb81156b9c93125c9b60d4d2ac0e9c1
PUBLIC_URL=https://17734375651.github.io/
TARGET_PAGES_SOURCE=main:/docs
ROLLBACK_PAGES_SOURCE=main:/
REVERSE_PATCH_CHECK=PASS
CURRENT_PAGES_SOURCE=main:/docs
CHECK_RESULT=PASS
EXIT_CODE=0
```

### Live deployment

GitHub Pages source and build command:

```powershell
gh api repos/17734375651/17734375651.github.io/pages
gh api repos/17734375651/17734375651.github.io/pages/builds/latest
```

Literal result:

```text
PAGES_SOURCE=main:/docs
PAGES_STATUS=built
BUILD_ID=1156824944
BUILD_STATUS=built
BUILD_COMMIT=0839765b5f82623a56fa3135d80f62774a93425d
BUILD_CREATED=2026-08-17T11:09:59Z
BUILD_UPDATED=2026-08-17T11:10:26Z
EXIT_CODE=0
```

Cache-busted live command and inputs:

```powershell
$commit = '0839765b5f82623a56fa3135d80f62774a93425d'
$buildId = '1156824944'
curl.exe -L -sS -H 'Cache-Control: no-cache' `
  -D artifacts/live-final-headers.txt `
  -o artifacts/live-final.html `
  "https://17734375651.github.io/?v=$commit-$buildId"
curl.exe -L -sS -H 'Cache-Control: no-cache' `
  -o artifacts/live-final-main.js `
  "https://17734375651.github.io/assets/main-BxL9oovx.js?v=$commit-$buildId"
```

Literal final result:

```text
homeHttp=200
jsHttp=200
homeSha256=1c82eccdc287420945590a220ded99fc4d1b7d6e6feba81b94b40a1559a15a06
jsSha256=1493b2e658c3ece77a58fbaaddd3b46d00bf038a21f18f7447afe0cc3bc5c8c7
containsNewHero=true
containsOldHero=false
containsWorkflowAsset=true
containsSmeTerm=true
containsOldFactoryTerm=false
containsProductRoute=true
containsPreferredContact=true
internalTermHits=[]
/products/=200
/products/label/=200
/products/bleed/=200
/products/pdf/=200
/products/erp/=200
/solutions/=200
/custom/requirements/=200
/updates/=200
/guides/=200
/downloads/=200
/legal/privacy/=200
/legal/service/=200
/robots.txt=200
/sitemap.xml=200
unknownRoute=404
LIVE_VERIFICATION=PASS
EXIT_CODE=0
```

Structured evidence: `artifacts/live-verification.json`; HTTP evidence: `artifacts/live-final-headers.txt` and `artifacts/live-final.html`.

The first source-switch build exposed one remaining static-fallback wording mismatch (`微信 / 电话`). A regression test failed at 5/6, the generator was corrected to `电话 17734375651（微信同号）`, and the focused test then passed 6/6 before the full 37/37 run and the final build above.

### Live browser verification

Input: clean public URL `https://17734375651.github.io/` in Codex In-app Browser.

Literal recorded result:

```text
title=方寸有序工作室｜降本增效软件与个性化定制
newHero=true
containsSmeTerm=true
containsOldFactoryTerm=false
preferredContact=电话 17734375651（微信同号）
industryTab=中小企业
industryAriaSelected=true
recommendation=方寸有序 ERP
action=预约体验
productIndex=https://17734375651.github.io/products/
productCards=4
allFourProductsPresent=true
consoleErrorsAndWarnings=[]
screenshot=site/design-qa-captures/live-final.png
screenshotDimensions=1265x712
screenshotSha256=0391fbb742d141c8e3eb07ad751e403440f48202745baa42bdf5fafdb3f0ccb3
DELIVERABLE_TAB_MARKED=true
EXIT_CODE=0
```

Structured evidence: `artifacts/live-browser-qa.json`.
