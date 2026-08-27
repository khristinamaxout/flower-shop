import { siteConfig } from '../data/catalog.js';

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">Flora Atelier</div>
            <p class="footer__tagline">Премиальные букеты и подарки с доставкой по Саратову</p>
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
              <a href="#" onclick="return false;">Политика конфиденциальности</a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>&copy; ${year} Flora Atelier. Цветы в Саратове.</span>
          <span>Доставка цветов по Саратову ежедневно</span>
        </div>
      </div>
    </footer>
  `;
}

export function renderMobileBar() {
  return `
    <div class="mobile-bar" role="navigation" aria-label="Быстрый заказ">
      <a href="${siteConfig.phoneLink}" class="btn btn--secondary">Позвонить</a>
      <a href="#catalog" class="btn btn--primary btn--pulse">Выбрать букет</a>
    </div>
  `;
}
