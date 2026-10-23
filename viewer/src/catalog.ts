import carShots from './projects/car/shots.json';
import creditShots from './projects/credit/cues.json';
export type Episode={id:string;number:string;title:string;description:string;duration:number;voice:string;poster:string;audio:string;captions:string;date:string;scenes:{start:number;end:number;title:string;chapter?:string}[];load:()=>Promise<any>};
const records:Episode[]=[
{id:'car',number:'02',title:'Your $30,000 Car Costs More Than You Think',description:'Theo chân Alex qua đại lý, cây xăng và garage để khám phá chi phí thật của một chiếc xe trong 5 năm.',duration:511.2049583333,voice:'Michael · Kokoro',poster:'/images/car.png',audio:'/audio/car.mp3',captions:'/captions/car.srt',date:'23.10.2026',scenes:carShots,load:()=>import('./projects/car/project?project')},
{id:'credit',number:'01',title:'Why Your Credit Card Balance Barely Moves',description:'Khoản trả $200 thực sự đi đâu? Theo dõi tiền lãi, tiền gốc và những khoản mua sắm mới.',duration:471.725,voice:'Giọng đọc gốc',poster:'/images/credit.jpg',audio:'/audio/credit.mp3',captions:'/captions/credit.srt',date:'23.10.2026',scenes:creditShots,load:()=>import('./projects/credit/project?project')},
];

const asset=(path:string)=>import.meta.env.BASE_URL+path.replace(/^\//,'');
export const episodes:Episode[]=records.map(ep=>({...ep,poster:asset(ep.poster),audio:asset(ep.audio),captions:asset(ep.captions)}));
