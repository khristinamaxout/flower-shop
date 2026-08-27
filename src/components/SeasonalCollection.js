import { seasonalCollection } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

export function renderSeasonalCollection() {
  const { title, subtitle, image, alt, cta } = seasonalCollection;

  return `
    <section class="section section--alt" id="seasonal" aria-labelledby="seasonal-title">
      <div class="container">
        <div class="seasonal-block reveal">
          <div class="seasonal-block__media">
            <img ${imgAttrs(image, alt, 800, 600)}>
          </div>
          <div class="seasonal-block__content">
            <p class="section-label">Коллекция сезона</p>
            <h2 class="seasonal-block__title" id="seasonal-title">${title}</h2>
            <p class="seasonal-block__subtitle">${subtitle}</p>
            <button class="btn btn--primary btn--lg" id="seasonal-cta" type="button">${cta}</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initSeasonalCollection(onViewCollection) {
  document.getElementById('seasonal-cta')?.addEventListener('click', onViewCollection);
}
