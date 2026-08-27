import { renderHeader, initHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderCategories, initCategories } from './components/Categories.js';
import { renderGiftFinder, initGiftFinder } from './components/GiftFinder.js';
import { renderBestsellers, initBestsellers, updateProductsGrid } from './components/Products.js';
import { renderScenarios, initScenarios } from './components/Scenarios.js';
import { renderBudgetSelector, initBudgetSelector } from './components/BudgetSelector.js';
import { renderGiftBuilder, initGiftBuilder } from './components/GiftBuilder.js';
import { renderSeasonalCollection, initSeasonalCollection } from './components/SeasonalCollection.js';
import { renderWhyUs } from './components/WhyUs.js';
import { renderGallery, initGallery } from './components/Gallery.js';
import { renderReviews } from './components/Reviews.js';
import { renderDelivery } from './components/Delivery.js';
import { renderFinalCta } from './components/FinalCta.js';
import { renderFooter, renderMobileBar, initMobileBar } from './components/Footer.js';
import { renderEmotionalCommerce } from './components/EmotionalCommerce.js';

import { scenarios, categories, budgetTiers, siteConfig } from './data/catalog.js';
import { imgAttrs } from './data/images.js';
import {
  filterByScenario,
  getByCategory,
  reloadProducts,
  products,
  getProductById,
  filterByBudget,
  getSeasonalProducts,
  getBestsellers,
} from './data/products.js';
import {
  createModal,
  renderModalProducts,
  initiateOrder,
  initiateBundleOrder,
} from './utils/order.js';
import {
  initRevealAnimations,
  initHeroParallax,
  initHeaderScroll,
  initSmoothScroll,
  initMobileAnimations,
  initScrollAnimations,
} from './utils/animations.js';
import { injectSchema } from './utils/schema.js';

const modal = createModal();
const selectedAddOns = new Map();

function initOrderDelegation() {
  document.addEventListener('click', (e) => {
    const addonBtn = e.target.closest('[data-addon-id]');
    if (addonBtn) {
      const productId = addonBtn.dataset.productId;
      const addonName = addonBtn.dataset.addonName;
      addonBtn.classList.toggle('is-selected');

      if (!selectedAddOns.has(productId)) selectedAddOns.set(productId, new Set());
      const addons = selectedAddOns.get(productId);
      if (addonBtn.classList.contains('is-selected')) {
        addons.add(addonName);
      } else {
        addons.delete(addonName);
      }
      return;
    }

    const btn = e.target.closest('[data-order-id]');
    if (!btn) return;
    const product = getProductById(btn.dataset.orderId);
    if (product) {
      const addons = selectedAddOns.has(product.id)
        ? [...selectedAddOns.get(product.id)]
        : [];
      initiateOrder(product.name, addons);
      selectedAddOns.delete(product.id);
    }
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    setTimeout(() => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
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

  if (matched.length === 0) {
    if (subtitleEl) {
      subtitleEl.textContent = 'Скоро появится — позвоните, подберём индивидуально';
    }
    updateProductsGrid(
      'bestsellers-grid',
      [],
      'В этой категории пока нет позиций. Позвоните — флорист подберёт идеальный вариант.'
    );
    scrollToSection('bestsellers');
    modal.open(
      category?.name || 'Каталог',
      `<div class="gift-finder__empty">
        <p>В категории «${category?.name}» скоро появятся позиции.</p>
        <a href="${siteConfig.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
      </div>`
    );
    return;
  }

  if (subtitleEl) {
    subtitleEl.textContent = `${matched.length} ${pluralize(matched.length, 'позиция', 'позиции', 'позиций')} в категории`;
  }

  updateProductsGrid('bestsellers-grid', matched);
  scrollToSection('bestsellers');

  const html = renderModalProducts(matched);
  modal.open(category?.name || 'Каталог', html);
}

function handleBudgetClick(maxBudget, budgetId) {
  const tier = budgetTiers.find((t) => t.id === budgetId);
  const matched = filterByBudget(maxBudget);

  const titleEl = document.getElementById('bestsellers-title');
  const subtitleEl = document.getElementById('bestsellers-subtitle');

  if (titleEl) titleEl.textContent = `Букеты ${tier?.label || ''}`;
  if (subtitleEl) {
    subtitleEl.textContent = matched.length
      ? `${matched.length} ${pluralize(matched.length, 'вариант', 'варианта', 'вариантов')} в бюджете`
      : 'Позвоните — подберём индивидуально';
  }

  updateProductsGrid('bestsellers-grid', matched.length ? matched : []);
  scrollToSection('bestsellers');

  if (matched.length) {
    modal.open(`Букеты ${tier?.label}`, renderModalProducts(matched));
  } else {
    modal.open(
      `Букеты ${tier?.label}`,
      `<div class="gift-finder__empty">
        <p>Точного совпадения нет — но мы подберём идеальный вариант в вашем бюджете.</p>
        <a href="${siteConfig.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
      </div>`
    );
  }
}

function handleSeasonalClick() {
  const matched = getSeasonalProducts();
  modal.open('Сейчас в цвету', renderModalProducts(matched.length ? matched : getBestsellers(6)));
  scrollToSection('bestsellers');
  updateProductsGrid('bestsellers-grid', matched.length ? matched : getBestsellers(6));
  const titleEl = document.getElementById('bestsellers-title');
  const subtitleEl = document.getElementById('bestsellers-subtitle');
  if (titleEl) titleEl.textContent = 'Сейчас в цвету';
  if (subtitleEl) subtitleEl.textContent = 'Сезонная коллекция — свежие композиции этого месяца';
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
  modal.open('Букеты, которые мы уже создали', `
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
      ${renderBestsellers()}
      ${renderGiftFinder()}
      ${renderEmotionalCommerce()}
      ${renderScenarios()}
      ${renderBudgetSelector()}
      ${renderGiftBuilder()}
      ${renderSeasonalCollection()}
      ${renderGallery()}
      ${renderReviews()}
      ${renderWhyUs()}
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
  initBudgetSelector(handleBudgetClick);
  initGiftBuilder(initiateBundleOrder);
  initSeasonalCollection(handleSeasonalClick);
  initGallery(handleGalleryViewAll);
  initOrderDelegation();
  initMobileBar();

  initRevealAnimations();
  initScrollAnimations();
  initMobileAnimations();
  initHeroParallax();
  initHeaderScroll();
  initSmoothScroll();
  injectSchema();

  window.initScrollAnimations = initScrollAnimations;

  window.addEventListener('storage', () => reloadProducts());
  window.addEventListener('products-updated', () => reloadProducts());
}

document.addEventListener('DOMContentLoaded', initApp);
