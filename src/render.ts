import project from './project?project';
import {Renderer,Vector2} from '@motion-canvas/core';
class PipeExporter {
 static id='pipe'; static displayName='Pipe';
 static async create(){return new PipeExporter()}
 async handleFrame(canvas:HTMLCanvasElement,frame:number){await (window as any).sendFrame(canvas.toDataURL('image/jpeg',0.91).split(',')[1],frame)}
 async stop(result:number){(window as any).renderResult=result}
}
(project.meta.rendering.exporter as any).exporters.push(PipeExporter);
project.logger.onLogged.subscribe((v:any)=>console.log('MCLOG',JSON.stringify(v)));
const renderer=new Renderer(project);
document.body.appendChild(renderer.stage.finalBuffer);
(window as any).renderer=renderer;
(window as any).startRender=async(from=0,to=471.725,fps=30)=>{
 await renderer.render({name:'credit-card',range:[from,to],fps,size:new Vector2(1920,1080),resolutionScale:1,colorSpace:'srgb',background:'#0b1220',exporter:{name:'pipe',options:{}}});
 (window as any).done=true;
};
(window as any).ready=true;
