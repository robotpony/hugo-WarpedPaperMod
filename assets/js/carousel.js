document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel:not(.is-live)').forEach(root => {
    const track = root.querySelector('.carousel-track');
    const slides = [...track.children];
    if (slides.length < 2) return;
    const nav = document.createElement('nav');
    nav.className = 'carousel-nav';
    const btn = (cls, text, label) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = cls; b.textContent = text;
      if (label) b.setAttribute('aria-label', label);
      return b;
    };
    const prev = btn('carousel-arrow', '←', 'Previous');
    const next = btn('carousel-arrow', '→', 'Next');
    const count = document.createElement('span');
    count.className = 'carousel-count';
    // No bold labels: dots, which stay visible on narrow screens.
    const dots = root.dataset.nav === 'dots';
    if (dots) nav.classList.add('is-dots');
    const chips = slides.map((s, i) => {
      const c = dots
        ? btn('carousel-chip carousel-dot', '', `Slide ${i + 1}`)
        : btn('carousel-chip', s.dataset.label);
      c.addEventListener('click', () => go(i));
      return c;
    });
    nav.append(prev, ...chips, count, next);
    root.append(nav);

    let active = 0;
    const go = i => {
      i = Math.max(0, Math.min(slides.length - 1, i));
      const s = slides[i];
      track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2 });
    };
    const mark = i => {
      active = i;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === i));
      chips.forEach((c, j) => c.setAttribute('aria-current', j === i));
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      count.textContent = `${i + 1} / ${slides.length}`;
    };
    const nearest = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0, dist = Infinity;
      slides.forEach((s, j) => {
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
        if (d < dist) { dist = d; best = j; }
      });
      return best;
    };
    track.addEventListener('scroll', () => { const n = nearest(); if (n !== active) mark(n); }, { passive: true });
    slides.forEach((s, i) => s.addEventListener('click', () => { if (i !== active) go(i); }));
    prev.addEventListener('click', () => go(active - 1));
    next.addEventListener('click', () => go(active + 1));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    });
    root.classList.add('is-live');
    mark(0);
  });
});
