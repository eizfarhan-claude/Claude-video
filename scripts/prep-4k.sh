#!/usr/bin/env bash
# "4K look": lanczos upscale to 2160x3840 + sharpening + light colour grade, for raw video and B-roll.
# Usage: scripts/prep-4k.sh /path/to/raw.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
GRADE="eq=contrast=1.07:saturation=1.14:brightness=0.012:gamma=0.98,colorbalance=rm=0.02:gm=0.005:bm=-0.025:rh=0.015:bh=-0.02,unsharp=5:5:0.9:5:5:0.0,unsharp=3:3:0.35:3:3:0.0"
enc="-c:v libx264 -preset medium -crf 16 -g 15 -pix_fmt yuv420p -an"
ffmpeg -y -v error -i "$1" -t 148 -vf "scale=2160:3840:flags=lanczos,fps=30,$GRADE" $enc public/source/video_4k.mp4
ffmpeg -y -v error -i public/broll/sand.mp4 -vf "scale=2160:3840:flags=lanczos,$GRADE" $enc public/broll/sand_4k.mp4
ffmpeg -y -v error -i public/broll/coin.mp4 -vf "scale=2160:3840:flags=lanczos,hqdn3d=2:2:3:3,$GRADE" $enc public/broll/coin_4k.mp4
echo "4k ok"
