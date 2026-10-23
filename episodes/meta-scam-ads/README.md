# Why Scam Ads Keep Finding You — Meta’s New Lawsuit Explained

[Watch episode 005 online](https://tai23082004l02-svg.github.io/GPT-motion-canvas/?episode=meta)

7:10.38 · English · 24 scenes · 1920×1080 composition at 30 fps. Kokoro Michael narration, original music and sound effects. Motion Canvas renders against the audio clock; playback uses no MP4.

The episode opens with the Rhode Island lawsuit and Meta’s response, distinguishes removal counts from detection rates, then follows a clearly labeled fictional investment-ad journey. Source and legal-status labels are visible. Statistics from Meta and the FTC are not conflated.

Design preferences: round hands, stable head/neck/ears, Times New Roman with bundled Liberation Serif fallback, and no scene counter in the animation.

- [Animation source](../../viewer/src/projects/meta/)
- [Final soundtrack](../../viewer/public/audio/meta.mp3)
- `script.en.txt` / `script.json`: complete narration and shot plan.
- `shots.json`: exact scene/voice timing.
- `deliverables/`: SRT captions, thumbnail PNG/SVG, scene CSV, YouTube chapters/description.
- `sources-and-assumptions.md`: evidence map, attribution boundaries and reconstruction details.

## Rebuild

From repository root: `cd viewer && npm ci && npm run dev`; choose episode 005. Production: `VIEWER_BASE_PATH=/GPT-motion-canvas/ npm run build` inside `viewer/`. The Meta project imports shared helpers from the trial and scroll projects, so keep those directories.

Audio: Python 3.11+, FFmpeg and packages from `requirements.txt`. Obtain `kokoro-v1.0.fp16.onnx` and `voices-v1.0.bin` from [kokoro-onnx releases](https://github.com/thewh1teagle/kokoro-onnx/releases); put them in `work/models/`. Create `public`, `src`, `work/voice-shots` and `work/delivery`. Run `synthesize.py`, `sound_design.py`, `transcribe.py`, `prepare_delivery.py` and `align_captions.py` in that order. Copy new timing/audio/captions into viewer paths and recheck synchronization after changes. Large WAV intermediates and model files are omitted.

Case status and policy statements were checked 23 October 2026. Review sources again before making a later news update.
