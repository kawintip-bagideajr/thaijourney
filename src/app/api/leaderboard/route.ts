import { NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // Get weekly activity (activity docs for last 7 days)
    const activitySnap = await adminDb
      .collection("daily_activity")
      .where("activity_date", ">=", oneWeekAgo)
      .get();

    const xpByUser: Record<string, number> = {};
    activitySnap.docs.forEach((doc) => {
      const d = doc.data();
      xpByUser[d.user_id] = (xpByUser[d.user_id] ?? 0) + (d.xp_earned ?? 0);
    });

    const topUserIds = Object.entries(xpByUser)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([id]) => id);

    if (topUserIds.length === 0) return NextResponse.json({ leaders: [] });

    // Fetch profiles in batches of 10 (Firestore `in` limit)
    const profilesMap: Record<string, Record<string, unknown>> = {};
    for (let i = 0; i < topUserIds.length; i += 10) {
      const batch = topUserIds.slice(i, i + 10);
      const snap = await adminDb.collection("users").where("__name__", "in", batch).get();
      snap.docs.forEach((doc) => { profilesMap[doc.id] = doc.data(); });
    }

    const leaders = topUserIds
      .map((id, rank) => {
        const p = profilesMap[id];
        if (!p) return null;
        return {
          rank: rank + 1,
          id,
          username: p.username,
          display_name: p.display_name,
          avatar_url: p.avatar_url,
          level: p.level,
          current_streak: p.current_streak,
          weeklyXP: xpByUser[id],
          isCurrentUser: id === user.uid,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ leaders });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
