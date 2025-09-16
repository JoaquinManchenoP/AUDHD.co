"use client";

import Link from "next/link";

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
}

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = data.data || [];
    return posts;
  } catch (e) {
    console.error("Failed to fetch blog posts:", e);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block p-4 border rounded-lg hover:shadow">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
