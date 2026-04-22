import { bricks } from '@/data/bricks';

export async function GET() {
  const baseUrl = 'https://stack.lego-sia.com';
  
  const items = bricks.slice(0, 20).map(brick => `
    <item>
      <title><![CDATA[${brick.name} - ${brick.killerFeature}]]></title>
      <link>${baseUrl}/ko</link>
      <guid>${brick.id}</guid>
      <pubDate>${new Date(brick.lastUpdated).toUTCString()}</pubDate>
      <description><![CDATA[Category: ${brick.category} | DX Score: ${brick.dxScore}]]></description>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LegoStack - Latest AI Tools</title>
    <link>${baseUrl}</link>
    <description>The most beautiful and powerful AI bricks for solo developers.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
