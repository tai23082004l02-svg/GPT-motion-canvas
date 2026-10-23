# Motion Room

Online viewer for the owner's Motion Canvas episodes. Animations render live on Canvas; audio plays from an HTML audio element. No MP4 is generated, hosted or requested by the app.

## Run

```sh
npm ci
npm run dev
```

Open the printed Local URL. Both development and production serve the viewer at the root.

```sh
npm run check
npm run build
npx vite preview --port 9011
```

Use a static host that supports HTTP byte ranges for audio seeking. Vite preview and the production host support this. Python's basic `http.server` does not and is unsuitable for testing audio seek.

## Features

- Two episode library, scene selection, seeking, pause/resume, speed and volume.
- Selectable English captions, fullscreen, keyboard shortcuts and local viewing progress.
- Canvas resolution 720p or 1080p; logical scene coordinates remain 1920×1080.
- The HTML audio clock drives Motion Canvas frame seeks, keeping pitch-correct playback at 0.75–2× speed.
- Local browser storage holds only viewing position and subtitle preference.
- Animation pauses when the tab becomes hidden.
- Alex's head, neck and ears are stable in this online adaptation.

## Add an episode

1. Add the Motion Canvas source under `src/projects/<id>/` and a `project.ts` exporting `makeProject` with its scenes. Audio is controlled by the viewer, not the project.
2. Put its soundtrack, poster and SRT in `public/audio`, `public/images` and `public/captions`.
3. Register its metadata, exact duration and scene timings in `src/catalog.ts`, and the project path in `vite.config.ts`.
4. Commit and push to `main`; GitHub Actions builds and redeploys the viewer to GitHub Pages. No video render step is involved.

Visuals and soundtracks originate from the owner's GPT-motion-canvas repository. Kokoro am_michael is used for the car episode. See the episode's attribution document in that repository for voice and dependency provenance. Bundled DejaVu font license is included alongside the fonts.

The GitHub Pages viewer is public. Codespaces forwarded ports use GitHub’s private visibility by default.
