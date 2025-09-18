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

  return (
    <div className="max-w-[1050px] mx-auto">
      <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        {/* Title */}
        <div className="relative mb-12 md:mb-16 w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            {title}
          </h1>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
            <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[220px] transform -rotate-1 blur-[0.5px]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-lg max-w-[650px]">
          <p className="whitespace-pre-wrap">{description}</p>
        </div>
      </div>
    </div>
  );
}
