import { siteConfig } from '../data/catalog.js';

export function renderFooter() {
  const year = new Date().getFullYear();
  const base = import.meta.env.BASE_URL;

  return `
    <footer class="footer pattern-bg pattern-bg--footer" role="contentinfo">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand-block">
            <div class="footer__logo">${siteConfig.logoLine} · ${siteConfig.name}</div>
            <p class="footer__tagline">${siteConfig.tagline}</p>
          </div>
          <nav class="footer__nav" aria-label="Навигация в подвале">
            <a href="#catalog">Букеты</a>
            <a href="#gifts">Подарки</a>
            <a href="#delivery">Доставка</a>
            <a href="#reviews">Отзывы</a>
            <a href="${base}admin.html">Админ-панель</a>
          </nav>
          <div class="footer__contact">
            <a href="${siteConfig.phoneLink}" class="footer__phone">${siteConfig.phone}</a>
            <p class="footer__city">${siteConfig.address}</p>
            <div class="footer__social" aria-label="Социальные сети">
              <a href="${siteConfig.telegram}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="Telegram — ${siteConfig.name}">
                <span class="social-pill__icon" aria-hidden="true">TG</span>
                <span>Telegram</span>
              </a>
              <a href="${siteConfig.vk}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="ВКонтакте — ${siteConfig.name}">
                <span class="social-pill__icon" aria-hidden="true">VK</span>
                <span>ВКонтакте</span>
              </a>
              <a href="${siteConfig.instagram}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="Instagram — ${siteConfig.name}">
                <span class="social-pill__icon" aria-hidden="true">IG</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${year} ${siteConfig.name}. Демонстрационный сайт.</span>
          <span>Цветы с доставкой по Саратову</span>
        </div>
      </div>
    </footer>
  `;
}

export function renderMobileBar() {
  return `
    <div class="mobile-bar" id="mobile-bar" role="navigation" aria-label="Быстрый заказ">
      <a href="#catalog" class="btn btn--primary btn--full mobile-bar__cta">Выбрать букет</a>
    </div>
  `;
}

export function initMobileBar() {
  const bar = document.getElementById('mobile-bar');
  const hero = document.querySelector('.hero');
  if (!bar || !hero) return;
  const observer = new IntersectionObserver(([e]) => bar.classList.toggle('is-visible', !e.isIntersecting), { threshold: 0 });
  observer.observe(hero);
}
