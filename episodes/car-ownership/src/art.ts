import {Node,Rect,Circle,Line,Txt,Path} from '@motion-canvas/2d';
export const P={paper:'#f7f2e8',ink:'#18323d',muted:'#61777d',teal:'#159b90',mint:'#a9dfc8',blue:'#65b4d2',coral:'#eb7c64',yellow:'#f2c04d',shadow:'#ded9cc',skin:'#d9a17c',hair:'#23323b',white:'#fffdf7',sky:'#dcecef',red:'#d95c55'};
export const font='DejaVu Sans';
export function txt(p:Node,s:string,x:number,y:number,size=36,fill=P.ink,weight=600){const a=new Txt({text:s,x,y,fontFamily:font,fontSize:size,fontWeight:weight,fill,textAlign:'center'});p.add(a);return a;}
export function rect(p:Node,x:number,y:number,w:number,h:number,fill=P.white,radius=18,stroke?:string){const a=new Rect({x,y,width:w,height:h,fill,radius,stroke,lineWidth:stroke?3:0});p.add(a);return a;}
export function circ(p:Node,x:number,y:number,size:number,fill=P.teal){const a=new Circle({x,y,size,fill});p.add(a);return a;}
export function line(p:Node,points:any,stroke=P.ink,width=5,endArrow=false){const a=new Line({points,stroke,lineWidth:width,lineCap:'round',lineJoin:'round',endArrow,arrowSize:15});p.add(a);return a;}
export function poly(p:Node,points:any,fill=P.teal,stroke?:string){const a=new Line({points,closed:true,fill,stroke,lineWidth:stroke?3:0,lineJoin:'round'});p.add(a);return a;}
export function money(n:number){return '$'+Math.round(n).toLocaleString('en-US');}
export function coin(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);circ(g,0,0,56,P.yellow);const r=new Circle({size:42,stroke:'#ce9b2d',lineWidth:2});g.add(r);txt(g,'$',0,1,31,'#946b1d',700);return g;}
export function icon(p:Node,type:string,x:number,y:number,scale=1,color=P.teal){const g=new Node({x,y,scale});p.add(g);
 if(type==='shield'){g.add(new Path({data:'M -55 -60 L 0 -78 L 55 -60 L 50 12 Q 30 55 0 77 Q -35 55 -50 12 Z',fill:color,stroke:P.ink,lineWidth:4}));line(g,[[-25,-1],[-5,21],[31,-25]],P.white,10);}
 else if(type==='pump'){rect(g,-10,0,90,125,color,10);rect(g,-10,-28,65,38,P.white,5);rect(g,-10,32,55,20,P.yellow,3);rect(g,-10,73,116,16,P.ink,4);g.add(new Path({data:'M 35 -25 Q 80 -25 79 18 L 79 49 Q 79 66 62 62 L 56 14',stroke:P.ink,lineWidth:7,lineCap:'round'}));line(g,[[55,-50],[79,-27],[79,-8]],P.ink,9);}
 else if(type==='wrench'){g.add(new Path({data:'M -13 -7 L -56 49 Q -68 66 -52 77 Q -40 84 -29 68 L 13 10 Q 53 13 55 -26 L 35 -7 L 15 -17 L 12 -38 L 34 -59 Q -6 -66 -16 -31 Q -20 -19 -13 -7 Z',fill:color,stroke:P.ink,lineWidth:3}));circ(g,-44,60,12,P.white);}
 else if(type==='bank'){poly(g,[[-75,-25],[0,-75],[75,-25]],color,P.ink);rect(g,0,-15,155,17,P.ink,3);[-48,0,48].forEach(xx=>rect(g,xx,25,20,65,color,2));rect(g,0,65,160,17,P.ink,3);txt(g,'$',0,-38,28,P.white);}
 else if(type==='receipt'){poly(g,[[-54,-75],[54,-75],[54,75],[36,62],[18,75],[0,62],[-18,75],[-36,62],[-54,75]],P.white,P.ink);[-40,-16,8,32].forEach((yy,j)=>line(g,[[-32,yy],[j===3?10:32,yy]],j===3?color:P.shadow,6));}
 else if(type==='calendar'){rect(g,0,0,140,125,P.white,12,P.ink);rect(g,0,-42,140,40,color,12);[-35,35].forEach(xx=>rect(g,xx,-65,9,30,P.ink,4));txt(g,'5',0,20,58,P.ink);}
 else if(type==='wallet'){rect(g,0,0,146,100,color,15,P.ink);rect(g,48,5,65,40,P.yellow,8,P.ink);circ(g,58,5,9,P.ink);line(g,[[-52,-34],[45,-34]],P.white,3);}
 else if(type==='tag'){poly(g,[[-70,-40],[28,-40],[70,0],[28,40],[-70,40]],color,P.ink);circ(g,37,0,12,P.paper);txt(g,'$',-18,0,40,P.ink);}
 else if(type==='key'){circ(g,-30,0,66,P.yellow);circ(g,-30,0,27,P.paper);line(g,[[0,0],[66,0],[66,24],[47,24],[47,12]],P.yellow,16);}
 else if(type==='parking'){rect(g,0,0,110,130,P.blue,12);txt(g,'P',0,-2,80,P.white);}
 else if(type==='clock'){circ(g,0,0,130,P.white);g.add(new Circle({size:130,stroke:color,lineWidth:10}));line(g,[[0,-43],[0,0],[32,21]],P.ink,7);}
 else if(type==='check'){circ(g,0,0,108,P.mint);line(g,[[-25,0],[-6,20],[30,-22]],P.teal,10);}
 else {coin(g,0,0,1.3);}
 return g;
}
export function alex(p:Node,x:number,y:number,scale:number,t:()=>number,mood='happy',pose='talk',shirt=P.teal){
 const g=new Node({x,y,scale});p.add(g);
 const shadow=new Circle({x:0,y:169,width:160,height:24,fill:'#00000012'});g.add(shadow);
 const body=new Node({y:()=>Math.sin(t()*2.3)*2});g.add(body);
 const walk=pose==='walk';const wave=pose==='wave';
 // Legs and shoes.
 line(body,[[-26,6],[-33,77],[-39,145]],P.ink,24);line(body,[[26,6],[33,77],[40,145]],P.ink,24);
 const shoeL=rect(body,-43,151,59,24,P.white,10,P.ink);const shoeR=rect(body,45,151,59,24,P.white,10,P.ink);
 if(walk){shoeL.y(()=>151+Math.sin(t()*6)*8);shoeR.y(()=>151-Math.sin(t()*6)*8);}
 rect(body,0,-44,99,120,shirt,28);poly(body,[[-19,-101],[19,-101],[13,-20],[-13,-20]],P.white);
 line(body,[[0,-12],[0,14]],'#12786f',3);
 // Arms are jointed lines so poses remain readable.
 line(body,[[-43,-82],[-71,-27],[-67,27]],shirt,23);circ(body,-67,33,26,P.skin);
 const right=new Node({x:43,y:-82,rotation:()=>wave?-100+Math.sin(t()*4)*13:Math.sin(t()*2)*5});body.add(right);
 line(right,[[0,0],[29,47],[pose==='point'?86:43,pose==='point'?12:66]],shirt,22);circ(right,pose==='point'?91:46,pose==='point'?11:71,26,P.skin);
 rect(body,0,-112,31,40,P.skin,10);
 circ(body,-49,-163,20,P.skin);circ(body,49,-163,20,P.skin);
 const head=new Node({y:()=>Math.sin(t()*1.3)*1.8,rotation:()=>mood==='thinking'?-5+Math.sin(t())*2:0});body.add(head);
 rect(head,0,-166,97,107,P.skin,40);
 head.add(new Path({data:'M -48 -163 Q -64 -232 -7 -228 Q 15 -249 48 -220 Q 65 -193 43 -174 L 34 -199 Q -3 -182 -34 -203 L -40 -165 Z',fill:P.hair}));
 const blink=()=>Math.abs(Math.sin(t()*1.11+1))<.055?.12:1;
 const eyes=new Node({y:-164,scaleY:blink});head.add(eyes);circ(eyes,-19,0,mood==='surprised'?10:8,P.ink);circ(eyes,19,0,mood==='surprised'?10:8,P.ink);
 line(head,[[-30,-187],[-12,mood==='concerned'?-180:-187]],P.hair,5);line(head,[[12,mood==='concerned'?-180:-187],[30,-187]],P.hair,5);
 line(head,[[0,-159],[-3,-146],[5,-146]],'#b77d59',3);
 if(mood==='surprised')head.add(new Circle({x:0,y:-132,width:18,height:23,fill:P.ink}));
 else if(mood==='concerned')head.add(new Path({data:'M -17 -129 Q 0 -141 17 -129',stroke:P.ink,lineWidth:4,lineCap:'round'}));
 else if(mood==='thinking')line(head,[[-12,-131],[12,-133]],P.ink,4);
 else head.add(new Path({data:'M -19 -138 Q 0 -117 19 -138',stroke:P.ink,lineWidth:4,lineCap:'round'}));
 return g;
}
export function car(p:Node,x:number,y:number,scale:number,t:()=>number,color=P.blue,moving=false){
 const g=new Node({x,y,scale});p.add(g);
 const sh=new Circle({y:94,width:620,height:40,fill:'#00000015'});g.add(sh);
 const body=new Node({y:()=>moving?Math.sin(t()*8)*2:Math.sin(t()*1.8)*1});g.add(body);
 body.add(new Path({data:'M -300 38 L -285 -18 Q -282 -38 -236 -47 L -139 -57 L -73 -133 Q -55 -151 -18 -151 L 116 -151 Q 145 -150 164 -125 L 221 -62 L 276 -44 Q 300 -37 308 -1 L 316 43 Q 313 65 290 68 L -272 68 Q -300 64 -300 38 Z',fill:color,stroke:P.ink,lineWidth:5}));
 body.add(new Path({data:'M -121 -61 L -58 -130 L 10 -130 L 10 -62 Z',fill:'#d6eef1',stroke:P.ink,lineWidth:4}));
 body.add(new Path({data:'M 27 -130 L 111 -130 Q 126 -128 139 -110 L 183 -62 L 27 -62 Z',fill:'#d6eef1',stroke:P.ink,lineWidth:4}));
 line(body,[[-264,-18],[271,-18]],'#ffffff60',4);line(body,[[15,-51],[15,44]],'#25667d',3);line(body,[[199,-49],[215,34]],'#25667d',3);
 rect(body,51,-23,35,7,P.ink,3);rect(body,-104,-23,32,7,P.ink,3);
 rect(body,280,-8,43,22,P.yellow,7);rect(body,-278,-1,27,26,P.coral,5);rect(body,0,58,590,18,P.ink,8);rect(body,272,30,49,19,P.white,4);
 [-196,202].forEach(wx=>{const wheel=new Node({x:wx,y:60,rotation:()=>moving?t()*180:0});body.add(wheel);circ(wheel,0,0,111,P.ink);circ(wheel,0,0,65,'#dbe2df');circ(wheel,0,0,24,P.muted);for(let j=0;j<5;j++){const a=j*Math.PI*2/5;line(wheel,[[Math.cos(a)*14,Math.sin(a)*14],[Math.cos(a)*26,Math.sin(a)*26]],P.muted,4);}});
 // A small dashboard and driver silhouette make it feel occupied.
 if(moving){circ(body,102,-104,30,P.skin);body.add(new Path({data:'M 86 -110 Q 93 -132 116 -112 L 116 -102 L 90 -103 Z',fill:P.hair}));line(body,[[103,-87],[137,-72]],P.teal,16);}
 return g;
}
export function city(p:Node,t:()=>number,moving=false){
 rect(p,0,10,2100,700,P.sky,0);circ(p,650,-250,135,'#f5d781');
 const skyline=new Node({y:-20,x:()=>moving?-(t()*12%130):0});p.add(skyline);
 const heights=[200,290,180,250,310,190,260,210,285,170,220];
 heights.forEach((h,j)=>{const xx=-1000+j*210;rect(skyline,xx,150-h/2,160,h,j%2?'#b7d4d9':'#c8dfe1',5);for(let r=0;r<Math.floor(h/55)-1;r++)for(let k=0;k<3;k++)rect(skyline,xx-48+k*48,140-h+40+r*52,22,29,'#eaf4ee',3);});
 rect(p,0,270,2100,100,'#c8d8bf',0);rect(p,0,378,2100,150,'#546a6e',0);rect(p,0,315,2100,15,P.white,0);
 for(let j=0;j<12;j++){const x=-1100+j*210;const mark=rect(p,x,393,110,8,'#f3e8c9',4);if(moving)mark.x(()=>x-((t()*140)%210));}
}
export function dealer(p:Node,t:()=>number){
 rect(p,0,60,2100,660,'#dcecee',0);circ(p,-720,-230,145,'#f3d586');rect(p,350,50,920,400,P.white,14,P.ink);rect(p,350,-160,970,72,P.teal,10);txt(p,'NORTHSIDE AUTO',350,-160,33,P.white,700);
 [-15,350,715].forEach(xx=>{rect(p,xx,72,310,300,'#b6dce3',4,P.ink);line(p,[[xx-140,-50],[xx+65,140]],'#ffffff55',7);});
 rect(p,0,320,2100,130,'#dfd9c9',0);line(p,[[-960,265],[960,265]],'#cbc5b6',3);
}
export function garage(p:Node){rect(p,0,50,2100,690,'#e5e6d8',0);rect(p,300,40,1050,450,'#ccc9b9',8,P.ink);rect(p,300,-180,1080,65,P.coral,8);txt(p,'REPAIRS • TIRES • MAINTENANCE',300,-180,28,P.white,700);for(let y=-130;y<=215;y+=44)line(p,[[-205,y],[805,y]],'#b0ae9f',4);rect(p,0,330,2100,120,'#d5d0c1',0);}
export function desk(p:Node){rect(p,0,40,2100,700,'#f0e6d3',0);rect(p,230,325,1200,48,'#d1a57b',12);rect(p,-310,400,35,150,P.ink,4);rect(p,770,400,35,150,P.ink,4);rect(p,690,-30,180,265,'#eddfbf',10);circ(p,690,-30,100,P.yellow);}
export function bubble(p:Node,s:string,x:number,y:number,w=320){const g=new Node({x,y});p.add(g);rect(g,0,0,w,78,P.white,22,P.ink);poly(g,[[-40,37],[-58,67],[-3,37]],P.white);txt(g,s,0,0,25,P.ink,600);return g;}
export function badge(p:Node,s:string,x:number,y:number,color=P.yellow,w=250){const g=new Node({x,y});p.add(g);rect(g,0,0,w,58,color,29);txt(g,s,0,0,23,P.ink,600);return g;}
export function receipt(p:Node,x:number,y:number,rows:{label:string,value:string,color?:string}[],title='FIVE-YEAR BUDGET',width=630){const g=new Node({x,y});p.add(g);rect(g,10,13,width,rows.length*60+150,'#0000000c',10);rect(g,0,0,width,rows.length*60+150,P.white,12);const top=-(rows.length*60+150)/2;txt(g,title,0,top+50,25,P.ink,700);line(g,[[-width/2+35,top+86],[width/2-35,top+86]],P.shadow,2);rows.forEach((r,j)=>{const yy=top+126+j*60;const a=txt(g,r.label,-width/2+35,yy,25,P.muted,400);a.offset.x(-1);const b=txt(g,r.value,width/2-35,yy,27,r.color||P.ink);b.offset.x(1);});return g;}
