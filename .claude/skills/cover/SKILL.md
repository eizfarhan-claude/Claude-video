---
name: cover
description: The owner's required TikTok (1080×1920) + Instagram (1080×1350) cover for every video — expressive exact frame, hook title on the chest, face clear, inside the profile-grid crops. Use whenever a final is rendered (covers ship with every final) or the owner asks for/changes a cover ("cover", "thumbnail", "muka tak okay, tukar part lain").
---

# Cover TikTok + Instagram (owner's standing request)

Owner: *"Buat cover pages sekali untuk TT dan IG"*, *"setiap final akan ada Final video + Cover IG dan TT"*.
Every final = `<Comp>_final.mp4` + `cover_tiktok.png` (1080×1920) + `cover_instagram.png` (1080×1350);
`scripts/final.sh <id> <Comp>` renders all three. Covers also go out with each preview (`out/covers/`).

## 1. Pick the frame (the owner rejects bad faces — v17 had to be redone)
Good: eyes open looking into the camera, mid-explanation, a hand gesture (finger up / pointing) matching the hook,
engaged expression. Bad: pursed lips / "oo" mouth, eyes closed or half-closed, looking down, motion blur.
```bash
# contact sheet every 3 s with frame numbers
ffmpeg -i public/v20/source/video.mp4 -vf "select='not(mod(n\,90))',scale=150:-1,drawtext=text='%{eif\:n*90\:d}':x=4:y=4:fontsize=15:fontcolor=yellow:box=1:boxcolor=black@0.5,tile=11x4" -frames:v 1 sheet.png
# close-ups of the best areas (crop on the face), then fix the exact frame:
scripts/cover-frame.sh v20 3600          # -> public/covers/v20.jpg (exact still; OffthreadVideo seeks are imprecise)
```

## 2. Add the cover entry (`src/covers/Cover.tsx` → `COVERS`)
```ts
v20: {id: 'v20', frame: 3600, tag: 'Kos haji', line1: 'MAHAL DALAM RINGGIT', line2: 'MURAH DALAM EMAS', sub: '1998 vs hari ini'},
```
Same tag/line1/line2 as the video's `TitleIntro`; `sub` = one short teaser line. Stills are registered in
`src/Root.tsx` as `cover-tt-<id>` and `cover-ig-<id>` automatically from `COVERS`.

## 3. Layout (already in `Cover.tsx`)
Full frame image, light top vignette, dark fade from ~58% down so the text pops; text block at y≈1250:
gold pill tag (38 px) → line 1 white 900 weight with black stroke (≤112 px, auto-fit) → line 2 gold gradient
(≤132 px) → sub (36 px). The face (y≈500–1120) stays clear; everything sits inside the TikTok 3:4 (y 240–1680)
and IG 4:5 (y 285–1635) grid crops. The IG cover is the same 1920 frame centred in 1350.

## 4. Render + check
```bash
npx remotion still cover-tt-v20 out/covers/v20_tiktok.png
npx remotion still cover-ig-v20 out/covers/v20_instagram.png
```
Look at both side by side before sending: face clear and flattering, title fully visible in both crops, no text
over the eyes/mouth. If the owner dislikes the face, show a sheet of 4–6 alternative frames and pick the most
engaged one; re-render only the covers (the video stays as is).
