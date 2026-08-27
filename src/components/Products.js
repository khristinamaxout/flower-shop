import { getBestsellers, badgeLabels } from '../data/products.js';
import { addOnOptions } from '../data/catalog.js';
import { formatPrice } from '../utils/order.js';
import { imgAttrs } from '../data/images.js';

export function renderProducts(products, options = {}) {
  const {
    title = 'Выбирают чаще всего',
    subtitle = 'Популярные букеты и композиции — проверенный выбор наших клиентов',
    id = 'bestsellers',
    showAllLink = false,
    emptyMessage = null,
  } = options;

  const gridContent = products.length
    ? products.map((p, i) => renderProductCard(p, i)).join('')
    : renderEmptyState(emptyMessage);

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
          ${gridContent}
        </div>
      </div>
    </section>
  `;
}

function renderBadge(badge) {
  if (!badge || !badgeLabels[badge]) return '';
  return `<span class="product-card__badge product-card__badge--${badge}">${badgeLabels[badge]}</span>`;
}

function renderAddOns(product) {
  if (!product.addOns) return '';

  return `
    <div class="product-card__addons">
      <p class="product-card__addons-label">Добавить к заказу</p>
      <div class="product-card__addons-list">
        ${addOnOptions
          .slice(0, 4)
          .map(
            (addon) => `
          <button
            class="product-card__addon"
            type="button"
            data-addon-id="${addon.id}"
            data-addon-name="${addon.name}"
            data-addon-price="${addon.price}"
            data-product-id="${product.id}"
            aria-label="Добавить ${addon.name}"
          >+ ${addon.name}</button>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

export function renderProductCard(product, index = 0) {
  const delay = index * 0.07;
  const priceHtml = product.oldPrice
    ? `<span class="product-card__price-old">${formatPrice(product.oldPrice)}</span><span class="product-card__price">${formatPrice(product.price)}</span>`
    : `<span class="product-card__price">${formatPrice(product.price)}</span>`;

  return `
    <article class="product-card mobile-slide-up" data-product-id="${product.id}" style="--anim-delay: ${delay}s">
      <div class="product-card__image">
        ${renderBadge(product.badge)}
        <img ${imgAttrs(product.image, product.alt, 400, 500)}>
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        ${renderAddOns(product)}
        <div class="product-card__footer">
          <div class="product-card__pricing">${priceHtml}</div>
          <button class="btn btn--primary btn--sm" data-order-id="${product.id}">Заказать</button>
        </div>
      </div>
    </article>
  `;
}

function renderEmptyState(message) {
  return `
    <div class="products-empty">
      <p>${message || 'В этой категории скоро появятся позиции — позвоните, подберём индивидуально.'}</p>
    </div>
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
  /* Order and add-on buttons handled via delegation in main.js */
}

export function updateProductsGrid(gridId, products, emptyMessage = null) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = products.length
    ? products.map((p, i) => renderProductCard(p, i)).join('')
    : renderEmptyState(emptyMessage);

  if (window.initScrollAnimations) {
    window.initScrollAnimations(grid);
  }
}

export function resetBestsellersTitle() {
  const titleEl = document.getElementById('bestsellers-title');
  const subtitleEl = document.getElementById('bestsellers-subtitle');
  if (titleEl) titleEl.textContent = 'Выбирают чаще всего';
  if (subtitleEl) {
    subtitleEl.textContent =
      'Популярные букеты и композиции — проверенный выбор наших клиентов';
  }
}
