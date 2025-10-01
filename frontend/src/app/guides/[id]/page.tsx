import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsletterForm from "@/components/forms/NewsletterForm";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

const SITE_URL = "https://autisticadhd.co";

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

// Helper: resolve Strapi media url from various shapes
function resolveMediaUrl(value: any): string {
  // Strapi media can be: single object, array of objects, or { data: {...} }
  const node = Array.isArray(value)
    ? value[0]
    : value?.data
    ? value.data?.attributes || value.data
    : value;

  const candidate = node?.url || "";
  if (!candidate) return "";
  return candidate.startsWith("http")
    ? candidate
    : `${STRAPI_URL}${candidate.startsWith("/") ? "" : "/"}${candidate}`;
}

// Generate metadata for each guide page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const guide = await fetchGuide(id);

  if (!guide) {
    return {
      title: "Guide Not Found | AuDHD.co",
      description: "This guide could not be found.",
    };
  }

  // Extract plain text from possibly-changed field types
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
      if (typeof value.text === "string") return value.text;
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const title = extractText(guide.guideTitle) || "Untitled Guide";
  const description =
    extractText(guide.guideCardDescription) ||
    extractText(guide.guideFullDescription) ||
    "A guide to doing life with ADHD and Autism.";

  // Resolve the guide image (or fallback to main site OG image)
  const imageUrl =
    resolveMediaUrl(guide?.Image) ||
    resolveMediaUrl(guide?.guideImage) ||
    resolveMediaUrl(guide?.image) ||
    resolveMediaUrl(guide?.blogPostImage) ||
    "";

  // Use guide-specific OG image or fallback to main site image
  const ogImage = imageUrl || `${SITE_URL}/og-image.png`;

  return {
    title: `${title} | AuDHD.co`,
    description,
    openGraph: {
      title: `${title} | AuDHD.co`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
      siteName: "AuDHD.co",
      url: `${SITE_URL}/guides/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AuDHD.co`,
      description,
      images: [ogImage],
      creator: "@autisticadhdco",
      site: "@autisticadhdco",
    },
  };
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
    resolveMediaUrl(guide?.Image) ||
    resolveMediaUrl(guide?.guideImage) ||
    resolveMediaUrl(guide?.image) ||
    resolveMediaUrl(guide?.blogPostImage) ||
    "";

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6 sm:py-10 md:py-16">
      {/* Hero section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
        {/* Left: Cover/Image */}
        <div className="flex justify-center pt-2">
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full max-w-[600px] mx-auto">
            {imageUrl ? (
              <div className="w-full" style={{ aspectRatio: "1200/670" }}>
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={670}
                />
              </div>
            ) : (
              <div
                className="w-full bg-gray-100 animate-pulse"
                style={{ aspectRatio: "1200/670" }}
              />
            )}
          </div>
        </div>

        {/* Right: Title, subtitle, form */}
        <div>
          <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {title}
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-700 text-sm sm:text-base md:text-lg whitespace-pre-wrap">
            {description || ""}
          </p>

          {/* Inline subscribe form (client component) with lead_source override */}
          <div className="mt-4 sm:mt-6">
            <NewsletterForm customFields={{ lead_source: "lead_magnet" }} />
          </div>
        </div>
      </div>

      {/* Body (optional extra content can be added below) */}
    </div>
  );
}
