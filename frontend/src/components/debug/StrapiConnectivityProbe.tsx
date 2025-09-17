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

    // Try multiple collections to test connectivity
    const collections = ["main-guides", "blog-posts", "mainGuide", "blogPost"];
    let testEndpoint = "";
    let foundWorkingEndpoint = false;

    const testConnectivity = async () => {
      for (const collection of collections) {
        testEndpoint = `${url}/api/${collection}?pagination[pageSize]=1`;
        console.log("[Probe] Testing Strapi connectivity:", {
          NEXT_PUBLIC_STRAPI_URL: publicUrl,
          testEndpoint,
        });

        try {
          const res = await fetch(testEndpoint, { mode: "cors" });
          const ok = res.ok;
          const ct = res.headers.get("content-type");
          let body: unknown = undefined;
          try {
            body = await res.json();
          } catch {
            /* noop */
          }
          
          if (ok) {
            console.log("[Probe] Response from Strapi:", {
              ok,
              status: res.status,
              contentType: ct,
              body,
              collection,
            });
            foundWorkingEndpoint = true;
            setStatus("ok");
            return;
          } else if (res.status === 404) {
            // Silently skip 404s to avoid console spam
            continue;
          } else {
            console.log("[Probe] Response from Strapi:", {
              ok,
              status: res.status,
              contentType: ct,
              body,
              collection,
            });
          }
        } catch (err) {
          console.log(`[Probe] Collection ${collection} failed:`, err);
        }
      }
      
      if (!foundWorkingEndpoint) {
        console.error("[Probe] Failed to reach any Strapi collection (network/CORS):");
        console.warn(
          "[Probe] Common fixes: 1) Set NEXT_PUBLIC_STRAPI_URL on Vercel, 2) Allow your Vercel domain in Strapi CORS (backend/config/middlewares.ts), 3) Ensure Public role has read permissions and entries are published."
        );
        setStatus("fail");
      }
    };

    testConnectivity();
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
