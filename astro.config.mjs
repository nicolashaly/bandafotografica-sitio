// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { conCatalogo } from './src/data/negocio.ts';

export default defineConfig({
  site: 'https://bandafotografica.cl',
  integrations: [sitemap({ filter: (pagina) => conCatalogo || !pagina.includes('/catalogo/') })],
});
