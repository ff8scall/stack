import { blogPosts } from '@/data/posts';

export async function GET() {
  const baseUrl = 'https://stack.lego-sia.com';
  
  const rssItems = blogPosts
    .map((post) => `
      <item>
        <title><![CDATA[${post.title.ko} | ${post.title.en}]]></title>
        <link>${baseUrl}/ko/blog/${post.slug}</link>
        <guid>${baseUrl}/ko/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt.ko}]]></description>
      </item>
    `)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>LegoStack AI FinOps Blog</title>
        <link>${baseUrl}</link>
        <description>Professional insights on AI infrastructure cost and performance optimization.</description>
        <language>ko-KR</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItems}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
