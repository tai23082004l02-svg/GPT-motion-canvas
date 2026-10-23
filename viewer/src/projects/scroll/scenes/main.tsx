import {makeScene2D,Node,Circle,Rect,Path} from '@motion-canvas/2d';
import {createSignal,tween,easeOutCubic} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,font,text,box,disk,line,polygon,pill,talk,clock,room,couch,stand,feed,phoneCard,post,book,shelf,timer} from '../art';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export default makeScene2D(function*(view){
 const full=shots[shots.length-1].end;const progress=createSignal(0);
 const bar=new Rect({x:-960,y:535,height:10,width:()=>1920*progress()/full,offsetX:-1,fill:C.mint});
 for(const shot of shots as any[]){
  const t=createSignal(0),dur=shot.end-shot.start,root=new Node({});view.add(root);
  const world=new Node({y:35});root.add(world);const kind=shot.kind;
  const dark=['bedroom','timejump','mood','awareness','callback','phoneaway','final'].includes(kind);const ink=dark?C.white:C.ink,muted=dark?'#b2b6cc':C.muted;
  const R=(at=0,len=.7)=>easeOutCubic(clamp((t()-at)/len));
  function show(n:Node,at=0){const yy=n.y();n.y(()=>yy+22*(1-R(at)));n.opacity(()=>R(at));return n;}
  function label(s:string,x:number,y:number,size=34,color=ink,at=0){return show(text(world,s,x,y,size,color),at);}
  function board(){box(world,0,10,2100,900,C.paper,0);disk(world,580,80,630,C.lavender);disk(world,-710,260,380,'#e4eadb');line(world,[[-1000,300],[1000,300]],C.line,3);}
  function person(mood=shot.mood,holding=true,x=-640,seated=false){return stand(world,x,125,t,mood,1,holding,seated);}
  function seated(mood=shot.mood,holding=true){couch(world,-530,165,.94);return stand(world,-530,115,t,mood,1.03,holding,true);}
  // Night scenes keep the same grounded character and room layout throughout the story.
  if(['bedroom','timejump','callback','phoneaway'].includes(kind)){
   room(world,t,true);seated(shot.mood,kind!=='phoneaway');
   clock(world,-685,-260,shot.clock||'11:52 PM',true,.85);
   if(kind==='bedroom'){show(feed(world,395,-5,.87,t),.8);show(talk(world,'Just two minutes.',-525,-205,340),1.1);}
   if(kind==='timejump'){show(feed(world,395,-5,.87,t,'fast'),.4);show(talk(world,'Wait. Forty-four minutes?',-500,-205,490),1.5);show(pill(world,'ILLUSTRATIVE TIME JUMP',390,335,420,C.gold),3);}
   if(kind==='callback'){const small=timer(world,450,135,t,1.05,true);show(small,.6);show(talk(world,'Do I want to keep going?',-470,-205,470),3);show(pill(world,'A VISIBLE DECISION POINT',250,-95,470,C.mint),4);}
   if(kind==='phoneaway'){shelf(world,450,85);phoneCard(world,450,30,'',.55);show(pill(world,'A DIFFERENT SETUP',380,-175,380,C.mint),.8);show(talk(world,'That’s enough for tonight.',-470,-205,475),3);}
  }else if(kind==='twoquestions'){
   board();person('bored');show(feed(world,-175,52,.69,t),.5);
   label('WANT TO CHECK AGAIN',480,-185,27,C.muted,.5);box(world,480,-105,540,60,C.soft,15);const want=box(world,210,-105,0,60,C.purple,15);want.offset.x(-1);want.width(()=>540*R(1,1.3));
   label('ENJOYING THIS MOMENT',480,35,27,C.muted,2);box(world,480,110,540,60,C.soft,15);const enjoy=box(world,210,110,0,60,C.coral,15);enjoy.offset.x(-1);enjoy.width(()=>180*R(2.5,1));
   label('An illustrative distinction — not measured scores.',350,275,24,C.muted,5);
  }else if(kind==='intent'){
   board();person('happy',false,-695);
   [['A CONCERT',-90,C.coral],['A NEW SKILL',300,C.mint],['A FRIEND',690,C.gold]].forEach((a:any,j)=>{const g=new Node({x:a[1],y:-5});world.add(g);box(g,0,0,330,320,a[2],25);if(j===0){for(let k=0;k<5;k++)line(g,[[-100+k*48,40],[-100+k*48,-35-(k%3)*35]],C.ink,12);text(g,'♪',0,-103,74,C.ink);}if(j===1)book(g,0,-8,.65);if(j===2){disk(g,-30,-28,55,C.ink);disk(g,35,0,48,C.teal);line(g,[[-60,59],[0,59]],C.ink,22);line(g,[[15,78],[70,78]],C.teal,21);}text(g,a[0],0,121,24,C.ink);show(g,.5+j*.8);});
   label('Did this match what you meant to do?',300,245,32,C.ink,4);
  }else if(kind==='cue'){
   board();person('thinking',true,-620);show(phoneCard(world,250,5,'1',1.3),.7);
   for(const [j,s] of ['WAITING','BETWEEN TASKS','IN BED'].entries()){const n=pill(world,s,630,-130+j*125,300,j===1?C.gold:C.white);show(n,1+j*1.1);}
   const ping=disk(world,337,-151,43,C.coral);ping.scale(()=>1+.08*Math.sin(t()*5));show(ping,1.3);label('A familiar cue',195,255,32,C.muted,4);
  }else if(kind==='habit'||kind==='loop'){
   board();person('neutral',true,-720);const xs=[-250,190,630];const words=kind==='habit'?['CHECK','FIND SOMETHING','KEEP GOING']:['CUE','OPEN + SWIPE','SOMETHING NEW'];
   xs.forEach((x,j)=>{const g=new Node({x,y:0});world.add(g);box(g,0,0,360,255,j===2?C.gold:C.white,25);text(g,String(j+1).padStart(2,'0'),0,-82,23,C.teal);if(j===1)phoneCard(g,0,0,'',.55);else if(j===2)post(g,0,-6,155,110,0);else text(g,'…',0,-13,95,C.purple);text(g,words[j],0,89,21,C.ink);show(g,.7+j*.8);if(j<2)show(line(world,[[x+187,0],[x+245,0]],C.muted,5,true),1+j);});
   if(kind==='loop')show(line(world,[[650,165],[650,230],[-230,230],[-230,163]],C.teal,5,true),4);
   label('Repeated in a familiar setting',220,295,28,C.muted,5);
  }else if(kind==='book'){
   board();person('thinking',false,-700);show(book(world,-180,-5,1.15),.5);show(pill(world,'END OF CHAPTER',-180,215,350,C.mint),1.5);show(feed(world,520,15,.78,t),2);label('Where is the last page?',520,300,27,C.muted,4);
  }else if(kind==='infinite'){
   board();person('neutral',true,-670);show(feed(world,280,0,.93,t,'fast'),.5);for(let j=0;j<3;j++){const n=pill(world,'NEXT',740,-140+j*148,190,j===1?C.purple:C.white);show(n,1+j*.7);}
   label('Continuing stays easy.',-265,250,31,C.ink,4);
  }else if(kind==='autoplay'){
   board();person('bored',true,-700);
   const a=show(post(world,-130,-40,410,310,0),.5);const b=show(post(world,480,-40,410,310,2),2);show(line(world,[[105,-40],[235,-40]],C.teal,7,true),1.5);
   show(pill(world,'NOW PLAYING',-130,205,350,C.white),1);show(pill(world,'STARTING NEXT…',480,205,350,C.gold),3);
  }else if(kind==='mixed'||kind==='promise'){
   board();person(shot.mood,true,-700);const colors=[C.coral,C.mint,C.gold];
   [-200,235,670].forEach((x,j)=>{const g=post(world,x,-30,370,280,j);show(g,.6+j*.8);show(pill(world,['FUNNY','JUST OKAY','MAYBE NEXT'][j],x,180,320,colors[j]),1+j);});
   label(kind==='mixed'?'The next item is uncertain.':'The promise can outlast the enjoyment.',250,293,31,C.ink,5);
  }else if(kind==='rewards'){
   board();person('thinking',false,-700);phoneCard(world,-250,10,'POST',1.2);
   for(let j=0;j<5;j++){const h=new Node({x:120+j*130,y:80});world.add(h);disk(h,0,0,77,j%2?C.coral:C.purple);text(h,'♥',0,0,37,C.white);h.y(()=>80-((t()*35+j*41)%160));h.opacity(()=>R(.7+j*.25));}
   label('SOCIAL REWARDS',400,-180,29,C.muted,1);label('Can influence posting behavior',400,170,36,C.ink,3);label('Evidence about one setting, not every swipe.',310,282,25,C.muted,6);
  }else if(kind==='mood'){
   room(world,t,true);seated('concerned',true);const note=box(world,390,-25,650,420,C.white,25);text(note,'TOMORROW',0,-155,29,C.ink);['Finish the project','Answer those emails','Make that appointment'].forEach((s,j)=>{text(note,s,0,-70+j*90,27,C.muted,400)});show(note,.5);show(talk(world,'I just want a break.',-500,-205,385),2);const screen=feed(world,390,0,.65,t);show(screen,4);note.opacity(()=>1-.7*R(4,2));
  }else if(kind==='awareness'){
   room(world,t,true);seated('bored',true);show(feed(world,380,0,.87,t),.5);const c=clock(world,-685,-260,'12:26 AM',true,.85);c.opacity(()=>1-.75*R(2,4));label('The clock slips into the background.',330,330,27,C.soft,4);
  }else if(kind==='study'){
   board();person('thinking',false,-720);const panel=box(world,320,15,1000,445,C.white,26);text(panel,'A CUSTOM SOCIAL MEDIA APP',0,-158,28,C.ink);
   [['43','participants'],['READ','history labels'],['TIME','reminders']].forEach((a,j)=>{const x=-310+j*310;disk(panel,x,-32,130,j===0?C.lavender:C.mint);text(panel,a[0],x,-32,j===0?64:32,C.ink);text(panel,a[1],x,78,24,C.muted);});
   text(panel,'Reduced self-reported absorption in that study.',0,155,27,C.teal);show(panel,.5);label('One study in one app.',320,303,28,C.muted,6);
  }else if(kind==='limits'){
   board();person('neutral',true,-690);const p=box(world,320,0,1000,380,C.white,26);text(p,'HABIT',-300,-63,39,C.teal);text(p,'DESIGN',0,-63,39,C.teal);text(p,'CONTEXT',300,-63,39,C.teal);line(p,[[-365,17],[365,17]],C.line,3);text(p,'A long session is not a dopamine measurement.',0,85,30,C.ink);show(p,.7);label('This is an explanation, not a diagnosis.',310,270,28,C.muted,4);
  }else if(kind==='pause'){
   board();person('thinking',true,-660);const f=show(feed(world,240,0,.82,t,'still'),.7);const stop=pill(world,'PAUSE HERE',240,35,390,C.gold);show(stop,2);label('What is this visit for?',630,-145,32,C.ink,2);label('What will end it?',630,157,32,C.teal,4);show(line(world,[[425,25],[700,25]],C.teal,5),3);
  }else if(kind==='plan'||kind==='queue'){
   board();person('happy',true,-710);const paper=box(world,290,10,1050,470,C.white,26);text(paper,kind==='plan'?'BEFORE YOU OPEN THE FEED':'A VISIT WITH AN ENDING',0,-167,28,C.ink);
   [-310,0,310].forEach((x,j)=>{post(paper,x,-12,255,180,j);disk(paper,x,130,46,C.teal);text(paper,String(j+1),x,130,26,C.white)});show(paper,.6);
   label(kind==='plan'?'Pick the ending first.':'Finish the task. Let that count.',300,320,31,C.teal,4);
  }else if(kind==='timer'){
   board();person('neutral',true,-690);show(timer(world,450,15,t,1.45),.6);show(pill(world,'10 MINUTES',450,-215,350,C.gold),1.5);label('A reminder outside the feed',300,290,32,C.ink,3);show(line(world,[[-455,130],[180,130]],C.muted,5,true),4);
  }else if(kind==='friction'){
   board();person('thinking',true,-730);const p=box(world,290,0,1090,450,C.white,25);const rows=['Move the app off the first screen','Turn off nonessential notifications','Disable autoplay where available'];
   rows.forEach((s,j)=>{const y=-123+j*120;disk(p,-455,y,46,j===1?C.gold:C.mint);text(p,String(j+1),-455,y,24,C.ink);const tx=text(p,s,-390,y,28,C.ink,500);tx.offset.x(-1)});show(p,.6);label('Try one small change.',285,300,30,C.teal,4);
  }else if(kind==='tradeoff'){
   board();person('thinking',false,-730);const left=box(world,-30,0,500,360,C.mint,30),right=box(world,550,0,500,360,C.coral,30);text(left,'BETTER',0,-53,48,C.ink);text(left,'CONTENT RECOGNITION',0,30,22,C.ink);text(right,'MORE',0,-53,48,C.ink);text(right,'FRUSTRATION FOR MANY',0,30,22,C.ink);show(left,.7);show(right,2.4);label('Small experiment. A real tradeoff.',275,290,28,C.muted,5);
  }else if(kind==='parking'){
   room(world,t,false);person('neutral',false,-600);shelf(world,570,68);show(phoneCard(world,570,25,'',.65),.6);label('A HOME FOR THE PHONE',265,-180,41,C.ink,1);label('Make reaching for it deliberate.',270,-70,31,C.muted,3);show(line(world,[[-270,150],[360,150]],C.teal,6,true),3.8);
  }else if(kind==='replacement'){
   board();person('happy',false,-720);const xs=[-200,240,680];
   xs.forEach((x,j)=>{const g=new Node({x,y:0});world.add(g);box(g,0,0,360,320,j===1?C.lavender:j===2?C.mint:C.white,25);if(j===0){polygon(g,[[-54,-73],[54,-73],[42,62],[-42,62]],'#b7dce3');polygon(g,[[-44,-18],[44,-18],[36,54],[-36,54]],C.teal);line(g,[[-54,-73],[54,-73]],C.ink,4);}if(j===1)book(g,0,0,.8);if(j===2){disk(g,15,-8,100,C.ink);disk(g,44,-35,93,C.mint);text(g,'z',-50,-65,34,C.ink);}text(g,['WATER','A BOOK','SLEEP'][j],0,113,25,C.ink);show(g,.7+j*.8);});label('Give the next activity a shape.',250,290,31,C.muted,4);
  }else if(kind==='experiment'){
   board();person('thinking',false,-710);const p=box(world,300,0,1020,410,C.white,28);text(p,'TRY ONE BOUNDARY',0,-140,31,C.ink);for(let j=0;j<7;j++){const d=disk(p,-360+j*120,0,80,C.soft);d.fill(()=>R(1+j*.4)>.5?C.mint:C.soft);text(p,String(j+1),-360+j*120,0,31,C.ink);}text(p,'Did it help me notice the choice?',0,125,30,C.teal);show(p,.6);
  }else if(kind==='choice'){
   board();person('happy',true,-710);const yes=box(world,-10,0,520,340,C.mint,28),no=box(world,585,0,520,340,C.lavender,28);text(yes,'KEEP WATCHING',0,-45,31,C.ink);text(yes,'because you choose to',0,50,27,C.teal);text(no,'PUT IT DOWN',0,-45,31,C.ink);text(no,'because you choose to',0,50,27,C.muted);show(yes,.6);show(no,2);label('The goal is a recognizable choice.',280,285,31,C.ink,4);
  }else if(kind==='final'){
   room(world,t,true,false);seated('happy',false);label('IS THIS STILL',260,-180,55,C.white,1);label('WHAT I CHOSE TO DO?',260,-100,55,C.mint,1.6);label('Give yourself a moment to answer.',280,8,30,C.soft,4);show(pill(world,'MAKE ROOM FOR A CHOICE',280,320,530,C.gold),4);
  }
  const header=new Node({});root.add(header);box(header,0,-421,1920,238,dark?C.deep:C.paper,0);
  const brand=text(header,'THE MATH BEHIND EVERYDAY LIFE',-875,-481,18,muted);brand.offset.x(-1);const num=text(header,'MIND / 003',875,-481,18,dark?C.mint:C.teal);num.offset.x(1);
  let chapter=shot.chapter||[...shots.slice(0,shots.indexOf(shot)+1)].reverse().find((s:any)=>s.chapter)?.chapter||'The next swipe';
  text(header,String(chapter).toUpperCase(),0,-436,20,dark?C.mint:C.teal);const title=text(header,shot.title,0,-368,shot.title.length>44?43:shot.title.length>33?49:58,ink,700);title.opacity(()=>R(.06,.5));title.y(()=>-368+15*(1-R(.06,.5)));
  box(root,0,492,1920,76,dark?C.deep:C.paper,0);text(root,shot.source||'ALEX’S STORY AND THE APP INTERFACE ARE ILLUSTRATIVE',0,491,17,muted,400);
  root.opacity(()=>Math.min(R(0,.25),clamp((dur-t())/.25)));view.add(bar);
  yield* tween(dur,v=>{t(v*dur);progress(shot.start+v*dur)});root.remove();
 }
});
