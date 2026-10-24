import {makeScene2D,Node} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,box,disk,line,text,card,poly,ramp,clamp,env,person,note,crate,radio,car,chair,plane,world,conveyor,chain,desk,folder,suitcase,factory,house,money,clock,globe} from '../art';
import {facts,countryFor,placeFor} from '../annotations';
import {graphic} from '../graphics';
const label=(p:Node,str:string,x:number,y:number,w=1500,col=C.paper,size=45)=>card(p,str,x,y,w,col,Math.min(size,(w-55)/(Math.max(1,str.length)*.56)));
const plate=(p:Node,str:string,y:number)=>{box(p,0,y,1660,61,C.paper,8,C.ink);text(p,str,0,y,Math.min(34,1560/(str.length*.55)));};
function location(k:string,v:number){
 if(k==='opening')return ['ruins','factory','conference','maproom'][v];
 if(k==='industry'&&v===4)return 'memorial';
 if(k==='canada'&&v===3)return 'harbor';
 if(k==='australia')return ['factory','harbor','dam','conference'][v];
 if(k==='germany')return ['ruins','shop','conference','showroom','factory'][v];
 if(k==='japan')return ['ruins','factory','factory','showroom','memorial'][v];
 if(k==='independence')return ['conference','harbor','memorial','conference'][v];
 if(k==='pivot')return v===0?'maproom':v===1?'ruins':'factory';return placeFor[k]||'office';
}
function object(p:Node,k:string,v:number,t:()=>number){
 if(k==='opening'||k==='rules'){if(v%3===0){note(p,'1945','WHAT CHANGED?',0,115,.72)}else if(v%3===1)clock(p,0,120,1.25,t);else globe(p,0,140,.7);return}
 if(k==='industry'||k==='canada'){if((k==='industry'&&v===4)||(k==='canada'&&v===3)){chair(p,-160,170,.8);chair(p,160,170,.8)}else conveyor(p,0,120,t,v%2?'radio':'crate',.78);return}
 if(k==='dollar'){if(v===1){note(p,'US DOLLAR','$',-165,110,.64);note(p,'GOLD','$35 / oz',165,110,.64)}else{desk(p,0,200,.77);folder(p,0,110,v===0?'1944':'REBUILD',.65)}return}
 if(k==='sovietpower'){folder(p,-140,140,'TERRITORY',.65);folder(p,155,140,'INFLUENCE',.65);return}
 if(k==='sovietcost'){chair(p,-180,160,.95);chair(p,150,160,.95);return}
 if(k==='australia'){if(v===1){suitcase(p,-120,195,.74);suitcase(p,140,195,.6)}else if(v===2){crate(p,-120,185,.9,'BUILD');folder(p,150,130,'POWER',.65)}else note(p,v===3?'ANZUS':'DEVELOPMENT',v===3?'1951':'INVESTMENT',0,100,.8);return}
 if(k==='germany'||k==='japan'){if(v===3)car(p,0,155,1.05);else if(v===1&&k==='germany'){note(p,'DEUTSCHE MARK','1948',0,100,.8)}else if(v===0){crate(p,0,170,1.1,'REBUILD')}else{radio(p,-160,140,.65);crate(p,160,170,.75,'EXPORTS')}return}
 if(k==='independence'){if(v===3)note(p,'BRITAIN','VICTORY / STRAIN',0,100,.85);else{suitcase(p,-120,180,.8);folder(p,150,130,'SELF-RULE',.7)}return}
 if(k==='pivot'){house(p,0,110,.75);return}
 if(k==='verdict'){folder(p,0,140,'THE SCORECARDS',.95);return}
}
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,k=s.kind,v=s.variant,f=facts[k][v],root=new Node({});view.add(root);
  const serious=k==='sovietcost'||k==='industry'&&v===4||k==='canada'&&v===3||k==='japan'&&v===4||k==='independence'&&v===2;
  const beat=()=>Math.floor(t()/4)%6;
  for(let b=0;b<6;b++){
   const stage=new Node({opacity:()=>beat()===b?1:0});root.add(stage);
   if(b===1){
    box(stage,0,0,2200,1300,C.paper);const g=new Node({scale:.88,y:-62});stage.add(g);graphic(g,k,v,t);label(stage,f.heading,0,-403,1740,C.paper,40);
   }else if(b===2){
    env(stage,serious?'memorial':location(k,v));
    person(stage,-490,445,t,'guide',serious?'stand':'talk',serious?'worried':'neutral',1.85);
    person(stage,490,445,t,['sovietpower','dollar','verdict'].includes(k)?'diplomat':k==='australia'&&v===1?'migrant':'worker',serious?'stand':'shrug',serious?'worried':v%3===0?'surprise':'neutral',1.85);
    label(stage,f.heading,0,-370,1750,C.paper,43);label(stage,f.main,0,-245,1650,C.gold,47);
    if(serious)chair(stage,0,300,.66);else if(k==='dollar')note(stage,'POSTWAR','FRAMEWORK',0,270,.5);else if(k==='australia'&&v===1)suitcase(stage,0,300,.6);else radio(stage,0,300,.55);
   }else if(b===3){
    if(v===0||k==='sovietpower'&&v===1||k==='australia'&&v===3||k==='independence'&&v===1){
     box(stage,0,0,2200,1300,'#243b48');const m=world(stage,countryFor[k]||'world',0,25,1.03);label(stage,f.main,0,-391,1740,C.paper,47);plate(stage,f.sub,350);
    }else{
     // A close tabletop insert uses period props instead of another talking-head shot.
     box(stage,0,0,2200,1300,'#b69a75');for(let i=0;i<12;i++)line(stage,[[-1100,-500+i*100],[1100,-500+i*100]],'#84694935',3);
     const g=new Node({y:-25,scale:1.2});stage.add(g);
     if(k==='dollar'&&v===1){note(g,'DOLLAR','$',-390,20,.8);note(g,'GOLD','$35 / oz',390,20,.8);line(g,[[-170,20],[170,20]],C.teal,10,true)}
     else if(k==='sovietcost'||serious){chair(g,-320,55,1);note(g,'PEOPLE','NOT A PRICE TAG',320,0,.8)}
     else if(k==='industry'||k==='canada'){radio(g,-350,25,1.0);crate(g,320,40,1.25,'SUPPLIES')}
     else if(k==='australia'){suitcase(g,-340,50,1.1);folder(g,330,10,v===2?'ENGINEERING':'MIGRATION',1)}
     else if(k==='germany'||k==='japan'){radio(g,-350,20,1.1);note(g,k==='germany'?'REBUILDING':'EXPORTS',k==='germany'?'CHOICES':'PRODUCTS',370,0,.88)}
     else{folder(g,-340,20,f.items?.[0]||'POWER',1);folder(g,340,20,f.items?.[1]||'PEOPLE',1)}
     label(stage,f.main,0,-391,1740,C.paper,47);plate(stage,f.sub,350);
    }
   }else if(b===4){
    env(stage,location(k,v));label(stage,f.heading,0,-385,1740,C.paper,42);
    const g=new Node({scale:1.08,y:-80});stage.add(g);
    if(['industry','canada'].includes(k)&&!serious){conveyor(g,0,70,t,v%2?'radio':'crate',1.25);person(g,-650,130,t,'worker','work','neutral',1.1)}
    else if(k==='australia'&&v===2){person(g,-400,180,t,'engineer','point','neutral',1.4);person(g,300,200,t,'worker','work','neutral',1.2);crate(g,580,250,.85,'BUILD')}
    else if(k==='sovietcost'||serious){for(let i=0;i<4;i++)chair(g,-510+i*340,120,1);note(g,'HUMAN COST','CANNOT BE CANCELED',0,-135,.5)}
    else if(k==='germany'&&v===3||k==='japan'&&v===3){car(g,0,160,1.55);person(g,-650,180,t,'worker','point','neutral',1.1)}
    else{person(g,-590,175,t,k==='australia'?'migrant':'guide','point','neutral',1.1);object(g,k,v,t);person(g,590,175,t,'engineer','work','neutral',1.1)}
    label(stage,f.main,0,330,1660,C.paper,43);
   }else{
    env(stage,location(k,v));person(stage,-680,215,t,'guide',serious?'stand':b===5?'talk':'point',serious?'worried':'neutral',1.05);person(stage,690,225,t,k==='australia'&&v===1?'migrant':['dollar','sovietpower','verdict'].includes(k)?'diplomat':'worker',serious?'stand':'work',serious?'worried':'neutral',1.0);object(stage,k,v,t);
    label(stage,f.heading,0,-370,1740,C.paper,43);if(b===5){label(stage,f.main,0,-245,1660,C.gold,47);plate(stage,f.sub,-153)}
    else if(v===0||k==='dollar'&&v===1)label(stage,f.main,0,-245,1660,C.gold,47);
   }
   stage.scale(()=>1+.009*((t()%4)/4));
  }
  label(root,'SCOPIVO · ILLUSTRATED HISTORY',-550,-480,800,C.paper,26);
  label(root,k==='germany'||k==='japan'||k==='pivot'?'LONG-RUN RECOVERY · 1950s–1960s':k==='independence'?'SOVEREIGNTY · A DIFFERENT MEASURE':'1945 AND THE POSTWAR WORLD',480,-480,890,C.blue,25);
  if(k==='verdict'&&v===3){const end=new Node({opacity:()=>ramp(t(),dur-3.3,.7)});root.add(end);box(end,0,0,2200,1300,'#102132');text(end,'SCOPIVO',0,-65,117,'#fff9e9');text(end,'A clearer view.',0,65,49,'#8cdeb1');}
  root.opacity(()=>Math.min(ramp(t(),0,.14),clamp((dur-t())/.14)));yield* tween(dur,f=>t(f*dur));root.remove();
 }
});
