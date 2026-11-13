import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const uid = (obj: { metadata?: Stripe.Metadata | null }) => obj.metadata?.uid;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = uid(session);
        if (userId && session.subscription) {
          await adminDb.collection("users").doc(userId).update({
            access_tier: "pro",
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            stripe_subscription_status: "active",
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = uid(sub);
        if (userId) {
          const isActive = sub.status === "active" || sub.status === "trialing";
          await adminDb.collection("users").doc(userId).update({
            access_tier: isActive ? "pro" : "free",
            stripe_subscription_status: sub.status,
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = uid(sub);
        if (userId) {
          await adminDb.collection("users").doc(userId).update({
            access_tier: "free",
            stripe_subscription_status: "cancelled",
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subscriptionId = (invoice as any).subscription as string | null;
        const sub = subscriptionId
          ? await stripe.subscriptions.retrieve(subscriptionId)
          : null;
        const userId = sub ? uid(sub) : null;
        if (userId) {
          await adminDb.collection("users").doc(userId).update({
            stripe_subscription_status: "past_due",
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
