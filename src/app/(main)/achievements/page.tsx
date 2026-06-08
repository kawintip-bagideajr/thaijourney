"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/achievements";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🏆" },
  { id: "streak", label: "Streak", emoji: "🔥" },
  { id: "xp", label: "XP", emoji: "⭐" },
  { id: "lessons", label: "Lessons", emoji: "📚" },
  { id: "provinces", label: "Provinces", emoji: "🗺️" },
  { id: "special", label: "Special", emoji: "✨" },
] as const;

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const unlockedSlugs = new Set(["streak_3", "lessons_1", "xp_100", "province_1"]);

  const filtered = ACHIEVEMENTS.filter(
    (a) => activeCategory === "all" || a.category === activeCategory
  );

  const totalXPFromAchievements = ACHIEVEMENTS
    .filter((a) => unlockedSlugs.has(a.slug))
    .reduce((sum, a) => sum + a.xp_reward, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Achievements</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unlockedSlugs.size} / {ACHIEVEMENTS.length} unlocked
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-amber-500">{totalXPFromAchievements}</p>
          <p className="text-xs text-gray-400">XP from badges</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
              activeCategory === cat.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            )}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((ach, i) => {
          const isUnlocked = unlockedSlugs.has(ach.slug);
          return (
            <motion.div
              key={ach.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                isUnlocked
                  ? "bg-white border-gray-100 shadow-sm"
                  : "bg-gray-50 border-gray-100 opacity-50"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0",
                isUnlocked ? "bg-amber-50" : "bg-gray-100 grayscale"
              )}>
                {ach.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("font-bold text-sm", isUnlocked ? "text-gray-900" : "text-gray-400")}>
                    {ach.title}
                  </p>
                  {isUnlocked && (
                    <span className="text-[10px] bg-green-100 text-green-600 font-bold px-1.5 py-0.5 rounded-full">Earned</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{ach.description}</p>
                <p className="text-xs text-amber-500 font-bold mt-1">+{ach.xp_reward} XP</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
