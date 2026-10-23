import json,re,difflib,textwrap,pathlib
shots=json.load(open('src/shots.json'));segments=json.load(open('work/word-timestamps.json'));heard=[w for s in segments for w in s['words']];canonical=[w for s in shots for w in s['narration'].split()]
def norm(w):return re.sub(r'[^a-z0-9]','',w.lower())
a=[norm(w) for w in canonical];b=[norm(w['word']) for w in heard];times=[None]*len(a)
for block in difflib.SequenceMatcher(None,a,b,autojunk=False).get_matching_blocks():
 for k in range(block.size):times[block.a+k]=(heard[block.b+k]['start'],heard[block.b+k]['end'])
i=0
while i<len(a):
 if times[i] is not None:i+=1;continue
 j=i
 while j<len(a) and times[j] is None:j+=1
 start=times[i-1][1] if i else shots[0]['voiceStart'];end=times[j][0] if j<len(a) else shots[-1]['voiceEnd']
 end=max(end,start+.05*(j-i))
 for k in range(i,j):times[k]=(start+(end-start)*(k-i)/(j-i),start+(end-start)*(k+1-i)/(j-i))
 i=j
words=[dict(word=w,start=t[0],end=t[1]) for w,t in zip(canonical,times)];groups=[];buf=[]
for w in words:
 txt=' '.join(v['word'] for v in buf+[w])
 if buf and (len(txt)>76 or w['end']-buf[0]['start']>4.8 or w['start']-buf[-1]['end']>.7):groups.append(buf);buf=[]
 buf.append(w)
 if w['word'].endswith(('.','?','!')) and len(buf)>3:groups.append(buf);buf=[]
if buf:groups.append(buf)
def ts(t):
 n=round(t*1000);return f'{n//3600000:02}:{n//60000%60:02}:{n//1000%60:02},{n%1000:03}'
out=[]
for i,g in enumerate(groups):
 lines=textwrap.wrap(' '.join(w['word'] for w in g),42,break_long_words=False,break_on_hyphens=False);assert len(lines)<=2
 out.append(f'{i+1}\n{ts(g[0]["start"])} --> {ts(g[-1]["end"])}\n'+'\n'.join(lines)+'\n')
pathlib.Path('work/delivery/captions.en.srt').write_text('\n'.join(out));print(len(out),'canonical-text captions')
