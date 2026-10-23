# Why You Keep Scrolling When You’re Not Even Having Fun

[Watch the live animation](https://tai23082004l02-svg.github.io/GPT-motion-canvas/?episode=scroll)

Episode 003 · English · 6:55.90 · 30 scenes · 1920×1080 composition at 30 fps. Narration: locally generated Kokoro `am_michael`, speed 1.05. Original procedural music and Foley. Playback draws Motion Canvas frames against the audio clock; no MP4 is used.

## Files

- `script.en.txt` / `script.json`: complete original narration and visual intentions.
- `shots.json`: exact scene and voice timing.
- `deliverables/`: English captions, thumbnail, scene CSV and YouTube chapters.
- `sources-and-assumptions.md`: evidence and limits.
- [Live animation source](../../viewer/src/projects/scroll/).
- [Mixed soundtrack](../../viewer/public/audio/scroll.mp3).

## Rebuild

For the viewer: `cd viewer && npm ci && npm run dev` from the repository root. Select episode 003. Production build: `VIEWER_BASE_PATH=/GPT-motion-canvas/ npm run build` inside `viewer/`.

Audio tools run from this episode directory with Python 3.11+ and FFmpeg available. Install `requirements.txt`; obtain `kokoro-v1.0.fp16.onnx` and `voices-v1.0.bin` from the [kokoro-onnx model releases](https://github.com/thewh1teagle/kokoro-onnx/releases), placing them in `work/models/`. Model files are not included. Create `work/voice-shots`, `public`, and `src` directories; run `python synthesize.py`, then `python sound_design.py`. Synthesis caches per-scene WAVs in `work/voice-shots`. Copy generated `src/shots.json` to the viewer project and `public/soundtrack.mp3` to `viewer/public/audio/scroll.mp3`. A changed voice/model can change timings; regenerate captions and verify scene sync. For new captions, run `python transcribe.py`, `python prepare_delivery.py`, and `python align_captions.py` in that order. The delivered captions already use canonical script wording aligned to the current narration.

The local speech model is synthetic; it is not a recording of a human presenter. Alex and the LOOP interface are fictional. Clock times and recommendation numbers are storytelling examples.
