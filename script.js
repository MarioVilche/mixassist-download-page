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

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

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
