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
    const customerId = profileDoc.data()?.stripe_customer_id as string | undefined;
    if (!customerId) return NextResponse.json({ error: "No subscription found" }, { status: 400 });

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
  }
}
