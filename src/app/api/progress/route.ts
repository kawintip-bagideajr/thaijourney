import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { levelFromXP } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { lessonSlug, moduleSlug, xpEarned, mistakes, timeMs, heartSacrifice } = await req.json();
    const userId = user.uid;

    // Get current profile
    const profileDoc = await adminDb.collection("users").doc(userId).get();
    if (!profileDoc.exists) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const profile = profileDoc.data()!;

    // Heart sacrifice: deduct 1 heart (only if user has hearts left)
    const currentHearts = profile.hearts ?? 0;
    if (heartSacrifice && currentHearts <= 0) {
      return NextResponse.json({ error: "No hearts remaining" }, { status: 400 });
    }
    if (heartSacrifice) {
      await adminDb.collection("users").doc(userId).update({
        hearts: Math.max(0, currentHearts - 1),
        updated_at: new Date().toISOString(),
      });
    }

    const newXP = (profile.total_xp ?? 0) + (xpEarned ?? 0);
    const newLevel = levelFromXP(newXP);
    const leveledUp = newLevel > (profile.level ?? 1);

    // Update profile XP & level
    await adminDb.collection("users").doc(userId).update({
      total_xp: newXP,
      level: newLevel,
      updated_at: new Date().toISOString(),
    });

    // Log XP transaction
    await adminDb.collection("xp_transactions").add({
      user_id: userId,
      amount: xpEarned,
      reason: `lesson_${lessonSlug ?? "unknown"}`,
      metadata: { lessonSlug, moduleSlug, mistakes, timeMs },
      created_at: new Date().toISOString(),
    });

    // Update daily activity
    const today = new Date().toISOString().split("T")[0];
    const activityId = `${userId}_${today}`;
    const activityRef = adminDb.collection("daily_activity").doc(activityId);
    const activityDoc = await activityRef.get();

    let newStreak = profile.current_streak ?? 0;

    if (activityDoc.exists) {
      await activityRef.update({
        xp_earned: FieldValue.increment(xpEarned ?? 0),
        lessons_completed: FieldValue.increment(1),
        minutes_studied: FieldValue.increment(Math.round((timeMs ?? 0) / 60000)),
      });
    } else {
      await activityRef.set({
        user_id: userId,
        activity_date: today,
        xp_earned: xpEarned ?? 0,
        lessons_completed: 1,
        minutes_studied: Math.round((timeMs ?? 0) / 60000),
      });

      // Update streak
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const yesterdayDoc = await adminDb.collection("daily_activity").doc(`${userId}_${yesterday}`).get();
      newStreak = yesterdayDoc.exists ? (profile.current_streak ?? 0) + 1 : 1;

      await adminDb.collection("users").doc(userId).update({
        current_streak: newStreak,
        longest_streak: Math.max(profile.longest_streak ?? 0, newStreak),
      });
    }

    // Record lesson progress (bug fix: use FieldValue.increment for attempts)
    if (lessonSlug) {
      const progressId = `${userId}_${lessonSlug}`;
      await adminDb.collection("user_lesson_progress").doc(progressId).set({
        user_id: userId,
        lesson_slug: lessonSlug,
        module_slug: moduleSlug ?? null,
        status: mistakes === 0 ? "mastered" : "completed",
        score: Math.max(0, 100 - (mistakes ?? 0) * 10),
        attempts: FieldValue.increment(1),
        completed_at: new Date().toISOString(),
      }, { merge: true });
    }

    return NextResponse.json({
      xpEarned,
      newXP,
      newLevel,
      leveledUp,
      newStreak,
      newHearts: heartSacrifice ? Math.max(0, currentHearts - 1) : currentHearts,
    });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
