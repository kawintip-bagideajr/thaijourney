"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Lock, Check } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { XPChart } from "@/components/dashboard/XPChart";
import { ThaiScene, SCENE_PALETTES } from "@/components/game/ThaiScene";
import { PROVINCES } from "@/data/provinces";
import { BOSSES, bossGate, bossUnlockXP } from "@/data/bosses";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";
import { cn, formatNumber } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface DayXP { day: string; xp: number; }
interface Today { xp: number; lessons: number; mins: number; }

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SORTED = [...PROVINCES].sort((a, b) => a.unlock_xp - b.unlock_xp);

const QUICK_PLAY = [
  { href: "/alphabet", emoji: "ก", key: "dash.thaiAlphabet", sub: "dash.masterBasics", bg: "from-violet-400 to-purple-500", edge: "#6d28d9" },
  { href: "/chat", emoji: "💬", key: "dash.aiChat", sub: "dash.practiceConversation", bg: "from-sky-400 to-blue-500", edge: "#1d4ed8" },
  { href: "/dictionary", emoji: "📖", key: "nav.dictionary", sub: "dash.lookUpWords", bg: "from-rose-400 to-pink-500", edge: "#be185d" },
  { href: "/leaderboard", emoji: "🏆", key: "nav.leaderboard", sub: "dash.compete", bg: "from-amber-400 to-orange-500", edge: "#c2410c" },
];

