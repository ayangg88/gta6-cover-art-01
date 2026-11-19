import { gradePanel } from './effects.js';
export function drawPanel(ctx, panel, box, grade) {
  const [x,y,w,h]=box;
  ctx.save(); ctx.beginPath(); ctx.rect(x,y,w,h); ctx.clip();
  ctx.fillStyle='#412d53';ctx.fillRect(x,y,w,h);
  if(panel.image){
    const scale=Math.max(w/panel.image.width,h/panel.image.height)*panel.zoom;
    const iw=panel.image.width*scale,ih=panel.image.height*scale;
    ctx.drawImage(panel.image,x+(w-iw)/2+panel.panX*(iw-w)/2,y+(h-ih)/2+panel.panY*(ih-h)/2,iw,ih);
  }
  gradePanel(ctx,box,grade);ctx.restore();
}
