"use client";
import { Flame, Heart, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { xpProgressInLevel } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";

export function TopBar() {
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  if (!profile || pathname.includes("/lesson/")) return null;

  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        {/* Streak */}
        <div className="flex items-center gap-1 shrink-0">
          <Flame size={15} className="text-orange-500" />
          <span className="text-xs font-bold text-orange-600">{profile.current_streak}</span>
        </div>

        {/* XP bar — takes remaining space */}
        <div className="flex-1 min-w-0 max-w-[140px]">
          <div className="flex justify-between text-[9px] text-gray-400 mb-1 leading-none">
            <span>Lv {profile.level}</span>
            <span className="tabular-nums">{current}/{needed}</span>
          </div>
          <ProgressBar value={pct} animated={false} />
        </div>

        {/* Hearts — condensed on very small screens */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              size={12}
              className={i < profile.hearts ? "text-red-500 fill-red-500" : "text-gray-200 fill-gray-100"}
            />
          ))}
        </div>

        {/* Total XP */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Zap size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-amber-600 tabular-nums">{profile.total_xp}</span>
        </div>
      </div>
    </header>
  );
}
