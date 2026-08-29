import { images, imgAttrs } from '../data/images.js';
import { siteConfig } from '../data/catalog.js';

export function renderSocialProof() {
  const photos = images.social;
  const layout = ['social-item--wide', '', 'social-item--tall', '', 'social-item--wide', ''];

  return `
    <section class="section" id="social" aria-labelledby="social-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Соцсети</p>
          <h2 class="section-title" id="social-title">Больше красоты — в&nbsp;наших соцсетях</h2>
        </header>
        <div class="social-collage reveal">
          ${photos.map((src, i) => `
            <figure class="social-item ${layout[i] || ''} mobile-scale-in" style="--anim-delay:${i * 0.06}s">
              <img ${imgAttrs(src, `Flora Atelier — работа флориста ${i + 1}`, 600, 600)}>
            </figure>
          `).join('')}
        </div>
        <div class="social-cta reveal">
          <a href="${siteConfig.instagram}" class="btn btn--secondary" target="_blank" rel="noopener">Смотреть больше</a>
        </div>
      </div>
    </section>
  `;
}
