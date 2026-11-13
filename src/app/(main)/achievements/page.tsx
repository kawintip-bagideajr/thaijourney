"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function AchievementsPage() {
  const profile = useAuthStore((s) => s.profile);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [unlockedSlugs, setUnlockedSlugs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const CATEGORIES = [
    { id: "all", label: t("achievements.all"), emoji: "🏆" },
    { id: "streak", label: t("achievements.streak"), emoji: "🔥" },
    { id: "xp", label: t("achievements.xp"), emoji: "⭐" },
    { id: "lessons", label: t("achievements.lessons"), emoji: "📚" },
    { id: "provinces", label: t("achievements.provinces"), emoji: "🗺️" },
    { id: "special", label: t("achievements.special"), emoji: "✨" },
  ];

  useEffect(() => {
    if (!profile) return;

    // Fetch unlocked achievements from Firestore (stored by achievement slug)
    const q = query(
      collection(db, "user_achievements"),
      where("user_id", "==", profile.id)
    );
    getDocs(q).then((snap) => {
      const slugs = new Set(snap.docs.map((doc) => doc.data().achievement_slug as string));
      setUnlockedSlugs(slugs);
      setLoading(false);
    });
  }, [profile?.id]);

  // Also auto-unlock achievements based on current profile stats (client-side check)
  useEffect(() => {
    if (!profile || loading) return;
    const earned = new Set(unlockedSlugs);

    if (profile.current_streak >= 3) earned.add("streak_3");
    if (profile.current_streak >= 7) earned.add("streak_7");
    if (profile.current_streak >= 30) earned.add("streak_30");
    if (profile.total_xp >= 100) earned.add("xp_100");
    if (profile.total_xp >= 500) earned.add("xp_500");
    if (profile.total_xp >= 1000) earned.add("xp_1000");

    setUnlockedSlugs(earned);
  }, [profile, loading]);

  const filtered = ACHIEVEMENTS.filter(
    (a) => activeCategory === "all" || a.category === activeCategory
  );

  const totalXPFromAchievements = ACHIEVEMENTS
    .filter((a) => unlockedSlugs.has(a.slug))
    .reduce((sum, a) => sum + a.xp_reward, 0);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;

  const pctUnlocked = Math.min(100, (unlockedSlugs.size / Math.max(1, ACHIEVEMENTS.length)) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
      {/* Header: plain title, then the "earned x/y" progress strip as the hero */}
      <header className="space-y-3">
        <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight px-1">{t("achievements.title")}</h1>
        <section className="game-card px-4 py-4 sm:px-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-4xl sm:text-5xl text-gray-900 tabular-nums leading-none">
                {unlockedSlugs.size}<span className="text-gray-300 text-2xl sm:text-3xl">/{ACHIEVEMENTS.length}</span>
              </p>
              <p className="text-sm font-bold text-gray-500 mt-1.5">
                {t("achievements.unlocked", { n: unlockedSlugs.size, total: ACHIEVEMENTS.length })}
              </p>
            </div>
            <p className="shrink-0 text-right text-[11px] font-extrabold text-gray-500 leading-tight max-w-[110px]">
              <span className="block font-display text-xl text-amber-500 tabular-nums">
                <span aria-hidden="true">⚡</span>{totalXPFromAchievements}
              </span>
              {t("achievements.xpFromBadges")}
            </p>
          </div>
          <div className="h-5 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 mt-4">
            <motion.div
              className="h-full rounded-full xp-bar"
              initial={{ width: 0 }} animate={{ width: `${pctUnlocked}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </section>
      </header>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
            className={cn(
              "flex items-center gap-1.5 h-10 px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
              activeCategory === cat.id
                ? "btn-3d bg-orange-500 text-white border-2 border-transparent [--btn-edge:#c2410c]"
                : "text-gray-500 bg-white border-2 border-[var(--game-edge)] hover:bg-orange-50"
            )}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((ach) => {
          const isUnlocked = unlockedSlugs.has(ach.slug);
          return (
            <div
              key={ach.slug}
              className={cn(
                "game-panel p-4 flex items-center gap-3",
                isUnlocked ? "!border-amber-200" : "opacity-60"
              )}
            >
              <div className={cn(
                "relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border-2",
                isUnlocked ? "bg-amber-50 border-amber-200" : "bg-gray-100 border-gray-200"
              )}>
                <span className={cn(!isUnlocked && "grayscale")} aria-hidden="true">{ach.icon}</span>
                {!isUnlocked && (
                  <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center">
                    <Lock size={12} className="text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={cn("font-extrabold text-sm", isUnlocked ? "text-gray-900" : "text-gray-500")}>
                    {ach.title}
                  </p>
                  {isUnlocked && (
                    <span className="text-[10px] bg-green-100 border border-green-300 text-green-700 font-black px-2 py-0.5 rounded-full">
                      <span aria-hidden="true">✓ </span>{t("common.earned")}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-0.5 leading-relaxed">{ach.description}</p>
                <p className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 tabular-nums">
                  <span aria-hidden="true">⚡</span>+{ach.xp_reward} XP
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
