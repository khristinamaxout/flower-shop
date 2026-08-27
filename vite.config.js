import { defineConfig } from 'vite';

/** GitHub Pages = /flower-shop/ ; Netlify & Drop = ./ (relative) */
const base =
  process.env.GITHUB_PAGES === 'true' ? '/flower-shop/' : './';

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'],
});
