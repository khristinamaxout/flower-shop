/**
 * Image assets — embedded base64, always loads without external files.
 * Regenerate: npm run images
 */
import {
  hero,
  ctaBg,
  bouquet01,
  bouquet02,
  bouquet03,
  bouquet04,
  bouquet05,
  bouquet06,
  bouquet07,
  bouquet08,
  composition01,
  composition02,
  single01,
  balloons01,
  potted01,
  toy01,
  toy02,
  souvenir01,
  souvenir02,
  painting01,
  painting02,
} from './image-data.js';

export const images = {
  hero,
  ctaBg,

  bouquets: {
    atelier: bouquet01,
    morning: bouquet02,
    redLine: bouquet03,
    evening: bouquet04,
    meadow: bouquet05,
    spring: bouquet06,
    pastel: bouquet07,
    celebration: bouquet08,
  },

  categories: {
    bouquets: bouquet01,
    compositions: composition01,
    single: single01,
    balloons: balloons01,
    potted: potted01,
    toys: toy01,
    souvenirs: souvenir01,
    paintings: painting01,
  },

  extras: {
    composition02,
    toy02,
    souvenir02,
    painting02,
  },

  giftBuilder: {
    bouquet: bouquet01,
    balloons: balloons01,
    toy: toy01,
    card: souvenir01,
    souvenir: souvenir02,
  },

  gallery: [
    bouquet01,
    composition01,
    bouquet02,
    bouquet03,
    bouquet08,
    bouquet05,
    bouquet04,
    single01,
  ],

  scenarios: {
    loved: bouquet03,
    mom: bouquet04,
    birthday: bouquet08,
    date: bouquet02,
    colleague: composition01,
    surprise: bouquet05,
    thanks: bouquet07,
    amaze: bouquet06,
  },
};

export const imageFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect fill='%23F0EBE3' width='400' height='500'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='%23B8462A' font-family='Georgia,serif' font-size='18'%3EFlora Atelier%3C/text%3E%3C/svg%3E";

export function imgAttrs(src, alt, width = 400, height = 500, options = {}) {
  const loading = options.eager ? 'eager' : 'lazy';
  const fetch = options.eager ? ' fetchpriority="high"' : '';
  const cls = options.className ? ` class="${options.className}"` : '';
  return `src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${loading}"${fetch} decoding="async"${cls}`;
}
