export function readImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('This image could not be opened. Try a JPG or PNG.'));
    image.src = source;
  });
}

export async function stageScene(state) {
  const [boulevard, pier] = await Promise.all([
    readImage('samples/boulevard.jpg'),
    readImage('samples/pier.jpg'),
  ]);

  state.panels = [boulevard, pier, boulevard].map((image, index) => ({
    image,
    zoom: index === 2 ? 1.65 : 1,
    panX: index === 2 ? -0.5 : 0,
    panY: index === 0 ? 0.55 : 0,
  }));

  const shot = new URLSearchParams(location.search).get('shot');
  if (['cover', 'portrait', 'square'].includes(shot)) {
    document.body.classList.add('shot');
    state.size = shot === 'cover' ? 'wide' : shot;
    if (shot === 'portrait') state.panels[0].panY = 0.82;
  }
  return { boulevard, pier };
}
