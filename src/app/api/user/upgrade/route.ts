import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await adminDb.collection("profiles").doc(user.uid).update({
      access_tier: "pro",
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upgrade error:", error);
    return NextResponse.json({ error: "Failed to upgrade" }, { status: 500 });
  }
}
