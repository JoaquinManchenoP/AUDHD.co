"use client";

import { useEffect, useState } from "react";

export default function StrapiConnectivityProbe() {
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const publicUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;

  useEffect(() => {
    const url = publicUrl?.replace(/\/$/, "");
    if (!url) {
      console.warn(
        "[Probe] NEXT_PUBLIC_STRAPI_URL is not set. The frontend may be attempting to reach localhost in production."
      );
      setStatus("fail");
      return;
    }

    const testEndpoint = `${url}/api/xones?pagination[pageSize]=1`;
    console.log("[Probe] Testing Strapi connectivity:", {
      NEXT_PUBLIC_STRAPI_URL: publicUrl,
      testEndpoint,
    });

    fetch(testEndpoint, { mode: "cors" })
      .then(async (res) => {
        const ok = res.ok;
        const ct = res.headers.get("content-type");
        let body: unknown = undefined;
        try {
          body = await res.json();
        } catch {
          /* noop */
        }
        console.log("[Probe] Response from Strapi:", {
          ok,
          status: res.status,
          contentType: ct,
          body,
        });
        setStatus(ok ? "ok" : "fail");
      })
      .catch((err) => {
        console.error("[Probe] Failed to reach Strapi (network/CORS):", err);
        console.warn(
          "[Probe] Common fixes: 1) Set NEXT_PUBLIC_STRAPI_URL on Vercel, 2) Allow your Vercel domain in Strapi CORS (backend/config/middlewares.ts), 3) Ensure Public role has read permissions and entries are published."
        );
        setStatus("fail");
      });
  }, [publicUrl]);

  if (status !== "fail") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm bg-red-50 text-red-700 border border-red-200 rounded-lg shadow p-3 text-sm">
      <strong className="block mb-1">Strapi connectivity issue</strong>
      <div>
        Check console for [Probe] logs. Verify NEXT_PUBLIC_STRAPI_URL and CORS on the backend.
      </div>
    </div>
  );
}
