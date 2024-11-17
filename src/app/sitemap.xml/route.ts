import { getAllUsernames } from "@/work-with-api";

export async function GET() {
  const users = await getAllUsernames();
  const siteUrl = "https://social.usmonjon.uz";

  // Statik sahifalar uchun routes
  const staticRoutes = ["", "/about", "/contact", "/explore"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // Dinamik user profillari uchun routes
  const userRoutes = users.map((username: string) => ({
    url: `${siteUrl}/profile/${username}`,
    lastModified: new Date().toISOString(),
  }));

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticRoutes, ...userRoutes]
    .map(
      (route) => `
    <url>
      <loc>${route.url}</loc>
      <lastmod>${route.lastModified}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
