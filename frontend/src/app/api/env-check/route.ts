import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    server: {
      STRAPI_URL_PRESENT: Boolean(process.env.STRAPI_URL),
    },
    client: {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || null,
    },
  });
}
