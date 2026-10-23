import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
export default defineConfig({
 plugins:[motionCanvas()],
 optimizeDeps:{include:['@motion-canvas/core','@motion-canvas/2d','parse-svg-path'],exclude:['@motion-canvas/ui','@motion-canvas/2d/editor/index.js']},
 resolve:{dedupe:['preact','@preact/signals','@motion-canvas/core','@motion-canvas/ui']},
 server:{host:'0.0.0.0',port:9001,watch:{ignored:['**/car-ownership/work/**']}},
});
