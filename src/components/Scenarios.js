import { scenarios } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

export function renderScenarios() {
  return `
    <section class="section" id="scenarios" aria-labelledby="scenarios-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Поводы</p>
          <h2 class="section-title" id="scenarios-title">Иногда цветы говорят лучше слов</h2>
        </header>
        <div class="scenarios-editorial">
          ${scenarios.map((s, i) => `
            <button type="button" class="scenario-card mobile-slide-in" data-scenario-id="${s.id}" style="--anim-delay:${i * 0.08}s">
              <div class="scenario-card__image">
                <img ${imgAttrs(s.image, s.alt, 400, 500)}>
              </div>
              <div class="scenario-card__content">
                <h3 class="scenario-card__title">${s.title}</h3>
                <p class="scenario-card__phrase">${s.phrase}</p>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initScenarios(onScenarioClick) {
  document.querySelectorAll('.scenario-card').forEach((card) => {
    card.addEventListener('click', () => onScenarioClick?.(card.dataset.scenarioId));
  });
}
