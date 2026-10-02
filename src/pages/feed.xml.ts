import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Fetch only non-draft posts and sort by newest first
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  blog.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = context.site?.toString() ?? siteConfig.siteUrl;

  return rss({
    title: `${siteConfig.name}'s Blog`,
    description: `Articles and notes on full-stack web development, Node.js, Express, and TypeScript by ${siteConfig.name}.`,
    site: site,
    items: blog.map((post) => {
      const slug = (post as any).slug ?? post.id.replace(/\.(md|mdx)$/, '');
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${slug}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
