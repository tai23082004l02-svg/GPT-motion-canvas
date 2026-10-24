import {Logger,ObjectMetaField,ProjectMetadata,Renderer,RendererResult,Vector2} from '@motion-canvas/core';
import type {ExporterClass,Project} from '@motion-canvas/core';
import {AudioBufferSource,BufferTarget,CanvasSource,Mp4OutputFormat,Output,Quality,canEncodeAudio,canEncodeVideo} from 'mediabunny';
import type {Episode} from './catalog';

export type Caption={start:number;end:number;text:string};
export type ExportProgress={phase:'prepare'|'render'|'finalize';fraction:number;frames:number;totalFrames:number;elapsed:number;eta:number|null};
export type ExportOptions={episode:Episode;height:720|1080;captions:Caption[];burnCaptions:boolean;signal:AbortSignal;onProgress:(progress:ExportProgress)=>void;start?:number;end?:number};
const FPS=30,SAMPLE_RATE=48000;
let softwareAac=false;
function abortIfNeeded(signal:AbortSignal){if(signal.aborted)throw new DOMException('Đã hủy xuất video.','AbortError');}

/** Render each Motion Canvas frame once and encode with deterministic timestamps. */
export async function exportVideo(options:ExportOptions):Promise<Blob>{
 const {episode,height,signal,onProgress}=options;
 const width=height===1080?1920:1280;
 const start=Math.max(0,options.start??0),end=Math.min(episode.duration,options.end??episode.duration);
 // Frame-align the start so scene time and trimmed audio have the same origin.
 const fromFrame=Math.round(start*FPS),from=fromFrame/FPS,duration=end-from;
 if(!(duration>0))throw new Error('Khoảng xuất video không hợp lệ.');
 const totalFrames=Math.ceil(duration*FPS),started=performance.now();
 const report=(phase:ExportProgress['phase'],frames=0)=>{const elapsed=(performance.now()-started)/1000;const fraction=phase==='prepare'?0:phase==='finalize'?.99:Math.min(.98,frames/totalFrames*.98);onProgress({phase,fraction,frames,totalFrames,elapsed,eta:frames>10?elapsed/frames*(totalFrames-frames):null})};
 report('prepare');abortIfNeeded(signal);
 if(typeof VideoEncoder==='undefined'||!await canEncodeVideo('avc',{width,height,frameRate:FPS,quality:new Quality({bitrate:height===1080?8_000_000:5_000_000})})){
  throw new Error('Trình duyệt này chưa hỗ trợ xuất MP4 ở độ nét đã chọn. Hãy dùng Chrome hoặc Edge mới trên máy tính, hoặc thử 720p.');
 }
 if(!await canEncodeAudio('aac',{numberOfChannels:2,sampleRate:SAMPLE_RATE})){
  const {registerAacEncoder}=await import('@mediabunny/aac-encoder');registerAacEncoder();softwareAac=true;
 }
 abortIfNeeded(signal);
 const [module,response]=await Promise.all([episode.load(),fetch(episode.audio,{signal}),document.fonts.load('400 46px "DejaVu Sans"'),document.fonts.load('700 46px "DejaVu Sans"'),document.fonts.load('400 46px "Liberation Serif"'),document.fonts.load('700 46px "Liberation Serif"')]);
 if(!response.ok)throw new Error('Không tải được âm thanh để xuất video. Hãy kiểm tra kết nối rồi thử lại.');
 // Offline decoding neither plays sound nor applies the viewer's volume, mute or speed.
 const decoder=new OfflineAudioContext(2,1,SAMPLE_RATE);
 const decoded=await decoder.decodeAudioData(await response.arrayBuffer());
 abortIfNeeded(signal);
 const totalSamples=Math.round(duration*SAMPLE_RATE),firstSample=Math.round(from*SAMPLE_RATE);
 let audioSent=0,frames=0,output:Output<Mp4OutputFormat,BufferTarget>|null=null,video:CanvasSource|null=null,audio:AudioBufferSource|null=null,blob:Blob|null=null,lastError:Error|null=null;
 let result=RendererResult.Error;
 const composite=document.createElement('canvas');composite.width=width;composite.height=height;
 const context=composite.getContext('2d')!;
 let renderer:Renderer;
 const addAudio=async(until:number)=>{
  while(audioSent<until){
   abortIfNeeded(signal);
   const count=Math.min(SAMPLE_RATE,until-audioSent);
   const buffer=new AudioBuffer({length:count,numberOfChannels:2,sampleRate:SAMPLE_RATE});
   for(let channel=0;channel<2;channel++){
    const input=decoded.getChannelData(Math.min(channel,decoded.numberOfChannels-1));
    const offset=firstSample+audioSent;buffer.getChannelData(channel).set(input.subarray(offset,Math.min(input.length,offset+count)));
   }
   await audio!.add(buffer);audioSent+=count;
  }
 };
 const browserExporter:ExporterClass={
  id:'motion-room/mp4',displayName:'Motion Room MP4',meta:()=>new ObjectMetaField('MP4',{}),
  create:async()=>({
   async start(){
    abortIfNeeded(signal);
    const target=new BufferTarget();
    output=new Output({format:new Mp4OutputFormat({fastStart:'reserve'}),target});
    video=new CanvasSource(options.burnCaptions?composite:renderer.stage.finalBuffer,{codec:'avc',quality:new Quality({bitrate:height===1080?8_000_000:5_000_000}),keyFrameInterval:2,latencyMode:'quality'});
    // The fallback emits FFmpeg AAC's 1024-sample priming block at its input timestamp.
    // A negative first packet lets MP4's edit list skip this encoder delay.
    audio=new AudioBufferSource({codec:'aac',quality:new Quality({bitrate:192_000})},{startTimestamp:softwareAac?-1024/SAMPLE_RATE:0});
    output.addVideoTrack(video,{frameRate:FPS,maximumPacketCount:totalFrames+2});
    output.addAudioTrack(audio,{languageCode:'eng',maximumPacketCount:Math.ceil(totalSamples/1024)+32});
    output.setMetadataTags({title:episode.title,artist:'SCOPIVO'});
    await output.start();report('render');
   },
   async handleFrame(canvas,frame){
    abortIfNeeded(signal);const index=frame-fromFrame;
    // Motion Canvas includes the range endpoint. Do not encode an extra frame.
    if(index<0||index>=totalFrames)return;
    if(index!==frames)throw new Error('Quá trình dựng bị thiếu khung hình. Hãy thử xuất lại.');
    // Keep the final frame a full 1/30 s too; a short last frame can round to
    // zero duration in MP4's frame-rate timebase. The video tail is <1 frame.
    const timestamp=index/FPS,frameDuration=1/FPS;
    if(index%FPS===0)await addAudio(Math.min(totalSamples,Math.round((timestamp+1)*SAMPLE_RATE)));
    if(options.burnCaptions){context.drawImage(canvas,0,0,width,height);drawCaption(context,options.captions.find(c=>frame/FPS>=c.start&&frame/FPS<c.end)?.text??'',width,height,episode.id);}
    await video!.add(timestamp,frameDuration,{keyFrame:index%(FPS*2)===0});
    frames++;if(frames%10===0||frames===totalFrames)report('render',frames);
   },
   async stop(status){
    if(status!==RendererResult.Success||signal.aborted){await output?.cancel();return;}
    if(frames!==totalFrames)throw new Error('Video chưa được dựng đủ thời lượng. Không lưu bản xuất thiếu.');
    await addAudio(totalSamples);report('finalize',frames);
    await video!.close();await audio!.close();await output!.finalize();
    abortIfNeeded(signal);
    const buffer=output!.target.buffer;if(!buffer)throw new Error('Không tạo được file MP4.');
    blob=new Blob([buffer],{type:'video/mp4'});
   },
  }),
 };
 // A separate project metadata/exporter instance leaves live playback settings intact.
 const project:Project={...module.default,audio:undefined,logger:new Logger(),plugins:[{name:'motion-room/mp4',exporters:()=>[browserExporter]}]};
 project.meta=new ProjectMetadata(project);
 const unlog=project.logger.onLogged.subscribe(entry=>{if(entry.level==='error')lastError=new Error(entry.message)});
 renderer=new Renderer(project);
 const unfinish=renderer.onFinished.subscribe(status=>{result=status});
 const cancel=()=>renderer.abort();signal.addEventListener('abort',cancel,{once:true});
 try{
  abortIfNeeded(signal);
  await renderer.render({name:episode.id,range:[from,end],fps:FPS,size:new Vector2(1920,1080),resolutionScale:height/1080,colorSpace:'srgb',background:episode.id==='car'?'#f7f2e8':'#0b1220',exporter:{name:browserExporter.id,options:{}}});
  abortIfNeeded(signal);
  if(Number(result)!==RendererResult.Success||!blob)throw lastError??new Error('Không xuất được video. Hãy thử lại với 720p hoặc dùng Chrome/Edge mới.');
  return blob;
 }finally{
  signal.removeEventListener('abort',cancel);unlog();unfinish();
  if(!blob)try{await output?.cancel()}catch{/* Release encoder resources after errors. */}
 }
}

