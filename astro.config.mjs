import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';



export default defineConfig({

  site: 'https://prashantv32.github.io',
  integrations: [sitemap()],

});
