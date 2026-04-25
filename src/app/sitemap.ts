import { MetadataRoute } from 'next';
import { bricks } from '@/data/bricks';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stack.lego-sia.com';
  const locales = ['ko', 'en'];

  const routes = ['', '/blog', '/category/Language', '/category/Vision', '/category/Voice', '/category/Builder', '/category/Infra'];

  // Base routes for each locale
  const baseSitemaps = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Brick detail pages
  const brickSitemaps = locales.flatMap((locale) =>
    bricks.map((brick) => ({
      url: `${baseUrl}/${locale}/brick/${brick.id}`,
      lastModified: new Date(brick.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Compare pages (All combinations within category)
  const categories = Array.from(new Set(bricks.map(b => b.category)));
  const compareSitemaps = locales.flatMap((locale) =>
    categories.flatMap((cat) => {
      const catBricks = bricks.filter(b => b.category === cat).slice(0, 5);
      if (catBricks.length < 2) return [];
      
      const pairs = [];
      for (let i = 0; i < catBricks.length; i++) {
        for (let j = i + 1; j < catBricks.length; j++) {
          pairs.push({
            url: `${baseUrl}/${locale}/compare/${catBricks[i].id}-vs-${catBricks[j].id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          });
        }
      }
      return pairs;
    })
  );

  return [...baseSitemaps, ...brickSitemaps, ...compareSitemaps];
}
