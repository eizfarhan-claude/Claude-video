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
- `src/BRoll.tsx` – full-frame B-roll cutaways (put clips in `public/broll/`: `sand.mp4`, `coin.mp4`)
- `src/Captions.tsx` – word-by-word captions (currently disabled)
- `src/Main.tsx` – cuts, punch-in zooms, SFX cue list, BGM with auto-ducking
- `src/theme.ts` – safe-zone constants (`--props='{"showSafeZones":true}'` draws them)

## v5 / v6
- `scripts/transcribe.py v5 v6` – chunked Whisper large-v3 word transcript -> `data/<id>/transcript.json`
- v5 `GajiEmas` — Gaji cukup makan, macam mana nak simpan emas? (106s raw → 68.8s)
- v6 `DuaPunca` — 2 punca masalah kewangan (92s raw → 66.1s)
- `npm run preview:v5` / `npm run preview:v6` for low-res previews
- v7 `Checkpoint` (kenapa kena menabung), v8 `HargaJatuh`, v9 `SatuGram` (1g sebulan + auto debit), v10 `TigaRisiko`
- `scripts/recaption.py <id> t0 t1` re-transcribes one window of the edited voice into captions.json
- config edges written as `"96.70!"` are exact (not snapped to silence)
- `scripts/prep-vivid.sh <id> raw.mov` – high-saturation, sharper grade (used for v7 final)

## v11–v19 (Nov 2026) + house workflow
- Full step-by-step workflow and the user's standing preferences: `.claude/skills/edit-video/SKILL.md`
- Default grade is now **neutral** (no yellow skin, sharpness kept); BGM ducking lowered (0.045 under speech / 0.09 gaps)
- Listening/verification tools: `scripts/at.py` (preview time → source), `scripts/hear.py` (transcribe edited voice),
  `scripts/fine.py` (20 ms dB), `scripts/check-anchors.py`, `scripts/edl-captions.py`
- Finals: `npm run render:v11` … `render:v19` (v16 aborted take, v17 superseded by v18)
