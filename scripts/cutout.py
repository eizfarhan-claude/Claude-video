"""Person cut-outs (RGBA webp) for the intro "focus" effect: sharp speaker over a blurred background.
usage: python3 scripts/cutout.py v11 82 240 [model.tflite]   (source frames, inclusive-exclusive)
-> public/<id>/fg/<frame>.webp   (MediaPipe selfie_multiclass segmentation, soft-edged alpha)"""
import sys, pathlib, subprocess, numpy as np, cv2
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
vid, f0, f1 = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
model = sys.argv[4] if len(sys.argv) > 4 else 'raw/selfie_multiclass.tflite'
out = pathlib.Path(f'public/{vid}/fg'); out.mkdir(parents=True, exist_ok=True)
seg = vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(
    base_options=BaseOptions(model_asset_path=model), output_confidence_masks=True, running_mode=vision.RunningMode.VIDEO))
cap = cv2.VideoCapture(f'public/{vid}/source/video.mp4'); cap.set(cv2.CAP_PROP_POS_FRAMES, f0)
prev = None
for n in range(f0, f1):
    ok, bgr = cap.read()
    if not ok: break
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    res = seg.segment_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb), int(n * 1000 / 30))
    a = 1.0 - res.confidence_masks[0].numpy_view()            # class 0 = background
    a = cv2.resize(a, (rgb.shape[1], rgb.shape[0]), interpolation=cv2.INTER_CUBIC)
    a = cv2.GaussianBlur(np.clip((a - 0.35) / 0.4, 0, 1), (0, 0), 2.2)   # crisp-but-soft edge
    if prev is not None: a = 0.6 * a + 0.4 * prev               # temporal smoothing (less edge flicker)
    prev = a
    rgba = np.dstack([bgr, (a * 255).astype(np.uint8)])
    cv2.imwrite(str(out / f'{n}.webp'), rgba, [cv2.IMWRITE_WEBP_QUALITY, 92])
seg.close(); print(vid, 'cutouts', f0, f1)
