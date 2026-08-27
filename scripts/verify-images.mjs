import { rmSync, existsSync, readdirSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Ensure embedded images exist
const imageData = join(root, 'src/data/image-data.js');
if (!existsSync(imageData) || statSync(imageData).size < 10000) {
  console.log('Generating embedded images...');
  execSync('npm run images', { cwd: root, stdio: 'inherit' });
}

const size = statSync(imageData).size;
console.log(`image-data.js: ${(size / 1024).toFixed(0)} KB`);

const isBuild = process.argv.includes('--build');

// Remove stale image folders only before production build
if (isBuild) {
  for (const dir of ['public/images', 'dist/images', 'dist']) {
    const p = join(root, ...dir.split('/'));
    if (existsSync(p)) {
      try {
        rmSync(p, { recursive: true, force: true, maxRetries: 3 });
        console.log(`Removed ${dir}`);
      } catch (err) {
        console.warn(`Could not remove ${dir}:`, err.message);
      }
    }
  }
}

// Verify image-data contains valid base64
const content = readFileSync(imageData, 'utf8');
if (!content.includes('data:image/jpeg;base64,')) {
  throw new Error('image-data.js invalid — run npm run images');
}

console.log('OK — images embedded in JS, ready for dev/build');
