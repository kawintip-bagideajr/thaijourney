import { NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const doc = await adminDb.collection("users").doc(user.uid).get();
    if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = doc.data()!;
    return NextResponse.json({
      access_tier: data.access_tier ?? "free",
      stripe_subscription_status: data.stripe_subscription_status ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
