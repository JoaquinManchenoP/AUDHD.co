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
  guideImage?: any;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Function to fetch main guides from Strapi
async function fetchMainGuides(): Promise<MainGuide[]> {
  try {
    console.log("🔄 Fetching xone guides from Strapi...");
    const response = await fetch(
      `${STRAPI_URL}/api/xones?populate=*&sort=order:asc`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log("📡 Raw Strapi response:", rawData);

    // Extract the data array from the Strapi response
    const guides = rawData.data || [];
    console.log("📊 Extracted guides array:", guides);
    console.log("🔢 Number of guides found:", guides.length);

    // Log the structure of each guide if they exist
    if (guides.length > 0) {
      guides.forEach((guide: any, index: number) => {
        console.log(`🔍 Guide ${index + 1} structure:`, guide);
        console.log(`   - ID: ${guide.id}`);
        console.log(`   - Title: ${guide.attributes?.title || "No title"}`);
        console.log(
          `   - Description: ${
            guide.attributes?.description || "No description"
          }`
        );
      });
    } else {
      console.log("⚠️ No guides found in the collection");
      console.log(
        "💡 Add some entries to the xone collection in Strapi to see data here"
      );
    }

    // Return the processed guides array
    return guides;
  } catch (error) {
    console.error("❌ Error fetching xone guides:", error);
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
function getGuideData(guide: MainGuide) {
  return {
    title: guide.guideTitle || "Untitled Guide",
    description: guide.guideDescription || "No description available",
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
          console.log("🎯 Rendering guide:", guide);
          console.log("   - Guide object:", guide);
          console.log("   - Guide title:", guide.guideTitle);
          console.log("   - Guide description:", guide.guideDescription);
          console.log("   - Type of guide:", typeof guide);
          console.log("   - Guide keys:", Object.keys(guide));

          // Use helper function to get data safely
          const guideData = getGuideData(guide);

          return (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                    {guideData.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {guideData.description}
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
    </div>
  );
}

export default function Home() {
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
