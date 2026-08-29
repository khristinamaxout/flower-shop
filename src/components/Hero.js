import { images, imgAttrs } from '../data/images.js';
import { siteConfig } from '../data/catalog.js';

export function renderHero() {
  return `
    <section class="hero hero--poppy" aria-label="Главный экран">
      <div class="hero__split">
        <div class="hero__panel mobile-anim" data-delay="0">
          <p class="hero__eyebrow">${siteConfig.name} · Саратов</p>
          <h1 class="hero__title display-title">
            Цветы,<br>которые<br>говорят за&nbsp;вас.
          </h1>
          <p class="hero__subtitle">
            Букеты и подарки с доставкой по Саратову
          </p>
          <div class="hero__actions">
            <a href="#catalog" class="btn btn--primary btn--lg">Выбрать букет</a>
            <a href="#gift-finder" class="btn btn--hero-outline btn--lg">Подобрать подарок</a>
          </div>
        </div>
        <div class="hero__photo mobile-anim" data-delay="1">
          <img
            ${imgAttrs(images.hero, 'Авторский букет — Flora Atelier, доставка по Саратову', 1200, 900, { eager: true, className: 'hero__img' })}
          >
        </div>
      </div>
    </section>
  `;
}
