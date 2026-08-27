import { images, imgAttrs } from '../data/images.js';

export function renderHero() {
  return `
    <section class="hero" aria-label="Главный экран">
      <div class="hero__media">
        <img
          ${imgAttrs(images.hero, 'Авторский букет роз с эвкалиптом — Flora Atelier, Саратов', 1920, 1280, { eager: true, className: 'hero__img' })}
        >
      </div>

      <div class="container hero__content">
        <p class="hero__location mobile-anim" data-delay="0">Саратов · доставка ежедневно</p>
        <h1 class="hero__title display-title mobile-anim" data-delay="1">
          Цветы, которые говорят за&nbsp;вас
        </h1>
        <p class="hero__subtitle mobile-anim" data-delay="2">
          Букеты и подарки с доставкой по Саратову
        </p>
        <div class="hero__actions mobile-anim" data-delay="3">
          <a href="#catalog" class="btn btn--primary btn--lg btn--pulse">Выбрать букет</a>
          <a href="#gift-finder" class="btn btn--secondary btn--lg">Подобрать подарок</a>
        </div>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span>Листайте</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `;
}
