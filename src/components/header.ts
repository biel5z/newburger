/** Header fixo: fundo ao rolar, menu mobile e link ativo conforme a seção visível. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')!;
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]')!;
  const links = [...header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open: boolean) => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only')!.textContent = open ? 'Fechar menu' : 'Abrir menu';
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('is-menu-open')));
  header.querySelectorAll('.nav__link').forEach((l) => l.addEventListener('click', () => setMenu(false)));

  // link ativo
  const sections = links
    .map((l) => document.querySelector<HTMLElement>(l.hash))
    .filter((s): s is HTMLElement => Boolean(s));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => {
          const active = l.hash === `#${entry.target.id}`;
          l.classList.toggle('is-active', active);
          if (active) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
}
