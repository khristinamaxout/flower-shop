/**
 * Download editorial flower photos → public/images/*.webp
 * Sources: Unsplash (royalty-free). Fallback: sharp SVG scenes.
 * Run: node scripts/download-images.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images');

const UNSPLASH = 'https://images.unsplash.com';

const sources = [
  { name: 'hero-bouquet.webp', url: `${UNSPLASH}/photo-1490750967868-88aa4486c946?w=1920&q=85&fm=jpg`, w: 1920, h: 1280 },
  { name: 'bouquet-01.webp', url: `${UNSPLASH}/photo-1518895949257-7621bc390ecb?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-02.webp', url: `${UNSPLASH}/photo-1462276576-4e1d7adfe548?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-03.webp', url: `${UNSPLASH}/photo-1487075092596-62eb39291244?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-04.webp', url: `${UNSPLASH}/photo-1455659814943-b12229fe83d0?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-05.webp', url: `${UNSPLASH}/photo-1526047930722-326f99146f4d?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-06.webp', url: `${UNSPLASH}/photo-1508616510722-0e227b367a89?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-07.webp', url: `${UNSPLASH}/photo-1582794543139-59d18659b0bf?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-08.webp', url: `${UNSPLASH}/photo-1561185100-0a028e8bdef0?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-09.webp', url: `${UNSPLASH}/photo-1563241527-30040b558386?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-10.webp', url: `${UNSPLASH}/photo-1591886966228-2ba9f9a2f41b?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-11.webp', url: `${UNSPLASH}/photo-1591453089815-18f8c665a407?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'bouquet-12.webp', url: `${UNSPLASH}/photo-1606041008023-472dfb495345?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'composition-01.webp', url: `${UNSPLASH}/photo-1578662996442-48f60103fc96?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'composition-02.webp', url: `${UNSPLASH}/photo-1563241527-30040b558386?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'single-01.webp', url: `${UNSPLASH}/photo-1518709268805-4e9042af2177?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'balloons-01.webp', url: `${UNSPLASH}/photo-1530103862673-de8c9e37781a?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'plants.webp', url: `${UNSPLASH}/photo-1459411550354-44fa45a4710e?w=1200&q=85&fm=jpg`, w: 1200, h: 900 },
  { name: 'toy-01.webp', url: `${UNSPLASH}/photo-1558618666-fcd25c85cd64?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'souvenir-01.webp', url: `${UNSPLASH}/photo-1549465220-1a8b9238cd48?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'painting-01.webp', url: `${UNSPLASH}/photo-1579783902610-fdcb27f2a917?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'gift-moment.webp', url: `${UNSPLASH}/photo-1527529482836-9946612473f6?w=1200&q=85&fm=jpg`, w: 1200, h: 900 },
  { name: 'florist-work.webp', url: `${UNSPLASH}/photo-1487530811176-3780de880c2d?w=1000&q=85&fm=jpg`, w: 1000, h: 750 },
  { name: 'flowers-detail.webp', url: `${UNSPLASH}/photo-1495365924544-a210a5e88c07?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'gift-box.webp', url: `${UNSPLASH}/photo-1549465220-1a8b9238cd48?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'cta-bg.webp', url: `${UNSPLASH}/photo-1490750967868-88aa4486c946?w=1920&q=85&fm=jpg`, w: 1920, h: 1080 },
  { name: 'gallery-01.webp', url: `${UNSPLASH}/photo-1518895949257-7621bc390ecb?w=900&q=85&fm=jpg`, w: 900, h: 600 },
  { name: 'gallery-02.webp', url: `${UNSPLASH}/photo-1462276576-4e1d7adfe548?w=700&q=85&fm=jpg`, w: 700, h: 900 },
  { name: 'gallery-03.webp', url: `${UNSPLASH}/photo-1487075092596-62eb39291244?w=700&q=85&fm=jpg`, w: 700, h: 800 },
  { name: 'gallery-04.webp', url: `${UNSPLASH}/photo-1455659814943-b12229fe83d0?w=900&q=85&fm=jpg`, w: 900, h: 600 },
  { name: 'gallery-05.webp', url: `${UNSPLASH}/photo-1526047930722-326f99146f4d?w=700&q=85&fm=jpg`, w: 700, h: 900 },
  { name: 'gallery-06.webp', url: `${UNSPLASH}/photo-1508616510722-0e227b367a89?w=700&q=85&fm=jpg`, w: 700, h: 800 },
  { name: 'gallery-07.webp', url: `${UNSPLASH}/photo-1582794543139-59d18659b0bf?w=900&q=85&fm=jpg`, w: 900, h: 600 },
  { name: 'gallery-08.webp', url: `${UNSPLASH}/photo-1561185100-0a028e8bdef0?w=700&q=85&fm=jpg`, w: 700, h: 900 },
  { name: 'candle-01.webp', url: `${UNSPLASH}/photo-1602608885776-1c3165c4a032?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'sweets-01.webp', url: `${UNSPLASH}/photo-1549007953-2f2c0cbd1a26?w=900&q=85&fm=jpg`, w: 800, h: 1000 },
  { name: 'social-01.webp', url: `${UNSPLASH}/photo-1495365924544-a210a5e88c07?w=600&q=85&fm=jpg`, w: 600, h: 600 },
  { name: 'social-02.webp', url: `${UNSPLASH}/photo-1518895949257-7621bc390ecb?w=600&q=85&fm=jpg`, w: 600, h: 600 },
  { name: 'social-03.webp', url: `${UNSPLASH}/photo-1462276576-4e1d7adfe548?w=600&q=85&fm=jpg`, w: 600, h: 600 },
  { name: 'social-04.webp', url: `${UNSPLASH}/photo-1459411550354-44fa45a4710e?w=600&q=85&fm=jpg`, w: 600, h: 600 },
  { name: 'social-05.webp', url: `${UNSPLASH}/photo-1526047930722-326f99146f4d?w=600&q=85&fm=jpg`, w: 600, h: 600 },
  { name: 'social-06.webp', url: `${UNSPLASH}/photo-1508616510722-0e227b367a89?w=600&q=85&fm=jpg`, w: 600, h: 600 },
];

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 FloraAtelierDemo/1.0' } }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 5) {
        fetchBuffer(res.headers.location, redirects + 1).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fallbackSvg(w, h, label) {
  const colors = ['#F5F0E7', '#E9E0D3', '#69735F', '#B88C83'];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors[0]}"/><stop offset="100%" stop-color="${colors[1]}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.18}" fill="${colors[3]}" opacity="0.35"/>
    <ellipse cx="${w * 0.42}" cy="${h * 0.55}" rx="${w * 0.08}" ry="${h * 0.12}" fill="${colors[2]}" opacity="0.25"/>
    <text x="${w * 0.5}" y="${h * 0.88}" text-anchor="middle" fill="${colors[2]}" font-family="Georgia,serif" font-size="14">${label}</text>
  </svg>`;
}

await mkdir(outDir, { recursive: true });

let ok = 0;
let fallback = 0;

for (const item of sources) {
  const outPath = join(outDir, item.name);
  try {
    const buf = await fetchBuffer(item.url);
    if (buf.length < 1000) throw new Error('too small');
    await sharp(buf)
      .resize(item.w, item.h, { fit: 'cover', position: 'centre' })
      .webp({ quality: 88, effort: 4 })
      .toFile(outPath);
    console.log(`✓ ${item.name} (downloaded)`);
    ok++;
  } catch (e) {
    const svg = fallbackSvg(item.w, item.h, 'Flora Atelier');
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(outPath);
    console.log(`~ ${item.name} (fallback)`);
    fallback++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${fallback} fallback → public/images/`);
