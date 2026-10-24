import {makeScene2D,Node} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,box,disk,line,text,card,ramp,clamp,env,musk,support,phone,phoneBox,cart,money,clock,house,factory,calendar,receipt,wallet,globe,desk,folder} from '../art';
import {graphic} from '../graphics';
import {captions,facts} from '../annotations';
const CUT=4;
const roomFor=(k:string)=>['shopping','snapshot','checkout'].includes(k)?'store':k==='scale'?'warehouse':['shares','percent','liquidity'].includes(k)?'market':k==='loan'?'bank':k==='spend'||k==='balance'?'home':'office';
function hero(p:Node,k:string,v:number,t:()=>number){
 if(['shopping','checkout'].includes(k)){cart(p,120,235,.95,10);return}
 if(k==='snapshot'){if(v===0)receipt(p,150,100,.85);else if(v===1)phone(p,150,90,1.15);else{phone(p,0,120,.68);money(p,330,140,.9)}return}
 if(k==='scale'){clock(p,120,100,1.3,t);for(let i=0;i<6;i++)phoneBox(p,-110+i*82,335,.52);return}
 if(k==='spend'){calendar(p,150,80,1.08,v<2?'$1M / DAY':'$60K / YEAR');money(p,150,315,.65);return}
 if(k==='balance'){if(v===0||v===1)house(p,150,100,.85);else wallet(p,150,175,1.15);return}
 if(k==='shares'||k==='company'){factory(p,150,90,1);return}
 if(k==='percent'){money(p,150,150,1.3);phone(p,150,-30,.55);return}
 if(k==='liquidity'){receipt(p,150,110,.9,v===0||v===4);return}
 if(k==='loan'){money(p,20,170,1);receipt(p,320,120,.72,true);return}
 if(k==='gdp'){globe(p,150,120,1);return}
 if(k==='project'){desk(p,130,275,.75);folder(p,130,155,'PROJECT',.66);return}
}
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,root=new Node({});view.add(root);
  const k=s.kind,v=s.variant,heading=captions[k]?.[v]||s.title,data=facts[k]?.[v]||facts[k]?.[0]||[];
  const beat=()=>Math.floor(t()/CUT)%4;
  const plate=(p:Node,str:string,y:number)=>{const n=new Node({y});p.add(n);box(n,0,0,1510,55,C.paper,8,C.ink);text(n,str,0,0,Math.min(35,1460/(str.length*.57)));};
  const label=(p:Node,str:string,x:number,y:number,w=1500,col=C.paper,size=43)=>card(p,str,x,y,w,col,Math.min(size,(w-46)/(Math.max(1,str.length)*.57)));
  for(let b=0;b<4;b++){
   const scene=new Node({opacity:()=>beat()===b?1:0});root.add(scene);
   if(b===1){
    box(scene,0,0,2200,1300,C.paper);const g=new Node({scale:.88,y:-80});scene.add(g);graphic(g,k,v,t);
   }else if(b===2){
    env(scene,['loan','company','shares','percent','liquidity'].includes(k)?'office':roomFor(k));
    musk(scene,-450,430,t,['shrug','talk','point','stand'][s.id%4],['neutral','surprise','worried','happy'][s.id%4],1.95);
    support(scene,460,430,t,k==='project'?'worker':'assistant',['point','arms','talk'][s.id%3],'neutral',1.85);
    label(scene,heading,0,-345,1660,C.paper,48);
    if(['shopping','checkout'].includes(k)&&v>=2){receipt(scene,0,240,.55,true)}
    else if(k==='shares'){money(scene,0,270,.65);label(scene,'VALUE ≠ CASH PAYMENT',0,-210,1050,C.blue,40)}
    else if(k==='loan'){receipt(scene,0,250,.54,true);label(scene,'CASH ARRIVES WITH A LIABILITY',0,-210,1260,C.gold,40)}
    else if(k==='gdp'){globe(scene,0,250,.5);label(scene,'CHECK WHAT THE NUMBER MEASURES',0,-210,1280,C.blue,40)}
    else if(k==='balance'&&v===3){label(scene,'PERSONAL CASH BALANCE: UNKNOWN HERE',0,-210,1350,C.blue,39)}
    else if(data[0])label(scene,data[0],0,-215,1380,C.gold,45);
   }else{
    const type=b===3&&k==='shopping'&&v<2?'warehouse':roomFor(k);env(scene,type);
    musk(scene,-600,200,t,b===3?'talk':['point','stand','shrug'][s.id%3],['happy','neutral','worried'][s.id%3],1.08);
    if(k==='project'&&v>=2){
     for(let i=0;i<3;i++){support(scene,-30+i*310,245,t,i===1?'assistant':'worker',i===1?'point':'talk','happy',.77);desk(scene,-30+i*310,365,.36);folder(scene,-30+i*310,310,'PLAN',.29)}
    }else{support(scene,650,220,t,'assistant',b===3?'point':'stand','neutral',.98);hero(scene,k,v,t);}
    if(k==='shopping'&&v<2){const u=()=>t()%1;const incoming=phoneBox(scene,0,0,.45);incoming.position(()=>[470-340*u(),-60+150*u()*u()]);incoming.rotation(()=>-15+15*u());incoming.opacity(()=>Math.min(1,u()*7));}
    if(['shopping','checkout'].includes(k)){desk(scene,680,315,.66);box(scene,680,235,150,105,'#5b7178',8,C.ink);box(scene,680,226,120,70,C.blue,3)}
    label(scene,heading,0,-355,1670,C.paper,46);
    if(b===3){
     label(scene,data[0]||'A financial illustration',0,-235,1450,C.gold,49);
     if(data[1])plate(scene,data[1],-145);
    }else if(k==='shopping'&&v===0){
     label(scene,'~770 MILLION PHONE EQUIVALENTS',80,-225,1470,C.gold,49);plate(scene,'On paper · before tax and practical constraints',-140);
    }else if(k==='snapshot'&&v===0){label(scene,'$922.9B · FORBES · OCT 23, 2026',80,-225,1480,C.gold,49)}
    if(k==='liquidity'&&v>=1&&v<=2){for(let i=0;i<3;i++)phoneBox(scene,-240+i*110,350,.5)}
   }
   scene.scale(()=>1+.008*((t()%CUT)/CUT));
  }
  const equity=['shopping','snapshot','scale','spend','percent','checkout'].includes(k);
  label(root,equity?'ILLUSTRATION · WEALTH EQUIVALENTS':'ILLUSTRATIVE FINANCIAL EXAMPLE',-535,-480,820,equity?'#e5c997':C.blue,27);
  if(k==='snapshot'||k==='shopping'&&v===0){label(root,'US STARTING PRICE · iPHONE 18 PRO',480,-480,830,C.paper,25)}
  if(k==='checkout'&&v===3){const end=new Node({opacity:()=>ramp(t(),dur-3.2,.7)});root.add(end);box(end,0,0,2200,1300,'#102132');text(end,'SCOPIVO',0,-70,115,'#fff9e9');text(end,'A clearer view.',0,60,49,'#8cdeb1');}
  // No scene counter. Four-second edits use scene, detail, reaction and result compositions.
  root.opacity(()=>Math.min(ramp(t(),0,.13),clamp((dur-t())/.13)));yield* tween(dur,f=>t(f*dur));root.remove();
 }
});
