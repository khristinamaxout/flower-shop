import { renderHeader, initHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderCategories, initCategories } from './components/Categories.js';
import { renderCollections, initCollections } from './components/Collections.js';
import { renderBestsellers, initProducts, updateProductsGrid, resetProductsTitle } from './components/Products.js';
import { renderGiftFinder, initGiftFinder } from './components/GiftFinder.js';
import { renderScenarios, initScenarios } from './components/Scenarios.js';
import { renderGiftBuilder, initGiftBuilder } from './components/GiftBuilder.js';
import { renderPlants, initPlants } from './components/Plants.js';
import { renderGifts } from './components/Gifts.js';
import { renderReviews } from './components/Reviews.js';
import { renderDelivery } from './components/Delivery.js';
import { renderSocialProof } from './components/SocialProof.js';
import { renderFooter, renderMobileBar, initMobileBar } from './components/Footer.js';

import { scenarios, categories, collections, siteConfig } from './data/catalog.js';
import {
  filterByScenario,
  getByCategory,
  reloadProducts,
  getProductById,
  filterByCollection,
  getBestsellers,
} from './data/products.js';
import {
  createModal,
  renderModalProducts,
  renderProductDetail,
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

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openProduct(id) {
  const product = getProductById(id);
  if (!product) return;
  modal.open(product.name, renderProductDetail(product));
}

function initOrderDelegation() {
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open-product]');
    if (openBtn) {
      e.preventDefault();
      openProduct(openBtn.dataset.openProduct);
      return;
    }

    const addonBtn = e.target.closest('[data-addon-name]');
    if (addonBtn) {
      const productId = addonBtn.dataset.productId;
      addonBtn.classList.toggle('is-selected');
      if (!selectedAddOns.has(productId)) selectedAddOns.set(productId, new Set());
      const set = selectedAddOns.get(productId);
      addonBtn.classList.contains('is-selected') ? set.add(addonBtn.dataset.addonName) : set.delete(addonBtn.dataset.addonName);
      return;
    }

    const orderBtn = e.target.closest('[data-order-id]');
    if (!orderBtn) return;
    const product = getProductById(orderBtn.dataset.orderId);
    if (product) {
      const addons = selectedAddOns.has(product.id) ? [...selectedAddOns.get(product.id)] : [];
      initiateOrder(product.name, addons);
      selectedAddOns.delete(product.id);
      modal.close();
    }
  });
}

function handleCategoryClick(categoryId) {
  const category = categories.find((c) => c.id === categoryId);
  const matched = getByCategory(categoryId);
  const titleEl = document.getElementById('products-title');
  const subtitleEl = document.getElementById('products-subtitle');
  if (titleEl && category) titleEl.textContent = category.name;
  if (subtitleEl) subtitleEl.textContent = matched.length ? `${matched.length} позиций` : 'Позвоните — подберём индивидуально';
  updateProductsGrid('products-grid', matched, 'В этой категории скоро появятся позиции.');
  scrollToSection('products');
}

function handleCollectionClick(_collectionId, filter) {
  const col = collections.find((c) => c.filter === filter || c.id === _collectionId);
  const matched = filterByCollection(filter || col?.filter);
  const titleEl = document.getElementById('products-title');
  const subtitleEl = document.getElementById('products-subtitle');
  if (titleEl && col) titleEl.textContent = col.title;
  if (subtitleEl && col) subtitleEl.textContent = col.subtitle;
  updateProductsGrid('products-grid', matched.length ? matched : getBestsellers(6));
  scrollToSection('products');
}

function handleScenarioClick(scenarioId) {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  if (!scenario) return;
  const matched = filterByScenario(scenario.tags);
  modal.open(scenario.title, renderModalProducts(matched));
}

function initApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      ${renderHero()}
      ${renderCategories()}
      ${renderCollections()}
      ${renderBestsellers()}
      ${renderGiftFinder()}
      ${renderScenarios()}
      ${renderGiftBuilder()}
      ${renderPlants()}
      ${renderGifts()}
      ${renderDelivery()}
      ${renderReviews()}
      ${renderSocialProof()}
    </main>
    ${renderFooter()}
    ${renderMobileBar()}
  `;

  initHeader();
  initGiftFinder();
  initProducts(openProduct);
  initCategories(handleCategoryClick);
  initCollections(handleCollectionClick);
  initScenarios(handleScenarioClick);
  initGiftBuilder(initiateBundleOrder);
  initPlants(handleCategoryClick);
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
