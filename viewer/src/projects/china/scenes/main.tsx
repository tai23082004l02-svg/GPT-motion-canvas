import {makeScene2D,Node} from '@motion-canvas/2d';
import {createSignal,tween} from '@motion-canvas/core';
import shots from '../shots.json';
import {C,box,disk,line,poly,text,card,bubble,page,ramp,clamp,actor,env,tower,desk,folder,suitcase,tv,phone,podium,board,icon} from '../art';
const CUT=4.0;
const configs:Record<string,{bg:string;prop:string;reaction:string;notes:string[]}>={
 hook:{bg:'construction',prop:'tower',reaction:'Different rulebook?',notes:['Personality','Opportunity','Institutions']},
 rules:{bg:'page',prop:'branches',reaction:'This is a thought experiment.',notes:['Fictional counterpart','No prediction','No real quotation']},
 real:{bg:'office',prop:'biography',reaction:'The real-world starting point',notes:['Queens · 1946','Real estate','Television → politics']},
 reset:{bg:'courtyard',prop:'suitcase',reaction:'The business will not fit.',notes:['Family resources','Local connections','Access to capital']},
 child:{bg:'courtyard',prop:'child',reaction:'A childhood changes things.',notes:['Habits','Ambitions','Learning']},
 calendar:{bg:'courtyard',prop:'timeline',reaction:'Which China? Which year?',notes:['1946 · birth year','1949 · PRC founded','1966 · turns twenty']},
 upheaval:{bg:'page',prop:'history',reaction:'No invented personal history.',notes:['1966–1976','Cultural Revolution','Family experience: unknown']},
 formation:{bg:'courtyard',prop:'choices',reaction:'More than one possibility.',notes:['Quiet persuasion?','Caution?','Outspokenness?']},
 reform:{bg:'construction',prop:'reform',reaction:'New openings. Over time.',notes:['1978 · reforms begin','Age thirty-two','Gradual change']},
 fork:{bg:'page',prop:'branches',reaction:'Three branches. No forecast.',notes:['The builder','The showman','The power seeker']},
 builder:{bg:'construction',prop:'tower',reaction:'Where is the business plan?',notes:['A vision','A model','A very large sign']},
 zone:{bg:'construction',prop:'zone',reaction:'Opportunity is not a permit.',notes:['Shenzhen · 1980','A special economic zone','An imagined starting point']},
 land:{bg:'office',prop:'land',reaction:'Read the land-use rules.',notes:['Urban land: state-owned','Land-use rights','Transfer according to law']},
 meeting:{bg:'office',prop:'plan',reaction:'And the numbers?',notes:['Finance','Builders','Permissions']},
 sign:{bg:'construction',prop:'sign',reaction:'Where does the building go?',notes:['Branding','Partners','Execution']},
 risk:{bg:'construction',prop:'risk',reaction:'Both outcomes are possible.',notes:['A finished project?','A stalled project?','No guaranteed success']},
 showman:{bg:'studio',prop:'screen',reaction:'Maybe a shorter presentation?',notes:['A public persona','A performance','An audience']},
 platform:{bg:'studio',prop:'tv',reaction:'The show does not teleport.',notes:['A different media industry','Access','Available formats']},
 decades:{bg:'office',prop:'phone',reaction:'That belongs to a later decade.',notes:['1980 ≠ today','Technology changes','So does his age']},
 audience:{bg:'studio',prop:'audience',reaction:'Will anyone keep watching?',notes:['Interest?','Confusion?','The audience decides']},
 editor:{bg:'studio',prop:'gate',reaction:'Who carries the performance?',notes:['Producers','Partners','Distribution']},
 volume:{bg:'studio',prop:'volume',reaction:'Louder is one strategy.',notes:['Adapt?','Double down?','Lose the audience?']},
 power:{bg:'hall',prop:'poster',reaction:'Wrong route to office.',notes:['Ambition','A polished poster','A different political system']},
 systems:{bg:'hall',prop:'politics',reaction:'A different institutional route.',notes:['Communist Party leadership','President elected by the NPC','Different from a US election']},
 poster:{bg:'hall',prop:'ladder',reaction:'A billboard is not a ladder.',notes:['Institutions','Appointments','Relationships']},
 influence:{bg:'office',prop:'influence',reaction:'These are different things.',notes:['Wealth','Popularity','Formal authority']},
 uncertain:{bg:'page',prop:'uncertainty',reaction:'We do not know the ending.',notes:['Rich?','Powerful?','Neither?']},
 ordinary:{bg:'office',prop:'ordinary',reaction:'A smaller life is possible.',notes:['An ordinary career','A smaller business','A different ambition']},
 switch:{bg:'courtyard',prop:'switches',reaction:'Change the setup. Change the story.',notes:['Family resources','Region','Birth year']},
 return:{bg:'construction',prop:'suitcase',reaction:'The hair travels more easily.',notes:['Networks','Institutions','Opportunities']},
 answer:{bg:'page',prop:'equation',reaction:'Personality meets opportunity.',notes:['Someone to persuade','A way to build','A route to power']},
 final:{bg:'page',prop:'branches',reaction:'Same face. A different story.',notes:['Who you are','Where you are','When you get the chance']}
};
function closeProp(p:Node,type:string,t:()=>number){
 const title=(s:string,y=-275,size=54)=>text(p,s,0,y,size);
 if(type==='tower'||type==='sign'){
  tower(p,0,70,.9);if(type==='sign'){const n=card(p,'TRUMP',0,-265,1150,C.gold,99);n.scale(()=>1+.07*ramp(t(),1,2));title('THE SIGN IS READY.',360,42)}else title('A VISION IS NOT A COMPLETE PLAN.',360,42);
 }else if(type==='suitcase'){
  suitcase(p,-310,100,1.35);folder(p,300,70,'NETWORK',.9);line(p,[[-20,75],[80,75]],C.red,7);line(p,[[30,25],[30,125]],C.red,7);title('What can actually travel?');
 }else if(type==='biography'){
  title('REAL-WORLD BIOGRAPHY');['1946','REAL ESTATE','TELEVISION','POLITICS'].forEach((s,i)=>{card(p,s,-640+i*425,0,370,C.paper,33);if(i<3)line(p,[[-440+i*425,0],[-410+i*425,0]],C.ink,6,true)});text(p,'Birthplace: Queens, New York',0,225,43);
 }else if(type==='child'){
  actor(p,-320,180,t,'child','shrug','happy',.95);actor(p,330,180,t,'trump','shrug','neutral',1.1);line(p,[[-80,0],[80,0]],C.ink,7,true);title('An adult is not pre-installed.');
 }else if(type==='timeline'||type==='history'||type==='reform'||type==='zone'){
  const facts=type==='timeline'?[['1946','Birth year'],['1949','PRC founded'],['1966','Turns twenty']]:type==='history'?[['1966','Cultural Revolution'],['1976','Period ends']]:type==='reform'?[['1978','Reform era begins'],['32','His age that year']]:[['1980','Shenzhen SEZ'],['34','His age that year']];
  line(p,[[-780,90],[780,90]],C.brown,7,true);facts.forEach(([year,label],i)=>{const x=facts.length===3?-570+i*570:-400+i*800;disk(p,x,90,30,C.gold,C.ink);text(p,year,x,-65,98);text(p,label,x,190,36)});title('HISTORICAL CONTEXT',-310,42);
 }else if(type==='land'){
  poly(p,[[-550,150],[60,150],[360,-35],[-250,-35]],'#abc096');tower(p,-95,-80,.43);folder(p,535,125,'USE RIGHTS',.75);title('URBAN LAND: STATE-OWNED');text(p,'Constitutional comparison · rules evolved over time',0,-195,31);card(p,'Land-use rights may be transferred by law',0,350,1250,C.paper,38);
 }else if(type==='plan'||type==='gate'){
  folder(p,0,70,type==='gate'?'DISTRIBUTION':'PROJECT',1.1);const a=type==='gate'?['PRODUCER','PARTNER','PLATFORM']:['FINANCE','BUILDERS','PERMISSIONS'];a.forEach((s,i)=>card(p,s,-560+i*560,-220,480,C.paper,34));
 }else if(type==='risk'||type==='choices'||type==='uncertainty'){
  title(type==='risk'?'MORE THAN ONE ENDING':'NO CERTAIN OUTCOME');line(p,[[0,-130],[0,-30],[-460,80]],C.ink,7,true);line(p,[[0,-30],[460,80]],C.ink,7,true);if(type==='risk'){tower(p,-460,140,.52);tower(p,460,140,.52,false);card(p,'COMPLETED?',-460,365,490,C.paper,35);card(p,'STALLED?',460,365,490,C.blue,35)}else{icon(p,'question',-460,150,.85);icon(p,'question',460,150,.85);card(p,'Possibilities, not probabilities',0,365,1050,C.paper,38)}
 }else if(['screen','tv','audience','volume'].includes(type)){
  tv(p,0,50,1.35,type==='screen');const a=actor(p,-30,120,t,'trump','talk','happy',.65);if(type==='audience'){for(const x of [-670,670])actor(p,x,180,t,'viewer','arms',x<0?'happy':'worried',.9)}title(type==='volume'?'VOLUME ≠ REACH':type==='audience'?'AN AUDIENCE IS NOT GUARANTEED':'WHO PROVIDES THE STAGE?');
 }else if(type==='phone'){
  tv(p,-420,100,.85);phone(p,410,70,.95);line(p,[[305,-110],[515,235]],C.red,11);line(p,[[515,-110],[305,235]],C.red,11);title('1980 IS NOT THE SMARTPHONE ERA');
 }else if(type==='politics'){
  title('DIFFERENT ROUTES TO OFFICE');card(p,'US presidential election',-450,-90,750,C.paper,37);card(p,'China: president elected by NPC',380,100,1030,C.paper,37);line(p,[[-340,0],[-340,220]],C.teal,7,true);text(p,'Constitutional role of the CPC',0,330,39);
 }else if(type==='poster'||type==='ladder'){
  if(type==='poster'){box(p,0,55,520,570,C.paper,8,C.ink);actor(p,0,100,t,'trump','talk','happy',.6);text(p,'A CAMPAIGN?',0,270,45);title('A POSTER IS NOT A ROUTE.')}else{for(const xx of [-180,180])line(p,[[xx,-220],[xx,290]],C.brown,18);for(let i=0;i<5;i++)line(p,[[-180,-180+i*100],[180,-180+i*100]],C.brown,14);icon(p,'question',420,20,.8);title('INSTITUTIONAL PATHWAYS');}
 }else if(type==='influence'){
  ['WEALTH','POPULARITY','AUTHORITY'].forEach((s,i)=>{icon(p,i===0?'money':i===1?'people':'question',-570+i*570,0,1);card(p,s,-570+i*570,220,470,C.paper,37)});title('RELATED DOES NOT MEAN IDENTICAL');
 }else if(type==='ordinary'){
  desk(p,0,190,1);actor(p,0,50,t,'trump','stand','neutral',.72);folder(p,-200,70,'WORK',.45);title('FAME IS NOT THE DEFAULT');
 }else if(type==='switches'){
  title('CHANGE THE STARTING CONDITIONS');['Resources','Region','Birth year'].forEach((s,i)=>{text(p,s,-470,-90+i*160,44);line(p,[[-110,-90+i*160],[650,-90+i*160]],C.brown,8);disk(p,100+i*190,-90+i*160,55,C.teal,C.ink)});
 }else if(type==='equation'){
  title('PERSONALITY × ENVIRONMENT');icon(p,'people',-420,60,1.2);icon(p,'clock',420,60,1.2);text(p,'×',0,30,130);card(p,'Available choices and rewards',0,340,1100,C.paper,42);
 }else{
  title('A DIFFERENT SETTING. DIFFERENT PATHS.');line(p,[[0,-120],[0,-35],[-550,85]],C.ink,7,true);line(p,[[0,-35],[0,85]],C.ink,7,true);line(p,[[0,-35],[550,85]],C.ink,7,true);['BUILD','PERFORM','INFLUENCE'].forEach((s,i)=>{icon(p,i===0?'money':i===1?'megaphone':'people',-550+i*550,160,.9);card(p,s,-550+i*550,330,440,C.paper,36)});
 }
}
export default makeScene2D(function*(view){
 for(const s of shots as any[]){
  const t=createSignal(0),dur=s.end-s.start,c=configs[s.kind],root=new Node({});view.add(root);
  const isFact=['biography','history','reform','zones','land','politics'].includes(s.source);
  const mode=()=>Math.floor(t()/CUT)%4;
  for(let beat=0;beat<4;beat++){
   const w=new Node({opacity:()=>mode()===beat?1:0});root.add(w);
   // Each beat is a different composition, not a repeated zoom of one slide.
   if(beat===1){env(w,'page');closeProp(w,c.prop,t);}
   else if(beat===2){
    env(w,c.bg==='construction'?'office':c.bg==='courtyard'?'courtyard':c.bg==='page'?'office':c.bg);
    actor(w,-410,435,t,s.kind==='child'?'child':'trump',['shrug','talk','arms','point'][s.id%4],s.kind==='upheaval'?'worried':['surprise','worried','neutral','happy'][s.id%4],2.1);
    actor(w,440,435,t,['tower','sign','plan'].includes(c.prop)?'worker':'assistant',['point','arms','talk'][s.id%3],'neutral',1.9);
    card(w,c.reaction,0,-345,Math.min(1600,Math.max(900,c.reaction.length*30)),C.paper,45);
    if(isFact)text(w,'The character is fictional; context is sourced.',0,430,30);
   }else{
    env(w,c.bg);const main=actor(w,-520,195,t,s.kind==='child'?'child':'trump',beat===3?'talk':c.prop==='suitcase'?'carry':['stand','point','arms'][s.id%3],['upheaval','risk','uncertain'].includes(s.kind)?'worried':beat===3?'happy':'neutral',s.kind==='child'?.85:1.15);
    if(['tower','sign','risk','zone'].includes(c.prop)){
     tower(w,190,105,.85,s.kind!=='risk'||beat===0);actor(w,670,240,t,'worker','point','neutral',.87);
     if(c.prop==='sign'&&beat===3)card(w,'TRUMP',230,-180,700,C.gold,89);
    }else if(['tv','screen','audience','volume','phone'].includes(c.prop)){
     tv(w,250,110,.95,c.prop==='screen');actor(w,630,235,t,'viewer','arms',beat===3?'worried':'happy',.88);if(c.prop==='phone'&&beat===3){phone(w,300,50,.85);line(w,[[210,-100],[390,200]],C.red,9);line(w,[[390,-100],[210,200]],C.red,9)}
    }else if(['politics','poster','ladder'].includes(c.prop)){
     actor(w,210,130,t,'assistant','point','neutral',1.05);podium(w,210,265,.9);folder(w,650,160,'RULES',.7);
    }else if(c.prop==='suitcase'){
     suitcase(w,-520,130,.62);actor(w,485,195,t,'assistant','point','neutral',1.05);folder(w,200,185,'CONTEXT',.8);
    }else if(c.prop==='child'){
     actor(w,420,185,t,'assistant','talk','happy',1.05);folder(w,90,190,'LEARNING',.65);
    }else if(['timeline','history','reform'].includes(c.prop)){
     board(w,320,10,s.kind==='calendar'?'1946 → 1949 → 1966':s.kind==='upheaval'?'1966–1976':'1978',s.kind==='calendar'?'Birth year → a changing country':s.kind==='upheaval'?'Cultural Revolution':'Reform era begins',1000);
    }else if(['branches','choices','uncertainty','equation'].includes(c.prop)){
     actor(w,530,195,t,'assistant','shrug','neutral',1.1);icon(w,'question',0,30,1.05);
    }else{
     actor(w,490,170,t,'assistant','point','neutral',1.1);desk(w,120,300,.95);folder(w,120,160,c.prop==='gate'?'ACCESS':c.prop==='land'?'USE RIGHTS':'PLAN',.7);
    }
    if(beat===3)c.notes.forEach((v,i)=>card(w,v,-570+i*570,-320,520,C.paper,34));
    else card(w,s.title,0,-350,Math.min(1600,Math.max(950,s.title.length*29)),C.paper,49);
   }
   w.scale(()=>1+.012*((t()%CUT)/CUT));
  }
  // The label describes the epistemic status, not a scene number.
  const badge=card(root,isFact?'REAL-WORLD CONTEXT':'FICTIONAL SCENARIO',-615,-478,600,isFact?C.blue:'#e6cea1',27);
  if(s.kind==='final'){
   const end=new Node({opacity:()=>ramp(t(),dur-3.2,.6)});root.add(end);box(end,0,0,2200,1300,'#102132');text(end,'SCOPIVO',0,-55,115,'#fff9e9');text(end,'A clearer view.',0,70,49,'#8cdeb1');
  }
  root.opacity(()=>Math.min(ramp(t(),0,.12),clamp((dur-t())/.12)));yield* tween(dur,v=>t(v*dur));root.remove();
 }
});
