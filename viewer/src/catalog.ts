import metaShots from './projects/meta/shots.json';
import trialShots from './projects/trial/shots.json';
import scrollShots from './projects/scroll/shots.json';
import carShots from './projects/car/shots.json';
import creditShots from './projects/credit/cues.json';
export type Episode={id:string;number:string;title:string;description:string;duration:number;voice:string;poster:string;audio:string;captions:string;date:string;scenes:{start:number;end:number;title:string;chapter?:string}[];load:()=>Promise<any>};
const records:Episode[]=[
{id:'meta',number:'05',title:'Why Scam Ads Keep Finding You — Meta’s New Lawsuit Explained',description:'Vụ kiện Rhode Island chống Meta, phản hồi của công ty và hành trình từ quảng cáo hấp dẫn đến nhóm chat đầu tư giả.',duration:430.378375,voice:'Michael · Kokoro',poster:'/images/meta.png',audio:'/audio/meta.mp3',captions:'/captions/meta.srt',date:'23.10.2026',scenes:metaShots,load:()=>import('./projects/meta/project?project')},
{id:'trial',number:'04',title:'Why Your Free Trial Is So Hard to Cancel',description:'Alex chỉ muốn xem một phim tài liệu. Một tháng sau, khoản gia hạn đưa anh vào mê cung tìm nút hủy đăng ký.',duration:390.76441666666665,voice:'Michael · Kokoro',poster:'/images/trial.png',audio:'/audio/trial.mp3',captions:'/captions/trial.srt',date:'23.10.2026',scenes:trialShots,load:()=>import('./projects/trial/project?project')},
{id:'scroll',number:'03',title:'Why You Keep Scrolling When You’re Not Even Having Fun',description:'Alex định lướt điện thoại hai phút trước khi ngủ. Điều gì khiến lần lướt tiếp theo cứ hấp dẫn, ngay cả khi niềm vui đã hết?',duration:415.9024166666667,voice:'Michael · Kokoro',poster:'/images/scroll.png',audio:'/audio/scroll.mp3',captions:'/captions/scroll.srt',date:'23.10.2026',scenes:scrollShots,load:()=>import('./projects/scroll/project?project')},
{id:'car',number:'02',title:'Your $30,000 Car Costs More Than You Think',description:'Theo chân Alex qua đại lý, cây xăng và garage để khám phá chi phí thật của một chiếc xe trong 5 năm.',duration:511.2049583333,voice:'Michael · Kokoro',poster:'/images/car.png',audio:'/audio/car.mp3',captions:'/captions/car.srt',date:'23.10.2026',scenes:carShots,load:()=>import('./projects/car/project?project')},
{id:'credit',number:'01',title:'Why Your Credit Card Balance Barely Moves',description:'Khoản trả $200 thực sự đi đâu? Theo dõi tiền lãi, tiền gốc và những khoản mua sắm mới.',duration:471.725,voice:'Giọng đọc gốc',poster:'/images/credit.jpg',audio:'/audio/credit.mp3',captions:'/captions/credit.srt',date:'23.10.2026',scenes:creditShots,load:()=>import('./projects/credit/project?project')},
];

const asset=(path:string)=>import.meta.env.BASE_URL+path.replace(/^\//,'');
export const episodes:Episode[]=records.map(ep=>({...ep,poster:asset(ep.poster),audio:asset(ep.audio),captions:asset(ep.captions)}));
