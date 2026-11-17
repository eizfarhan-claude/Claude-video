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

## v11 – v19 (batch 3)
- `VIVID=1 scripts/prep-source.sh <id> raw.mov` – one-pass vivid grade (same look as v7 final)
- `scripts/fetch-assets.sh` now also pulls a premium SFX layer (cinematic whoosh-impact, zoom impact, tech slide, UI clicks, coin win, glitch, shutter, heartbeat…) and 3 alternate music beds (`curiosity`, `mornings`, `lofi04`)
- `src/engine/kit2.tsx` – new cards: `BigStat` (counting number), `MythFact` (strike-through → fact), `VsCard`, `KineticHook`, `PillRow`
- anchors (`at()`) now come from `captions.json` (re-transcribed edited voice), so graphics land exactly on what is heard
- `scripts/postfix-captions.py <id>` – exact word-sequence fixes from `data/<id>/caption_post.json` (run after build-captions)
- v11 `WajibMenabung` · v12 `KonsepGap` · v13 `TigaSituasi` · v14 `WaktuTerbaik` · v15 `TungguHarga` · v16 `BayarDiri` · v17 `KosHaji` · v18 `LimaAngka` · v19 `Jutawan` — `npm run preview:v11` … `preview:v19`

## Editing toolkit (v11–v19 learnings) — see `.claude/skills/edit-video/SKILL.md`
| tool | use |
|---|---|
| `scripts/words.py <id>` | raw word timeline with gaps (plan cuts) |
| `scripts/energy20.py <id> a:b` | 20 ms energy — exact word edges |
| `scripts/win.py <id> a-b` | what a source range really says |
| `scripts/join-test.py <id> "a-b+c-d"` | audition a join before editing the config |
| `scripts/verbatim.py <id> o0-o1` | stutter-preserving look at the edited voice (owner's timestamps) |
| `scripts/qa-stutter.py <id>` | whole-video repeat/stutter QA + text around every cut |
| `scripts/postfix-captions.py <id>` | exact caption sequence fixes (`data/<id>/caption_post.json`) |
| `scripts/check-anchors.py <id>` | every `at()` anchor exists in captions |
| `scripts/cutout.py` / `cutout-focus.py <id>` | speaker cut-outs for the blurred-background intro |
| `scripts/cover-frame.sh <id> <frame>` | exact still for the cover |
| `scripts/final.sh <id> <Comp>` | final video + TikTok + Instagram covers → `out/final/` |
- v20 `SatuJuta` — jemputan event "Membina Satu Juta Pertama" (Johor, 21 Nov 2026): framed event B-roll (`VideoCutTrack` in kit), stage photo, `EventCard`
