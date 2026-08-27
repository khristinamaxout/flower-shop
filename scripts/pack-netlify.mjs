/**
 * Creates flower-shop-site.zip for Netlify Drop upload.
 * Verifies that assets/ is included in the archive.
 */
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync, readdirSync, statSync } from 'fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const assetsDir = join(distDir, 'assets');
const outZip = join(root, 'flower-shop-site.zip');

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('ERROR: dist/index.html missing. Run: npm run build:netlify');
  process.exit(1);
}

if (!existsSync(assetsDir)) {
  console.error('ERROR: dist/assets/ missing. Run: npm run build:netlify');
  process.exit(1);
}

const assetFiles = readdirSync(assetsDir);
if (assetFiles.length < 2) {
  console.error('ERROR: dist/assets/ is empty or incomplete');
  process.exit(1);
}

const distSize = readdirSync(distDir, { recursive: true })
  .filter((f) => statSync(join(distDir, String(f))).isFile())
  .reduce((sum, f) => sum + statSync(join(distDir, String(f))).size, 0);

console.log(`dist: ${assetFiles.length} assets, ${(distSize / 1024 / 1024).toFixed(2)} MB total`);

if (existsSync(outZip)) unlinkSync(outZip);

execSync(
  `powershell -NoProfile -Command "Compress-Archive -Path '${distDir.replace(/'/g, "''")}\\*' -DestinationPath '${outZip.replace(/'/g, "''")}' -Force"`,
  { stdio: 'inherit' }
);

const zipSize = statSync(outZip).size;
console.log(`\nReady for Netlify Drop: ${outZip}`);
console.log(`Zip size: ${(zipSize / 1024 / 1024).toFixed(2)} MB`);
console.log('\nUpload THIS zip to Netlify → Deploys (drag & drop)');
console.log('Must contain: index.html + assets/ folder + _redirects');
