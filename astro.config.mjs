import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.tumo.com.br',
  output: 'server',
  adapter: vercel(),
});
