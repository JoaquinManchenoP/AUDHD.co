import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import BioSection from "@/components/BioSection";
import { Suspense } from "react";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

interface MainGuide {
  id: number;
  documentId: string;
  guideTitle: string;
  guideDescription: string;
  guideCardDescription?: string;
  guideImage?: any;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Function to fetch content from Strapi collections
async function fetchMainGuides(): Promise<MainGuide[]> {
  try {
    console.log("🔄 Fetching content from Strapi collections...");

    // Prefer the dedicated MainPageGuides collection (try likely REST slugs)
    const collections = [
      "mainPageGuides", // exact name provided
      "main-page-guides", // Strapi auto REST slug (kebab-case)
      "MainPageGuides", // fallback variant
    ];
    let guides: any[] = [];
    let usedCollection = "";

    for (const collection of collections) {
      try {
        const response = await fetch(
          `${STRAPI_URL}/api/${collection}?populate=*`,
          { next: { revalidate: 60 } }
        );

        if (response.ok) {
          const rawData = await response.json();

          // Normalize Strapi v4 response: items may be in attributes
          const items = rawData.data || [];
          guides = items.map((item: any) =>
            item?.attributes ? { id: item.id, ...item.attributes } : item
          );
          usedCollection = collection;
          console.log(
            `✅ Successfully fetched from ${collection}:`,
            guides.length,
            "items"
          );
          break;
        } else if (response.status === 404) {
          // Silently skip 404s to avoid console spam
          continue;
        } else {
          console.log(
            `❌ Collection ${collection} not accessible (${response.status})`
          );
        }
      } catch (error) {
        console.log(`❌ Error fetching ${collection}:`, error);
      }
    }

    if (guides.length === 0) {
      console.log("⚠️ No content found in any collection");
      return [];
    }

    return guides;
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    return [];
  }
}

// Loading component for guides
function GuidesLoading() {
  return (
    <div className="space-y-4">
      <p className="font-display text-4xl font-bold text-gray-900">
        Popular guides
      </p>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 md:p-5 bg-white border border-gray-200 rounded-lg animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-6 ml-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to safely get guide data regardless of structure
function getGuideData(guide: any) {
  // Try to find title field dynamically
  const titleField = Object.keys(guide).find(
    (key) =>
      key.toLowerCase().includes("title") ||
      key.toLowerCase().includes("name") ||
      key.toLowerCase().includes("heading")
  );

  // Try to find description field dynamically
  const descriptionField =
    Object.keys(guide).find((key) => key === "guideCardDescription") ||
    Object.keys(guide).find(
      (key) =>
        key.toLowerCase().includes("carddescription") ||
        key.toLowerCase().includes("description") ||
        key.toLowerCase().includes("excerpt") ||
        key.toLowerCase().includes("summary") ||
        key.toLowerCase().includes("content")
    );

  return {
    title: titleField ? guide[titleField] : "Untitled Content",
    description: descriptionField
      ? guide[descriptionField]
      : "No description available",
  };
}

// Main guides component - now displays the fetched guides
async function MainGuides() {
  const guides = await fetchMainGuides();

  if (guides.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-gray-900">
          Popular guides
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No guides available yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Add some entries to the xone collection in Strapi to see data here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-gray-900">
        Popular guides
      </h2>
      <div className="space-y-3">
        {guides.map((guide) => {
          // Add safety checks and debugging
          console.log("🎯 Rendering blog post:", guide);
          console.log("   - Blog post object:", guide);
          console.log("   - Guide title:", guide.guideTitle);
          console.log(
            "   - Guide card description:",
            guide.guideCardDescription
          );
          console.log("   - Type of blog post:", typeof guide);
          console.log("   - Blog post keys:", Object.keys(guide));

          // Use helper function to get data safely
          const guideData = getGuideData(guide);

          return (
            <div
              key={guide.id}
              className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                    {guide.guideTitle || guideData.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {guide.guideCardDescription || guideData.description}
                  </p>
                </div>
                <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// On-load server-side check for adhdGuide collection
async function checkAdhdGuideAccess() {
  const candidates = ["adhd-guides", "adhdGuide", "adhdGuides"]; // try common slugs
  for (const slug of candidates) {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/${slug}?pagination[pageSize]=1&pagination[withCount]=true`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const data = await res.json();
        const count = data?.meta?.pagination?.total ?? (Array.isArray(data?.data) ? data.data.length : 0);
        console.log(`✅ adhdGuide access OK via '${slug}'. Total items: ${count}`);
        return { ok: true, slug, count } as const;
      }
      if (res.status === 404) continue;
      console.log(`ℹ️ '${slug}' responded with status ${res.status}`);
    } catch (err) {
      console.log(`❌ Error probing '${slug}':`, err);
    }
  }
  console.log("⚠️ adhdGuide collection not found (tried: adhd-guides, adhdGuide, adhdGuides)");
  return { ok: false } as const;
}

export default async function Home() {
  // Server-side page-load check
  await checkAdhdGuideAccess();
  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:gap-24">
          {/* Main Content */}
          <div className="flex-1 max-w-[520px]">
            <div className="space-y-8 md:space-y-16">
              {/* Main Content Section */}
              <div>
                <h1 className="font-display text-[32px] leading-tight md:text-4xl lg:text-5xl font-bold text-gray-900">
                  The Autism & ADHD Perspective
                  <span className="text-primary block mt-1"></span>
                </h1>
                <div className="mt-4 md:mt-6">
                  <p className="text-base md:text-lg text-gray-700">
                    A weekly letter with practical frameworks, tools, and
                    strategies for ADHD and Autism. It’s not theory. It’s what
                    I’ve learned from my experiences, experiments, and mistakes
                    I've madealong the way.
                  </p>
                </div>

                <div className="mt-6 md:mt-8">
                  <p className="mb-2 text-lg font-bold">
                    {" "}
                    Join here it's free:
                  </p>
                  <NewsletterForm />
                </div>
              </div>

              {/* Bio Section on Mobile */}
              <div className="lg:hidden">
                <BioSection />
              </div>

              {/* Popular Guides - Now Dynamic from Strapi */}
              <Suspense fallback={<GuidesLoading />}>
                <MainGuides />
              </Suspense>

              {/* Enhanced Newsletter Section */}
              <div className="mt-12 pt-12 border-t border-gray-100">
                <div className="md:text-center space-y-6">
                  {/* <h2 className="font-display text-[32px] leading-tight md:text-4xl font-bold text-gray-900">
                    Join 5,000+ People Getting
                    <span className="block mt-1">
                      Weekly Neurodivergent Insights
                    </span>
                  </h2> */}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section on Desktop */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <BioSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
