import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");

async function fetchPost(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const post = (data.data || []).find((p: any) => p.id.toString() === id);
  return post || null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) {
    notFound();
  }
  return <BlogPostClient blogPost={post} />;
}
