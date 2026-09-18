import {C,clamp,dist} from './config.js';import {solid,tileAt} from './world.js';
export class Renderer {
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.radius=C.roomRadius;this.w=0;this.h=0;this.scale=1;}
 resize(){const dpr=Math.min(devicePixelRatio||1,1.5),w=innerWidth,h=innerHeight;if(this.w===w&&this.h===h)return;this.w=w;this.h=h;this.canvas.width=w*dpr;this.canvas.height=h*dpr;this.canvas.style.width=w+'px';this.canvas.style.height=h+'px';this.dpr=dpr;this.scale=clamp(h/670,.66,1.25);}
 circle(x,y,r,color){const c=this.ctx;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
 text(t,x,y,size=11,color='#76877f',align='center'){const c=this.ctx;c.font=`${size}px monospace`;c.textAlign=align;c.fillStyle=color;c.fillText(t,x,y);}
 worldToScreen(x,y,p){return {x:(x-p.x)*this.scale+this.w/2,y:(y-p.y)*this.scale+this.h/2};}
 draw(game,dt){this.resize();const c=this.ctx,s=game.s,p=s.player,w=s.world;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#030706';c.fillRect(0,0,this.w,this.h);
  let zoom=this.scale;if(s.won)zoom*=1-clamp(game.reveal/3,0,.87);const cx=this.w/2,cy=this.h/2;
  c.save();c.translate(cx,cy);c.scale(zoom,zoom);if(s.won&&game.reveal>1){const t=clamp((game.reveal-1)/2,0,1);c.translate(-p.x*(1-t)-(C.width*24)*t,-p.y*(1-t)-(C.height*24)*t);}else c.translate(-p.x,-p.y);
  const room=tileAt(w,Math.floor(p.x/48),Math.floor(p.y/48))===2;const target=room?C.roomRadius:C.corridorRadius;this.radius+=(target-this.radius)*Math.min(1,dt*5);
  c.save();if(!s.won){c.beginPath();const rays=300;for(let i=0;i<=rays;i++){const a=i/rays*Math.PI*2,dx=Math.cos(a),dy=Math.sin(a);let r=0;for(;r<this.radius;r+=5)if(solid(w,p.x+dx*r,p.y+dy*r))break;const x=p.x+dx*r,y=p.y+dy*r;i===0?c.moveTo(x,y):c.lineTo(x,y);}c.closePath();c.clip();}
  const minX=s.won?0:Math.max(0,Math.floor((p.x-this.w/zoom/2)/48)-1),maxX=s.won?C.width:Math.min(C.width,Math.ceil((p.x+this.w/zoom/2)/48)+1),minY=s.won?0:Math.max(0,Math.floor((p.y-this.h/zoom/2)/48)-1),maxY=s.won?C.height:Math.min(C.height,Math.ceil((p.y+this.h/zoom/2)/48)+1);
  for(let y=minY;y<maxY;y++)for(let x=minX;x<maxX;x++){const t=tileAt(w,x,y),px=x*48,py=y*48;if(!t){c.fillStyle='#34423c';c.fillRect(px,py,48,48);c.fillStyle='#19251f';c.fillRect(px+3,py+6,42,40);c.fillStyle='#47554b';c.fillRect(px,py,48,3);continue;}
   c.fillStyle=t===3?'#302824':t===2?'#25312d':'#1a2725';c.fillRect(px,py,48,48);c.strokeStyle='#34423a';c.globalAlpha=.27;c.strokeRect(px+1,py+1,46,46);c.globalAlpha=1;
   const n=(x*137+y*317+w.seed)%19;if(n===0){c.fillStyle='#0e1814';c.fillRect(px+8,py+17,19,4);c.fillRect(px+15,py+14,13,3);}if(t===1&&y===24){c.fillStyle='#9a944e';c.globalAlpha=.35;c.fillRect(px+14,py+22,20,3);c.globalAlpha=1;}
  }
  for(const r of w.rooms){this.text(r.name.toUpperCase(),(r.x+r.w/2)*48,(r.y+1)*48,13,'#64796e');if(r.id!==0&&r.id!==13){for(let k=0;k<2;k++){const x=(r.x+1+k*6)*48,y=(r.y+2)*48;c.fillStyle='#141e1a';c.fillRect(x+3,y+4,45,70);c.fillStyle='#3d4a40';c.fillRect(x,y,40,65);c.fillStyle='#536155';c.fillRect(x+5,y+5,30,15);c.fillStyle='#2c3930';c.fillRect(x+5,y+25,30,33);}}}
  this.text('NORTH / MEDICAL WING',28*48,23*48-9,12,'#6f8778');this.text('CONTAINMENT →',73*48,24*48,18,'#af785b');
  for(const d of w.doors){const x=d.x*48,y=d.y*48;c.fillStyle=d.red?'#9b3b33':'#627167';if(d.open){c.fillRect(x,y,5,48);c.fillRect(x+43,y,5,48);}else{c.fillRect(x,y+3,48,42);c.fillStyle=d.red?'#e25944':'#283c31';c.fillRect(x+5,y+8,38,5);c.fillStyle='#d2bc71';c.fillRect(x+36,y+22,4,8);this.text(d.red?'40 / 2':d.locked?'LOCK':'EXIT',x+24,y+36,8,'#e2d9bf');}}
  for(const l of w.loot){if(l.taken)continue;const colors={ammo:'#d7b766',health:'#82c8b0',metal:'#b5c3c4',antidote:'#b6a1f4',gun:'#e5ce9f'};this.circle(l.x,l.y,16,colors[l.kind]+'18');c.save();c.translate(l.x,l.y);c.strokeStyle=colors[l.kind];c.fillStyle=colors[l.kind];c.lineWidth=2;
   if(l.kind==='gun'){c.fillRect(-14,-5,25,7);c.fillRect(-8,1,7,9);}
   if(l.kind==='ammo'){for(let k=-1;k<=1;k++)c.fillRect(k*6-2,-7,4,14);}
   if(l.kind==='health'){c.strokeRect(-10,-8,20,17);c.fillRect(-2,-5,4,11);c.fillRect(-6,-1,12,3);}
   if(l.kind==='metal'){c.rotate(.5);c.fillRect(-9,-3,18,6);c.rotate(1);c.fillRect(-6,-3,12,6);}
   if(l.kind==='antidote'){c.strokeRect(-5,-8,10,17);c.fillRect(-3,0,6,7);c.fillRect(-3,-12,6,3);}c.restore();
  }
  for(const e of w.enemies){if(e.alive)this.actor(e,'enemy');else if(!e.cured){c.save();c.translate(e.x,e.y);c.rotate(e.angle||0);c.fillStyle='#462f2b';c.fillRect(-13,-7,25,14);c.restore();}}
  for(const a of s.companions){if(a.hp>0)this.actor(a,'ally');else this.circle(a.x,a.y,11,'#364841');}
  const b=w.boss;if(!b.dead){if(b.active&&b.mode==='warn'){c.strokeStyle='#ff7153';c.fillStyle='#ef51332f';c.lineWidth=3;c.setLineDash([8,6]);if(b.attack===0){c.beginPath();c.moveTo(b.x,b.y);c.lineTo(b.tx,b.ty);c.stroke();this.circle(b.tx,b.ty,42,'#ee513344');}else{c.beginPath();c.arc(b.x,b.y,b.attack===1?155:100,0,Math.PI*2);c.fill();c.stroke();}c.setLineDash([]);}this.actor(b,'boss');}
  this.actor(p,'player');for(const bullet of game.bullets){c.strokeStyle=bullet.hostile?'#ff775d':'#ffe0a5';c.lineWidth=bullet.hostile?5:3;c.beginPath();c.moveTo(bullet.x,bullet.y);c.lineTo(bullet.x-bullet.vx*.016,bullet.y-bullet.vy*.016);c.stroke();}
  for(const e of game.effects){c.globalAlpha=e.t/e.max;c.strokeStyle=e.color;c.lineWidth=2;c.beginPath();c.arc(e.x,e.y,e.size*(1-e.t/e.max)+3,0,Math.PI*2);c.stroke();c.globalAlpha=1;}
  if(!s.won){const light=c.createRadialGradient(p.x,p.y,25,p.x,p.y,this.radius);light.addColorStop(0,'#00000000');light.addColorStop(.55,'#02060525');light.addColorStop(1,'#020605e8');c.fillStyle=light;c.fillRect(p.x-this.radius,p.y-this.radius,this.radius*2,this.radius*2);}
  c.restore();c.restore();
  if(game.hit>0){c.fillStyle=`rgba(160,24,20,${game.hit*.23})`;c.fillRect(0,0,this.w,this.h);}
  if(!s.won&&p.gun){const ax=cx+Math.cos(p.angle)*65*zoom,ay=cy+Math.sin(p.angle)*65*zoom;c.strokeStyle='#d9d7aa88';c.lineWidth=1;c.beginPath();c.arc(ax,ay,5,0,Math.PI*2);c.moveTo(ax-9,ay);c.lineTo(ax+9,ay);c.moveTo(ax,ay-9);c.lineTo(ax,ay+9);c.stroke();}
 }
 actor(o,type){const c=this.ctx;c.save();c.translate(o.x,o.y);c.rotate(o.angle||0);const big=type==='boss';if(big)c.scale(2.7,2.7);
 this.circle(2,3,15,'#00000066');const color=type==='player'?'#b8c4b0':type==='ally'?'#77af94':type==='boss'?'#8f5549':'#91664d';
 c.fillStyle=color;c.beginPath();c.ellipse(0,0,11,16,0,0,Math.PI*2);c.fill();c.fillStyle=type==='player'?'#4d6052':'#473f34';c.fillRect(-6,-10,10,20);this.circle(5,0,8,color);c.fillStyle=type==='enemy'||big?'#eab26b':'#d6ead5';c.fillRect(10,-5,2,3);c.fillRect(10,3,2,3);
 if(type==='player'&&o.gun){c.fillStyle='#bec1aa';c.fillRect(7,9,23,4);c.fillStyle='#4a544b';c.fillRect(2,8,14,6);}else if(type==='ally'&&o.weapon){c.fillStyle='#d6cfaf';c.fillRect(0,13,30,4);}else if(type==='enemy'||big){c.strokeStyle='#ad9570';c.lineWidth=3;for(const y of [-16,16]){c.beginPath();c.moveTo(-2,y);c.lineTo(15,y);c.lineTo(20,y*.7);c.stroke();}}
 if(o.armor){c.strokeStyle='#d9ddc3';c.lineWidth=3;c.strokeRect(-6,-10,10,20);}c.restore();if(type==='ally'){c.fillStyle='#182d22';c.fillRect(o.x-16,o.y-24,32,3);c.fillStyle='#96cfae';c.fillRect(o.x-16,o.y-24,32*o.hp/o.maxHP,3);}
 }
}
