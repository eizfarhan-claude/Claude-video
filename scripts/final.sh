#!/usr/bin/env bash
# Final deliverable: video + TikTok cover + Instagram cover -> out/final/<id>_<Comp>/
# usage: scripts/final.sh v21 MenabungKaya
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; COMP="$2"; OUT="out/final/${ID}_${COMP}"; mkdir -p "$OUT"
npx remotion render "$COMP" "$OUT/${COMP}_final.mp4" --crf=16 --audio-bitrate=320k --timeout=180000 --log=error
npx remotion still "cover-tt-$ID" "$OUT/cover_tiktok.png" --timeout=120000 --log=error
npx remotion still "cover-ig-$ID" "$OUT/cover_instagram.png" --timeout=120000 --log=error
echo "$OUT ok"
