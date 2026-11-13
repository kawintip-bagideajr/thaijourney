import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profileDoc = await adminDb.collection("users").doc(user.uid).get();
    const profile = profileDoc.data();
    const existingCustomerId = profile?.stripe_customer_id as string | undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      ...(existingCustomerId
        ? { customer: existingCustomerId }
        : { customer_email: user.email ?? undefined }),
      metadata: { uid: user.uid },
      subscription_data: { metadata: { uid: user.uid } },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Failed to create checkout session", detail: msg }, { status: 500 });
  }
}
