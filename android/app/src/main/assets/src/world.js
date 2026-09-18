import {C,rng} from './config.js';
export function createWorld(seed){
 const random=rng(seed), tiles=Array(C.width*C.height).fill(0), rooms=[],doors=[],enemies=[],loot=[];
 const carve=(x,y,w,h,n=1)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)tiles[j*C.width+i]=n;};
 const item=(kind,x,y,amount=1)=>loot.push({id:loot.length,kind,x:x*48+24,y:y*48+24,amount,taken:false});
 const spawn=(x,y,room=-1)=>enemies.push({id:enemies.length,x:x*48+24,y:y*48+24,hp:C.enemyHP,alive:true,room,cd:0,alert:0});
 carve(3,22,86,5); carve(3,19,6,3); carve(2,28,8,8,2); carve(6,27,1,1);
 rooms.push({id:0,name:'Recovery',x:2,y:28,w:8,h:8,explored:false});
 doors.push({id:0,x:6,y:27,open:false,locked:false,room:0});
 item('gun',6,31);item('health',4,30,2);
 for(let k=0;k<6;k++)for(let side=0;side<2;side++){
  const x=13+k*12,y=side?28:12,id=rooms.length;
  carve(x,y,10,9,2);const dy=side?27:21; carve(x+4,dy,1,1);
  rooms.push({id,name:['Triage','Cold storage','Isolation','Records','Diagnostics','Observation','Quarantine','Surgery','Archive','Specimens','Containment','Generator'][id-1],x,y,w:10,h:9,explored:false});
  doors.push({id:doors.length,x:x+4,y:dy,open:false,locked:true,room:id});
  // The first side room is always empty; the remainder are seeded once.
  if(id===1)continue;
  const roll=random();
  if(roll>.17){item('ammo',x+3,y+4,18+Math.floor(random()*3)*6);if(random()<.5)item('health',x+7,y+6);}
  if([4,9].includes(id))item('antidote',x+6,y+3);
  if(roll>.35)for(let e=0;e<2+Math.floor(random()*3);e++)spawn(x+2+e*1.7,y+2+random()*4,id);
 }
 // A finite, guaranteed supply route prevents random room rolls from blocking progress.
 for(let k=0;k<15;k++){
  const x=12+k*4.7;
  spawn(x,23+(k%3));spawn(x+1.4,24.5+(k%2)*.5);
  item('ammo',x,26,12);if(k%3===0)item('health',x+1,22);
 }
 for(let k=0;k<20;k++)spawn(20+k*3.3,24+(k%2));
 item('antidote',12,22);item('antidote',35,26);item('antidote',62,22);
 item('ammo',9,22,24);item('metal',9,25,6);
 carve(89,24,1,1);carve(90,16,12,18,3);
 rooms.push({id:13,name:'The heart',x:90,y:16,w:12,h:18,explored:false});
 doors.push({id:13,x:89,y:24,open:false,locked:true,red:true,room:13});
 item('ammo',91,25,96);item('health',91,23,2);
 return {seed,tiles,rooms,doors,enemies,loot,boss:{x:97*48,y:25*48,hp:C.bossHP,maxHP:C.bossHP,active:false,dead:false,phase:1,mode:'stalk',clock:2,tx:0,ty:0,attack:0}};
}
export const tileAt=(w,x,y)=>x<0||y<0||x>=C.width||y>=C.height?0:w.tiles[y*C.width+x];
export function solid(w,x,y){const tx=Math.floor(x/C.tile),ty=Math.floor(y/C.tile);return !tileAt(w,tx,ty)||w.doors.some(d=>!d.open&&d.x===tx&&d.y===ty);}
export function clearLine(w,a,b){const d=Math.hypot(b.x-a.x,b.y-a.y),n=Math.ceil(d/8);for(let i=1;i<=n;i++)if(solid(w,a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false;return true;}
export function move(w,o,dx,dy,r=13){
 const free=(x,y)=>!solid(w,x-r,y-r)&&!solid(w,x+r,y-r)&&!solid(w,x-r,y+r)&&!solid(w,x+r,y+r);
 if(free(o.x+dx,o.y))o.x+=dx;if(free(o.x,o.y+dy))o.y+=dy;
}
// Shared BFS flow field. Updated a few times/second, never one A* per enemy per frame.
export function flowField(w,target){const result=new Int16Array(C.width*C.height).fill(-1),sx=Math.floor(target.x/48),sy=Math.floor(target.y/48),queue=[sy*C.width+sx];result[queue[0]]=0;
 for(let q=0;q<queue.length;q++){const id=queue[q],x=id%C.width,y=Math.floor(id/C.width);for(const [nx,ny] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]]){const k=ny*C.width+nx;if(nx<0||ny<0||nx>=C.width||ny>=C.height||result[k]>=0||solid(w,nx*48+24,ny*48+24))continue;result[k]=result[id]+1;queue.push(k);}}return result;}
export function steer(w,o,target,field,speed,dt){let tx=target.x,ty=target.y;
 if(!clearLine(w,o,target)&&field){const x=Math.floor(o.x/48),y=Math.floor(o.y/48);let best=32767;for(const [nx,ny] of [[x,y],[x+1,y],[x-1,y],[x,y+1],[x,y-1]]){const v=field[ny*C.width+nx];if(v>=0&&v<best){best=v;tx=nx*48+24;ty=ny*48+24;}}}
 const d=Math.hypot(tx-o.x,ty-o.y);if(d>3)move(w,o,(tx-o.x)/d*speed*dt,(ty-o.y)/d*speed*dt);o.angle=Math.atan2(ty-o.y,tx-o.x);
}
