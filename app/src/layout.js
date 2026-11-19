import { drawPanel } from './panel.js';
import { drawLettering } from './lettering.js';
import { finishEffects } from './effects.js';

export const formats = {
  wide: [1920, 1080],
  portrait: [1080, 1350],
  square: [1080, 1080],
};

export function panelBoxes(width, height) {
  const gutter = width * 0.008;
  if (width > height) {
    return [
      [0, 0, width * 0.65 - gutter / 2, height],
      [width * 0.65 + gutter / 2, 0, width * 0.35 - gutter / 2, height * 0.5 - gutter / 2],
      [width * 0.65 + gutter / 2, height * 0.5 + gutter / 2, width * 0.35 - gutter / 2, height * 0.5 - gutter / 2],
    ];
  }

  return [
    [0, 0, width, height * 0.58 - gutter / 2],
    [0, height * 0.58 + gutter / 2, width * 0.5 - gutter / 2, height * 0.42 - gutter / 2],
    [width * 0.5 + gutter / 2, height * 0.58 + gutter / 2, width * 0.5 - gutter / 2, height * 0.42 - gutter / 2],
  ];
}

export function drawCover(canvas, state) {
  const [width, height] = formats[state.size];
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#11101a';
  ctx.fillRect(0, 0, width, height);
  panelBoxes(width, height).forEach((box, index) => {
    drawPanel(ctx, state.panels[index], box, state.grade);
  });
  finishEffects(ctx, width, height, state);
  drawLettering(ctx, width, height, state);

  ctx.save();
  ctx.fillStyle = '#ffe2b9';
  ctx.font = `bold ${width * 0.011}px Arial`;
  ctx.textAlign = 'right';
  ctx.fillText('SC / 001', width * 0.96, height * 0.055);
  ctx.restore();
}
