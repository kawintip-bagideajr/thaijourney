"use client";
import { Flame, Heart, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { xpProgressInLevel } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";

export function TopBar() {
  const profile = useAuthStore((s) => s.profile);
  if (!profile) return null;

  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Streak */}
        <div className="flex items-center gap-1.5">
          <Flame size={18} className="text-orange-500" />
          <span className="text-sm font-bold text-orange-600">{profile.current_streak}</span>
        </div>

        {/* XP bar */}
        <div className="flex-1 max-w-[160px]">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Lv {profile.level}</span>
            <span>{current}/{needed} XP</span>
          </div>
          <ProgressBar value={pct} animated={false} />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              size={14}
              className={i < profile.hearts ? "text-red-500 fill-red-500" : "text-gray-200 fill-gray-100"}
            />
          ))}
        </div>

        {/* Total XP */}
        <div className="flex items-center gap-1">
          <Zap size={16} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-amber-600">{profile.total_xp}</span>
        </div>
      </div>
    </header>
  );
}
