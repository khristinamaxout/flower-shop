/**
 * Конвертация реалистичных PNG → WebP для сайта
 * Run: npm run gift-art
 */
import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GEN_FILES } from './gen-manifest.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'assets', 'generated');
const outDir = join(root, 'public', 'references', 'items');

const DEFAULT = { w: 900, h: 1125 };

async function processPhoto({ png, webp, w, h }) {
  const src = join(srcDir, png);
  try {
    await access(src);
  } catch {
    console.warn(`⚠ ${png} не найден в assets/generated/ — пропуск`);
    return false;
  }
  const size = { w: w ?? DEFAULT.w, h: h ?? DEFAULT.h };
  await mkdir(outDir, { recursive: true });
  await sharp(src)
    .rotate()
    .resize(size.w, size.h, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6, m1: 1.0, m2: 0.3 })
    .webp({ quality: 94, effort: 6 })
    .toFile(join(outDir, webp));
  console.log(`✓ ${webp}`);
  return true;
}

let ok = 0;
for (const entry of GEN_FILES) {
  if (await processPhoto(entry)) ok++;
}

if (ok === 0) {
  console.error('Нет PNG в assets/generated/');
  process.exit(1);
}

console.log(`\nГотово: ${ok} фото → public/references/items/`);
