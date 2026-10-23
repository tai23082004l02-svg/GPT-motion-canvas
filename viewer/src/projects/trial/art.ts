import {Node,Rect,Circle,Path,Txt} from '@motion-canvas/2d';
import {C,text as baseText,box,disk,line,polygon,pill as basePill,book} from '../scroll/art';
export {C,box,disk,line,polygon,book};
export const font='"Times New Roman", "Liberation Serif", serif';
export function text(...args:Parameters<typeof baseText>){const n=baseText(...args);n.fontFamily(font);return n;}
export function pill(...args:Parameters<typeof basePill>){const n=basePill(...args);n.findAll(child=>child instanceof Txt).forEach(child=>(child as Txt).fontFamily(font));return n;}
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ramp=(t:number,a:number,b=1)=>{const v=clamp((t-a)/b);return v*v*(3-2*v)};
export function actor(p:Node,x:number,y:number,t:()=>number,pose='phone',mood='neutral',scale=1,walk=false){
 const g=new Node({x,y,scale});p.add(g);const phase=()=>walk?t()*6:0;
 disk(g,0,175,160,'#0000000c').height(18);
 for(const sign of [-1,1]){const stride=()=>walk?Math.sin(phase()+ (sign===1?Math.PI:0))*32:0;line(g,()=>[[sign*24,0],[sign*30+stride()*.6,76],[sign*36+stride(),151-Math.max(0,stride()*.22)]],C.ink,27);const shoe=box(g,sign*42,156,65,26,C.white,10,C.ink);shoe.x(()=>sign*42+stride());shoe.y(()=>156-Math.max(0,stride()*.22));}
 box(g,0,-47,110,132,C.teal,27);polygon(g,[[-18,-110],[18,-110],[12,-25],[-12,-25]],C.white);box(g,0,-116,31,39,C.skin,11);
 // Head, ears and neck share a fixed coordinate system. Gestures move only limbs/eyes.
 disk(g,-47,-171,18,C.skin);disk(g,47,-171,18,C.skin);box(g,0,-171,100,112,C.skin,41);
 g.add(new Path({data:'M -49 -169 Q -61 -235 -9 -234 Q 16 -251 47 -224 Q 65 -199 43 -179 L 33 -204 Q 0 -188 -35 -205 L -41 -169 Z',fill:C.hair}));
 const eyes=new Node({y:-168,scaleY:()=>Math.abs(Math.sin(t()*.91+.8))<.035?.1:1});g.add(eyes);for(const xx of [-19,19])disk(eyes,xx+3,0,mood==='surprised'?11:8,C.ink);
 line(g,[[-31,-194],[-13,mood==='worried'?-187:-193]],C.hair,5);line(g,[[12,mood==='worried'?-187:-193],[31,-194]],C.hair,5);line(g,[[3,-167],[-1,-153],[6,-153]],'#b7805b',3);
 if(mood==='surprised')box(g,1,-136,17,23,C.ink,8);else if(mood==='happy')g.add(new Path({data:'M -17 -141 Q 0 -121 18 -141',stroke:C.ink,lineWidth:4,lineCap:'round'}));else line(g,[[-13,-137],[14,-137]],C.ink,4);
 const raise=()=>ramp(t(),1.1,1);
 const left=()=>pose==='shrug'?[-111,-80-35*raise()]:[-94,24];
 const right=()=>pose==='point'?[135,-42-50*raise()]:pose==='shrug'?[111,-80-35*raise()]:pose==='cup'?[87,-72-40*ramp(t(),2,1.2)]:pose==='paper'?[88,-46]:[79,-74];
 line(g,()=>[[-46,-89],[-81,pose==='shrug'?-42:-28],left()],C.teal,23);const lhand=disk(g,0,0,25,C.skin);lhand.position(()=>left() as [number,number]);
 line(g,()=>[[46,-89],[pose==='point'?92:96,pose==='point'?-62:-20],right()],C.teal,23);const hand=new Node({});g.add(hand);hand.position(()=>right() as [number,number]);disk(hand,0,0,26,C.skin);
 if(pose==='phone'){const ph=new Node({x:-10,y:-43,rotation:-7});hand.add(ph);const tiny=phone(ph,0,0,'',.18);box(tiny,0,10,250,280,C.lavender,18);polygon(tiny,[[-40,-65],[85,10],[-40,85]],C.teal);disk(hand,0,-2,24,C.skin);}
 if(pose==='cup'){mug(hand,5,-13,.5);disk(hand,-6,0,20,C.skin);}
 if(pose==='paper'){const paper=box(hand,0,-60,80,116,C.white,4,C.line);for(let j=0;j<4;j++)line(paper,[[-24,-35+j*18],[24,-35+j*18]],C.line,4);disk(hand,-14,-7,19,C.skin);}

 return g;
}
export function phone(p:Node,x:number,y:number,label='',scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,330,570,C.deep,43);box(g,0,0,306,540,C.white,33);box(g,0,-248,100,17,C.deep,10);box(g,0,249,95,7,C.deep,4);text(g,label,0,-190,30,C.ink);return g;}
export function mug(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);const h=new Circle({x:50,y:-5,size:57,stroke:C.ink,lineWidth:10});g.add(h);box(g,0,0,90,95,C.gold,16,C.ink);box(g,0,-42,80,12,'#735346',8);return g;}
export function laptop(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,640,390,C.ink,24);const screen=box(g,0,-8,605,343,C.white,12);polygon(g,[[-320,193],[320,193],[390,239],[-390,239]],'#a5b6ba');box(g,0,224,120,10,C.muted,4);return {g,screen};}
export function room(p:Node,night=false){box(p,0,0,2200,1300,night?C.navy:C.paper,0);box(p,-550,-170,450,390,night?C.deep:'#c8dee4',10);for(const x of [-550])line(p,[[x,-363],[x,25]],night?C.wall:C.white,8);line(p,[[-773,-170],[-325,-170]],night?C.wall:C.white,8);box(p,0,445,2200,310,night?'#333855':'#d8ccb8',0);line(p,[[-1100,290],[1100,290]],night?C.wall:'#c5b79f',4);}
export function door(p:Node,x:number,y:number,label:string,color=C.teal,width=270){const g=new Node({x,y});p.add(g);box(g,0,0,width+32,436,C.ink,12);box(g,0,7,width,405,color,4);box(g,0,-155,width-24,68,C.white,8);text(g,label,0,-155,label.length>12?19:25,C.ink);disk(g,width/2-30,33,14,C.gold);line(g,[[-width/2,214],[width/2,214]],C.ink,7);return g;}
export function receipt(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,470,560,C.white,8,C.line);text(g,'YOUR RECEIPT',0,-220,31,C.ink);text(g,'FRAME / DOCUMENTARIES',0,-158,21,C.teal);line(g,[[-190,-120],[190,-120]],C.line,3);text(g,'Billed by: Example Store',0,-61,25,C.ink);text(g,'Account: alex@example.test',0,0,23,C.muted);text(g,'$19.99 / month',0,89,39,C.ink);text(g,'Manage subscription →',0,200,24,C.teal);return g;}
export function check(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);disk(g,0,0,100,C.mint);line(g,[[-24,0],[-5,19],[29,-23]],C.teal,9);return g;}
