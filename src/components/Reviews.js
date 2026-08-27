import { reviews, reviewAggregate } from '../data/catalog.js';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < rating;
    return `<span class="review-card__star${filled ? ' is-filled' : ''}" aria-hidden="true">★</span>`;
  }).join('');
}

export function renderReviews() {
  const featured = reviews[0];
  const rest = reviews.slice(1);

  return `
    <section class="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title" id="reviews-title">Нас рекомендуют</h2>
          <div class="reviews-aggregate">
            <div class="reviews-aggregate__stars" aria-label="Рейтинг ${reviewAggregate.rating} из 5">
              ${renderStars(Math.round(reviewAggregate.rating))}
            </div>
            <p class="reviews-aggregate__score">
              <strong>${reviewAggregate.rating}</strong> · ${reviewAggregate.count} отзывов
            </p>
          </div>
        </header>

        <div class="reviews-editorial">
          <blockquote class="review-featured reveal">
            <p class="review-featured__text">«${featured.text}»</p>
            <footer class="review-featured__footer">
              <cite class="review-featured__name">${featured.name}</cite>
              <time datetime="${featured.date}">${featured.date}</time>
            </footer>
          </blockquote>

          <div class="reviews-grid">
            ${rest
              .map(
                (r, i) => `
              <blockquote class="review-card review-card--compact reveal reveal-delay-${(i % 3) + 1}">
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
      </div>
    </section>
  `;
}
