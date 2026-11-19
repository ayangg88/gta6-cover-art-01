import { drawCover, formats } from './layout.js';
import { readImage, stageScene } from './scenes.js';
import { connectPanZoom } from './pan-zoom.js';

const byId = id => document.getElementById(id);
const state = {
  size: 'wide',
  title: 'NEON COAST',
  tagline: 'A SUNSET HEIST STORY',
  titleSize: 110,
  spacing: 0,
  color: '#fff4db',
  grade: 'sunset',
  vignette: true,
  texture: true,
  panels: [],
};
let selectedPanel = 0;
const canvas = byId('preview');

function redraw() {
  drawCover(canvas, state);
  byId('dimensions').textContent = `${formats[state.size].join(' × ')} PX`;
  document.querySelectorAll('[data-size]').forEach(button => {
    button.classList.toggle('active', button.dataset.size === state.size);
  });
}

function selectPanel(index) {
  selectedPanel = index;
  document.querySelectorAll('[data-panel]').forEach(button => {
    button.classList.toggle('active', Number(button.dataset.panel) === index);
  });
  byId('zoom').value = state.panels[index].zoom;
  byId('zoomValue').value = `${state.panels[index].zoom.toFixed(2)}×`;
}

function assignPhoto(image, fillEveryPanel, samples) {
  const targets = fillEveryPanel ? state.panels : [state.panels[selectedPanel]];
  targets.forEach(panel => {
    const index = state.panels.indexOf(panel);
    Object.assign(panel, {
      image,
      zoom: 1,
      panX: 0,
      panY: image === samples.boulevard && index === 0 ? 0.55 : 0,
    });
  });
  selectPanel(selectedPanel);
  redraw();
}

async function loadPhoto(file, fillEveryPanel, samples) {
  if (!file) return;
  const source = URL.createObjectURL(file);
  try {
    assignPhoto(await readImage(source), fillEveryPanel, samples);
    byId('status').textContent = 'Photo loaded. Drag your frame to find the perfect crop.';
  } catch (error) {
    byId('status').textContent = error.message;
  } finally {
    URL.revokeObjectURL(source);
  }
}

try {
  const samples = await stageScene(state);
  redraw();
  document.querySelectorAll('[data-panel]').forEach(button => {
    button.onclick = () => selectPanel(Number(button.dataset.panel));
  });
  byId('boulevard').onclick = () => assignPhoto(samples.boulevard, byId('fill').checked, samples);
  byId('pier').onclick = () => assignPhoto(samples.pier, byId('fill').checked, samples);
  byId('upload').onchange = event => loadPhoto(event.target.files[0], byId('fill').checked, samples);

  byId('zoom').oninput = event => {
    state.panels[selectedPanel].zoom = Number(event.target.value);
    byId('zoomValue').value = `${Number(event.target.value).toFixed(2)}×`;
    redraw();
  };

  for (const id of ['title', 'tagline', 'titleSize', 'spacing', 'color', 'vignette', 'texture']) {
    byId(id).oninput = event => {
      state[id] = event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.type === 'range' ? Number(event.target.value) : event.target.value;
      redraw();
    };
  }

  document.querySelectorAll('[data-grade]').forEach(button => {
    button.onclick = () => {
      state.grade = button.dataset.grade;
      document.querySelectorAll('[data-grade]').forEach(option => {
        option.classList.toggle('active', option === button);
      });
      redraw();
    };
  });
  document.querySelectorAll('[data-size]').forEach(button => {
    button.onclick = () => { state.size = button.dataset.size; redraw(); };
  });
  connectPanZoom(canvas, state, selectPanel, redraw, file => {
    loadPhoto(file, false, samples);
  });

  byId('export').onclick = () => {
    const output = document.createElement('canvas');
    drawCover(output, state);
    output.toBlob(blob => {
      if (!blob) {
        byId('status').textContent = 'Export failed. Please try again.';
        return;
      }
      const source = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = source;
      link.download = `sunset-cover-${state.size}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(source), 10000);
      byId('status').textContent = `Exported ${formats[state.size].join(' × ')} PNG. Make it your cover.`;
    }, 'image/png');
  };
  document.documentElement.dataset.ready = 'true';
} catch (error) {
  byId('status').textContent = error.message;
  console.error(error);
}
