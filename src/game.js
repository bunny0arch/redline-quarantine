import {C,clamp,dist} from './config.js';import {newState} from './state.js';import {clearLine,move,flowField,steer,solid} from './world.js';
export class Game {
 constructor({notify=()=>{},sound=()=>{},save=()=>{}}={}){this.notify=notify;this.sound=sound;this.save=save;this.reset(newState());}
 reset(state){this.s=state;this.bullets=[];this.effects=[];this.cool=0;this.reload=0;this.hit=0;this.melee=0;this.flowTimer=0;this.flow=null;this.autosave=0;this.shake=0;this.reveal=state.won?4:0;this.paused=true;this.endingShown=false;}
 message(t){this.notify(t);}
 effect(x,y,color='#ef765e',size=22){this.effects.push({x,y,color,size,t:.5,max:.5});}
 requestSave(){this.autosave=.7;}
 fire(){const p=this.s.player;if(this.paused||!p.gun||this.cool>0||this.reload>0||this.s.won)return;if(p.mag<=0){this.cool=.3;this.message('Magazine empty · reload [R]');return;}p.mag--;this.cool=C.fireDelay;const a=p.angle;this.bullets.push({x:p.x+Math.cos(a)*20,y:p.y+Math.sin(a)*20,vx:Math.cos(a)*C.bulletSpeed,vy:Math.sin(a)*C.bulletSpeed,life:.8});this.shake=3;this.sound('shot');this.effect(p.x+Math.cos(a)*24,p.y+Math.sin(a)*24,'#ffd793',13);}
 reloadGun(){const p=this.s.player;if(!p.gun||this.reload||p.mag>=C.magazine||p.reserve<=0)return;this.reload=C.reloadTime;this.sound('reload');this.message('Reloading…');}
 heal(){const p=this.s.player;if(p.kits<=0)return this.message('No medical kits');if(p.hp>=C.playerHP)return this.message('Health is already full');p.kits--;p.hp=Math.min(C.playerHP,p.hp+C.heal);this.effect(p.x,p.y,'#83dcc7',48);this.sound('heal');this.requestSave();}
 damage(target,amount){if(target===this.s.player){if(this.hit>0)return;this.hit=.65;this.shake=8;this.sound('hurt');}target.hp=Math.max(0,target.hp-amount);this.effect(target.x,target.y);}
 kill(e){if(!e.alive)return;e.alive=false;this.s.stats.kills++;this.s.world.loot.push({id:'drop-'+e.id,kind:'metal',amount:3,x:e.x,y:e.y,taken:false});this.effect(e.x,e.y,'#a64844',30);this.sound('death');if(this.s.stats.kills%5===0)this.requestSave();}
 hitEnemy(e,dmg){e.hp-=dmg;e.alert=8;this.effect(e.x,e.y);if(e.hp<=0)this.kill(e);}
 interact(){const s=this.s,p=s.player,w=s.world;
 const gun=w.loot.find(l=>l.kind==='gun'&&!l.taken&&dist(p,l)<66);if(gun){gun.taken=true;p.gun=true;p.mag=12;p.reserve=18;this.sound('pickup');this.message('Sidearm recovered · 30 rounds. Find the corridor exit.');this.requestSave();return;}
 const d=w.doors.filter(d=>!d.open).find(d=>dist(p,{x:d.x*48+24,y:d.y*48+24})<80);
 if(!d)return this.message('Move closer to a door or the sidearm');
 if(d.red){if(s.stats.kills<C.killsRequired||s.stats.cured<C.curesRequired)return this.message(`RED DOOR · ${s.stats.kills}/40 kills · ${s.stats.cured}/2 cured`);d.open=true;this.message('Containment breached. The heart is awake.');}
 else{if(d.locked){if(!p.keys)return this.message('Locked · craft a key for 6 metal [C]');p.keys--;}d.open=true;}
 s.stats.doors++;this.sound('door');this.flowTimer=0;this.requestSave();
 }
 cure(){const s=this.s,p=s.player;if(!p.antidotes)return this.message('No antidote · search the marked supply canisters');const e=s.world.enemies.filter(e=>e.alive&&dist(p,e)<140&&clearLine(s.world,p,e)).sort((a,b)=>dist(p,a)-dist(p,b))[0];if(!e)return this.message('Get within antidote range of a creature');e.alive=false;e.cured=true;p.antidotes--;s.stats.cured++;s.companions.push({id:s.stats.cured,x:e.x,y:e.y,hp:C.companionHP,maxHP:C.companionHP,weapon:false,armor:false,cd:0,angle:0});this.effect(e.x,e.y,'#a4ffca',70);this.message('Creature cured. Your ally will follow and fight.');this.sound('cure');this.requestSave();}
 craft(type,id){const p=this.s.player;const cost=type==='key'?C.keyCost:type==='weapon'?C.weaponCost:C.armorCost;const a=this.s.companions.find(a=>a.id===id&&a.hp>0);
 if(type!=='key'&&(!a||a[type]))return false;if(p.metal<cost){this.message('Not enough metal artifacts');return false;}p.metal-=cost;if(type==='key')p.keys++;else if(type==='weapon')a.weapon=true;else{a.armor=true;a.hp+=C.armorHP;a.maxHP+=C.armorHP;}this.sound('craft');this.requestSave();return true;}
 shove(){if(this.melee>0)return;this.melee=.9;const p=this.s.player;this.effect(p.x+Math.cos(p.angle)*25,p.y+Math.sin(p.angle)*25,'#bac1b5',38);for(const e of this.s.world.enemies)if(e.alive&&dist(p,e)<62&&clearLine(this.s.world,p,e)){this.hitEnemy(e,8);move(this.s.world,e,Math.cos(p.angle)*16,Math.sin(p.angle)*16);}}
 tick(dt,input={x:0,y:0,fire:false}){
  if(this.paused)return;const s=this.s,p=s.player,w=s.world;
  if(s.won){this.reveal+=dt;return;}if(p.hp<=0)return;s.stats.time+=dt;
  this.cool=Math.max(0,this.cool-dt);this.hit=Math.max(0,this.hit-dt);this.melee=Math.max(0,this.melee-dt);this.shake=Math.max(0,this.shake-28*dt);
  if(this.reload>0){this.reload-=dt;if(this.reload<=0){const n=Math.min(C.magazine-p.mag,p.reserve);p.mag+=n;p.reserve-=n;this.reload=0;}}
  let ix=input.x||0,iy=input.y||0,n=Math.hypot(ix,iy);if(n>1){ix/=n;iy/=n;}move(w,p,ix*C.playerSpeed*dt,iy*C.playerSpeed*dt);
  if(input.fire)this.fire();this.flowTimer-=dt;if(this.flowTimer<=0){this.flow=flowField(w,p);this.flowTimer=.4;}
  for(const r of w.rooms)if(!r.explored&&p.x>r.x*48&&p.x<(r.x+r.w)*48&&p.y>r.y*48&&p.y<(r.y+r.h)*48){r.explored=true;s.stats.rooms++;this.message(r.id===0?'Where is everyone? My sidearm… on the floor.':r.name.toUpperCase());this.requestSave();}
  for(const l of w.loot){if(l.taken||l.kind==='gun'||dist(p,l)>30)continue;l.taken=true;const k={ammo:'reserve',health:'kits',metal:'metal',antidote:'antidotes'}[l.kind];p[k]+=l.amount;this.sound('pickup');this.message(`+${l.amount} ${l.kind==='metal'?'metal artifacts':l.kind}`);this.requestSave();}
  for(const e of w.enemies){if(!e.alive)continue;e.cd=Math.max(0,e.cd-dt);e.alert=Math.max(0,(e.alert||0)-dt);if(dist(e,p)<360&&clearLine(w,e,p))e.alert=6;
   let target=p;const ally=s.companions.filter(a=>a.hp>0&&dist(a,e)<75&&clearLine(w,e,a)).sort((a,b)=>dist(e,a)-dist(e,b))[0];if(ally){target=ally;e.alert=3;}
   if(e.alert>0){if(dist(e,target)>30)steer(w,e,target,this.flow,C.enemySpeed,dt);else if(e.cd<=0&&clearLine(w,e,target)){this.damage(target,target.armor?12:C.enemyDamage);e.cd=.95;}}
  }
  // Separate nearby bodies without allowing collision displacement through walls.
  const live=w.enemies.filter(e=>e.alive&&dist(e,p)<650);for(let i=0;i<live.length;i++)for(let j=i+1;j<live.length;j++){const a=live[i],b=live[j],d=dist(a,b);if(d>0&&d<25){const x=(a.x-b.x)/d*15*dt,y=(a.y-b.y)/d*15*dt;move(w,a,x,y);move(w,b,-x,-y);}}
  for(let i=0;i<s.companions.length;i++){const a=s.companions[i];if(a.hp<=0)continue;a.cd=Math.max(0,a.cd-dt);let target=live.filter(e=>dist(a,e)<180&&clearLine(w,a,e)).sort((x,y)=>dist(a,x)-dist(a,y))[0];if(!target&&w.boss.active&&!w.boss.dead&&dist(a,w.boss)<280)target=w.boss;
   if(target){const reach=target===w.boss?58:34;if(dist(a,target)>reach)steer(w,a,target,this.flow,165,dt);else if(a.cd<=0){const dmg=a.weapon?C.weaponDamage:C.companionDamage;if(target===w.boss){target.hp-=dmg;if(target.hp<=0)this.win();}else this.hitEnemy(target,dmg);a.cd=.85;this.sound('melee');}}
   else{const angle=i*2.4+Math.PI,target={x:p.x+Math.cos(angle)*52,y:p.y+Math.sin(angle)*52};if(dist(a,p)>100)steer(w,a,p,this.flow,185,dt);else if(clearLine(w,a,target)&&dist(a,target)>14)steer(w,a,target,this.flow,125,dt);}
  }
  for(const b of this.bullets){b.life-=dt;const steps=Math.ceil(Math.hypot(b.vx,b.vy)*dt/7);for(let i=0;i<steps&&b.life>0;i++){b.x+=b.vx*dt/steps;b.y+=b.vy*dt/steps;if(solid(w,b.x,b.y)){b.life=0;this.effect(b.x,b.y,'#a4aca2',9);break;}
    if(b.hostile){if(dist(b,p)<17){this.damage(p,24);b.life=0;}}else{const e=live.find(e=>e.alive&&dist(e,b)<18);if(e){this.hitEnemy(e,C.bulletDamage);b.life=0;}else if(w.boss.active&&!w.boss.dead&&dist(b,w.boss)<37){w.boss.hp-=C.bulletDamage;b.life=0;this.effect(b.x,b.y);if(w.boss.hp<=0)this.win();}}
   }}this.bullets=this.bullets.filter(b=>b.life>0);
  this.effects.forEach(e=>e.t-=dt);this.effects=this.effects.filter(e=>e.t>0);
  if(!s.won)this.bossTick(dt);if(this.autosave>0){this.autosave-=dt;if(this.autosave<=0&&p.hp>0)this.save();}
 }
 bossTick(dt){const s=this.s,p=s.player,w=s.world,b=w.boss;if(b.dead)return;if(!b.active){if(p.x>90*48){b.active=true;b.clock=2;this.message('THE HEART · Move out of the red attack markers');this.sound('boss-awaken');this.save();}return;}
 const phase=b.hp<C.bossHP*.25?3:b.hp<C.bossHP*.5?2:1;if(phase!==b.phase){b.phase=phase;this.sound('boss-phase');this.effect(b.x,b.y,phase===3?'#ff9f58':'#ff5b46',phase===3?210:170);this.message(phase===2?'THE HEART SHEDS ITS SKIN · Keep moving.':'THE HEART IS BREAKING · It calls the dead back.');if(phase===3&&!b.summoned){b.summoned=true;const first=w.enemies.reduce((n,e)=>Math.max(n,Number.isInteger(e.id)?e.id:n),-1)+1;for(let i=0;i<4;i++)w.enemies.push({id:first+i,x:(93+i*2)*48+24,y:(20+(i%2)*10)*48+24,hp:40,alive:true,room:13,cd:0,alert:6});this.message('REINFORCEMENTS · The containment walls are opening.');}}
 b.clock-=dt;const enraged=b.phase===3,stalkSpeed=enraged?108:b.phase===2?80:62,stalkDelay=enraged?1.1:b.phase===2?1.4:2,restDelay=enraged?.9:1.5;
 if(b.mode==='stalk'){steer(w,b,p,null,stalkSpeed,dt);if(b.clock<=0){b.attack=(b.attack+1)%(enraged?4:3);b.tx=p.x;b.ty=p.y;b.mode='warn';b.clock=enraged?.75:1;this.sound('warning');}}
 else if(b.mode==='warn'&&b.clock<=0){if(b.attack===0){b.mode='charge';b.clock=enraged?.52:.65;const d=Math.hypot(b.tx-b.x,b.ty-b.y)||1;b.vx=(b.tx-b.x)/d*(enraged?590:490);b.vy=(b.ty-b.y)/d*(enraged?590:490);}
  else if(b.attack===1){this.effect(b.x,b.y,'#ff5b46',enraged?190:170);for(const a of [p,...s.companions])if(a.hp>0&&dist(a,b)<(enraged?175:155)&&clearLine(w,b,a))this.damage(a,a.armor?enraged?30:25:enraged?48:40);b.mode='rest';b.clock=restDelay;}
  else{const count=enraged?16:10,speed=enraged?230:180;for(let i=0;i<count;i++){const a=i*Math.PI*2/count;this.bullets.push({x:b.x,y:b.y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,hostile:true,life:3});}if(enraged)this.sound('boss-burst');b.mode='rest';b.clock=restDelay;}}
 else if(b.mode==='charge'){move(w,b,b.vx*dt,b.vy*dt,30);for(const a of [p,...s.companions])if(a.hp>0&&dist(a,b)<55&&(a===p||!b.struck?.includes(a.id))){this.damage(a,a.armor?enraged?30:24:enraged?44:35);if(a!==p)(b.struck??=[]).push(a.id);}if(b.clock<=0){b.mode='rest';b.clock=restDelay;b.struck=[];}}
 else if(b.mode==='rest'&&b.clock<=0){b.mode='stalk';b.clock=stalkDelay;}
 }
 win(){if(this.s.won)return;this.s.world.boss.hp=0;this.s.world.boss.dead=true;this.s.won=true;this.bullets=[];this.reveal=0;this.effect(this.s.world.boss.x,this.s.world.boss.y,'#c4ffde',220);this.sound('boss-death');this.sound('win');this.message('Containment lifted. Let there be light.');this.save();}
}
