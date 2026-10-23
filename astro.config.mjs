// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import clinica from './src/data/clinica.json' with { type: 'json' };

export default defineConfig({
  site: clinica.seo.url,
  output: 'static',
  integrations: [sitemap()],
  image: {
    // AVIF/WebP gerados no build via sharp
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
