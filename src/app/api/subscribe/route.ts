import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      return NextResponse.json(
        { error: "Server is not configured with Beehiiv credentials" },
        { status: 500 }
      );
    }

    if (!publicationId.startsWith("pub_")) {
      return NextResponse.json(
        {
          error:
            "BEEHIIV_PUBLICATION_ID must be the public id (format: pub_...), not a UUID.",
        },
        { status: 500 }
      );
    }

    // Derive client IP and attribution fields
    const xForwardedFor = req.headers.get("x-forwarded-for") || "";
    const firstForwardedIp = xForwardedFor.split(",")[0]?.trim();
    const xRealIp = req.headers.get("x-real-ip") || "";
    const clientIp = firstForwardedIp || xRealIp || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const referer = req.headers.get("referer") || req.headers.get("referrer") || undefined;

    const url = req.nextUrl;
    const utm_source = url.searchParams.get("utm_source") || undefined;
    const utm_medium = url.searchParams.get("utm_medium") || undefined;
    const utm_campaign = url.searchParams.get("utm_campaign") || undefined;
    const utm_term = url.searchParams.get("utm_term") || undefined;
    const utm_content = url.searchParams.get("utm_content") || undefined;

    const payload: Record<string, unknown> = {
      email,
      reactivate_existing: true,
      send_welcome_email: true,
    };

    if (clientIp) payload.ip_address = clientIp;
    if (userAgent) payload.user_agent = userAgent;
    if (referer) payload.referring_site = referer;
    if (utm_source) payload.utm_source = utm_source;
    if (utm_medium) payload.utm_medium = utm_medium;
    if (utm_campaign) payload.utm_campaign = utm_campaign;
    if (utm_term) payload.utm_term = utm_term;
    if (utm_content) payload.utm_content = utm_content;

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorBody = await safeJson(response);
      return NextResponse.json(
        { error: "Failed to subscribe", details: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}
