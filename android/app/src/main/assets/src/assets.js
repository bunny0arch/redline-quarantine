// Furniture is orthographically rendered from the user's GLB, not generated art.
const FACILITY_FILES = {
 combat:'combat-atlas.png',worktable:'worktable.png',shelving:'shelving.png',vent:'vent.png',pallet:'pallet.png',ladder:'ladder.png',extinguisher:'extinguisher.png',cabinet:'cabinet.png',locker:'locker.png',console:'console.png',chair:'chair.png',keyboard:'keyboard.png',door:'door.png',tank:'tank.png',powerbox:'powerbox.png',partition:'partition.png',duct:'duct.png',grate:'grate.png',concrete:'concrete.jpg',plaster:'plaster.jpg',steel:'steel.jpg',rust:'rust.jpg',wood:'wood.jpg',brushed:'brushed.jpg'
};
export class FacilityAssets {
 constructor(){this.images={};this.patterns={};this.shadows={};this.failed=[];this.ready=false;this.loading=Promise.all(Object.entries(FACILITY_FILES).map(([name,file])=>new Promise(resolve=>{const im=new Image();im.onload=()=>{this.images[name]=im;resolve();};im.onerror=()=>{this.failed.push(name);resolve();};im.src=window.REDLINE_ASSETS?.[name]||`assets/facility/${file}`;}))).then(()=>{this.ready=true;});}
 pattern(ctx,name){if(this.patterns[name])return this.patterns[name];const im=this.images[name];if(!im)return null;const tile=document.createElement('canvas');tile.width=tile.height=192;tile.getContext('2d').drawImage(im,0,0,192,192);return this.patterns[name]=ctx.createPattern(tile,'repeat');}
 shadow(name){if(this.shadows[name])return this.shadows[name];const im=this.images[name];if(!im)return null;const surface=document.createElement('canvas');surface.width=im.width;surface.height=im.height;const c=surface.getContext('2d');c.drawImage(im,0,0);c.globalCompositeOperation='source-in';c.fillStyle='#000000';c.fillRect(0,0,surface.width,surface.height);return this.shadows[name]=surface;}
}
export function facilityProps(w){
 const props=[];const add=(name,x,y,width,angle=0)=>props.push({name,x:x*48,y:y*48,width,angle});
 for(const r of w.rooms){const x=r.x,y=r.y;if(r.id===13){for(let i=0;i<4;i++){add('tank',x+1.1,y+2+i*3.8,62);add('duct',x+10.8,y+2+i*3.8,58);}add('console',x+5,y+1.2,88);continue;}
  if(r.id===0){add('worktable',x+6.6,y+2,100);add('chair',x+6.5,y+3.6,44,.2);add('locker',x+1,y+1.2,63);add('cabinet',x+2.5,y+1.2,62);add('shelving',x+1,y+6.4,80);add('extinguisher',x+7.4,y+6.6,24);continue;}
  const style=r.id%4;
  if(style===0){add('worktable',x+2.1,y+2.2,116);add('console',x+2.1,y+2,56);add('keyboard',x+2.1,y+2.65,36);add('chair',x+2.1,y+3.7,45,.12);add('worktable',x+7.6,y+2,106);add('console',x+7.6,y+1.8,52);add('chair',x+7.6,y+3.5,43,-.1);}
  if(style===1){add('shelving',x+1.3,y+2.7,100);add('shelving',x+8.4,y+2.7,100);add('pallet',x+2,y+6.7,88,.06);add('pallet',x+7.8,y+6.8,72,-.12);}
  if(style===2){add('tank',x+1.4,y+2.5,58);add('tank',x+2.8,y+2.5,58);add('duct',x+8.2,y+2.4,74);add('worktable',x+7.7,y+6.2,108);add('powerbox',x+1.3,y+6.7,49);}
  if(style===3){add('locker',x+1.3,y+2.1,62);add('locker',x+2.7,y+2.1,62);add('cabinet',x+8,y+2.1,68);add('worktable',x+2,y+6.7,110);add('chair',x+3.6,y+6.8,42,1.2);}
  add('extinguisher',x+8.8,y+7.8,25);add('grate',x+5,y+7.4,42);
 }
 for(let i=0;i<6;i++){add('powerbox',16+i*12,22.45,29);add('grate',20+i*12,26.5,31);if(i%2===0)add('extinguisher',21+i*12,22.4,22);}
 return props;
}
