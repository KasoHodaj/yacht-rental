
/* ─── CURSOR ─── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  cur.style.transform = `translate(${mx-4}px,${my-4}px)`;
  rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
  ring.style.transform = `translate(${rx-19}px,${ry-19}px)`;
  requestAnimationFrame(animCursor);
})();

/* ─── SCROLL PROGRESS ─── */
const bar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  bar.style.transform = `scaleX(${pct})`;
}, { passive: true });

/* ─── NAVBAR SCROLL ─── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── REVEAL ON SCROLL ─── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ─── MOBILE MENU ─── */
const menu = document.getElementById('mobileMenu');
const burger = document.getElementById('hamburger');

function isMobileOpen() {
  return menu.classList.contains('open');
}

function toggleMobile() {
  menu.classList.toggle('open');
  burger.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isMobileOpen()));
}
function closeMobile() {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', e => {
  if (!isMobileOpen()) return;
  if (menu.contains(e.target) || burger.contains(e.target)) return;
  closeMobile();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isMobileOpen()) closeMobile();
});

/* ─── FULL GALLERY EXPAND ─── */
const fullGalleryBtn = document.getElementById('fullGalleryBtn');
const extraGallery = document.getElementById('extraGallery');

if (fullGalleryBtn && extraGallery) {
  fullGalleryBtn.addEventListener('click', e => {
    e.preventDefault();
    extraGallery.classList.add('open');
    extraGallery.setAttribute('aria-hidden', 'false');
    fullGalleryBtn.style.display = 'none';
  });
}
