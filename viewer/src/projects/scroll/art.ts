import {Node,Rect,Circle,Line,Path,Txt} from '@motion-canvas/2d';
export const C={paper:'#f5efe4',ink:'#24283c',muted:'#70768b',navy:'#20243d',deep:'#161b30',wall:'#333855',panel:'#404566',soft:'#d9d7e4',purple:'#a698d4',lavender:'#e1d9f0',mint:'#9ddac5',teal:'#198c83',coral:'#ec927d',gold:'#edc66b',skin:'#d9a17c',hair:'#25333d',white:'#fffaf1',line:'#c9c5d0'};
export const font='DejaVu Sans';
export function text(p:Node,s:string,x:number,y:number,size=34,color=C.ink,weight=600){const n=new Txt({text:s,x,y,fontFamily:font,fontSize:size,fill:color,fontWeight:weight,textAlign:'center'});p.add(n);return n;}
export function box(p:Node,x:number,y:number,w:number,h:number,color=C.white,radius=20,stroke?:string){const n=new Rect({x,y,width:w,height:h,fill:color,radius,stroke,lineWidth:stroke?3:0});p.add(n);return n;}
export function disk(p:Node,x:number,y:number,size:number,color=C.teal){const n=new Circle({x,y,size,fill:color});p.add(n);return n;}
export function line(p:Node,pts:any,color=C.ink,width=5,arrow=false){const n=new Line({points:pts,stroke:color,lineWidth:width,lineCap:'round',lineJoin:'round',endArrow:arrow,arrowSize:16});p.add(n);return n;}
export function polygon(p:Node,pts:any,color=C.teal){const n=new Line({points:pts,closed:true,fill:color,lineJoin:'round'});p.add(n);return n;}
export function pill(p:Node,s:string,x:number,y:number,w=320,color=C.gold,dark=false){const g=new Node({x,y});p.add(g);box(g,0,0,w,58,color,29);text(g,s,0,0,23,dark?C.white:C.ink);return g;}
export function talk(p:Node,s:string,x:number,y:number,w=370){const g=new Node({x,y});p.add(g);box(g,0,0,w,76,C.white,22,C.ink);polygon(g,[[-55,36],[-60,63],[-20,36]],C.white);text(g,s,0,0,25,C.ink);return g;}
export function clock(p:Node,x:number,y:number,s:string,night=true,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,320,100,night?'#11192b':C.ink,16);text(g,s,0,-2,43,C.gold);box(g,0,50,280,8,night?C.wall:C.line,3);return g;}
export function room(p:Node,t:()=>number,night=true,props=true){
 box(p,0,30,2100,900,night?C.wall:'#e9e3d9',0);
 box(p,-620,-80,430,320,night?C.deep:'#bed4dd',12,night?'#525a7a':C.line);
 if(night){disk(p,-475,-190,83,C.gold);disk(p,-449,-205,79,C.deep);[[-754,-194],[-620,-215],[-725,-74],[-460,-49]].forEach(([x,y])=>disk(p,x,y,5,C.soft));}
 line(p,[[-620,-230],[-620,76]],night?'#525a7a':C.line,8);line(p,[[-828,-72],[-412,-72]],night?'#525a7a':C.line,8);
 box(p,0,368,2100,180,night?'#252b43':'#d4c9b7',0);line(p,[[-1000,280],[1000,280]],night?'#48506b':'#bcb09c',4);
 // Reading lamp, deliberately separate from the character's silhouette.
 if(props){line(p,[[697,270],[697,-30]],night?'#bdc2c4':C.ink,13);disk(p,697,275,100,night?C.deep:'#6e746b');polygon(p,[[610,-135],[780,-135],[816,-19],[575,-19]],C.gold);disk(p,696,-18,25,C.white);
 box(p,445,212,195,27,night?'#a08576':'#a68a6f',7);line(p,[[378,226],[370,330]],C.ink,9);line(p,[[512,226],[523,330]],C.ink,9);}
}
export function couch(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,-75,530,230,'#696187',55);box(g,0,18,520,130,'#7b7298',34);box(g,-253,-20,85,180,'#8c82a6',30);box(g,253,-20,85,180,'#8c82a6',30);[-180,180].forEach(xx=>line(g,[[xx,76],[xx,116]],C.ink,16));line(g,[[0,-145],[0,47]],'#665c80',3);return g;}
export function bed(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,-85,600,220,'#5f6887',35);box(g,0,10,640,135,C.soft,25);box(g,70,20,500,130,'#8883aa',24);box(g,-190,-10,155,85,C.white,20);[-235,235].forEach(xx=>line(g,[[xx,75],[xx,121]],C.ink,17));return g;}
export function stand(p:Node,x:number,y:number,t:()=>number,mood='neutral',scale=1,holding=true,seated=false){
 const g=new Node({x,y,scale});p.add(g);
 // Everything shares one stable skeleton. Only eyelids and the connected thumb move.
 g.add(new Circle({x:0,y:175,width:210,height:24,fill:'#00000012'}));
 if(seated){
  line(g,[[-25,1],[-91,45],[-67,149]],C.ink,27);line(g,[[25,1],[91,45],[68,149]],C.ink,27);
  box(g,-57,155,63,25,C.white,10,C.ink);box(g,79,155,63,25,C.white,10,C.ink);
 }else{
  line(g,[[-25,3],[-32,77],[-37,150]],C.ink,27);line(g,[[25,3],[32,77],[37,150]],C.ink,27);
  box(g,-46,155,63,25,C.white,10,C.ink);box(g,48,155,63,25,C.white,10,C.ink);
 }
 box(g,0,-47,108,132,C.teal,27);polygon(g,[[-18,-110],[18,-110],[12,-25],[-12,-25]],C.white);
 line(g,[[-46,-89],[-80,-28],[-93,17]],C.teal,23);disk(g,-94,23,25,C.skin);
 if(holding){line(g,[[45,-89],[95,-18],[72,-67]],C.teal,23);disk(g,72,-67,26,C.skin);}
 else {line(g,[[45,-89],[80,-33],[90,19]],C.teal,23);disk(g,91,25,25,C.skin);}
 box(g,0,-117,31,39,C.skin,11);
 // Ears sit behind the head and stay attached to it.
 const head=new Node({});g.add(head);disk(head,-47,-171,18,C.skin);disk(head,47,-171,18,C.skin);box(head,0,-171,100,112,C.skin,41);
 head.add(new Path({data:'M -49 -169 Q -61 -235 -9 -234 Q 16 -251 47 -224 Q 65 -199 43 -179 L 33 -204 Q 0 -188 -35 -205 L -41 -169 Z',fill:C.hair}));
 const eyes=new Node({y:-171,scaleY:()=>Math.abs(Math.sin(t()*1.07+.5))<.045?.1:1});head.add(eyes);
 const eyeY=mood==='bored'?5:holding?3:0;[-19,19].forEach(xx=>{const eye=new Circle({x:xx+(holding?3:0),y:eyeY,width:9,height:mood==='bored'?5:mood==='surprised'?12:9,fill:C.ink});eyes.add(eye);});
 line(head,[[-31,-194],[-13,mood==='concerned'?-187:-193]],C.hair,5);line(head,[[12,mood==='concerned'?-187:-193],[31,-194]],C.hair,5);
 line(head,[[3,-167],[-1,-153],[6,-153]],'#b7805b',3);
 if(mood==='surprised')head.add(new Circle({x:1,y:-137,width:18,height:23,fill:C.ink}));
 else if(mood==='happy')head.add(new Path({data:'M -17 -141 Q 0 -121 18 -141',stroke:C.ink,lineWidth:4,lineCap:'round'}));
 else if(mood==='concerned')head.add(new Path({data:'M -16 -134 Q 0 -143 16 -134',stroke:C.ink,lineWidth:4,lineCap:'round'}));
 else line(head,[[-13,-137],[14,-137]],C.ink,4);
 if(holding){
  const phone=new Node({x:68,y:-111,rotation:-7});g.add(phone);box(phone,0,0,53,93,C.deep,10);box(phone,0,0,43,76,'#bba9e1',5);box(phone,0,-37,20,5,C.deep,3);box(phone,0,5,33,30,C.coral,4);box(phone,0,26,28,4,C.white,2);
  // A visible palm wraps the lower edge; the thumb is jointed to that palm.
  disk(g,78,-70,20,C.skin);const finger=line(g,()=>[[78,-70],[76,-85],[70,-101-Math.max(0,Math.sin(t()*3.1))*12]],C.skin,8);finger.opacity(mood==='surprised'?.8:1);
 }
 return g;
}
export function post(p:Node,x:number,y:number,w:number,h:number,index:number){const g=new Node({x,y});p.add(g);const cols=[C.coral,C.mint,C.gold,C.purple];box(g,0,0,w,h,cols[index%4],20);const shape=new Node({scale:Math.min(w/220,h/160)});g.add(shape);
 if(index%4===0){ // A deliberately original cartoon cat.
  polygon(shape,[[-49,-13],[-44,-59],[-15,-31]],C.ink);polygon(shape,[[49,-13],[44,-59],[15,-31]],C.ink);box(shape,0,0,106,84,C.ink,36);disk(shape,-20,-5,10,C.gold);disk(shape,20,-5,10,C.gold);polygon(shape,[[-6,15],[6,15],[0,22]],C.coral);line(shape,[[-6,27],[-22,30]],C.white,3);line(shape,[[6,27],[22,30]],C.white,3);
 }else if(index%4===1){ // A recipe / bowl, rather than a borrowed video still.
  shape.add(new Path({data:'M -65 -8 Q -60 56 0 56 Q 60 56 65 -8 Z',fill:C.white,stroke:C.ink,lineWidth:4}));line(shape,[[-65,-8],[65,-8]],C.ink,5);for(let j=0;j<3;j++)line(shape,[[-26+j*26,-54],[-32+j*26,-37],[-22+j*26,-23]],C.teal,4);
 }else if(index%4===2){ // A tiny illustrated landscape.
  disk(shape,36,-32,42,C.white);polygon(shape,[[-85,52],[-25,-28],[28,52]],C.teal);polygon(shape,[[-12,52],[46,-10],[92,52]],C.ink);
 }else {disk(shape,0,0,95,C.white);text(shape,'?',0,-1,76,C.ink);}
 return g;
}
export function feed(p:Node,x:number,y:number,scale:number,t:()=>number,mode='scroll'){
 const g=new Node({x,y,scale});p.add(g);box(g,12,15,375,600,'#00000015',46);box(g,0,0,375,600,C.deep,46);box(g,0,0,349,574,C.white,35);
 const viewport=new Rect({y:22,width:321,height:435,clip:true,radius:18,fill:C.paper});g.add(viewport);
 const speed=mode==='fast'?100:mode==='still'?0:50;
 for(let i=0;i<8;i++){
  const card=new Node({y:()=>i*284-((t()*speed)%1136)-70});viewport.add(card);post(card,0,0,300,207,i);disk(card,-130,128,23,C.teal);box(card,-27,121,150,7,C.line,3);box(card,-49,139,105,6,C.soft,3);text(card,'♡',123,128,26,C.ink);
 }
 rectHeader(g);return g;
}
function rectHeader(g:Node){box(g,0,-229,340,85,C.white,22);text(g,'LOOP',-100,-228,24,C.ink,700);disk(g,131,-228,25,C.lavender);box(g,0,-277,112,16,C.deep,9);box(g,0,267,105,6,C.ink,3);}
export function phoneCard(p:Node,x:number,y:number,label:string,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,150,255,C.deep,24);box(g,0,0,132,223,C.lavender,15);box(g,0,-107,51,9,C.deep,5);text(g,label,0,2,28,C.ink);box(g,0,102,50,4,C.ink,3);return g;}
export function book(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);polygon(g,[[-120,-70],[-4,-48],[-4,98],[-120,75]],C.white);polygon(g,[[4,-48],[120,-70],[120,75],[4,98]],'#e9dfcc');line(g,[[0,-49],[0,100]],C.ink,6);for(let j=0;j<5;j++){line(g,[[-99,-40+j*21],[-23,-27+j*21]],C.line,4);line(g,[[24,-27+j*21],[99,-40+j*21]],C.line,4);}return g;}
export function shelf(p:Node,x:number,y:number){const g=new Node({x,y});p.add(g);box(g,0,65,315,24,'#b89c81',7);line(g,[[-105,77],[-105,116]],C.ink,7);line(g,[[105,77],[105,116]],C.ink,7);return g;}
export function timer(p:Node,x:number,y:number,t:()=>number,scale=1,ring=false){const g=new Node({x,y,scale,rotation:()=>ring?Math.sin(t()*24)*2.5:0});p.add(g);disk(g,0,0,180,C.gold);disk(g,0,0,146,C.white);line(g,[[0,-52],[0,0],[35,22]],C.ink,7);[-1,1].forEach(sign=>box(g,sign*65,69,35,30,C.ink,8));box(g,0,-100,30,20,C.ink,5);if(ring){for(let sign of [-1,1])g.add(new Path({data:`M ${sign*115} -45 Q ${sign*140} 0 ${sign*115} 45`,stroke:C.gold,lineWidth:7,lineCap:'round'}));}return g;}
