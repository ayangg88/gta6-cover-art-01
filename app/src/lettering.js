export function drawLettering(ctx, width, height, state) {
  const bandTop = height * (width > height ? 0.66 : 0.68);
  const band = ctx.createLinearGradient(0, bandTop - 80, 0, height);
  band.addColorStop(0, '#11101b00');
  band.addColorStop(0.45, '#11101bc9');
  band.addColorStop(1, '#11101bf5');
  ctx.fillStyle = band;
  ctx.fillRect(0, bandTop - 80, width, height - bandTop + 80);

  ctx.save();
  ctx.translate(width * 0.045, height * 0.055);
  ctx.fillStyle = '#ffe1ac';
  ctx.font = `bold ${width * 0.012}px Arial`;
  ctx.letterSpacing = `${width * 0.003}px`;
  ctx.fillText('SUNSET ORIGINALS     /     PICTURE YOUR NEXT CHAPTER', 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(width * 0.045, bandTop + height * 0.19);
  ctx.rotate(-0.025);
  const title = state.title.toUpperCase() || 'YOUR STORY';
  const fontSize = height * 0.21 * state.titleSize / 110;
  ctx.font = `900 ${fontSize}px Impact, 'Arial Narrow', sans-serif`;
  ctx.letterSpacing = `${state.spacing}px`;
  const titleWidth = ctx.measureText(title).width;
  ctx.scale(Math.min(0.83, width * 0.88 / titleWidth), 1);
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#10101a';
  ctx.lineWidth = fontSize * 0.065;
  ctx.shadowColor = '#000';
  ctx.shadowOffsetX = fontSize * 0.035;
  ctx.shadowOffsetY = fontSize * 0.045;
  ctx.strokeText(title, 0, 0);
  ctx.fillStyle = state.color;
  ctx.fillText(title, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = '#f8c994';
  ctx.font = `bold ${height * 0.024}px Arial`;
  ctx.letterSpacing = `${width * 0.003}px`;
  ctx.fillText(state.tagline.toUpperCase(), width * 0.052, height * 0.935, width * 0.88);
  ctx.fillStyle = '#e6d6c0';
  ctx.font = `${height * 0.012}px Arial`;
  ctx.letterSpacing = '2px';
  ctx.fillText('VOL. 01   /   AFTER HOURS EDITION', width * 0.052, height * 0.975);
  ctx.restore();
}
