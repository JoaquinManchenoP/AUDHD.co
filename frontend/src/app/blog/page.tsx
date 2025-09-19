import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import NewsletterAside from "@/components/NewsletterAside";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
}

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    // Try multiple collections in order of preference
    const collections = ["blog-posts", "main-guides", "mainGuide", "blogPost"];
    let posts: any[] = [];

    for (const collection of collections) {
      try {
        const res = await fetch(`${STRAPI_URL}/api/${collection}?populate=*`, {
          next: { revalidate: 60 },
        });
        if (res.ok) {
          const data = await res.json();
          posts = data.data || [];
          console.log(
            `✅ Successfully fetched from ${collection}:`,
            posts.length,
            "posts"
          );
          break;
        } else if (res.status === 404) {
          // Silently skip 404s to avoid console spam
          continue;
        }
      } catch (error) {
        console.log(`❌ Error fetching ${collection}:`, error);
      }
    }

    if (posts.length === 0) {
      console.log("⚠️ No posts found in any collection");
    }

    return posts;
  } catch (e) {
    console.error("Failed to fetch blog posts:", e);
    return [];
  }
}

export default async function BlogPage() {
  console.log("🚀 Blog page component is rendering...");
  const posts = await fetchPosts();

  return (
    <div className="max-w-[1050px] mx-auto px-4 py-6 sm:py-8 md:py-16">
      {/* Title (match About page style, centered) */}
      <div className="relative mb-8 sm:mb-12 md:mb-16 w-full text-center">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold">
          Blog
        </h1>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
          <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[180px] transform -rotate-1 blur-[0.5px]"></div>
        </div>
      </div>

      <div className="max-w-[480px] sm:max-w-[520px] mx-auto">
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              // Dynamic field detection
              const titleField = Object.keys(post).find(
                (key) =>
                  key.toLowerCase().includes("title") ||
                  key.toLowerCase().includes("name") ||
                  key.toLowerCase().includes("heading")
              );

              const excerptField = Object.keys(post).find(
                (key) =>
                  key.toLowerCase().includes("description") ||
                  key.toLowerCase().includes("excerpt") ||
                  key.toLowerCase().includes("summary") ||
                  key.toLowerCase().includes("content")
              );

              const title = titleField
                ? (post as any)[titleField]
                : "Untitled Post";
              const excerpt = excerptField
                ? (post as any)[excerptField]
                : "No description available";

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="block group p-3 sm:p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-4">
                      <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                        {excerpt}
                      </p>
                    </div>
                    <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Newsletter - Desktop (fixed right) to match About */}
      <div className="hidden lg:block fixed top-[100px] right-8 w-[300px] z-10">
        <NewsletterAside />
      </div>

      {/* Fixed bottom newsletter (mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 z-10">
        <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-4">
          <p className="text-base font-medium text-gray-900 mb-3 text-center">
            Get weekly strategies and lessons on ADHD and Autism straight to
            your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
