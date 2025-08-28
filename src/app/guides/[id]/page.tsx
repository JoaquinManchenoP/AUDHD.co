import Link from "next/link";
import { notFound } from "next/navigation";

interface Guide {
  id: number;
  documentId: string;
  guideTitle: string;
  guideDescription: string;
  guideImage?: any;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Function to fetch a specific guide by ID
async function fetchGuide(id: string): Promise<Guide | null> {
  try {
    console.log("🔄 Fetching guide with ID:", id);

    // Fetch all guides and find the one with matching ID
    const response = await fetch("http://localhost:1337/api/xones?populate=*", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📡 All guides data:", data);

    if (data.data && Array.isArray(data.data)) {
      // Find the guide with the matching ID
      const guide = data.data.find((g: any) => g.id.toString() === id);

      if (guide) {
        console.log("✅ Found guide:", guide);
        return guide;
      } else {
        console.log("❌ Guide not found with ID:", id);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("❌ Error fetching guide:", error);
    return null;
  }
}

// Main guide page component
async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = await fetchGuide(id);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back to Home
          </Link>
        </div>

        {/* Guide content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-12 border-b border-gray-200">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {guide.guideTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {guide.guideDescription}
              </p>
            </div>
          </div>

          {/* Guide body */}
          <div className="px-8 py-12">
            <div className="max-w-3xl prose prose-lg">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Guide Content
                </h3>
                <p className="text-blue-800">
                  This guide is currently being developed. More content will be
                  added soon!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related guides section */}
        <div className="mt-12">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Explore More Guides
            </h2>
            <p className="text-gray-600 mb-8">
              Discover more strategies and frameworks for neurodivergent minds
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#fcc029] text-white font-medium rounded-lg hover:bg-[#fcc029]/90 transition-colors"
            >
              View All Guides
              <svg
                className="w-5 h-5 ml-2"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePage;
