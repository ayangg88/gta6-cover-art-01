import { gradePanel } from './effects.js';

export function drawPanel(ctx, panel, [x, y, width, height], grade) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.fillStyle = '#412d53';
  ctx.fillRect(x, y, width, height);

  if (panel.image) {
    const scale = Math.max(width / panel.image.width, height / panel.image.height) * panel.zoom;
    const imageWidth = panel.image.width * scale;
    const imageHeight = panel.image.height * scale;
    const left = x + (width - imageWidth) / 2 + panel.panX * (imageWidth - width) / 2;
    const top = y + (height - imageHeight) / 2 + panel.panY * (imageHeight - height) / 2;
    ctx.drawImage(panel.image, left, top, imageWidth, imageHeight);
  }

  gradePanel(ctx, [x, y, width, height], grade);
  ctx.restore();
}
