import { siteConfig } from '../data/catalog.js';

export function renderHeader() {
  return `
    <header class="header" role="banner">
      <div class="container header__inner">
        <a href="#" class="header__logo" aria-label="${siteConfig.name} — на главную">
          Flora <span>Atelier</span>
        </a>

        <nav class="header__nav" aria-label="Основная навигация">
          <a href="#catalog">Каталог</a>
          <a href="#gift-finder">Подобрать подарок</a>
          <a href="#bestsellers">Хиты</a>
          <a href="#gallery">Работы</a>
          <a href="#delivery">Доставка</a>
        </nav>

        <div class="header__actions">
          <a href="${siteConfig.phoneLink}" class="header__phone">${siteConfig.phone}</a>
          <a href="#catalog" class="btn btn--primary btn--sm header__cta btn--pulse">Выбрать букет</a>
          <button class="header__burger" aria-label="Открыть меню" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <a href="#catalog">Каталог</a>
        <a href="#gift-finder">Подобрать подарок</a>
        <a href="#bestsellers">Хиты продаж</a>
        <a href="#scenarios">По поводу</a>
        <a href="#gallery">Наши работы</a>
        <a href="#delivery">Доставка</a>
        <a href="#reviews">Отзывы</a>
      </nav>
      <div class="mobile-menu__contact">
        <a href="${siteConfig.phoneLink}" class="mobile-menu__phone">${siteConfig.phone}</a>
        <a href="${siteConfig.telegram}" class="btn btn--secondary btn--full" target="_blank" rel="noopener">Telegram</a>
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

  burger.addEventListener('click', () => {
    toggle(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
}
