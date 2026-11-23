---
name: title-intro
description: The owner's required opening for every video — animated hook title caption (TitleIntro + IntroFlash) with soft SFX, plus "intro focus" (background blurs, speaker cut-out pushed forward) for the whole hook. Use when building or fixing the first seconds of any video, or when the owner mentions "tajuk intro", "hook", "background blur", "saya lebih ke depan", "sound effect intro".
---

# Title intro + intro focus (owner's standing request)

What the owner asked for, in their words: *"Buat caption tajuk di awal video dengan hook untuk tarik audien, buat
animation untuk part masuk hook tajuk video"*, *"masa intro buat background blur untuk tajuk intro masuk / buat supaya
saya lebih ke depan"*, *"sound effect intro kurangkan sikit"*. Applies to **every** video, from the first frame.

## 1. Write the title (the hook)
- `tag` – small gold pill, the topic/context: `"Akaun Emas GAP"`, `"Kos haji"`, `"RM1 juta pada tahun 2006"`.
- `line1` – white, the set-up: `"WAJIB MENABUNG"`, `"PATUT TUNGGU"`, `"MAHAL DALAM RINGGIT"`.
- `line2` – gold, the punch/question: `"SETIAP BULAN?"`, `"HARGA TERENDAH?"`, `"MURAH DALAM EMAS"`.
- Take it from what the speaker actually says in the hook (question or promise); uppercase; each line ≲ 20 chars
  (auto-fit shrinks longer lines). Must match the audio meaning (owner checks this — e.g. v13 "jual" not "simpan").
- Use the same tag/line1/line2 for the cover (`COVERS` in `src/covers/Cover.tsx`) so post + cover match.

## 2. Code (in `src/videos/<id>/index.tsx`)
```tsx
import {IntroFlash, TitleIntro} from '../../engine/kit2';
// first ITEMS entry — replaces any other card during the hook
{from: 0.0, to: E('hook') + 0.15, render: (d) => (
  <TitleIntro dur={d} tag="Akaun Emas GAP" line1="WAJIB MENABUNG" line2="SETIAP BULAN?" l2At={14} />
)},
// SFX — keep these exact soft levels (owner: "kurangkan sikit")
{t: 0.0, f: 'whoosh_impact', v: 0.26},
{t: 0.1, f: 'tech_slide', v: 0.12},
{t: 0.2, f: 'zoom_impact', v: 0.18},
{t: 0.47, f: 'impact_deep', v: 0.13},
{t: 0.7, f: 'sparkle', v: 0.12},
// Overlays: <IntroFlash /> first, then <Schedule …/>
// VideoDef:
focus: {to: E('hook') + 0.15},   // if the hook spans hook+hook2 sections, use E('hook2')
```
Animation (`src/engine/kit2.tsx` → `TitleIntro`): gold line sweeps out from the centre (frames 0–10), tag pops (f3),
line 1 slams in from 1.7× scale + 14 px blur → sharp (f6), line 2 gold slams in (`l2At`, default f14) with a gold
glow pulse and a diagonal shine sweep, gentle float; sits in the top band above the head (never on the face).
`IntroFlash`: 9-frame warm radial flash at the very start.

## 3. Intro focus (blurred background, speaker forward)
- Engine: `src/engine/Edit.tsx` `ClipVideo` — while output time < `focus.to`, draws the same clip blurred
  (`blur(18px) brightness(0.62)`) over the sharp one, then the speaker cut-out `public/<id>/fg/<srcFrame>.webp`
  scaled `1 + 0.07k` around the face (origin 50% 40%) with a soft drop shadow; eases in over 8 frames, out over 10.
- Generate the cut-outs **after** the EDL and captions are final:
  ```bash
  python3 scripts/cutout-focus.py v20     # MediaPipe selfie_multiclass, every clip inside the focus window
  ```
  Needs `raw/selfie_multiclass.tflite` (`scripts/fetch-assets.sh`) and `apt-get install -y libegl1 libgles2`.
  A missing frame = 404 → render fails ("v18 preview FAILED"): always rerun `cutout-focus.py` after any cut change.

## 4. Check before sending
Render stills at frames ~2, 8, 14, 22, 60 and the hook end (`npx remotion still <Comp> out.png --frame=N --scale=0.4`):
title readable, not touching the head, background blurred, edges of hair/glasses clean, focus released before the
next section's first card.
