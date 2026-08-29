import { getBestsellers, badgeLabels } from '../data/products.js';
import { addOnOptions } from '../data/catalog.js';
import { formatPrice } from '../utils/order.js';
import { imgAttrs } from '../data/images.js';

export function renderProducts(products, options = {}) {
  const {
    title = 'Выбирают чаще всего',
    subtitle = 'Каждый букет — маленькая история',
    id = 'products',
    emptyMessage = null,
  } = options;

  const gridContent = products.length
    ? products.map((p, i) => renderProductCard(p, i)).join('')
    : `<div class="products-empty"><p>${emptyMessage || 'Скоро появятся новые позиции — позвоните, подберём индивидуально.'}</p></div>`;

  return `
    <section class="section" id="${id}" aria-labelledby="${id}-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="${id}-title">${title}</h2>
          <p class="section-subtitle" id="${id}-subtitle">${subtitle}</p>
        </header>
        <div class="products-editorial" id="${id}-grid">${gridContent}</div>
      </div>
    </section>
  `;
}

function renderBadge(badge) {
  if (!badge || !badgeLabels[badge]) return '';
  return `<span class="product-card__badge product-card__badge--${badge}">${badgeLabels[badge]}</span>`;
}

export function renderProductCard(product, index = 0) {
  const delay = index * 0.06;
  const priceHtml = product.oldPrice
    ? `<span class="product-card__price-old">${formatPrice(product.oldPrice)}</span><span class="product-card__price">${formatPrice(product.price)}</span>`
    : `<span class="product-card__price">${formatPrice(product.price)}</span>`;

  return `
    <article class="product-card mobile-slide-up image-reveal" data-product-id="${product.id}" style="--anim-delay:${delay}s">
      <button type="button" class="product-card__link" data-open-product="${product.id}" aria-label="Подробнее о ${product.name}">
        <div class="product-card__image">
          ${renderBadge(product.badge)}
          <img ${imgAttrs(product.image, product.alt, 400, 500)}>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${product.name}</h3>
          ${product.tagline ? `<p class="product-card__tagline">${product.tagline}</p>` : ''}
          <div class="product-card__footer">
            <div class="product-card__pricing">${priceHtml}</div>
            <span class="product-card__more">Подробнее →</span>
          </div>
        </div>
      </button>
    </article>
  `;
}

export function renderBestsellers() {
  return renderProducts(getBestsellers(8), {
    title: 'Выбирают чаще всего',
    subtitle: 'Каждый букет — маленькая история',
    id: 'products',
  });
}

export function updateProductsGrid(gridId, products, emptyMessage = null) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = products.length
    ? products.map((p, i) => renderProductCard(p, i)).join('')
    : `<div class="products-empty"><p>${emptyMessage || 'В этой подборке пока нет позиций.'}</p></div>`;
  window.initScrollAnimations?.(grid);
}

export function resetProductsTitle() {
  const t = document.getElementById('products-title');
  const s = document.getElementById('products-subtitle');
  if (t) t.textContent = 'Выбирают чаще всего';
  if (s) s.textContent = 'Каждый букет — маленькая история';
}

export function initProducts(onProductOpen) {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-product]');
    if (btn) {
      e.preventDefault();
      onProductOpen?.(btn.dataset.openProduct);
    }
  });
}
