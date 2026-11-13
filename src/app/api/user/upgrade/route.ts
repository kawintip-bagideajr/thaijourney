import { NextResponse } from "next/server";

/**
 * Retired. This used to grant Pro to any signed-in user without payment.
 * Pro is now set only by the Stripe webhook (/api/stripe/webhook).
 */
export async function POST() {
  return NextResponse.json({ error: "Use /subscribe to upgrade" }, { status: 410 });
}
