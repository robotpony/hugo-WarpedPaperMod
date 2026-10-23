// The (i) toggle on drawn code blocks (partials/diagram.html): swaps a
// diagram for the fenced source that drives it, and back.
document.querySelectorAll('.diagram').forEach((d) => {
  const button = d.querySelector('.diagram-toggle');
  const view = d.querySelector('.diagram-view');
  const source = d.querySelector('.diagram-source');
  if (!button || !view || !source) return;
  button.hidden = false;
  button.addEventListener('click', () => {
    const showSource = button.getAttribute('aria-pressed') !== 'true';
    const label = showSource ? 'Show diagram' : 'Show source';
    button.setAttribute('aria-pressed', String(showSource));
    button.setAttribute('aria-label', label);
    button.title = label;
    view.hidden = showSource;
    source.hidden = !showSource;
  });
});
