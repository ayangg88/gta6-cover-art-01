import { drawPanel } from './panel.js';
import { drawLettering } from './lettering.js';
import { finishEffects } from './effects.js';
export const formats={wide:[1920,1080],portrait:[1080,1350],square:[1080,1080]};
export function panelBoxes(w,h){const g=w*.008;return w>h?[[0,0,w*.65-g/2,h],[w*.65+g/2,0,w*.35-g/2,h*.5-g/2],[w*.65+g/2,h*.5+g/2,w*.35-g/2,h*.5-g/2]]:[[0,0,w,h*.58-g/2],[0,h*.58+g/2,w*.5-g/2,h*.42-g/2],[w*.5+g/2,h*.58+g/2,w*.5-g/2,h*.42-g/2]];}
export function drawCover(canvas,state){const [w,h]=formats[state.size];if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='#11101a';ctx.fillRect(0,0,w,h);panelBoxes(w,h).forEach((box,i)=>drawPanel(ctx,state.panels[i],box,state.grade));finishEffects(ctx,w,h,state);drawLettering(ctx,w,h,state);
  ctx.save();ctx.fillStyle='#ffe2b9';ctx.font=`bold ${w*.011}px Arial`;ctx.textAlign='right';ctx.fillText('SC / 001',w*.96,h*.055);ctx.restore();
}
