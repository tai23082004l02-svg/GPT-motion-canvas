import {makeScene2D,Node,Rect,Circle,Line,Txt,Path} from '@motion-canvas/2d';
import {createSignal,tween,easeOutCubic} from '@motion-canvas/core';
import shots from '../shots.json';
import {P,font,txt,rect,circ,line,poly,coin,icon,alex,car,city,dealer,garage,desk,bubble,badge,receipt,money} from '../art';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export default makeScene2D(function*(view){
 view.fill(P.paper);
 const fullDuration=shots[shots.length-1].end;
 const global=createSignal(0);
 const progress=new Rect({x:-960,y:535,offsetX:-1,width:()=>1920*global()/fullDuration,height:10,fill:P.teal});
 for(let index=0;index<shots.length;index++){
  const shot:any=shots[index],dur=shot.end-shot.start,t=createSignal(0);
  const root=new Node({});view.add(root);
  const world=new Node({y:35,scale:()=>1+Math.min(t()/dur,1)*.018});root.add(world);
  const kind=shot.kind;
  const R=(delay=0,d=.65)=>easeOutCubic(clamp((t()-delay)/d));
  function appear(n:Node,delay=0){n.opacity(()=>R(delay));const yy=n.y();n.y(()=>yy+28*(1-R(delay)));return n;}
  function label(s:string,x:number,y:number,size=36,color=P.ink,delay=0){return appear(txt(world,s,x,y,size,color),delay);}
  function count(n:number,x:number,y:number,size=90,color=P.teal,delay=1){const a=txt(world,'',x,y,size,color,700);a.text(()=>money(n*R(delay,1.4)));return appear(a,delay);}
  function tokens(x1:number,y1:number,x2:number,y2:number,start=2,num=4){for(let j=0;j<num;j++){const cc=coin(world,x1,y1,.52);const phase=()=>((Math.max(0,t()-start)*.35+j/num)%1);cc.x(()=>x1+(x2-x1)*phase());cc.y(()=>y1+(y2-y1)*phase()-Math.sin(phase()*Math.PI)*115);cc.opacity(()=>t()>start?.9:0);cc.rotation(()=>Math.sin(t()+j)*15);}}
  function floating(n:Node,amp=5){const yy=n.y();n.y(()=>yy+Math.sin(t()*1.6)*amp);return n;}
  const plain=()=>{rect(world,0,50,2100,800,P.paper,0);circ(world,590,40,640,'#e3eadb');circ(world,-710,265,370,'#efe2c8');line(world,[[-1000,310],[1000,310]],P.shadow,4);};
  const defaultAlex=(mood=shot.mood,pose='talk',x=-630,scale=.96)=>alex(world,x,135,scale,t,mood,pose);
  const smallCar=(x=-110,y=226,scale=.65,moving=false)=>car(world,x,y,scale,t,P.blue,moving);
  if(kind==='dealership'){
   dealer(world,t);defaultAlex(shot.mood,'wave',-580,1.05);
   const v=car(world,200,195,.97,t,P.blue,false);v.x(()=>200-130*(1-R(.15,1.8)));
   const price=badge(world,shot.variant==='payment'?'≈ $535 / MONTH':'$30,000',260,-115,P.yellow,310);floating(appear(price,.8));
   if(shot.variant==='payment'){appear(bubble(world,'Looks manageable.',-510,-155,330),3);icon(world,'key',-405,115,.5);}
   else{appear(bubble(world,'Meet Alex.',-555,-175,220),.4);icon(world,'key',-405,115,.5);}
  }else if(kind==='surprise'){
   plain();defaultAlex('surprised','talk',-530,1.15);car(world,120,212,.85,t);
   ['INSURANCE','FUEL','INTEREST','REPAIRS'].forEach((s,j)=>{const x=[-100,415,530,-100][j],y=[-180,-160,30,30][j];const b=badge(world,s,x,y,j%2?P.coral:P.yellow,245);appear(b,1+j*1.5);b.rotation(()=>Math.sin(t()+j)*3);});
   appear(bubble(world,'We’re just getting started.',130,-65,430),7);
  }else if(kind==='road'||kind==='ending'||kind==='final'){
   city(world,t,true);const v=car(world,60,235,1.15,t,P.blue,true);v.x(()=>60+Math.sin(t()*.35)*35);
   if(kind==='road'){['LOAN','FUEL','INSURANCE','REPAIRS','RESALE'].forEach((s,j)=>{const n=badge(world,s,-730+j*365,-180,j===4?P.mint:P.white,260);appear(n,.6+j*.5);});label('ALEX’S FIVE-YEAR ROAD TRIP',0,-75,34,P.ink,1.5);}
   else if(kind==='ending'){appear(bubble(world,'What will it really cost?',90,-140,460),1);defaultAlex('happy','wave',-635,.94);}
   else {label('THE WHOLE BUDGET.',0,-150,68,P.ink,.8);label('A clearer view before the next test drive.',0,-65,30,P.muted,2);const stamp=badge(world,'THE MATH BEHIND EVERYDAY LIFE',0,350,P.yellow,650);appear(stamp,2.5);}
  }else if(kind==='assumptions'){
   desk(world);defaultAlex('thinking','point',-690,1.05);
   const r=receipt(world,270,20,[{label:'Ownership period',value:'5 years'},{label:'Miles each month',value:'1,200'},{label:'Vehicle / price',value:'Sedan / $30,000'},{label:'All amounts',value:'Illustrative'}],'OUR EXAMPLE',800);appear(r,.4);icon(world,'calendar',780,230,.65);
  }else if(kind==='loan'){
   plain();defaultAlex('thinking','point',-700,.97);const bank=icon(world,'bank',620,-40,1.6);appear(bank,.5);
   car(world,-160,215,.73,t);const r=receipt(world,105,-95,[{label:'Price',value:'$30,000'},{label:'Down payment',value:'− $3,000',color:P.teal},{label:'Amount borrowed',value:'$27,000'}],'THE FINANCING',650);appear(r,.7);
   appear(badge(world,'7% APR',560,215,P.yellow,230),3);appear(badge(world,'60 MONTHS',560,295,P.mint,230),5);
   tokens(-350,60,550,70,4);
  }else if(kind==='payment'){
   desk(world);defaultAlex('neutral','point',-680,1.05);
   icon(world,'calendar',-320,-15,1.3);label('MONTHLY LOAN PAYMENT',335,-135,27,P.muted,.6);count(534.632,335,-30,105,P.teal,1);
   label('× 60 months',335,72,37,P.ink,3);line(world,[[0,136],[665,136]],P.shadow,3);label('≈ $32,078 paid to the lender',335,190,32,P.ink,5);
   for(let j=0;j<5;j++){const c=coin(world,-410+j*75,230,.65);appear(c,1+j*.35);}
  }else if(kind==='interest'){
   plain();defaultAlex('concerned','talk',-700,1.05);car(world,-330,210,.57,t);
   label('TOTAL LOAN PAYMENTS',350,-155,26,P.muted,.6);label('$32,078',350,-83,83,P.ink,1);label('− $27,000 borrowed',350,8,35,P.muted,3);line(world,[[40,66],[660,66]],P.shadow,3);count(5078,350,145,98,P.coral,5);label('INTEREST OVER FIVE YEARS',350,233,25,P.ink,6);
   tokens(-335,130,700,-35,2);icon(world,'bank',760,-85,.65,P.coral);
  }else if(kind==='term'){
   plain();defaultAlex('thinking','point');icon(world,'clock',300,0,1.7);label('MORE MONTHS',300,-180,55);label('can mean more total interest',300,190,32,P.coral);
  }else if(kind==='tax'||kind==='receipt'){
   dealer(world,t);defaultAlex('surprised','talk',-680,1.1);smallCar(-320,226,.6);
   if(kind==='tax'){const r=receipt(world,370,0,[{label:'Sales tax assumption',value:'6%'},{label:'Tax on $30,000',value:'$1,800',color:P.coral},{label:'Registration / year',value:'$250'}],'BEFORE YOU DRIVE AWAY',770);appear(r,.5);icon(world,'receipt',770,225,.65,P.coral);}
   else {const r=receipt(world,350,-10,[{label:'Down payment',value:'$3,000'},{label:'Sales tax',value:'+ $1,800'},{label:'Upfront cash',value:'$4,800',color:P.coral}],'THE FIRST CASH OUT',720);appear(r,.5);tokens(-600,130,150,30,2);appear(bubble(world,'Already?',-630,-140,210),2);}
  }else if(kind==='insurance'||kind==='shield'){
   city(world,t);defaultAlex(shot.mood,'point',-660,1.05);car(world,-120,220,.78,t);
   const sh=icon(world,'shield',475,-65,1.65);floating(appear(sh,.5));
   if(kind==='insurance'){count(200,475,150,85,P.teal,1.5);label('PER MONTH',475,220,25,P.muted,2);appear(badge(world,'$12,000 / FIVE YEARS',-95,-135,P.yellow,390),5);tokens(-150,120,480,30,3);}
   else{appear(bubble(world,'Quote this exact model.',-410,-150,390),1.5);appear(badge(world,'DRIVER + LOCATION + COVERAGE',310,350,P.white,660),3);}
  }else if(kind==='gas'||kind==='fuelmath'){
   city(world,t);const pump=icon(world,'pump',615,100,2.05,P.coral);defaultAlex('concerned','talk',-680,.95);car(world,-130,220,.94,t);
   if(kind==='gas'){const b=receipt(world,80,-145,[{label:'1,200 miles ÷ 30 MPG',value:'40 gal'},{label:'40 gal × $3.50',value:'$140'}],'MONTHLY FUEL',730);appear(b,.6);}
   else {count(8400,80,-135,108,P.coral,1);label('$140 × 60 months',80,-45,32,P.ink,2);appear(bubble(world,'Again? I just paid the loan.',-510,-85,460),5);}
   tokens(-190,145,610,30,3);
  }else if(kind==='garage'||kind==='reserve'){
   garage(world);defaultAlex('surprised','talk',-720,1.02);const cc=car(world,-30,205,.94,t);cc.rotation(()=>Math.sin(t()*7)*.25);
   const mechanic=alex(world,700,150,.9,t,'happy','point',P.coral);rect(mechanic,0,-217,103,28,P.ink,10);rect(mechanic,24,-204,90,10,P.ink,4);const w=icon(world,'wrench',590,140,.65,P.ink);w.rotation(()=>Math.sin(t()*2)*25);
   appear(badge(world,'$100 / MONTH BUDGET',-60,-110,P.yellow,420),.7);appear(badge(world,'$6,000 SPENT IN FIVE YEARS',50,-25,P.white,530),5);
   const alarm=label('rattle…',335,55,31,P.coral,3);alarm.rotation(()=>Math.sin(t()*9)*4);tokens(-180,115,670,30,5);
  }else if(kind==='monthly'||kind==='monthlytotal'){
   plain();defaultAlex(kind==='monthlytotal'?'surprised':'concerned','talk',-700,1.03);car(world,-390,230,.5,t);
   if(kind==='monthly'){
    const vals=[['Loan','$535','bank'],['Insurance','$200','shield'],['Fuel','$140','pump'],['Maintenance','$100','wrench'],['Registration','≈ $21','receipt']];
    vals.forEach((a,j)=>{const g=new Node({x:250,y:-170+j*94});world.add(g);rect(g,0,0,970,80,P.white,17);icon(g,a[2],-400,0,.35);const n=txt(g,a[0],-320,0,29,P.muted);n.offset.x(-1);const b=txt(g,a[1],400,0,36,P.ink);b.offset.x(1);appear(g,.5+j*1.7);});
   }else{
    count(995,255,-70,145,P.coral,1);label('MONTHLY CASH BUDGET',255,45,31,P.ink,1.5);label('plus $4,800 upfront',255,130,36,P.muted,4);const old=badge(world,'Loan payment alone: ≈ $535',255,235,P.white,650);appear(old,6);
    appear(bubble(world,'That’s a bigger number.',-580,-145,410),4);
   }
  }else if(kind==='extras'){
   plain();defaultAlex('thinking','point');['parking','receipt','clock'].forEach((s,j)=>{icon(world,s,-100+j*340,30,1.3);label(['PARKING','TOLLS / FEES','OTHER USES OF MONEY'][j],-100+j*340,180,24,P.muted,j);});
  }else if(kind==='calendar'){
   city(world,t,true);car(world,-90,225,.96,t,P.blue,true);defaultAlex('happy','wave',-680,.97);
   const cal=icon(world,'calendar',510,-50,1.5);appear(cal,.6);label('YEARS LATER',510,130,33,P.ink,1);
   for(let j=0;j<5;j++){const b=badge(world,String(j+1),-280+j*170,-180,j===4?P.yellow:P.white,100);appear(b,.7+j*.65);}
   appear(badge(world,'LOAN PAID OFF',-30,40,P.mint,340),4);
  }else if(kind==='depreciation'||kind==='valuefall'||kind==='invisible'){
   plain();defaultAlex('thinking','point',-710,1.02);car(world,-270,230,.67,t);
   if(kind==='depreciation'){const b=badge(world,'ASSUMED RESALE VALUE',300,-170,P.yellow,490);appear(b,.5);count(15000,300,-45,115,P.teal,1);label('after five years',300,61,35,P.muted,2);icon(world,'tag',650,220,.9);label('A scenario, not a forecast.',300,174,28,P.muted,5);}
   else{label('PURCHASE',100,-170,25,P.muted,.5);label('RESALE',660,-170,25,P.muted,1);label('$30,000',100,-90,69,P.ink,1);label('$15,000',660,-90,69,P.teal,2);line(world,[[285,-88],[465,-88]],P.coral,6,true);const fall=line(world,[[100,0],[660,118]],P.coral,8,true);appear(fall,2.5);count(15000,400,207,90,P.coral,4);label('VALUE USED UP',400,290,25,P.muted,5);}
  }else if(kind==='nodouble'){
   desk(world);defaultAlex('thinking','point',-700,1.06);
   const left=rect(world,45,0,360,250,P.white,25);const right=rect(world,505,0,430,250,P.white,25);icon(left,'bank',0,-65,.52);txt(left,'Loan principal',0,25,31);txt(left,'Already buys the car',0,77,23,P.muted);icon(right,'tag',0,-65,.6);txt(right,'Depreciation',0,25,31);txt(right,'Value used over time',0,77,23,P.muted);label('+',265,0,55,P.ink,1);
   const cross=new Node({x:265,y:0});world.add(cross);line(cross,[[-80,-80],[80,80]],P.coral,12);line(cross,[[80,-80],[-80,80]],P.coral,12);appear(cross,4);label('DON’T COUNT THE PURCHASE TWICE',265,236,29,P.coral,5);
  }else if(kind==='cashout'||kind==='ledger'){
   plain();defaultAlex('concerned','point',-740,.98);car(world,-425,250,.48,t);
   const rows=kind==='cashout'?[['Down + loan payments','$35,078'],['Sales tax','$1,800'],['Insurance','$12,000'],['Fuel','$8,400'],['Maintenance','$6,000'],['Registration','$1,250']]:[['Depreciation','$15,000'],['Interest','≈ $5,078'],['Sales tax','$1,800'],['Insurance + fuel','$20,400'],['Maintenance + registration','$7,250']];
   const rr=receipt(world,290,20,rows.map(r=>({label:r[0],value:r[1]})),kind==='cashout'?'CASH PAID OUT':'COST OF OWNERSHIP',1020);appear(rr,.5);
   if(kind==='cashout')appear(badge(world,'TOTAL OUT: ≈ $64,528',-460,-95,P.coral,410),4);else appear(badge(world,'SAME TOTAL: ≈ $49,528',-460,-95,P.mint,440),4);
  }else if(kind==='resale'){
   city(world,t);defaultAlex('happy','wave',-650,1.02);car(world,100,225,.95,t);
   label('$64,528',125,-160,80,P.ink,.4);label('cash paid out',125,-90,25,P.muted,.6);label('− $15,000 resale',125,-8,46,P.teal,3);count(49528,580,160,95,P.teal,6);label('OWNERSHIP COST',580,240,24,P.muted,6.5);tokens(700,55,-520,115,3);
  }else if(kind==='total'){
   plain();defaultAlex('surprised','talk',-720,1.1);car(world,-280,235,.72,t);
   const back=circ(world,365,0,610,P.mint);back.scale(()=>.95+Math.sin(t()*.7)*.025);
   label('FIVE-YEAR OWNERSHIP COST',365,-185,25,P.ink,.5);count(49500,365,-60,126,P.ink,1);label('≈ $825 / month on average',365,70,39,P.teal,3);appear(badge(world,'$30,000 PURCHASE PRICE',365,184,P.white,510),5);
   for(let j=0;j<10;j++){const cc=coin(world,-30+j*93,-210,.4);cc.y(()=>-210+((t()*80+j*57)%580));cc.opacity(.6);cc.rotation(()=>t()*35+j*22);}
  }else if(kind==='whyaverage'||kind==='twobudgets'){
   desk(world);defaultAlex('thinking','point',-730,.94);
   const boxes=[rect(world,-40,20,540,360,P.white,30),rect(world,570,20,540,360,P.white,30)];
   boxes.forEach((b,j)=>{icon(b,j?'tag':'wallet',0,-100,.65,j?P.teal:P.coral);txt(b,j?'OWNERSHIP COST':'CASH FLOW',0,-15,29);txt(b,kind==='whyaverage'?(j?'≈ $825 / month':'≈ $995 / month'):(j?'What will I spend?':'Can I pay the bills?'),0,60,kind==='whyaverage'?40:30,j?P.teal:P.coral);txt(b,j?'Includes value recovered':'Plus the upfront money',0,130,22,P.muted);appear(b,.5+j*1.2);});
   label('Different questions. Both matter.',270,292,30,P.muted,5);
  }else if(kind==='sensitivity'){
   plain();defaultAlex('surprised','talk',-720,1.04);car(world,-380,240,.54,t);
   const rr=receipt(world,320,-10,[{label:'Insurance +$100 / month',value:'+ $6,000',color:P.coral},{label:'Resale value −$3,000',value:'+ $3,000',color:P.coral}],'FIVE-YEAR COST CHANGES',1060);appear(rr,.7);label('Recheck the assumptions.',320,230,35,P.ink,5);
  }else if(kind==='choices'){
   city(world,t,true);car(world,150,215,1.02,t,P.blue,true);defaultAlex('happy','wave',-590,1.1);
   ['WORK','TIME','PEOPLE'].forEach((s,j)=>{const n=badge(world,s,-360+j*480,-165,j===1?P.yellow:P.white,340);appear(n,1+j*1.1);});
  }else if(kind==='comparecars'||kind==='used'||kind==='tradeoff'){
   plain();const c1=car(world,-440,190,.72,t,P.blue);const c2=car(world,440,190,.72,t,P.coral);
   if(kind==='used'){appear(badge(world,'$30,000 CAR',-440,-150,P.white,360),.5);appear(badge(world,'$20,000 CAR',440,-150,P.white,360),1);label('≈ $535 / month',-440,-47,46,P.ink,2);label('≈ $337 / month',440,-47,46,P.teal,3);appear(badge(world,'≈ $198 LESS EACH MONTH',0,360,P.mint,540),5);label('Same down payment, APR and term.',0,282,26,P.muted,4);}
   else if(kind==='comparecars'){label('LOWER PRICE',-440,-130,36,P.ink,.5);label('DIFFERENT COSTS',440,-130,36,P.ink,1);[['wrench',-620],['tag',-250],['pump',250],['shield',620]].forEach((a:any,j)=>appear(icon(world,a[0],a[1],-20,.5),1+j*.6));label('Price • Repairs • Energy • Resale',0,355,34,P.muted,4);}
   else {label('LOWER PAYMENT',-440,-130,36,P.teal,.5);label('CHECK THE WHOLE BUDGET',440,-130,29,P.ink,2);icon(world,'receipt',440,-10,.65);label('Run the same five-year comparison.',0,355,34,P.muted,4);}
  }else if(kind==='checklist'){
   desk(world);defaultAlex('happy','point',-710,1.03);const panel=rect(world,300,20,1040,490,P.white,20);
   const rows=['Out-the-door price','APR + loan term','Actual insurance quote','Mileage + maintenance','Ownership period + resale'];
   rows.forEach((s,j)=>{const g=new Node({x:0,y:-180+j*87});panel.add(g);icon(g,'check',-430,0,.35);const n=txt(g,s,-355,0,31,P.ink,500);n.offset.x(-1);appear(g,.5+j*1.6);});
  }else if(kind==='paidcash'||kind==='keep'){
   city(world,t);defaultAlex('happy','wave',-640,1.08);car(world,130,220,1.05,t);
   appear(badge(world,'LOAN PAYMENT: $0',140,-140,P.mint,440),.7);[['shield',-70],['pump',160],['wrench',390]].forEach((a:any,j)=>{const n=icon(world,a[0],a[1],10,.62);appear(n,3+j*.5);});appear(badge(world,'Other costs keep going.',160,350,P.white,530),5);
  }else {plain();defaultAlex();smallCar();label(shot.title,300,0,45);}
  // An opaque title band preserves contrast above every illustrated setting.
  const header=new Node({});root.add(header);rect(header,0,-421,1920,238,P.paper,0);
  const brand=txt(header,'THE MATH BEHIND EVERYDAY LIFE',-875,-483,18,P.muted,600);brand.offset.x(-1);
  const no=txt(header,'MONEY / 002',875,-483,18,P.teal,600);no.offset.x(1);
  const chapter=shot.chapter||[...shots.slice(0,index+1)].reverse().find((s:any)=>s.chapter)?.chapter||'The five-year plan';
  txt(header,chapter.toUpperCase(),0,-438,20,P.teal,600);
  const title=txt(header,shot.title,0,-368,shot.title.length>46?43:shot.title.length>35?49:58,P.ink,700);
  title.opacity(()=>R(.05,.5));title.y(()=>-368+18*(1-R(.05,.6)));
  // Footer is informational and stays separate from the cinematic scene.
  rect(root,0,491,1920,78,P.paper,0);
  const note=kind==='assumptions'?'EXCLUDES PARKING, TOLLS AND OPPORTUNITY COST • ASSUMED NO LOAN FEES':kind==='used'?'PAYMENT COMPARISON ONLY • OTHER COSTS CAN DIFFER':kind==='monthly'||kind==='monthlytotal'?'CASH BUDGET • UPFRONT COSTS ARE SEPARATE':kind==='depreciation'||kind==='valuefall'?'RESALE VALUE IS AN ASSUMPTION, NOT A FORECAST':'ILLUSTRATIVE FIVE-YEAR SCENARIO • USD • YOUR COSTS WILL VARY';
  txt(root,note,0,491,17,P.muted,400);
  root.opacity(()=>Math.min(R(0,.26),clamp((dur-t())/.26)));
  view.add(progress);
  yield* tween(dur,v=>{t(v*dur);global(shot.start+v*dur)});
  root.remove();
 }
});
