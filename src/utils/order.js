import { siteConfig } from '../data/catalog.js';
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

/**
 * Show order confirmation toast
 * Replace with real checkout flow when backend is connected
 */
export function showOrderToast(message) {
  const toast = ensureToast();
  toast.textContent = message || `Позвоните нам для оформления: ${siteConfig.phone}`;
  toast.classList.add('is-visible');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 5000);
}

/**
 * Open phone or messenger for order
 */
export function initiateOrder(productName, addOns = []) {
  let message = productName
    ? `«${productName}» — свяжитесь с нами для оформления: ${siteConfig.phone}`
    : `Позвоните нам для оформления: ${siteConfig.phone}`;

  if (addOns.length) {
    message = `«${productName}» + ${addOns.join(', ')} — позвоните: ${siteConfig.phone}`;
  }

  showOrderToast(message);
}

export function initiateBundleOrder(bundleLabel, total) {
  showOrderToast(
    `Набор «${bundleLabel}» (${formatPrice(total)}) — позвоните для оформления: ${siteConfig.phone}`
  );
}

/**
 * Contact florist
 */
export function contactFlorist() {
  window.location.href = siteConfig.phoneLink;
}

/**
 * Modal manager for product selections
 */
export function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
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

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

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

/**
 * Render product list for modals
 */
export function renderModalProducts(products) {
  if (!products.length) {
    return `
      <div class="gift-finder__empty">
        <p>Подборка скоро появится. Позвоните — поможем подобрать вручную.</p>
        <a href="${siteConfig.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
      </div>
    `;
  }

  return `
    <div class="modal-products">
      ${products
        .slice(0, 8)
        .map(
          (p) => `
        <div class="modal-product">
          <div class="modal-product__image">
            <img ${imgAttrs(p.image, p.alt, 72, 90)}>
          </div>
          <div class="modal-product__info">
            <div class="modal-product__name">${p.name}</div>
            <div class="modal-product__desc">${p.description}</div>
            <div class="modal-product__price">${formatPrice(p.price)}</div>
          </div>
          <button class="btn btn--primary btn--sm" data-order-id="${p.id}">Заказать</button>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function bindOrderButtons(container, products, onOrder = initiateOrder) {
  container.querySelectorAll('[data-order-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = products.find((p) => p.id === btn.dataset.orderId);
      if (product) onOrder(product.name);
    });
  });
}
