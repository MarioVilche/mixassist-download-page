const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const siteHeader = document.querySelector('.site-header');
const scrollProgress = document.querySelector('.scroll-progress span');

const updateHeader = () => {
  const y = window.scrollY;
  siteHeader?.classList.toggle('scrolled', y > 8);

  if (scrollProgress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  }
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const spyLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)')];
const spySections = spyLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (spySections.length && 'IntersectionObserver' in window) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      spyLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  spySections.forEach((section) => spyObserver.observe(section));
}

document.querySelectorAll('.feature-card, .download-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

const getVisitorPlatform = () => {
  const platform = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) return 'macos';
  if (platform.includes('linux') || platform.includes('x11')) return 'linux';
  return 'windows';
};

const downloadCards = [...document.querySelectorAll('.download-card[data-platform]')];
const recommendedPlatform = getVisitorPlatform();
const recommendedCard = downloadCards.find((card) => card.dataset.platform === recommendedPlatform)
  || downloadCards.find((card) => card.dataset.platform === 'windows');

downloadCards.forEach((card) => {
  const isRecommended = card === recommendedCard;
  card.classList.toggle('featured', isRecommended);
  const badge = card.querySelector('.recommended');
  if (badge) badge.hidden = !isRecommended;
});

document.querySelectorAll('a[download]').forEach((link) => {
  link.addEventListener('click', () => {
    link.classList.add('is-downloading');
    window.setTimeout(() => link.classList.remove('is-downloading'), 900);
  });
});
