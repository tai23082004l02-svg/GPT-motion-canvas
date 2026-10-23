import {makeScene2D,Node,Rect} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,text,box,disk,line,polygon,pill,book,clamp,ramp,actor,phone,mug,laptop,room,door,receipt,check} from '../art';
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,root=new Node({}),w=new Node({});view.add(root);root.add(w);
  const R=(at=0,len=1)=>ramp(t(),at,len);const night=['signup','hunt','later','choice'].includes(s.kind);room(w,night);
  // Camera motion acts on the entire scene; the character's head never oscillates.
  w.scale(()=>1+.035*R(1,Math.max(2,dur-3)));w.x(()=>-12*R(1,dur-2));
  const ink=night?C.white:C.ink;
  const reveal=(n:Node,at=0)=>{const y=n.y();n.opacity(()=>R(at,.55));n.y(()=>y+24*(1-R(at,.55)));return n};
  const label=(a:string,x:number,y:number,size=36,col=ink,at=0)=>reveal(text(w,a,x,y,size,col),at);
  const caption=(a:string,x:number,y:number,width=420,col=C.white,at=0)=>reveal(pill(w,a,x,y,width,col),at);
  const kinds=s.kind;
  if(kinds==='signup'){
   actor(w,-530,150,t,'phone','happy',1.35);const l=laptop(w,310,30,1.15);text(l.screen,'FRAME',0,-110,32,C.teal);text(l.screen,'ONE GREAT DOCUMENTARY.',0,-43,28,C.ink);box(l.screen,0,40,440,70,C.teal,15);text(l.screen,'START 7 DAYS FREE',0,40,28,C.white);text(l.screen,'Then $19.99 / month. Renews unless canceled.',0,120,17,C.muted);reveal(l.g,.5);caption('I’ll cancel before it ends.',-510,-220,440,C.white,2.5);caption('FUTURE ALEX CAN HANDLE IT.',260,360,550,C.gold,7);
  }else if(kinds==='charge'){
   const a=actor(w,-445,210,t,'cup',t()<3?'neutral':'surprised',1.6); // reaction is shown with a second, fixed expression below
   a.opacity(()=>1-R(2.8,.15));const reaction=actor(w,-445,210,t,'cup','surprised',1.6);reaction.opacity(()=>R(2.8,.15));
   box(w,0,350,1850,80,'#b89778',12);mug(w,-80,256,.85);const p=phone(w,430,-10,'BANK',1.1);box(p,0,-25,264,193,C.paper,18);text(p,'FRAME',0,-80,27,C.muted);text(p,'−$19.99',0,-10,51,C.ink);text(p,'Subscription renewed',0,51,19,C.muted);reveal(p,1.3);caption('ONE MONTH LATER',-410,-333,380,C.gold,.3);caption('Wait. I still have this?',-390,-211,470,C.white,4);
  }else if(kinds==='hunt'||kinds==='search'){
   actor(w,-605,190,t,'phone','worried',1.7);const p=phone(w,255,20,'FRAME',1.25);const labels=['Settings','Account','Membership benefits','Help center'];
   labels.forEach((a,j)=>{const row=box(p,0,-105+j*90,264,65,j===2?C.gold:C.paper,12);text(row,a,0,0,21,C.ink);reveal(row,.7+j*1.3)});const glass=new Node({x:640,y:170});w.add(glass);disk(glass,0,0,140,'#ffffff44').stroke(C.teal).lineWidth(12);line(glass,[[51,54],[116,119]],C.teal,20);glass.y(()=>170-140*R(4,3));label('CANCEL?',650,-220,36,ink,4);
  }else if(kinds==='maze'){
   box(w,0,-20,2200,900,C.paper,0);line(w,[[-1000,300],[1000,300]],C.line,5);
   const hall=new Node({x:100});w.add(hall);hall.x(()=>100-350*R(3,7));['SETTINGS','ACCOUNT','BENEFITS','EXIT?'].forEach((a,j)=>door(hall,-450+j*440,72,a,j===3?C.coral:C.purple));const a=actor(w,-480,135,()=>R(1,10)*Math.PI*10/6,'point','worried',1,true);a.x(()=>-480+620*R(1,10));caption('EXIT →',490,-256,250,C.gold,1);caption('← EXIT',-160,-256,250,C.coral,6);label('A SIMPLE TASK. A LONG ROUTE.',0,402,33,C.ink,8);
  }else if(kinds==='deal'){
   box(w,0,0,2200,1200,C.paper,0);const free=door(w,-470,45,'7 DAYS FREE',C.mint,390),paid=door(w,470,45,'THEN $19.99 / MO',C.coral,390);line(w,[[-230,40],[225,40]],C.ink,8,true);actor(w,-470,164,t,'point','happy',.9);reveal(paid,3);caption('ONE ARRANGEMENT',0,-290,430,C.gold,.5);label('Unless canceled before the deadline',0,375,33,C.ink,5);
  }else if(kinds==='calendar'||kinds==='reminder'){
   actor(w,kinds==='calendar'?-650:-610,170,t,kinds==='calendar'?'shrug':'point',kinds==='calendar'?'worried':'happy',1.35);const cal=box(w,260,-10,820,555,C.white,25,C.line);text(cal,kinds==='calendar'?'NEXT WEEK':'TRIAL DEADLINE',0,-219,35,C.ink);for(let j=0;j<14;j++){const x=-315+j%7*105,y=-95+Math.floor(j/7)*115;disk(cal,x,y,72,j===10?C.coral:C.paper);text(cal,String(j+1),x,y,26,C.ink)}
   if(kinds==='calendar'){['WORK','GROCERIES','PASSWORD?'].forEach((a,j)=>caption(a,90+j*190,210+j*30,260,[C.gold,C.mint,C.lavender][j],2+j*1.2));}else{caption('REMIND ME BEFORE IT ENDS',260,225,630,C.gold,1);label('Price · frequency · deadline · how to cancel',180,384,28,C.ink,3);}
  }else if(kinds==='balance'){
   box(w,0,0,2200,1200,C.navy,0);const road=new Node({y:255});w.add(road);box(road,0,30,2200,260,'#373c50',0);for(let j=0;j<10;j++){const dash=box(road,-1000+j*260,45,120,8,C.white,0);dash.x(()=>-1000+j*260-(t()*110)%260)}
   actor(w,-540,80,t,'phone','happy',1.35);const music=box(w,300,-100,680,360,C.teal,35);text(music,'♫',-180,-20,145,C.white);text(music,'STILL PLAYING',100,-60,33,C.white);text(music,'Renewal can be useful.',100,25,26,C.white);caption('UNTIL YOU WANT TO STOP.',230,225,590,C.gold,5);
  }else if(kinds==='doors'){
   actor(w,-80,140,t,'point','neutral',1.2);door(w,-610,70,'SECURITY CHECK',C.mint,340);door(w,550,70,'ONE MORE OFFER',C.coral,340);caption('HELPS YOUR DECISION',-610,-260,440,C.mint,1);caption('REDIRECTS YOUR DECISION',550,-260,520,C.coral,5);
  }else if(kinds==='offer'){
   box(w,0,0,2200,1200,C.paper,0);actor(w,-560,185,t,'shrug','worried',1.5);const card=box(w,340,-10,800,590,C.white,30,C.line);text(card,'BEFORE YOU GO...',0,-220,35,C.ink);text(card,'50% OFF',0,-75,94,C.teal);text(card,'YOUR NEXT MONTH',0,13,28,C.muted);box(card,0,117,600,74,C.teal,14);text(card,'KEEP MY MEMBERSHIP',0,117,28,C.white);text(card,'Continue to cancellation →',0,219,23,C.muted);reveal(card,.6);caption('But I came here to leave.',-490,-230,495,C.gold,5);
  }else if(kinds==='buttons'){
   box(w,0,0,2200,1200,C.navy,0);label('CONTINUE...',0,-300,58,C.white,.3);const bright=box(w,-435,-28,700,150,C.teal,25),quiet=box(w,435,-28,700,150,'#d1d0d6',25);text(bright,'CONTINUE',0,0,44,C.white);text(quiet,'Continue',0,0,35,C.ink);reveal(quiet,1.5);label('...YOUR MEMBERSHIP?',-435,170,31,C.gold,3);label('...CANCELING?',435,170,31,C.mint,5);line(w,[[-435,58],[-435,120]],C.gold,5,true);line(w,[[435,58],[435,120]],C.mint,5,true);label('Read what the action actually does.',0,345,35,C.white,7);
  }else if(kinds==='loss'){
   actor(w,-575,168,t,'shrug','worried',1.5);const cards=new Node({x:0});w.add(cards);cards.x(()=>-200*R(2,7));['EXCLUSIVE FILMS','YOUR WATCHLIST','MEMBER BENEFITS'].forEach((a,j)=>{const card=box(cards,110+j*345,-20,305,380,[C.lavender,C.gold,C.mint][j],24);text(card,['▶','≡','★'][j],0,-65,97,C.ink);text(card,a,0,75,21,C.ink);reveal(card,.7+j*1.2)});caption('Do I want another paid month?',170,335,630,C.white,7);
  }else if(kinds==='later'){
   actor(w,-560,170,t,'phone','worried',1.45);const p=phone(w,270,15,'CANCEL MEMBERSHIP',1.1);text(p,'Step 2 of 4',0,-83,29,C.muted);box(p,0,7,240,17,C.line,8);box(p,-60,7,120,17,C.teal,8);const note=box(w,380,-160,670,154,C.gold,20);text(note,'WORK: Can you check this?',0,0,31,C.ink);reveal(note,3);p.opacity(()=>1-.78*R(5,1));caption('I’ll finish this later.',-490,-230,440,C.white,5);caption('SUBSCRIPTION STILL ACTIVE',300,362,640,C.coral,8);
  }else if(kinds==='evidence'){
   box(w,0,0,2200,1200,C.paper,0);const paper=box(w,-370,0,640,640,C.white,12,C.line);text(paper,'FTC / STAFF REPORT',0,-250,28,C.teal);text(paper,'BRINGING',0,-95,47,C.ink);text(paper,'DARK PATTERNS',0,-25,47,C.ink);text(paper,'TO LIGHT',0,45,47,C.ink);text(paper,'2022',0,230,30,C.muted);reveal(paper,.5);actor(w,520,160,t,'point','neutral',1.4);label('When design undermines',450,-290,35,C.ink,2);label('your intended choice.',450,-235,35,C.teal,3);caption('FICTIONAL MAZE / REAL DESIGN PATTERN',0,395,840,C.gold,6);
  }else if(kinds==='phone'){
   box(w,0,0,2200,1200,C.paper,0);const p=phone(w,-570,-20,'FRAME',.8);text(p,'THE APP',0,0,32,C.ink);door(w,70,65,'BILLED DIRECTLY',C.purple,350);door(w,620,65,'APP STORE',C.mint,350);line(w,[[-400,-10],[-180,-10]],C.ink,6,true);caption('CHECK WHO BILLS YOU',250,-275,540,C.gold,2);caption('The receipt points to the right door.',220,380,730,C.white,6);
  }else if(kinds==='delete'){
   box(w,0,0,2200,1200,C.paper,0);actor(w,-600,180,t,'point','surprised',1.4);const icon=box(w,-120,-70,180,180,C.teal,35);text(icon,'▶',0,0,80,C.white);icon.x(()=>-120+450*R(1,3));icon.y(()=>-70+250*R(2.5,1.5));icon.scale(()=>1-.95*R(3.5,.7));box(w,400,150,240,230,C.line,15);line(w,[[260,25],[540,25]],C.ink,15);label('TRASH',400,155,32,C.ink);const bill=receipt(w,650,-135,.55);reveal(bill,5);caption('APP GONE. BILLING MAY REMAIN.',10,383,770,C.gold,5);
  }else if(kinds==='receipt'){
   actor(w,-575,175,t,'paper','happy',1.55);const r=receipt(w,350,5,1.1);reveal(r,.3);const outline=box(r,0,-61,425,65,'#ffffff00',8,C.teal);outline.opacity(()=>R(2));caption('FOLLOW THE OFFICIAL ROUTE',260,380,660,C.mint,5);
  }else if(kinds==='access'){
   box(w,0,0,2200,1200,C.paper,0);actor(w,0,130,t,'shrug','neutral',1.25);door(w,-580,60,'ACCESS ENDS NOW',C.coral,370);door(w,580,60,'ACCESS UNTIL DATE',C.mint,370);caption('DEPENDS ON THE TERMS',0,-290,560,C.gold,1);label('Check before canceling early.',0,385,34,C.ink,5);
  }else if(kinds==='confirm'){
   actor(w,-560,175,t,'phone','happy',1.5);const p=phone(w,340,20,'FRAME',1.15);const c=check(p,0,-65,1.05);c.scale(()=>1.05*R(1));text(p,'CANCELED',0,30,39,C.teal);text(p,'Renews: no',0,90,27,C.ink);text(p,'Effective date: confirmed',0,140,19,C.muted);caption('SAVE THE CONFIRMATION',200,390,650,C.gold,6);
  }else if(kinds==='refund'){
   box(w,0,0,2200,1200,C.paper,0);const a=box(w,-435,-15,735,510,C.mint,30),b=box(w,435,-15,735,510,C.lavender,30);text(a,'FUTURE RENEWALS',0,-160,32,C.ink);check(a,0,-15,1.1);text(a,'Have they stopped?',0,145,31,C.ink);text(b,'PAST CHARGE',0,-160,32,C.ink);text(b,'$19.99',0,-15,66,C.ink);text(b,'Eligible for a refund?',0,145,31,C.ink);reveal(b,3);caption('TWO SEPARATE REQUESTS',0,360,630,C.gold,5);
  }else if(kinds==='help'){
   actor(w,-650,170,t,'paper','worried',1.35);const rows=['1  Keep cancellation records','2  Contact the provider','3  Ask your card issuer promptly','4  Report deceptive practices'];rows.forEach((a,j)=>{const r=box(w,240,-220+j*137,1110,102,j%2?C.white:C.mint,16);text(r,a,0,0,33,C.ink);reveal(r,.5+j*1.6)});
  }else if(kinds==='choice'){
   actor(w,-560,170,t,'phone','happy',1.45);const card=box(w,300,0,810,570,C.white,28);text(card,'MY SUBSCRIPTIONS',0,-215,35,C.ink);text(card,'♫   MUSIC',-160,-80,38,C.teal);text(card,'KEEP',230,-80,30,C.teal);line(card,[[-330,0],[330,0]],C.line,3);text(card,'▶   FRAME',-160,85,38,C.muted);text(card,'CANCELED',210,85,27,C.muted);check(card,0,200,.65);caption('KEEP WHAT YOU ACTUALLY CHOOSE.',150,390,760,C.gold,5);
  }else if(kinds==='exit'){
   box(w,0,0,2200,1200,C.paper,0);const a=door(w,-565,70,'TRY IT',C.mint,350),b=door(w,565,70,'LEAVE IT',C.mint,350);actor(w,-300,145,()=>R(2,7)*Math.PI*8/6,'point','happy',1.1,true).x(()=>-300+600*R(2,7));caption('THE DOOR SHOULD WORK BOTH WAYS.',0,-290,890,C.gold,1);label('Find the exit before you walk in.',0,-195,38,C.ink,6);
  }
  // Small persistent chapter labels leave the scene itself to tell the story.
  box(root,0,-480,1920,120,night?C.deep:C.paper,0);const chapter=s.chapter||[...shots.slice(0,shots.indexOf(s)+1)].reverse().find((q:any)=>q.chapter)?.chapter||'The exit';const ch=text(root,String(chapter).toUpperCase(),-875,-480,22,night?C.mint:C.teal);ch.offset.x(-1);text(root,`${String(s.id).padStart(2,'0')} / 24`,830,-480,22,night?C.soft:C.muted);
  box(root,0,500,1920,80,night?C.deep:C.paper,0);text(root,s.kind==='evidence'?'SOURCE: FTC, BRINGING DARK PATTERNS TO LIGHT (2022)':s.kind==='delete'?'SOURCE: GOOGLE PLAY HELP / UNINSTALLING DOES NOT CANCEL':s.kind==='phone'||s.kind==='receipt'?'SOURCE: APPLE & GOOGLE SUBSCRIPTION HELP':'ALEX, FRAME, PRICES AND INTERFACES ARE FICTIONAL EXAMPLES',0,498,17,night?C.soft:C.muted);
  root.opacity(()=>Math.min(R(0,.2),clamp((dur-t())/.2)));yield* tween(dur,v=>t(v*dur));root.remove();
 }
});
