import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://usa-seoustaad-com.pages.dev',
  output: 'static',
  adapter: cloudflare()
});
