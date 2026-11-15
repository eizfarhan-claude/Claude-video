#!/usr/bin/env bash
# Usage: scripts/prep-neutral.sh <id> /path/to/raw.mov
# Re-encodes ONLY public/<id>/source/video.mp4 with a neutral grade: natural skin (no warm/yellow shift),
# light contrast, sharpness kept (lanczos + unsharp). Voice/cuts untouched.
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; IN="$2"; OUT="public/$ID/source"
GRADE="eq=contrast=1.05:saturation=1.04:brightness=0.005,colorbalance=rm=-0.01:bm=0.012:rh=-0.01:bh=0.01,unsharp=5:5:0.8:5:5:0.0"
ffmpeg -y -v error -i "$IN" -an -vf "scale=1080:1920:flags=lanczos,fps=30,$GRADE" -c:v libx264 -preset medium -crf 16 -g 15 -pix_fmt yuv420p "$OUT/video.mp4.tmp.mp4"
mv "$OUT/video.mp4.tmp.mp4" "$OUT/video.mp4"
echo "$ID neutral grade ok"
