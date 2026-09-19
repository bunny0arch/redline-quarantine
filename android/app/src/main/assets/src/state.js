import {C} from './config.js';import {createWorld} from './world.js';
const finite=(v,min=-Infinity,max=Infinity)=>Number.isFinite(v)&&v>=min&&v<=max;
const bool=v=>typeof v==='boolean';
const point=o=>o&&finite(o.x)&&finite(o.y);
function validWorld(w){
 if(!w||!Array.isArray(w.tiles)||w.tiles.length!==C.width*C.height||!Array.isArray(w.rooms)||!Array.isArray(w.doors)||!Array.isArray(w.enemies)||!Array.isArray(w.loot)||!w.boss)return false;
 if(!finite(w.seed,0)||!w.rooms.every(r=>Number.isInteger(r.id)&&typeof r.name==='string'&&finite(r.x)&&finite(r.y)&&finite(r.w,1)&&finite(r.h,1)&&bool(r.explored)))return false;
 if(!w.doors.every(d=>Number.isInteger(d.id)&&finite(d.x)&&finite(d.y)&&bool(d.open)&&bool(d.locked)&&Number.isInteger(d.room)&&(!('red' in d)||bool(d.red))))return false;
 if(!w.enemies.every(e=>Number.isInteger(e.id)&&point(e)&&finite(e.hp,0)&&bool(e.alive)&&(!('room' in e)||Number.isInteger(e.room))&&finite(e.cd,0)&&finite(e.alert,0)&&(!('cured' in e)||bool(e.cured))))return false;
 if(!w.loot.every(l=>(typeof l.id==='string'||Number.isInteger(l.id))&&point(l)&&typeof l.kind==='string'&&finite(l.amount,0)&&bool(l.taken)))return false;
 const b=w.boss;return point(b)&&finite(b.hp,0)&&finite(b.maxHP,1)&&b.hp<=b.maxHP&&bool(b.active)&&bool(b.dead)&&Number.isInteger(b.phase)&&finite(b.clock)&&typeof b.mode==='string';
}
function validPlayer(p){return point(p)&&finite(p.hp,0,C.playerHP)&&bool(p.gun)&&finite(p.mag,0,C.magazine)&&finite(p.reserve,0)&&finite(p.kits,0)&&finite(p.metal,0)&&finite(p.keys,0)&&finite(p.antidotes,0)&&finite(p.angle);}
function validStats(s){return s&&finite(s.kills,0)&&finite(s.cured,0)&&finite(s.rooms,0)&&finite(s.doors,0)&&finite(s.time,0);}
function validCompanions(a){return Array.isArray(a)&&a.every(c=>Number.isInteger(c.id)&&point(c)&&finite(c.hp,0)&&finite(c.maxHP,1)&&c.hp<=c.maxHP&&bool(c.weapon)&&bool(c.armor)&&finite(c.cd,0)&&finite(c.angle));}
export function newState(seed=Date.now()>>>0){return {version:C.saveVersion,world:createWorld(seed),player:{x:4*48+24,y:33*48+24,hp:C.playerHP,gun:false,mag:0,reserve:0,kits:0,metal:0,keys:0,antidotes:0,angle:-Math.PI/2},companions:[],stats:{kills:0,cured:0,rooms:0,doors:0,time:0},won:false,slot:1};}
export function validState(s){return !!(s&&s.version===C.saveVersion&&validWorld(s.world)&&validPlayer(s.player)&&validStats(s.stats)&&validCompanions(s.companions)&&bool(s.won)&&Number.isInteger(s.slot)&&s.slot>=1&&s.slot<=3);}
export class Saves {
 constructor(storage){this.storage=storage;}
 write(slot,state){if(!Number.isInteger(slot)||slot<1||slot>3||!validState(state)||state.slot!==slot)throw new Error('Invalid game state');const key=`redline-slot-${slot}`,text=JSON.stringify(state);const old=this.storage.getItem(key);if(old)this.storage.setItem(key+'-backup',old);this.storage.setItem(key,text);}
 read(slot){if(!Number.isInteger(slot)||slot<1||slot>3)return null;for(const suffix of ['', '-backup']){try{const s=JSON.parse(this.storage.getItem(`redline-slot-${slot}${suffix}`));if(validState(s))return s;}catch{}}return null;}
 settings(){try{const s=JSON.parse(this.storage.getItem('redline-settings'));return {music:typeof s?.music==='boolean'?s.music:true,volume:finite(s?.volume,0,1)?s.volume:.35};}catch{return {music:true,volume:.35};}}
 setSettings(v){if(!v||typeof v.music!=='boolean'||!finite(v.volume,0,1))throw new Error('Invalid settings');this.storage.setItem('redline-settings',JSON.stringify(v));}
}
