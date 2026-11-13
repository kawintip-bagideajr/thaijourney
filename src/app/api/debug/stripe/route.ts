import { NextResponse } from "next/server";

export async function GET() {
  // Diagnostics only: never expose config or other users' data in production.
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  return NextResponse.json({
    keyExists: !!key,
    keyLength: key.length,
    keyStart: key.slice(0, 12),
    keyEnd: key.slice(-4),
    priceId: process.env.STRIPE_PRICE_ID ?? "(not set)",
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "(not set)",
  });
}
