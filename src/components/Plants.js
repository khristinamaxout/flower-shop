import { images, imgAttrs } from '../data/images.js';

export function renderPlants() {
  return `
    <section class="section plants-block" id="plants" aria-labelledby="plants-title">
      <div class="container">
        <div class="plants-block__layout reveal">
          <div class="plants-block__media image-reveal">
            <img ${imgAttrs(images.plants, 'Комнатные растения — Flora Atelier, Саратов', 1200, 900)}>
          </div>
          <div class="plants-block__content">
            <p class="section-label">Растения</p>
            <h2 class="section-title" id="plants-title">Цветы, которые остаются с&nbsp;вами</h2>
            <p class="section-subtitle">Комнатные растения в керамике — подарок, который будет радовать месяцами</p>
            <a href="#products" class="btn btn--primary btn--lg" data-category-link="potted">Смотреть растения</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initPlants(onCategoryClick) {
  document.querySelector('[data-category-link="potted"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    onCategoryClick?.('potted');
  });
}
