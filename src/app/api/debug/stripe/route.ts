import { NextResponse } from "next/server";

export async function GET() {
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
