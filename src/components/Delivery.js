import { deliveryInfo, siteConfig } from '../data/catalog.js';

export function renderDelivery() {
  return `
    <section class="section section--alt" id="delivery" aria-labelledby="delivery-title">
      <div class="container container--narrow">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Доставка</p>
          <h2 class="section-title" id="delivery-title">${deliveryInfo.headline}</h2>
          <p class="section-subtitle">${deliveryInfo.subline}</p>
        </header>
        <div class="delivery-highlight reveal">
          ${deliveryInfo.items.map((item) => `
            <div class="delivery-highlight__item">
              <span class="delivery-highlight__label">${item.label}</span>
              <p class="delivery-highlight__text">${item.text}</p>
            </div>
          `).join('')}
        </div>
        <div class="delivery-cta reveal">
          <a href="${siteConfig.phoneLink}" class="btn btn--primary btn--lg">Оформить заказ</a>
        </div>
      </div>
    </section>
  `;
}
