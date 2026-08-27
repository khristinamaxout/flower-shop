import { rmSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

try {
  rmSync(join(root, 'dist'), { recursive: true, force: true });
  console.log('Cleaned dist/');
} catch {
  /* ok */
}

execSync('npx vite build', {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
});
