import Link from "next/link";

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");

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
          console.log(`✅ Successfully fetched from ${collection}:`, posts.length, "posts");
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
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-6">Blog</h1>
      <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
        ✅ Blog page loaded successfully! Found {posts.length} posts.
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            // Dynamic field detection
            const titleField = Object.keys(post).find(key => 
              key.toLowerCase().includes('title') || 
              key.toLowerCase().includes('name') ||
              key.toLowerCase().includes('heading')
            );
            
            const excerptField = Object.keys(post).find(key => 
              key.toLowerCase().includes('description') || 
              key.toLowerCase().includes('excerpt') ||
              key.toLowerCase().includes('summary') ||
              key.toLowerCase().includes('content')
            );

            const title = titleField ? post[titleField] : "Untitled Post";
            const excerpt = excerptField ? post[excerptField] : "No description available";

            return (
              <Link key={post.id} href={`/blog/${post.id}`} className="block p-4 border rounded-lg hover:shadow">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-gray-600 text-sm">{excerpt}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
