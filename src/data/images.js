/**
 * Local WebP images from public/images/
 * Regenerate: npm run images
 */

const base = import.meta.env.BASE_URL;

function img(name) {
  return `${base}images/${name}`;
}

export const images = {
  hero: img('hero-bouquet.webp'),
  ctaBg: img('cta-bg.webp'),
  flowersDetail: img('flowers-detail.webp'),
  giftMoment: img('gift-moment.webp'),
  floristWork: img('florist-work.webp'),
  plants: img('plants.webp'),
  giftBox: img('gift-box.webp'),

  bouquets: {
    atelier: img('bouquet-01.webp'),
    morning: img('bouquet-02.webp'),
    redLine: img('bouquet-03.webp'),
    evening: img('bouquet-04.webp'),
    meadow: img('bouquet-05.webp'),
    spring: img('bouquet-06.webp'),
    pastel: img('bouquet-07.webp'),
    celebration: img('bouquet-08.webp'),
  },

  categories: {
    bouquets: img('bouquet-01.webp'),
    compositions: img('composition-01.webp'),
    single: img('single-01.webp'),
    balloons: img('balloons-01.webp'),
    potted: img('plants.webp'),
    toys: img('toy-01.webp'),
    souvenirs: img('souvenir-01.webp'),
    paintings: img('painting-01.webp'),
  },

  extras: {
    composition02: img('composition-02.webp'),
    toy02: img('toy-02.webp'),
    souvenir02: img('souvenir-02.webp'),
    painting02: img('painting-02.webp'),
  },

  giftBuilder: {
    bouquet: img('bouquet-01.webp'),
    balloons: img('balloons-01.webp'),
    toy: img('toy-01.webp'),
    card: img('souvenir-01.webp'),
    souvenir: img('souvenir-02.webp'),
  },

  gallery: [
    img('gallery-01.webp'),
    img('gallery-02.webp'),
    img('gallery-03.webp'),
    img('gallery-04.webp'),
    img('gallery-05.webp'),
    img('gallery-06.webp'),
    img('gallery-07.webp'),
    img('gallery-08.webp'),
  ],

  scenarios: {
    loved: img('bouquet-03.webp'),
    mom: img('bouquet-04.webp'),
    birthday: img('bouquet-08.webp'),
    date: img('bouquet-02.webp'),
    colleague: img('composition-01.webp'),
    surprise: img('bouquet-05.webp'),
    thanks: img('bouquet-07.webp'),
    amaze: img('bouquet-06.webp'),
  },
};

export const imageFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect fill='%23E8DFD2' width='400' height='500'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='%2369745D' font-family='Georgia,serif' font-size='18'%3EFlora Atelier%3C/text%3E%3C/svg%3E";

export function imgAttrs(src, alt, width = 400, height = 500, options = {}) {
  const loading = options.eager ? 'eager' : 'lazy';
  const fetch = options.eager ? ' fetchpriority="high"' : '';
  const cls = options.className ? ` class="${options.className}"` : '';
  const sizes = options.sizes ? ` sizes="${options.sizes}"` : '';
  const srcset = options.srcset ? ` srcset="${options.srcset}"` : '';
  return `src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${loading}"${fetch} decoding="async"${cls}${sizes}${srcset}`;
}
