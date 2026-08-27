import { giftFinderOptions, siteConfig } from '../data/catalog.js';
import { filterByGiftFinder } from '../data/products.js';
import { formatPrice } from '../utils/order.js';
import { imgAttrs } from '../data/images.js';

const STEPS = ['recipient', 'occasion', 'budget'];
const STEP_LABELS = ['Для кого', 'Повод', 'Бюджет'];

export function renderGiftFinder() {
  return `
    <section class="section section--alt gift-finder-section" id="gift-finder" aria-labelledby="gift-finder-title">
      <div class="container">
        <div class="gift-finder-section__layout">
          <header class="section-header reveal">
            <p class="section-label">Помощник</p>
            <h2 class="section-title" id="gift-finder-title">Не знаете, что подарить?</h2>
            <p class="section-subtitle">
              Подберём цветы и подарок под человека, повод и ваш бюджет.
            </p>
          </header>

          <div class="gift-finder reveal" id="gift-finder-widget">
            <div class="gift-finder__steps" role="tablist" aria-label="Шаги подбора">
              ${STEP_LABELS.map(
                (label, i) => `
                <div class="gift-finder__step-indicator ${i === 0 ? 'is-active' : ''}" data-step-index="${i}">
                  <span class="gift-finder__step-num">${i + 1}</span>
                  <span>${label}</span>
                </div>
              `
              ).join('')}
            </div>

            <div class="gift-finder__wizard" id="gift-finder-wizard">
              <h3 class="gift-finder__question" id="gift-finder-question"></h3>
              <div class="gift-finder__options" id="gift-finder-options" role="group"></div>
            </div>

            <div class="gift-finder__results" id="gift-finder-results">
              <h3 class="gift-finder__question">Вам подойдёт</h3>
              <div class="gift-finder__results-grid" id="gift-finder-results-grid"></div>
              <div class="gift-finder__actions">
                <button class="btn btn--secondary" id="gift-finder-reset">Начать заново</button>
                <a href="#bestsellers" class="btn btn--ghost">Смотреть все хиты →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initGiftFinder() {
  const widget = document.getElementById('gift-finder-widget');
  if (!widget) return;

  const wizard = document.getElementById('gift-finder-wizard');
  const results = document.getElementById('gift-finder-results');
  const questionEl = document.getElementById('gift-finder-question');
  const optionsEl = document.getElementById('gift-finder-options');
  const resultsGrid = document.getElementById('gift-finder-results-grid');
  const indicators = widget.querySelectorAll('.gift-finder__step-indicator');
  const resetBtn = document.getElementById('gift-finder-reset');

  const state = { recipient: null, occasion: null, budget: null };
  let currentStep = 0;

  const questions = {
    recipient: 'Для кого выбираете?',
    occasion: 'Какой повод?',
    budget: 'Какой бюджет?',
  };

  function getOptions(step) {
    if (step === 'budget') return giftFinderOptions.budget;
    return giftFinderOptions[step];
  }

  function updateIndicators() {
    indicators.forEach((ind, i) => {
      ind.classList.remove('is-active', 'is-done');
      if (i < currentStep) ind.classList.add('is-done');
      if (i === currentStep) ind.classList.add('is-active');
    });
  }

  function renderStep() {
    const step = STEPS[currentStep];
    questionEl.textContent = questions[step];

    const options = getOptions(step);
    optionsEl.innerHTML = options
      .map(
        (opt) => `
      <button
        class="gift-finder__option ${state[step] === opt.id ? 'is-selected' : ''}"
        data-value="${opt.id}"
        type="button"
      >${opt.label}</button>
    `
      )
      .join('');

    optionsEl.querySelectorAll('.gift-finder__option').forEach((btn) => {
      btn.addEventListener('click', () => selectOption(step, btn.dataset.value));
    });

    updateIndicators();
  }

  function selectOption(step, value) {
    state[step] = value;

    if (currentStep < STEPS.length - 1) {
      currentStep++;
      renderStep();
    } else {
      showResults();
    }
  }

  function showResults() {
    wizard.style.display = 'none';
    results.classList.add('is-visible');

    indicators.forEach((ind) => ind.classList.add('is-done'));

    const budgetOpt = giftFinderOptions.budget.find((b) => b.id === state.budget);
    const maxBudget = budgetOpt?.max ?? Infinity;

    const matched = filterByGiftFinder({
      recipient: state.recipient,
      occasion: state.occasion,
      budget: maxBudget,
    });

    if (matched.length === 0) {
      resultsGrid.innerHTML = `
        <div class="gift-finder__empty">
          <p>Точного совпадения нет — но мы подберём идеальный вариант.</p>
          <a href="${siteConfig.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = matched
      .slice(0, 3)
      .map(
        (p) => `
      <article class="product-card">
        <div class="product-card__image">
          <img ${imgAttrs(p.image, p.alt, 400, 500)}>
        </div>
        <div class="product-card__info">
          <h4 class="product-card__name">${p.name}</h4>
          <p class="product-card__desc">${p.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${formatPrice(p.price)}</span>
            <button class="btn btn--primary btn--sm" data-order-id="${p.id}">Заказать</button>
          </div>
        </div>
      </article>
    `
      )
      .join('');
  }

  function reset() {
    state.recipient = null;
    state.occasion = null;
    state.budget = null;
    currentStep = 0;
    wizard.style.display = '';
    results.classList.remove('is-visible');
    renderStep();
  }

  resetBtn?.addEventListener('click', reset);
  renderStep();
}
