/**
 * Конвертация реалистичных PNG → WebP для сайта
 * Run: npm run gift-art
 */
import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'assets', 'generated');
const outDir = join(root, 'public', 'references', 'items');

const OUT = { w: 900, h: 1125 };

const files = [
  ['gen-balloons.png', 'gen-balloons.webp'],
  ['gen-teddy.png', 'gen-teddy.webp'],
  ['gen-postcard.png', 'gen-postcard.webp'],
  ['gen-souvenir.png', 'gen-souvenir.webp'],
  ['gen-painting.png', 'gen-painting.webp'],
  ['gen-sweets.png', 'gen-sweets.webp'],
  ['bouquet-summer-evening.png', 'bouquet-summer-evening.webp'],
];

async function processPhoto(pngName, webpName) {
  const src = join(srcDir, pngName);
  try {
    await access(src);
  } catch {
    console.warn(`⚠ ${pngName} не найден в assets/generated/ — пропуск`);
    return false;
  }
  await mkdir(outDir, { recursive: true });
  await sharp(src)
    .rotate()
    .resize(OUT.w, OUT.h, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6, m1: 1.0, m2: 0.3 })
    .webp({ quality: 94, effort: 6 })
    .toFile(join(outDir, webpName));
  console.log(`✓ ${webpName}`);
  return true;
}

let ok = 0;
for (const [png, webp] of files) {
  if (await processPhoto(png, webp)) ok++;
}

if (ok === 0) {
  console.error('Нет PNG в assets/generated/');
  process.exit(1);
}

console.log(`\nГотово: ${ok} фото → public/references/items/`);
