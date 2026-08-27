import { reviews, reviewAggregate } from '../data/catalog.js';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < rating;
    return `<span class="review-card__star${filled ? ' is-filled' : ''}" aria-hidden="true">★</span>`;
  }).join('');
}

export function renderReviews() {
  return `
    <section class="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title" id="reviews-title">Нас рекомендуют</h2>
          <div class="reviews-aggregate reveal">
            <div class="reviews-aggregate__stars" aria-label="Рейтинг ${reviewAggregate.rating} из 5">
              ${renderStars(Math.round(reviewAggregate.rating))}
            </div>
            <p class="reviews-aggregate__score">
              <strong>${reviewAggregate.rating}</strong> · ${reviewAggregate.count} отзывов
            </p>
          </div>
        </header>

        <div class="reviews-grid">
          ${reviews
            .map(
              (r, i) => `
            <blockquote class="review-card reveal reveal-delay-${(i % 4) + 1}">
              <div class="review-card__rating" aria-label="${r.rating} из 5">${renderStars(r.rating)}</div>
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
