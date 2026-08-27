import { renderHeader, initHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderCategories, initCategories } from './components/Categories.js';
import { renderGiftFinder, initGiftFinder } from './components/GiftFinder.js';
import { renderBestsellers, initBestsellers, updateProductsGrid } from './components/Products.js';
import { renderGiftBuilder } from './components/GiftBuilder.js';
import { renderScenarios, initScenarios } from './components/Scenarios.js';
import { renderWhyUs } from './components/WhyUs.js';
import { renderGallery, initGallery } from './components/Gallery.js';
import { renderReviews } from './components/Reviews.js';
import { renderDelivery } from './components/Delivery.js';
import { renderFinalCta } from './components/FinalCta.js';
import { renderFooter, renderMobileBar } from './components/Footer.js';

import { scenarios, categories } from './data/catalog.js';
import { imgAttrs } from './data/images.js';
import { filterByScenario, getByCategory, products, getProductById } from './data/products.js';
import { createModal, renderModalProducts, initiateOrder } from './utils/order.js';
import { initRevealAnimations, initHeroParallax, initHeaderScroll, initSmoothScroll, initMobileAnimations, initScrollAnimations } from './utils/animations.js';

const modal = createModal();

function initOrderDelegation() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-order-id]');
    if (!btn) return;
    const product = getProductById(btn.dataset.orderId);
    if (product) initiateOrder(product.name);
  });
}

function handleScenarioClick(scenarioId) {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  if (!scenario) return;

  const matched = filterByScenario(scenario.tags);
  const html = renderModalProducts(matched);
  modal.open(scenario.title, html);
}

function handleCategoryClick(categoryId) {
  const category = categories.find((c) => c.id === categoryId);
  const matched = getByCategory(categoryId);

  const titleEl = document.getElementById('bestsellers-title');
  const subtitleEl = document.getElementById('bestsellers-subtitle');

  if (titleEl && category) {
    titleEl.textContent = category.name;
  }
  if (subtitleEl) {
    subtitleEl.textContent = matched.length
      ? `${matched.length} ${pluralize(matched.length, 'позиция', 'позиции', 'позиций')} в категории`
      : 'Популярные букеты и композиции — проверенный выбор наших клиентов';
  }

  const displayProducts = matched.length ? matched : products.filter((p) => p.bestseller);
  updateProductsGrid('bestsellers-grid', displayProducts);

  const bestsellersSection = document.getElementById('bestsellers');
  if (bestsellersSection) {
    setTimeout(() => {
      bestsellersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  if (matched.length > 0) {
    const html = renderModalProducts(matched);
    modal.open(category?.name || 'Каталог', html);
  }
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function handleGalleryViewAll() {
  modal.open('Наши работы', `
    <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.875rem;">
      Примеры реальных композиций нашего ателье. Для заказа похожего букета свяжитесь с флористом.
    </p>
    <div class="modal-products">
      ${products.slice(0, 6).map(p => `
        <div class="modal-product">
          <div class="modal-product__image">
            <img ${imgAttrs(p.image, p.alt, 72, 90)}>
          </div>
          <div class="modal-product__info">
            <div class="modal-product__name">${p.name}</div>
            <div class="modal-product__desc">${p.description}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `);
}

function initApp() {
  const app = document.getElementById('app');

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      ${renderHero()}
      ${renderCategories()}
      ${renderGiftFinder()}
      ${renderBestsellers()}
      ${renderGiftBuilder()}
      ${renderScenarios()}
      ${renderWhyUs()}
      ${renderGallery()}
      ${renderReviews()}
      ${renderDelivery()}
      ${renderFinalCta()}
    </main>
    ${renderFooter()}
    ${renderMobileBar()}
  `;

  initHeader();
  initGiftFinder();
  initBestsellers();
  initCategories(handleCategoryClick);
  initScenarios(handleScenarioClick);
  initGallery(handleGalleryViewAll);
  initOrderDelegation();

  initRevealAnimations();
  initScrollAnimations();
  initMobileAnimations();
  initHeroParallax();
  initHeaderScroll();
  initSmoothScroll();

  window.initScrollAnimations = initScrollAnimations;
}

document.addEventListener('DOMContentLoaded', initApp);
