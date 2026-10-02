import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  // Read production site URL from centralized site configuration (src/data/site.ts)
  site: siteConfig.siteUrl,
  integrations: [sitemap()],
});
