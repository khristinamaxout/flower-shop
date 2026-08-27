import { whyUsItems } from '../data/catalog.js';

export function renderWhyUs() {
  return `
    <section class="section section--alt" id="why-us" aria-labelledby="why-us-title">
      <div class="container container--narrow">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Почему мы</p>
          <h2 class="section-title" id="why-us-title">Почему нас выбирают</h2>
        </header>

        <div class="why-grid">
          ${whyUsItems
            .map(
              (item, i) => `
            <div class="why-item reveal reveal-delay-${(i % 3) + 1}">
              <h3 class="why-item__title">${item.title}</h3>
              <p class="why-item__desc">${item.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
