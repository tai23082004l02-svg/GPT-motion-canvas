import os
os.environ.setdefault('OMP_NUM_THREADS','4')
import onnxruntime as ort
ort.set_default_logger_severity(3)
from kokoro_onnx import Kokoro
import json,pathlib,numpy as np,soundfile as sf,time
shots=json.load(open('script.json'));k=Kokoro('work/models/kokoro-v1.0.fp16.onnx','work/models/voices-v1.0.bin')
assert 'am_michael' in k.get_voices()
pathlib.Path('work/voice-shots').mkdir(exist_ok=True)
all_audio=[];offset=0;sr=24000
for idx,s in enumerate(shots):
 p=pathlib.Path('work/voice-shots')/f'{s["id"]:02}.wav';t=time.time()
 if p.exists():a,sr=sf.read(p,dtype='float32')
 else:
  a,sr=k.create(s['narration'],voice='am_michael',speed=1.05,lang='en-us',sentence_pause=.20,clause_pause=.09)
  sf.write(p,a,sr)
 lead=.32;tail=.42 if idx<len(shots)-1 else 1.0
 padded=np.concatenate([np.zeros(round(sr*lead),dtype=np.float32),a,np.zeros(round(sr*tail),dtype=np.float32)])
 s['start']=offset/sr;s['voiceStart']=(offset+round(sr*lead))/sr;s['voiceEnd']=(offset+round(sr*lead)+len(a))/sr
 offset+=len(padded);s['end']=offset/sr;all_audio.append(padded)
 print(f'{s["id"]:02} {s["start"]:.2f}–{s["end"]:.2f}s | generated {time.time()-t:.1f}s | {s["kind"]}',flush=True)
sf.write('public/narration.wav',np.concatenate(all_audio),sr)
pathlib.Path('src/shots.json').write_text(json.dumps(shots,indent=2))
pathlib.Path('public/duration.json').write_text(json.dumps({'duration':offset/sr,'voice':'am_michael','speed':1.05}))
print('FINISHED',offset/sr,flush=True)
