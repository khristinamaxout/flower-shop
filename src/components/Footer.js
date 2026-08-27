import { siteConfig } from '../data/catalog.js';

export function renderFooter() {
  const year = new Date().getFullYear();
  const adminBase = import.meta.env.BASE_URL;

  return `
    <footer class="footer pattern-bg pattern-bg--footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">Flora Atelier</div>
            <p class="footer__tagline">Цветы в Саратове — букеты, которые хочется подарить</p>
            <div class="footer__social">
              <a href="${siteConfig.telegram}" target="_blank" rel="noopener" aria-label="Telegram">TG</a>
              <a href="${siteConfig.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
              <a href="${siteConfig.vk}" target="_blank" rel="noopener" aria-label="ВКонтакте">VK</a>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Контакты</h3>
            <div class="footer__links">
              <a href="${siteConfig.phoneLink}">${siteConfig.phone}</a>
              <a href="${siteConfig.telegram}" target="_blank" rel="noopener">Telegram</a>
              <a href="${siteConfig.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Магазин</h3>
            <div class="footer__links">
              <span>${siteConfig.address}</span>
              <span>${siteConfig.hours}</span>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Информация</h3>
            <div class="footer__links">
              <a href="#delivery">Доставка</a>
              <a href="#catalog">Каталог</a>
              <a href="${adminBase}admin.html">Админ-панель</a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>&copy; ${year} Flora Atelier. Цветочный магазин Саратов.</span>
          <span>Купить цветы с доставкой по Саратову</span>
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

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '0px' }
  );

  observer.observe(hero);
}
