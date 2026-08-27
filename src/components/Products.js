import { getBestsellers } from '../data/products.js';
import { formatPrice } from '../utils/order.js';
import { imgAttrs } from '../data/images.js';
export function renderProducts(products, options = {}) {
  const { title = 'Выбирают чаще всего', subtitle = 'Популярные букеты и композиции — проверенный выбор наших клиентов', id = 'bestsellers', showAllLink = false } = options;

  return `
    <section class="section" id="${id}" aria-labelledby="${id}-title">
      <div class="container">
        <header class="section-header section-header__row reveal">
          <div>
            <p class="section-label">Хиты продаж</p>
            <h2 class="section-title" id="${id}-title">${title}</h2>
            ${subtitle ? `<p class="section-subtitle" id="${id}-subtitle" style="margin-top: 1rem;">${subtitle}</p>` : ''}
          </div>
          ${showAllLink ? `<a href="#catalog" class="btn btn--ghost">Весь каталог →</a>` : ''}
        </header>

        <div class="products-grid" id="${id}-grid">
          ${products.map((p, i) => renderProductCard(p, i)).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderProductCard(product, index = 0) {
  const delay = index * 0.07;
  return `
    <article class="product-card mobile-slide-up" data-product-id="${product.id}" style="--anim-delay: ${delay}s">
      <div class="product-card__image">
        <img ${imgAttrs(product.image, product.alt, 400, 500)}>
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          <button class="btn btn--primary btn--sm" data-order-id="${product.id}">Заказать</button>
        </div>
      </div>
    </article>
  `;
}

export function renderBestsellers() {
  const products = getBestsellers(8);
  return renderProducts(products, {
    title: 'Выбирают чаще всего',
    subtitle: 'Популярные букеты и композиции — проверенный выбор наших клиентов',
    id: 'bestsellers',
  });
}

export function initBestsellers() {
  /* Order buttons handled via delegation in main.js */
}

export function updateProductsGrid(gridId, products) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');

  if (window.initScrollAnimations) {
    window.initScrollAnimations(grid);
  }
}
