[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Source,
    [string]$VideoOutput,
    [string]$PosterOutput
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourcePath = (Resolve-Path -LiteralPath $Source).Path

if (-not $VideoOutput) {
    $VideoOutput = Join-Path $repoRoot 'site\public\assets\media\label-operation-synthetic-no-taskbar.mp4'
}
if (-not $PosterOutput) {
    $PosterOutput = Join-Path $repoRoot 'site\public\assets\media\label-operation-synthetic-no-taskbar-poster.webp'
}

$videoPath = [System.IO.Path]::GetFullPath($VideoOutput)
$posterPath = [System.IO.Path]::GetFullPath($PosterOutput)
if ($sourcePath -eq $videoPath -or $sourcePath -eq $posterPath) {
    throw 'Source and output paths must be different.'
}

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $videoPath) | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $posterPath) | Out-Null

$token = [guid]::NewGuid().ToString('N')
$tempVideo = Join-Path ([System.IO.Path]::GetTempPath()) "label-operation-$token.mp4"
$tempPoster = Join-Path ([System.IO.Path]::GetTempPath()) "label-operation-poster-$token.webp"
$filter = @"
[0:v]trim=start=13:end=28.7,setpts=PTS-STARTPTS,crop=1456:1160:64:40,
drawbox=x=168:y=145:w=1240:h=52:color=0xf1f4f6@1:t=fill:enable='gte(t,4)',
drawtext=fontfile='C\:/Windows/Fonts/msyh.ttc':text='Demo / label-input.xlsx':x=188:y=160:fontsize=22:fontcolor=0x3d4248:enable='gte(t,4)',
drawbox=x=169:y=85:w=1220:h=68:color=0xf1f4f6@1:t=fill:enable='between(t,2,4)',
drawtext=fontfile='C\:/Windows/Fonts/msyh.ttc':text='Demo / label-input':x=199:y=105:fontsize=22:fontcolor=0x3d4248:enable='between(t,2,4)',
drawbox=x=234:y=628:w=680:h=55:color=0xf1f4f6@1:t=fill:enable='between(t,2,4)',
drawtext=fontfile='C\:/Windows/Fonts/msyh.ttc':text='label-input.xlsx':x=254:y=642:fontsize=22:fontcolor=0x3d4248:enable='between(t,2,4)',
scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xf1f4f6,setsar=1,format=yuv420p[app];
[0:v]trim=start=36:end=41,setpts=PTS-STARTPTS,crop=2432:1368:0:0,scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[wps1];
[0:v]trim=start=46.4:end=68,setpts=PTS-STARTPTS,crop=2432:1368:0:0,scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[wps2];
[app][wps1][wps2]concat=n=3:v=1:a=0[outv]
"@
$filter = $filter -replace "`r?`n", ''

try {
    & ffmpeg -hide_banner -loglevel warning -i $sourcePath -filter_complex $filter -map '[outv]' -an -c:v libx264 -preset slow -crf 23 -profile:v high -level 4.1 -r 30 -movflags '+faststart' $tempVideo
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg video build failed with exit $LASTEXITCODE" }

    & ffmpeg -hide_banner -loglevel error -ss 22.5 -i $tempVideo -frames:v 1 -vf 'scale=1600:900:flags=lanczos' -c:v libwebp -quality 83 $tempPoster
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg poster build failed with exit $LASTEXITCODE" }

    Move-Item -LiteralPath $tempVideo -Destination $videoPath -Force
    Move-Item -LiteralPath $tempPoster -Destination $posterPath -Force
}
finally {
    if (Test-Path -LiteralPath $tempVideo) { Remove-Item -LiteralPath $tempVideo -Force }
    if (Test-Path -LiteralPath $tempPoster) { Remove-Item -LiteralPath $tempPoster -Force }
}

Write-Output "video=$videoPath"
Write-Output "video_sha256=$((Get-FileHash -Algorithm SHA256 -LiteralPath $videoPath).Hash)"
Write-Output "poster=$posterPath"
Write-Output "poster_sha256=$((Get-FileHash -Algorithm SHA256 -LiteralPath $posterPath).Hash)"
& ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,pix_fmt,r_frame_rate -of json $videoPath
if ($LASTEXITCODE -ne 0) { throw "ffprobe failed with exit $LASTEXITCODE" }
