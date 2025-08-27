import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

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

// Function to fetch a single blog post by ID
async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    console.log(`🔄 Fetching blog post with ID: ${id}`);

    // Since the individual route isn't working, fetch all posts and filter
    const response = await fetch(
      `http://localhost:1337/api/blog-posts?populate=*`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📡 All blog posts data:", data);

    // Find the specific blog post by ID
    const blogPost = data.data?.find(
      (post: BlogPost) => post.id.toString() === id
    );

    if (blogPost) {
      console.log("🎯 Found blog post:", blogPost);
      return blogPost;
    } else {
      console.log("❌ Blog post not found with ID:", id);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching blog post:", error);
    return null;
  }
}

// Loading component
function BlogPostLoading() {
  return (
    <div className="max-w-[1050px] mx-auto">
      <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

// Main blog post component
async function BlogPostContent({ id }: { id: string }) {
  const blogPost = await fetchBlogPost(id);

  if (!blogPost) {
    return (
      <div className="max-w-[1050px] mx-auto">
        <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-red-600 mb-4">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="px-4 py-2 bg-[#fcc029] text-white rounded-lg hover:bg-[#fcc029]/90 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to render blog post body content
  const renderBlogPostBody = (body: any[]) => {
    if (!body || !Array.isArray(body)) return null;

    return body.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="max-w-[1050px] mx-auto">
        <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#fcc029] hover:text-[#fcc029]/80 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Blog Post Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              {blogPost.blogPostTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {blogPost.blogPostDescription}
            </p>
            <div className="text-sm text-gray-500">
              Published on {new Date(blogPost.publishedAt).toLocaleDateString()}
            </div>
          </header>

          {/* Blog Post Body */}
          <article className="prose prose-lg max-w-none">
            {renderBlogPostBody(blogPost.blogPostBody)}
          </article>

          {/* Back to Blog Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-[#fcc029] text-white rounded-lg hover:bg-[#fcc029]/90 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent id={id} />
    </Suspense>
  );
}
