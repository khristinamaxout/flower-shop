import { galleryWorks } from '../data/catalog.js';
import { images, imgAttrs } from '../data/images.js';

const galleryImages = images.gallery;

export function renderGallery() {
  const works = galleryWorks.map((work, i) => ({
    ...work,
    image: galleryImages[i] || work.image,
  }));

  const layoutClasses = ['gallery__item--wide', '', 'gallery__item--tall', '', 'gallery__item--wide', '', 'gallery__item--tall', ''];

  return `
    <section class="section" id="gallery" aria-labelledby="gallery-title">
      <div class="container">
        <header class="section-header section-header__row reveal">
          <div>
            <p class="section-label">Портфолио</p>
            <h2 class="section-title" id="gallery-title">Букеты, которые мы уже создали</h2>
            <p class="section-subtitle" style="margin-top: 1rem;">Каждая работа — авторская композиция нашего ателье</p>
          </div>
        </header>

        <div class="gallery gallery--editorial reveal">
          ${works
            .map(
              (work, i) => `
            <figure class="gallery__item ${layoutClasses[i] || ''} mobile-scale-in" style="--anim-delay: ${i * 0.08}s">
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
