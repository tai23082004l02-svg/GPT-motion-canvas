import {Node} from '@motion-canvas/2d';
import {C,box,disk,line,poly,text,card,page,phone,phoneBox,cart,money,clock,house,factory,calendar,receipt,wallet,globe,arrow} from './art';
export function graphic(p:Node,k:string,v:number,t:()=>number){
 const title=(s:string)=>text(p,s,0,-295,53);
 const tag=(s:string,x:number,y:number,w=600,col=C.paper,size=37)=>card(p,s,x,y,w,col,size);
 if(k==='shopping'){
  if(v===1){clock(p,-420,30,1.5,t);phone(p,380,25,.95);title('ONE PHONE EVERY SECOND');tag('24.4 YEARS',0,330,900,C.gold,62)}
  else if(v===2){receipt(p,-350,50,1);wallet(p,390,60,1.1);title('HOW ARE YOU PAYING?');arrow(p,-40,40,140,40)}
  else if(v===3){['SCALE','ASSETS','CASH'].forEach((s,i)=>{tag(s,-560+i*560,-130,440);if(i===0)cart(p,-560,145,.7,10);else if(i===1)factory(p,0,90,.65);else wallet(p,560,130,.8)})}
  else{for(let i=0;i<16;i++)phoneBox(p,-600+(i%8)*170,-80+Math.floor(i/8)*205,.8);title('~770 MILLION PHONE EQUIVALENTS');tag('Before tax, supply and liquidation constraints',0,380,1400,C.paper,36)}
 }else if(k==='snapshot'){
  if(v===0){receipt(p,-460,40,.95);tag('$922.9 BILLION',230,-80,1000,C.gold,72);tag('Forbes · Oct 23, 2026 · 9:30 p.m. EDT',200,80,1120,C.paper,33);text(p,'A dated estimate, not a live counter',180,230,38)}
  else if(v===1){phone(p,-400,20,1.4);tag('iPhone 18 Pro',300,-180,750);tag('$1,199',300,0,750,C.gold,80);text(p,'US starting price · no sales tax',300,160,38);text(p,'No trade-in or installment calculation',300,230,32)}
  else{title('A WEALTH-EQUIVALENT CALCULATION');text(p,'$922,900,000,000 ÷ $1,199',0,-100,65);arrow(p,0,-30,0,80);tag('~769.7 MILLION',0,170,1200,C.gold,80);text(p,'Rounded: about 770 million phones',0,330,43)}
 }else if(k==='scale'){
  if(v===0){['MILLION','BILLION','TRILLION'].forEach((s,i)=>{tag(s,-590+i*590,-130,480);money(p,-590+i*590,80,.9);text(p,i===0?'1':i===1?'1,000 million':'1,000 billion',-590+i*590,250,35)})}
  else if(v===1){title('COUNTING AT $1 PER SECOND');clock(p,-620,60,1.3,t);tag('$1 BILLION',-90,-120,520);tag('31.7 years',-90,40,520,C.gold,48);tag('$1 TRILLION',520,-120,520);tag('~31,700 years',520,40,520,C.blue,45)}
  else if(v===2){title('A CHANGE IN SCALE');box(p,0,60,1500,120,'#d7dfca',4,C.ink);box(p,-57.825,60,1384.35,108,C.teal,1);tag('$922.9B',0,-100,900,C.gold,80);text(p,'92.29% of $1 trillion',0,240,49)}
  else{title('AN OBJECT YOUR BRAIN RECOGNIZES');phone(p,-570,45,1);arrow(p,-370,30,-190,30);for(let i=0;i<21;i++)phoneBox(p,40+(i%7)*108,-100+Math.floor(i/7)*130,.52);tag('The quantity stops fitting the picture.',0,355,1400)}
 }else if(k==='spend'){
  if(v===0){calendar(p,-430,30,1.2,'EVERY DAY');money(p,410,20,1.3);title('SPEND $1 MILLION PER DAY');tag('MORE THAN 2,500 YEARS',0,355,1350,C.gold,62)}
  else if(v===1){title('THE STOPWATCH NEEDS ASSUMPTIONS');['All wealth starts as cash','No returns or inflation','No taxes or changing asset values'].forEach((s,i)=>tag(s,0,-100+i*150,1400,C.paper,40))}
  else if(v===2){title('A FICTIONAL $60,000-A-YEAR SAVER');tag('$1 BILLION',-430,-95,720);tag('~16,700 YEARS',430,-95,720,C.gold,53);text(p,'Save every cent. No living costs, taxes or returns.',0,145,42);text(p,'This is a scale illustration, not a financial plan.',0,260,37)}
  else{title('PAYCHECKS DO NOT EXPLAIN THE WHOLE MAP');calendar(p,-420,50,1,'$60K / YEAR');factory(p,430,40,.85);tag('LOOK AT OWNERSHIP',0,355,1200,C.gold,58)}
 }else if(k==='balance'){
  if(v===0){title('NET WORTH');tag('ASSETS',-520,-80,600,C.blue,57);text(p,'−',0,-80,105);tag('LIABILITIES',520,-80,650,C.gold,57);text(p,'Estimated value less financial obligations',0,160,45);wallet(p,-420,300,.7);house(p,10,270,.45);factory(p,450,260,.45)}
  else if(v===1){house(p,-530,40,.95);tag('HOUSE: $500,000',300,-150,950);tag('MORTGAGE: $300,000',300,0,950);tag('EQUITY: $200,000',300,150,950,C.gold,53);text(p,'Fictional homeowner',-530,300,34)}
  else if(v===2){title('CONVERTING VALUE TAKES A ROUTE');['SELL','BORROW','OTHER CASH'].forEach((s,i)=>{tag(s,-560+i*560,-120,450);if(i===0)house(p,-560,120,.65);else if(i===1)receipt(p,0,110,.55);else wallet(p,560,130,.7)});text(p,'Different terms and consequences',0,350,43)}
  else{title('WE DO NOT KNOW HIS PERSONAL CASH BALANCE');wallet(p,-420,60,1.1);tag('?',-420,-130,340,C.paper,100);tag('ASSETS',390,-130,650);tag('LIABILITIES',390,25,650);tag('SPENDABLE CASH?',390,180,650,C.blue,41)}
 }else if(k==='shares'){
  if(v===0){title('FICTIONAL COMPANY · 1,000 SHARES');for(let i=0;i<100;i++)box(p,-500+(i%10)*110,-170+Math.floor(i/10)*48,74,30,i<20?C.teal:'#d8d2b9',4,C.ink);tag('Each tile = 10 shares',0,390,1000,C.paper,36);text(p,'Owner: 200 shares (colored tiles)',0,-235,38)}
  else if(v===1){title('THE SAME OWNERSHIP, A DIFFERENT PRICE');tag('$100 / SHARE',-450,-150,720);tag('$150 / SHARE',450,-150,720,C.blue);arrow(p,-50,-150,60,-150);tag('COMPANY: $100,000',-450,10,760);tag('COMPANY: $150,000',450,10,760);tag('STAKE: $20,000',-450,175,760,C.gold,45);tag('STAKE: $30,000',450,175,760,C.gold,45)}
  else if(v===2){title('THE STAKE GAINS $10,000 IN VALUE');factory(p,-460,80,.9);wallet(p,440,85,1);tag('VALUATION',-460,-140,630,C.blue,45);tag('CASH PAYMENT?',440,-140,630,C.paper,43);text(p,'No identical transfer to a checking account is shown.',0,340,41)}
  else{title('WHAT MOVED UNDER THE HEADLINE?');['PRICE','ASSET','STAKE'].forEach((s,i)=>tag(s,-550+i*550,0,470,i===0?C.gold:C.paper,53));text(p,'Identify the inputs before interpreting the change.',0,240,45)}
 }else if(k==='percent'){
  if(v===0){title('ONE PERCENT OF THE SELECTED ESTIMATE');tag('1%',-520,-10,420,C.gold,140);tag('$9.229 BILLION',280,-90,1050,C.blue,68);tag('~7.7 MILLION PHONE EQUIVALENTS',240,100,1200,C.paper,45);phone(p,-520,270,.6)}
  else if(v===1){title('A SCALE ILLUSTRATION');tag('One percent of $922.9B',0,-90,1200,C.gold,55);text(p,'Not an observed gain or a prediction',0,110,46);text(p,'Assets do not all move together.',0,220,39)}
  else{title(v===2?'CHECK WHAT WAS DIVIDED':'REPRICING AND PAYMENT DIFFER');tag('CHANGE IN ESTIMATED VALUE',0,-100,1400,C.blue,52);text(p,'÷ elapsed hours',0,50,65);text(p,'This does not establish an hourly paycheck.',0,270,44)}
 }else if(k==='liquidity'){
  if(v===0){title('TURNING ASSETS INTO SPENDING MONEY');receipt(p,-420,50,.95,true);wallet(p,430,90,1);arrow(p,-90,80,190,80);text(p,'How much? How fast? On what terms?',0,355,46)}
  else if(v===1||v===2){title('FICTIONAL BUYERS IN A SMALL MARKET');[['5 shares','$100'],['5 shares','$99'],['10 shares','$98']].forEach(([q,price],i)=>{tag(q,-370,-120+i*150,530);tag(price,370,-120+i*150,530,i===0?C.gold:C.paper,52)});if(v===2)tag('MORE SELLERS NEED MORE BUYERS',0,380,1400,C.blue,39)}
  else if(v===3){title('A SALE HAS CONDITIONS');['PRICE','TIME','TERMS','COSTS'].forEach((s,i)=>tag(s,-610+(i%2)*1220,-90+Math.floor(i/2)*230,650,i%2?C.blue:C.paper,50))}
  else{title('ESTIMATE ≠ GUARANTEED SALE RECEIPT');receipt(p,-470,40,.88);receipt(p,470,40,.88,true);text(p,'≠',0,50,130,C.red)}
 }else if(k==='loan'){
  if(v===0){title('A SECURED LOAN');factory(p,-610,60,.7);money(p,70,40,1);receipt(p,600,90,.7,true);arrow(p,-330,25,-120,25);arrow(p,260,25,400,25);tag('COLLATERAL',-580,330,520);tag('CASH',0,330,420,C.blue);tag('LIABILITY',580,330,520,C.gold)}
  else if(v===1){title('THE LOAN STILL HAS TERMS');calendar(p,-470,30,1.15,'REPAYMENT');tag('INTEREST',330,-140,850);tag('COLLATERAL VALUE',330,30,850);tag('CAN FALL',330,200,850,C.gold,58)}
  else if(v===2){title('A GENERAL FINANCIAL MECHANISM');receipt(p,-400,50,.9,true);tag('NOT A REPORTED MUSK LOAN',300,-40,1000,C.paper,43);text(p,'No undisclosed private bank balance is invented.',200,185,35)}
  else{title('OPTIONS WITH CONDITIONS');wallet(p,0,0,1.1);['TERMS','LIMITS','RISKS'].forEach((s,i)=>tag(s,-570+i*570,270,470,i===2?C.gold:C.paper,48))}
 }else if(k==='company'){
  if(v===0||v===1){title('PERSON AND BUSINESS: DIFFERENT BOXES');box(p,-460,50,750,430,C.paper,15,C.ink);box(p,460,50,750,430,'#dce5d5',15,C.ink);wallet(p,-460,50,1);factory(p,460,45,.78);text(p,'PERSONAL',-460,-110,43);text(p,'CORPORATE',460,-110,43);text(p,'Rights depend on ownership and governance.',0,365,40)}
  else if(v===2){title('KEEP FOUR BOXES SEPARATE');['PERSONAL CASH','OWNERSHIP','OPERATIONS','OBLIGATIONS'].forEach((s,i)=>{box(p,-450+(i%2)*900,-100+Math.floor(i/2)*300,780,230,i===0?C.blue:C.paper,13,C.ink);text(p,s,-450+(i%2)*900,-125+Math.floor(i/2)*300,40)})}
  else{title('A WORKING ORGANIZATION');factory(p,0,0,1);['WAGES','SUPPLIERS','EQUIPMENT','DEBT'].forEach((s,i)=>tag(s,-650+(i%2)*1300,-100+Math.floor(i/2)*260,500,C.paper,39))}
 }else if(k==='gdp'){
  if(v===0){title('A COUNTRY DOES NOT HAVE THIS PRICE TAG');globe(p,0,20,1.25);const tagNode=tag('FOR SALE?',400,210,700,C.gold,60);line(p,[[100,110],[700,310]],C.red,11)}
  else if(v===1){title('CHECK THE UNITS');tag('WEALTH',-460,-130,700,C.gold,57);tag('GDP',460,-130,700,C.blue,57);text(p,'Stock of assets / liabilities',-460,30,37);text(p,'Production during a period',460,30,37);calendar(p,450,250,.6,'A PERIOD');clock(p,-460,225,.75,t)}
  else if(v===2){title('ANNUAL OUTPUT IS NOT A PURCHASE PRICE');globe(p,-500,50,1);['LAND','INSTITUTIONS','PEOPLE'].forEach((s,i)=>tag(s,340,-130+i*160,900,C.paper,42))}
  else{title(v===3?'COST ASSUMPTIONS NEED REAL RESOURCES':'WHAT CAN THE FUNDING MOBILIZE?');['LAND','WORKERS','MATERIALS','APPROVALS'].forEach((s,i)=>tag(s,-470+(i%2)*940,-80+Math.floor(i/2)*230,790,i%2?C.blue:C.paper,44));text(p,'Plus continuing resources and commitments',0,385,40)}
 }else if(k==='project'){
  if(v===0){title('HYPOTHETICAL LABOR BUDGET');text(p,'$1,000,000,000 ÷ $100,000',0,-100,65);tag('10,000 WORKER-YEARS',0,120,1450,C.gold,70);text(p,'Assumed cost per worker-year, not total project cost',0,310,36)}
  else if(v===1){title('SAME FIXED COST ASSUMPTION');tag('1,000 PEOPLE',-430,-60,750,C.blue,55);text(p,'×',0,-60,85);tag('10 YEARS',430,-60,750,C.gold,62);text(p,'10,000 worker-years of funding',0,160,49);text(p,'Premises, equipment and other costs can be additional.',0,320,34)}
  else if(v===2){title('FROM OBJECTS TO OPTIONS');['TEAMS','TIME','VENTURES'].forEach((s,i)=>{tag(s,-570+i*570,-120,470);if(i===0)money(p,-570,100,.9);else if(i===1)clock(p,0,100,1,t);else factory(p,570,70,.6)})}
  else{title('FUNDING DOES NOT GUARANTEE THE RESULT');['SKILLS','COORDINATION','CONSTRAINTS'].forEach((s,i)=>tag(s,-570+i*570,50,490,C.paper,38));text(p,'More options, not unlimited capability',0,300,46)}
 }else{
  if(v===0){cart(p,-430,130,1,12);tag('~770 MILLION',300,-50,1000,C.gold,76);tag('PHONE EQUIVALENTS',300,130,1000,C.paper,47);text(p,'Using the selected dated estimate and price',0,390,35)}
  else if(v===1){title('THE MAP BEHIND THE NUMBER');['ASSETS','DEBT','VALUE','LIQUIDITY','OPTIONS'].forEach((s,i)=>tag(s,-640+(i%3)*640,-100+Math.floor(i/3)*250,570,i===3?C.blue:C.paper,38))}
  else{title('HOW ARE YOU PAYING?');receipt(p,-400,60,.95,true);wallet(p,450,80,1);text(p,'The assets, obligations and choices behind the number',0,370,38)}
 }
}
