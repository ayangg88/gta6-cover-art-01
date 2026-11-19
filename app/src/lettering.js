export function drawLettering(ctx,w,h,state){
  const wide=w>h, bandY=h*(wide?.66:.68);
  const g=ctx.createLinearGradient(0,bandY-80,0,h);g.addColorStop(0,'#11101b00');g.addColorStop(.45,'#11101bc9');g.addColorStop(1,'#11101bf5');ctx.fillStyle=g;ctx.fillRect(0,bandY-80,w,h-bandY+80);
  ctx.save();ctx.translate(w*.045,h*.055);ctx.fillStyle='#ffe1ac';ctx.font=`bold ${w*.012}px Arial`;ctx.letterSpacing=`${w*.003}px`;ctx.fillText('SUNSET ORIGINALS     /     PICTURE YOUR NEXT CHAPTER',0,0);ctx.restore();
  ctx.save();ctx.translate(w*.045,bandY+h*.19);ctx.rotate(-.025);
  const text=state.title.toUpperCase()||'YOUR STORY';
  const size=h*.21*state.titleSize/110;ctx.font=`900 ${size}px Impact, 'Arial Narrow', sans-serif`;ctx.letterSpacing=`${state.spacing}px`;
  const measured=ctx.measureText(text).width;ctx.scale(Math.min(.83,w*.88/measured),1);
  ctx.lineJoin='round';ctx.strokeStyle='#10101a';ctx.lineWidth=size*.065;ctx.shadowColor='#000';ctx.shadowOffsetX=size*.035;ctx.shadowOffsetY=size*.045;ctx.strokeText(text,0,0);ctx.fillStyle=state.color;ctx.fillText(text,0,0);ctx.restore();
  ctx.save();ctx.fillStyle='#f8c994';ctx.font=`bold ${h*.024}px Arial`;ctx.letterSpacing=`${w*.003}px`;ctx.fillText(state.tagline.toUpperCase(),w*.052,h*.935,w*.88);ctx.fillStyle='#e6d6c0';ctx.font=`${h*.012}px Arial`;ctx.letterSpacing='2px';ctx.fillText('VOL. 01   /   AFTER HOURS EDITION',w*.052,h*.975);ctx.restore();
}
