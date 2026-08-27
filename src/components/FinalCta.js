import { images, imgAttrs } from '../data/images.js';
import { siteConfig } from '../data/catalog.js';

export function renderFinalCta() {
  return `
    <section class="final-cta" aria-labelledby="final-cta-title">
      <div class="final-cta__bg" aria-hidden="true">
        <img ${imgAttrs(images.ctaBg, '', 1920, 1080)}>
      </div>
      <div class="container final-cta__content">
        <h2 class="final-cta__title display-title reveal" id="final-cta-title">
          Повод найдётся.<br>Цветы — тоже.
        </h2>
        <div class="final-cta__actions reveal reveal-delay-1">
          <a href="#catalog" class="btn btn--primary btn--lg btn--pulse">Выбрать букет</a>
          <a href="${siteConfig.phoneLink}" class="btn btn--secondary btn--lg">Связаться с флористом</a>
        </div>
      </div>
    </section>
  `;
}
