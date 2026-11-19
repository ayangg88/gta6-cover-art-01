import { panelBoxes } from './layout.js';
export function connectPanZoom(canvas,state,select,redraw,load){
  let drag=null;
  function point(e){const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height];}
  function hit(e){const [x,y]=point(e);return panelBoxes(canvas.width,canvas.height).findIndex(([a,b,w,h])=>x>=a&&x<=a+w&&y>=b&&y<=b+h);}
  canvas.addEventListener('pointerdown',e=>{const i=hit(e);if(i<0)return;select(i);const p=state.panels[i];drag={i,start:point(e),x:p.panX,y:p.panY};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;const p=state.panels[drag.i],box=panelBoxes(canvas.width,canvas.height)[drag.i],pos=point(e);if(!p.image)return;const scale=Math.max(box[2]/p.image.width,box[3]/p.image.height)*p.zoom;const dx=p.image.width*scale-box[2],dy=p.image.height*scale-box[3];p.panX=Math.max(-1,Math.min(1,drag.x+(pos[0]-drag.start[0])*2/Math.max(1,dx)));p.panY=Math.max(-1,Math.min(1,drag.y+(pos[1]-drag.start[1])*2/Math.max(1,dy)));redraw();});
  canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
  canvas.addEventListener('dragover',e=>{e.preventDefault();});canvas.addEventListener('drop',e=>{e.preventDefault();const i=hit(e);if(i>=0&&e.dataTransfer.files[0]){select(i);load(e.dataTransfer.files[0],false);}});
}
