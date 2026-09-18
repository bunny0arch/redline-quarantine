export const C = Object.freeze({ tile:48, width:104, height:48, playerHP:200, playerSpeed:155, enemyHP:40, enemyDamage:20, enemySpeed:102, bulletDamage:20, bulletSpeed:700, magazine:12, fireDelay:.22, reloadTime:1.25, heal:80, companionHP:65, companionDamage:9, weaponDamage:22, armorHP:35, keyCost:6, weaponCost:12, armorCost:10, roomRadius:105, corridorRadius:384, killsRequired:40, curesRequired:2, bossHP:720, saveVersion:1 });
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const timeText=s=>`${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
export function rng(seed){let a=seed>>>0; return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
