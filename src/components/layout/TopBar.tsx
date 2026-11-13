"use client";
import { Heart, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { xpProgressInLevel, calcCurrentHearts, msToNextHeart, MAX_HEARTS, cn } from "@/lib/utils";

/** Mobile game HUD: level + XP bar, streak, XP, hearts. */
export function TopBar() {
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!profile || profile.hearts >= MAX_HEARTS) return;
    const id = setInterval(() => setTick((n) => n + 1), 10000);
    return () => clearInterval(id);
  }, [profile]);

  if (!profile || pathname.includes("/lesson/")) return null;

  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);
  const realHearts = calcCurrentHearts(profile.hearts, profile.hearts_updated_at);
  const msLeft = realHearts < MAX_HEARTS ? msToNextHeart(profile.hearts, profile.hearts_updated_at) : 0;
  const minsLeft = Math.ceil(msLeft / 60000);

  const pill = "flex items-center gap-1 rounded-full bg-white border-2 border-[var(--game-edge)] shadow-[0_2px_0_var(--game-edge)] px-2 py-0.5 shrink-0";

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-[#fff7e8]/95 backdrop-blur border-b-2 border-[var(--game-edge)] px-3 py-2">
      <div className="flex items-center gap-2">
        {/* Level + XP */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl gradient-thai flex items-center justify-center text-white font-display text-sm shadow-[0_2px_0_#b45309] shrink-0">
            {profile.level}
          </div>
          <div className="flex-1 min-w-0 max-w-[120px]">
            <div className="h-2.5 bg-white rounded-full overflow-hidden border border-[var(--game-edge)]">
              <div className="h-full xp-bar" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[9px] font-bold text-gray-400 tabular-nums leading-none mt-0.5">{current}/{needed}</p>
          </div>
        </div>

        <div className={pill}>
          <span className={cn("text-sm", profile.current_streak === 0 && "grayscale opacity-60")}>🔥</span>
          <span className="font-display text-xs text-orange-600 tabular-nums">{profile.current_streak}</span>
        </div>
        <div className={pill}>
          <Zap size={13} className="text-amber-500 fill-amber-400" />
          <span className="font-display text-xs text-amber-600 tabular-nums">{profile.total_xp}</span>
        </div>
        <div className={pill} title={realHearts < MAX_HEARTS ? `+1 ใน ${minsLeft} นาที` : undefined}>
          <Heart size={13} className="text-red-500 fill-red-500" />
          <span className="font-display text-xs text-red-500 tabular-nums">{realHearts}</span>
          {realHearts < MAX_HEARTS && <span className="text-[9px] font-bold text-gray-400 tabular-nums">{minsLeft}m</span>}
        </div>
      </div>
    </header>
  );
}
