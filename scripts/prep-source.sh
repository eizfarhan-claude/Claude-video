#!/usr/bin/env bash
# Usage: scripts/prep-source.sh /path/to/raw.mp4
# Makes an edit-friendly 1080x1920 30fps proxy + a cleaned, loudness-normalised voice track.
set -euo pipefail
cd "$(dirname "$0")/.."
IN="$1"; mkdir -p public/source
ffmpeg -y -v error -i "$IN" -an -vf "scale=1080:1920,fps=30" -c:v libx264 -preset medium -crf 17 -g 15 -pix_fmt yuv420p public/source/video.mp4
ffmpeg -y -v error -i "$IN" -vn -ac 1 -ar 48000 \
  -af "highpass=f=80,lowpass=f=14000,afftdn=nr=10:nf=-40,equalizer=f=200:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=2.5,acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=2,loudnorm=I=-15:TP=-1.5:LRA=7" \
  public/source/voice.wav
echo "source ok"
