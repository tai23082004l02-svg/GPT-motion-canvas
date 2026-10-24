import {makeScene2D,Node} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,box,disk,line,poly,text,card,bubble,background,page,person,logs,fire,snow,wind,bowl,pot,sack,bread,fish,shutter,candle,bed,chicken,table,crossed,ramp,clamp} from '../art';
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,root=new Node({}),w=new Node({});view.add(root);root.add(w);
  const R=(a=0,b=1)=>ramp(t(),a,b),k=s.kind;
  const appear=(n:Node,at=0)=>{const yy=n.y();n.opacity(()=>R(at,.55));n.y(()=>yy+22*(1-R(at,.55)));return n};
  const label=(v:string,x:number,y:number,size=40,at=0)=>appear(text(w,v,x,y,size),at);
  const note=(v:string,x:number,y:number,width=500,at=0,col=C.paper)=>appear(card(w,v,x,y,width,col,32),at);
  const talk=(v:string,x:number,y:number,width=360,at=0)=>appear(bubble(w,v,x,y,width),at);
  const walk=(who:string,x1:number,x2:number,y=180,at=0,sc=1,carry=false)=>{const a=person(w,x1,y,()=>t()>at&&t()<at+3.7?t()-at:0,who,carry?'carryWalk':'walk','neutral',sc);a.g.x(()=>x1+(x2-x1)*R(at,3.7));return a};
  const family=(night=false)=>{background(w,'hall',night);fire(w,-370,255,t,.85);person(w,-650,150,t,'will','cold','cold',1.02);person(w,190,185,t,'joan','stand','happy',1.08);person(w,500,247,t,'kit','bowl','happy',.72);bowl(w,500,212,.52)};
  const heading=(v:string)=>{text(w,v,0,-390,60);line(w,[[-230,-338],[230,-338]],C.gold,5)};
  if(!['air','rights','autumn','preserve','noPotato','unequal','modern'].includes(k)){w.scale(()=>1+.055*R(3,Math.max(2,dur-5)));w.x(()=>-18*R(3,Math.max(2,dur-5)));}
  if(k==='hook'){
   background(w,'hall',true);bed(w,320,275,1.15);person(w,330,200,t,'will','sit','surprise',1.2);fire(w,-370,255,t,.36,false);
   const breath=disk(w,411,-3,38,'#ffffff77');breath.x(()=>411+((t()%3)/3)*95);breath.scale(()=>.4+(t()%3)/3);breath.opacity(()=>1-(t()%3)/3);
   talk('Where is the thermostat?',210,-265,590,1.2);note('NO ELECTRICITY.',-430,-370,610,5,C.blue);note('A VERY LONG WINTER.',-430,-260,610,8);
  }else if(k==='scope'){
   background(w,'village');snow(w,t);person(w,-460,210,t,'will','wave','happy',1.05);person(w,-15,210,t,'joan','wave','happy',1.05);person(w,400,275,t,'kit','wave','happy',.74);
   note('SOUTHERN ENGLAND · c. 1400',0,-395,1000,.2);label('WILL',-460,437,32,1);label('JOAN',-15,437,32,2);label('KIT',400,437,32,3);note('An illustrative, fictional household',0,-290,700,7);
  }else if(k==='morning'){
   family(true);talk('Yesterday’s fire?',-570,-240,420,.5);['Shelter','Clothes','Fuel','Food'].forEach((v,i)=>note(v,-645+i*420,410,350,3+i*1.1));
  }else if(k==='wet'){
   background(w,'village');wind(w,t);disk(w,320,410,400,'#99bcc9').height(53);const a=walk('kit',-180,320,270,1,.8);a.g.y(()=>270-35*Math.sin(Math.PI*R(3,1)));person(w,-590,190,t,'joan','point','worried',1.1);
   for(let i=0;i<6;i++){const q=()=>R(3.7,.7),drop=disk(w,320,400,14,C.blue);drop.position(()=>[320+(i-2.5)*40*q(),405-90*Math.sin(q()*Math.PI)]);drop.opacity(()=>t()>3.7?1-R(4.3,.6):0)}talk('Oh.',390,-55,180,5);
  }else if(k==='layers'){
   page(w);heading('First, dress the person.');const a=person(w,-400,140,t,'will','cold','cold',1.42);const cloak=poly(a.g,[[-73,-110],[0,-135],[72,-110],[92,72],[-92,72]],C.teal);cloak.opacity(()=>R(2));
   note('Linen underlayers',290,-150,490,1);note('Wool outer garments',290,-30,490,3);note('Hoods and leg coverings',290,90,490,5);note('Outfits varied with means and work.',0,440,900,9);
  }else if(k==='air'){
   page(w);heading('Keep the warmth you make.');person(w,-460,155,t,'will','stand','happy',1.25);const cut=box(w,250,55,760,445,'#d0d8c0',25,C.ink);box(cut,-270,0,120,410,C.white,18,C.ink);box(cut,270,0,120,410,C.teal,18,C.ink);
   for(let i=0;i<14;i++)disk(cut,-130+(i%4)*85,-140+Math.floor(i/4)*90,20,'#f0e5b8');text(cut,'Trapped air',0,-120,41);text(cut,'slows heat loss',0,0,36);line(cut,[[-140,125],[135,125]],C.red,7,true);label('Body',-23,355,30);label('Clothing',520,355,30);note('Layers are not a furnace.',0,445,700,6);
  }else if(k==='dry'){
   background(w,'hall');fire(w,-370,255,t,.7);person(w,35,195,t,'joan','point','neutral',1.1);person(w,510,270,t,'kit','shrug','worried',.74);line(w,[[155,-220],[780,-220]],C.brown,7);
   for(let i=0;i<3;i++){const shirt=poly(w,[[210+i*190,-210],[330+i*190,-210],[355+i*190,-43],[200+i*190,-43]],i===1?C.red:C.teal);shirt.rotation(()=>Math.sin(t()*.7+i)*1.5)}note('Dry • mend • use again',0,-390,800,2);talk('Still damp.',520,5,280,7);
  }else if(k==='house'){
   background(w,'village');person(w,485,200,t,'will','point','neutral',1.2);note('The building is another layer.',0,-407,1000,.4);for(const [v,x,y] of [['Roof',-390,-285],['Timber and plaster',-365,45],['Wooden shutters',-550,165]] as [string,number,number][])note(v,x,y,420,2+(y+285)/160);
  }else if(k==='shutters'){
   background(w,'hall');person(w,260,180,t,'will','point','neutral',1.2);shutter(w,-450,-100,t);wind(w,t);const shade=box(w,0,0,2200,1300,'#142238');shade.opacity(()=>R(2,2)*.36);note('Less wind.',350,-280,460,3);note('Less daylight.',350,-160,460,5);fire(w,-370,255,t,.7,false);
  }else if(k==='hearth'){
   background(w,'hall');fire(w,-370,255,t,1.1);person(w,230,185,t,'joan','point','happy',1.15);person(w,650,260,t,'kit','cold','neutral',.72);note('An open central hearth',260,-320,650,1);line(w,[[100,-230],[-200,150]],C.ink,6,true);note('Not every house had a chimney.',240,-205,790,6);
  }else if(k==='smoke'){
   background(w,'hall');fire(w,-370,255,t,1.12);person(w,220,170,t,'will','cold','worried',1.1);for(let i=0;i<3;i++)line(w,[[-400+i*110,-80],[-400+i*110,-365]],'#8b8b80',5,true);note('Smoke rose into the roof space.',250,-395,900,1);talk('Warm… and smoky.',270,-180,470,4);note('Air and smoke still need a way through.',180,435,1090,8);
  }else if(k==='fuel'){
   background(w,'village');const a=walk('will',-500,230,190,1,1.15,true);logs(a.g,0,-60,.9);person(w,620,260,t,'kit','carry','neutral',.74);logs(w,622,205,.35);wind(w,t);note('Find it. Carry it. Store it.',0,-390,950,.5);talk('Another delivery?',200,-210,490,6);
  }else if(k==='rights'){
   page(w);heading('Wood nearby ≠ wood you may take.');person(w,-590,170,t,'will','carry','worried',1.2);logs(w,-590,111,.9);for(let i=0;i<3;i++){line(w,[[120+i*240,295],[120+i*240,-130]],C.brown,26);for(const sign of [-1,1])line(w,[[120+i*240,-20],[120+i*240+sign*80,-105]],C.brown,14)}note('Ownership',300,-225,490,1);note('Customary rights',300,-105,490,3);note('Conditions and access',300,15,490,5);note('A resource is also a social question.',0,430,1000,8);
  }else if(k==='bundle'){
   background(w,'hall');fire(w,-370,255,t,.9);const a=walk('will',780,150,180,.3,1.05,true);logs(a.g,0,-55,.85);person(w,-680,165,t,'joan','point','happy',1);const kit=walk('kit',550,410,265,2,.72,true);logs(kit.g,0,-52,.5);['Gather','Carry','Tend'].forEach((v,i)=>note(v,-540+i*540,-360,420,1+i*2));
  }else if(k==='zone'){
   background(w,'hall',true);disk(w,-370,275,800,'#edaa412e').height(260);fire(w,-370,255,t,.95);person(w,-660,150,t,'will','cold','happy',.95);person(w,10,160,t,'joan','cold','happy',1);person(w,690,250,t,'kit','cold','cold',.73);note('Near the fire',-350,-280,490,1,C.gold);note('Farther away',590,-280,490,3,C.blue);talk('Can I move closer?',585,5,470,6);note('Warmth was uneven.',0,440,720,9);
  }else if(k==='pot'){
   background(w,'hall');fire(w,-370,255,t,.95);line(w,[[-540,250],[-490,-120],[-185,-120],[-135,250]],C.ink,10);line(w,[[-340,-120],[-340,46]],C.ink,7);pot(w,-340,79,t,.85);person(w,0,195,t,'joan','stir','happy',1.1);line(w,()=>[[-170.5+Math.sin(t()*2.2)*13.2,96],[-340,65]],C.brown,12);person(w,470,255,t,'kit','bowl','happy',.75);bowl(w,470,213,.6);note('Heat + cooking + a place to gather',0,-390,1100,1);
  }else if(k==='autumn'){
   page(w);heading('Winter planning starts earlier.');person(w,-660,180,t,'joan','carry','happy',1.15);sack(w,-655,125,.65);['HARVEST','STORE','WINTER'].forEach((v,i)=>{note(v,-230+i*450,-210,360,.5+i*1.8);if(i<2)appear(line(w,[[-20+i*450,-210],[25+i*450,-210]],C.ink,6,true),2+i*1.8)});for(let i=0;i<3;i++)appear(sack(w,-240+i*320,150,1.2),1+i*1.6);note('Earlier work → later meals',200,425,850,7);
  }else if(k==='pantry'){
   background(w,'pantry');person(w,-480,200,t,'joan','point','worried',1.2);person(w,410,265,t,'kit','stand','neutral',.72);note('How much is left?',30,-320,630,.5);note('How long must it last?',30,-210,630,3);note('Will it keep?',30,-100,630,6);sack(w,50,360,.9);
  }else if(k==='meal'){
   background(w,'hall');for(const xx of [-600,265,695]){box(w,xx,210,150,28,C.wood,3,C.ink);line(w,[[xx-52,222],[xx-52,350]],C.brown,13);line(w,[[xx+52,222],[xx+52,350]],C.brown,13)}person(w,-600,135,t,'will','sit','happy',1.1);person(w,695,135,t,'joan','sit','happy',1.1);person(w,265,95,t,'kit','sit','happy',.72);table(w,210,290,1.4);pot(w,-100,160,t,.62);bread(w,255,237,.8);bowl(w,580,220,.7);note('Pottage + bread + what was available',0,-360,1100,1);note('West Cotton: evidence from cooking pots',0,453,1040,7);
  }else if(k==='preserve'){
   page(w);heading('Make supplies last.');person(w,-670,190,t,'joan','point','neutral',1.1);for(let i=0;i<3;i++){appear(box(w,-250+i*440,30,370,440,'#eee5cf',16,C.ink),i);note(['DRIED','SMOKED','SALTED'][i],-250+i*440,-130,320,1+i*1.6);fish(w,-250+i*440,20,.85);if(i===0)sack(w,-250,175,.65);else if(i===1)fire(w,190,200,t,.27,false);else{box(w,630,167,80,65,C.white,7,C.ink);text(w,'salt',630,167,26)}}note('Extended storage ≠ guaranteed safety',100,435,1080,8);
  }else if(k==='noPotato'){
   page(w);heading('“Could we add potatoes?”');person(w,-510,195,t,'kit','shrug','happy',1.25);pot(w,150,265,t,1.2);const potato=disk(w,480,-40,170,'#b28e5f',C.ink);potato.width(230);for(let i=0;i<6;i++)disk(potato,-55+(i%3)*54,-25+Math.floor(i/3)*45,8,C.brown);crossed(w,480,-40,123);note('England, c. 1400: not yet.',130,-235,820,3);note('A later arrival from the Americas',130,435,980,8);
  }else if(k==='daylight'){
   background(w,'village');const shade=box(w,0,0,2200,1300,'#1c244c');shade.opacity(()=>R(1,dur-2)*.45);const sun=disk(w,580,-260,95,'#eab875');sun.y(()=>-260+350*R(1,dur-2));walk('will',-350,380,195,1,1.06);chicken(w,570,355,t,1.15);chicken(w,720,395,t,.8);snow(w,t);note('Finish the outdoor jobs.',-340,-350,790,2);
  }else if(k==='chores'){
   background(w,'hall');fire(w,-370,255,t,.85);const a=person(w,210,165,t,'joan','sew','neutral',1.15);box(a.g,0,26,130,75,C.red,8,C.ink);line(a.g,()=>[[42,Math.sin(t()*3)*9-8],[73,-38]],C.ink,3);person(w,620,260,t,'kit','carry','happy',.7);sack(w,620,216,.45);note('Repair clothes. Sort supplies.',0,-360,1000,1);
  }else if(k==='light'){
   background(w,'hall',true);fire(w,-370,255,t,.7);person(w,300,180,t,'will','point','neutral',1.05);table(w,670,315,.7);candle(w,650,200,t,false,.8);note('Firelight',-430,-330,380,1);note('Rushlights and tallow',260,-330,650,3);note('Beeswax: wealthier homes and churches',0,440,1200,7);
  }else if(k==='rush'){
   page(w);box(w,0,0,2200,1300,'#26333b');candle(w,-400,60,t,true,2.1);const a=person(w,340,180,t,'joan','sew','neutral',1.2);box(a.g,0,25,130,75,C.red,6,C.ink);text(w,'A small, useful pool of light',130,-365,60,C.paper);appear(card(w,'Plant pith + fat',-360,395,660,C.paper,38),2);disk(w,-350,0,1000,'#f6ce6713').height(800);
  }else if(k==='bed'){
   background(w,'hall',true);fire(w,-370,255,t,.45,false);bed(w,350,280,1.3);person(w,725,185,t,'joan','point','happy',1);person(w,170,205,t,'kit','sit','happy',.75);note('The bedding is another layer.',50,-350,1000,1);['Mattress','Coverings'].forEach((v,i)=>note(v,-400,-140+i*120,460,3+i*2));
  }else if(k==='embers'){
   background(w,'hall',true);bed(w,360,280,1.2);const a=person(w,250,195,t,'kit','sleep','neutral',.68);a.g.rotation(-90);box(w,370,230,330,110,C.teal,25,C.ink);fire(w,-370,255,t,.23,false);person(w,-650,150,t,'joan','cold','neutral',1);candle(w,750,180,t,true,.6);note('Same cold. A smaller warm circle.',0,-350,1110,2);
  }else if(k==='unequal'){
   page(w);heading('The same season. Different resources.');line(w,[[0,-260],[0,330]],'#b5aa94',4);person(w,-480,170,t,'will','cold','cold',1.2);person(w,480,170,t,'will','stand','happy',1.2);const cloak=poly(w,[[420,57],[480,25],[540,57],[570,250],[390,250]],C.teal);cloak.opacity(()=>R(2));note('Fewer supplies',-470,-180,600,1,C.blue);note('More resources',470,-180,600,2,C.gold);sack(w,710,310,.8);logs(w,260,305,.8);note('Comfort was unequal.',0,440,850,7);
  }else if(k==='gap'){
   background(w,'pantry');const shade=box(w,0,0,2200,1300,C.paper);shade.opacity(()=>R(2,2)*.75);person(w,-310,175,t,'joan','shrug','worried',1.15);sack(w,90,325,.45);person(w,510,270,t,'kit','cold','worried',.7);note('The hunger gap',0,-365,800,1);note('Old stores run low…',190,-180,700,3);note('…before new crops are ready.',190,-65,820,6);
  }else if(k==='neighbors'){
   background(w,'village');const a=walk('will',-580,-160,180,.5,1.08,true);logs(a.g,0,-55,.75);person(w,300,180,t,'joan','carry','happy',1.08);sack(w,300,125,.65);person(w,660,265,t,'kit','wave','happy',.72);note('Materials. Skills. Other people.',0,-370,1040,1);talk('Thank you.',200,-150,320,6);
  }else if(k==='modern'){
   page(w);heading('Before electricity ≠ before heating.');for(let i=0;i<3;i++){const g=new Node({x:-570+i*570,y:40});w.add(g);if(i===0)fire(g,0,100,t,.8);else if(i===1){box(g,0,20,320,300,C.wood,8,C.ink);box(g,0,65,210,200,C.ink,60);box(g,0,-210,110,170,'#b9a88a',0,C.ink);fire(g,0,140,t,.55,false)}else{box(g,0,15,230,275,'#6c756a',14,C.ink);line(g,[[75,-120],[75,-230],[180,-230]],C.ink,32);box(g,0,15,130,100,C.ink,9,C.ink);disk(g,0,30,45,C.orange);for(const xx of [-75,75])line(g,[[xx,150],[xx,185]],C.ink,15)}note(['Open hearths','Fireplaces','Stoves'][i],-570+i*570,345,460,i*1.6);}note('Different places. Different technologies.',0,-225,1130,6);
  }else if(k==='final'){
   family(true);note('WARMTH WAS WORK.',0,-365,1000,.5,C.gold);const end=new Node({});root.add(end);box(end,0,0,2200,1300,'#102132');text(end,'SCOPIVO',0,-60,115,'#fff9e9');text(end,'A clearer view.',0,55,49,'#8cdeb1');text(end,'History, illustrated.',0,165,32,'#d2d8d5');end.opacity(()=>R(dur-4,1));
  }
  // No scene counter, recurring chapter bar or debug UI is drawn into the artwork.
  root.opacity(()=>Math.min(R(0,.25),clamp((dur-t())/.25)));yield* tween(dur,v=>t(v*dur));root.remove();
 }
});
