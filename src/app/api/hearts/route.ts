import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { calcCurrentHearts, MS_PER_HEART } from "@/lib/utils";

// Save hearts mid-lesson without awarding XP or recording progress
export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    // Losing hearts only: a negative or non-numeric value must never add hearts.
    const heartsLost = typeof body.heartsLost === "number" && Number.isFinite(body.heartsLost)
      ? Math.max(0, Math.floor(body.heartsLost)) : 0;

    const profileDoc = await adminDb.collection("users").doc(user.uid).get();
    if (!profileDoc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const p = profileDoc.data()!;
    const realHearts = calcCurrentHearts(p.hearts ?? 0, p.hearts_updated_at ?? new Date().toISOString());
    const newHearts = Math.max(0, realHearts - (heartsLost ?? 0));

    const elapsed = Date.now() - new Date(p.hearts_updated_at).getTime();
    const partialMs = elapsed % MS_PER_HEART;
    const effectiveBase = new Date(Date.now() - partialMs).toISOString();

    await adminDb.collection("users").doc(user.uid).update({
      hearts: newHearts,
      hearts_updated_at: effectiveBase,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ newHearts });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
