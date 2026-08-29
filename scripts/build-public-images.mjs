/**
 * Editorial floral visuals → public/images/*.webp
 * Run: npm run images
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images');

const brand = {
  ivory: '#F5F0E7',
  warmBeige: '#E9E0D3',
  charcoal: '#26231F',
  botanical: '#69735F',
  dustyRose: '#B88C83',
  blush: '#E8D5CF',
  cream: '#F5F0E7',
  mutedGreen: '#8A9580',
};

function bokeh(w, h, count = 10, opacity = 0.12) {
  let circles = '';
  for (let i = 0; i < count; i++) {
    const cx = ((i * 73 + 17) % 100) / 100;
    const cy = ((i * 41 + 29) % 100) / 100;
    const r = Math.min(w, h) * (0.03 + (i % 5) * 0.018);
    circles += `<circle cx="${cx * w}" cy="${cy * h}" r="${r}" fill="${brand.cream}" opacity="${opacity + (i % 3) * 0.03}"/>`;
  }
  return circles;
}

function vignette(w, h, strength = 0.35) {
  return `<defs><radialGradient id="vignette" cx="50%" cy="45%" r="72%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="${strength}"/>
  </radialGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#vignette)"/>`;
}

function bgGradient(w, h, c1, c2) {
  return `<defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>`;
}

function rose(cx, cy, r, color, opacity = 0.88) {
  let petals = '';
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    petals += `<circle cx="${cx + Math.cos(angle) * r * 0.5}" cy="${cy + Math.sin(angle) * r * 0.5}" r="${r * 0.45}" fill="${color}" opacity="${opacity}"/>`;
  }
  petals += `<circle cx="${cx}" cy="${cy}" r="${r * 0.28}" fill="${color}" opacity="${opacity + 0.06}"/>`;
  return petals;
}

function leaf(x, y, scale, rotation, color = brand.botanical) {
  return `<ellipse cx="${x}" cy="${y}" rx="${16 * scale}" ry="${38 * scale}" fill="${color}" opacity="0.65" transform="rotate(${rotation} ${x} ${y})"/>`;
}

function stem(x, y1, y2) {
  return `<path d="M ${x} ${y1} Q ${x + 6} ${(y1 + y2) / 2} ${x} ${y2}" stroke="${brand.botanical}" stroke-width="2.5" fill="none" opacity="0.5"/>`;
}

function filmGrain(w, h) {
  return `<defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
      <feBlend in="SourceGraphic" in2="mono" mode="soft-light"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.06"/>`;
}

function softLight(w, h) {
  return `<defs>
    <radialGradient id="softLight" cx="35%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#softLight)"/>`;
}

function bouquetScene(w, h, { roses, bg1, bg2, accent = brand.botanical, leaves = true }) {
  let florals = roses.map(([x, y, r, color]) => rose(x * w, y * h, r, color)).join('');
  if (leaves) {
    florals += leaf(w * 0.2, h * 0.7, 1, -28);
    florals += leaf(w * 0.78, h * 0.66, 0.85, 32);
    florals += leaf(w * 0.52, h * 0.76, 0.65, 8, accent);
    florals += stem(w * 0.48, h * 0.55, h * 0.82);
    florals += stem(w * 0.54, h * 0.58, h * 0.84);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, bg1, bg2)}
    ${bokeh(w, h, 14, 0.1)}
    ${florals}
    ${softLight(w, h)}
    ${vignette(w, h, 0.32)}
    ${filmGrain(w, h)}
  </svg>`;
}

const ivoryRoses = [
  [0.32, 0.48, 44, brand.cream],
  [0.48, 0.42, 50, brand.blush],
  [0.62, 0.46, 46, '#F0EBE4'],
  [0.42, 0.56, 36, brand.dustyRose],
];

const blushRoses = [
  [0.35, 0.45, 42, brand.dustyRose],
  [0.52, 0.4, 48, brand.blush],
  [0.65, 0.48, 40, brand.cream],
];

const botanicalRoses = [
  [0.38, 0.44, 40, brand.mutedGreen],
  [0.55, 0.48, 44, brand.botanical],
  [0.48, 0.55, 34, '#9AA68E'],
];

const bouquetVariants = [
  { bg1: '#EDE6DC', bg2: '#DDD4C8', roses: ivoryRoses },
  { bg1: '#E8E0D6', bg2: '#D8CEC4', roses: blushRoses },
  { bg1: '#E5DDD3', bg2: '#D5CCC0', roses: [[0.4, 0.46, 46, brand.dustyRose], [0.55, 0.42, 50, brand.blush], [0.48, 0.54, 38, brand.cream]] },
  { bg1: '#EBE4DA', bg2: '#DBD2C8', roses: [[0.36, 0.44, 44, '#D4C4BC'], [0.52, 0.48, 42, brand.cream], [0.62, 0.42, 40, brand.dustyRose]] },
  { bg1: '#E6E8E0', bg2: '#D6D8D0', roses: botanicalRoses },
  { bg1: '#EDE8E2', bg2: '#DDD8D2', roses: [[0.38, 0.46, 42, brand.cream], [0.52, 0.42, 48, brand.blush], [0.62, 0.5, 36, brand.dustyRose]] },
  { bg1: '#E8E4DE', bg2: '#D8D4CE', roses: [[0.35, 0.45, 44, brand.blush], [0.5, 0.4, 50, brand.cream], [0.65, 0.48, 42, brand.dustyRose]] },
  { bg1: '#EAE6E0', bg2: '#DAD6D0', roses: ivoryRoses },
];

function heroScene(w, h) {
  return bouquetScene(w, h, {
    bg1: '#EDE6DC',
    bg2: '#DDD4C8',
    roses: [
      [0.28, 0.52, 52, brand.dustyRose],
      [0.42, 0.44, 58, brand.blush],
      [0.55, 0.48, 54, '#F0EBE4'],
      [0.68, 0.44, 56, brand.dustyRose],
      [0.38, 0.58, 40, brand.cream],
      [0.62, 0.55, 44, brand.blush],
    ],
    accent: brand.mutedGreen,
  });
}

function detailScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, brand.ivory, brand.warmBeige)}
    ${bokeh(w, h, 6, 0.08)}
    ${rose(w * 0.5, h * 0.42, 72, brand.blush)}
    ${leaf(w * 0.35, h * 0.55, 1.2, -20)}
    ${leaf(w * 0.65, h * 0.52, 1, 25)}
    ${vignette(w, h, 0.2)}
  </svg>`;
}

function giftMomentScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#EDE8E2', '#DDD6CE')}
    ${bokeh(w, h, 8, 0.06)}
    <rect x="${w * 0.25}" y="${h * 0.55}" width="${w * 0.5}" height="${h * 0.12}" fill="${brand.warmBeige}" rx="4"/>
    ${bouquetScene(w, h, { bg1: 'transparent', bg2: 'transparent', roses: [[0.5, 0.38, 48, brand.cream], [0.42, 0.42, 38, brand.blush]], leaves: false }).replace(/<svg[^>]*>|<\/svg>/g, '')}
    ${vignette(w, h, 0.25)}
  </svg>`;
}

function floristScene(w, h) {
  return bouquetScene(w, h, {
    bg1: '#E8E4DE',
    bg2: '#D8D2CA',
    roses: [[0.45, 0.4, 50, brand.cream], [0.58, 0.45, 44, brand.blush], [0.52, 0.52, 38, brand.dustyRose]],
    accent: brand.botanical,
  });
}

function plantsScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#E8EDE4', '#D8DDD4')}
    ${bokeh(w, h, 6, 0.05)}
    <ellipse cx="${w * 0.5}" cy="${h * 0.72}" rx="${w * 0.18}" ry="${h * 0.08}" fill="#8B7355" opacity="0.5"/>
    ${leaf(w * 0.42, h * 0.45, 1.4, -15, brand.botanical)}
    ${leaf(w * 0.55, h * 0.4, 1.2, 10, brand.mutedGreen)}
    ${leaf(w * 0.48, h * 0.35, 1, -5, brand.botanical)}
    ${vignette(w, h, 0.22)}
  </svg>`;
}

function giftBoxScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, brand.ivory, brand.warmBeige)}
    ${bokeh(w, h, 6, 0.05)}
    <rect x="${w * 0.28}" y="${h * 0.38}" width="${w * 0.44}" height="${h * 0.35}" fill="${brand.cream}" rx="3"/>
    <rect x="${w * 0.28}" y="${h * 0.38}" width="${w * 0.44}" height="10" fill="${brand.dustyRose}" opacity="0.5"/>
    <path d="M ${w * 0.5} ${h * 0.38} L ${w * 0.5} ${h * 0.73}" stroke="${brand.dustyRose}" stroke-width="2" opacity="0.4"/>
    ${rose(w * 0.5, h * 0.32, 28, brand.blush, 0.75)}
    ${vignette(w, h, 0.2)}
  </svg>`;
}

function categoryScene(w, h, type) {
  const scenes = {
    composition: () => bouquetScene(w, h, { bg1: '#E6EAE4', bg2: '#D6DAD4', roses: botanicalRoses }),
    single: () => detailScene(w, h),
    balloons: () => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      ${bgGradient(w, h, brand.ivory, brand.warmBeige)}
      <ellipse cx="${w * 0.42}" cy="${h * 0.35}" rx="38" ry="48" fill="${brand.blush}" opacity="0.7"/>
      <ellipse cx="${w * 0.58}" cy="${h * 0.38}" rx="34" ry="44" fill="${brand.dustyRose}" opacity="0.55"/>
      ${vignette(w, h, 0.2)}
    </svg>`,
    toy: () => giftBoxScene(w, h),
    souvenir: () => giftBoxScene(w, h),
    painting: () => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      ${bgGradient(w, h, '#3A3834', '#24221F')}
      <rect x="${w * 0.2}" y="${h * 0.15}" width="${w * 0.6}" height="${h * 0.55}" fill="${brand.ivory}" rx="2"/>
      ${rose(w * 0.45, h * 0.38, 24, brand.dustyRose, 0.8)}
      ${rose(w * 0.58, h * 0.35, 28, brand.blush, 0.75)}
      ${vignette(w, h, 0.35)}
    </svg>`,
  };
  return scenes[type]?.() || bouquetScene(w, h, bouquetVariants[0]);
}

const files = [
  { name: 'hero-bouquet.webp', w: 1920, h: 1280, fn: () => heroScene(1920, 1280) },
  { name: 'cta-bg.webp', w: 1920, h: 1080, fn: () => heroScene(1920, 1080) },
  { name: 'flowers-detail.webp', w: 800, h: 1000, fn: () => detailScene(800, 1000) },
  { name: 'gift-moment.webp', w: 1200, h: 900, fn: () => giftMomentScene(1200, 900) },
  { name: 'florist-work.webp', w: 1000, h: 750, fn: () => floristScene(1000, 750) },
  { name: 'plants.webp', w: 800, h: 1000, fn: () => plantsScene(800, 1000) },
  { name: 'gift-box.webp', w: 800, h: 1000, fn: () => giftBoxScene(800, 1000) },
  ...bouquetVariants.map((v, i) => ({
    name: `bouquet-${String(i + 1).padStart(2, '0')}.webp`,
    w: 800,
    h: 1000,
    fn: () => bouquetScene(800, 1000, { ...v, accent: brand.botanical }),
  })),
  ...bouquetVariants.slice(0, 8).map((v, i) => ({
    name: `gallery-${String(i + 1).padStart(2, '0')}.webp`,
    w: i % 3 === 0 ? 900 : 700,
    h: i % 3 === 0 ? 600 : i % 3 === 1 ? 900 : 800,
    fn: () => bouquetScene(i % 3 === 0 ? 900 : 700, i % 3 === 0 ? 600 : i % 3 === 1 ? 900 : 800, { ...v, accent: brand.mutedGreen }),
  })),
  { name: 'composition-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'composition') },
  { name: 'composition-02.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'composition') },
  { name: 'single-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'single') },
  { name: 'balloons-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'balloons') },
  { name: 'toy-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'toy') },
  { name: 'toy-02.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'toy') },
  { name: 'souvenir-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'souvenir') },
  { name: 'souvenir-02.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'souvenir') },
  { name: 'painting-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'painting') },
  { name: 'painting-02.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'painting') },
  ...bouquetVariants.slice(0, 4).map((v, i) => ({
    name: `bouquet-${String(i + 9).padStart(2, '0')}.webp`,
    w: 800, h: 1000,
    fn: () => bouquetScene(800, 1000, { ...v, accent: brand.dustyRose }),
  })),
  { name: 'candle-01.webp', w: 800, h: 1000, fn: () => giftBoxScene(800, 1000) },
  { name: 'sweets-01.webp', w: 800, h: 1000, fn: () => categoryScene(800, 1000, 'souvenir') },
  ...bouquetVariants.slice(0, 6).map((v, i) => ({
    name: `social-${String(i + 1).padStart(2, '0')}.webp`,
    w: 600, h: 600,
    fn: () => bouquetScene(600, 600, { ...v, accent: brand.mutedGreen }),
  })),
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const svg = file.fn();
  const outPath = join(outDir, file.name);
  await sharp(Buffer.from(svg)).webp({ quality: 88, effort: 4 }).toFile(outPath);
  console.log(`✓ ${file.name}`);
}

console.log(`\nGenerated ${files.length} WebP images in public/images/`);
