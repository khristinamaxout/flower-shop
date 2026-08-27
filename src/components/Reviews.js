import { reviews } from '../data/catalog.js';

export function renderReviews() {
  return `
    <section class="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title" id="reviews-title">Что говорят клиенты</h2>
        </header>

        <div class="reviews-grid">
          ${reviews
            .map(
              (r, i) => `
            <blockquote class="review-card reveal reveal-delay-${(i % 4) + 1}">
              <p class="review-card__text">«${r.text}»</p>
              <footer class="review-card__footer">
                <cite class="review-card__name">${r.name}</cite>
                <time class="review-card__date" datetime="${r.date}">${r.date}</time>
              </footer>
            </blockquote>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
