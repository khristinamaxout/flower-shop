/**
 * Реалистичные AI-фото Flora Atelier → /public/references/items/
 */
const base = import.meta.env.BASE_URL;
const item = (name) => `${base}references/items/${name}`;

export const images = {
  hero: item('hero-clean.webp'),

  bouquets: {
    b01: item('pink-01.webp'),
    b02: item('edit-01.webp'),
    b03: item('kraft-01.webp'),
    b04: item('bouquet-summer-evening.webp'),
    b05: item('kraft-02.webp'),
    b06: item('pink-02.webp'),
    b07: item('edit-02.webp'),
    b08: item('vase-01.webp'),
    b09: item('kraft-03.webp'),
    b10: item('pink-03.webp'),
    b11: item('edit-03.webp'),
    b12: item('cat-01.webp'),
    b13: item('kraft-04.webp'),
    b14: item('vase-02.webp'),
    b15: item('cat-02.webp'),
    b16: item('kraft-05.webp'),
  },

  categories: {
    bouquets: item('pink-01.webp'),
    compositions: item('vase-01.webp'),
    single: item('edit-02.webp'),
    balloons: item('gen-balloons.webp'),
    potted: item('vase-04.webp'),
    toys: item('gen-teddy.webp'),
    souvenirs: item('gen-souvenir.webp'),
    paintings: item('gen-painting.webp'),
  },

  extras: {
    composition02: item('vase-03.webp'),
    postcard: item('gen-postcard.webp'),
    candle: item('gen-souvenir.webp'),
    sweets: item('gen-sweets.webp'),
    giftBox: item('gift-06.webp'),
  },

  giftBuilder: {
    bouquet: item('pink-01.webp'),
    card: item('gen-postcard.webp'),
    balloon: item('gen-balloons.webp'),
    toy: item('gen-teddy.webp'),
    souvenir: item('gen-souvenir.webp'),
  },

  gallery: [
    item('pink-01.webp'),
    item('edit-01.webp'),
    item('kraft-01.webp'),
    item('vase-01.webp'),
    item('gift-01.webp'),
    item('cat-03.webp'),
    item('hero-clean.webp'),
    item('bouquet-summer-evening.webp'),
  ],

  social: [
    item('pink-02.webp'),
    item('edit-03.webp'),
    item('kraft-06.webp'),
    item('vase-05.webp'),
    item('gift-04.webp'),
    item('cat-04.webp'),
  ],

  scenarios: {
    love: item('pink-01.webp'),
    celebrate: item('kraft-02.webp'),
    thanks: item('edit-01.webp'),
    support: item('vase-02.webp'),
    surprise: item('cat-03.webp'),
    joy: item('gift-01.webp'),
  },

  collections: {
    bestsellers: item('pink-01.webp'),
    new: item('edit-02.webp'),
    noReason: item('kraft-03.webp'),
    special: item('cat-05.webp'),
    gifts: item('gift-01.webp'),
    home: item('vase-03.webp'),
  },

  ctaBg: item('pink-03.webp'),
  flowersDetail: item('edit-03.webp'),
  giftMoment: item('gift-05.webp'),
  floristWork: item('hero-clean.webp'),
  plants: item('vase-04.webp'),
  giftBox: item('gift-06.webp'),
};

export const imageFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23FFF5F0' width='400' height='500'/%3E%3C/svg%3E";

export function imgAttrs(src, alt, width = 900, height = 1125, options = {}) {
  const loading = options.eager ? 'eager' : 'lazy';
  const fetch = options.eager ? ' fetchpriority="high"' : '';
  const cls = options.className ? ` class="${options.className}"` : '';
  return `src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${loading}"${fetch} decoding="async"${cls}`;
}
