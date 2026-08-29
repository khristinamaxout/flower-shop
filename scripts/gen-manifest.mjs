/**
 * Манифест реалистичных фото → WebP для сайта
 * PNG кладём в assets/generated/, затем: npm run gift-art
 */
export const GEN_FILES = [
  // Hero — широкий кадр
  { png: 'gen-hero.png', webp: 'hero-clean.webp', w: 1920, h: 1280 },

  // Букеты — розовая/editorial серия
  { png: 'gen-pink-01.png', webp: 'pink-01.webp' },
  { png: 'gen-pink-02.png', webp: 'pink-02.webp' },
  { png: 'gen-pink-03.png', webp: 'pink-03.webp' },
  { png: 'gen-edit-01.png', webp: 'edit-01.webp' },
  { png: 'gen-edit-02.png', webp: 'edit-02.webp' },
  { png: 'gen-edit-03.png', webp: 'edit-03.webp' },

  // Крафт-упаковка
  { png: 'gen-kraft-01.png', webp: 'kraft-01.webp' },
  { png: 'gen-kraft-02.png', webp: 'kraft-02.webp' },
  { png: 'gen-kraft-03.png', webp: 'kraft-03.webp' },
  { png: 'gen-kraft-04.png', webp: 'kraft-04.webp' },
  { png: 'gen-kraft-05.png', webp: 'kraft-05.webp' },
  { png: 'gen-kraft-06.png', webp: 'kraft-06.webp' },

  // Композиции и растения
  { png: 'gen-vase-01.png', webp: 'vase-01.webp' },
  { png: 'gen-vase-02.png', webp: 'vase-02.webp' },
  { png: 'gen-vase-03.png', webp: 'vase-03.webp' },
  { png: 'gen-vase-04.png', webp: 'vase-04.webp' },
  { png: 'gen-vase-05.png', webp: 'vase-05.webp' },
  { png: 'gen-vase-06.png', webp: 'vase-06.webp' },

  // Подарочные моменты
  { png: 'gen-gift-01.png', webp: 'gift-01.webp' },
  { png: 'gen-gift-02.png', webp: 'gift-02.webp' },
  { png: 'gen-gift-03.png', webp: 'gift-03.webp' },
  { png: 'gen-gift-04.png', webp: 'gift-04.webp' },
  { png: 'gen-gift-05.png', webp: 'gift-05.webp' },
  { png: 'gen-gift-06.png', webp: 'gift-06.webp' },

  // Коробки / XL-композиции
  { png: 'gen-cat-01.png', webp: 'cat-01.webp' },
  { png: 'gen-cat-02.png', webp: 'cat-02.webp' },
  { png: 'gen-cat-03.png', webp: 'cat-03.webp' },
  { png: 'gen-cat-04.png', webp: 'cat-04.webp' },
  { png: 'gen-cat-05.png', webp: 'cat-05.webp' },

  // Уже сгенерированные ранее
  { png: 'gen-balloons.png', webp: 'gen-balloons.webp' },
  { png: 'gen-teddy.png', webp: 'gen-teddy.webp' },
  { png: 'gen-postcard.png', webp: 'gen-postcard.webp' },
  { png: 'gen-souvenir.png', webp: 'gen-souvenir.webp' },
  { png: 'gen-painting.png', webp: 'gen-painting.webp' },
  { png: 'gen-sweets.png', webp: 'gen-sweets.webp' },
  { png: 'bouquet-summer-evening.png', webp: 'bouquet-summer-evening.webp' },
];

export const STYLE =
  'Editorial product photography for premium flower shop Flora Atelier. Warm ivory and soft pink-vanilla palette, natural window light, shallow depth of field, photorealistic, no text, no watermark, no logos, no hands.';
