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

## v11–v16 (batch Nov 2026, vivid grade)
- Source prep: `VIVID=1 scripts/prep-source.sh <id> raw.MOV` (high saturation + sharpen in one pass)
- v11 `TigaTips` — 3 tips mudah menabung emas (59s raw → 38s)
- v12 `DuaCara` — keluarkan emas fizikal + auto debit (97s → 75s)
- v13 `AutoDebit` — alang-alang simpan emas, biar sampai kaya (91s → 52s)
- v14 `JualHutang` — berbaloi jual emas untuk settle hutang? (122s → 78s)
- v15 `HargaTurun` — harga emas jatuh: tenang, simpan jangka panjang (127s → 107s)
- v16 `SatuKilo` — cita-cita 1 kg emas, menabung sedikit demi sedikit (126s → 77s)
- `npm run preview:v11` … `preview:v16`; config cuts can now use exact edges too (`["61.64!", "62.75!"]`)
- new kit card: `ChainCard` (cause → effect pills, optional no-arrows / red variant)
- v11 overlays: real gold-bar cutaways on "50 gram" (x2), "100 gram", "2 kilogram" — put graded clips in `public/v11/broll/{g50,g100,kg}.mp4` (same vivid grade, 1080x1920 crop)
- `npm run render:v11` … `render:v16` → `out/final_<Comp>.mp4` (full res, CRF 16, 320k audio)
- v14 question overlay: viewer's WhatsApp screenshot at `public/v14/broll/soalan.jpg` (not committed)
- v14 re-graded with `NATURAL=1` (VIVID made the face too yellow); old vivid source kept as `video_vivid.mp4`
- v16 gold-item montage (hard cuts) on "5 dinar … 1 kilogram" and "100 gram, 250 gram, 1 kilogram": `public/v16/broll/{coins,cards,g50,bars,kg}.mp4` (NATURAL grade); `BCut.fadeIn/fadeOut=false` for back-to-back segments
