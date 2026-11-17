#!/usr/bin/env bash
# FINAL deliverable for one video = final video + TikTok cover + Instagram cover.
# usage: scripts/final.sh v11 WajibMenabung   -> out/final/v11_WajibMenabung/{<Comp>_final.mp4, cover_tiktok.png, cover_instagram.png}
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; COMP="$2"; OUT="out/final/${ID}_${COMP}"; mkdir -p "$OUT"
npx remotion still "cover-tt-$ID" "$OUT/cover_tiktok.png"
npx remotion still "cover-ig-$ID" "$OUT/cover_instagram.png"
npx remotion render "$COMP" "$OUT/${COMP}_final.mp4" --crf=16 --audio-bitrate=320k --timeout=180000
echo "final ok: $OUT"
