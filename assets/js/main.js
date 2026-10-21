/* Progressive enhancement: navigation and content work without JavaScript. */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const mobileViewport = window.matchMedia('(max-width: 640px)');

if (menuToggle && navLinks) {
  menuToggle.hidden = false;
  const setOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('is-open', open);
  };
  const syncMenu = () => {
    setOpen(false);
    navLinks.classList.toggle('is-collapsible', mobileViewport.matches);
  };
  syncMenu();
  mobileViewport.addEventListener('change', syncMenu);
  menuToggle.addEventListener('click', () => {
    setOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-inner')) setOpen(false);
  });

  const links = [...navLinks.querySelectorAll('a')];
  const sections = links.map((link) => document.getElementById(new URL(link.href).hash.slice(1))).filter(Boolean);
  const updateActiveLink = () => {
    let current = '';
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1]?.id || current;
    }
    links.forEach((link) => {
      if (new URL(link.href).hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => { updateActiveLink(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  window.addEventListener('pageshow', updateActiveLink);
  updateActiveLink();
}
