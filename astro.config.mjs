import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

export default defineConfig({
  site: 'https://pascalemp.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [[remarkMath, { singleDollarTextMath: true }]],
    rehypePlugins: [rehypeMathjax],
  },
});