import { images, imgAttrs } from '../data/images.js';
import { formatPrice } from '../utils/order.js';

export function renderGiftBuilder() {
  const items = [
    { id: 'bouquet', label: 'Букет', image: images.giftBuilder.bouquet, alt: 'Букет', price: 2500 },
    { id: 'balloon', label: 'Шар', image: images.giftBuilder.balloons, alt: 'Воздушные шары', price: 500 },
    { id: 'toy', label: 'Игрушка', image: images.giftBuilder.toy, alt: 'Мягкая игрушка', price: 890 },
    { id: 'card', label: 'Открытка', image: images.giftBuilder.card, alt: 'Авторская открытка', price: 350 },
    { id: 'souvenir', label: 'Сувенир', image: images.giftBuilder.souvenir, alt: 'Сувенир', price: 650 },
  ];

  return `
    <section class="section section--alt" id="gift-builder" aria-labelledby="gift-builder-title">
      <div class="container">
        <div class="gift-builder">
          <div class="gift-builder__visual reveal" id="gift-builder-visual">
            ${items
              .map(
                (item, i) => `
              ${i > 0 ? '<span class="gift-builder__plus mobile-anim" data-delay="' + i + '" aria-hidden="true">+</span>' : ''}
              <button
                class="gift-builder__item mobile-anim is-selectable"
                data-delay="${i}"
                data-builder-id="${item.id}"
                data-builder-price="${item.price}"
                type="button"
                aria-pressed="false"
              >
                <div class="gift-builder__item-icon">
                  <img ${imgAttrs(item.image, item.alt, 80, 80)}>
                </div>
                <span class="gift-builder__item-label">${item.label}</span>
              </button>
            `
              )
              .join('')}
          </div>

          <div class="gift-builder__content reveal reveal-delay-2">
            <p class="section-label">Персональный подарок</p>
            <h2 class="section-title" id="gift-builder-title">Соберите подарок</h2>
            <p class="section-subtitle" style="margin: 1rem 0 1.5rem;">
              Объедините букет, шары, игрушку и открытку в один продуманный комплект.
            </p>
            <p class="gift-builder__total" id="gift-builder-total" aria-live="polite">
              Выберите элементы — <strong>от ${formatPrice(2500)}</strong>
            </p>
            <button class="btn btn--primary btn--lg btn--pulse" id="gift-builder-order" type="button" disabled>
              Собрать подарок
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initGiftBuilder(onOrderBundle) {
  const visual = document.getElementById('gift-builder-visual');
  const totalEl = document.getElementById('gift-builder-total');
  const orderBtn = document.getElementById('gift-builder-order');
  if (!visual || !totalEl || !orderBtn) return;

  const selected = new Set(['bouquet']);

  function updateUI() {
    visual.querySelectorAll('.gift-builder__item').forEach((item) => {
      const id = item.dataset.builderId;
      const isSelected = selected.has(id);
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-pressed', isSelected);
    });

    let total = 0;
    const labels = [];
    visual.querySelectorAll('.gift-builder__item.is-selected').forEach((item) => {
      total += Number(item.dataset.builderPrice);
      labels.push(item.querySelector('.gift-builder__item-label').textContent);
    });

    totalEl.innerHTML =
      labels.length > 0
        ? `Ваш набор: <strong>${labels.join(' + ')}</strong> — <strong>${formatPrice(total)}</strong>`
        : `Выберите элементы — <strong>от ${formatPrice(2500)}</strong>`;

    orderBtn.disabled = selected.size === 0;
  }

  visual.querySelectorAll('.gift-builder__item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.builderId;
      if (id === 'bouquet') return;
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }
      updateUI();
    });
  });

  orderBtn.addEventListener('click', () => {
    const labels = [];
    let total = 0;
    visual.querySelectorAll('.gift-builder__item.is-selected').forEach((item) => {
      total += Number(item.dataset.builderPrice);
      labels.push(item.querySelector('.gift-builder__item-label').textContent);
    });
    onOrderBundle(labels.join(' + '), total);
  });

  visual.querySelector('.gift-builder__item[data-builder-id="bouquet"]')?.classList.add('is-selected');
  updateUI();
}
