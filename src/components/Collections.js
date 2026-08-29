import { collections } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

const layout = ['collection-card--large', '', 'collection-card--tall', 'collection-card--wide', '', 'collection-card--tall'];

export function renderCollections() {
  return `
    <section class="section section--alt" id="collections" aria-labelledby="collections-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Коллекции</p>
          <h2 class="section-title" id="collections-title">Найдите свой букет</h2>
        </header>
        <div class="collections-editorial collections-scroll">
          ${collections.map((c, i) => `
            <button type="button" class="collection-card ${layout[i] || ''} mobile-slide-in" data-collection="${c.id}" data-filter="${c.filter}" style="--anim-delay:${i * 0.08}s">
              <div class="collection-card__image">
                <img ${imgAttrs(c.image, c.alt, 500, 650)}>
              </div>
              <div class="collection-card__content">
                <h3 class="collection-card__title">${c.title}</h3>
                <p class="collection-card__subtitle">${c.subtitle}</p>
                <span class="collection-card__link">Подробнее →</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initCollections(onCollectionClick) {
  document.querySelectorAll('.collection-card').forEach((card) => {
    card.addEventListener('click', () => onCollectionClick?.(card.dataset.collection, card.dataset.filter));
  });
}
