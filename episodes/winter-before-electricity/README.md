# How Did People Survive Winter Before Electricity?

**SCOPIVO · Episode 006 · 9:01 · English · 32 scenes · 1920×1080 / 30 fps**

[Watch online](https://tai23082004l02-svg.github.io/GPT-motion-canvas/?episode=winter)

Follow Joan, Will and Kit, a fictional farming family in southern England around 1400, from a cold morning to a long winter night. Reusable round-faced stick characters, three illustrated backgrounds, action-specific gestures, props, diagrams and sound design replace the earlier presentation-led format.

- [Animation and reusable artwork](../../viewer/src/projects/winter/)
- [Background plates](../../viewer/public/images/winter/)
- [Final Michael narration/music/Foley mix](../../viewer/public/audio/winter.mp3)
- [English captions](deliverables/captions.en.srt)
- [Thumbnail](deliverables/thumbnail.png)
- [YouTube description and sources](deliverables/youtube-description.txt)
- [Research boundaries](sources-and-assumptions.md) and [attribution](ATTRIBUTION.md)

The online viewer supports MP4 export. Choose this episode, select **Xuất MP4 → 1080p → Toàn bộ tập → Bắt đầu xuất**. It also downloads the SRT and thumbnail. Keep the tab open. No large pre-rendered MP4 is added to Git history.

Design: Times New Roman/Liberation Serif, circular hands, head fixed to body, no scene-number counter in the artwork. Family and exact actions are disclosed as fictional. This is one historical example, not a universal account of life before electricity.

## Build and reproduce

Viewer: `cd viewer && npm ci && npm run check && npm run build` from repository root. Run Vite development or preview normally. See the viewer README for base-path configuration and exports.

Audio production scripts run from this episode directory. Install `requirements.txt` and FFmpeg. Obtain `kokoro-v1.0.fp16.onnx` and `voices-v1.0.bin` from the upstream kokoro-onnx model releases, put them in `work/models/`, and create `work/voice-shots`, `work/delivery`, `src`, and `public`. Then run `production/synthesize.py`, `production/sound_design.py`, `production/transcribe.py`, `production/prepare_delivery.py`, and `production/align_captions.py` in that order. Copy resulting timings, SRT and soundtrack into the viewer, and revalidate synchronization. Intermediates/models are omitted.

Scenes use shared `art.ts` components for three character identities, walk/carry, pointing, cold/shrug, seated, sewing, stirring and sleeping poses. Props include wood bundles, pot, bowl, sack, bread, preserved fish, shutter, bed, light and chickens. Backgrounds are intentionally reusable.
