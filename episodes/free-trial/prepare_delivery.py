import json,pathlib,csv,textwrap,subprocess,shutil,importlib.metadata
out=pathlib.Path('work/delivery');out.mkdir(exist_ok=True);shots=json.load(open('src/shots.json'));trans=json.load(open('work/word-timestamps.json'));words=[w for s in trans for w in s['words']]
def timestamp(t):
 n=round(t*1000);return f'{n//3600000:02}:{n//60000%60:02}:{n//1000%60:02},{n%1000:03}'
groups=[];buf=[]
for w in words:
 text=' '.join(v['word'].strip() for v in buf+[w])
 if buf and (len(text)>76 or w['end']-buf[0]['start']>4.8 or w['start']-buf[-1]['end']>.7):groups.append(buf);buf=[]
 buf.append(w)
 if w['word'].strip().endswith(('.', '?','!')) and len(buf)>3:groups.append(buf);buf=[]
if buf:groups.append(buf)
srt=[]
for i,g in enumerate(groups):
 text=' '.join(w['word'].strip() for w in g).replace('7% of PR','7% APR').replace('7% of','7% APR')
 lines=textwrap.wrap(text,42,break_long_words=False,break_on_hyphens=False)
 assert len(lines)<=2,(i,lines)
 start=max(0,g[0]['start']);end=min(shots[-1]['end'],g[-1]['end'])
 if i==0:start=max(start,shots[0]['voiceStart'])
 srt.append(f'{i+1}\n{timestamp(start)} --> {timestamp(end)}\n'+'\n'.join(lines)+'\n')
(out/'captions.en.srt').write_text('\n'.join(srt))
with open(out/'scene-plan.csv','w') as f:
 w=csv.writer(f);w.writerow(['scene_id','start','voice_start','voice_end','end','visual','title','narration'])
 for s in shots:w.writerow([s[k] for k in ['id','start','voiceStart','voiceEnd','end','kind','title','narration']])
chapters=[(s['start'],s['chapter']) for s in shots if s.get('chapter')]
(out/'youtube-chapters.txt').write_text('\n'.join(f'{int(t)//60:02}:{int(t)%60:02} {title}' for t,title in chapters)+'\n')
print(len(groups),'subtitles;',len(shots),'scenes')
