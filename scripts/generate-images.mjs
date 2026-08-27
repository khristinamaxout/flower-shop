/**
 * Generates real JPEG files locally — no external CDN needed.
 * Run: node scripts/generate-images.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../src/assets/images');

const palette = [
  { bg1: '#2F4538', bg2: '#1a2a22', accent: '#C9A87C', label: 'Букеты' },
  { bg1: '#4a3728', bg2: '#2a1f18', accent: '#E8D5C4', label: 'Композиции' },
  { bg1: '#5c3d2e', bg2: '#3d2820', accent: '#F0EBE3', label: 'Розы' },
  { bg1: '#3d4a3a', bg2: '#252e24', accent: '#B8462A', label: 'Цветы' },
  { bg1: '#6b4c3b', bg2: '#4a342a', accent: '#C9A87C', label: 'Пастель' },
  { bg1: '#2a3d35', bg2: '#1a2520', accent: '#E8D5C4', label: 'Полевые' },
  { bg1: '#453530', bg2: '#2a211e', accent: '#B8462A', label: 'Праздник' },
  { bg1: '#3a4a42', bg2: '#242e28', accent: '#C9A87C', label: 'Premium' },
];

function svgTemplate({ bg1, bg2, accent, label, w, h, subtitle = 'Flora Atelier' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1}"/>
      <stop offset="100%" style="stop-color:${bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <circle cx="${w * 0.75}" cy="${h * 0.25}" r="${Math.min(w, h) * 0.15}" fill="${accent}" opacity="0.12"/>
  <circle cx="${w * 0.2}" cy="${h * 0.7}" r="${Math.min(w, h) * 0.2}" fill="${accent}" opacity="0.08"/>
  <line x1="0" y1="${h * 0.85}" x2="${w}" y2="${h * 0.85}" stroke="${accent}" stroke-width="1" opacity="0.3"/>
  <text x="${w / 2}" y="${h * 0.45}" text-anchor="middle" fill="${accent}" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.06}" opacity="0.9">${label}</text>
  <text x="${w / 2}" y="${h * 0.52}" text-anchor="middle" fill="#FAF8F5" font-family="Arial, sans-serif" font-size="${Math.min(w, h) * 0.025}" opacity="0.5" letter-spacing="4">${subtitle}</text>
</svg>`;
}

const files = [
  { name: 'hero.jpg', w: 1920, h: 1280, palette: 0, label: 'Flora Atelier', subtitle: 'САРАТОВ' },
  { name: 'cta-bg.jpg', w: 1920, h: 1080, palette: 3, label: 'Цветы', subtitle: 'С ДОСТАВКОЙ' },
  { name: 'bouquet-01.jpg', w: 800, h: 1000, palette: 0, label: 'Букеты' },
  { name: 'bouquet-02.jpg', w: 800, h: 1000, palette: 4, label: 'Пастель' },
  { name: 'bouquet-03.jpg', w: 800, h: 1000, palette: 2, label: 'Розы' },
  { name: 'bouquet-04.jpg', w: 800, h: 1000, palette: 3, label: 'Цветы' },
  { name: 'bouquet-05.jpg', w: 800, h: 1000, palette: 5, label: 'Полевые' },
  { name: 'bouquet-06.jpg', w: 800, h: 1000, palette: 1, label: 'Композиции' },
  { name: 'bouquet-07.jpg', w: 800, h: 1000, palette: 4, label: 'Нежность' },
  { name: 'bouquet-08.jpg', w: 800, h: 1000, palette: 6, label: 'Праздник' },
  { name: 'composition-01.jpg', w: 800, h: 1000, palette: 1, label: 'Композиции' },
  { name: 'single-01.jpg', w: 800, h: 1000, palette: 2, label: 'Поштучно' },
  { name: 'balloons-01.jpg', w: 800, h: 1000, palette: 6, label: 'Шары' },
  { name: 'potted-01.jpg', w: 800, h: 1000, palette: 0, label: 'В горшках' },
  { name: 'toy-01.jpg', w: 800, h: 1000, palette: 4, label: 'Игрушки' },
  { name: 'souvenir-01.jpg', w: 800, h: 1000, palette: 7, label: 'Сувениры' },
  { name: 'painting-01.jpg', w: 800, h: 1000, palette: 7, label: 'Картины' },
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const p = palette[file.palette];
  const svg = svgTemplate({
    ...p,
    w: file.w,
    h: file.h,
    label: file.label,
    subtitle: file.subtitle || 'Flora Atelier',
  });

  const outPath = join(outDir, file.name);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  console.log(`✓ ${file.name}`);
}

console.log(`\nGenerated ${files.length} images in src/assets/images/`);
