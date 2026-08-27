import { galleryWorks } from '../data/catalog.js';
import { imgAttrs } from '../data/images.js';

export function renderGallery() {  return `
    <section class="section" id="gallery" aria-labelledby="gallery-title">
      <div class="container">
        <header class="section-header section-header__row reveal">
          <div>
            <p class="section-label">Портфолио</p>
            <h2 class="section-title" id="gallery-title">Букеты, которые мы уже создали</h2>
            <p class="section-subtitle" style="margin-top: 1rem;">Каждый букет — авторская композиция, собранная флористом вручную</p>
          </div>
        </header>

        <div class="gallery reveal">
          ${galleryWorks
            .map(
              (work) => `
            <figure class="gallery__item mobile-scale-in" style="--anim-delay: ${(work.id - 1) * 0.08}s">
              <img ${imgAttrs(work.image, work.alt, 600, 750)}>
            </figure>
          `
            )
            .join('')}
        </div>

        <div style="text-align: center; margin-top: 3rem;" class="reveal">
          <button class="btn btn--secondary" id="gallery-more">Посмотреть все работы</button>
        </div>
      </div>
    </section>
  `;
}

export function initGallery(onViewAll) {
  document.getElementById('gallery-more')?.addEventListener('click', onViewAll);
}
