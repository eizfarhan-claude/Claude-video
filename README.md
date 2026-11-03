# 5 Dinar Emas — Remotion edit (TikTok / IG Reels, 1080×1920)

```bash
npm install
scripts/prep-source.sh /path/to/raw.mp4   # video proxy + cleaned voice -> public/source/
scripts/fetch-assets.sh                   # SFX + BGM (Mixkit free licence) -> public/sfx, public/music
python3 scripts/build-edl.py              # cut list + re-timed words -> src/edl.json
npm run studio                            # live preview
npm run preview                           # low-res preview -> out/preview.mp4
npm run render                            # FINAL (full res) -> out/final.mp4
```

- `data/transcript.json` – Whisper large-v3 word-level transcript (Malay)
- `scripts/build-edl.py` – story order (hook first), dropped retakes, pause squeezing, caption fixes
- `src/Graphics.tsx` – motion graphics, all inside the band above the head (never over the face)
- `src/Captions.tsx` – word-by-word captions on the chest, above the TikTok/IG bottom UI
- `src/Main.tsx` – cuts, punch-in zooms, SFX cue list, BGM with auto-ducking
- `src/theme.ts` – safe-zone constants (`--props='{"showSafeZones":true}'` draws them)
