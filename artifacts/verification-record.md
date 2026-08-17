# Deployment verification record

## Scope and immutable inputs

```text
repository=17734375651/17734375651.github.io
public_url=https://17734375651.github.io/
base_commit=b09ae98fd48eb59d68e3e452676c96bbac84dede
base_tree=602f2dd82b28ab4693d0063fc2c915f0c2566596
content_commit=754bdde02cbe72e22450a669d83a996cfd3ba6c2
content_tree=9d365dc292208683957dbf53e32bfc75e77c333b
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
tests 36
suites 0
pass 36
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
[PASS] file_hashes: SHA-256 inventory covers 32 files; tree af100913b8542b3b
SUMMARY: PASS (8 pass, 0 fail, 0 warn)
EXIT_CODE=0
```

JSON evidence: `artifacts/static-verification-docs.json`; full tree SHA-256: `af100913b8542b3b126dfd7f0face1aa26eb1c21e676d79e88b76e03775c434c`.

## Public-bundle copy audit

Command and input:

```powershell
$bundle = Get-ChildItem docs/assets/main-*.js -File | Select-Object -First 1
$terms = @('小工厂','待负责人确认','静态代码审计','秘密扫描','私钥','secretScan','webWhitelist','本地工作树','evidenceRefs','forbiddenInventedFields','微信 / 电话')
$body = Get-Content -Raw -LiteralPath $bundle.FullName
$terms | ForEach-Object { "$_=$($body.Contains($_))" }
```

Literal output:

```text
BUNDLE=main-BxL9oovx.js
BYTES=347433
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
git diff --binary --full-index --output=artifacts/changes.patch b09ae98fd48eb59d68e3e452676c96bbac84dede 754bdde02cbe72e22450a669d83a996cfd3ba6c2
Get-FileHash -Algorithm SHA256 artifacts/changes.patch
```

Literal output:

```text
BYTES=58742636
SHA256=d0139650e2216129eb62b34e990f20d1e09cb0f6a0e84e8920b6d47e7bb43291
EXIT_CODE=0
```

## Patch, rollback, and live deployment checks

### Patch apply check

Command and input:

```powershell
git worktree add --detach 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-754bdde' b09ae98fd48eb59d68e3e452676c96bbac84dede
git -C 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-754bdde' apply --check --binary 'C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\artifacts\changes.patch'
git worktree remove 'C:\Users\17734\Documents\ChatGPT\大舅\_patch-verify-754bdde'
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
CONTENT_COMMIT=754bdde02cbe72e22450a669d83a996cfd3ba6c2
PUBLIC_URL=https://17734375651.github.io/
TARGET_PAGES_SOURCE=main:/docs
ROLLBACK_PAGES_SOURCE=main:/
CHECK_RESULT=PASS
EXIT_CODE=0
```

### Live deployment

This section is populated after GitHub Pages switches to `main:/docs` and the cache-busted public URL returns the modified behavior.
