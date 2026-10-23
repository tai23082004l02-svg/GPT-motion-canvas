import project from './project?project';
import {Renderer,Vector2} from '@motion-canvas/core';
class PipeExporter {
 static id='pipe'; static displayName='Pipe';
 static async create(){return new PipeExporter()}
 async handleFrame(canvas:HTMLCanvasElement,frame:number){await (window as any).sendFrame(canvas.toDataURL('image/jpeg',0.93).split(',')[1],frame)}
 async stop(result:number){(window as any).renderResult=result}
}
(project.meta.rendering.exporter as any).exporters.push(PipeExporter);
project.logger.onLogged.subscribe((v:any)=>console.log('MCLOG',JSON.stringify(v)));
const renderer=new Renderer(project);document.body.appendChild(renderer.stage.finalBuffer);
const duration=(await (await fetch('/duration.json')).json()).duration;
(window as any).renderer=renderer;
(window as any).startRender=async(from=0,to=duration,fps=30)=>{
 await renderer.render({name:'car-ownership',range:[from,to],fps,size:new Vector2(1920,1080),resolutionScale:1,colorSpace:'srgb',background:'#f7f2e8',exporter:{name:'pipe',options:{}}});(window as any).done=true;
};
(window as any).ready=true;
