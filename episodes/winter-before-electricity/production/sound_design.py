"""Original low-key score and synthesized winter Foley; no external recordings."""
import json,pathlib,subprocess,numpy as np,soundfile as sf
from scipy.signal import butter,sosfilt
shots=json.load(open('src/shots.json'));sr=24000;duration=shots[-1]['end'];n=round(duration*sr);rng=np.random.default_rng(2026102406)
bed=np.zeros((n,2),np.float32);fx=np.zeros_like(bed)
def mix(dst,a,at,amp=1,pan=0):
 i=round(at*sr)
 if i<0:a=a[-i:];i=0
 if i>=len(dst):return
 a=np.asarray(a[:len(dst)-i],dtype=np.float32)*amp
 dst[i:i+len(a),0]+=a*np.sqrt((1-pan)/2);dst[i:i+len(a),1]+=a*np.sqrt((1+pan)/2)
def note(midi,length=1.7,pad=False):
 t=np.arange(round(length*sr))/sr;f=440*2**((midi-69)/12)
 env=np.minimum(1,t/.7)*np.minimum(1,(length-t)/.9) if pad else (1-np.exp(-t*120))*np.exp(-t*3.2)
 return ((np.sin(2*np.pi*f*t)+.19*np.sin(2*np.pi*2*f*t)+.08*np.sin(2*np.pi*3*f*t))*env).astype(np.float32)
# Restrained plucked melody and warm sustained harmonies, 76 bpm, original pattern.
beat=60/76;bar=beat*4;chords=[[50,57,62,65],[46,53,58,62],[48,55,60,64],[45,52,57,62]]
for b in range(int(duration/bar)+1):
 at=b*bar;ch=chords[(b//3)%4]
 if b%3==0:
  for j,m in enumerate(ch):mix(bed,note(m,bar*3.2,True),at,.0024,(j-1.5)*.23)
 for j,idx in enumerate([0,2,1,3]):
  if b%4==3 and j>1:continue
  mix(bed,note(ch[idx]+12,2),at+j*beat,.0075,(-1 if j%2 else 1)*.3)
for s in shots:
 st=s['start'];d=s['end']-st;k=s['kind']
 tt=np.arange(round(d*sr))/sr
 if k in ['scope','wet','house','fuel','daylight','neighbors']:
  air=sosfilt(butter(2,[90,750],btype='bandpass',fs=sr,output='sos'),rng.standard_normal(len(tt)))
  air=air/np.std(air)*(.5+.35*np.sin(tt*.55));air*=np.minimum(1,tt)*np.minimum(1,d-tt)
  mix(fx,air,st,.0025,-.2)
 if k in ['hook','morning','dry','hearth','smoke','bundle','zone','pot','meal','chores','light','bed','embers','final']:
  crack=rng.standard_normal(len(tt))*.001
  for j in range(int(d*2.5)):
   at=rng.uniform(0,max(.01,d-.07));ct=np.arange(1200)/sr;pop=rng.standard_normal(len(ct))*np.exp(-ct*110)
   mix(fx,pop,st+at,.006,rng.uniform(-.5,-.15))
  mix(fx,crack,st,1,-.4)
 if k in ['wet','fuel','bundle','daylight','neighbors']:
  for j in range(8):
   ct=np.arange(round(sr*.10))/sr;step=(np.sin(2*np.pi*105*ct)*np.exp(-ct*45)+rng.standard_normal(len(ct))*.12*np.exp(-ct*35))
   mix(fx,step,st+1+j*.47,.018,-.25+j*.03)
 if k=='wet':
  ct=np.arange(round(sr*.22))/sr;splash=sosfilt(butter(2,3000,fs=sr,output='sos'),rng.standard_normal(len(ct)))*np.exp(-ct*15)
  mix(fx,splash,st+3.8,.025,.2)
 if k=='shutters':
  ct=np.arange(round(sr*.12))/sr;thunk=np.sin(2*np.pi*125*ct)*np.exp(-ct*35)
  mix(fx,thunk,st+3.8,.06,-.4)
 if k in ['pot','meal']:
  for j in range(5):
   ct=np.arange(round(sr*.07))/sr;tap=np.sin(2*np.pi*580*ct)*np.exp(-ct*65)
   mix(fx,tap,st+2+j*1.7,.016,-.1)
 if k in ['layers','dry','chores','bed']:
  ct=np.arange(round(sr*.32))/sr;cloth=sosfilt(butter(2,1800,fs=sr,output='sos'),rng.standard_normal(len(ct)))*np.sin(np.pi*ct/.32)**2
  mix(fx,cloth,st+2,.009,.1)
 if k=='noPotato':
  for j,m in enumerate([69,64]):mix(fx,note(m,.7),st+3+j*.16,.025,.2)
 if k=='final':
  for j,m in enumerate([62,65,69,74]):mix(fx,note(m,3),s['end']-3.5+j*.15,.025,0)
control=np.ones(n,np.float32)
for s in shots:control[round(s['voiceStart']*sr):round(s['voiceEnd']*sr)]=.43
fade=np.ones(n,np.float32);nn=sr*2;fade[:nn]=np.linspace(0,1,nn);fade[-nn:]=np.linspace(1,0,nn)
bed*=control[:,None]*fade[:,None]
sf.write('work/music-and-foley.wav',bed+fx,sr,subtype='PCM_16')
subprocess.run(['ffmpeg','-v','error','-y','-i','public/narration.wav','-af','loudnorm=I=-17:TP=-2:LRA=7','-ar',str(sr),'work/voice-leveled.wav'],check=True)
voice,_=sf.read('work/voice-leveled.wav',dtype='float32');voice=voice[:n]
if len(voice)<n:voice=np.pad(voice,(0,n-len(voice)))
combined=voice[:,None]*np.ones((1,2),np.float32)/np.sqrt(2)+bed+fx
sf.write('work/mix-premaster.wav',combined,sr,subtype='PCM_24')
subprocess.run(['ffmpeg','-v','error','-y','-i','work/mix-premaster.wav','-af','loudnorm=I=-16:TP=-1.5:LRA=9','-ar','48000','-c:a','libmp3lame','-b:a','192k','public/soundtrack.mp3'],check=True)
print('Winter original score and Foley mixed:',duration,'seconds')
