import { categories } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

const sizeClass = { featured: 'category-card--featured', wide: 'category-card--wide', tall: 'category-card--tall' };

export function renderCategories() {
  return `
    <section class="section pattern-bg pattern-bg--section" id="catalog" aria-labelledby="catalog-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="catalog-title">Выберите направление</h2>
          <p class="section-subtitle">Букеты, композиции и всё, что превращает цветы в настоящий подарок</p>
        </header>
        <div class="categories-editorial categories-scroll">
          ${categories.map((cat, i) => `
            <a href="#products" class="category-card ${sizeClass[cat.size] || ''} mobile-slide-in" data-category="${cat.id}" style="--anim-delay:${i * 0.07}s">
              <div class="category-card__image">
                <img ${imgAttrs(cat.image, cat.alt, 400, 533)}>
              </div>
              <div class="category-card__overlay">
                <span class="category-card__name">${cat.name}</span>
                <span class="category-card__hint">Смотреть</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initCategories(onCategoryClick) {
  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      onCategoryClick?.(card.dataset.category);
    });
  });
}
