#!/usr/bin/env bash
# "Natural" grade: light saturation, slightly cool balance (keeps skin tones true, no yellow cast) + same sharpening as vivid.
# Usage: scripts/prep-natural.sh <id> /path/to/raw.mov   -> public/<id>/source/video.mp4 (previous kept as video_vivid.mp4)
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; IN="$2"; OUT="public/$ID/source"
GRADE="eq=contrast=1.06:saturation=1.06:brightness=0.006,colorbalance=rm=-0.01:bm=0.012:rh=-0.005:bh=0.008,unsharp=5:5:1.15:5:5:0.0,unsharp=3:3:0.45:3:3:0.0"
ffmpeg -y -v error -i "$IN" -an -vf "scale=1080:1920:flags=lanczos,fps=30,$GRADE" -c:v libx264 -preset medium -crf 16 -g 15 -pix_fmt yuv420p "$OUT/video_natural.mp4"
[ -f "$OUT/video_vivid.mp4" ] || mv "$OUT/video.mp4" "$OUT/video_vivid.mp4"
mv "$OUT/video_natural.mp4" "$OUT/video.mp4"
echo "$ID natural ok"
