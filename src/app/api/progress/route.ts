import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { levelFromXP, calcCurrentHearts, MAX_HEARTS, MS_PER_HEART } from "@/lib/utils";
import { getLessonExercises } from "@/data/lessons/index";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { heartSacrifice } = body;
    const lessonSlug: string | undefined = typeof body.lessonSlug === "string" ? body.lessonSlug : undefined;
    const moduleSlug: string | undefined = typeof body.moduleSlug === "string" ? body.moduleSlug : undefined;
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0);
    const mistakes = num(body.mistakes);
    const timeMs = Math.min(num(body.timeMs), 6 * 60 * 60 * 1000);
    const heartsLost = num(body.heartsLost);
    const userId = user.uid;

    // Only real lessons count, and XP can't exceed 10 per exercise (the client awards 10 per correct answer).
    const exerciseCount = lessonSlug && moduleSlug ? getLessonExercises(moduleSlug, lessonSlug).length : 0;
    if (exerciseCount === 0) return NextResponse.json({ error: "Unknown lesson" }, { status: 400 });
    const xpEarned = Math.min(num(body.xpEarned), exerciseCount * 10);

    // Get current profile
    const profileDoc = await adminDb.collection("users").doc(userId).get();
    if (!profileDoc.exists) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const profile = profileDoc.data()!;

    // Calculate real current hearts (apply time-based refill)
    const storedHearts = profile.hearts ?? 0;
    const heartsUpdatedAt = profile.hearts_updated_at ?? new Date().toISOString();
    const realHearts = calcCurrentHearts(storedHearts, heartsUpdatedAt);

    // Heart sacrifice (replay): deduct 1 heart
    if (heartSacrifice && realHearts <= 0) {
      return NextResponse.json({ error: "No hearts remaining" }, { status: 400 });
    }

    // Calculate hearts after this lesson
    const lostCount = heartSacrifice ? 1 : Math.min(heartsLost ?? 0, realHearts);
    const newHearts = Math.max(0, realHearts - lostCount);
    const heartsChanged = newHearts !== realHearts || storedHearts !== realHearts;

    if (heartsChanged) {
      // Compute the effective "hearts_updated_at" so refill timer is preserved correctly
      const elapsed = Date.now() - new Date(heartsUpdatedAt).getTime();
      const partialMs = elapsed % MS_PER_HEART;
      const effectiveBase = new Date(Date.now() - partialMs).toISOString();
      await adminDb.collection("users").doc(userId).update({
        hearts: newHearts,
        hearts_updated_at: effectiveBase,
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
      newHearts,
    });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
