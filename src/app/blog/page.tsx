"use client";

import { motion } from "framer-motion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Greatest Adventure Ever",
    description: "The real startup lessons you only learn the hard way",
    category: "Startup",
    slug: "greatest-adventure",
  },
  {
    title: "How to build a $10M ARR B2B Startup",
    description: "Why traditional SaaS failed where AI Agents will succeed",
    category: "AI",
    slug: "b2b-startup-guide",
  },
  {
    title: "Vibe Revenue",
    description: "How to spot hype vs. a business with staying power",
    category: "Growth",
    slug: "vibe-revenue",
  },
  {
    title: "This is on my mind",
    description: "AI taking jobs, startup strategies, and new ways of thinking",
    category: "AI",
    slug: "on-my-mind",
  },
  {
    title: "The Mini Guide to Vertical AI",
    description: "Learn to spot opportunities",
    category: "AI",
    slug: "vertical-ai-guide",
  },
];

export default function BlogPage() {
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
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300">
                  <div className="space-y-2">
                    <h2 className="font-display text-xl font-medium text-gray-900 group-hover:text-[#fcc029] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.description}</p>
                  </div>
                </article>
              </Link>
            ))}
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
