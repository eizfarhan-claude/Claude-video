#!/usr/bin/env bash
# Grab an exact source frame for a cover: scripts/cover-frame.sh v11 192  -> public/covers/v11.png
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/covers
ffmpeg -y -v error -i "public/$1/source/video.mp4" -vf "select=eq(n\,$2)" -frames:v 1 "public/covers/$1.png"
