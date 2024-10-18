export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="https://umediagram.vercel.app/rss.xml" rel="self" type="application/rss+xml" />
    <title>Umediagram</title>
    <description>Umediagram</description>
    <link>https://umediagram.vercel.app</link>
  </channel>
</rss>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
