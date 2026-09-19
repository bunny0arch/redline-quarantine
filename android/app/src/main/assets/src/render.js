import {C,clamp,dist} from './config.js';import {solid,tileAt} from './world.js';import {FacilityAssets,facilityProps} from './assets.js';
export class Renderer {
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.radius=C.roomRadius;this.w=0;this.h=0;this.scale=1;this.assets=new FacilityAssets();this.props=[];this.propWorld=null;}
 resize(){const dpr=Math.min(devicePixelRatio||1,1.5),w=innerWidth,h=innerHeight;if(this.w===w&&this.h===h)return;this.w=w;this.h=h;this.canvas.width=w*dpr;this.canvas.height=h*dpr;this.canvas.style.width=w+'px';this.canvas.style.height=h+'px';this.dpr=dpr;this.scale=clamp(h/670,.66,1.25);}
 circle(x,y,r,color){const c=this.ctx;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
 text(t,x,y,size=11,color='#76877f',align='center'){const c=this.ctx;c.font=`${size}px monospace`;c.textAlign=align;c.fillStyle=color;c.fillText(t,x,y);}
 worldToScreen(x,y,p){return {x:(x-p.x)*this.scale+this.w/2,y:(y-p.y)*this.scale+this.h/2};}
 draw(game,dt){this.resize();const c=this.ctx,s=game.s,p=s.player,w=s.world;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#030706';c.fillRect(0,0,this.w,this.h);
  let zoom=this.scale;if(s.won)zoom*=1-clamp(game.reveal/3,0,.87);const cx=this.w/2,cy=this.h/2;
  c.save();c.translate(cx,cy);c.scale(zoom,zoom);if(s.won&&game.reveal>1){const t=clamp((game.reveal-1)/2,0,1);c.translate(-p.x*(1-t)-(C.width*24)*t,-p.y*(1-t)-(C.height*24)*t);}else c.translate(-p.x,-p.y);
  const room=tileAt(w,Math.floor(p.x/48),Math.floor(p.y/48))===2;const target=room?C.roomRadius:C.corridorRadius;this.radius+=(target-this.radius)*Math.min(1,dt*5);
  c.save();if(!s.won){c.beginPath();const rays=300;for(let i=0;i<=rays;i++){const a=i/rays*Math.PI*2,dx=Math.cos(a),dy=Math.sin(a);let r=0;for(;r<this.radius;r+=5)if(solid(w,p.x+dx*r,p.y+dy*r)){for(let edge=0;edge<16&&solid(w,p.x+dx*(r+2),p.y+dy*(r+2));edge+=2)r+=2;break;}const x=p.x+dx*r,y=p.y+dy*r;i===0?c.moveTo(x,y):c.lineTo(x,y);}c.closePath();c.clip();}
  const minX=s.won?0:Math.max(0,Math.floor((p.x-this.w/zoom/2)/48)-1),maxX=s.won?C.width:Math.min(C.width,Math.ceil((p.x+this.w/zoom/2)/48)+1),minY=s.won?0:Math.max(0,Math.floor((p.y-this.h/zoom/2)/48)-1),maxY=s.won?C.height:Math.min(C.height,Math.ceil((p.y+this.h/zoom/2)/48)+1);
  this.environment(w,minX,maxX,minY,maxY);
  for(const d of w.doors){const x=d.x*48,y=d.y*48;c.fillStyle=d.red?'#9b3b33':'#627167';if(d.open){c.fillRect(x,y,5,48);c.fillRect(x+43,y,5,48);}else{c.fillRect(x,y+3,48,42);this.sprite('door',x+24,y+22,48,0,false);c.fillStyle=d.red?'#e25944':'#283c31';c.fillRect(x+5,y+8,38,5);c.fillStyle='#d2bc71';c.fillRect(x+36,y+22,4,8);this.text(d.red?'40 / 2':d.locked?'LOCK':'EXIT',x+24,y+36,8,'#e2d9bf');}}
  for(const l of w.loot){if(l.taken)continue;const colors={ammo:'#d7b766',health:'#82c8b0',metal:'#b5c3c4',antidote:'#b6a1f4',gun:'#e5ce9f'};this.circle(l.x,l.y,18,colors[l.kind]+'15');this.atlas({gun:4,ammo:5,health:6,antidote:7,metal:8}[l.kind],l.x,l.y,l.kind==='gun'?42:34);}
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
 sprite(name,x,y,width,angle=0,shadow=true){const c=this.ctx,im=this.assets.images[name];if(!im)return;const h=width*im.height/im.width;c.save();c.translate(x,y);c.rotate(angle);if(shadow){c.globalAlpha=.55;const sh=this.assets.shadow(name);if(sh)c.drawImage(sh,-width/2+5,-h/2+9,width,h);c.globalAlpha=1;}c.drawImage(im,-width/2,-h/2,width,h);c.restore();}
 environment(w,minX,maxX,minY,maxY){const c=this.ctx;
  for(let y=minY;y<maxY;y++)for(let x=minX;x<maxX;x++){
   const t=tileAt(w,x,y),px=x*48,py=y*48;
   if(!t){c.fillStyle=this.assets.pattern(c,'plaster')||'#333b3e';c.fillRect(px,py,48,48);c.fillStyle='#0a1017b8';c.fillRect(px,py,48,48);
    const south=tileAt(w,x,y+1),east=tileAt(w,x+1,y),west=tileAt(w,x-1,y),north=tileAt(w,x,y-1);
    if(south){c.fillStyle='#050b10b0';c.fillRect(px,py+48,48,16);c.fillStyle='#59616a';c.fillRect(px,py+35,48,3);c.fillStyle='#202a31';c.fillRect(px,py+38,48,10);c.fillStyle='#84908e';c.fillRect(px+5,py+42,3,3);}
    if(north){c.fillStyle='#606b6d';c.fillRect(px,py+1,48,3);c.fillStyle='#0c151bd0';c.fillRect(px,py-8,48,8);}
    if(east){c.fillStyle='#424e53';c.fillRect(px+44,py,4,48);}
    if(west){c.fillStyle='#313e46';c.fillRect(px,py,4,48);}continue;
   }
   c.fillStyle=this.assets.pattern(c,t===3?'steel':'concrete')||'#394342';c.fillRect(px,py,48,48);
   c.fillStyle=t===3?'#1d121dcc':t===2?'#101923b5':'#101c24b0';c.fillRect(px,py,48,48);
   // Large slabs avoid the generic tiny-square tile appearance.
   if(x%3===0){c.fillStyle='#070c1155';c.fillRect(px,py,1.5,48);}if(y%3===0){c.fillStyle='#070c1160';c.fillRect(px,py,48,1.5);}
   const n=((Math.imul(x+1,374761393)^Math.imul(y+1,668265263)^w.seed)>>>0)%29;
   if(n<3){c.save();c.globalAlpha=.13;c.beginPath();c.moveTo(px+9,py+8);c.bezierCurveTo(px+39,py-5,px+37,py+19,px+30,py+27);c.bezierCurveTo(px+17,py+43,px-5,py+33,px+9,py+8);c.clip();c.fillStyle=this.assets.pattern(c,'rust')||'#604231';c.fillRect(px,py,48,48);c.restore();}
   if(t===1&&(y===22||y===26)){c.fillStyle='#96907355';c.fillRect(px,py+(y===22?5:40),48,3);c.fillStyle='#0a101bcc';c.fillRect(px+2,py+(y===22?13:29),44,5);}
   if(n===7){c.strokeStyle='#050d1688';c.lineWidth=1;c.beginPath();c.moveTo(px+3,py+13);c.lineTo(px+18,py+23);c.lineTo(px+13,py+31);c.lineTo(px+40,py+39);c.stroke();}
  }
  if(this.propWorld!==w){this.props=facilityProps(w);this.propWorld=w;}
  for(const r of w.rooms){const x=(r.x+r.w/2)*48,y=(r.y+.48)*48;if(x<minX*48-300||x>maxX*48+300||y<minY*48-500||y>maxY*48+500)continue;
   c.fillStyle='#070f16';c.fillRect(x-83,y-13,166,26);c.strokeStyle='#687c7e55';c.strokeRect(x-83,y-13,166,26);this.text(String(r.id).padStart(2,'0')+' / '+r.name.toUpperCase(),x,y+4,10,'#819ca3');
   // Wall fixtures: light stays inside the same visibility clipping mask.
   const lx=(r.x+1)*48,ly=(r.y+.35)*48;const glow=c.createRadialGradient(lx,ly,1,lx,ly,80);glow.addColorStop(0,r.id%3===0?'#f3a76322':'#76b8d322');glow.addColorStop(1,'#648ab000');c.fillStyle=glow;c.fillRect(lx-80,ly-80,160,160);c.fillStyle=r.id%3===0?'#b89a75':'#9ec1c6';c.fillRect(lx-16,ly,32,3);
  }
  for(const p of this.props)if(p.x>minX*48-160&&p.x<maxX*48+160&&p.y>minY*48-180&&p.y<maxY*48+180)this.sprite(p.name,p.x,p.y,p.width,p.angle);
  this.text('OPERATIONS / SERVICE SPINE',28*48,23*48-9,12,'#6b8a96');this.text('RESTRICTED  →',73*48,24*48,18,'#ad9270');
 }
 atlas(index,x,y,size,angle=0){const im=this.assets.images.combat;if(!im)return;const c=this.ctx,cell=im.width/3;c.save();c.translate(x,y);c.rotate(angle);c.drawImage(im,(index%3)*cell,Math.floor(index/3)*cell,cell,cell,-size/2,-size/2,size,size);c.restore();}
 actor(o,type){const c=this.ctx,big=type==='boss',size=big?114:67;this.circle(o.x+3,o.y+7,big?34:18,'#00000066');
  this.atlas(type==='player'?0:type==='ally'?3:big?2:1,o.x,o.y,size,o.angle||0);
  if(type==='player'&&o.gun){const a=o.angle||0;this.atlas(4,o.x+Math.cos(a)*23-Math.sin(a)*4,o.y+Math.sin(a)*23+Math.cos(a)*4,25,a);}
  if(type==='ally'&&o.weapon){c.save();c.translate(o.x,o.y);c.rotate(o.angle||0);c.strokeStyle='#b2aba0';c.lineWidth=4;c.beginPath();c.moveTo(10,16);c.lineTo(31,12);c.stroke();c.restore();}
  if(o.armor){c.strokeStyle='#c0c7aa88';c.lineWidth=2;c.beginPath();c.arc(o.x,o.y,19,(o.angle||0)+2,(o.angle||0)+4.2);c.stroke();}
  if(type==='ally'){c.fillStyle='#182d22';c.fillRect(o.x-16,o.y-30,32,3);c.fillStyle='#96cfae';c.fillRect(o.x-16,o.y-30,32*o.hp/o.maxHP,3);}
 }
}
