import {Node,Path,Img} from '@motion-canvas/2d';
import land from './land.json';
import {C,box,disk,line,poly,text,card,ramp,clamp,page} from '../winter/art';
export {C,box,disk,line,poly,text,card,ramp,clamp,page};
export {desk,folder,suitcase,tv} from '../china/art';
export {factory,house,money,clock,globe} from '../musk/art';
export function person(p:Node,x:number,y:number,t:()=>number,role='guide',pose='talk',mood='neutral',scale=1){
 const g=new Node({x,y,scale});p.add(g);const female=role==='guide'||role==='migrant',worker=role==='worker'||role==='engineer';const col=role==='guide'?C.teal:role==='diplomat'?'#435b75':role==='migrant'?C.red:role==='engineer'?'#d8d7bf':'#8e9da5';
 disk(g,0,185,180,'#302b2917').height(17);
 const stride=(s:number)=>pose==='walk'?Math.sin(t()*4.5)*s*23:0;
 for(const s of [-1,1]){line(g,()=>[[s*24,40],[s*29+stride(s)*.4,108],[s*39+stride(s),172]],C.ink,9);const sh=box(g,s*48,180,58,18,C.brown,7,C.ink);sh.x(()=>s*48+stride(s));}
 poly(g,[[-46,-105],[46,-105],[56,61],[-56,61]],col);poly(g,[[-25,-104],[25,-104],[0,-53]],C.paper);
 if(!worker){poly(g,[[-5,-90],[5,-90],[10,-43],[0,-28],[-10,-43]],C.gold)}else{line(g,[[0,-53],[0,56]],'#596a6a',3);for(const yy of [-15,10,35])disk(g,8,yy,5,C.ink)}
 line(g,[[0,-107],[0,-123]],C.ink,8);
 const wrist=(s:number):[number,number]=>pose==='point'&&s===1?[151,-117]:pose==='shrug'?[s*114,-83-8*Math.sin(t()*1.6)]:pose==='carry'?[s*48,-31]:pose==='talk'&&s===1?[113,-65-14*Math.sin(t()*1.5)]:pose==='work'?[s*55+35,-42+8*Math.sin(t()*2)]:[s*88,28];
 for(const s of [-1,1]){const e=()=>[s*77,(wrist(s)[1]-90)*.43+10] as [number,number];line(g,()=>[[s*43,-87],e(),wrist(s)],C.ink,8);line(g,()=>[[s*43,-87],e()],col,19);const h=disk(g,0,0,18,C.white,C.ink);h.position(()=>wrist(s));}
 // Head never rotates or floats relative to the torso; gestures stay in connected arms.
 const head=new Node({y:-187});g.add(head);disk(head,0,0,136,C.white,C.ink);
 head.add(new Path({data:female?'M -65 16 Q -84 -81 -8 -81 Q 74 -83 69 22 L 47 6 L 37 -34 Q -2 -17 -39 -47 L -49 19 Z':'M -63 -20 Q -72 -73 -13 -75 Q 47 -80 65 -26 L 42 -35 Q 2 -22 -36 -45 L -50 -15 Z',fill:role==='guide'?'#76513c':C.ink,stroke:C.ink,lineWidth:3}));
 if(role==='worker'){poly(head,[[-76,-36],[-66,-70],[52,-70],[66,-38]],'#7b897e');box(head,0,-34,158,18,'#566c60',6,C.ink)}
 if(role==='engineer'){poly(head,[[-73,-38],[-59,-88],[53,-88],[72,-38]],C.gold);box(head,0,-34,163,19,C.gold,5,C.ink)}
 const eyes=new Node({scaleY:()=>Math.abs(Math.sin(t()*.8+.9))<.026?.12:1});head.add(eyes);disk(eyes,-22,0,mood==='surprise'?12:8,C.ink);disk(eyes,22,0,mood==='surprise'?12:8,C.ink);
 if(mood==='worried'){line(head,[[-35,-18],[-14,-10]],C.ink,4);line(head,[[14,-10],[35,-18]],C.ink,4)}
 if(mood==='surprise')disk(head,0,29,19,C.ink);else head.add(new Path({data:mood==='happy'?'M -19 22 Q 0 43 19 22':mood==='worried'?'M -17 32 Q 0 17 17 32':'M -13 28 Q 0 33 13 28',stroke:C.ink,lineWidth:4,lineCap:'round'}));return g;
}
export function env(p:Node,type='office'){
 if(['ruins','factory','harbor'].includes(type)){p.add(new Img({src:import.meta.env.BASE_URL+`images/ww2/${type}.webp`,width:1920,height:1080}));return}
 if(type==='maproom'){box(p,0,0,2200,1300,'#223443');box(p,0,400,2200,300,'#162631');for(const x of [-850,850]){line(p,[[x,300],[x,-360]],'#c7ac76',14);box(p,x,-380,130,75,C.gold,12,C.ink)}return}
 if(type==='memorial'){box(p,0,0,2200,1300,'#bcc6c2');for(let i=0;i<7;i++)line(p,[[-900+i*300,-540],[-900+i*300,540]],'#8c9b96',3);box(p,0,365,2200,340,'#89968d');box(p,0,-70,780,520,'#e1dfd0',8,C.ink);line(p,[[-300,-90],[300,-90]],'#9da59c',4);return}
 if(type==='dam'){box(p,0,0,2200,1300,'#cbdfe1');poly(p,[[-1100,280],[-680,-230],[-360,0],[-30,-330],[400,170],[700,-220],[1100,250]],'#879d8c');poly(p,[[-210,55],[390,55],[540,410],[-350,410]],'#b9b9a8');for(const xx of [-160,0,160,320])line(p,[[xx,75],[xx+20,385]],'#8d958f',14);box(p,0,450,2200,210,'#9cc4ca');for(const x of [-800,700]){line(p,[[x,300],[x,-90]],C.ink,10);line(p,[[x-90,20],[x+90,20]],C.ink,7)}return}
 const conference=type==='conference',shop=type==='shop',showroom=type==='showroom';box(p,0,0,2200,1300,conference?'#d4c1a3':'#e7e4d4');box(p,0,390,2200,320,'#b4aa8c');
 if(conference){for(let i=0;i<5;i++){box(p,-780+i*390,-70,70,590,'#b69d7a',3,C.brown)}box(p,0,-370,1450,95,C.paper,6,C.ink);text(p,'REBUILDING THE POSTWAR ORDER',0,-370,40);return}
 for(const x of [-590,590]){box(p,x,-100,480,410,'#c0d7da',5,C.brown);line(p,[[x,-303],[x,103]],C.brown,5);line(p,[[x-238,-100],[x+238,-100]],C.brown,5)}
 if(shop){box(p,0,-50,620,450,C.wood,3,C.ink);for(const yy of [-180,0,180]){line(p,[[-305,yy],[305,yy]],C.brown,8);for(let i=0;i<5;i++)box(p,-240+i*120,yy-50,70,95,i%2?C.paper:C.teal,5,C.ink)}}
 if(showroom){box(p,0,-370,1360,95,C.paper,6,C.ink);text(p,'THE POSTWAR CONSUMER ECONOMY',0,-370,39)}
}
export function note(p:Node,title:string,body:string,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,360,420,C.paper,6,C.ink);text(g,title,0,-145,Math.min(36,310/(Math.max(1,title.length)*.55)));for(let i=0;i<3;i++)line(g,[[-120,-65+i*40],[120,-65+i*40]],'#b7ad96',5);text(g,body,0,115,Math.min(39,310/(Math.max(1,body.length)*.55)));return g}
export function crate(p:Node,x:number,y:number,scale=1,label='SUPPLIES'){const g=new Node({x,y,scale});p.add(g);box(g,0,0,220,170,'#c59b68',5,C.ink);for(const yy of [-50,0,50])line(g,[[-105,yy],[105,yy]],'#8d6d4e',3);for(const xx of [-85,85])box(g,xx,0,19,170,C.wood,0,C.ink);box(g,0,0,138,54,C.paper,2);text(g,label,0,0,25);return g}
export function radio(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,0,360,210,C.wood,30,C.ink);box(g,-55,-12,195,142,'#9f967e',13,C.ink);for(let i=0;i<7;i++)line(g,[[-135,-60+i*18],[25,-60+i*18]],C.brown,5);box(g,110,-46,65,44,C.paper,6,C.ink);disk(g,100,49,40,C.gold,C.ink);return g}
export function car(p:Node,x:number,y:number,scale=1,col=C.teal){const g=new Node({x,y,scale});p.add(g);poly(g,[[-235,20],[-185,-45],[-95,-60],[-40,-139],[105,-139],[192,-50],[255,-13],[265,72],[-240,72]],col);poly(g,[[-75,-59],[-20,-119],[45,-119],[45,-59]],C.blue);poly(g,[[64,-119],[99,-119],[163,-59],[64,-59]],C.blue);for(const xx of [-150,165]){disk(g,xx,78,98,C.ink);disk(g,xx,78,51,'#c9d0c5',C.ink)}box(g,242,14,37,27,C.gold,6,C.ink);return g}
export function chair(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,-85,150,170,'#a68a69',9,C.ink);box(g,0,10,182,35,C.wood,5,C.ink);for(const xx of [-65,65])line(g,[[xx,25],[xx,130]],C.brown,13);return g}
export function plane(p:Node,x:number,y:number,scale=1){const g=new Node({x,y,scale});p.add(g);poly(g,[[-200,-15],[-42,-40],[40,-127],[82,-121],[46,-39],[195,-15],[210,11],[42,27],[3,91],[-45,91],[-25,23],[-190,18]],'#b4c1c2');return g}
export function world(p:Node,focus='world',x=0,y=25,scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,-10,1510,660,'#d2e1de',16,C.ink);for(const path of land)g.add(new Path({data:path,fill:'#adb59c',stroke:'#768b7b',lineWidth:1}));
 const pts:Record<string,[number,number,string]>={usa:[-101,38,'UNITED STATES'],ussr:[55,56,'SOVIET UNION'],canada:[-106,56,'CANADA'],australia:[134,-25,'AUSTRALIA'],germany:[8,51,'WEST GERMANY'],japan:[138,37,'JAPAN'],india:[78,22,'INDIA & PAKISTAN']};
 const keys=focus==='world'?['usa','ussr','canada','australia','germany','japan']:focus==='atlantic'?['usa','canada','germany']:focus==='pacific'?['usa','japan','australia']:focus==='independence'?['india']: [focus];
 for(const key of keys){const q=pts[key];if(!q)continue;const [lon,lat,label]=q;const xx=lon*3.9,yy=-lat*3.9;disk(g,xx,yy,focus==='world'?20:29,C.red,C.paper);if(focus!=='world'){const ly=key==='canada'?yy-55:yy+65;box(g,xx,ly,Math.max(230,label.length*17),49,C.paper,5,C.ink);text(g,label,xx,ly,28)}}
 text(g,'SCHEMATIC LOCATOR · COASTLINES ONLY · NO HISTORICAL BORDERS',0,262,21,C.ink);return g}
export function conveyor(p:Node,x:number,y:number,t:()=>number,product='crate',scale=1){const g=new Node({x,y,scale});p.add(g);box(g,0,135,930,45,'#7b8f8a',20,C.ink);for(const xx of [-370,370])line(g,[[xx,155],[xx,255]],C.ink,17);for(let i=0;i<5;i++){disk(g,-360+i*180,136,31,C.gold,C.ink);const q=new Node({x:()=>((i*230+t()*38)%1150)-575,y:30});g.add(q);if(product==='radio')radio(q,0,0,.45);else if(product==='car')car(q,0,0,.3);else crate(q,0,0,.55,product==='food'?'FOOD':'SUPPLIES')}return g}
export function chain(p:Node,labels:string[],y=140){const w=labels.length===4?350:440;const start=-(labels.length-1)*w/2;for(let i=0;i<labels.length;i++){const x=start+i*w;card(p,labels[i],x,y,w-60,i%2?C.blue:C.paper,Math.min(38,(w-90)/(labels[i].length*.55)));if(i<labels.length-1)line(p,[[x+(w-60)/2+5,y],[x+w-(w-60)/2-10,y]],C.teal,8,true)}}
