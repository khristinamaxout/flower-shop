import { budgetTiers } from '../data/catalog.js';

export function renderBudgetSelector() {
  return `
    <section class="section" id="budget" aria-labelledby="budget-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Бюджет</p>
          <h2 class="section-title" id="budget-title">Выберите по бюджету</h2>
          <p class="section-subtitle">Подберём букет и подарок в нужном диапазоне</p>
        </header>

        <div class="budget-grid">
          ${budgetTiers
            .map(
              (tier, i) => `
            <button
              class="budget-card mobile-slide-up"
              data-budget-max="${tier.max}"
              data-budget-id="${tier.id}"
              type="button"
              style="--anim-delay: ${i * 0.08}s"
            >
              <span class="budget-card__label">${tier.label}</span>
              <span class="budget-card__hint">Смотреть подборку →</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

export function initBudgetSelector(onBudgetClick) {
  document.querySelectorAll('.budget-card').forEach((card) => {
    card.addEventListener('click', () => {
      onBudgetClick(Number(card.dataset.budgetMax), card.dataset.budgetId);
    });
  });
}
