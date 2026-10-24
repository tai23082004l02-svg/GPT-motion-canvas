import {Node,Path,Img} from '@motion-canvas/2d';
import {actor as supporting,env as office,desk,folder,suitcase,icon as oldIcon} from '../china/art';
import {C,box,disk,line,poly,text,card,bubble,page,ramp,clamp} from '../winter/art';
export {C,box,disk,line,poly,text,card,bubble,page,ramp,clamp,desk,folder,suitcase};
export const support=supporting;
export function musk(p:Node,x:number,y:number,t:()=>number,pose='stand',mood='neutral',scale=1){
 const g=new Node({x,y,scale});p.add(g);disk(g,0,185,185,'#302b2915').height(18);
 for(const s of [-1,1]){line(g,[[s*24,37],[s*30,108],[s*38,173]],'#5b6268',17);box(g,s*47,180,59,19,C.ink,8)}
 poly(g,[[-45,-102],[45,-102],[56,56],[-56,56]],'#37404b');line(g,[[0,-105],[0,-124]],C.ink,8);
 const wrist=(s:number):[number,number]=>pose==='shrug'?[s*111,-92-8*Math.sin(t()*1.3)]:pose==='point'&&s===1?[149,-124]:pose==='cart'?[s*45+75,-35]:pose==='talk'&&s===1?[112,-50-18*Math.sin(t()*1.5)]:[s*90,30];
 for(const s of [-1,1]){line(g,()=>[[s*43,-84],[s*82,-34],wrist(s)],C.ink,8);line(g,[[s*43,-84],[s*66,-56]],'#37404b',23);const h=disk(g,0,0,18,C.white,C.ink);h.position(()=>wrist(s))}
 const head=new Node({y:-188});g.add(head);disk(head,0,0,139,C.white,C.ink);
 head.add(new Path({data:'M -65 -18 Q -80 -62 -38 -73 Q -8 -98 30 -77 Q 74 -72 68 -26 L 49 -30 L 37 -52 Q 3 -31 -33 -50 L -49 -13 Z',fill:'#4a3830',stroke:C.ink,lineWidth:4}));line(head,[[-23,-62],[25,-73]],'#806651',4);
 const eyes=new Node({scaleY:()=>Math.abs(Math.sin(t()*.7+.8))<.025?.13:1});head.add(eyes);disk(eyes,-22,0,mood==='surprise'?12:8,C.ink);disk(eyes,22,0,mood==='surprise'?12:8,C.ink);
 if(mood==='worried'){line(head,[[-35,-18],[-14,-10]],C.ink,4);line(head,[[14,-10],[35,-18]],C.ink,4)}else{line(head,[[-34,-19],[-15,-20]],C.ink,4);line(head,[[15,-20],[34,-19]],C.ink,4)}
 if(mood==='surprise')disk(head,0,30,19,C.ink);else head.add(new Path({data:mood==='happy'?'M -19 21 Q 0 44 19 21':mood==='worried'?'M -16 32 Q 0 18 16 32':'M -13 28 Q 0 34 13 28',stroke:C.ink,lineWidth:4,lineCap:'round'}));return g;
}
export function env(p:Node,type='office'){
 if(type==='store'||type==='warehouse'){p.add(new Img({src:import.meta.env.BASE_URL+`images/musk/${type}.webp`,width:1920,height:1080}));return}
 if(type==='bank'){box(p,0,0,2200,1300,'#e8e4d7');box(p,0,390,2200,320,'#c3b697');for(const x of [-780,-400,400,780]){box(p,x,-55,75,580,'#c9c3b3',0,C.brown);box(p,x,-350,120,35,C.brown,3);box(p,x,240,120,35,C.brown,3)}box(p,0,-420,1750,120,C.paper,6,C.ink);text(p,'FICTIONAL LENDER',0,-420,43);return}
 if(type==='market'){box(p,0,0,2200,1300,'#263445');box(p,0,400,2200,300,'#1c2630');for(let i=0;i<3;i++){box(p,-560+i*560,-120,470,350,'#d3e4d2',10,C.ink);line(p,[[-740+i*560,-30],[-670+i*560,-90],[-600+i*560,-70],[-480+i*560,-180],[-400+i*560,-140]],C.teal,8)}return}
 office(p,type==='home'?'office':type);
}
export function phone(p:Node,x:number,y:number,scale=1,back=false){const g=new Node({x,y,scale});p.add(g);box(g,0,0,190,333,'#28363f',27,C.ink);box(g,0,0,167,306,back?'#b9c6c5':'#c5e0dc',21);if(back){for(const [xx,yy] of [[-45,-100],[5,-80],[-45,-42]])disk(g,xx,yy,36,'#25343d',C.paper)}else{box(g,0,-135,55,16,C.ink,8);disk(g,0,5,100,'#e5cd92');line(g,[[-45,132],[45,132]],C.ink,5)}return g}
export function phoneBox(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,110,160,C.paper,6,C.ink);box(g,0,0,62,113,'#b4d2cf',9,C.ink);box(g,0,-44,25,5,C.ink,2);return g}
export function cart(p:Node,x:number,y:number,scale=1,filled=6){const g=new Node({x,y,scale});p.add(g);for(let i=0;i<filled;i++){const b=phoneBox(g,-100+(i%4)*65,-95-Math.floor(i/4)*85,.59);b.rotation((i%3-1)*7)}poly(g,[[-164,-135],[166,-135],[130,24],[-125,24]],'#ffffff35');for(let i=0;i<6;i++)line(g,[[-140+i*55,-128],[-110+i*43,20]],'#536b76',5);line(g,[[-224,-205],[-184,-205],[-125,57],[141,57]],C.ink,11);for(const xx of [-90,105])disk(g,xx,99,49,'#e2e1d1',C.ink);return g}
export function money(p:Node,x:number,y:number,scale=1,label='$'){const g=new Node({x,y,scale});p.add(g);for(let i=2;i>=0;i--)box(g,i*8,-i*8,160,95,'#9db998',5,C.ink);disk(g,0,0,61,C.paper,C.ink);text(g,label,0,-2,39);return g}
export function clock(p:Node,x:number,y:number,scale=1,t:()=>number=()=>0){const g=new Node({x,y,scale});p.add(g);disk(g,0,0,165,C.paper,C.ink);for(let i=0;i<12;i++){const a=i*Math.PI/6;line(g,[[Math.sin(a)*65,-Math.cos(a)*65],[Math.sin(a)*73,-Math.cos(a)*73]],C.ink,3)}const h=line(g,[[0,0],[0,-56]],C.red,6);h.rotation(()=>t()*50);line(g,[[0,0],[36,17]],C.ink,8);disk(g,0,0,12,C.ink);return g}
export function house(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,40,310,240,'#dfc698',1,C.ink);poly(g,[[-195,-80],[0,-225],[195,-80]],C.red);box(g,0,86,72,145,C.brown,3,C.ink);for(const xx of [-105,105]){box(g,xx,0,70,80,C.blue,3,C.ink);line(g,[[xx,-39],[xx,40]],C.brown,4)}return g}
export function factory(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);poly(g,[[-200,-30],[-80,-100],[-80,-30],[40,-100],[40,-30],[180,-90],[180,170],[-200,170]],'#91aaa9');box(g,130,-150,49,145,C.brown,0,C.ink);for(const xx of [-133,-31,76])box(g,xx,45,64,75,C.blue,2,C.ink);return g}
export function calendar(p:Node,x:number,y:number,scale=1,label='DAY 1'){const g=new Node({x,y,scale});p.add(g);box(g,0,0,330,300,C.paper,13,C.ink);box(g,0,-105,330,89,C.red,8,C.ink);for(const xx of [-93,93])line(g,[[xx,-170],[xx,-115]],C.ink,14);text(g,label,0,20,47);return g}
export function receipt(p:Node,x:number,y:number,scale=1,paid=false){const g=new Node({x,y,scale});p.add(g);box(g,0,0,350,480,C.paper,3,C.ink);text(g,paid?'PAYMENT?':'ESTIMATE',0,-175,42);for(let i=0;i<4;i++)line(g,[[-120,-90+i*50],[120,-90+i*50]],'#9a947f',5);text(g,paid?'HOW?':'$922.9B',0,155,49);return g}
export function wallet(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,300,190,C.brown,25,C.ink);box(g,93,0,135,70,C.wood,8,C.ink);disk(g,110,0,16,C.gold,C.ink);return g}
export function globe(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);disk(g,0,0,350,C.blue,C.ink);for(const w of [120,250]){const c=disk(g,0,0,345,'#ffffff00',C.ink);c.width(w)}for(const yy of [-75,0,75]){const q=disk(g,0,yy,320,'#ffffff00',C.ink);q.height(55)}return g}
export function stamp(p:Node,s:string,x:number,y:number,col=C.red,scale=1){const g=card(p,s,x,y,600,C.paper,43);g.scale(scale);g.rotation(-7);return g}
export function arrow(p:Node,x1:number,y1:number,x2:number,y2:number,color=C.teal){return line(p,[[x1,y1],[x2,y2]],color,8,true)}
