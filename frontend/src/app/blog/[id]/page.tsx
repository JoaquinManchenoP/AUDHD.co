import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");

async function fetchPost(id: string) {
  // Try multiple collections to find the post
  const collections = ["blog-posts", "main-guides", "mainGuide", "blogPost"];
  
  for (const collection of collections) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/${collection}?populate=*`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        const post = (data.data || []).find((p: any) => p.id.toString() === id);
        if (post) {
          console.log(`✅ Found post in ${collection}:`, post);
          return post;
        }
      } else if (res.status === 404) {
        // Silently skip 404s to avoid console spam
        continue;
      }
    } catch (error) {
      console.log(`❌ Error fetching ${collection}:`, error);
    }
  }
  
  return null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) {
    notFound();
  }
  return <BlogPostClient blogPost={post} />;
}
