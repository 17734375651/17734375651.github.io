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
    $VideoOutput = Join-Path $repoRoot 'site\public\assets\media\bleed-operation-sanitized.mp4'
}
if (-not $PosterOutput) {
    $PosterOutput = Join-Path $repoRoot 'site\public\assets\media\bleed-operation-sanitized-poster.webp'
}

$videoPath = [System.IO.Path]::GetFullPath($VideoOutput)
$posterPath = [System.IO.Path]::GetFullPath($PosterOutput)
if ($sourcePath -eq $videoPath -or $sourcePath -eq $posterPath) {
    throw 'Source and output paths must be different.'
}

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $videoPath) | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $posterPath) | Out-Null

$token = [guid]::NewGuid().ToString('N')
$tempVideo = Join-Path ([System.IO.Path]::GetTempPath()) "bleed-operation-$token.mp4"
$tempPoster = Join-Path ([System.IO.Path]::GetTempPath()) "bleed-operation-poster-$token.webp"
$filter = '[0:v]trim=start=34:end=103,setpts=PTS-STARTPTS,scale=1920:1080:flags=lanczos[v0];[0:v]trim=start=121:end=140,setpts=PTS-STARTPTS,scale=1920:1080:flags=lanczos[v1];[v0][v1]concat=n=2:v=1:a=0,format=yuv420p[outv]'

try {
    & ffmpeg -hide_banner -loglevel warning -i $sourcePath -filter_complex $filter -map '[outv]' -an -c:v libx264 -preset slow -crf 22 -profile:v high -level 4.1 -r 30 -movflags '+faststart' $tempVideo
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg video build failed with exit $LASTEXITCODE" }

    & ffmpeg -hide_banner -loglevel error -ss 40 -i $tempVideo -frames:v 1 -vf 'crop=1000:562:240:270,scale=1920:1080:flags=lanczos' -c:v libwebp -quality 86 $tempPoster
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
