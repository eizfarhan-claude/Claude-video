#!/usr/bin/env bash
# Voice-only half of prep-source.sh: cleaned voice.wav + silences (lets transcription start before the video encode ends).
# Usage: scripts/prep-voice.sh <id> /path/to/raw.mov
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; IN="$2"; OUT="public/$ID/source"; mkdir -p "$OUT" "data/$ID"
ffmpeg -y -v error -i "$IN" -vn -ac 1 -ar 48000 \
  -af "highpass=f=80,lowpass=f=14000,afftdn=nr=10:nf=-40,equalizer=f=200:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=2.5,acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=2,loudnorm=I=-15:TP=-1.5:LRA=7" \
  "$OUT/voice.wav"
ffmpeg -i "$OUT/voice.wav" -af silencedetect=n=-38dB:d=0.3 -f null - 2>&1 | grep -oE "silence_(start|end): [0-9.]+" | awk '{print $2}' | paste -d' ' - - > "data/$ID/silences.txt"
echo "$ID voice ok"
