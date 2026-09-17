(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', () => nav.classList.remove('open')));
  }
  const tabs = [...document.querySelectorAll('.tab')];
  const panels = [...document.querySelectorAll('.tab-panel')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle('active', item === tab));
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === id));
  }));
  const search = document.querySelector('#post-search');
  const cards = [...document.querySelectorAll('.post-card')];
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  let category = 'Todos';
  const filter = () => {
    const term = (search?.value || '').toLowerCase().trim();
    cards.forEach((card) => {
      const matchesCategory = category === 'Todos' || card.dataset.category === category;
      const matchesSearch = !term || card.dataset.search.includes(term);
      card.hidden = !(matchesCategory && matchesSearch);
    });
  };
  search?.addEventListener('input', filter);
  categoryButtons.forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.category || 'Todos';
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    filter();
  }));
})();
