/**
 * Premium editorial floral visuals — category-specific art direction.
 * Run: node scripts/generate-images.mjs && node scripts/embed-images.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../src/assets/images');

const brand = {
  ivory: '#FAF8F5',
  terracotta: '#B8462A',
  forest: '#2F4538',
  gold: '#C9A87C',
  charcoal: '#1C1B19',
  warmGray: '#6E6A63',
};

function bokeh(w, h, count = 12, opacity = 0.15) {
  let circles = '';
  for (let i = 0; i < count; i++) {
    const cx = ((i * 73 + 17) % 100) / 100;
    const cy = ((i * 41 + 29) % 100) / 100;
    const r = Math.min(w, h) * (0.04 + (i % 5) * 0.02);
    circles += `<circle cx="${cx * w}" cy="${cy * h}" r="${r}" fill="${brand.ivory}" opacity="${opacity + (i % 3) * 0.04}"/>`;
  }
  return circles;
}

function vignette(w, h, strength = 0.55) {
  return `<rect width="${w}" height="${h}" fill="url(#vignette)"/>
  <defs><radialGradient id="vignette" cx="50%" cy="45%" r="70%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="${strength}"/>
  </radialGradient></defs>`;
}

function rose(cx, cy, r, color, opacity = 0.92) {
  const petals = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const px = cx + Math.cos(angle) * r * 0.55;
    const py = cy + Math.sin(angle) * r * 0.55;
    petals.push(`<circle cx="${px}" cy="${py}" r="${r * 0.48}" fill="${color}" opacity="${opacity}"/>`);
  }
  petals.push(`<circle cx="${cx}" cy="${cy}" r="${r * 0.32}" fill="${color}" opacity="${opacity + 0.05}"/>`);
  return petals.join('');
}

function leaf(x, y, scale, rotation, color = brand.forest) {
  return `<ellipse cx="${x}" cy="${y}" rx="${18 * scale}" ry="${42 * scale}" fill="${color}" opacity="0.75" transform="rotate(${rotation} ${x} ${y})"/>`;
}

function stem(x, y1, y2) {
  return `<path d="M ${x} ${y1} Q ${x + 8} ${(y1 + y2) / 2} ${x} ${y2}" stroke="${brand.forest}" stroke-width="3" fill="none" opacity="0.6"/>`;
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

function bouquetScene(w, h, { roses, accent, bg1, bg2, leaves = true }) {
  const floor = h * 0.88;
  let florals = '';
  roses.forEach(([x, y, r, color]) => {
    florals += rose(x * w, y * h, r, color);
  });
  if (leaves) {
    florals += leaf(w * 0.18, h * 0.72, 1.1, -25);
    florals += leaf(w * 0.82, h * 0.68, 0.9, 35);
    florals += leaf(w * 0.55, h * 0.78, 0.7, 10, accent);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, bg1, bg2)}
    ${bokeh(w, h, 14, 0.08)}
    ${florals}
    <rect x="0" y="${floor}" width="${w}" height="${h - floor}" fill="${brand.charcoal}" opacity="0.12"/>
    ${vignette(w, h, 0.45)}
  </svg>`;
}

function compositionScene(w, h) {
  const boxY = h * 0.55;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#3d3028', '#1f1814')}
    ${bokeh(w, h, 10, 0.1)}
    <rect x="${w * 0.22}" y="${boxY}" width="${w * 0.56}" height="${h * 0.28}" fill="#2a211c" rx="4"/>
    <rect x="${w * 0.24}" y="${boxY - 6}" width="${w * 0.52}" height="12" fill="${brand.gold}" opacity="0.35"/>
    ${rose(w * 0.35, h * 0.42, 38, '#E8C4B8')}
    ${rose(w * 0.5, h * 0.35, 45, brand.terracotta)}
    ${rose(w * 0.65, h * 0.4, 40, '#F0EBE3')}
    ${leaf(w * 0.28, h * 0.5, 0.8, -20)}
    ${leaf(w * 0.72, h * 0.48, 0.85, 25)}
    ${vignette(w, h, 0.5)}
  </svg>`;
}

function singleRoseScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#2a1f1c', '#141210')}
    ${bokeh(w, h, 8, 0.12)}
    ${stem(w * 0.5, h * 0.55, h * 0.92)}
    ${rose(w * 0.5, h * 0.38, 55, brand.terracotta)}
    ${leaf(w * 0.44, h * 0.62, 0.6, -30)}
    ${leaf(w * 0.56, h * 0.68, 0.55, 40)}
    ${vignette(w, h, 0.55)}
  </svg>`;
}

function balloonsScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#1a2520', '#0f1512')}
    ${bokeh(w, h, 12, 0.1)}
    <ellipse cx="${w * 0.35}" cy="${h * 0.32}" rx="52" ry="62" fill="${brand.gold}" opacity="0.9"/>
    <ellipse cx="${w * 0.35}" cy="${h * 0.28}" rx="20" ry="12" fill="#fff" opacity="0.15"/>
    <path d="M ${w * 0.35} ${h * 0.38} L ${w * 0.35} ${h * 0.75}" stroke="${brand.gold}" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="${w * 0.55}" cy="${h * 0.28}" rx="48" ry="58" fill="${brand.terracotta}" opacity="0.85"/>
    <path d="M ${w * 0.55} ${h * 0.34} L ${w * 0.48} ${h * 0.72}" stroke="${brand.ivory}" stroke-width="1.5" opacity="0.4"/>
    <ellipse cx="${w * 0.68}" cy="${h * 0.36}" rx="44" ry="54" fill="#E8D5C4" opacity="0.8"/>
    <path d="M ${w * 0.68} ${h * 0.42} L ${w * 0.72} ${h * 0.78}" stroke="${brand.ivory}" stroke-width="1.5" opacity="0.4"/>
    ${vignette(w, h, 0.45)}
  </svg>`;
}

function pottedScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#E8E4DE', '#D4CEC4')}
    ${bokeh(w, h, 6, 0.06)}
    <path d="M ${w * 0.32} ${h * 0.72} L ${w * 0.68} ${h * 0.72} L ${w * 0.64} ${h * 0.88} L ${w * 0.36} ${h * 0.88} Z" fill="#8B7355"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.72}" rx="${w * 0.2}" ry="8" fill="#6B5344"/>
    ${leaf(w * 0.38, h * 0.55, 1.2, -40, brand.forest)}
    ${leaf(w * 0.62, h * 0.52, 1.1, 35, brand.forest)}
    ${rose(w * 0.45, h * 0.38, 28, '#fff', 0.95)}
    ${rose(w * 0.55, h * 0.35, 32, '#fff', 0.9)}
    ${rose(w * 0.5, h * 0.42, 24, '#F5F0EB', 0.85)}
    ${vignette(w, h, 0.35)}
  </svg>`;
}

function toyScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#F5EDE4', '#E8DFD4')}
    ${bokeh(w, h, 8, 0.05)}
    <ellipse cx="${w * 0.5}" cy="${h * 0.72}" rx="${w * 0.22}" ry="${h * 0.14}" fill="#C9A87C" opacity="0.2"/>
    <circle cx="${w * 0.5}" cy="${h * 0.38}" r="58" fill="#D4B896"/>
    <circle cx="${w * 0.5}" cy="${h * 0.38}" r="48" fill="#E8D5C4"/>
    <circle cx="${w * 0.38}" cy="${h * 0.35}" r="22" fill="#E8D5C4"/>
    <circle cx="${w * 0.62}" cy="${h * 0.35}" r="22" fill="#E8D5C4"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.58}" rx="42" ry="52" fill="#E8D5C4"/>
    <circle cx="${w * 0.42}" cy="${h * 0.34}" r="5" fill="${brand.charcoal}" opacity="0.7"/>
    <circle cx="${w * 0.58}" cy="${h * 0.34}" r="5" fill="${brand.charcoal}" opacity="0.7"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.44}" rx="8" ry="6" fill="${brand.terracotta}" opacity="0.35"/>
    ${vignette(w, h, 0.25)}
  </svg>`;
}

function souvenirScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#F0EBE3', '#E0D8CC')}
    ${bokeh(w, h, 6, 0.04)}
    <rect x="${w * 0.28}" y="${h * 0.35}" width="${w * 0.44}" height="${h * 0.38}" fill="#FAF8F5" rx="2"/>
    <rect x="${w * 0.28}" y="${h * 0.35}" width="${w * 0.44}" height="8" fill="${brand.gold}" opacity="0.4"/>
    <path d="M ${w * 0.38} ${h * 0.52} Q ${w * 0.5} ${h * 0.48} ${w * 0.62} ${h * 0.52}" stroke="${brand.terracotta}" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M ${w * 0.36} ${h * 0.58} Q ${w * 0.5} ${h * 0.54} ${w * 0.64} ${h * 0.58}" stroke="${brand.warmGray}" stroke-width="1" fill="none" opacity="0.35"/>
    <circle cx="${w * 0.5}" cy="${h * 0.62}" r="14" fill="${brand.terracotta}" opacity="0.25"/>
    <path d="M ${w * 0.22} ${h * 0.55} L ${w * 0.78} ${h * 0.55} L ${w * 0.75} ${h * 0.78} L ${w * 0.25} ${h * 0.78} Z" fill="#E8DFD4" opacity="0.6"/>
    ${vignette(w, h, 0.3)}
  </svg>`;
}

function paintingScene(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bgGradient(w, h, '#2a2826', '#1a1816')}
    ${bokeh(w, h, 8, 0.08)}
    <rect x="${w * 0.18}" y="${h * 0.12}" width="${w * 0.64}" height="${h * 0.62}" fill="#3d3834" rx="3"/>
    <rect x="${w * 0.22}" y="${h * 0.16}" width="${w * 0.56}" height="${h * 0.54}" fill="#F5F0EB"/>
    ${stem(w * 0.42, h * 0.45, h * 0.58)}
    ${stem(w * 0.58, h * 0.42, h * 0.55)}
    ${rose(w * 0.42, h * 0.38, 22, brand.terracotta, 0.8)}
    ${rose(w * 0.58, h * 0.35, 26, '#C9A87C', 0.75)}
    ${leaf(w * 0.35, h * 0.48, 0.5, -20, brand.forest)}
    ${leaf(w * 0.65, h * 0.46, 0.45, 25, brand.forest)}
    ${vignette(w, h, 0.45)}
  </svg>`;
}

function heroScene(w, h) {
  return bouquetScene(w, h, {
    bg1: '#1a1512',
    bg2: '#0d0b0a',
    accent: brand.forest,
    roses: [
      [0.28, 0.52, 48, brand.terracotta],
      [0.42, 0.45, 55, '#C44D35'],
      [0.55, 0.48, 50, brand.terracotta],
      [0.68, 0.44, 52, '#A03828'],
      [0.38, 0.58, 38, '#E8C4B8'],
      [0.62, 0.55, 42, '#D4956A'],
    ],
  });
}

function ctaScene(w, h) {
  return bouquetScene(w, h, {
    bg1: '#141210',
    bg2: '#0a0908',
    accent: brand.gold,
    roses: [
      [0.35, 0.5, 44, brand.terracotta],
      [0.5, 0.42, 50, '#8B3A28'],
      [0.65, 0.48, 46, brand.gold],
    ],
  });
}

const bouquetVariants = [
  { bg1: '#2F4538', bg2: '#1a2a22', roses: [[0.35, 0.48, 48, brand.terracotta], [0.55, 0.42, 52, '#C44D35'], [0.45, 0.55, 40, '#E8C4B8']] },
  { bg1: '#4a3d45', bg2: '#2a2228', roses: [[0.4, 0.45, 45, '#F0D5E0'], [0.55, 0.5, 42, '#E8C4D0'], [0.48, 0.38, 38, '#fff']] },
  { bg1: '#3d2020', bg2: '#1f1010', roses: [[0.32, 0.46, 50, '#C41E3A'], [0.5, 0.4, 55, brand.terracotta], [0.65, 0.48, 48, '#8B0000']] },
  { bg1: '#3a3540', bg2: '#222028', roses: [[0.38, 0.44, 46, '#9B8AA5'], [0.52, 0.48, 44, '#E8E0F0'], [0.62, 0.42, 40, brand.gold]] },
  { bg1: '#3d4a35', bg2: '#252e20', roses: [[0.35, 0.5, 42, '#FFD700'], [0.5, 0.45, 48, '#FFF8DC'], [0.62, 0.52, 38, '#F0E68C']] },
  { bg1: '#453530', bg2: '#2a211e', roses: [[0.4, 0.46, 44, '#FFB347'], [0.55, 0.42, 50, '#FF8C42'], [0.48, 0.55, 36, brand.gold]] },
  { bg1: '#404535', bg2: '#282820', roses: [[0.42, 0.44, 46, '#F5E6D3'], [0.55, 0.48, 42, '#E8D5C4'], [0.38, 0.52, 38, '#fff']] },
  { bg1: '#3d3040', bg2: '#251e28', roses: [[0.35, 0.45, 50, brand.terracotta], [0.5, 0.4, 55, brand.gold], [0.65, 0.48, 45, '#E8C4B8']] },
];

const files = [
  { name: 'hero.jpg', w: 1920, h: 1280, fn: () => heroScene(1920, 1280) },
  { name: 'cta-bg.jpg', w: 1920, h: 1080, fn: () => ctaScene(1920, 1080) },
  { name: 'composition-01.jpg', w: 800, h: 1000, fn: () => compositionScene(800, 1000) },
  { name: 'composition-02.jpg', w: 800, h: 1000, fn: () => compositionScene(800, 1000) },
  { name: 'single-01.jpg', w: 800, h: 1000, fn: () => singleRoseScene(800, 1000) },
  { name: 'balloons-01.jpg', w: 800, h: 1000, fn: () => balloonsScene(800, 1000) },
  { name: 'potted-01.jpg', w: 800, h: 1000, fn: () => pottedScene(800, 1000) },
  { name: 'toy-01.jpg', w: 800, h: 1000, fn: () => toyScene(800, 1000) },
  { name: 'toy-02.jpg', w: 800, h: 1000, fn: () => toyScene(800, 1000) },
  { name: 'souvenir-01.jpg', w: 800, h: 1000, fn: () => souvenirScene(800, 1000) },
  { name: 'souvenir-02.jpg', w: 800, h: 1000, fn: () => souvenirScene(800, 1000) },
  { name: 'painting-01.jpg', w: 800, h: 1000, fn: () => paintingScene(800, 1000) },
  { name: 'painting-02.jpg', w: 800, h: 1000, fn: () => paintingScene(800, 1000) },
  ...bouquetVariants.map((v, i) => ({
    name: `bouquet-${String(i + 1).padStart(2, '0')}.jpg`,
    w: 800,
    h: 1000,
    fn: () => bouquetScene(800, 1000, { ...v, accent: brand.forest }),
  })),
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const svg = file.fn();
  const outPath = join(outDir, file.name);
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
  console.log(`✓ ${file.name}`);
}

console.log(`\nGenerated ${files.length} premium images in src/assets/images/`);
