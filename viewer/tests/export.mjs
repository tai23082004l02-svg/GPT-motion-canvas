// Browser integration checks. Requires Chromium, FFmpeg and ffprobe on the test machine.
import assert from 'node:assert/strict';
import {spawn,execFileSync} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {chromium} from 'playwright';

const folder=await mkdtemp(join(tmpdir(),'motion-export-'));
let server,browser;
const base=process.env.VIEWER_BASE_PATH||'/';
const origin=process.env.EXPORT_QA_URL||`http://127.0.0.1:9039${base}?episode=meta`;
try{
 if(!process.env.EXPORT_QA_URL){
  server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','9039','--strictPort'],{stdio:'ignore'});
  for(let i=0;i<100;i++){try{if((await fetch(origin)).ok)break}catch{}await new Promise(resolve=>setTimeout(resolve,100));}
 }
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage','--disable-background-timer-throttling']});
 const page=await browser.newPage({acceptDownloads:true});const errors=[];page.on('pageerror',error=>errors.push(String(error)));
 const ready=async p=>{await p.goto(origin);await p.waitForFunction(()=>document.querySelector('#canvas-host')?.dataset.ready==='true',null,{timeout:60000});};
 await ready(page);
 await page.selectOption('#speed','2');await page.click('#mute');
 await page.click('#export-video');await page.selectOption('#export-resolution','720');await page.selectOption('#export-range','preview');await page.check('#export-captions');
 const downloadPromise=page.waitForEvent('download',{timeout:180000});downloadPromise.catch(()=>{});
 await page.click('#export-start');await page.waitForFunction(()=>['done','error'].includes(document.querySelector('#export-dialog')?.dataset.phase),null,{timeout:180000});
 assert.equal(await page.locator('#export-dialog').getAttribute('data-phase'),'done',await page.locator('#export-error').textContent());
 const download=await downloadPromise;assert.match(download.suggestedFilename(),/720p-preview-10s\.mp4$/);
 const file=join(folder,'preview.mp4');await download.saveAs(file);
 const data=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
 const video=data.streams.find(s=>s.codec_type==='video'),audio=data.streams.find(s=>s.codec_type==='audio');
 assert.equal(video.codec_name,'h264');assert.equal(video.width,1280);assert.equal(video.height,720);assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_frames),300);
 assert.equal(audio.codec_name,'aac');assert.equal(audio.channels,2);assert.equal(Number(audio.sample_rate),48000);assert.ok(Math.abs(Number(data.format.duration)-10)<.05);
 // The exported file must contain real sound even when the viewer is muted.
 const report=spawn('ffmpeg',['-hide_banner','-i',file,'-af','volumedetect','-f','null','-']);let audioReport='';report.stderr.on('data',data=>audioReport+=data);await new Promise((resolve,reject)=>{report.on('error',reject);report.on('close',code=>code===0?resolve():reject(Error('audio analysis failed')))});assert.match(audioReport,/mean_volume: -[0-9.]+ dB/);assert.doesNotMatch(audioReport,/mean_volume: -inf/);
 assert.equal(await page.evaluate(()=>document.querySelector('audio').playbackRate),2);assert.equal(await page.evaluate(()=>document.querySelector('audio').muted),true);
 await page.click('#export-close');await page.click('#big-play');await page.waitForTimeout(500);assert.ok(await page.evaluate(()=>document.querySelector('audio').currentTime)>0);await page.click('#play');
 // Cancel a real render, then verify the same dialog can retry successfully.
 await page.click('#export-video');await page.selectOption('#export-range','full');await page.click('#export-start');await page.waitForFunction(()=>document.querySelector('#export-dialog')?.dataset.phase==='render',null,{timeout:60000});await page.click('#export-cancel');await page.waitForFunction(()=>document.querySelector('#export-dialog')?.dataset.phase==='canceled',null,{timeout:60000});
 await page.selectOption('#export-range','preview');const retry=page.waitForEvent('download',{timeout:180000});retry.catch(()=>{});await page.click('#export-start');await page.waitForFunction(()=>['done','error'].includes(document.querySelector('#export-dialog')?.dataset.phase),null,{timeout:180000});assert.equal(await page.locator('#export-dialog').getAttribute('data-phase'),'done');await retry;
 await page.click('#export-close');await page.setViewportSize({width:390,height:844});await page.click('#export-video');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);assert.ok(await page.locator('#export-resolution').evaluate(el=>el.getBoundingClientRect().width)>250);
 // Unsupported browsers must report a failure instead of downloading a disguised file.
 const unsupported=await browser.newPage();await unsupported.addInitScript(()=>{Object.defineProperty(window,'VideoEncoder',{value:undefined,configurable:true})});await ready(unsupported);await unsupported.click('#export-video');await unsupported.click('#export-start');await unsupported.waitForFunction(()=>document.querySelector('#export-dialog')?.dataset.phase==='error',null,{timeout:60000});assert.match(await unsupported.locator('#export-error').textContent(),/Chrome|Edge/);await unsupported.close();
 // A missing soundtrack must fail visibly; it must not create a silent MP4.
 await page.click('#export-close');const soundtrack=await page.evaluate(()=>document.querySelector('audio').src);await page.route(soundtrack,route=>route.fulfill({status:503,body:'unavailable'}));await page.click('#export-video');await page.click('#export-start');await page.waitForFunction(()=>document.querySelector('#export-dialog')?.dataset.phase==='error',null,{timeout:60000});assert.match(await page.locator('#export-error').textContent(),/âm thanh/);assert.equal(await page.locator('#export-result').isVisible(),false);
 assert.deepEqual(errors,[]);
 console.log('PASS: H.264/AAC MP4, 300 frames, audio independent of mute/speed, retry, cancel, playback, mobile, unsupported codecs and missing audio.');
}finally{await browser?.close();server?.kill();await rm(folder,{recursive:true,force:true});}
