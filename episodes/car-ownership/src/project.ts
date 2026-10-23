import {makeProject} from '@motion-canvas/core';
import editorPlugin from '@motion-canvas/2d/editor/index.js';
import main from './scenes/main?scene';
// Import explicitly so the editor plugin resolves in a headless renderer too.
main.plugins=[editorPlugin()];
export default makeProject({scenes:[main],audio:'/soundtrack.mp3'});
