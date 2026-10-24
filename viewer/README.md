# Motion Room

Online viewer for the owner's Motion Canvas episodes. Animations render live on Canvas; audio plays from an HTML audio element. Playback draws the animation live; optional MP4 export renders frames locally in the browser.

## Run

```sh
npm ci
npm run dev
```

Open the printed Local URL. Development serves the viewer at the root; production uses `VIEWER_BASE_PATH` when configured.

```sh
npm run check
npm run build
npx vite preview --port 9011
```

Use a static host that supports HTTP byte ranges for audio seeking. Vite preview and the production host support this. Python's basic `http.server` does not and is unsuitable for testing audio seek.

## Latest episode

SCOPIVO episode 006: [How Did People Survive Winter Before Electricity?](https://tai23082004l02-svg.github.io/GPT-motion-canvas/?episode=winter), 9:01, 32 scenes. Original reusable stick characters and generated background plates. Research, disclosure, production scripts and publishing materials are in `../episodes/winter-before-electricity/`.

## Features

- Episode library, scene selection, seeking, pause/resume, speed and volume.
- Selectable English captions, fullscreen, keyboard shortcuts and local viewing progress.
- Canvas resolution 720p or 1080p; logical scene coordinates remain 1920×1080.
- The HTML audio clock drives Motion Canvas frame seeks, keeping pitch-correct playback at 0.75–2× speed.
- Local browser storage holds only viewing position and subtitle preference.
- Animation pauses when the tab becomes hidden.
- Alex's head, neck and ears are stable in this online adaptation.

## Export MP4

Choose an episode and click **Xuất MP4** below the viewer. Select 1080p or 720p, keep the default full episode or choose the clearly labeled 10-second preview, then click **Bắt đầu xuất**. The finished MP4 downloads automatically; **Tải MP4** remains available if the browser did not start the download. Keep the page open. Chrome/Edge on desktop are recommended; support is checked before encoding and unsupported browsers get a clear message.

- Output: H.264 video at 30 fps, stereo AAC-LC at 48 kHz / 192 kbps in MP4 with Fast Start.
- Uses Motion Canvas `Renderer` and a separate exporter/project instance, not a real-time screen recording. Progress and cancel are available.
- The soundtrack is decoded offline and interleaved with deterministic frame timestamps. Mute, volume, current seek position, playback speed and preview quality never change the exported program.
- Default output has no burned captions; upload the separately downloaded SRT to YouTube. Optional burned captions use the episode's font stack.
- Exports only the artwork canvas, excluding player controls, badges and HTML overlays. Source artwork remains as authored.
- Rendering occurs on the user's device without a rendering server or uploaded credentials. Keep the tab open. The soundtrack is decoded in memory and the compressed output is buffered, so long exports need available memory; 720p is a useful alternative on smaller machines.
- Cancellation/failure does not download a partial file. A new export can be started afterward. Rendering errors and missing audio fail visibly.
- `src/export-video.ts`: encoder and Motion Canvas renderer integration; `src/export-ui.ts`: export dialog. Dependencies load only when exporting. The AAC extension supplies an encoder when native AAC encoding is unavailable.
- Software notices and corresponding upstream source links: [media-export.txt](public/licenses/media-export.txt).

## Add an episode

1. Add the Motion Canvas source under `src/projects/<id>/` and a `project.ts` exporting `makeProject` with its scenes. Audio is controlled by the viewer, not the project.
2. Put its soundtrack, poster and SRT in `public/audio`, `public/images` and `public/captions`.
3. Register its metadata, exact duration and scene timings in `src/catalog.ts`, and the project path in `vite.config.ts`.
4. Commit and push to `main`; GitHub Actions builds and redeploys the viewer to GitHub Pages. There is no deployment-time video render step; users render MP4s on demand.

Visuals and soundtracks originate from the owner's GPT-motion-canvas repository. Kokoro am_michael is used for the original narrated episodes. See the episode's attribution document in that repository for voice and dependency provenance. Bundled DejaVu font license is included alongside the fonts.

The GitHub Pages viewer is public. Exporting does not require a GitHub login.

## Export verification

`npm run test:export` builds the production app and runs browser integration checks with Chromium, FFmpeg and ffprobe installed. Set `CHROMIUM_PATH` if Chromium is elsewhere. It verifies an actual 720p H.264/AAC file, frame count/duration, audible sound while muted, retry after cancel, playback restoration, mobile dialog layout, unsupported codec handling and missing-audio failure. Tests use temporary files and clean up the preview server/browser. `EXPORT_QA_URL` can point the same checks at a deployed viewer.

The pinned AAC fallback currently emits a 1024-sample priming block. Export sets its first timestamp to -1024/48000 so the MP4 edit list removes that encoder delay. Recheck audio alignment when updating the pinned media dependencies.
