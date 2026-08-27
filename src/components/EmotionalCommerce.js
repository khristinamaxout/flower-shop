const quotes = [
  {
    text: 'Когда хочется сказать больше, чем помещается в сообщении.',
    context: 'Букеты для особых моментов',
  },
  {
    text: 'Просто так — иногда лучший повод.',
    context: 'Без повода',
  },
  {
    text: 'Для человека, которого хочется удивить.',
    context: 'Сюрприз',
  },
];

export function renderEmotionalCommerce() {
  return `
    <section class="section section--alt emotional-commerce" aria-label="Эмоциональные сценарии">
      <div class="container">
        <div class="emotional-commerce__grid">
          ${quotes
            .map(
              (q, i) => `
            <blockquote class="emotional-quote reveal reveal-delay-${i + 1}">
              <p class="emotional-quote__text">${q.text}</p>
              <footer class="emotional-quote__context">${q.context}</footer>
            </blockquote>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
