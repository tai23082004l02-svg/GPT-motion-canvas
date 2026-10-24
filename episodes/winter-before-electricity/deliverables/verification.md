# Production verification — 24 October 2026

- English narration: 1,268 words, Kokoro `am_michael`, speed 1.05; scene/voice timings come from the actual generated waveform.
- Program duration: 540.996083 seconds (9:01), 32 continuous scenes. Every narration interval lies inside its scene.
- Independent faster-whisper transcript compared with the script: 98.47% normalized word-sequence agreement. Proper nouns and punctuation were corrected in captions using the canonical script; this percentage is a transcription check, not a claim of perfect pronunciation.
- 152 SRT cues: all have positive duration, no overlaps, all within the program, at most two wrapped lines. A zero-duration recognized word was merged into its following phrase.
- Final MP3: stereo, 48 kHz, 192 kbps. Measured integrated loudness −16.41 LUFS, true peak −3.33 dBTP. Original generated music and Foley remain below narration.
- Browser playback, seeking through all 32 scenes, English captions and a 390-pixel mobile viewport checked. No unhandled page errors. After artwork corrections, the affected eight scenes were checked again against the production build.
- Artwork review corrected caption/face overlaps, stable attached heads, finite walking gestures, a connected stirring tool, three-person family continuity, seated supports and a horizontal sleeping pose.
- The family sleeps on a portable mattress, consistent with the research distinction between bedding and fixed wooden bedsteads.
- TypeScript and production build passed. MP4 checks are recorded below; deployed-site checks follow deployment.

The film uses fictional characters and illustrative scenes. Research limitations are documented in `../sources-and-assumptions.md`. Browser/device encoding performance varies. No video has been uploaded to YouTube by this production process.

## Full browser export

Production-build export completed in approximately 4 minutes 20 seconds on the test machine, with no unhandled browser errors:

- File: 327,328,513 bytes (312.2 MiB), H.264 1920×1080, constant 30 fps, **16,230 frames**.
- Full file decoded to completion with FFmpeg without reported errors.
- Video duration: 541.000000 s; stereo AAC 48 kHz: 541.013333 s, including less than one frame of codec tail.
- Audio correlation against the source mix at 0, 270 and 535 seconds found **0 ms measured lag**; normalized similarities 0.999976 / 0.998274 / 0.992896 respectively.
- Separate actual 720p ten-second exports with burned captions passed; integration checks also passed cancellation/retry, audio independence from preview mute/speed, playback restoration, mobile layout, unsupported codec reporting and missing-audio failure.

The full test MP4 is retained as a local verification artifact, not committed as a large Git object. Viewers create the same program through the online export button; encoder-dependent sizes can vary.
