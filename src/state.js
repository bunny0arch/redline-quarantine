import {C} from './config.js';import {createWorld} from './world.js';
export function newState(seed=Date.now()>>>0){return {version:C.saveVersion,world:createWorld(seed),player:{x:4*48+24,y:33*48+24,hp:C.playerHP,gun:false,mag:0,reserve:0,kits:0,metal:0,keys:0,antidotes:0,angle:-Math.PI/2},companions:[],stats:{kills:0,cured:0,rooms:0,doors:0,time:0},won:false,slot:1};}
export function validState(s){return !!(s&&s.version===C.saveVersion&&s.world?.tiles?.length===C.width*C.height&&Array.isArray(s.world.enemies)&&s.player&&Number.isFinite(s.player.hp)&&Number.isFinite(s.player.x)&&s.stats&&Array.isArray(s.companions));}
export class Saves {
 constructor(storage){this.storage=storage;}
 write(slot,state){if(!validState(state))throw new Error('Invalid game state');const key=`redline-slot-${slot}`,text=JSON.stringify(state);const old=this.storage.getItem(key);if(old)this.storage.setItem(key+'-backup',old);this.storage.setItem(key,text);}
 read(slot){for(const suffix of ['', '-backup']){try{const s=JSON.parse(this.storage.getItem(`redline-slot-${slot}${suffix}`));if(validState(s))return s;}catch{}}return null;}
 settings(){try{return {...{music:true,volume:.35},...JSON.parse(this.storage.getItem('redline-settings'))};}catch{return {music:true,volume:.35};}}
 setSettings(v){this.storage.setItem('redline-settings',JSON.stringify(v));}
}
