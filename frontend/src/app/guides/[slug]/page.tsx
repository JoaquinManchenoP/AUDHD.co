import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsletterForm from "@/components/forms/NewsletterForm";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

const SITE_URL = "https://autisticadhd.co";

const SLUG_FIELDS = ["slug", "uid", "handle", "permalink"];

function normalizeGuide(item: any) {
  if (!item) return null;
  const attrs = item?.attributes;
  const normalized =
    attrs != null
      ? { id: String(item.id), ...attrs }
      : { ...item, id: String(item.id ?? item.slug ?? item.uid ?? "") };

  if (!normalized.slug) {
    for (const field of SLUG_FIELDS) {
      const candidate = normalized[field] || attrs?.[field];
      if (candidate) {
        normalized.slug = String(candidate);
        break;
      }
    }
  }

  if (!normalized.slug && normalized.id) {
    normalized.slug = String(normalized.id);
  }

  return normalized;
}

async function fetchGuide(handle: string) {
  // Try multiple collection names
  const collections = [
    "adhd-guides", // Strapi REST slug for API ID (plural)
    "adhdGuide", // Singular form
    "adhdGuides", // Alternative plural form
    "main-guides", // Fallback
    "blog-posts", // Another fallback
  ];

  const cleanHandle = handle?.toString().trim() ?? "";
  const isNumericId = /^\d+$/.test(cleanHandle);

  for (const collection of collections) {
    // Always attempt slug-style matches first so numeric-looking slugs still work
    if (cleanHandle) {
      for (const field of SLUG_FIELDS) {
        const slugUrl = `${STRAPI_URL}/api/${collection}?filters[${field}][$eq]=${encodeURIComponent(
          cleanHandle
        )}&populate=*`;
        try {
          const res = await fetch(slugUrl, { next: { revalidate: 60 } });
          console.log(
            `[GuidePage] GET ${slugUrl} (slug ${field}) → ${res.status}`
          );
          if (res.ok) {
            const data = await res.json();
            const item = Array.isArray(data?.data) ? data.data[0] : null;
            if (item) {
              const normalized = normalizeGuide(item);
              console.log("[GuidePage] Normalized (slug)", normalized);
              return normalized;
            }
          }
        } catch (e) {
          console.log(
            `[GuidePage] Error slug fetch for ${collection} (${field}):`,
            e
          );
        }
      }
    }

    // Try direct by-id endpoint first
    if (isNumericId) {
      const byIdUrl = `${STRAPI_URL}/api/${collection}/${cleanHandle}?populate=*`;
      try {
        const res = await fetch(byIdUrl, { next: { revalidate: 60 } });
        console.log(`[GuidePage] GET ${byIdUrl} → ${res.status}`);
        if (res.ok) {
          const data = await res.json();
          const item = data?.data;
          if (item) {
            const normalized = normalizeGuide(item);
            console.log("[GuidePage] Normalized (byId)", normalized);
            return normalized;
          }
        }
      } catch (e) {
        console.log(`[GuidePage] Error byId fetch for ${collection}:`, e);
      }
    }

    // Fallback: collection query with id filter (works with find permission)
    const filterUrl = `${STRAPI_URL}/api/${collection}?filters[id][$eq]=${encodeURIComponent(
      cleanHandle
    )}&populate=*`;
    try {
      const res = await fetch(filterUrl, { next: { revalidate: 60 } });
      console.log(`[GuidePage] GET ${filterUrl} → ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        const item = Array.isArray(data?.data) ? data.data[0] : null;
        if (item) {
          const normalized = normalizeGuide(item);
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
  if (!value) return "";

  const normalizeNodes = (input: any): any[] => {
    if (!input) return [];
    if (Array.isArray(input)) return input.flatMap((item) => normalizeNodes(item));
    if (input.data) {
      const data = input.data;
      if (Array.isArray(data)) {
        return data.flatMap((item) => normalizeNodes(item));
      }
      return normalizeNodes(data.attributes || data);
    }
    if (input.attributes) return [input.attributes];
    return [input];
  };

  const pickUrl = (node: any): string => {
    if (!node) return "";
    const formats = node.formats || {};
    return (
      node.url ||
      node.src ||
      formats.large?.url ||
      formats.medium?.url ||
      formats.small?.url ||
      formats.thumbnail?.url ||
      Object.values(formats)[0]?.url ||
      ""
    );
  };

  const nodes = normalizeNodes(value);
  for (const node of nodes) {
    const candidate = pickUrl(node);
    if (candidate) {
      return candidate.startsWith("http")
        ? candidate
        : `${STRAPI_URL}${candidate.startsWith("/") ? "" : "/"}${candidate}`;
    }
  }
  return "";
}

// Generate metadata for each guide page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await fetchGuide(slug);

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
      url: `${SITE_URL}/guides/${guide.slug ?? slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await fetchGuide(slug);
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
            <NewsletterForm
              customFields={{ lead_source: "lead_magnet" }}
              redirectOnSuccess={true}
            />
          </div>
        </div>
      </div>

      {/* Body (optional extra content can be added below) */}
    </div>
  );
}
