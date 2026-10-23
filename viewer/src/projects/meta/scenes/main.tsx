import {makeScene2D,Node,Rect} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,text,box,disk,line,polygon,pill,actor,phone,room,check,ramp,clamp,expert,ad,chat,browser,money,shield} from '../art';
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,root=new Node({}),w=new Node({});view.add(root);root.add(w);const R=(at=0,len=1)=>ramp(t(),at,len);
  const night=['hook','demo','deposit','withdraw','return','final'].includes(s.kind),ink=night?C.white:C.ink;room(w,night);
  w.scale(()=>1+.035*R(.5,Math.max(2,dur-2)));w.x(()=>-10*R(1,dur-2));
  const show=(n:Node,at=0)=>{const y=n.y();n.opacity(()=>R(at,.55));n.y(()=>y+25*(1-R(at,.55)));return n};
  const label=(a:string,x:number,y:number,size=36,col=ink,at=0)=>show(text(w,a,x,y,size,col),at);
  const tag=(a:string,x:number,y:number,width=500,col=C.gold,at=0)=>show(pill(w,a,x,y,width,col),at);
  const paper=(x:number,y:number,width=730,height=590)=>box(w,x,y,width,height,C.white,22,C.line);
  const k=s.kind;
  if(k==='hook'||k==='demo'||k==='return'){
   actor(w,-590,170,t,k==='return'?'point':'phone',k==='hook'?'worried':k==='return'?'happy':'neutral',1.45);const a=ad(w,300,0,.95);show(a,.5);
   tag(k==='hook'?'If it’s a scam, why is it here?':k==='demo'?'FICTIONAL RECONSTRUCTION':'VERIFY OUTSIDE THE AD',-380,-290,k==='hook'?620:600,C.gold,2.5);
   if(k==='return'){const n=browser(w,295,50,720,420);text(n,'Official website',0,-60,44,C.teal);text(n,'Independent contact information',0,35,30,C.ink);show(n,6);a.opacity(()=>1-.9*R(6));}
  }else if(k==='news'){
   box(w,0,0,2200,1200,C.navy,0);const p=paper(-360,10,735,600);text(p,'CIVIL LAWSUIT',0,-220,28,C.teal);text(p,'RHODE ISLAND',0,-95,55,C.ink);text(p,'v.',0,-8,44,C.muted);text(p,'META',0,80,78,C.ink);text(p,'Filed October 22, 2026',0,225,28,C.muted);
   show(p,.3);label('Scam advertising',480,-170,52,C.white,1);label('Creation and optimization',480,-75,34,C.white,3);tag('STATE ALLEGATIONS',480,65,550,C.coral,1);tag('META DISPUTES THE CASE',480,180,600,C.mint,7);
  }else if(k==='stakes'){
   box(w,0,0,2200,1200,C.paper,0);actor(w,-670,155,t,'paper','neutral',1.25);
   ['Civil penalties','Restitution for consumers','Changes to business practices'].forEach((a,j)=>{const p=paper(230,-185+j*167,1150,120);text(p,a,0,0,37,C.ink);show(p,.5+j*1.5)});tag('REQUESTED RELIEF ≠ COURT JUDGMENT',100,345,950,C.gold,6);
  }else if(k==='response'){
   const p=paper(0,0,1530,660);text(p,'META’S RESPONSE',0,-245,43,C.teal);text(p,'Disputes the lawsuit',0,-153,44,C.ink);text(p,'159 million+',0,-20,110,C.ink);text(p,'scam ads removed in 2025',0,83,38,C.ink);text(p,'Company-reported / Meta Newsroom, March 2026',0,166,25,C.muted);tag('EXPANDING ADVERTISER VERIFICATION',0,350,920,C.mint,5);show(p,.5);
  }else if(k==='distinction'){
   box(w,0,0,2200,1200,C.paper,0);const left=paper(-440,0,750,500),right=paper(440,0,750,500);text(left,'ADS REMOVED',0,-150,38,C.teal);text(left,'159M+',0,-15,97,C.ink);text(left,'Company-reported count',0,145,29,C.muted);text(right,'FRACTION CAUGHT',0,-150,38,C.ink);text(right,'?',0,-15,120,C.coral);text(right,'Needs a denominator',0,145,29,C.muted);show(right,3);tag('A COUNT IS NOT A DETECTION RATE',0,350,920,C.gold,6);
  }else if(k==='example'){
   box(w,0,0,2200,1200,C.paper,0);const a=paper(-475,-20,570,540);text(a,'Reported allegation',0,-210,30,C.teal);expert(a,0,-65,.9);text(a,'Impersonated bank executive',0,170,25,C.ink);text(a,'Illustration / not the real person',0,222,20,C.muted);const c=chat(w,440,0,.9);line(w,[[-140,0],[245,0]],C.coral,8,true);show(c,3);tag('NAME AND IMAGE USED WITHOUT ENDORSEMENT',0,365,1130,C.gold,6);
  }else if(k==='pause'){
   actor(w,-650,170,t,'shrug','neutral',1.3);const a=paper(250,0,1110,590);text(a,'SPONSORED',0,-155,78,C.teal);text(a,'≠',0,-15,105,C.coral);text(a,'A PROMISE OF HONESTY',0,140,42,C.ink);show(a,.6);
  }else if(k==='faces'){
   box(w,0,0,2200,1200,C.paper,0);const a=paper(-470,0,650,570);expert(a,0,-50,1.35);text(a,'A CONVINCING FACE',0,215,30,C.ink);const b=paper(420,0,700,570);text(b,'INDEPENDENT EVIDENCE',0,-205,31,C.teal);shield(b,0,-5,.95);text(b,'Verify the person and claim',0,200,29,C.ink);show(b,4);line(w,[[-115,0],[35,0]],C.ink,6,true);
  }else if(k==='comments'){
   actor(w,-650,170,t,'phone','worried',1.35);const p=paper(230,0,1100,650);text(p,'COMMENTS',0,-250,38,C.teal);['“I got paid!”','“This changed my life.”','“Another amazing result.”'].forEach((a,j)=>{const row=box(p,0,-125+j*140,980,107,j===1?C.mint:C.paper,17);disk(row,-420,0,53,C.purple);text(row,a,35,0,31,C.ink);show(row,1+j*1.4)});tag('PRAISE IS NOT VERIFICATION',70,365,810,C.gold,7);
  }else if(k==='handoff'){
   box(w,0,0,2200,1200,C.paper,0);const a=ad(w,-550,10,.8);const c=chat(w,420,0,1.05);line(w,[[-280,0],[190,0]],C.ink,8,true);show(c,3);tag('FROM PUBLIC AD TO PRIVATE GROUP',0,365,960,C.gold,5);
  }else if(k==='deposit'||k==='withdraw'){
   actor(w,-650,185,t,k==='deposit'?'phone':'shrug',k==='deposit'?'happy':'surprised',1.45);const p=browser(w,240,-25,1100,610);text(p,k==='deposit'?'ACCOUNT BALANCE':'WITHDRAWAL REQUEST',0,-205,35,C.ink);
   if(k==='deposit'){const balance=text(p,'$500',0,-30,105,C.teal);balance.text(()=>'$'+Math.round(500+325*R(2,5)).toLocaleString());line(p,[[-410,160],[-260,130],[-100,153],[70,55],[250,23],[420,-10]],C.teal,7);tag('A SCREEN CAN INVENT A BALANCE',100,365,950,C.gold,7);}
   else{const demand=box(p,0,-10,950,220,C.coral,20);text(demand,'PAY A RELEASE FEE FIRST',0,-40,43,C.ink);text(demand,'“Tax” / “Verification” / “Processing”',0,50,30,C.ink);show(demand,2);tag('ANOTHER PAYMENT CAN DEEPEN THE LOSS',0,365,1060,C.gold,6);}
  }else if(k==='pullback'){
   box(w,0,0,2200,1200,C.navy,0);const row=new Node({});w.add(row);row.scale(()=>1-.08*R(2,5));const names=['POLISHED AD','BORROWED ID','APPARENT CROWD','PRIVATE CHAT','FAKE BALANCE'];names.forEach((a,j)=>{const x=-730+j*365;const p=box(row,x,0,310,320,[C.lavender,C.mint,C.gold,C.soft,C.coral][j],25);text(p,String(j+1),0,-75,75,C.ink);text(p,a,0,75,23,C.ink);show(p,.5+j*.7);if(j<4)show(line(row,[[x+160,0],[x+195,0]],C.white,5,true),1+j*.7)});label('TRUST IS BUILT BEFORE THE TRANSFER.',0,310,43,C.white,6);
  }else if(k==='scope'){
   box(w,0,0,2200,1200,C.navy,0);label('$2.1 BILLION',0,-165,138,C.gold,.4);label('Reported losses from scams that started on social media',0,-10,40,C.white,1);label('2025 / FTC data',0,75,32,C.mint,2);tag('ACROSS PLATFORMS · NOT META-ONLY · NOT AD-ONLY',0,245,1330,C.white,5);
  }else if(k==='units'){
   box(w,0,0,2200,1200,C.paper,0);const l=paper(-440,-5,760,560),r=paper(440,-5,760,560);text(l,'FTC',0,-210,35,C.teal);text(l,'$2.1B',0,-70,97,C.ink);text(l,'Reported losses',0,50,40,C.ink);text(l,'Across social media / 2025',0,163,27,C.muted);text(r,'META',0,-210,35,C.teal);text(r,'159M+',0,-70,97,C.ink);text(r,'Ads removed',0,50,40,C.ink);text(r,'Company-reported / 2025',0,163,27,C.muted);tag('DIFFERENT UNITS. DIFFERENT COVERAGE.',0,350,1060,C.gold,4);
  }else if(k==='system'){
   actor(w,-650,170,t,'point','neutral',1.35);const p=paper(230,0,1100,650);['Who is the advertiser?','Can removed scammers return?','What happens after a report?'].forEach((a,j)=>{text(p,a,0,-185+j*170,40,C.ink);show(check(p,-440,-185+j*170,.45),1+j*1.5)});tag('QUESTIONS FOR THE SYSTEM',140,365,800,C.gold,6);
  }else if(k==='separate'){
   actor(w,-640,180,t,'point','happy',1.4);const p=browser(w,260,-10,1110,640);text(p,'Official institution website',0,-185,42,C.teal);shield(p,-280,0,.8);text(p,'Find it independently',150,-45,38,C.ink);text(p,'Use official contact details',150,55,31,C.ink);show(p,.5);tag('THE AD DOES NOT SUPPLY ITS OWN PROOF',70,365,1090,C.gold,6);
  }else if(k==='pressure'){
   actor(w,-660,175,t,'shrug','worried',1.4);['“GUARANTEED RETURNS”','“SECRET OPPORTUNITY”','“TRANSFER NOW”'].forEach((a,j)=>{const p=box(w,240,-190+j*175,1110,125,j===1?C.gold:C.coral,20);text(p,a,0,0,42,C.ink);show(p,.5+j*1.5)});
  }else if(k==='records'){
   actor(w,-660,170,t,'paper','neutral',1.35);const p=paper(240,0,1120,650);text(p,'ACT PROMPTLY',0,-245,42,C.teal);['Contact your bank or payment service','Save messages and transaction records','Report the account and the scam'].forEach((a,j)=>text(p,a,0,-110+j*140,33,C.ink));tag('RECOVERY IS NOT GUARANTEED',100,365,850,C.gold,6);
  }else if(k==='recovery'){
   box(w,0,0,2200,1200,C.paper,0);const p=phone(w,-490,0,'NEW MESSAGE',1.1);box(p,0,-20,263,255,C.coral,20);text(p,'“We can get',0,-90,25,C.ink);text(p,'everything back.”',0,-45,25,C.ink);text(p,'“Just pay first.”',0,50,27,C.ink);actor(w,390,180,t,'shrug','worried',1.45);tag('WATCH FOR THE SECOND SCAM',300,-300,1000,C.gold,4);
  }else if(k==='case'){
   box(w,0,0,2200,1200,C.paper,0);const p=paper(-430,0,750,600);text(p,'RHODE ISLAND v. META',0,-210,40,C.ink);text(p,'Evidence',0,-65,55,C.teal);text(p,'Legal arguments',0,45,49,C.teal);text(p,'Court process',0,155,49,C.teal);actor(w,470,160,t,'paper','neutral',1.4);tag('AS OF OCTOBER 23, 2026',450,-260,630,C.gold,1);show(pill(p,'ALLEGATIONS REMAIN DISPUTED',0,245,660,C.coral),6);
  }else if(k==='final'){
   actor(w,-650,175,t,'phone','happy',1.4);label('SPONSORED',260,-190,92,C.white,.5);label('≠',260,-50,110,C.coral,1);label('PROOF YOU CAN TRUST IT',260,80,52,C.mint,2);tag('VERIFY OUTSIDE THE AD.',190,300,850,C.gold,6);
  }
  // Chapter labels only: no scene counter or scene-number watermark.
  box(root,0,-480,1920,120,night?C.deep:C.paper,0);const chapter=s.chapter||[...shots.slice(0,shots.indexOf(s)+1)].reverse().find((q:any)=>q.chapter)?.chapter||'The sponsored ad';const ch=text(root,String(chapter).toUpperCase(),-650,-480,22,night?C.mint:C.teal);ch.offset.x(-1);
  box(root,0,500,1920,80,night?C.deep:C.paper,0);text(root,s.source,0,495,19,night?C.soft:C.muted);
  root.opacity(()=>Math.min(R(0,.22),clamp((dur-t())/.22)));yield* tween(dur,v=>t(v*dur));root.remove();
 }
});
