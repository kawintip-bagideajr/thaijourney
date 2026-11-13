import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { levelFromXP } from "@/lib/utils";
import {
  BOSS_BY_ID, BOSS_RULES, bossRequiredStages, isBossUnlocked, simulateBattle, type BattleAnswer,
} from "@/data/bosses";
import { rollLoot, LOOT_RULES } from "@/data/cosmetics";

/**
 * POST /api/boss — submit a finished guardian battle.
 * Body: { bossId, answers: [{ qid, choice }], timeMs }
 * The server replays the answers itself; the client never decides win/XP.
 */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const boss = body && typeof body.bossId === "string" ? BOSS_BY_ID[body.bossId] : undefined;
    if (!boss) return NextResponse.json({ error: "Unknown boss" }, { status: 400 });

    const raw: unknown[] = Array.isArray(body.answers) ? body.answers.slice(0, BOSS_RULES.maxAnswers) : [];
    const answers: BattleAnswer[] = raw
      .filter((a): a is { qid: string; choice: unknown } =>
        !!a && typeof a === "object" && typeof (a as { qid?: unknown }).qid === "string")
      .map((a) => ({
        qid: a.qid,
        choice: Number.isInteger(a.choice) && (a.choice as number) >= 0 && (a.choice as number) <= 3
          ? (a.choice as number) : null,
      }));
    const timeMs = Math.max(0, Math.min(Number(body.timeMs) || 0, 60 * 60 * 1000));

    const userRef = adminDb.collection("users").doc(user.uid);

    const outcome = await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists) return { status: 404 as const };
      const profile = snap.data()!;
      const totalXP: number = profile.total_xp ?? 0;
      // The region's stages before this guardian must all be cleared (progress docs are `${uid}_${stageId}`).
      const required = bossRequiredStages(boss);
      const progressSnaps = required.length
        ? await tx.getAll(...required.map((id) => adminDb.collection("user_lesson_progress").doc(`${user.uid}_${id}`)))
        : [];
      const completed = new Set(progressSnaps.filter((s) => s.exists).map((s) => s.data()!.lesson_slug as string));
      if (!isBossUnlocked(boss, totalXP, completed, profile.passport_stamps)) return { status: 403 as const };

      const result = simulateBattle(boss, answers);
      const stamps: Record<string, { won_at: string; wins: number; best_hearts: number; flawless: boolean }> =
        profile.passport_stamps ?? {};
      const prev = stamps[boss.id];
      const firstWin = result.win && !prev;
      const flawless = result.win && result.heartsLeft === BOSS_RULES.playerHearts;
      const firstFlawless = flawless && !prev?.flawless;

      let xpEarned: number = BOSS_RULES.xpLoss;
      if (result.win) {
        xpEarned = firstWin ? BOSS_RULES.xpFirstWin : BOSS_RULES.xpRepeatWin;
        if (firstFlawless) xpEarned += BOSS_RULES.xpFlawlessBonus;
      }

      const now = new Date().toISOString();
      const update: Record<string, unknown> = { updated_at: now };
      let stamp = prev ?? null;
      if (result.win) {
        stamp = {
          won_at: prev?.won_at ?? now,
          wins: (prev?.wins ?? 0) + 1,
          best_hearts: Math.max(prev?.best_hearts ?? 0, result.heartsLeft),
          flawless: !!prev?.flawless || flawless,
        };
        update[`passport_stamps.${boss.id}`] = stamp;
      }
      // Loot: the first win always drops an item; repeat wins drop with a chance; flawless rolls once more.
      const loot: string[] = [];
      if (result.win) {
        const owned = new Set(Object.keys(profile.cosmetics ?? {}));
        const rolls = (firstWin || Math.random() < LOOT_RULES.repeatWinChance ? 1 : 0)
          + (flawless && Math.random() < LOOT_RULES.flawlessBonusChance ? 1 : 0);
        for (let i = 0; i < rolls; i++) {
          const item = rollLoot(boss.id, owned);
          // Everything from this guardian is already owned: a small XP bonus instead.
          if (!item) { xpEarned += LOOT_RULES.duplicateXP; break; }
          owned.add(item.id);
          loot.push(item.id);
          update[`cosmetics.${item.id}`] = { got_at: now, boss: boss.id };
        }
      }
      const newXP = totalXP + xpEarned;
      const newLevel = levelFromXP(newXP);
      update.total_xp = newXP;
      update.level = newLevel;
      tx.update(userRef, update);
      tx.set(adminDb.collection("xp_transactions").doc(), {
        user_id: user.uid,
        amount: xpEarned,
        reason: `boss_${boss.id}`,
        metadata: { win: result.win, correct: result.correct, answered: result.answered, timeMs },
        created_at: now,
      });

      return {
        status: 200 as const,
        data: {
          ...result,
          firstWin,
          flawless,
          xpEarned,
          newXP,
          newLevel,
          leveledUp: newLevel > (profile.level ?? 1),
          loot,
          stamp,
        },
      };
    });

    if (outcome.status === 404) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    if (outcome.status === 403) return NextResponse.json({ error: "Guardian is still locked" }, { status: 403 });
    return NextResponse.json(outcome.data);
  } catch (error) {
    console.error("Boss API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
