import {makeScene2D,Rect,Txt,Line,Circle,Node} from '@motion-canvas/2d';
import {all,createRef,createSignal,easeInOutCubic,easeOutCubic,tween,waitFor} from '@motion-canvas/core';
import cues from '../cues.json';
const C={bg:'#0b1220',panel:'#142136',line:'#263951',ink:'#f4f6fa',muted:'#9aacc3',mint:'#57e0b5',orange:'#ffb06b',red:'#ff7583',blue:'#83b8ff'};
const font='DejaVu Sans';
export default makeScene2D(function*(view){
 view.fill(C.bg);
 // Quiet grid, shared across the film.
 for(let x=-900;x<=900;x+=120)view.add(<Line points={[[x,-540],[x,540]]} stroke={'#172338'} lineWidth={1} opacity={0.38}/>);
 for(let y=-500;y<540;y+=120)view.add(<Line points={[[-960,y],[960,y]]} stroke={'#172338'} lineWidth={1} opacity={0.38}/>);
 view.add(<Txt text={'THE MATH BEHIND EVERYDAY LIFE'} x={-880} y={-477} offsetX={-1} fontFamily={font} fontSize={20} fontWeight={600} letterSpacing={3} fill={C.muted}/>);
 view.add(<Txt text={'MONEY / 001'} x={880} y={-477} offsetX={1} fontFamily={font} fontSize={20} fill={C.mint}/>);
 const total=createSignal(0);
 view.add(<Rect x={-960} y={535} offsetX={-1} width={()=>1920*total()} height={10} fill={C.mint}/>);
 function text(parent:Node,s:string,x:number,y:number,size=40,color=C.ink,weight=600){const n=new Txt({text:s,x,y,fontFamily:font,fontSize:size,fill:color,fontWeight:weight,textAlign:'center'});parent.add(n);return n;}
 function box(parent:Node,x:number,y:number,w:number,h:number,color=C.panel){const n=new Rect({x,y,width:w,height:h,radius:28,fill:color,stroke:C.line,lineWidth:2});parent.add(n);return n;}
 function arrow(parent:Node,x1:number,y1:number,x2:number,y2:number,col=C.muted){parent.add(new Line({points:[[x1,y1],[x2,y2]],stroke:col,lineWidth:5,endArrow:true,arrowSize:15}));}
 for(let i=0;i<cues.length;i++){
  const c:any=cues[i],dur=c.end-c.start,p=createSignal(0),root=new Node({opacity:0,y:24});
  view.add(root);
  text(root,c.chapter.toUpperCase(),0,-390,22,C.mint,600);
  text(root,c.title,0,-315,c.title.length>38?49:58);
  const graphic=new Node({y:25});root.add(graphic);
  const accent=c.accent==='orange'?C.orange:C.mint;
  if(c.type==='phone'){
   const phone=box(graphic,-420,0,390,475);box(phone,0,-187,110,12,C.line);
   text(phone,'CURRENT BALANCE',0,-125,17,C.muted);text(phone,c.a,0,-45,62,C.ink);
   const badge=box(phone,0,70,300,67,'#1d3a3a');text(badge,c.b,0,0,22,C.mint);
   text(phone,'••••  4821',0,173,20,C.muted);
   text(graphic,c.big,280,-45,90,accent);text(graphic,c.label,280,57,30,C.muted);
   if(c.note)text(graphic,c.note,280,125,24,C.orange);
   arrow(graphic,-165,0,-20,0);
  }else if(c.type==='equation'){
   c.items.forEach((item:any,j:number)=>{const x=(j-(c.items.length-1)/2)*470;
    const b=box(graphic,x,0,410,255);text(b,item.value,0,-25,70,item.color==='orange'?C.orange:item.color==='mint'?C.mint:C.ink);text(b,item.label,0,65,23,C.muted);
    if(j<c.items.length-1)text(graphic,c.ops?.[j]||'→',x+235,0,48,C.muted);
   });
   if(c.note)text(graphic,c.note,0,207,28,C.muted);
  }else if(c.type==='split'){
   text(graphic,c.big,0,-145,86,C.ink);text(graphic,c.label,0,-220,25,C.muted);
   const w=1260;
   box(graphic,0,10,w,120);
   const a=new Rect({x:-w/2,y:10,offsetX:-1,width:()=>w*.5*p(),height:120,radius:16,fill:C.orange});graphic.add(a);
   const b=new Rect({x:0,y:10,offsetX:-1,width:()=>w*.5*p(),height:120,radius:16,fill:C.mint});graphic.add(b);
   text(graphic,c.a,-315,120,47,C.orange);text(graphic,c.b,315,120,47,C.mint);
   text(graphic,c.left,-315,178,25,C.muted);text(graphic,c.right,315,178,25,C.muted);
  }else if(c.type==='bars'){
   const vals=c.items.map((x:any)=>x.n),max=Math.max(...vals)*1.08;
   c.items.forEach((v:any,j:number)=>{const y=-135+j*130;
    text(graphic,v.label,-650,y,27,C.muted);box(graphic,170,y,1000,72);
    graphic.add(new Rect({x:-330,y,offsetX:-1,width:()=>1000*(v.n/max)*p(),height:72,radius:12,fill:v.color==='orange'?C.orange:C.mint}));
    text(graphic,v.value,760,y,38,C.ink);
   });
   if(c.note)text(graphic,c.note,0,245,25,C.muted);
  }else if(c.type==='flow'){
   c.items.forEach((v:any,j:number)=>{let x=(j-(c.items.length-1)/2)*480;let b=box(graphic,x,0,405,280);text(b,String(j+1).padStart(2,'0'),0,-92,24,C.mint);text(b,v.value,0,-5,57,v.color==='orange'?C.orange:C.ink);text(b,v.label,0,80,24,C.muted);if(j<c.items.length-1)arrow(graphic,x+210,0,x+260,0);});
   if(c.note)text(graphic,c.note,0,230,27,C.muted);
  }else if(c.type==='steps'){
   const steps=[120,108,96,83,69,54,40,28];let xx=-680;
   steps.forEach((w,j)=>{const yy=190-j*45;graphic.add(new Rect({x:xx+w/2,y:yy,width:w,height:14,radius:5,fill:j<5?C.mint:C.orange}));xx+=w+24;});
   const runner=new Circle({x:()=>-620+p()*850,y:()=>140-p()*315,size:32,fill:C.ink});graphic.add(runner);
   text(graphic,c.big,500,-140,64,C.orange);text(graphic,c.label,500,-65,27,C.muted);text(graphic,c.note,0,280,25,C.muted);
  }else if(c.type==='statement'){
   const b=box(graphic,0,0,1180,440,'#edf2f5');
   text(b,'CREDIT CARD STATEMENT',0,-158,28,'#152538');
   b.add(new Line({points:[[-520,-110],[520,-110]],stroke:'#c6cfd9',lineWidth:2}));
   text(b,c.a,0,-55,39,'#152538');text(b,c.b,0,35,31,'#a25c24');text(b,c.note,0,133,26,'#42546a');
  }else if(c.type==='compare'){
   [c.left,c.right].forEach((v:any,j)=>{const b=box(graphic,j?375:-375,0,680,405);text(b,v.label,0,-137,26,C.muted);text(b,v.big,0,-35,81,j?C.mint:C.orange);text(b,v.note,0,80,28,C.ink);if(v.sub)text(b,v.sub,0,137,22,C.muted);});
  }else if(c.type==='cycle'){
   const positions=[[-470,-100],[0,-100],[470,-100],[0,180]];
   c.items.forEach((v:any,j)=>{const [x,y]=positions[j];const b=box(graphic,x,y,385,170);text(b,v.value,0,-22,46,j===2?C.orange:C.mint);text(b,v.label,0,40,22,C.muted);});
   arrow(graphic,-265,-100,-208,-100);arrow(graphic,205,-100,265,-100);arrow(graphic,470,0,200,150,C.orange);arrow(graphic,-200,150,-470,0,C.orange);
  }else if(c.type==='exit'){
   const door=box(graphic,535,-5,205,360,'#173a37');text(door,'EXIT',0,-95,37,C.mint);door.add(new Circle({x:65,y:30,size:12,fill:C.mint}));
   graphic.add(new Line({points:[[-700,180],[650,180]],stroke:C.line,lineWidth:4}));
   graphic.add(new Line({points:()=>[[-650,178],[-650+p()*1050,178]],stroke:C.mint,lineWidth:9,endArrow:true}));
   text(graphic,c.big,-230,-80,70,C.ink);text(graphic,c.label,-230,25,31,C.mint);
  }else{
   text(graphic,c.big||'',0,-35,c.big?.length>24?65:100,accent);
   if(c.label)text(graphic,c.label,0,100,34,C.muted);
   if(c.note)text(graphic,c.note,0,193,26,C.muted);
  }
  const foot=c.footer||'ILLUSTRATIVE EXAMPLES • TERMS VARY BY CARD';
  text(root,foot,0,442,19,C.muted,400);
  yield* all(root.opacity(1,.35),root.y(0,.5,easeOutCubic));
  yield* tween(Math.max(.1,dur-.8),v=>{p(easeInOutCubic(Math.min(1,v*2.2)));total((c.start+v*dur)/471.725)});
  yield* root.opacity(0,.3);
  root.remove();
 }
});
