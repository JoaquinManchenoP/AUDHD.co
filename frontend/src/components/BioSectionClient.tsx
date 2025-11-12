"use client";

import dynamic from "next/dynamic";

const BioSection = dynamic(() => import("./BioSection"), {
  ssr: false,
  loading: () => (
    <div className="w-80 shrink-0 animate-pulse space-y-4">
      <div className="rounded-lg bg-gray-200 h-32" />
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  ),
});

export default function BioSectionClient() {
  return <BioSection />;
}
