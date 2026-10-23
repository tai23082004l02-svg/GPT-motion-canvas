import type {Episode} from './catalog';
import type {Caption,ExportProgress} from './export-video';
import {icon} from './icons';

type ExportHost={getEpisode:()=>Episode;getCaptions:()=>Caption[];pause:()=>void;isReady:()=>boolean};
const stamp=(t:number)=>`${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;
export function setupExportPanel(host:ExportHost){
 document.body.insertAdjacentHTML('beforeend',`<dialog id="export-dialog" class="export-dialog" aria-labelledby="export-title"><div class="eyebrow">TẢI VIDEO ĐỂ ĐĂNG YOUTUBE</div><h2 id="export-title">Xuất video MP4</h2><p id="export-episode" class="export-episode"></p><fieldset id="export-options" class="export-options"><label>Độ nét<select id="export-resolution"><option value="1080">1080p · 1920 × 1080</option><option value="720">720p · 1280 × 720</option></select></label><label>Thời lượng<select id="export-range"><option value="full">Toàn bộ tập</option><option value="preview">Thử 10 giây đầu</option></select></label><label class="export-check"><input id="export-captions" type="checkbox">Gắn phụ đề tiếng Anh vào hình</label></fieldset><p class="export-note">File gồm lời đọc, nhạc và hiệu ứng, ở tốc độ gốc và 30 fps. Âm lượng hoặc nút tắt tiếng khi xem không ảnh hưởng đến file xuất.</p><p class="export-note">Nên dùng Chrome hoặc Edge mới trên máy tính. Giữ trang mở trong lúc xuất; video dài có thể cần vài phút.</p><section id="export-progress-panel" class="export-progress-panel" hidden aria-live="polite"><div class="export-progress-heading"><strong id="export-status"></strong><span id="export-percent"></span></div><progress id="export-progress" max="1" value="0" aria-label="Tiến độ xuất video"></progress><p id="export-detail"></p></section><p id="export-error" class="export-error" role="alert" hidden></p><div id="export-result" class="export-result" hidden><strong>Video đã sẵn sàng.</strong><a id="export-download" class="export-download">${icon('download')} Tải MP4</a><p>Nếu file chưa tự tải xuống, bấm Tải MP4.</p></div><div class="export-extras"><a id="export-srt">${icon('cc')} Tải phụ đề SRT</a><a id="export-poster">${icon('download')} Tải ảnh bìa</a></div><div class="export-actions"><button id="export-close" class="export-secondary">Đóng</button><button id="export-cancel" class="export-secondary" hidden>Hủy xuất</button><button id="export-start" class="export-primary">${icon('download')} Bắt đầu xuất</button></div></dialog>`);
 const get=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id)! as T;
 const dialog=get<HTMLDialogElement>('export-dialog'),start=get<HTMLButtonElement>('export-start'),close=get<HTMLButtonElement>('export-close'),cancel=get<HTMLButtonElement>('export-cancel'),options=get<HTMLFieldSetElement>('export-options'),resolution=get<HTMLSelectElement>('export-resolution'),range=get<HTMLSelectElement>('export-range'),burn=get<HTMLInputElement>('export-captions');
 let running=false,controller:AbortController|null=null,resultUrl:string|null=null;
 const resetResult=()=>{get('export-result').hidden=true;if(resultUrl){const old=resultUrl;window.setTimeout(()=>URL.revokeObjectURL(old),60000);resultUrl=null;}};
 const showProgress=(progress:ExportProgress)=>{
  const percent=Math.round(progress.fraction*100);get<HTMLProgressElement>('export-progress').value=progress.fraction;get('export-percent').textContent=`${percent}%`;
  get('export-status').textContent=controller?.signal.aborted?'Đang hủy…':progress.phase==='prepare'?'Đang chuẩn bị hình và âm thanh…':progress.phase==='finalize'?'Đang hoàn tất file MP4…':'Đang xuất video…';
  get('export-detail').textContent=progress.phase==='render'?`${progress.frames.toLocaleString()} / ${progress.totalFrames.toLocaleString()} khung hình · Đã chạy ${stamp(progress.elapsed)}${progress.eta!==null?' · Còn khoảng '+stamp(progress.eta):''}`:progress.phase==='prepare'?'Đang tải tài nguyên và chuẩn bị âm thanh.':'Đang ghép hình và âm thanh để tải xuống.';
  dialog.dataset.phase=progress.phase;dialog.dataset.frames=String(progress.frames);
 };
 const downloadAsset=async(url:string,name:string)=>{const response=await fetch(url);if(!response.ok)throw new Error('Không tải được tài nguyên.');const blob=await response.blob();const local=URL.createObjectURL(blob);const a=document.createElement('a');a.href=local;a.download=name;a.click();window.setTimeout(()=>URL.revokeObjectURL(local),60000)};
 const showError=(error:unknown)=>{get('export-error').hidden=false;get('export-error').textContent=error instanceof Error?error.message:'Không xuất được video. Hãy thử lại.';};
 get('export-video').addEventListener('click',()=>{
  host.pause();resetResult();get('export-error').hidden=true;get('export-progress-panel').hidden=true;dialog.dataset.phase='idle';start.disabled=false;start.innerHTML=`${icon('download')} Bắt đầu xuất`;
  const ep=host.getEpisode();get<HTMLAnchorElement>('export-srt').href=ep.captions;get<HTMLAnchorElement>('export-poster').href=ep.poster;get('export-episode').textContent=ep.title;range.options[0].textContent=`Toàn bộ tập · ${stamp(ep.duration)}`;
  dialog.showModal();
 });
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('cancel',event=>{if(running)event.preventDefault()});
 cancel.addEventListener('click',()=>{controller?.abort();cancel.disabled=true;get('export-status').textContent='Đang hủy…';});
 get('export-srt').addEventListener('click',event=>{event.preventDefault();const ep=host.getEpisode();void downloadAsset(ep.captions,`${ep.id}.en.srt`).catch(showError)});
 get('export-poster').addEventListener('click',event=>{event.preventDefault();const ep=host.getEpisode();void downloadAsset(ep.poster,`${ep.id}-thumbnail.${ep.poster.endsWith('.jpg')?'jpg':'png'}`).catch(showError)});
 start.addEventListener('click',async()=>{
  if(running)return;if(!host.isReady()){showError(new Error('Tập phim đang chuẩn bị. Chờ vài giây rồi bấm lại nhé.'));return;}
  const ep=host.getEpisode(),height=Number(resolution.value) as 720|1080,preview=range.value==='preview';
  const filename=`motion-room-${ep.id}-${height}p${preview?'-preview-10s':''}.mp4`;
  resetResult();get('export-error').hidden=true;get('export-progress-panel').hidden=false;
  running=true;options.disabled=true;start.hidden=true;close.hidden=true;cancel.hidden=false;cancel.disabled=false;controller=new AbortController();
  showProgress({phase:'prepare',fraction:0,frames:0,totalFrames:0,elapsed:0,eta:null});
  const unload=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue='';};window.addEventListener('beforeunload',unload);
  let wakeLock:WakeLockSentinel|null=null;
  try{
   try{wakeLock=await navigator.wakeLock?.request('screen')}catch{/* Export still works without a wake lock. */}
   const {exportVideo}=await import('./export-video');
   const blob=await exportVideo({episode:ep,height,captions:host.getCaptions(),burnCaptions:burn.checked,signal:controller.signal,onProgress:showProgress,end:preview?Math.min(10,ep.duration):ep.duration});
   if(controller.signal.aborted)throw new DOMException('Đã hủy xuất video.','AbortError');
   resultUrl=URL.createObjectURL(blob);const a=get<HTMLAnchorElement>('export-download');a.href=resultUrl;a.download=filename;
   get('export-result').hidden=false;get<HTMLProgressElement>('export-progress').value=1;get('export-percent').textContent='100%';get('export-status').textContent='Xuất video thành công';get('export-detail').textContent=`${filename} · ${(blob.size/1024/1024).toFixed(1)} MB`;
   dialog.dataset.phase='done';a.click();
  }catch(error){
   if(controller.signal.aborted){dialog.dataset.phase='canceled';get('export-status').textContent='Đã hủy xuất video';get('export-detail').textContent='Không lưu file video chưa hoàn tất.';get('export-percent').textContent='';}
   else{dialog.dataset.phase='error';showError(error);get('export-status').textContent='Chưa xuất được video';get('export-detail').textContent='Bạn có thể thử lại với 720p hoặc đổi trình duyệt.';}
  }finally{
   running=false;controller=null;options.disabled=false;start.hidden=false;close.hidden=false;cancel.hidden=true;start.innerHTML=`${icon('download')} Xuất lại`;
   window.removeEventListener('beforeunload',unload);try{await wakeLock?.release()}catch{/* Already released. */}
  }
 });
}
