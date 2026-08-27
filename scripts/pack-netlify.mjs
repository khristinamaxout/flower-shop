/**
 * Creates flower-shop-site.zip for Netlify Drop upload.
 */
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync } from 'fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const outZip = join(root, 'flower-shop-site.zip');

if (existsSync(outZip)) unlinkSync(outZip);

execSync(
  `powershell -NoProfile -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${outZip}' -Force"`,
  { stdio: 'inherit' }
);

console.log(`\nReady for Netlify Drop: ${outZip}`);
