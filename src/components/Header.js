import { siteConfig } from '../data/catalog.js';

const LOGO_ICON = `<svg class="header__logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
  <g stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 24V14c0-3 2.5-5.5 5.5-5.5"/>
    <path d="M14 8.5c-1.5-2.5-4.5-3.5-7-1.5"/>
    <path d="M14 8.5c1.5-2.5 4.5-3.5 7-1.5"/>
    <circle cx="14" cy="6" r="2" fill="#FFFFFF" stroke="none"/>
    <path d="M11.5 4c-.8-1.2-2-1.8-3.2-1"/>
    <path d="M16.5 4c.8-1.2 2-1.8 3.2-1"/>
  </g>
</svg>`;

export function renderHeader() {
  return `
    <header class="header" role="banner">
      <div class="container header__inner">
        <a href="#" class="header__logo" aria-label="${siteConfig.name} — на главную">
          <span class="header__logo-badge">
            ${LOGO_ICON}
            <span class="header__logo-text">${siteConfig.logoLine}</span>
          </span>
          <span class="header__logo-name">${siteConfig.name}</span>
        </a>

        <nav class="header__nav" aria-label="Основная навигация">
          <a href="#catalog">Букеты</a>
          <a href="#catalog">Композиции</a>
          <a href="#gifts">Подарки</a>
          <a href="#plants">Растения</a>
          <a href="#scenarios">Поводы</a>
          <a href="#delivery">Доставка</a>
        </nav>

        <div class="header__actions">
          <a href="${siteConfig.phoneLink}" class="header__phone" aria-label="Позвонить">${siteConfig.phone}</a>
          <a href="#catalog" class="btn btn--primary btn--sm header__cta">Заказать</a>
          <a href="#catalog" class="header__cart" aria-label="Заказать">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>
          </a>
          <button class="header__burger" aria-label="Открыть меню" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <a href="#catalog">Букеты</a>
        <a href="#collections">Коллекции</a>
        <a href="#gift-finder">Подобрать подарок</a>
        <a href="#scenarios">Поводы</a>
        <a href="#plants">Растения</a>
        <a href="#gifts">Подарки</a>
        <a href="#delivery">Доставка</a>
        <a href="#reviews">Отзывы</a>
      </nav>
      <div class="mobile-menu__contact">
        <a href="${siteConfig.phoneLink}" class="mobile-menu__phone">${siteConfig.phone}</a>
        <div class="mobile-menu__social">
          <a href="${siteConfig.telegram}" class="social-pill" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="${siteConfig.vk}" class="social-pill" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
        </div>
      </div>
    </div>
  `;
}

export function initHeader() {
  const burger = document.querySelector('.header__burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  const toggle = (open) => {
    burger.classList.toggle('is-active', open);
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  };

  burger.addEventListener('click', () => toggle(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggle(false)));
}
