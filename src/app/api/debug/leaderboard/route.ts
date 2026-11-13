import { NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

// Temporary debug endpoint — shows raw Firestore state for leaderboard diagnosis
export async function GET() {
  // Diagnostics only: never expose config or other users' data in production.
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // Count + sample users
    const usersSnap = await adminDb.collection("users").orderBy("total_xp", "desc").limit(10).get();
    const users = usersSnap.docs.map((d) => {
      const p = d.data();
      return { id: d.id, username: p.username, total_xp: p.total_xp ?? "MISSING", level: p.level };
    });

    // Count + sample daily_activity this week
    const activitySnap = await adminDb
      .collection("daily_activity")
      .where("activity_date", ">=", oneWeekAgo)
      .limit(20)
      .get();
    const activity = activitySnap.docs.map((d) => {
      const a = d.data();
      return { id: d.id, user_id: a.user_id, activity_date: a.activity_date, xp_earned: a.xp_earned };
    });

    // Count all daily_activity docs
    const allActivitySnap = await adminDb.collection("daily_activity").limit(5).get();
    const sampleAllActivity = allActivitySnap.docs.map((d) => d.data());

    return NextResponse.json({
      usersCount: usersSnap.size,
      topUsers: users,
      weeklyActivityCount: activitySnap.size,
      weeklyActivity: activity,
      oneWeekAgo,
      sampleAllActivity,
    });
  } catch (error) {
    console.error("Debug leaderboard error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
