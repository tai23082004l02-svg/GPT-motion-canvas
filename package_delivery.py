import json,subprocess,pathlib,textwrap,csv
out=pathlib.Path('work/delivery')
trans=json.load(open('transcript.json'));cues=json.load(open('src/cues.json'))
words=[w for s in trans for w in s['words']]
# Keep each cue short enough to read comfortably, using detected word times.
groups=[];buf=[]
for w in words:
 candidate=' '.join(x['word'].strip() for x in buf+[w])
 if buf and (len(candidate)>78 or w['end']-buf[0]['start']>5.0 or (w['start']-buf[-1]['end']>.65)):
  groups.append(buf);buf=[]
 buf.append(w)
 if w['word'].strip().endswith(('.', '?','!')) and len(buf)>=4:groups.append(buf);buf=[]
if buf:groups.append(buf)
def ts(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
srt=[]
for i,g in enumerate(groups):
 t=' '.join(x['word'].strip() for x in g)
 if 'The cost of carrying the balance is.' in t:t=t.replace('balance is.','balance isn’t.')
 lines=textwrap.wrap(t,width=42,break_long_words=False,break_on_hyphens=False)
 srt.append(f'{i+1}\n{ts(g[0]["start"])} --> {ts(g[-1]["end"])}\n'+ '\n'.join(lines)+'\n')
(out/'captions.en.srt').write_text('\n'.join(srt))
chapters=[(0,'The $200 payment mystery'),(37.98,'Where the interest goes'),(113.86,'How the balance can fall'),(155.86,'The new spending treadmill'),(208.48,'The minimum payment'),(287.72,'The grace period'),(331.56,'Four things that help'),(426.94,'When money is tight'),(444.2,'The number that matters')]
meta=[';FFMETADATA1','title=Why Your Credit Card Balance Barely Moves','comment=Motion Canvas animation; simplified financial illustrations.']
for i,(t,title) in enumerate(chapters):
 end=chapters[i+1][0] if i+1<len(chapters) else 471.725
 meta+=['[CHAPTER]','TIMEBASE=1/1000',f'START={round(t*1000)}',f'END={round(end*1000)}',f'title={title}']
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i','public/narration.wav','-t',str(end-t),'-c:a','pcm_s16le',str(out/'audio-chapters'/f'{i+1:02}.wav')],check=True)
pathlib.Path('work/chapters.ffmeta').write_text('\n'.join(meta)+'\n')
with open(out/'scene-plan.csv','w') as f:
 writer=csv.writer(f);writer.writerow(['scene','start_seconds','end_seconds','chapter','on_screen_title','visual'])
 for i,c in enumerate(cues):writer.writerow([i+1,c['start'],c['end'],c['chapter'],c['title'],c['type']])
(out/'youtube-chapters.txt').write_text('\n'.join(f'{int(t)//60:02}:{int(t)%60:02} {title}' for t,title in chapters)+'\n')
(out/'transcript.en.txt').write_text('\n\n'.join(s['text'].strip() for s in trans))
print(len(groups),'subtitle cues;',len(chapters),'audio chapters;',len(cues),'visual scenes')
