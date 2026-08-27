import { images, imgAttrs } from '../data/images.js';

export function renderGiftBuilder() {
  const items = [
    { label: 'Букет', image: images.giftBuilder.bouquet, alt: 'Букет' },
    { label: 'Шары', image: images.giftBuilder.balloons, alt: 'Воздушные шары' },
    { label: 'Игрушка', image: images.giftBuilder.toy, alt: 'Мягкая игрушка' },
    { label: 'Открытка', image: images.giftBuilder.card, alt: 'Авторская открытка' },
  ];

  return `
    <section class="section section--alt" id="gift-builder" aria-labelledby="gift-builder-title">
      <div class="container">
        <div class="gift-builder">
          <div class="gift-builder__visual reveal">
            ${items
              .map(
                (item, i) => `
              ${i > 0 ? '<span class="gift-builder__plus mobile-anim" data-delay="' + i + '" aria-hidden="true">+</span>' : ''}
              <div class="gift-builder__item mobile-anim" data-delay="${i}">
                <div class="gift-builder__item-icon">
                  <img ${imgAttrs(item.image, item.alt, 80, 80)}>
                </div>
                <span class="gift-builder__item-label">${item.label}</span>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="gift-builder__content reveal reveal-delay-2">
            <p class="section-label">Персональный подарок</p>
            <h2 class="section-title" id="gift-builder-title">Соберите свой подарок</h2>
            <p class="section-subtitle" style="margin: 1rem 0 2rem;">
              Объедините букет, шары, игрушку и открытку в один продуманный комплект — мы соберём всё с заботой о деталях.
            </p>
            <a href="#gift-finder" class="btn btn--primary btn--lg btn--pulse">Собрать подарок</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
