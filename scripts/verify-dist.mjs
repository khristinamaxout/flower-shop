/**
 * Verify dist/index.html uses Netlify-compatible asset paths.
 * Run automatically after build:netlify
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist/index.html');

if (!existsSync(indexPath)) {
  console.error('ERROR: dist/index.html not found. Run npm run build:netlify first.');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');

if (html.includes('/flower-shop/')) {
  console.error('ERROR: dist built for GitHub Pages, not Netlify!');
  console.error('Run: npm run build:netlify');
  process.exit(1);
}

if (!html.includes('./assets/') && !html.includes('src="/assets/')) {
  console.error('ERROR: asset paths look wrong in dist/index.html');
  process.exit(1);
}

console.log('OK — dist ready for Netlify (paths verified)');
