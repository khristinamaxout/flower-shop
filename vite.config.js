import { defineConfig } from 'vite';
import { resolve } from 'path';

/** GitHub Pages build only — dev always uses / */
const base =
  process.env.GITHUB_PAGES === 'true' ? '/flower-shop/' : '/';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : base,
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'],
}));
