# 2026-08-20 成品展示包与无工作栏视频发布验证记录

## 变更边界

- Git 基线：`599c3860f005717a7b6e2b686809f01184e2b891`
- 工作分支：`codex/zhihuiji-benchmark-v3`
- 产品范围：已进入正式销售流程的 `label`、`bleed`、`pdf`。
- `erp` 当前仍为预约体验/完善中，未按成品软件发布正式展示包。
- 变更字段：
  - `PRODUCTS[label].media.attachments`
  - `PRODUCTS[pdf].media.attachments`
  - `PRODUCTS[bleed].media.video`
  - `PRODUCTS[bleed].media.poster`
- 视频画面变更：源录屏保持不变，输出副本对每个保留片段执行 `crop=2432:1368:64:0`，从编码画面底部移除 72 px Windows 工作栏，并保持 16:9 后缩放为 1920×1080。

## 四个可验证角色

1. **修改后制品**
   - `site/public/assets/downloads/label-redacted-demo-materials-20260820.zip`
   - `site/public/assets/downloads/pdf-redacted-demo-materials-20260820.zip`
   - `site/public/assets/media/bleed-operation-sanitized-no-taskbar.mp4`
   - `site/public/assets/media/bleed-operation-sanitized-no-taskbar-poster.webp`
2. **补丁**
   - `artifacts/demo-material-packages/website-demo-packages-and-taskbar-video.patch`
3. **验证记录**
   - 本文件
   - `artifacts/demo-material-packages/release-verification/`
4. **回滚**
   - `scripts/rollback-demo-packages-and-taskbar-video.ps1`

## 原件保全

- 原始录屏位于仓库外，未复制进 Git，也未覆盖。
- 原始录屏：196,076,302 bytes；SHA-256 `074C94856991771CD53D291706EF54E384883C4C619B2B8877D891A8B47E6F23`。
- 修改后视频：18,578,361 bytes；SHA-256 `E27F0A128DE49DA92EA0F2327B0FB84B8698863ADFCEBE5162A394EE2C7FCF45`。
- 精确哈希记录：`release-verification/asset-hash-verification.json`。

## 展示包结果

| 产品 | 文件数 | ZIP 大小 | SHA-256 | 结论 |
|---|---:|---:|---|---|
| 标签印刷排版计划 | 13 | 234,527 B | `8166150C4E796172428284CB03F3D899141DF0864D30898208DC8CB371284C57` | PASS |
| 方寸 PDF 配印助手 | 19 | 414,171 B | `A387A27EBA09C413E5C6544A54B4B82DDACAE5AF639D657D93ADFCED5E31CE4B` | PASS |

两包均为源数据替换式合成演示数据，`provenance=synthetic-demo-package`、`realCustomerData=false`、`softwareExecutionClaim=false`。包内 `SHA256SUMS.txt` 覆盖除自身外的全部文件；文本、表格 XML、Word XML 与 PDF 可提取文本的敏感模式扫描为 0。

## 基线与修改后行为

- 基线精确命令和字面输出：`release-verification/baseline-behavior.log`。
  - 标签和 PDF 产品页没有展示包附件。
  - 胀色视频使用 `bleed-operation-sanitized.mp4`，未执行去工作栏裁剪。
- 修改后精确命令和字面输出：`release-verification/modified-behavior.log`。
  - 标签和 PDF 产品页分别出现合成脱敏展示包下载卡片。
  - 胀色视频切换为 `bleed-operation-sanitized-no-taskbar.mp4`，构建脚本包含底部 72 px 裁剪。

## 验证命令、字面输出和退出状态

| 命令 | 记录 | 结果 |
|---|---|---|
| `npm test` | `release-verification/npm-test.log` | 44/44，`exit_status=0` |
| `npm run test:sites` | `release-verification/sites-test.log` | 4/4，`exit_status=0` |
| `python artifacts/demo-package-build/validate-packages.py` | `release-verification/package-validation.log` | label/pdf 均 PASS，`exit_status=0` |
| `npm run publish:pages` | `release-verification/publish-pages.log` | 14 路由、37 文件，`exit_status=0` |
| `ffprobe ...no-taskbar.mp4` | `release-verification/media-ffprobe.{json,log}` | H.264、yuv420p、1920×1080、30 fps、88 s、仅视频流，`exit_status=0` |
| `ffprobe ...poster.webp` | `release-verification/poster-ffprobe.log` | WebP 1920×1080 可读，`exit_status=0` |
| 源站与 `docs` SHA-256 对比 | `release-verification/asset-hash-verification.{json,log}` | 4/4 相同，旧媒体不在 `docs`，`exit_status=0` |
| 回滚 dry-run | `release-verification/rollback-dry-run.log` | 基线可用，`exit_status=0` |

补充原生格式检查：4 个工作簿共 11 个工作表，公式错误 0；6 份 PDF 均可读取（源 9 页、处理后 16 页）；标签说明 DOCX 已重新打开并渲染为 1 页，辅助功能高/中/低问题均为 0。对应记录位于 `artifacts/demo-package-build/qa-*`。

## 浏览器验收

本地生产构建浏览器结果见 `release-verification/local-browser-qa.json`：

- `/products/label/`：附件名、下载属性、229 KB、13 个文件均正确。
- `/products/pdf/`：附件名、下载属性、404 KB、19 个文件均正确。
- `/products/bleed/`：`controls=true`、`readyState=4`、时长 88 s、1920×1080；海报和编码画面下方均没有 Windows 工作栏。
- 三个页面控制台错误为 0。

## 线上发布

线上终验记录：`release-verification/live-verification.json`。

- GitHub Pages 构建 `1162821611` 已以提交 `ecfa38416e7d8e91148158e08eb3972bdefd0b1c` 完成，状态 `built`。
- 标签、PDF、胀色三个产品页均返回 HTTP 200，页面 DOM 显示正确附件或新视频路径。
- 两个 ZIP、视频、海报均返回 HTTP 200；线上字节数与本地一致，4/4 SHA-256 完全匹配。
- 线上视频 `readyState=4`、时长 88 s、1920×1080，控制条可用，控制台错误为 0。

## 回滚运行方式

先执行 dry-run：

```powershell
powershell -NoProfile -File scripts/rollback-demo-packages-and-taskbar-video.ps1
```

确认工作树干净后生成完整逆向变更：

```powershell
powershell -NoProfile -File scripts/rollback-demo-packages-and-taskbar-video.ps1 -Apply
```
