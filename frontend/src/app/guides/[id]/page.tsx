import { notFound } from "next/navigation";
import NewsletterForm from "@/components/forms/NewsletterForm";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

async function fetchGuide(id: string) {
  // Try multiple collection names
  const collections = [
    "adhd-guides", // Strapi REST slug for API ID (plural)
    "adhdGuide", // Singular form
    "adhdGuides", // Alternative plural form
    "main-guides", // Fallback
    "blog-posts", // Another fallback
  ];

  for (const collection of collections) {
    // Try direct by-id endpoint first
    const byIdUrl = `${STRAPI_URL}/api/${collection}/${id}?populate=*`;
    try {
      const res = await fetch(byIdUrl, { next: { revalidate: 60 } });
      console.log(`[GuidePage] GET ${byIdUrl} → ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log(
          "[GuidePage] Raw response (byId)",
          JSON.stringify(data, null, 2)
        );
        const item = data?.data;
        if (item) {
          const normalized = item?.attributes
            ? { id: item.id, ...item.attributes }
            : item;
          console.log("[GuidePage] Normalized (byId)", normalized);
          return normalized;
        }
      }
    } catch (e) {
      console.log(`[GuidePage] Error byId fetch for ${collection}:`, e);
    }

    // Fallback: collection query with id filter (works with find permission)
    const filterUrl = `${STRAPI_URL}/api/${collection}?filters[id][$eq]=${encodeURIComponent(
      id
    )}&populate=*`;
    try {
      const res = await fetch(filterUrl, { next: { revalidate: 60 } });
      console.log(`[GuidePage] GET ${filterUrl} → ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log(
          "[GuidePage] Raw response (filter)",
          JSON.stringify(data, null, 2)
        );
        const item = Array.isArray(data?.data) ? data.data[0] : null;
        if (item) {
          const normalized = item?.attributes
            ? { id: item.id, ...item.attributes }
            : item;
          console.log("[GuidePage] Normalized (filter)", normalized);
          return normalized;
        }
      }
    } catch (e) {
      console.log(`[GuidePage] Error filter fetch for ${collection}:`, e);
    }
  }

  return null;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = await fetchGuide(id);
  if (!guide) notFound();

  // Safely extract plain text from possibly-changed field types
  const extractText = (value: any): string => {
    if (value == null) return "";
    if (typeof value === "string") return value;
    // Strapi rich text (array of nodes)
    if (Array.isArray(value)) {
      try {
        return value
          .map((node) => {
            if (!node) return "";
            if (typeof node === "string") return node;
            const children = (node.children || []) as any[];
            return children.map((c) => c?.text ?? "").join("");
          })
          .join("\n\n");
      } catch {
        return JSON.stringify(value);
      }
    }
    // Attempt to stringify objects safely
    try {
      // Some editors store text at value.text
      if (typeof value.text === "string") return value.text;
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  console.log("[GuidePage] Guide payload keys:", Object.keys(guide));
  console.log("[GuidePage] Guide object:", guide);
  const title = extractText(guide.guideTitle) || "Untitled Guide";
  const description =
    extractText(guide.guideFullDescription) ||
    extractText(guide.guideCardDescription) ||
    "";
  const imageUrl =
    guide?.guideImage?.url ||
    guide?.image?.url ||
    guide?.blogPostImage?.url ||
    "";

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6 sm:py-10 md:py-16">
      {/* Hero section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
        {/* Left: Cover/Image */}
        <div className="flex justify-center pt-2">
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full max-w-[280px] sm:max-w-[320px] md:max-w-[344px] mx-auto">
            {imageUrl ? (
              <div className="aspect-square w-full">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square w-full bg-gray-100 animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: Title, subtitle, form */}
        <div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {title}
            <span className="block bg-[#fcc029]/50 -mx-1 px-1 w-fit mt-2 text-gray-900">
              turn visitors into progress
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-700 text-sm sm:text-base md:text-lg whitespace-pre-wrap">
            {description || ""}
          </p>

          {/* Inline subscribe form (client component) */}
          <div className="mt-4 sm:mt-6">
            <NewsletterForm />
          </div>

          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Free for now, cancel anytime.
          </p>
        </div>
      </div>

      {/* Body (optional extra content can be added below) */}
    </div>
  );
}
