import {clamp} from './config.js';
export class Input {
 constructor(canvas,game){this.keys=new Set();this.x=0;this.y=0;this.fire=false;this.game=game;this.mouse={x:0,y:0};this.usingMouse=false;this.joyId=null;this.aimId=null;
 addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();this.keys.add(e.code);if(e.repeat||game.paused)return;if(e.code==='KeyR')game.reloadGun();if(e.code==='KeyE')game.interact();if(e.code==='KeyQ')game.cure();if(e.code==='KeyH')game.heal();if(e.code==='KeyV')game.shove();});
 addEventListener('keyup',e=>this.keys.delete(e.code));addEventListener('blur',()=>this.clear());
 canvas.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){this.mouse={x:e.clientX,y:e.clientY};this.usingMouse=true;}});
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'){this.mouse={x:e.clientX,y:e.clientY};this.usingMouse=true;if(e.button===0)this.fire=true;if(e.button===2)game.heal();}});addEventListener('pointerup',e=>{if(e.pointerType==='mouse')this.fire=false;});canvas.addEventListener('contextmenu',e=>e.preventDefault());
 const joy=document.querySelector('#joystick'),knob=document.querySelector('#knob'),fire=document.querySelector('#fire');
 const joyMove=e=>{if(e.pointerId!==this.joyId)return;const r=joy.getBoundingClientRect(),dx=(e.clientX-r.x-r.width/2)/(r.width*.32),dy=(e.clientY-r.y-r.height/2)/(r.width*.32),d=Math.max(1,Math.hypot(dx,dy));this.x=dx/d;this.y=dy/d;knob.style.transform=`translate(${this.x*30}px,${this.y*30}px)`;};
 joy.addEventListener('pointerdown',e=>{this.joyId=e.pointerId;joy.setPointerCapture(e.pointerId);joy.classList.add('pressed');joyMove(e);});joy.addEventListener('pointermove',joyMove);
 const joyEnd=e=>{if(this.joyId!==e.pointerId)return;this.joyId=null;this.x=0;this.y=0;knob.style.transform='';joy.classList.remove('pressed');};joy.addEventListener('pointerup',joyEnd);joy.addEventListener('pointercancel',joyEnd);
 const aim=e=>{if(this.aimId!==e.pointerId)return;const dx=e.clientX-this.aimStart.x,dy=e.clientY-this.aimStart.y;if(Math.hypot(dx,dy)>7){game.s.player.angle=Math.atan2(dy,dx);document.querySelector('#aim-arrow').style.transform=`rotate(${game.s.player.angle}rad)`;}};
 fire.addEventListener('pointerdown',e=>{this.aimId=e.pointerId;this.aimStart={x:e.clientX,y:e.clientY};this.usingMouse=false;this.fire=true;fire.setPointerCapture(e.pointerId);fire.classList.add('pressed');});fire.addEventListener('pointermove',aim);
 const aimEnd=e=>{if(this.aimId!==e.pointerId)return;this.aimId=null;this.fire=false;fire.classList.remove('pressed');};fire.addEventListener('pointerup',aimEnd);fire.addEventListener('pointercancel',aimEnd);
 }
 clear(){this.keys.clear();this.x=this.y=0;this.fire=false;this.joyId=this.aimId=null;document.querySelector('#knob').style.transform='';document.querySelectorAll('.pressed').forEach(e=>e.classList.remove('pressed'));}
 read(){const k=this.keys;if(this.usingMouse)this.game.s.player.angle=Math.atan2(this.mouse.y-innerHeight/2,this.mouse.x-innerWidth/2);return {x:clamp(this.x+(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0),-1,1),y:clamp(this.y+(k.has('KeyS')||k.has('ArrowDown')?1:0)-(k.has('KeyW')||k.has('ArrowUp')?1:0),-1,1),fire:this.fire};}
}
