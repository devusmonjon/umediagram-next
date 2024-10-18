import { getAllPosts, IPost } from "@/work-with-api"; // Barcha postlarni olish funksiyasi

export async function GET() {
  const posts = await getAllPosts(); // Postlarni olib kelamiz
  const siteUrl = "https://umediagram.vercel.app";
  const currentDate = new Date().toUTCString();
  const rssItemsXml = posts
    .map(
      (post: IPost) => `
    <item>
      <title>${post.content_alt}</title>
      <link>${siteUrl}/post/${post.owner.username}/${post._id}</link>
      <description>${post.caption}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid>${siteUrl}/post/${post.owner.username}/${post._id}</guid>
      <author>${post.owner.fullName}</author>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>UMEDIAGRAM - Latest Posts</title>
    <link>${siteUrl}</link>
    <description>Explore the latest posts and updates on UMEDIAGRAM</description>
    <language>en-US</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}