function drawCaption(ctx:CanvasRenderingContext2D,value:string,width:number,height:number,episodeId:string){
 if(!value)return;
 const scale=height/1080,size=46*scale,lineHeight=56*scale,padding=20*scale;
 ctx.save();ctx.font=`600 ${size}px ${['trial','meta','winter'].includes(episodeId)?'"Times New Roman", "Liberation Serif", serif':'"DejaVu Sans", sans-serif'}`;
 ctx.textAlign='center';ctx.textBaseline='middle';
 const lines:string[]=[];
 for(const paragraph of value.split('\n')){let line='';for(const word of paragraph.split(/\s+/)){const candidate=line?line+' '+word:word;if(line&&ctx.measureText(candidate).width>width*.86){lines.push(line);line=word}else line=candidate;}if(line)lines.push(line);}
 const maxWidth=Math.max(...lines.map(line=>ctx.measureText(line).width)),bottom=height-90*scale,top=bottom-lines.length*lineHeight-padding*2;
 ctx.fillStyle='rgba(13,20,23,.88)';ctx.beginPath();ctx.roundRect((width-maxWidth)/2-padding,top,maxWidth+padding*2,bottom-top,10*scale);ctx.fill();
 ctx.fillStyle='#ffffff';lines.forEach((line,i)=>ctx.fillText(line,width/2,top+padding+lineHeight*(i+.5)));ctx.restore();
}
