import { addOnOptions, siteConfig } from '../data/catalog.js';
import { badgeLabels } from '../data/products.js';
import { imgAttrs } from '../data/images.js';

let toastEl = null;

function ensureToast() {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
  }
  return toastEl;
}

export function showOrderToast(message) {
  const toast = ensureToast();
  toast.textContent = message || `Позвоните для оформления: ${siteConfig.phone}`;
  toast.classList.add('is-visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('is-visible'), 5000);
}

export function initiateOrder(productName, addOns = []) {
  let message = productName
    ? `«${productName}» — позвоните для оформления: ${siteConfig.phone}`
    : `Позвоните для оформления: ${siteConfig.phone}`;
  if (addOns.length) message = `«${productName}» + ${addOns.join(', ')} — ${siteConfig.phone}`;
  showOrderToast(message);
}

export function initiateBundleOrder(bundleLabel, total) {
  showOrderToast(`Набор «${bundleLabel}» (${formatPrice(total)}) — ${siteConfig.phone}`);
}

export function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal--wide" role="dialog" aria-modal="true">
      <div class="modal__header">
        <h3 class="section-title" id="modal-title"></h3>
        <button class="modal__close" aria-label="Закрыть">&times;</button>
      </div>
      <div class="modal__body" id="modal-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.modal__close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  return {
    open(title, bodyHtml) {
      overlay.querySelector('#modal-title').textContent = title;
      overlay.querySelector('#modal-body').innerHTML = bodyHtml;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    },
    close,
  };
}

export function renderProductDetail(product) {
  const badge = product.badge && badgeLabels[product.badge]
    ? `<span class="product-detail__badge">${badgeLabels[product.badge]}</span>` : '';
  const priceHtml = product.oldPrice
    ? `<span class="product-detail__price-old">${formatPrice(product.oldPrice)}</span><span class="product-detail__price">${formatPrice(product.price)}</span>`
    : `<span class="product-detail__price">${formatPrice(product.price)}</span>`;

  return `
    <article class="product-detail">
      <div class="product-detail__image">
        <img ${imgAttrs(product.image, product.alt, 600, 750)}>
      </div>
      <div class="product-detail__info">
        ${badge}
        <h2 class="product-detail__name">${product.name}</h2>
        ${product.tagline ? `<p class="product-detail__tagline">${product.tagline}</p>` : ''}
        ${product.emotional ? `<p class="product-detail__emotional">${product.emotional}</p>` : ''}
        <div class="product-detail__pricing">${priceHtml}</div>
        <p class="product-detail__desc">${product.description}</p>
        <dl class="product-detail__meta">
          <div><dt>Размер</dt><dd>${product.size || 'Стандартный'}</dd></div>
          <div><dt>Состав</dt><dd>${product.composition || product.description}</dd></div>
        </dl>
        <div class="product-detail__addons">
          <p class="product-detail__addons-label">Добавить к заказу</p>
          <div class="product-detail__addons-list">
            ${addOnOptions.map((a) => `
              <button type="button" class="product-detail__addon" data-addon-name="${a.name}" data-product-id="${product.id}">+ ${a.name} · ${formatPrice(a.price)}</button>
            `).join('')}
          </div>
        </div>
        <button class="btn btn--primary btn--lg btn--full" data-order-id="${product.id}">Заказать букет</button>
      </div>
    </article>
  `;
}

export function renderModalProducts(products) {
  if (!products.length) {
    return `<div class="gift-finder__empty"><p>Подборка скоро появится. Позвоните — поможем подобрать.</p><a href="${siteConfig.phoneLink}" class="btn btn--primary" style="margin-top:1rem">Связаться с флористом</a></div>`;
  }
  return `<div class="modal-products">${products.slice(0, 6).map((p) => `
    <button type="button" class="modal-product" data-open-product="${p.id}">
      <div class="modal-product__image"><img ${imgAttrs(p.image, p.alt, 72, 90)}></div>
      <div class="modal-product__info">
        <div class="modal-product__name">${p.name}</div>
        <div class="modal-product__price">${formatPrice(p.price)}</div>
      </div>
    </button>
  `).join('')}</div>`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
}
