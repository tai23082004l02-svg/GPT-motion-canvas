import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import {resolve} from 'node:path';
const motionCanvasPlugin=(motionCanvas as any).default||motionCanvas;
export default defineConfig({
 base:process.env.VIEWER_BASE_PATH||'/',
 plugins:[motionCanvasPlugin({project:['./src/projects/trial/project.ts','./src/projects/scroll/project.ts','./src/projects/car/project.ts','./src/projects/credit/project.ts']}).filter((p:any)=>p.name!=='motion-canvas:editor'),{name:'viewer-entry',enforce:'post',configResolved(config){config.build.rollupOptions.input=resolve('index.html');}}],
 build:{outDir:'dist',emptyOutDir:true},server:{port:9010,host:'0.0.0.0'},
});
