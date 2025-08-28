import Link from "next/link";
import { Suspense } from "react";
import BlogPostClient from "./BlogPostClient";

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

// Function to fetch a specific blog post by ID
const fetchBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    console.log("🔄 Fetching blog post with ID:", id);
    
    // Fetch all blog posts and filter by ID (workaround for 404 on direct findOne)
    const response = await fetch(
      "http://localhost:1337/api/blog-posts?populate=*",
      {
        cache: "no-store",
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("📡 All blog posts data:", data);
    
    // Find the blog post with matching ID
    const blogPost = data.data.find((post: any) => post.id.toString() === id);
    
    if (blogPost) {
      console.log("✅ Found blog post:", blogPost);
      return blogPost;
    } else {
      console.log("❌ Blog post not found with ID:", id);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching blog post:", error);
    return null;
  }
};

// Loading component
function BlogPostLoading() {
  return (
    <div className="relative">
      <div className="max-w-[1050px] mx-auto">
        <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
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

// Main page component - server component
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogPost = await fetchBlogPost(id);

  if (!blogPost) {
    return (
      <div className="max-w-[1050px] mx-auto">
        <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Blog post not found</p>
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

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostClient blogPost={blogPost} />
    </Suspense>
  );
}
