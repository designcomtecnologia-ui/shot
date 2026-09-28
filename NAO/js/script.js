(function(){
  const body = document.body;
  const header = document.querySelector('.site-header');
  const isGroup = body?.dataset.page === 'grupo';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------
  // Shared scroll progress — same behavior on Home + Group.
  // ------------------------------------------------------------
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  // ------------------------------------------------------------
  // One shared mobile menu for both pages.
  // ------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.createElement('aside');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-hidden', 'true');

  const link = (href, label) => `<a href="${href}">${label}<span>↗</span></a>`;
  const prefix = isGroup ? 'index.html' : '';
  const hrefFor = id => isGroup ? `${prefix}#${id}` : `#${id}`;
  const ctaHref = isGroup ? 'https://chat.whatsapp.com/SEU_LINK_AQUI' : 'grupo.html';
  const ctaTarget = isGroup ? ' target="_blank" rel="noopener"' : '';

  mobileMenu.innerHTML = `
    <div class="mobile-menu-head">
      <strong>SHOT</strong>
      <button class="mobile-menu-close" type="button" aria-label="Fechar menu">×</button>
    </div>
    <nav class="mobile-menu-links" aria-label="Menu mobile">
      ${link(hrefFor('guia'), 'O GUIA')}
      ${link(hrefFor('parametros'), '5 PARÂMETROS')}
      ${link(hrefFor('lentes'), 'LENTES')}
      ${link(hrefFor('combinacoes'), 'COMBINAÇÕES')}
      ${link(hrefFor('prompts'), 'PROMPTS')}
      ${link(hrefFor('acesso'), 'COMO FUNCIONA')}
    </nav>
    <div class="mobile-menu-bottom">
      <div class="mobile-menu-price">R$ 28,90</div>
      <a class="pill pill-dark" href="${ctaHref}"${ctaTarget}>${isGroup ? 'ENTRAR NO GRUPO' : 'QUERO O SHOT'} <span>→</span></a>
      <div class="mobile-menu-meta">GUIA TÉCNICO · ED. 2026</div>
    </div>`;

  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.append(backdrop, mobileMenu);

  function openMenu(){
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    body.classList.add('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
  }
  function closeMenu(){
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    body.classList.remove('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  menuToggle?.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMenu() : openMenu());
  mobileMenu.querySelector('.mobile-menu-close')?.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    closeMenu();
  }));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

  // ------------------------------------------------------------
  // Stable header: NO height morph on scroll. This prevents the
  // "trembling" / layout jump caused by a sticky header changing size.
  // ------------------------------------------------------------
  let ticking = false;
  function updateScroll(){
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = `${Math.min(100, Math.max(0, window.scrollY / max * 100))}%`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(updateScroll); ticking = true; }
  }, {passive:true});
  updateScroll();

  // ------------------------------------------------------------
  // Reveal system shared by Home + Group.
  // ------------------------------------------------------------
  const revealSelectors = [
    '.section-head', '.parameter-card', '.lens-copy', '.portrait-grid figure',
    '.recipe-card', '.prompt-copy', '.tool-card', '.formula-line', '.access-copy',
    '.book-stage', '.steps > div', '.final-cta', '.group-copy', '.phone-wrap',
    '.notice', '.product-dark > div', '.faq-section .section-head', '.faq', '.bottom-cta'
  ];
  revealSelectors.forEach(selector => document.querySelectorAll(selector).forEach((el, i) => {
    if(!el.classList.contains('reveal') && !el.classList.contains('reveal-scale')) {
      el.classList.add(el.matches('.book-stage,.phone-wrap') ? 'reveal-scale' : 'reveal');
    }
    if(el.matches('.parameter-card,.portrait-grid figure,.recipe-card,.tool-card,.steps>div')) {
      el.style.setProperty('--i', i % 6);
    }
  }));

  if(reduceMotion){
    document.querySelectorAll('.reveal,.reveal-scale').forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal,.reveal-scale').forEach(el => observer.observe(el));
  }

  // ------------------------------------------------------------
  // Subtle parallax ONLY for secondary imagery.
  // The Home hero and Group hero are deliberately excluded so the
  // first screen stays perfectly stable.
  // Same function is used on both pages.
  // ------------------------------------------------------------
  const parallaxItems = [
    ...document.querySelectorAll('.book-stage img, .product-book img')
  ];
  if(!reduceMotion && parallaxItems.length){
    let parallaxTick = false;
    const updateParallax = () => {
      const viewport = window.innerHeight;
      parallaxItems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.bottom < -80 || rect.top > viewport + 80) return;
        const center = rect.top + rect.height / 2;
        const offset = Math.max(-18, Math.min(18, (viewport / 2 - center) * 0.035));
        el.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
      });
      parallaxTick = false;
    };
    window.addEventListener('scroll', () => {
      if(!parallaxTick){ requestAnimationFrame(updateParallax); parallaxTick = true; }
    }, {passive:true});
    updateParallax();
  }

  // ------------------------------------------------------------
  // FAQ
  // ------------------------------------------------------------
  document.querySelectorAll('.faq button').forEach(btn => btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const open = answer.classList.contains('open');
    document.querySelectorAll('.faq div').forEach(x => x.classList.remove('open'));
    document.querySelectorAll('.faq button span').forEach(x => x.textContent = '+');
    if(!open){ answer.classList.add('open'); btn.querySelector('span').textContent = '−'; }
  }));

  // ------------------------------------------------------------
  // Same-page smooth anchors. Cross-page anchors are left native so
  // the two pages preserve identical navigation semantics.
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = a.getAttribute('href');
    if(target === '#') return;
    const el = document.querySelector(target);
    if(el){
      e.preventDefault();
      closeMenu();
      el.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'});
    }
  }));

  // ------------------------------------------------------------
  // Shared active navigation on both pages.
  // ------------------------------------------------------------
  const navLinks = [...document.querySelectorAll('.nav a')];
  const sectionIds = ['guia','parametros','lentes','combinacoes','prompts','acesso'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if(navLinks.length && sections.length){
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          navLinks.forEach(l => l.classList.remove('active'));
          navLinks.find(l => l.getAttribute('href')?.includes(`#${entry.target.id}`))?.classList.add('active');
        }
      });
    }, {rootMargin:'-40% 0px -50% 0px', threshold:0});
    sections.forEach(s => sectionObserver.observe(s));
  }
})();
