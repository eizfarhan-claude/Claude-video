# Editing rules (apply to every new video)

## TikTok placement
- Every animation / card / subtitle must be **horizontally centred on x = 540** (centre of the 1080×1920 frame).
  Never lay a band out between `SAFE.left` and `SAFE.right` — that is asymmetric and puts the centre at x = 500.
- Use `BAND_X` and `CENTER_X` from `src/engine/theme.ts` (or the `TopBand` wrapper in `src/engine/ui.tsx`) for any new overlay.
- The top band height is approved as is (`TOP_BAND.y = 232`, just under TikTok's search bar) — do not move it; it stays above the head; graphics never cover the face.
- Before a final render, check a still with `--props='{"showSafeZones":true}'`: the cyan vertical line marks the centre.
