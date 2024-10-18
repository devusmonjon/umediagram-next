import { getAllUsernames } from "@/work-with-api"; // Barcha userlarni olish funksiyasi
import { MetadataRoute } from "next";

// Foydalanuvchilar uchun dinamik sitemap yaratish
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await getAllUsernames(); // Username'larni olib kelish
  const siteUrl = "https://umediagram.vercel.app"; // Saytingiz URL

  // Statik sahifalar uchun route'lar
  const staticRoutes = ["", "/about", "/contact", "/explore"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // Dinamik user profillari uchun route'lar
  const userRoutes = users.map((username: string) => ({
    url: `${siteUrl}/profile/${username}`,
    lastModified: new Date().toISOString(),
  }));

  // Barcha route'larni birlashtirish
  return [...staticRoutes, ...userRoutes];
}
