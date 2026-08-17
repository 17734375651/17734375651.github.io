# 实际操作视频脱敏与网站接入验证记录

验证日期：2026-08-17（Asia/Shanghai）

## 1. 输入与输出

- 私有输入：`private-source.mp4`（原文件保持不变且未加入仓库）
- 输入 SHA-256：`47FD2A0A2093F7A9566A9569BC94FAB2B7F927E313527F21E24827156D29A1EA`
- 公开脱敏视频：`site/public/assets/media/bleed-operation-redacted.mp4`
- 公开封面：`site/public/assets/media/bleed-operation-poster.webp`
- Pages 视频副本：`docs/assets/media/bleed-operation-redacted.mp4`
- Pages 封面副本：`docs/assets/media/bleed-operation-poster.webp`
- 脱敏视频 SHA-256：`2D1619148CE7343E4789F59A32AC0F0F3110BE1A5621011C847A463D3DFE24B1`
- 封面 SHA-256：`A0688D686BF892E86329BFEC89E0F4644010CE050A7E2B6DACE664E780253185`

`site/public` 与 `docs` 中两个文件的对应哈希完全一致。

## 2. 基线与修改后媒体探测

基线命令：

```powershell
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate -of json <PRIVATE_SOURCE_MP4>
```

基线输出（exit 0）：

```json
{
  "streams": [
    {"index": 0, "codec_name": "h264", "codec_type": "video", "width": 2560, "height": 1440, "r_frame_rate": "30/1"},
    {"index": 1, "codec_name": "aac", "codec_type": "audio", "r_frame_rate": "0/0"}
  ],
  "format": {"duration": "80.640000", "size": "67896614", "bit_rate": "6735775"}
}
```

修改命令：

```powershell
python scripts/build-redacted-operation-video.py <PRIVATE_SOURCE_MP4> site/public/assets/media/bleed-operation-redacted.mp4
```

修改后探测命令：

```powershell
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate -of json site/public/assets/media/bleed-operation-redacted.mp4
```

修改后输出（exit 0）：

```json
{
  "streams": [
    {"index": 0, "codec_name": "h264", "codec_type": "video", "width": 1920, "height": 1080, "r_frame_rate": "30/1"}
  ],
  "format": {"duration": "53.600000", "size": "2517628", "bit_rate": "375765"}
}
```

行为变化：

- 基线：80.64 秒原始桌面录屏，含 AAC 音轨、桌面环境、路径、订单/条码、品牌与输出文件信息。
- 修改后：53.60 秒 H.264 视频，无音轨；保留“输入与参数设置 → 排版与人工调整 → 导出结果复检”三段关键操作。
- 标题栏、任务栏与非最终版构建信息由不透明品牌条覆盖。
- Excel/PDF 路径、订单表数据、动态数量、项目编号、版面内容、条码、品牌、地址和导出文档内容均已像素化。
- 视频内固定标注“真实操作演示 / 内容已脱敏 / 无音轨”和“非最终版界面”。

## 3. 代码、测试与构建

命令：

```powershell
cd site
npm test
npm run test:sites
npm run publish:pages
```

字面结果：

```text
npm test: tests 38, pass 38, fail 0, exit 0
npm run test:sites: tests 4, pass 4, fail 0, exit 0
npm run publish:pages: Generated 14 route documents; Published 34 files to ...\docs; exit 0
```

## 4. 浏览器验收

本地路由：`http://127.0.0.1:4181/products/bleed/`

桌面端实际 DOM 结果：

```json
{
  "actualHeading": 1,
  "simulatedLabel": 0,
  "video": {
    "controls": true,
    "duration": 53.6,
    "poster": "/assets/media/bleed-operation-poster.webp",
    "readyState": 4,
    "src": "/assets/media/bleed-operation-redacted.mp4",
    "videoHeight": 1080,
    "videoWidth": 1920
  }
}
```

移动端 390×844 结果：

```json
{
  "clientWidth": 375,
  "hasHorizontalOverflow": false,
  "scrollWidth": 375,
  "videoRect": {"height": 192, "width": 341.3333435058594}
}
```

视觉证据：

- `artifacts/video-redaction/review-final/contact-sheet.png`
- `artifacts/video-redaction/bleed-page-media-desktop.png`
- `artifacts/video-redaction/bleed-page-media-mobile.png`

## 5. 回滚验证

命令：

```powershell
powershell -NoProfile -File scripts/rollback-operation-video.ps1
```

字面输出（dry-run，exit 0）：

```text
rollback_mode=dry-run
baseline=39b505495f17f6dca2892e5b1185d0409e8ca349
next=powershell -NoProfile -File scripts/rollback-operation-video.ps1 -Apply
rollback_exit=0
```
