/* ========== DENEX — interakcije ========== */

// 1. Scroll reveal — dodaje .is-visible kada element uđe u viewport
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.section, .card, .project-card, .hero-text'
  );
  revealTargets.forEach(el => {
    if (!el.classList.contains('hero-text')) el.classList.add('reveal');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 2. Aktivna nav stavka po trenutnoj stranici
  const path = location.pathname.split('/').pop() || 'denex.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // 3. Page transition — fade out pre navigacije
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // preskoči eksterne, hash, mailto, tel
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;
    if (link.target === '_blank') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 320);
    });
  });

  // 4. Lightbox za slike sa data-lightbox atributom
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox-close" aria-label="Zatvori">&times;</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.getAttribute('data-lightbox') || img.src;
      lbImg.alt = img.alt || '';
      lb.classList.add('open');
    });
  });

  const closeLb = () => lb.classList.remove('open');
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
});
