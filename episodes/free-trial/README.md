# Why Your Free Trial Is So Hard to Cancel

[Watch episode 004 online](https://tai23082004l02-svg.github.io/GPT-motion-canvas/?episode=trial)

6:30.76 · English · 24 scenes · 1920×1080 composition at 30 fps. Local Kokoro Michael narration, original procedural music and action-aligned sound effects. Motion Canvas draws frames against the audio clock; playback uses no MP4.

Alex signs up to watch a documentary, discovers a renewal at breakfast, navigates a fictional cancellation maze, and finds a more deliberate route out. New limb poses include phone use, drinking, pointing, carrying a receipt, shrugging and walking. Hands use simple circles, including the phone grip; no elongated finger strokes. Typography prefers Times New Roman, with bundled Liberation Serif as the fallback on devices without that font. Head, ears and neck share fixed geometry; the camera, limbs, expressions and props carry the action.

- [Animation source](../../viewer/src/projects/trial/)
- [Mixed audio](../../viewer/public/audio/trial.mp3)
- `script.en.txt`, `script.json`: narration and shot intentions.
- `shots.json`: exact scene/voice timing.
- `deliverables/`: English SRT, thumbnail PNG/SVG, scene CSV, YouTube chapters and description.
- `sources-and-assumptions.md`: evidence map, fictional material and policy limits.

## Rebuild

From repository root: `cd viewer && npm ci && npm run dev`; select episode 004. Production: `VIEWER_BASE_PATH=/GPT-motion-canvas/ npm run build` inside `viewer/`.

Audio requires Python 3.11+, FFmpeg and `requirements.txt`. Obtain `kokoro-v1.0.fp16.onnx` and `voices-v1.0.bin` from [kokoro-onnx releases](https://github.com/thewh1teagle/kokoro-onnx/releases), placing them in `work/models/`. Create `public`, `src`, `work/voice-shots`, and `work/delivery` directories. Run `synthesize.py`, `sound_design.py`, `transcribe.py`, `prepare_delivery.py`, then `align_captions.py`. The final step uses canonical narration wording aligned with ASR word times. Copy generated timings and audio/captions into the viewer paths above and recheck synchronization after voice changes. Model weights and large intermediate WAVs are not committed.
