import { categories } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

const layoutClasses = [
  'category-card--featured',
  '',
  'category-card--wide',
  '',
  'category-card--tall',
  '',
  'category-card--wide',
  '',
];

export function renderCategories() {
  return `
    <section class="section pattern-bg pattern-bg--section" id="catalog" aria-labelledby="catalog-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="catalog-title">Выберите направление</h2>
          <p class="section-subtitle">Не каталог ради каталога — путь к&nbsp;идеальному подарку</p>
        </header>

        <div class="categories-editorial categories-scroll">
          ${categories
            .map(
              (cat, i) => `
            <a href="#bestsellers" class="category-card ${layoutClasses[i] || ''} mobile-slide-in" data-category="${cat.id}" style="--anim-delay: ${i * 0.08}s">
              <div class="category-card__image">
                <img ${imgAttrs(cat.image, cat.alt, 400, 533)}>
              </div>
              <div class="category-card__overlay">
                <span class="category-card__name">${cat.name}</span>
              </div>
              <span class="category-card__arrow" aria-hidden="true">→</span>
            </a>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

export function initCategories(onCategoryClick) {
  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const categoryId = card.dataset.category;
      if (onCategoryClick) onCategoryClick(categoryId);
    });
  });
}
