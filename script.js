// Form submit
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Cảm ơn! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
  e.target.reset();
});

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.pioneer-grid > *, .stat, .fund-card, .contact-grid > *, .footer-grid > *').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .9s ease, transform .9s ease';
  observer.observe(el);
});

// Animated counter for stats
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const span = el.querySelector('span');
    if (!span || isNaN(target)) return;
    const duration = 1400;
    const startTime = performance.now();
    function step(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      span.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else span.textContent = target;
    }
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// Back to top
const backBtn = document.querySelector('.back-to-top');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 400);
  });
  backBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Sticky topnav shadow on scroll
const topnav = document.querySelector('.topnav');
if (topnav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) topnav.style.boxShadow = '0 6px 24px rgba(15,51,40,.10)';
    else topnav.style.boxShadow = '0 2px 12px rgba(15,51,40,.06)';
  });
}
