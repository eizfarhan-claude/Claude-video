#!/usr/bin/env bash
# "Vivid" re-grade (higher saturation + stronger sharpening) of an already-prepped video.
# Usage: scripts/prep-vivid.sh <id> /path/to/raw.mov   -> public/<id>/source/video.mp4 (old kept as video_base.mp4)
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; IN="$2"; OUT="public/$ID/source"
GRADE="eq=contrast=1.10:saturation=1.38:brightness=0.012:gamma=0.97,colorbalance=rm=0.02:gm=0.005:bm=-0.025:rh=0.015:bh=-0.02,unsharp=5:5:1.15:5:5:0.0,unsharp=3:3:0.45:3:3:0.0"
ffmpeg -y -v error -i "$IN" -an -vf "scale=1080:1920:flags=lanczos,fps=30,$GRADE" -c:v libx264 -preset medium -crf 16 -g 15 -pix_fmt yuv420p "$OUT/video_vivid.mp4"
[ -f "$OUT/video_base.mp4" ] || mv "$OUT/video.mp4" "$OUT/video_base.mp4"
mv "$OUT/video_vivid.mp4" "$OUT/video.mp4"
echo "$ID vivid ok"
