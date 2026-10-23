"""Original procedural score and Foley. No external music samples."""
import numpy as np, soundfile as sf, json,subprocess,pathlib
sr=24000;shots=json.load(open('src/shots.json'));duration=shots[-1]['end'];n=round(duration*sr);rng=np.random.default_rng(2026102304)
bed=np.zeros((n,2),np.float32);fx=np.zeros_like(bed)
def mix(dst,a,at,amp=1,pan=0):
 i=round(at*sr)
 if i<0:a=a[-i:];i=0
 if i>=len(dst):return
 a=a[:len(dst)-i]*amp
 dst[i:i+len(a),0]+=a*np.sqrt((1-pan)/2);dst[i:i+len(a),1]+=a*np.sqrt((1+pan)/2)
def note(midi,length=1.5,soft=False):
 t=np.arange(round(length*sr))/sr;f=440*2**((midi-69)/12)
 if soft:
  e=np.minimum(1,t/.4)*np.minimum(1,(length-t)/.7)
  a=(np.sin(2*np.pi*f*t)+.14*np.sin(2*np.pi*(f*1.002)*t)+.08*np.sin(2*np.pi*f*2*t))*e
 else:
  e=(1-np.exp(-t*140))*np.exp(-t*3.5)
  a=(np.sin(2*np.pi*f*t)+.21*np.sin(2*np.pi*f*2*t)+.09*np.sin(2*np.pi*f*3*t))*e
 return a.astype(np.float32)
# D minor, B-flat major, F major, C suspended/major. Light pizzicato-style cues at 88 BPM.
beat=60/88;bar=beat*4;chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]]
for b in range(int(duration/bar)+1):
 start=b*bar;chord=chords[(b//2)%4]
 if b%2==0:
  for m in chord:mix(bed,note(m,bar*2.3,True),start,.0025,pan=(m%3-1)*.35)
  mix(bed,note(chord[0]-12,bar*1.9),start,.006)
 for k,idx in enumerate([1,3,2]):mix(bed,note(chord[idx]+12,1.6),start+k*beat*1.3,.008,pan=(-.35 if k%2 else .35))
# Transitions and interface cues support the illustration without masking Michael.
for s in shots:
 st=s['start'];kind=s['kind'];length=.34;tt=np.arange(round(sr*length))/sr
 noise=rng.standard_normal(len(tt));smooth=np.convolve(noise,np.ones(21)/21,mode='same');whoosh=smooth*np.sin(np.pi*tt/length)**2
 mix(fx,whoosh,st+.03,.019,-.2)
 if kind in ['charge','later','reminder']:
  for j in range(2):mix(fx,note(89+j*7,.55),st+2+j*.12,.015,.2)
 if kind in ['receipt','evidence','refund','help']:
  l=.18;tt=np.arange(round(sr*l))/sr;paper=rng.standard_normal(len(tt))*np.exp(-tt*25)
  mix(fx,paper,st+.8,.014,-.25)
 if kind in ['confirm','choice','exit']:
  for j,m in enumerate([62,65,69,74]):mix(fx,note(m,1.7),st+1+j*.13,.025,0)
 if kind in ['maze','search','hunt']:
  l=1.3;tt=np.arange(round(sr*l))/sr;engine=(np.sin(2*np.pi*(65*tt+9*tt**2))+.2*np.sin(2*np.pi*130*tt))*np.sin(np.pi*tt/l)**2
  mix(fx,engine,st+1,.002,-.1)
# Diegetic accents follow the actual action beats, not arbitrary movement.
for shot in shots:
 st=shot['start'];kind=shot['kind']
 if kind=='charge':
  for j,m in enumerate([83,76]):mix(fx,note(m,.8),st+1.3+j*.17,.04,.25)
 if kind in ['signup','hunt','search','confirm']:
  for j in range(3):
   tt=np.arange(round(sr*.035))/sr;click=rng.standard_normal(len(tt))*np.exp(-tt*150)
   mix(fx,click,st+.8+j*.7,.018,.15)
 if kind=='maze':
  for at in [2,6.2,10]:
   tt=np.arange(round(sr*.13))/sr;latch=np.sin(2*np.pi*180*tt)*np.exp(-tt*35)
   mix(fx,latch,st+at,.045,0)
 if kind=='later':mix(fx,note(88,.6),st+3,.04,.2)
# Duck the score during the known speech intervals.
control=np.ones(n,np.float32)
for s in shots:
 a=round(s['voiceStart']*sr);b=round(s['voiceEnd']*sr);control[a:b]=.48
fade=np.ones(n,np.float32);nn=sr*2;fade[:nn]=np.linspace(0,1,nn);fade[-nn:]=np.linspace(1,0,nn)
bed*=control[:,None]*fade[:,None]
sf.write('work/music-and-foley.wav',bed+fx,sr,subtype='PCM_16')
subprocess.run(['ffmpeg','-v','error','-y','-i','public/narration.wav','-af','loudnorm=I=-17:TP=-2:LRA=7','-ar',str(sr),'work/voice-leveled.wav'],check=True)
voice,_=sf.read('work/voice-leveled.wav',dtype='float32');voice=voice[:n]
if len(voice)<n:voice=np.pad(voice,(0,n-len(voice)))
combined=voice[:,None]*np.ones((1,2),np.float32)/np.sqrt(2)+bed+fx
sf.write('work/mix-premaster.wav',combined,sr,subtype='PCM_24')
subprocess.run(['ffmpeg','-v','error','-y','-i','work/mix-premaster.wav','-af','loudnorm=I=-16:TP=-1.5:LRA=9','-ar','48000','-c:a','libmp3lame','-b:a','192k','public/soundtrack.mp3'],check=True)
print('Original trial score, swipe Foley and Michael mixed:',duration,'seconds')
