import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get weekly XP leaders
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const { data: weeklyXP } = await supabase
      .from("daily_activity")
      .select("user_id, xp_earned")
      .gte("activity_date", oneWeekAgo);

    if (!weeklyXP) return NextResponse.json({ leaders: [] });

    const xpByUser = weeklyXP.reduce<Record<string, number>>((acc, row) => {
      acc[row.user_id] = (acc[row.user_id] || 0) + row.xp_earned;
      return acc;
    }, {});

    const topUserIds = Object.entries(xpByUser)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([id]) => id);

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, level, current_streak")
      .in("id", topUserIds);

    const leaders = topUserIds
      .map((id, rank) => {
        const profile = profiles?.find((p) => p.id === id);
        if (!profile) return null;
        return {
          rank: rank + 1,
          ...profile,
          weeklyXP: xpByUser[id],
          isCurrentUser: id === user.id,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ leaders });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
