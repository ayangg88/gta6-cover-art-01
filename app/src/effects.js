export function gradePanel(ctx, [x, y, width, height], preset) {
  if (preset === 'plain') return;

  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  const wash = ctx.createLinearGradient(x, y, x + width * 0.35, y + height);

  if (preset === 'sunset') {
    wash.addColorStop(0, '#ffac45');
    wash.addColorStop(0.48, '#ef557c');
    wash.addColorStop(1, '#48276e');
  } else {
    wash.addColorStop(0, '#06d5d4');
    wash.addColorStop(0.55, '#354289');
    wash.addColorStop(1, '#fa269d');
  }

  ctx.fillStyle = wash;
  ctx.fillRect(x, y, width, height);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = preset === 'sunset' ? '#ed6e5519' : '#21106435';
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

export function finishEffects(ctx, width, height, state) {
  if (state.vignette) {
    const shade = ctx.createRadialGradient(
      width * 0.45, height * 0.4, width * 0.15,
      width * 0.5, height * 0.5, width * 0.72,
    );
    shade.addColorStop(0, '#0000');
    shade.addColorStop(1, '#07041cb0');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  }

  if (state.texture) {
    ctx.fillStyle = '#140d2333';
    for (let y = 0; y < height; y += 6) {
      for (let x = y % 12 ? 3 : 0; x < width; x += 6) {
        ctx.beginPath();
        ctx.arc(x, y, 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
