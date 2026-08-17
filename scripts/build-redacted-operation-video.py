#!/usr/bin/env python3
"""Build the privacy-redacted operation video used by the product page.

The source recording stays outside the repository. This script keeps only the
useful workflow sections, removes the audio track, pixelates customer/order
content, hides desktop chrome, and adds an explicit non-final-build notice.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH = 1920
HEIGHT = 1080
FPS = 30
INPUT_START = 13.0
INPUT_END = 18.0
CORE_START = 18.0
CORE_END = 54.0
REVIEW_START = 67.0
REVIEW_END = 80.5
TRANSITION_SECONDS = 0.45


def require_executable(name: str) -> str:
    executable = shutil.which(name)
    if not executable:
        raise SystemExit(f"Missing required executable: {name}")
    return executable


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path(r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc"),
        Path(r"C:\Windows\Fonts\simhei.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    raise SystemExit("A Chinese UI font was not found in C:\\Windows\\Fonts")


def make_overlay(path: Path, chapter: str) -> None:
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    # Opaque bands guarantee that build labels, filenames, the clock and the
    # Windows taskbar cannot ghost through the public export.
    charcoal = (8, 13, 11, 255)
    charcoal_soft = (8, 13, 11, 255)
    gold = (234, 179, 65, 255)
    white = (245, 247, 242, 255)
    muted = (192, 199, 191, 255)

    draw.rectangle((0, 0, WIDTH, 68), fill=charcoal)
    draw.rectangle((0, HEIGHT - 58, WIDTH, HEIGHT), fill=charcoal_soft)
    draw.rectangle((0, 66, WIDTH, 68), fill=gold)

    draw.rounded_rectangle((26, 14, 254, 55), radius=5, fill=gold)
    draw.text((44, 19), "真实操作演示", font=font(25, bold=True), fill=(16, 18, 15, 255))
    draw.text((278, 19), "内容已脱敏", font=font(23, bold=True), fill=white)
    right_text = "无音轨 · 仅展示工作流"
    right_box = draw.textbbox((0, 0), right_text, font=font(21))
    draw.text((WIDTH - (right_box[2] - right_box[0]) - 30, 22), right_text, font=font(21), fill=muted)

    notice = "非最终版界面｜功能、文案与样式以正式版本为准"
    draw.text((30, HEIGHT - 43), notice, font=font(21), fill=muted)
    chapter_box = draw.textbbox((0, 0), chapter, font=font(22, bold=True))
    draw.text(
        (WIDTH - (chapter_box[2] - chapter_box[0]) - 30, HEIGHT - 44),
        chapter,
        font=font(22, bold=True),
        fill=gold,
    )

    path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(path)


def pixelate_region(
    filters: list[str],
    source: str,
    prefix: str,
    *,
    x: int,
    y: int,
    width: int,
    height: int,
    block: int,
) -> str:
    base = f"{prefix}_base"
    crop = f"{prefix}_crop"
    pixels = f"{prefix}_pixels"
    output = f"{prefix}_out"
    small_width = max(2, width // block)
    small_height = max(2, height // block)
    filters.append(f"[{source}]split=2[{base}][{crop}]")
    filters.append(
        f"[{crop}]crop={width}:{height}:{x}:{y},"
        f"scale={small_width}:{small_height}:flags=area,"
        f"scale={width}:{height}:flags=neighbor[{pixels}]"
    )
    filters.append(f"[{base}][{pixels}]overlay={x}:{y}[{output}]")
    return output


def build_filter() -> str:
    filters: list[str] = [
        "[0:v]split=3[source_input][source_core][source_review]",
        f"[source_input]trim=start={INPUT_START}:end={INPUT_END},setpts=PTS-STARTPTS,"
        "crop=1340:850:85:78[input_crop]",
        f"[source_core]trim=start={CORE_START}:end={CORE_END},setpts=PTS-STARTPTS[core_trim]",
        f"[source_review]trim=start={REVIEW_START}:end={REVIEW_END},setpts=PTS-STARTPTS[review_trim]",
    ]

    input_chapter = pixelate_region(
        filters,
        "input_crop",
        "input_paths",
        x=214,
        y=205,
        width=790,
        height=225,
        block=24,
    )
    filters.append(
        f"[{input_chapter}]scale=1700:1078:flags=lanczos,"
        f"pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=0x111714,"
        f"fps={FPS},settb=AVTB,setpts=PTS-STARTPTS[input_scaled]"
    )
    filters.append("[1:v]format=rgba[input_overlay]")
    filters.append("[input_scaled][input_overlay]overlay=0:0:format=auto:shortest=1[input_ready]")

    core = pixelate_region(
        filters,
        "core_trim",
        "core_orders",
        x=28,
        y=255,
        width=940,
        height=525,
        block=26,
    )
    core = pixelate_region(
        filters,
        core,
        "core_quantity",
        x=858,
        y=143,
        width=120,
        height=42,
        block=16,
    )
    core = pixelate_region(
        filters,
        core,
        "core_preview",
        x=1160,
        y=184,
        width=1110,
        height=1015,
        block=24,
    )
    core = pixelate_region(
        filters,
        core,
        "core_project",
        x=0,
        y=1308,
        width=1120,
        height=58,
        block=24,
    )
    filters.append(
        f"[{core}]scale={WIDTH}:{HEIGHT}:flags=lanczos,fps={FPS},"
        "settb=AVTB,setpts=PTS-STARTPTS[core_scaled]"
    )
    filters.append("[2:v]format=rgba[core_overlay]")
    filters.append("[core_scaled][core_overlay]overlay=0:0:format=auto:shortest=1[core_ready]")

    review = pixelate_region(
        filters,
        "review_trim",
        "review_document",
        x=178,
        y=238,
        width=2110,
        height=1118,
        block=28,
    )
    filters.append(
        f"[{review}]scale={WIDTH}:{HEIGHT}:flags=lanczos,fps={FPS},"
        "settb=AVTB,setpts=PTS-STARTPTS[review_scaled]"
    )
    filters.append("[3:v]format=rgba[review_overlay]")
    filters.append("[review_scaled][review_overlay]overlay=0:0:format=auto:shortest=1[review_ready]")

    input_duration = INPUT_END - INPUT_START
    core_duration = CORE_END - CORE_START
    first_xfade_offset = input_duration - TRANSITION_SECONDS
    first_result_duration = input_duration + core_duration - TRANSITION_SECONDS
    second_xfade_offset = first_result_duration - TRANSITION_SECONDS
    filters.append(
        f"[input_ready][core_ready]xfade=transition=fade:duration={TRANSITION_SECONDS}:"
        f"offset={first_xfade_offset}[input_and_core]"
    )
    filters.append(
        f"[input_and_core][review_ready]xfade=transition=fade:duration={TRANSITION_SECONDS}:"
        f"offset={second_xfade_offset},format=yuv420p[outv]"
    )
    return ";".join(filters)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="Path to the private source MP4")
    parser.add_argument("output", type=Path, help="Path for the redacted public MP4")
    parser.add_argument(
        "--work-dir",
        type=Path,
        default=Path("artifacts/video-redaction/render"),
        help="Directory for generated overlay PNGs",
    )
    args = parser.parse_args()

    if not args.source.is_file():
        raise SystemExit(f"Source video not found: {args.source}")

    ffmpeg = require_executable("ffmpeg")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.work_dir.mkdir(parents=True, exist_ok=True)
    core_overlay = args.work_dir / "overlay-core.png"
    review_overlay = args.work_dir / "overlay-review.png"
    input_overlay = args.work_dir / "overlay-input.png"
    make_overlay(input_overlay, "输入与参数设置")
    make_overlay(core_overlay, "排版与人工调整")
    make_overlay(review_overlay, "导出结果复检")

    command = [
        ffmpeg,
        "-hide_banner",
        "-y",
        "-i",
        str(args.source),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-i",
        str(input_overlay),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-i",
        str(core_overlay),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-i",
        str(review_overlay),
        "-filter_complex",
        build_filter(),
        "-map",
        "[outv]",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "21",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(args.output),
    ]
    print("Running:", " ".join(command[:15]), "...", flush=True)
    completed = subprocess.run(command, check=False)
    return completed.returncode


if __name__ == "__main__":
    raise SystemExit(main())
