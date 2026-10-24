import {Node,Path,Img} from '@motion-canvas/2d';
import {C,box,disk,line,poly,text,card,bubble,page,ramp,clamp} from '../winter/art';
export {C,box,disk,line,poly,text,card,bubble,page,ramp,clamp};
export function actor(p:Node,x:number,y:number,t:()=>number,who='trump',pose='stand',mood='neutral',scale=1){
 const g=new Node({x,y,scale});p.add(g);const trump=who==='trump',child=who==='child',woman=who==='assistant';const suit=trump?'#354b67':woman?'#638e86':'#888c91';
 disk(g,0,186,180,'#302b2917').height(17);
 const walking=pose==='walk';const stride=(s:number)=>walking?Math.sin(t()*5)*s*25:0;
 for(const s of [-1,1]){line(g,()=>[[s*22,42],[s*28+stride(s)*.4,112],[s*39+stride(s),172]],C.ink,9);const sh=box(g,s*48,179,57,17,C.brown,8,C.ink);sh.x(()=>s*48+stride(s));}
 poly(g,[[-47,-105],[47,-105],[57,62],[-57,62]],child?C.gold:suit);poly(g,[[-24,-104],[24,-104],[0,-6]],C.white);
 if(!child){poly(g,[[-6,-91],[6,-91],[13,-20],[0,-3],[-13,-20]],trump?C.red:C.gold);line(g,[[-28,-100],[-4,-33],[-28,-7]],'#1f3542',3);line(g,[[28,-100],[4,-33],[28,-7]],'#1f3542',3)}
 line(g,[[0,-105],[0,-122]],C.ink,8);
 const wrists=(s:number):[number,number]=>{
  const gest=ramp(t(),.5,1);
  if(pose==='point')return s===1?[145,-105-25*gest]:[-86,22];
  if(pose==='shrug')return [s*111,-77-28*gest];
  if(pose==='carry')return [s*45,-31];
  if(pose==='talk')return s===1?[110,-60-15*Math.sin(t()*1.8)]:[-87,25];
  if(pose==='arms')return [s*20,-46];
  return [s*90+(walking?Math.sin(t()*5)*s*10:0),30];
 };
 for(const s of [-1,1]){const e=()=>[s*80,wrists(s)[1]*.42-10] as [number,number];line(g,()=>[[s*43,-87],e(),wrists(s)],C.ink,8);line(g,()=>[[s*43,-87],e()],child?C.gold:suit,17);const h=disk(g,0,0,17,C.white,C.ink);h.position(()=>wrists(s))}
 const head=new Node({y:-187});g.add(head);disk(head,0,0,135,C.white,C.ink);
 if(trump||child){head.add(new Path({data:'M -64 -26 Q -83 -63 -39 -74 Q -1 -99 52 -65 Q 77 -55 67 -28 Q 26 -48 -35 -27 L 6 -59 Q -34 -47 -64 -26 Z',fill:'#e5c36a',stroke:C.ink,lineWidth:4}));line(head,[[-31,-54],[16,-69]],'#b58e40',3)}
 else if(woman)head.add(new Path({data:'M -66 18 Q -85 -83 -7 -80 Q 72 -86 68 26 L 47 7 L 39 -32 Q -8 -22 -39 -46 L -48 19 Z',fill:C.brown,stroke:C.ink,lineWidth:3}));
 else head.add(new Path({data:'M -63 -20 Q -72 -75 -11 -73 Q 51 -82 66 -25 L 44 -35 Q 0 -22 -35 -45 L -49 -15 Z',fill:C.ink}));
 const eyes=new Node({scaleY:()=>Math.abs(Math.sin(t()*.8+.9))<.025?.12:1});head.add(eyes);disk(eyes,-22,0,mood==='surprise'?12:8,C.ink);disk(eyes,22,0,mood==='surprise'?12:8,C.ink);
 if(mood==='worried'){line(head,[[-34,-20],[-13,-12]],C.ink,4);line(head,[[13,-12],[34,-20]],C.ink,4)}else if(trump){line(head,[[-34,-17],[-13,-21]],C.ink,4);line(head,[[13,-21],[34,-17]],C.ink,4)}
 if(mood==='surprise')disk(head,0,29,19,C.ink);else head.add(new Path({data:mood==='happy'?'M -19 22 Q 0 44 19 22':mood==='worried'?'M -17 31 Q 0 17 17 31':'M -13 28 Q 0 33 13 28',stroke:C.ink,lineWidth:4,lineCap:'round'}));
 return g;
}
export function env(p:Node,type='office',night=false){
 if(type==='construction'||type==='courtyard'){p.add(new Img({src:import.meta.env.BASE_URL+`images/china/${type}.webp`,width:1920,height:1080}));return}
 if(type==='page'){page(p);return}
 const studio=type==='studio',hall=type==='hall';box(p,0,0,2200,1300,studio?'#34445b':hall?'#e7d7bb':'#ede7da');
 if(studio){for(let i=0;i<5;i++)box(p,-800+i*400,-30,18,760,'#687a8b');box(p,0,375,2200,330,'#28323f');for(const s of [-1,1]){line(p,[[s*800,300],[s*800,-290]],C.ink,13);box(p,s*800,-300,150,95,C.gold,12,C.ink)}}
 else{box(p,0,390,2200,320,'#c8b594');line(p,[[-1000,230],[1000,230]],C.brown,5);if(hall){for(let i=0;i<4;i++)box(p,-720+i*480,-65,70,550,'#d7c8af',0,C.brown)}else{box(p,-560,-100,570,390,C.blue,5,C.brown);for(let i=0;i<6;i++)box(p,-790+i*92,40-(i%3)*22,65,160+(i%3)*40,'#91a9b0',0);line(p,[[-560,-293],[-560,92]],C.brown,8);line(p,[[-840,-100],[-278,-100]],C.brown,7);box(p,630,-10,290,450,'#b59978',2,C.ink);for(const yy of [-110,45,190])line(p,[[490,yy],[770,yy]],C.brown,5);for(let i=0;i<7;i++)box(p,525+i*30,-170,19,105,i%2?C.teal:C.red,1);}}
}
export function tower(p:Node,x:number,y:number,scale=1,finished=true){const g=new Node({x,y,scale});p.add(g);box(g,0,200,330,38,C.brown,3,C.ink);box(g,0,-15,265,390,finished?'#a9c4c5':'#c2b9a6',4,C.ink);for(let j=0;j<6;j++)for(let i=0;i<3;i++)box(g,-80+i*80,-155+j*58,43,35,finished?'#eaf1e3':'#747a79',2,C.ink);box(g,0,175,48,85,C.ink,2);box(g,0,-238,380,62,C.gold,4,C.ink);text(g,'TRUMP',0,-239,39);return g}
export function desk(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);for(const xx of [-280,280])line(g,[[xx,0],[xx,180]],C.brown,25);box(g,0,0,680,44,C.wood,6,C.ink);return g}
export function folder(p:Node,x:number,y:number,title='PLAN',scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,350,260,'#dfc183',8,C.ink);box(g,-65,-140,170,35,'#dfc183',4,C.ink);text(g,title,0,-30,35);for(let i=0;i<3;i++)line(g,[[-105,35+i*35],[105,35+i*35]],'#a18157',4);return g}
export function suitcase(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,-90,95,65,'#ffffff00',12,C.ink);box(g,0,0,290,180,C.brown,20,C.ink);for(const xx of [-80,80])line(g,[[xx,-85],[xx,85]],C.gold,12);return g}
export function tv(p:Node,x:number,y:number,scale=1,modern=false){const g=new Node({x,y,scale});p.add(g);box(g,0,0,modern?590:550,350,C.brown,modern?8:35,C.ink);box(g,-25,0,450,280,'#bbd3d3',25,C.ink);if(!modern){disk(g,240,-60,29,C.gold,C.ink);disk(g,240,15,29,C.gold,C.ink);line(g,[[-70,-175],[-160,-240]],C.ink,8);line(g,[[-70,-175],[50,-240]],C.ink,8)}for(const xx of [-175,175])line(g,[[xx,177],[xx,225]],C.ink,16);return g}
export function phone(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,210,360,C.ink,25);box(g,0,-4,180,310,C.blue,14);disk(g,0,158,13,C.paper);box(g,0,-145,65,9,C.ink,3);return g}
export function podium(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);poly(g,[[-160,-95],[160,-95],[120,170],[-120,170]],C.wood);box(g,0,-100,390,37,C.brown,6,C.ink);line(g,[[55,-120],[55,-200],[90,-216]],C.ink,8);disk(g,95,-216,25,C.ink);return g}
export function board(p:Node,x:number,y:number,title:string,body:string,width=840){const g=new Node({x,y});p.add(g);box(g,0,0,width,480,C.paper,14,C.ink);text(g,title,0,-165,47);text(g,body,0,20,39);return g}
export function icon(p:Node,type:string,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);if(type==='money'){box(g,0,0,160,95,C.green,5,C.ink);disk(g,0,0,59,C.paper,C.ink);text(g,'$',0,-2,42)}else if(type==='people'){for(const xx of [-45,45]){disk(g,xx,-20,57,C.white,C.ink);poly(g,[[xx-30,20],[xx+30,20],[xx+40,95],[xx-40,95]],C.teal)}}else if(type==='clock'){disk(g,0,0,135,C.white,C.ink);line(g,[[0,-45],[0,0],[38,22]],C.ink,7)}else if(type==='megaphone'){poly(g,[[-70,-30],[10,-30],[85,-75],[85,65],[10,25],[-70,25]],C.gold);line(g,[[-40,28],[-25,90]],C.ink,15)}else if(type==='question'){text(g,'?',0,0,180,C.red)}return g}
