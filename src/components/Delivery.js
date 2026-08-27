import { deliveryInfo, siteConfig } from '../data/catalog.js';

export function renderDelivery() {
  const items = [
    { label: 'Куда доставляем', text: deliveryInfo.areas },
    { label: 'Сроки', text: deliveryInfo.timing },
    { label: 'Стоимость', text: deliveryInfo.cost },
    { label: 'Срочная доставка', text: deliveryInfo.express },
    { label: 'Как оформить', text: deliveryInfo.howTo },
    { label: 'Самовывоз', text: `${siteConfig.address}. ${siteConfig.hours}.` },
  ];

  return `
    <section class="section" id="delivery" aria-labelledby="delivery-title">
      <div class="container container--narrow">
        <header class="section-header reveal">
          <p class="section-label">Доставка</p>
          <h2 class="section-title" id="delivery-title">Доставка цветов в Саратове</h2>
          <p class="section-subtitle" style="margin-top: 1rem;">Просто, быстро и в удобное для вас время</p>
        </header>

        <div class="delivery-grid reveal">
          ${items
            .map(
              (item) => `
            <div class="delivery-item">
              <h3 class="delivery-item__label">${item.label}</h3>
              <p class="delivery-item__text">${item.text}</p>
            </div>
          `
            )
            .join('')}
        </div>

        <div style="margin-top: 3rem; text-align: center;" class="reveal">
          <a href="${siteConfig.phoneLink}" class="btn btn--primary btn--lg">Заказать доставку</a>
        </div>
      </div>
    </section>
  `;
}
