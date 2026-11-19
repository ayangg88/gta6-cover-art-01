export function gradePanel(ctx,[x,y,w,h],preset){
  if(preset==='plain')return;
  ctx.save();ctx.globalCompositeOperation='soft-light';
  const g=ctx.createLinearGradient(x,y,x+w*.35,y+h);
  if(preset==='sunset'){g.addColorStop(0,'#ffac45');g.addColorStop(.48,'#ef557c');g.addColorStop(1,'#48276e');}
  else{g.addColorStop(0,'#06d5d4');g.addColorStop(.55,'#354289');g.addColorStop(1,'#fa269d');}
  ctx.fillStyle=g;ctx.fillRect(x,y,w,h);ctx.globalCompositeOperation='source-over';ctx.fillStyle=preset==='sunset'?'#ed6e5519':'#21106435';ctx.fillRect(x,y,w,h);ctx.restore();
}
export function finishEffects(ctx,w,h,state){
  if(state.vignette){const g=ctx.createRadialGradient(w*.45,h*.4,w*.15,w*.5,h*.5,w*.72);g.addColorStop(0,'#0000');g.addColorStop(1,'#07041cb0');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);}
  if(state.texture){ctx.fillStyle='#140d2333';for(let y=0;y<h;y+=6)for(let x=(y%12?3:0);x<w;x+=6){ctx.beginPath();ctx.arc(x,y,.65,0,Math.PI*2);ctx.fill();}}
}
