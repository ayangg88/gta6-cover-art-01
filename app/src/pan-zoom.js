import { panelBoxes } from './layout.js';

export function connectPanZoom(canvas, state, selectPanel, redraw, loadImage) {
  let drag = null;

  function canvasPoint(event) {
    const bounds = canvas.getBoundingClientRect();
    return [
      (event.clientX - bounds.left) * canvas.width / bounds.width,
      (event.clientY - bounds.top) * canvas.height / bounds.height,
    ];
  }

  function panelAt(event) {
    const [pointX, pointY] = canvasPoint(event);
    return panelBoxes(canvas.width, canvas.height).findIndex(([x, y, width, height]) => (
      pointX >= x && pointX <= x + width && pointY >= y && pointY <= y + height
    ));
  }

  canvas.addEventListener('pointerdown', event => {
    const index = panelAt(event);
    if (index < 0) return;
    selectPanel(index);
    const panel = state.panels[index];
    drag = { index, start: canvasPoint(event), panX: panel.panX, panY: panel.panY };
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', event => {
    if (!drag) return;
    const panel = state.panels[drag.index];
    if (!panel.image) return;
    const [x, y, width, height] = panelBoxes(canvas.width, canvas.height)[drag.index];
    const scale = Math.max(width / panel.image.width, height / panel.image.height) * panel.zoom;
    const overflowX = Math.max(1, panel.image.width * scale - width);
    const overflowY = Math.max(1, panel.image.height * scale - height);
    const [pointX, pointY] = canvasPoint(event);
    panel.panX = Math.max(-1, Math.min(1, drag.panX + (pointX - drag.start[0]) * 2 / overflowX));
    panel.panY = Math.max(-1, Math.min(1, drag.panY + (pointY - drag.start[1]) * 2 / overflowY));
    redraw();
  });

  canvas.addEventListener('pointerup', () => { drag = null; });
  canvas.addEventListener('pointercancel', () => { drag = null; });
  canvas.addEventListener('dragover', event => { event.preventDefault(); });
  canvas.addEventListener('drop', event => {
    event.preventDefault();
    const index = panelAt(event);
    const file = event.dataTransfer.files[0];
    if (index < 0 || !file) return;
    selectPanel(index);
    loadImage(file, false);
  });
}
