import { notFound } from "next/navigation";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

async function fetchGuide(id: string) {
  // Fetch from adhd-guides and normalize
  const res = await fetch(`${STRAPI_URL}/api/adhd-guides?populate=*`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const items = (data?.data ?? []).map((item: any) =>
    item?.attributes ? { id: item.id, ...item.attributes } : item
  );
  const guide = items.find((g: any) => g.id?.toString() === id);
  return guide ?? null;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = await fetchGuide(id);
  if (!guide) notFound();

  const title = guide.guideTitle || "Untitled Guide";
  const description =
    guide.guideFullDescription || guide.guideCardDescription || "";
  const imageUrl =
    guide?.guideImage?.url || guide?.image?.url || guide?.blogPostImage?.url || "";

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-10 md:py-16">
      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Cover/Image */}
        <div className="flex justify-center md:justify-start">
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full max-w-md">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-[3/4] w-full bg-gray-100 animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: Title, subtitle, form */}
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {title}
            <span className="block bg-[#fcc029]/50 -mx-1 px-1 w-fit mt-2 text-gray-900">
              turn visitors into progress
            </span>
          </h1>

          <p className="mt-6 text-gray-700 text-lg">
            {guide.guideSubtitle || "Practical frameworks and step-by-step systems that actually work."}
          </p>

          {/* Inline subscribe form (reuse global styles) */}
          <div className="mt-6">
            {/* Keep consistent with project style: use NewsletterForm */}
            {/* @ts-expect-error Server Component embedding a client component */}
            {(await import("@/components/forms/NewsletterForm")).default({})}
          </div>

          <p className="mt-2 text-sm text-gray-500">Free for now, cancel anytime.</p>
        </div>
      </div>

      {/* Body */}
      <div className="mt-12 md:mt-16 max-w-3xl">
        <div className="prose prose-lg max-w-none text-gray-800">
          <p className="whitespace-pre-wrap">{description}</p>
        </div>
      </div>
    </div>
  );
}
