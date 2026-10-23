# Verification

TypeScript check and Vite production build passed. Chromium playback checked: audio advances with canvas frames; pause holds its time; scene seeking reaches frames 1491 and 11520 at 49.7 s and 384 s. Canonical captions display the expected narration at 6 seconds. All 24 scenes were inspected around six seconds into each scene; corrected phone scale, evidence-label spacing, character clearance and final door/arm contrast. Final walking cycles stop at the destination. No browser page errors observed. Mobile viewport 390×844 has document width 390 px, with no horizontal overflow. Playback rate 1.5× verified.

Audio: 390.7644 seconds of program; stereo MP3. FFmpeg final mix analysis: -16.26 LUFS integrated, -3.24 dBTP, 2.6 LU loudness range. Original bed ducks during speech; debit alert, clicks, door latches, interruption notification and resolution cues follow scene action beats.

These checks concern implementation and layout, not predicted YouTube performance.

Revision: replaced long finger strokes with circular hands on phone, cup and pointing poses. Reviewed phone scenes and long UI labels after switching episode text/pills and captions to Times New Roman with Liberation Serif fallback. Chromium loaded both fallback font weights successfully; five sampled scenes produced no page errors. Thumbnail updated to the same serif stack.
