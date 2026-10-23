from faster_whisper import WhisperModel
import json, subprocess, numpy as np
model=WhisperModel('base.en',device='cpu',compute_type='int8',cpu_threads=4)
audio=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i','public/narration.wav','-f','f32le','-ac','1','-ar','16000','pipe:1']),dtype=np.float32)
segments,info=model.transcribe(audio,word_timestamps=True,beam_size=3)
out=[]
for s in segments:
 out.append({'start':s.start,'end':s.end,'text':s.text,'words':[{'start':w.start,'end':w.end,'word':w.word} for w in s.words]})
 print(f'{s.start:.2f} {s.text}',flush=True)
json.dump(out,open('work/word-timestamps.json','w'),indent=2)