function QuestRow({ emoji, label, value, goal }: { emoji: string; label: string; value: number; goal: number }) {
  const done = value >= goal;
  const pct = Math.min(100, (value / goal) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-2 shrink-0",
        done ? "bg-green-100 border-green-300" : "bg-orange-50 border-orange-200")}>
        {done ? <Check size={22} className="text-green-600" strokeWidth={3} /> : emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-gray-800">{label}</p>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200 mt-1">
          <motion.div
            className={cn("h-full rounded-full", done ? "bg-green-500" : "xp-bar")}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-700 tabular-nums">
            {Math.min(value, goal)} / {goal}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const { completed } = useCompletedLessons(profile?.id);
  const { t } = useTranslation();
  const [weekData, setWeekData] = useState<DayXP[]>([]);
  const [today, setToday] = useState<Today>({ xp: 0, lessons: 0, mins: 0 });

  useEffect(() => {
    if (!profile?.id) return;
    const todayStr = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 6 * 864e5).toISOString().split("T")[0];
    getDocs(query(
      collection(db, "daily_activity"),
      where("user_id", "==", profile.id),
      where("activity_date", ">=", sevenDaysAgo),
    )).then((snap) => {
      const byDate: Record<string, { xp: number; mins: number; lessons: number }> = {};
      snap.docs.forEach((doc) => {
        const d = doc.data();
        byDate[d.activity_date] = { xp: d.xp_earned ?? 0, mins: d.minutes_studied ?? 0, lessons: d.lessons_completed ?? 0 };
      });
      const week: DayXP[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 864e5);
        week.push({ day: DAYS[d.getDay()], xp: byDate[d.toISOString().split("T")[0]]?.xp ?? 0 });
      }
      setWeekData(week);
      const td = byDate[todayStr];
      setToday({ xp: td?.xp ?? 0, lessons: td?.lessons ?? 0, mins: td?.mins ?? 0 });
    }).catch(() => {});
  }, [profile?.id]);

  if (!profile) return null;

  const xp = profile.total_xp;
  const unlocked = SORTED.filter((p) => p.unlock_xp <= xp);
  const here = unlocked[unlocked.length - 1] ?? SORTED[0];
  const next = SORTED.find((p) => p.unlock_xp > xp);
  const prevXP = here.unlock_xp;
  const tripPct = next ? Math.min(100, ((xp - prevXP) / Math.max(1, next.unlock_xp - prevXP)) * 100) : 100;

  const nextBoss = BOSSES.filter((b) => !profile.passport_stamps?.[b.id]).sort((a, b) => bossUnlockXP(a) - bossUnlockXP(b))[0];
  const stamps = BOSSES.filter((b) => profile.passport_stamps?.[b.id]).length;

  const quests = [
    { emoji: "⚡", label: t("quest.earnXp", { n: 30 }, "Earn 30 XP"), value: today.xp, goal: 30 },
    { emoji: "📚", label: t("quest.lessons", { n: 2 }, "Complete 2 lessons"), value: today.lessons, goal: 2 },
    { emoji: "⏱️", label: t("quest.minutes", { n: profile.daily_goal_minutes }, `Study ${profile.daily_goal_minutes} minutes`), value: today.mins, goal: profile.daily_goal_minutes || 10 },
  ];
  const questsDone = quests.filter((q) => q.value >= q.goal).length;
  const activeDays = weekData.map((d) => d.xp > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5">
      {/* ================= LEFT ================= */}
      <div className="space-y-5 min-w-0">
        {/* Hero: where am I on the journey */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[var(--game-edge)] shadow-[0_5px_0_var(--game-edge)]"
        >
          <ThaiScene palette={SCENE_PALETTES[here.region]} className="absolute inset-0 w-full h-full" />
          <div className="relative p-5 sm:p-6 min-h-[250px] flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="bg-white/85 backdrop-blur rounded-2xl px-4 py-2.5 border-2 border-white shadow-sm max-w-[75%]">
                <p className="text-[11px] font-extrabold text-orange-500">
                  📍 {t("dash.youAreIn", undefined, "You are in")}
                </p>
                <h1 className="text-xl sm:text-2xl text-gray-900 leading-tight">{here.emoji} {here.name_en}</h1>
                <p className="thai-text text-sm text-gray-600 -mt-0.5">{here.name_th}</p>
              </div>
              <div className="text-5xl sm:text-6xl animate-bob drop-shadow-lg select-none" aria-hidden="true">🧳</div>
            </div>

            <div className="mt-auto pt-6 flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex-1 bg-white/85 backdrop-blur rounded-2xl px-4 py-2.5 border-2 border-white">
                <p className="text-xs font-extrabold text-gray-700">
                  {t("dash.greeting", { name: profile.display_name ?? profile.username })}
                </p>
                {next ? (
                  <>
                    <div className="flex justify-between text-[11px] font-bold text-gray-500 mt-1">
                      <span>{t("dash.nextStop", undefined, "Next stop")}: {next.emoji} {next.name_en}</span>
                      <span className="tabular-nums">{t("map.xpAway", { n: next.unlock_xp - xp })}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <motion.div className="h-full xp-bar" initial={{ width: 0 }} animate={{ width: `${tripPct}%` }} transition={{ duration: 1 }} />
                    </div>
                  </>
                ) : (
                  <p className="text-xs font-bold text-green-600 mt-1">🎉 {t("dash.allUnlocked", undefined, "Every province unlocked!")}</p>
                )}
              </div>
              <Link href="/learn" className="shrink-0">
                <button className="btn-3d w-full sm:w-auto h-14 px-8 rounded-2xl bg-orange-500 text-white font-display text-lg flex items-center justify-center gap-2 [--btn-edge:#c2410c]">
                  <Play size={20} className="fill-white" />
                  {profile.total_xp === 0 ? t("dash.startJourney", undefined, "Start journey") : t("dash.continueLearning")}
                </button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Daily quests */}
        <section className="game-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg text-gray-900">🎯 {t("quest.title", undefined, "Daily Quests")}</h2>
              <p className="text-xs font-bold text-gray-400">{t("quest.subtitle", undefined, "Resets every midnight")}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className={cn("text-4xl", questsDone < quests.length && "grayscale-[60%]")}>
                {questsDone === quests.length ? "🎁" : "📦"}
              </span>
              <span className="text-[10px] font-black text-gray-500 tabular-nums">{questsDone}/{quests.length}</span>
            </div>
          </div>
          <div className="game-rows [&>*]:py-2.5 -my-2.5">
            {quests.map((q) => <QuestRow key={q.label} {...q} />)}
          </div>
          {questsDone === quests.length && (
            <p className="mt-4 text-center text-sm font-extrabold text-green-600 bg-green-50 border-2 border-green-200 rounded-2xl py-2">
              🎉 {t("quest.allDone", undefined, "All quests done. See you tomorrow!")}
            </p>
          )}
        </section>

        {/* Quick play */}
        <section className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {QUICK_PLAY.map((q) => (
              <Link key={q.href} href={q.href}
                className={cn("btn-3d block rounded-3xl p-4 text-white overflow-hidden bg-gradient-to-br h-full", q.bg)}
                style={{ ["--btn-edge" as string]: q.edge }}>
                <div className="text-3xl font-thai-loop font-bold leading-none mb-2 drop-shadow">{q.emoji}</div>
                <p className="font-display text-base leading-tight">{t(q.key)}</p>
                <p className="text-[11px] font-bold opacity-90">{t(q.sub, undefined, q.sub === "dash.lookUpWords" ? "Look up any word" : q.sub === "dash.compete" ? "Climb the ranks" : "")}</p>
              </Link>
          ))}
        </section>

        {/* Weekly XP */}
        <section className="game-panel p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-gray-900">📈 {t("dash.weeklyXp")}</h2>
            <span className="flex items-center gap-1 text-sm font-black text-amber-600">
              <Zap size={15} className="fill-amber-400 text-amber-400" />
              {formatNumber(weekData.reduce((s, d) => s + d.xp, 0))}
            </span>
          </div>
          <XPChart data={weekData} />
        </section>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="space-y-5">
        {/* Streak */}
        <section className="game-panel p-5 text-center">
          <div className={cn("text-6xl leading-none", profile.current_streak === 0 && "grayscale opacity-50")}>🔥</div>
          <p className="font-display text-4xl text-orange-500 mt-1 tabular-nums">{profile.current_streak}</p>
          <p className="text-sm font-extrabold text-gray-600">{t("dash.dayStreak", undefined, "day streak")}</p>
          <div className="flex justify-between mt-4 px-1">
            {weekData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm",
                  activeDays[i] ? "bg-orange-500 border-orange-600 text-white" : "bg-gray-100 border-gray-200 text-gray-300")}>
                  {activeDays[i] ? "✓" : ""}
                </div>
                <span className="text-[10px] font-bold text-gray-400">{d.day.slice(0, 2)}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold text-gray-400 mt-3">
            {profile.current_streak > 0 ? t("dash.streakMsg", { n: profile.current_streak }) : t("dash.startStreak")}
          </p>
        </section>

        {/* Next guardian */}
        {nextBoss ? (
          <section className="relative overflow-hidden rounded-3xl p-5 text-white border-2 shadow-[0_5px_0_rgba(0,0,0,0.2)]"
            style={{ background: `linear-gradient(135deg, ${nextBoss.color}, ${nextBoss.color}cc)`, borderColor: nextBoss.color }}>
            <p className="text-[11px] font-extrabold opacity-90">⚔️ {t("dash.nextGuardian", undefined, "Next Guardian")}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-6xl drop-shadow-lg">{nextBoss.emoji}</span>
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight">{nextBoss.name_en}</p>
                <p className="thai-text text-sm opacity-90">{nextBoss.name_th}</p>
              </div>
            </div>
            {(() => { const gate = bossGate(nextBoss, xp, completed, profile.passport_stamps); return gate.unlocked ? (
              <Link href={`/boss/${nextBoss.id}`}>
                <button className="btn-3d shimmer mt-4 w-full h-12 rounded-2xl bg-white font-display text-base [--btn-edge:rgba(0,0,0,0.25)]"
                  style={{ color: nextBoss.color }}>
                  {t("boss.challenge", undefined, "Challenge the Guardian")}
                </button>
              </Link>
            ) : (
              <div className="mt-4 space-y-2">
                {!gate.xpOk && (
                  <div className="flex justify-between text-[11px] font-bold opacity-90">
                    <span className="flex items-center gap-1"><Lock size={11} /> {t("dash.unlocksAt", { n: bossUnlockXP(nextBoss) }, `Unlocks at ${bossUnlockXP(nextBoss)} XP`)}</span>
                    <span className="tabular-nums">{xp}/{bossUnlockXP(nextBoss)}</span>
                  </div>
                )}
                {gate.stagesTotal > 0 && (
                  <div>
                    <div className="flex justify-between text-[11px] font-bold opacity-90">
                      <span className="flex items-center gap-1"><Lock size={11} /> ผ่านด่านในภาคนี้ให้ครบ</span>
                      <span className="tabular-nums">{gate.stagesDone}/{gate.stagesTotal}</span>
                    </div>
                    <div className="h-3 bg-black/20 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-white rounded-full" style={{ width: `${(gate.stagesDone / gate.stagesTotal) * 100}%` }} />
                    </div>
                  </div>
                )}
                {gate.needsBoss && (
                  <p className="text-[11px] font-bold opacity-90">⚔️ ชนะ {gate.needsBoss.name_th} ก่อน</p>
                )}
              </div>
            ); })()}
            <Link href="/map" className="block text-center text-[11px] font-extrabold mt-3 opacity-90 hover:opacity-100">
              🛂 {t("passport.title", undefined, "Thailand Passport")} · {stamps}/{BOSSES.length}
            </Link>
          </section>
        ) : (
          <section className="game-panel p-5 text-center">
            <div className="text-5xl">🛂</div>
            <p className="font-display text-lg text-gray-900 mt-1">{t("dash.passportComplete", undefined, "Passport complete!")}</p>
          </section>
        )}

        {/* Mini stats */}
        <section className="grid grid-cols-3 divide-x-2 divide-dashed divide-[var(--game-edge)] py-1">
          {[
            { emoji: "⚡", value: formatNumber(xp), label: t("dash.totalXp") },
            { emoji: "🏅", value: String(profile.longest_streak), label: t("dash.bestStreak") },
            { emoji: "🗺️", value: `${unlocked.length}/${PROVINCES.length}`, label: t("dash.provinces") },
          ].map((s) => (
            <div key={s.label} className="px-2 text-center">
              <div className="text-xl">{s.emoji}</div>
              <p className="font-display text-lg text-gray-900 tabular-nums leading-tight">{s.value}</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">{s.label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
