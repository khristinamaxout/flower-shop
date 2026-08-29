/**
 * Нарезка референсов + улучшение резкости и разрешения
 * Run: npm run process-refs
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'references');
const outDir = join(root, 'public', 'references', 'items');

const SIZES = {
  product: { w: 900, h: 1125 },
  hero: { w: 1920, h: 1280 },
  svg: { w: 1200, h: 1500 },
};

const brand = {
  vanilla: '#FFF5F0',
  warm: '#F8EBE6',
  lavender: '#9B8EC4',
  lavenderLight: '#C5BBE0',
  chrys: '#F0E4B8',
  chrysDeep: '#E8D48A',
  kraft: '#C9A882',
  kraftDark: '#A88862',
  green: '#8FA88A',
  greenDark: '#6B8F66',
};

/** Апскейл + лёгкая резкость + WebP без потери деталей */
function enhance(input, { w, h }) {
  return sharp(input)
    .rotate()
    .resize(w, h, {
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .sharpen({ sigma: 1.0, m1: 1.15, m2: 0.45, x1: 2, y2: 12 })
    .webp({
      quality: 96,
      effort: 6,
      smartSubsample: false,
      nearLossless: true,
    });
}

async function cropGrid(srcFile, { cols, rows, imgRatio, prefix }) {
  const input = join(srcDir, srcFile);
  const meta = await sharp(input).metadata();
  const cw = Math.floor(meta.width / cols);
  const ch = Math.floor(meta.height / rows);
  const ih = Math.max(1, Math.floor(ch * imgRatio));
  const { w, h } = SIZES.product;
  let n = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const out = join(outDir, `${prefix}-${String(n).padStart(2, '0')}.webp`);
      const cropped = await sharp(input)
        .extract({ left: c * cw, top: r * ch, width: cw, height: ih })
        .png()
        .toBuffer();

      await enhance(cropped, { w, h }).toFile(out);
      console.log(`✓ ${prefix}-${String(n).padStart(2, '0')}.webp → ${w}×${h}`);
      n++;
    }
  }
}

async function cropHero() {
  const input = join(srcDir, 'hero-native-poppy.png');
  const meta = await sharp(input).metadata();
  const left = Math.floor(meta.width * 0.36);
  const width = meta.width - left;
  const out = join(outDir, 'hero-clean.webp');
  const { w, h } = SIZES.hero;

  const cropped = await sharp(input)
    .extract({ left, top: 0, width, height: meta.height })
    .png()
    .toBuffer();

  await enhance(cropped, { w, h }).toFile(out);
  console.log(`✓ hero-clean.webp → ${w}×${h}`);
}

function summerEveningSvg(w, h) {
  const kraftY = h * 0.58;
  let lavenders = '';
  for (let i = 0; i < 9; i++) {
    const x = w * (0.22 + i * 0.07);
    const stemH = h * (0.18 + (i % 3) * 0.04);
    lavenders += `<line x1="${x}" y1="${kraftY}" x2="${x}" y2="${kraftY - stemH}" stroke="${brand.greenDark}" stroke-width="2"/>`;
    lavenders += `<ellipse cx="${x}" cy="${kraftY - stemH - 8}" rx="5" ry="14" fill="${brand.lavender}" opacity="0.9"/>`;
    lavenders += `<ellipse cx="${x + 4}" cy="${kraftY - stemH - 4}" rx="4" ry="11" fill="${brand.lavenderLight}" opacity="0.85"/>`;
  }
  let mums = '';
  const mumPos = [[0.38, 0.42], [0.52, 0.38], [0.46, 0.48], [0.58, 0.44], [0.42, 0.52]];
  for (const [px, py] of mumPos) {
    const cx = w * px;
    const cy = h * py;
    for (let p = 0; p < 12; p++) {
      const a = (p / 12) * Math.PI * 2;
      mums += `<ellipse cx="${cx + Math.cos(a) * 16}" cy="${cy + Math.sin(a) * 16}" rx="11" ry="7" fill="${brand.chrys}" opacity="0.92" transform="rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * 16} ${cy + Math.sin(a) * 16})"/>`;
    }
    mums += `<circle cx="${cx}" cy="${cy}" r="10" fill="${brand.chrysDeep}" opacity="0.8"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${brand.vanilla}"/>
        <stop offset="100%" stop-color="${brand.warm}"/>
      </linearGradient>
      <radialGradient id="light" cx="40%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#light)"/>
    ${lavenders}${mums}
    <path d="M ${w * 0.18} ${kraftY} Q ${w * 0.5} ${kraftY + h * 0.04} ${w * 0.82} ${kraftY} L ${w * 0.78} ${h * 0.92} Q ${w * 0.5} ${h * 0.96} ${w * 0.22} ${h * 0.92} Z" fill="${brand.kraft}"/>
    <path d="M ${w * 0.18} ${kraftY} Q ${w * 0.5} ${kraftY + h * 0.02} ${w * 0.82} ${kraftY}" fill="none" stroke="${brand.kraftDark}" stroke-width="2" opacity="0.4"/>
    <ellipse cx="${w * 0.3}" cy="${h * 0.72}" rx="28" ry="14" fill="${brand.green}" opacity="0.35"/>
    <ellipse cx="${w * 0.68}" cy="${h * 0.7}" rx="24" ry="12" fill="${brand.greenDark}" opacity="0.3"/>
  </svg>`;
}

async function generateSummerEvening() {
  const { w, h } = SIZES.svg;
  const svg = summerEveningSvg(w, h);
  const out = join(outDir, 'bouquet-summer-evening.webp');
  await enhance(Buffer.from(svg), SIZES.product).toFile(out);
  console.log(`✓ bouquet-summer-evening.webp → ${SIZES.product.w}×${SIZES.product.h}`);
}

await mkdir(outDir, { recursive: true });

await cropHero();
await cropGrid('2026-08-29_22-15-56.png', { cols: 3, rows: 1, imgRatio: 0.88, prefix: 'pink' });
await cropGrid('2026-08-29_22-12-42.png', { cols: 3, rows: 1, imgRatio: 0.92, prefix: 'edit' });
await cropGrid('2026-08-29_22-17-11.png', { cols: 6, rows: 1, imgRatio: 0.82, prefix: 'kraft' });
await cropGrid('2026-08-29_22-09-52.png', { cols: 3, rows: 2, imgRatio: 0.68, prefix: 'vase' });
await cropGrid('2026-08-29_22-11-21.png', { cols: 3, rows: 2, imgRatio: 0.65, prefix: 'gift' });
await cropGrid('2026-08-29_22-14-29.png', { cols: 5, rows: 2, imgRatio: 0.62, prefix: 'cat' });
await generateSummerEvening();

// Реалистичные фото подарков (из assets/generated/)
try {
  await import('./generate-gift-art.mjs');
} catch (e) {
  console.warn('gift-art:', e.message);
}

console.log('\nГотово — все изображения → public/references/items/');
