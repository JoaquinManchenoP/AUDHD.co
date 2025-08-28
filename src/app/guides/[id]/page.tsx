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
              {/* Main guide content */}
              <div className="mb-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Text content */}
                  <div className="flex-1">
                    <div className="prose prose-lg text-gray-700 leading-relaxed">
                      <p className="mb-4">
                        This comprehensive guide provides detailed strategies
                        and frameworks designed specifically for neurodivergent
                        minds. You'll discover practical approaches that work
                        with your unique brain wiring, not against it.
                      </p>
                      <p className="mb-4">
                        Each section includes step-by-step instructions,
                        real-world examples, and actionable strategies you can
                        implement immediately. Whether you're looking to improve
                        focus, manage time better, or navigate social situations
                        more effectively, this guide has you covered.
                      </p>
                      <p>
                        The content is based on evidence-based research and real
                        experiences from the neurodivergent community, ensuring
                        that every strategy has been tested and proven
                        effective.
                      </p>
                    </div>
                  </div>

                  {/* Image section */}
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      {guide.guideImage ? (
                        <div className="relative">
                          <img
                            src={guide.guideImage.url}
                            alt={guide.guideTitle}
                            className="w-full h-64 object-cover transition-opacity duration-300"
                            onLoad={(e) => {
                              e.currentTarget.style.opacity = "1";
                              // Hide loading overlay when image loads
                              const overlay = e.currentTarget
                                .nextElementSibling as HTMLElement;
                              if (overlay) {
                                overlay.style.opacity = "0";
                                setTimeout(() => {
                                  overlay.style.display = "none";
                                }, 300);
                              }
                            }}
                            style={{ opacity: 0 }}
                          />
                          {/* Loading overlay - always visible initially */}
                          <div
                            className="absolute inset-0 bg-gray-100 flex items-center justify-center transition-opacity duration-300"
                            style={{ opacity: 1 }}
                          >
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fcc029] mx-auto mb-2"></div>
                              <p className="text-sm text-gray-600">
                                Loading image...
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            {/* Simple loading dots */}
                            <div className="flex space-x-2">
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email signup section */}
              <div className="bg-gradient-to-r from-[#fcc029]/10 to-[#fcc029]/5 border border-[#fcc029]/20 rounded-xl p-6">
                <div className="text-center mb-4">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    Get Full Access to This Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter your email to unlock the complete guide content
                  </p>
                </div>

                <form className="max-w-sm mx-auto">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcc029] focus:border-[#fcc029] transition-colors placeholder-gray-400 text-sm"
                      placeholder="your@email.com"
                    />
                    <button
                      type="submit"
                      className="bg-[#fcc029] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#fcc029]/90 active:scale-98 transition-all duration-300 text-sm whitespace-nowrap"
                    >
                      Get Access
                    </button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-3">
                  We respect your privacy. Unsubscribe at any time.
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
