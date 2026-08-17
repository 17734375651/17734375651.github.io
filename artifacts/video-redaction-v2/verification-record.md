# 胀色裁切实际操作视频与脱敏素材包验证记录

验证日期：2026-08-17（Asia/Shanghai）

## 1. 变更对象与基线

- 产品路由：`/products/bleed/`
- 基线提交：`c74a86fdf1b35240125edca5f19d394e891eb1b5`
- 基线视频：`site/public/assets/media/bleed-operation-redacted.mp4`
- 基线视频 SHA-256：`2D1619148CE7343E4789F59A32AC0F0F3110BE1A5621011C847A463D3DFE24B1`
- 基线封面 SHA-256：`A0688D686BF892E86329BFEC89E0F4644010CE050A7E2B6DACE664E780253185`
- 基线副本：`artifacts/video-redaction-v2/baseline/`

新输入录屏保持在仓库外：

```text
C:\Users\17734\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20260817-1259-47.5377278.mp4
bytes=196076302
sha256=074C94856991771CD53D291706EF54E384883C4C619B2B8877D891A8B47E6F23
```

输入探测命令：

```powershell
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate -of json <SOURCE>
```

输入字面结果（exit 0）：

```text
video=h264 2560x1440 30/1
audio=aac 48000 Hz stereo
duration=158.133300
size=196076302
bit_rate=9919545
```

## 2. 修改与输出

用户确认本次脱敏方式是替换为虚构演示数据，不对画面使用遮罩。成片只删除与产品流程无关的准备、加载和尾部停顿：

- 保留源视频 `34–103s`：输入、参数、排版、导出复检。
- 保留源视频 `121–140s`：Illustrator 输出细节。
- 去除无内容音轨。
- 1920×1080、H.264 High、yuv420p、30 fps、faststart。

可复现命令：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-sanitized-operation-video.ps1 -Source <SOURCE> -VideoOutput <VIDEO> -PosterOutput <POSTER>
```

修改后探测命令：

```powershell
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,pix_fmt,r_frame_rate -of json site/public/assets/media/bleed-operation-sanitized.mp4
```

修改后字面结果（exit 0）：

```text
stream[0]=h264,video,1920x1080,yuv420p,30/1
audio_streams=0
duration=88.000000
size=18181165
bit_rate=1652833
sha256=C8BEDDFDA01C9B76695A8B86EAF487C146AE2F21AD25E4D447D84BBC771F9215
poster=webp,1920x1080
poster_sha256=49AFB976585D4A0ECFBF7B184DE0C4A83FD76CA206931B4EC766BF8636860341
```

重建验证（exit 0）：

```text
VIDEO_MATCH=True
POSTER_MATCH=True
```

## 3. 脱敏功能演示素材包

- 原目录：`C:\Users\17734\Desktop\方寸有序胀色裁切_脱敏功能演示素材_20260814\`
- 原目录文件数：152
- 原目录总字节：99,002,292
- 公开 ZIP：`site/public/assets/downloads/bleed-redacted-demo-materials-20260814.zip`
- ZIP 字节：98,141,990（93.6 MB）
- ZIP SHA-256：`7740F2C032FDFCE313B6333FF83D8048591982B470FADCFF877C370B97A235B6`
- ZIP 条目：152；根目录名保持为 `方寸有序胀色裁切_脱敏功能演示素材_20260814/`
- 包内 `SHA256SUMS.txt`：151/151 文件通过。
- 按用户要求原样打包；`manifest.json` 的 `source_matrix.sha256` 保留原值，该指针与当前 `PDF清单.csv` 哈希不一致，不改动包内内容。

`site/public` 与 `docs` 的视频、封面和 ZIP 三组哈希全部一致。

## 4. 代码、测试与构建

命令：

```powershell
cd site
npm test
npm run test:sites
npm run publish:pages
```

字面结果：

```text
npm test: tests 42, pass 42, fail 0, exit 0
npm run test:sites: tests 4, pass 4, fail 0, exit 0
npm run publish:pages: Generated 14 route documents; Published 35 files to ..\docs; exit 0
```

本地 HTTP 验证（exit 0）：

```text
video HEAD: 200, Content-Length=18181165, Content-Type=video/mp4
video bytes 0-99: 206, Content-Range=bytes 0-99/18181165, Accept-Ranges=bytes
zip HEAD: 200, Content-Length=98141990, Content-Type=application/zip
```

## 5. 浏览器验收

本地路由：`http://127.0.0.1:4182/products/bleed/?qa=video-v2`

桌面端真实 DOM 结果：

```json
{
  "video": {
    "src": "/assets/media/bleed-operation-sanitized.mp4",
    "poster": "/assets/media/bleed-operation-sanitized-poster.webp",
    "controls": true,
    "readyState": 4,
    "duration": 88,
    "width": 1920,
    "height": 1080
  },
  "attachment": {
    "href": "/assets/downloads/bleed-redacted-demo-materials-20260814.zip",
    "download": "bleed-redacted-demo-materials-20260814.zip"
  },
  "hasHorizontalOverflow": false
}
```

移动端 390×844 结果：

```json
{
  "video": {"width": 341.3333, "height": 192, "readyState": 4, "duration": 88},
  "attachmentButton": {"width": 305.3333, "height": 49},
  "attachmentDirection": "column",
  "hasHorizontalOverflow": false
}
```

视觉证据：

- `artifacts/video-redaction-v2/review-final/contact-sheet.jpg`
- `artifacts/video-redaction-v2/qa/bleed-media-desktop.png`
- `artifacts/video-redaction-v2/qa/bleed-media-mobile.png`

## 6. 回滚

脚本：`scripts/rollback-operation-video.ps1`

验证命令：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/rollback-operation-video.ps1
```

字面结果（dry-run，exit 0）：

```text
rollback_mode=dry-run
baseline=c74a86fdf1b35240125edca5f19d394e891eb1b5
next=powershell -NoProfile -File scripts/rollback-operation-video.ps1 -Apply
```

## 7. GitHub Pages

发布提交与正式站点哈希在推送后补录。
