# MP4 export verification — 2026-10-23

Tested with system Chromium on Linux using the production Vite build. Native H.264 encoding was available; AAC used the bundled software fallback.

- Full Meta episode at 1080p: 88,329,007 bytes; 12,912 H.264 frames; constant 30 fps; 1920×1080; 430.400 seconds. Stereo AAC at 48 kHz lasts 430.378667 seconds. The video tail differs by less than one frame.
- Complete export took approximately 2 minutes 20 seconds on the test machine. Performance and file size depend on the user's device and encoder.
- The full file decoded successfully with FFmpeg. Audio alignment was checked against the original soundtrack at the beginning, middle and end: zero measured lag. The final frame-duration adjustment does not alter audio timestamps.
- MP4 metadata precedes media data (Fast Start).
- Actual 1080p and 720p ten-second exports worked, including optional English captions.
- Automated browser checks covered audible output with muted 2× preview, cancellation followed by successful retry, resumed playback, mobile dialog sizing, unsupported encoders and missing audio. No unhandled browser errors occurred.

Run `npm run test:export` for repeatable checks, or point `EXPORT_QA_URL` at the deployed site and run `node tests/export.mjs`. A modern desktop browser and sufficient memory are recommended. This verifies file creation and decoding; it does not claim an upload to YouTube.
