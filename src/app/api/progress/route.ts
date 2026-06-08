import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { levelFromXP } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const admin = await createAdminClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { lessonSlug, moduleSlug, xpEarned, mistakes, timeMs } = await req.json();

    // Get current profile
    const { data: profile } = await admin
      .from("profiles")
      .select("total_xp, level, current_streak, longest_streak, daily_goal_minutes")
      .eq("id", user.id)
      .single();

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const newXP = profile.total_xp + (xpEarned ?? 0);
    const newLevel = levelFromXP(newXP);
    const leveledUp = newLevel > profile.level;

    // Update profile XP & level
    await admin.from("profiles").update({ total_xp: newXP, level: newLevel }).eq("id", user.id);

    // Log XP transaction
    await admin.from("xp_transactions").insert({
      user_id: user.id,
      amount: xpEarned,
      reason: `lesson_${lessonSlug ?? "unknown"}`,
      metadata: { lessonSlug, moduleSlug, mistakes, timeMs },
    });

    // Update daily activity
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await admin
      .from("daily_activity")
      .select("*")
      .eq("user_id", user.id)
      .eq("activity_date", today)
      .single();

    let newStreak = profile.current_streak;

    if (existing) {
      await admin.from("daily_activity").update({
        xp_earned: existing.xp_earned + xpEarned,
        lessons_completed: existing.lessons_completed + 1,
        minutes_studied: existing.minutes_studied + Math.round((timeMs ?? 0) / 60000),
      }).eq("user_id", user.id).eq("activity_date", today);
    } else {
      await admin.from("daily_activity").insert({
        user_id: user.id,
        activity_date: today,
        xp_earned: xpEarned,
        lessons_completed: 1,
        minutes_studied: Math.round((timeMs ?? 0) / 60000),
      });

      // Update streak
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const { data: yesterdayActivity } = await admin
        .from("daily_activity")
        .select("activity_date")
        .eq("user_id", user.id)
        .eq("activity_date", yesterday)
        .single();

      newStreak = yesterdayActivity ? profile.current_streak + 1 : 1;
      await admin.from("profiles").update({
        current_streak: newStreak,
        longest_streak: Math.max(profile.longest_streak, newStreak),
      }).eq("id", user.id);
    }

    // Try to record lesson progress by slug (optional — skip if lesson not in DB)
    try {
      const { data: lessonRow } = await admin
        .from("lessons")
        .select("id")
        .eq("slug", lessonSlug)
        .single();

      if (lessonRow) {
        await admin.from("user_lesson_progress").upsert({
          user_id: user.id,
          lesson_id: lessonRow.id,
          status: mistakes === 0 ? "mastered" : "completed",
          score: Math.max(0, 100 - mistakes * 10),
          attempts: 1,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,lesson_id" });
      }
    } catch {
      // Lesson not in DB yet — skip, XP still saved
    }

    return NextResponse.json({ xpEarned, newXP, newLevel, leveledUp, newStreak });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
