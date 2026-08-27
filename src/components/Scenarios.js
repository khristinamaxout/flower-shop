import { scenarios } from '../data/catalog.js';

import { imgAttrs } from '../data/images.js';

export function renderScenarios() {
  return `
    <section class="section" id="scenarios" aria-labelledby="scenarios-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Сценарии</p>
          <h2 class="section-title" id="scenarios-title">Цветы для каждого момента</h2>
          <p class="section-subtitle">Выберите ситуацию — покажем подходящие букеты и композиции</p>
        </header>

        <div class="scenarios-grid">
          ${scenarios
            .map(
              (s, i) => `
            <button
              class="scenario-card mobile-slide-in"
              data-scenario-id="${s.id}"
              type="button"
              aria-label="Подборка: ${s.title}"
              style="--anim-delay: ${i * 0.1}s"
            >
              <div class="scenario-card__image">
                <img ${imgAttrs(s.image, s.alt, 400, 500)}>
              </div>
              <div class="scenario-card__overlay">
                <span class="scenario-card__title">${s.title}</span>
                <span class="scenario-card__hint">Смотреть подборку</span>
              </div>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

export function initScenarios(onScenarioClick) {
  document.querySelectorAll('.scenario-card').forEach((card) => {
    card.addEventListener('click', () => {
      onScenarioClick(card.dataset.scenarioId);
    });
  });
}
