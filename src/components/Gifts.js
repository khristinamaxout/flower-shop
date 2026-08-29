import { giftCategories } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

const layout = ['gift-item--wide', '', 'gift-item--tall', '', 'gift-item--wide', ''];

export function renderGifts() {
  return `
    <section class="section section--alt" id="gifts" aria-labelledby="gifts-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Подарки</p>
          <h2 class="section-title" id="gifts-title">Добавьте к букету что-то ещё</h2>
          <p class="section-subtitle">Игрушки, шары, свечи, сувениры — соберите идеальный подарок</p>
        </header>
        <div class="gifts-editorial">
          ${giftCategories.map((g, i) => `
            <a href="#gift-builder" class="gift-item ${layout[i] || ''} mobile-scale-in" style="--anim-delay:${i * 0.07}s">
              <div class="gift-item__image">
                <img ${imgAttrs(g.image, g.alt, 400, 500)}>
              </div>
              <span class="gift-item__name">${g.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
