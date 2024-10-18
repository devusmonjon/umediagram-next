"use client";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default function RssPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRssFeed = async () => {
      try {
        const res = await fetch("/rss.xml");
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        console.log(xml.querySelector("media:content"));
        const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent || "No Title",
          link: item.querySelector("link")?.textContent || "#",
          pubDate: item.querySelector("pubDate")?.textContent || "",
          description: item.querySelector("description")?.textContent || "",
        }));

        setPosts(items);
      } catch (error) {
        console.error("Failed to fetch RSS feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRssFeed();
  }, []);

  if (loading) return <p>Loading RSS feed...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-6">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </a>
            <p className="text-sm text-gray-600">
              {new Date(post.pubDate).toLocaleString()}
            </p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
