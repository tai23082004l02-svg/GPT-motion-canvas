import {Node,Rect,Circle,Line,Path,Txt,Img} from '@motion-canvas/2d';
export const C={paper:'#fbf6e9',ink:'#302b29',brown:'#75533c',wood:'#976b46',teal:'#638e86',red:'#b86650',gold:'#d6a55b',blue:'#b8dce7',snow:'#f4f7ed',white:'#fffef6',muted:'#766c60',orange:'#ee8b3d',green:'#84965c'};
export const font='"Times New Roman", "Liberation Serif", serif';
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ramp=(t:number,a=0,b=1)=>{const x=clamp((t-a)/b);return x*x*(3-2*x)};
export function box(p:Node,x:number,y:number,w:number,h:number,fill=C.paper,radius=0,stroke?:string){const n=new Rect({x,y,width:w,height:h,fill,radius,stroke,lineWidth:stroke?4:0});p.add(n);return n}
export function disk(p:Node,x:number,y:number,size:number,fill=C.ink,stroke?:string){const n=new Circle({x,y,size,fill,stroke,lineWidth:stroke?4:0});p.add(n);return n}
export function line(p:Node,points:any,stroke=C.ink,width=6,arrow=false){const n=new Line({points,stroke,lineWidth:width,lineCap:'round',lineJoin:'round',endArrow:arrow,arrowSize:19});p.add(n);return n}
export function poly(p:Node,points:any,fill=C.teal,stroke=C.ink,width=4){const n=new Line({points,closed:true,fill,stroke,lineWidth:width,lineJoin:'round'});p.add(n);return n}
export function text(p:Node,s:string,x:number,y:number,size=42,fill=C.ink,weight=600){const n=new Txt({text:s,x,y,fontFamily:font,fontSize:size,fill,fontWeight:weight,textAlign:'center'});p.add(n);return n}
export function card(p:Node,s:string,x:number,y:number,width=470,color=C.paper,size=34){const g=new Node({x,y});p.add(g);box(g,0,0,width,82,color,12,C.ink);text(g,s,0,-2,size);return g}
export function bubble(p:Node,s:string,x:number,y:number,width=370){const g=card(p,s,x,y,width,C.white,31);poly(g,[[-30,40],[-54,69],[10,40]],C.white);return g}
export function background(p:Node,name:'village'|'hall'|'pantry',night=false){const n=new Img({src:import.meta.env.BASE_URL+`images/winter/${name}.webp`,width:1920,height:1080});p.add(n);if(night)box(p,0,0,1920,1080,'#15223891');return n}
export function page(p:Node){box(p,0,0,2200,1300,C.paper);for(let i=0;i<17;i++)line(p,[[-950+i*120,-540],[-950+i*120,540]],'#80623a05',1)}
export type Person={g:Node;head:Node;hand:Node;left:Node};
/** One stable head/body coordinate system; gestures affect connected arms only. */
export function person(p:Node,x:number,y:number,t:()=>number,who='will',pose='stand',mood='neutral',scale=1):Person{
 const g=new Node({x,y,scale});p.add(g);const child=who==='kit',woman=who==='joan',color=child?C.red:woman?C.teal:C.gold;
 const seated=['sit','sew','sleep'].includes(pose),walking=pose==='walk'||pose==='carryWalk';
 const stride=(s:number)=>walking?Math.sin(t()*5.2)*s*29:0;
 disk(g,0,188,190,'#302b2915').height(17);
 for(const s of [-1,1]){
  line(g,()=>seated?[[s*24,44],[s*70,95],[s*70,168]]:[[s*23,43],[s*26+stride(s)*.5,106],[s*40+stride(s),171-Math.max(0,stride(s))*.2]],C.ink,9);
  const shoe=box(g,s*49,177,55,16,C.brown,8,C.ink);shoe.x(()=>seated?s*77:s*49+stride(s));shoe.y(()=>177-(walking?Math.max(0,stride(s))*.2:0));
 }
 if(woman)poly(g,[[-42,-105],[43,-105],[64,103],[-63,103]],color);else poly(g,[[-48,-105],[48,-105],[55,59],[-55,59]],color);
 line(g,[[-48,19],[49,19]],C.brown,10);disk(g,0,19,15,C.gold,C.ink);line(g,[[0,-123],[0,-105]],C.ink,9);
 const raise=()=>ramp(t(),1,1.2),wave=()=>Math.sin(t()*2)*10*(1-ramp(t(),4,1));
 const wrist=(s:number):[number,number]=>{
  if(pose==='cold')return [s*23,-54];
  if(pose==='point')return s===1?[153,-147+12*(1-raise())]:[-84,40];
  if(pose==='shrug'||pose==='wave')return [s*114,-81-32*raise()+(pose==='wave'?wave():0)];
  if(['carry','carryWalk','bowl'].includes(pose))return [s*50,-24];
  if(pose==='stir')return s===-1?[-155+Math.sin(t()*2.2)*12,-90]:[84,22];
  if(pose==='sew')return [s*42,-8+(s===1?Math.sin(t()*3)*9:0)];
  if(seated)return [s*70,43];
  return [s*89+(walking?Math.sin(t()*5.2)*s*12:0),36];
 };
 const hands:Node[]=[];
 for(const s of [-1,1]){
  const elbow=():[number,number]=>{const w=wrist(s);return [s*(pose==='cold'?70:80),(w[1]-81)*.45+12]};
  line(g,()=>[[s*43,-90],elbow(),wrist(s)],C.ink,8);line(g,()=>[[s*43,-90],elbow()],color,18);
  const hand=new Node({position:()=>wrist(s)});g.add(hand);disk(hand,0,0,17,C.white,C.ink);hands.push(hand);
 }
 const head=new Node({y:-184});g.add(head);disk(head,0,0,133,C.white,C.ink);
 if(woman){head.add(new Path({data:'M -67 4 Q -81 -89 -4 -81 Q 70 -81 69 16 L 47 -37 Q 5 -55 -45 -33 L -57 25 Z',fill:'#e9dfc7',stroke:C.ink,lineWidth:4}));line(head,[[-54,38],[-76,73]],C.ink,4);line(head,[[51,40],[70,73]],C.ink,4)}
 else if(child){head.add(new Path({data:'M -62 -25 L -70 -54 L -39 -45 L -30 -77 L -8 -55 L 15 -77 L 30 -50 L 58 -62 L 65 -26 Q 31 -42 0 -35 Q -30 -46 -62 -25 Z',fill:C.brown,stroke:C.ink,lineWidth:3}));}
 else{head.add(new Path({data:'M -73 -28 Q -64 -68 -20 -85 Q 34 -99 60 -48 L 74 -28 Z',fill:C.gold,stroke:C.ink,lineWidth:4}));line(head,[[-77,-28],[76,-28]],C.ink,5)}
 const eyes=new Node({y:0,scaleY:()=>Math.abs(Math.sin(t()*.67+.7))<.025?.12:1});head.add(eyes);
 if(pose==='sleep'){line(eyes,[[-29,0],[-13,0]],C.ink,4);line(eyes,[[12,0],[28,0]],C.ink,4)}
 else{disk(eyes,-22,0,mood==='surprise'?11:8,C.ink);disk(eyes,22,0,mood==='surprise'?11:8,C.ink)}
 if(mood==='worried'||mood==='cold'){line(head,[[-32,-18],[-14,-12]],C.ink,4);line(head,[[14,-12],[32,-18]],C.ink,4)}
 if(mood==='surprise')disk(head,0,29,20,C.ink);else head.add(new Path({data:mood==='happy'?'M -18 22 Q 0 43 18 22':mood==='worried'||mood==='cold'?'M -15 31 Q 0 17 15 31':'M -12 28 Q 0 33 12 28',stroke:C.ink,lineWidth:4,lineCap:'round'}));
 return {g,head,hand:hands[1],left:hands[0]};
}
export function logs(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);for(const [xx,yy,r] of [[-42,8,-12],[5,20,7],[43,-7,17]] as number[][]){const l=box(g,xx,yy,127,28,C.wood,10,C.ink);l.rotation(r);line(l,[[-45,-3],[43,1]],'#bd9763',3)}return g}
export function fire(p:Node,x:number,y:number,t:()=>number,scale=1,smoke=true){const g=new Node({x,y,scale});p.add(g);disk(g,0,39,300,'#f4aa4530').height(65);logs(g,0,12,.85);
 const glow=disk(g,0,-40,300,'#ed9d3112');glow.height(240);glow.scale(()=>1+Math.sin(t()*3)*.04);
 const flame=new Path({data:'M -66 4 Q -90 -46 -38 -90 Q -27 -46 -5 -137 Q 56 -88 41 -53 Q 77 -75 75 -21 Q 78 27 7 27 Q -41 32 -66 4 Z',fill:C.orange,stroke:C.ink,lineWidth:4,y:-13,scaleY:()=>.96+Math.sin(t()*6)*.07});g.add(flame);
 const inner=new Path({data:'M -30 7 Q -41 -15 -4 -66 Q 4 -30 23 -39 Q 61 17 4 25 Q -13 23 -30 7 Z',fill:'#f5cd68',y:-13,scaleY:()=>.93+Math.sin(t()*7+1)*.1});g.add(inner);
 if(smoke)for(let i=0;i<4;i++){const q=()=>((t()*.16+i*.25)%1);const n=disk(g,0,0,65,'#413a3440');n.position(()=>[Math.sin(q()*5+i)*32,-150-q()*310]);n.scale(()=>.5+q()*1.4);n.opacity(()=>(1-q())*.5)}
 return g;
}
export function snow(p:Node,t:()=>number){for(let i=0;i<30;i++){const n=disk(p,0,0,4+(i%3)*2,'#fffef5');n.position(()=>[((i*187+t()*17)%2080)-1040,((i*83+t()*44)%1250)-625]);n.opacity(.65)}}
export function wind(p:Node,t:()=>number){for(let i=0;i<4;i++){const n=new Path({data:'M -180 0 Q -55 -37 45 0 Q 128 26 160 -18',stroke:'#8bafb7',lineWidth:4,opacity:.6,y:-50+i*130});p.add(n);n.x(()=>((t()*110+i*670)%2800)-1400)}}
export function bowl(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);g.add(new Path({data:'M -62 -14 Q -62 56 0 57 Q 62 56 62 -14 Z',fill:C.brown,stroke:C.ink,lineWidth:4}));disk(g,0,-13,124,C.gold,C.ink).height(28);return g}
export function pot(p:Node,x:number,y:number,t:()=>number,scale=1){const g=new Node({x,y,scale});p.add(g);const h=disk(g,0,-28,171,'#ffffff00',C.ink);h.height(160);g.add(new Path({data:'M -85 -28 Q -107 85 -44 96 L 44 96 Q 107 85 85 -28 Z',fill:'#54514b',stroke:C.ink,lineWidth:5}));disk(g,0,-28,170,'#b5a779',C.ink).height(36);
 for(let i=0;i<3;i++){const steam=new Path({data:'M 0 0 Q -22 -24 0 -45 Q 20 -66 0 -83',stroke:'#fff8e8',lineWidth:6,x:-39+i*39,y:-67});g.add(steam);steam.opacity(()=>.25+.4*(.5+.5*Math.sin(t()*1.6+i)))}return g}
