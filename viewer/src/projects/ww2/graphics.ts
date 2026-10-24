import {Node} from '@motion-canvas/2d';
import {C,box,disk,line,poly,text,card,factory,house,money,clock,crate,note,radio,car,chair,plane,world,conveyor,chain,person,desk,folder,globe} from './art';
import {facts} from './annotations';
const title=(p:Node,s:string,y=-305)=>text(p,s,0,y,Math.min(51,1630/(s.length*.56)));
const lab=(p:Node,s:string,x:number,y:number,w=420,col=C.paper)=>card(p,s,x,y,w,col,Math.min(35,(w-35)/(s.length*.56)));
export function graphic(p:Node,k:string,v:number,t:()=>number){
 const f=facts[k][v];title(p,f.main);const it=f.items||[];
 if(k==='opening'||k==='rules'){
  if(k==='rules'&&v===2){house(p,-510,45,.58);line(p,[[-545,-45],[-510,-10],[-528,20],[-490,80]],C.red,7);for(let j=0;j<4;j++)box(p,-590+j*48,153,35,20,C.brown,2);factory(p,0,65,.65);house(p,510,45,.58);line(p,[[-300,75],[-220,75]],C.teal,8,true);line(p,[[220,75],[300,75]],C.teal,8,true);for(let i=0;i<3;i++)lab(p,it[i],-510+i*510,280,420,i===0?'#e8c1ac':C.paper)}
  else if((k==='rules'&&v===1)||(k==='opening'&&v===3)){clock(p,-430,0,1.25,t);clock(p,430,0,1.25,()=>t()*.25);lab(p,it[0],-430,230,660,C.blue);lab(p,it[1],430,230,660,C.gold)}
  else{for(let i=0;i<3;i++){const x=-520+i*520;box(p,x,0,440,340,i===1?C.blue:C.paper,15,C.ink);if(i===0)factory(p,x,-30,.43);if(i===1)globe(p,x,-30,.46);if(i===2){person(p,x-35,30,t,'worker','stand','neutral',.46);person(p,x+60,30,t,'migrant','stand','neutral',.46)}lab(p,it[i]||['ECONOMY','POWER','RECOVERY'][i],x,270,450)}}
 }else if(k==='industry'){
  if(v===2){for(let i=0;i<2;i++){const x=i?450:-450;box(p,x,10,690,390,i?'#ead8c1':'#d1e1d5',10,C.ink);factory(p,x,20,.67);if(i){line(p,[[x-150,-70],[x+130,155]],C.red,15);line(p,[[x+130,-70],[x-150,155]],C.red,15)}lab(p,it[i],x,280,700)}}
  else if(v===4){for(let i=0;i<3;i++){chair(p,-470+i*470,65,.9);lab(p,it[i],-470+i*470,280,410)}}
  else{conveyor(p,0,25,t,v===3?'food':'crate',1.2);chain(p,it,335)}
 }else if(k==='dollar'){
  if(v===0){for(let i=0;i<11;i++)for(let j=0;j<4;j++){const x=-590+i*118,y=-100+j*82;disk(p,x,y,24,C.teal,C.ink);box(p,x,y+24,40,34,C.paper,4,C.ink)}lab(p,'IMF',-350,320,600,C.blue);lab(p,'WORLD BANK ROOTS',350,320,600,C.gold)}
  else if(v===1){for(let i=0;i<3;i++){const x=-550+i*550;note(p,i===0?'EXCHANGE RATES':i===1?'US DOLLAR':'GOLD',i===2?'$35 / oz':i===1?'$':'FIXED / ADJUSTABLE',x,20,.8);if(i<2)line(p,[[x+170,20],[x+380,20]],C.teal,8,true)}}
  else if(v===2){crate(p,-480,20,1.2,'AID');factory(p,20,25,.7);person(p,530,90,t,'diplomat','talk','neutral',.9);chain(p,it,335)}
  else{for(let i=0;i<3;i++){const x=-520+i*520;if(i===0)factory(p,x,0,.63);if(i===1)money(p,x,0,1.2);if(i===2)globe(p,x,0,.6);lab(p,it[i],x,300,480,C.blue)}}
 }else if(k==='sovietpower'){
  if(v<2){world(p,'ussr',0,65,.82);lab(p,v===0?'POSITION ON THE GROUND':'EXPANDING POLITICAL INFLUENCE',0,380,1170,'#e3c4ae')}
  else if(v===2){box(p,-410,30,600,365,C.blue,15,C.ink);box(p,410,30,600,365,'#e7d6bf',15,C.ink);globe(p,-410,-15,.55);for(const x of [310,510])person(p,x,55,t,'diplomat','stand','neutral',.5);lab(p,it[0],-410,290,620);lab(p,it[1],410,290,620);text(p,'≠',0,20,100,C.red)}
  else{note(p,'TERRITORY','BORDER CHANGES',-470,25,.83);note(p,'RECOGNITION','CONTESTED',470,25,.83);text(p,'≠',0,25,120,C.red);lab(p,'BALTIC ANNEXATIONS: NON-RECOGNITION BY MANY WESTERN STATES',0,340,1580)}
 }else if(k==='sovietcost'){
  if(v===0){for(let i=0;i<5;i++)chair(p,-580+i*290,25,.9);lab(p,'MILITARY + CIVILIAN LOSSES',0,315,1100,'#e2c8b3')}
  else if(v===1){house(p,-480,40,.7);factory(p,10,50,.7);crate(p,510,60,1.1,'REPAIR');chain(p,it,335)}
  else{for(let i=0;i<it.length;i++){const x=-(it.length-1)*520/2+i*520;note(p,it[i],i===0?'POWER?':i===1?(v===2?'PROSPERITY?':'PRODUCTION?'):'LOSS?',x,10,.8)}if(v===2)text(p,'≠',0,20,115,C.red)}
 }else if(k==='canada'){
  if(v===1){conveyor(p,0,0,t,'radio',1.13);chain(p,it,330)}
  else if(v===2){world(p,'atlantic',0,65,.82);lab(p,'CANADA · NATO FOUNDING MEMBER · 1949',0,365,1300,C.blue)}
  else if(v===3){for(let i=0;i<3;i++){note(p,it[i],['OVERSEAS','ATLANTIC','DISPOSSESSION'][i],-500+i*500,10,.8)}}
  else{factory(p,0,25,1.0);chain(p,it,340)}
 }else if(k==='australia'){
  if(v===0){for(let i=0;i<4;i++){const x=-630+i*420;if(i===0)person(p,x,0,t,'worker','stand','neutral',.7);if(i===1)house(p,x,0,.57);if(i===2)poly(p,[[x+20,-105],[x-60,15],[x-3,15],[x-30,110],[x+70,-20],[x+12,-20]],C.gold);if(i===3)crate(p,x,0,1.0,'BUILD');lab(p,it[i],x,300,390)}}
  else if(v===1){for(let i=0;i<4;i++){person(p,-420+i*280,30,t,i%2?'worker':'migrant','walk','neutral',.8)}chain(p,it,340)}
  else if(v===2){poly(p,[[-400,-140],[400,-140],[570,200],[-570,200]],'#b4b9ac');for(const x of [-280,0,280])line(p,[[x,-100],[x,170]],'#8fa6a6',20);for(const x of [-200,200])line(p,[[x,180],[x,260]],C.blue,25);chain(p,it,360)}
  else{world(p,'pacific',0,65,.82);lab(p,'AUSTRALIA · NEW ZEALAND · UNITED STATES',0,365,1390,C.blue)}
 }else if(k==='pivot'){
  for(let i=0;i<3;i++){const x=-540+i*540;lab(p,['1945','1950s','1960s'][i],x,-125,400,i===0?C.paper:C.gold);if(i===0)house(p,x,80,.57);if(i===1)factory(p,x,80,.6);if(i===2)car(p,x,100,.68);if(i<2)line(p,[[x+200,65],[x+330,65]],C.teal,8,true)}
  lab(p,v===2?'NO AUTOMATIC BONUS FOR DEFEAT':'CHANGE THE TIME WINDOW',0,355,1200,C.blue);
 }else if(k==='germany'){
  if(v===0){for(let i=0;i<2;i++){note(p,it[i],i===0?'FEDERAL REPUBLIC':'DIFFERENT PATH',-420+i*840,20,.9)}text(p,'≠',0,20,100,C.red)}
  else if(v===1){note(p,'CURRENCY','DEUTSCHE MARK',-500,20,.8);radio(p,0,40,.85);note(p,'EXCHANGE','CONFIDENCE',500,20,.8);chain(p,it,355)}
  else if(v===2){for(let i=0;i<4;i++){const x=-630+i*420;folder(p,x,20,it[i],.83)}chain(p,['ASSISTANCE','EUROPEAN COOPERATION','TRADE'],350)}
  else if(v===3){car(p,-450,30,1.05);radio(p,420,0,1.1);lab(p,'NATIONAL OUTPUT ≠ EVERY HOUSEHOLD’S EXPERIENCE',0,350,1460,C.blue)}
  else{house(p,-470,40,.75);person(p,0,55,t,'engineer','point','neutral',.9);factory(p,490,40,.75);chain(p,it,355)}
 }else if(k==='japan'){
  if(v===0){note(p,'1945','DEFEAT',-500,20,.85);note(p,'1945–1952','OCCUPATION',0,20,.85);note(p,'AFTERWARD','REBUILDING',500,20,.85)}
  else if(v===1){crate(p,-500,20,1.2,'ORDERS');conveyor(p,300,0,t,'crate',.78);lab(p,'PROCUREMENT IN JAPAN · DEVASTATION IN KOREA',0,345,1460,'#e3c4ae')}
  else if(v===2){for(let i=0;i<4;i++){folder(p,-630+i*420,20,it[i],.8)}chain(p,['PRODUCTION','QUALITY','EXPORT MARKETS'],350)}
  else if(v===3){car(p,-450,20,1.0);radio(p,420,0,1.1);lab(p,'1968 · A GENERATION AFTER DEFEAT',0,345,1250,C.gold)}
  else{note(p,'WARTIME','RESPONSIBILITY',-430,20,.9);note(p,'POSTWAR','REBUILDING',430,20,.9);lab(p,'BOTH HISTORIES REMAIN TRUE',0,345,1300,C.blue)}
 }else if(k==='independence'){
  if(v===1){world(p,'independence',0,65,.82);lab(p,'INDIA AND PAKISTAN BECAME INDEPENDENT · 1947',0,365,1450,C.gold)}
  else if(v===0){globe(p,-460,0,.7);note(p,'SOVEREIGNTY','SELF-GOVERNMENT',360,20,1);lab(p,'A DIFFERENT MEASURE OF POSTWAR CHANGE',0,350,1380,C.blue)}
  else if(v===2){for(let i=0;i<3;i++)note(p,it[i],['POLITICAL CHANGE','DISPLACEMENT','LONG PROCESS'][i],-500+i*500,20,.8)}
  else{note(p,'BRITAIN','VICTORY',-500,20,.85);note(p,'FINANCES','STRAIN',0,20,.85);note(p,'EMPIRE','PRESSURE',500,20,.85)}
 }else if(k==='verdict'){
  if(v===0){world(p,'usa',0,65,.82);lab(p,'OVERALL POSITION · OUR COMPARISON',0,365,1300,C.gold)}
  else if(v===1){for(let i=0;i<3;i++){const x=-520+i*520;note(p,it[i],['SOVIET UNION','CANADA / AUSTRALIA','WEST GERMANY / JAPAN'][i],x,20,.88)}}
  else if(v===2){world(p,'world',0,65,.82);lab(p,'ECONOMY · POWER · RECOVERY · SOVEREIGNTY',0,365,1450,C.blue)}
  else{for(let i=0;i<3;i++){const x=-520+i*520;person(p,x,65,t,['worker','guide','migrant'][i],'stand','neutral',.95);lab(p,it[i],x,340,485,C.paper)}}
 }
}
