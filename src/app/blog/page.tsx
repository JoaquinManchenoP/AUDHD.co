"use client";

import { motion } from "framer-motion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  documentId: string;
  blogPostTitle: string;
  blogPostDescription: string;
  blogPostBody: any;
  blogPostImage?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Function to fetch all blog posts from Strapi
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log("🔄 Fetching blog posts from Strapi...");
    const response = await fetch(
      "http://localhost:1337/api/blog-posts?populate=*"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📡 Raw Strapi response:", data);
    console.log("📊 Blog posts data:", data.data);
    console.log("🔢 Number of posts found:", data.data?.length || 0);

    if (data.data && data.data.length > 0) {
      console.log("📝 First post sample:", data.data[0]);
      console.log("🔍 First post structure:", {
        id: data.data[0].id,
        hasAttributes: !!data.data[0].attributes,
        attributesKeys: data.data[0].attributes
          ? Object.keys(data.data[0].attributes)
          : "none",
        title: data.data[0].attributes?.blogPostTitle,
        description: data.data[0].attributes?.blogPostDescription,
      });
    }

    return data.data || [];
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);
    return [];
  }
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog posts"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="relative">
        <div className="max-w-[1050px] mx-auto">
          <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
            <div className="relative mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center">
                The Autistic & ADHD Perspective
              </h1>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
                <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[280px] md:w-96 transform -rotate-1 blur-[0.5px]"></div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 md:p-5 bg-white border border-gray-200 rounded-lg animate-pulse"
                >
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative">
        <div className="max-w-[1050px] mx-auto">
          <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
            <div className="relative mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center">
                The Autistic & ADHD Perspective
              </h1>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
                <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[280px] md:w-96 transform -rotate-1 blur-[0.5px]"></div>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">
                Error loading blog posts: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#fcc029] text-white rounded-lg hover:bg-[#fcc029]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="max-w-[1050px] mx-auto">
        <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
          {/* Blog Title */}
          <div className="relative mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center">
              The Autistic & ADHD Perspective
            </h1>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
              <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[280px] md:w-96 transform -rotate-1 blur-[0.5px]"></div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-4 md:space-y-6">
            {blogPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No blog posts available yet.</p>
              </div>
            ) : (
              <>
                {/* Debug info */}
                <div className="text-sm text-gray-500 mb-4">
                  Found {blogPosts.length} blog post(s)
                </div>

                {
                  blogPosts
                    .map((post) => {
                      // Safety check to ensure post has the expected structure
                      if (!post || !post) {
                        console.warn("⚠️ Invalid post structure:", post);
                        return null;
                      }

                      console.log("🎯 Rendering post:", {
                        id: post.id,
                        title: post.blogPostTitle,
                        description: post.blogPostDescription,
                      });

                      return (
                        <Link
                          key={post.id}
                          href={`/blog/${post.id}`}
                          className="block group"
                        >
                          <article className="p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300">
                            <div className="space-y-2">
                              <h2 className="font-display text-xl font-medium text-gray-900 group-hover:text-[#fcc029] transition-colors">
                                {post.blogPostTitle || "Untitled Post"}
                              </h2>
                              <p className="text-gray-600">
                                {post.blogPostDescription ||
                                  "No description available"}
                              </p>
                            </div>
                          </article>
                        </Link>
                      );
                    })
                    .filter(Boolean) // Remove any null entries
                }
              </>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter - Desktop */}
      <div className="hidden lg:block fixed top-[100px] right-8 w-[300px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-6">
            <p className="text-base font-medium text-gray-900 mb-3">
              Want more insights, faster, straight to your inbox?
            </p>
            <NewsletterForm />
          </div>
        </motion.div>
      </div>

      {/* Newsletter - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-4"
        >
          <p className="text-base font-medium text-gray-900 mb-3">
            Want more insights, faster, straight to your inbox?
          </p>
          <NewsletterForm />
        </motion.div>
      </div>
    </div>
  );
}