export function sack(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);g.add(new Path({data:'M -26 -65 L 24 -65 L 17 -40 Q 72 -2 65 66 Q 0 89 -65 66 Q -73 -2 -17 -40 Z',fill:'#c5ab78',stroke:C.ink,lineWidth:4}));line(g,[[-29,-43],[31,-43]],C.brown,6);for(let i=0;i<8;i++)disk(g,(i%4-1.5)*19,10+Math.floor(i/4)*22,9,C.gold);return g}
export function bread(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);g.add(new Path({data:'M -80 23 Q -95 -48 -13 -53 Q 63 -70 86 -10 L 80 24 Z',fill:'#c79551',stroke:C.ink,lineWidth:4}));for(let i=0;i<3;i++)line(g,[[-43+i*40,-23],[-30+i*40,-42]],'#f0d4a1',7);return g}
export function fish(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);poly(g,[[54,0],[98,-35],[98,35]],'#8d9e99');disk(g,0,0,146,'#a8b7aa',C.ink).height(71);disk(g,-45,-6,8,C.ink);line(g,[[-20,-29],[-10,0],[-20,29]],C.ink,3);return g}
export function shutter(p:Node,x:number,y:number,t:()=>number){const g=new Node({x,y});p.add(g);box(g,0,0,350,330,C.brown,7,C.ink);box(g,0,0,315,294,C.blue);for(let i=0;i<2;i++){const n=box(g,i===0?-152:152,0,154,294,C.wood,0,C.ink);n.x(()=>i===0?-152+75*ramp(t(),2,2):152-75*ramp(t(),2,2));for(let j=0;j<3;j++)line(n,[[-50+j*50,-140],[-50+j*50,140]],C.brown,3);line(n,[[-68,-75],[68,-75]],C.ink,6);line(n,[[-68,75],[68,75]],C.ink,6)}return g}
export function candle(p:Node,x:number,y:number,t:()=>number,rush=false,scale=1){const g=new Node({x,y,scale});p.add(g);disk(g,0,-80,260,'#f6cb5c18');if(rush){line(g,[[0,76],[0,-94]],C.brown,9);line(g,[[-25,3],[15,-12]],C.ink,8)}else{box(g,0,-21,48,145,'#c0ac79',6,C.ink);line(g,[[0,-94],[0,-108]],C.ink,4)}disk(g,0,-119,31,'#f1a443').height(53);const fl=disk(g,0,-124,12,'#ffe7a0');fl.scale.y(()=>1+Math.sin(t()*7)*.12);box(g,0,80,95,12,C.ink,4);return g}
export function bed(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);// A portable mattress on the floor.
box(g,0,-3,560,83,'#c5b995',29,C.ink);box(g,-187,-30,135,58,C.white,22,C.ink);box(g,51,-11,397,100,C.teal,15,C.ink);for(let i=0;i<7;i++)line(g,[[-116+i*50,-49],[-101+i*50,28]],'#8ca89a',3);return g}
export function chicken(p:Node,x:number,y:number,t:()=>number,scale=1){const g=new Node({x,y,scale});p.add(g);disk(g,0,0,78,C.white,C.ink).height(59);disk(g,35,-31,38,C.white,C.ink);poly(g,[[52,-34],[72,-25],[53,-19]],C.gold);disk(g,40,-36,6,C.ink);poly(g,[[20,-49],[24,-65],[34,-56],[43,-66],[47,-48]],C.red);poly(g,[[-33,-11],[-66,-37],[-52,5]],C.brown);for(const s of [-1,1])line(g,[[s*13,27],[s*13+Math.sin(t()*4+s)*3,49],[s*13+15,49]],C.ink,4);return g}
export function table(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);for(const xx of [-220,220])line(g,[[xx,6],[xx,160]],C.brown,24);box(g,0,0,550,39,C.wood,6,C.ink);return g}
export function crossed(p:Node,x:number,y:number,size=55){line(p,[[x-size,y-size],[x+size,y+size]],C.red,12);line(p,[[x-size,y+size],[x+size,y-size]],C.red,12)}
