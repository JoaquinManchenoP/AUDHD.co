"use client";

import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { motion } from "framer-motion";

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

// Function to render blog post body content
const renderBlogPostBody = (body: any): React.ReactNode => {
  if (!body || !Array.isArray(body)) {
    return <p className="text-gray-500">No content available.</p>;
  }

  return body.map((block: any, index: number) => {
    if (block.type === "paragraph" && block.children) {
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

interface BlogPostClientProps {
  blogPost: BlogPost;
}

export default function BlogPostClient({ blogPost }: BlogPostClientProps) {
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter - Desktop */}
      <div className="hidden lg:block fixed top-[100px] right-4 w-[300px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-6">
            <p className="text-base font-medium text-gray-900 mb-3">
              For more strategies and lessons on ADHD and Autism, subscribe to
              my weekly newsletter.
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
