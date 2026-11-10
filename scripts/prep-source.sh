#!/usr/bin/env bash
# Usage: [GRADE=...] scripts/prep-source.sh <id> /path/to/raw.mp4   (VIVID=1 -> high-saturation, sharper grade)
# -> public/<id>/source/video.mp4 (1080x1920 30fps, graded "4K look": lanczos + sharpen + light grade)
#    public/<id>/source/voice.wav (cleaned, loudness-normalised voice)
#    data/<id>/silences.txt
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; IN="$2"; OUT="public/$ID/source"; mkdir -p "$OUT" "data/$ID"
GRADE="${GRADE:-eq=contrast=1.07:saturation=1.14:brightness=0.012:gamma=0.98,colorbalance=rm=0.02:gm=0.005:bm=-0.025:rh=0.015:bh=-0.02,unsharp=5:5:0.7:5:5:0.0}"
[ "${VIVID:-0}" = 1 ] && GRADE="eq=contrast=1.10:saturation=1.38:brightness=0.012:gamma=0.97,colorbalance=rm=0.02:gm=0.005:bm=-0.025:rh=0.015:bh=-0.02,unsharp=5:5:1.15:5:5:0.0,unsharp=3:3:0.45:3:3:0.0"
ffmpeg -y -v error -i "$IN" -an -vf "scale=1080:1920:flags=lanczos,fps=30,$GRADE" -c:v libx264 -preset medium -crf 17 -g 15 -pix_fmt yuv420p "$OUT/video.mp4"
ffmpeg -y -v error -i "$IN" -vn -ac 1 -ar 48000 \
  -af "highpass=f=80,lowpass=f=14000,afftdn=nr=10:nf=-40,equalizer=f=200:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=2.5,acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=2,loudnorm=I=-15:TP=-1.5:LRA=7" \
  "$OUT/voice.wav"
ffmpeg -i "$OUT/voice.wav" -af silencedetect=n=-38dB:d=0.3 -f null - 2>&1 | grep -oE "silence_(start|end): [0-9.]+" | awk '{print $2}' | paste -d' ' - - > "data/$ID/silences.txt"
echo "$ID source ok"
