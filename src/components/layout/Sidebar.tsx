"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Settings, LogOut, Heart, Info, Zap } from "lucide-react";
import { cn, calcCurrentHearts, msToNextHeart, MAX_HEARTS, xpProgressInLevel } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { AppLogoIcon } from "@/components/ui/AppLogoIcon";
import { AvatarFrame, TitleTag } from "@/components/cosmetics/Cosmetics";

function HeartsWidget({ hearts, heartsUpdatedAt }: { hearts: number; heartsUpdatedAt: string }) {
  const [, setTick] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (hearts >= MAX_HEARTS) return;
    const id = setInterval(() => setTick((t) => t + 1), 15000);
    return () => clearInterval(id);
  }, [hearts]);

  const realHearts = calcCurrentHearts(hearts, heartsUpdatedAt);
  const msLeft = realHearts < MAX_HEARTS ? msToNextHeart(hearts, heartsUpdatedAt) : 0;
  const minsLeft = Math.ceil(msLeft / 60000);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart
              key={i}
              size={18}
              strokeWidth={2.5}
              className={i < realHearts ? "text-red-500 fill-red-500 drop-shadow-[0_2px_0_#b91c1c]" : "text-gray-300 fill-gray-200"}
            />
          ))}
        </div>
        <button
          onClick={() => setShowInfo((v) => !v)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Hearts info"
        >
          <Info size={14} />
        </button>
      </div>
      <p className={cn("text-[11px] font-bold", realHearts < MAX_HEARTS ? "text-red-500" : "text-green-600")}>
        {realHearts < MAX_HEARTS ? `+1 หัวใจ ใน ${minsLeft} นาที` : "✓ หัวใจเต็มแล้ว"}
      </p>
      {showInfo && (
        <div className="text-[10px] text-gray-500 leading-relaxed border-t border-dashed border-gray-200 pt-2 space-y-0.5">
          <p>💔 ตอบผิด = เสีย 1 หัวใจ</p>
          <p>❤️ เติมทีละ 1 ดวง ทุก 30 นาที</p>
          <p>🚫 หมดหัวใจ = เรียนต่อไม่ได้</p>
          <p>🔄 รอให้เติม หรืออัปเป็น Pro ได้หัวใจไม่จำกัด</p>
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/dashboard", emoji: "🏠", tile: "bg-orange-100", key: "nav.dashboard" },
  { href: "/learn", emoji: "📚", tile: "bg-sky-100", key: "nav.learn" },
  { href: "/map", emoji: "🗺️", tile: "bg-emerald-100", key: "nav.map" },
  { href: "/alphabet", emoji: "ก", tile: "bg-violet-100", key: "nav.alphabet" },
  { href: "/leaderboard", emoji: "🏆", tile: "bg-amber-100", key: "nav.leaderboard" },
  { href: "/dictionary", emoji: "📖", tile: "bg-rose-100", key: "nav.dictionary" },
  { href: "/chat", emoji: "💬", tile: "bg-indigo-100", key: "nav.chat" },
  { href: "/achievements", emoji: "🏅", tile: "bg-yellow-100", key: "nav.achievements" },
  { href: "/profile", emoji: "🧳", tile: "bg-teal-100", key: "nav.profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const xp = profile ? xpProgressInLevel(profile.total_xp) : null;

  return (
    <aside className="hidden lg:flex flex-col w-64 h-dvh overflow-y-auto overscroll-contain bg-white border-r-2 border-[var(--game-edge)] px-3 py-5 gap-3 fixed left-0 top-0 z-40">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <AppLogoIcon size={42} />
        <div>
          <span className="font-display text-2xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            ThaiJN
          </span>
          <p className="text-[10px] font-bold text-gray-400 -mt-1">{t("nav.tagline")}</p>
        </div>
      </Link>

      {/* Player card: level, XP, streak, hearts */}
      {profile && xp && (
        <div className="game-card p-3 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <AvatarFrame frameId={profile.equipped_frame} thickness={3}>
              <div className="w-11 h-11 rounded-2xl gradient-thai flex items-center justify-center text-white font-display text-lg shadow-[0_3px_0_#b45309] shrink-0">
                {profile.level}
              </div>
            </AvatarFrame>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-gray-900 truncate">{profile.display_name ?? profile.username}</p>
              {profile.equipped_title && <TitleTag titleId={profile.equipped_title} className="mt-0.5 max-w-full truncate" />}
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mt-1 border border-gray-200">
                <div className="h-full xp-bar" style={{ width: `${xp.pct}%` }} />
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-0.5 tabular-nums">{xp.current}/{xp.needed} XP</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-orange-50 border-2 border-orange-100 py-1">
              <span className={cn("text-base", profile.current_streak === 0 && "grayscale opacity-60")}>🔥</span>
              <span className="font-display text-sm text-orange-600 tabular-nums">{profile.current_streak}</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-amber-50 border-2 border-amber-100 py-1">
              <Zap size={15} className="text-amber-500 fill-amber-400" />
              <span className="font-display text-sm text-amber-600 tabular-nums">{profile.total_xp}</span>
            </div>
          </div>
          <HeartsWidget hearts={profile.hearts} heartsUpdatedAt={profile.hearts_updated_at} />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, emoji, tile, key }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex items-center gap-3 px-2 py-1.5 rounded-2xl text-sm font-extrabold border-2 transition-colors",
                  isActive
                    ? "bg-orange-50 border-orange-300 text-orange-600 shadow-[0_3px_0_#fdba74]"
                    : "text-gray-600 hover:bg-gray-50"
                )}
                style={isActive ? undefined : { borderColor: "transparent" }}
              >
                <span className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-lg font-thai-loop font-bold text-violet-600", tile)}>
                  {emoji}
                </span>
                {t(key)}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t-2 border-dashed border-[var(--game-edge)] pt-3 flex flex-col gap-1">
        <Link href="/subscribe">
          <div className="shimmer flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-extrabold text-white gradient-thai shadow-[0_4px_0_#b45309]">
            <span className="text-lg">👑</span>
            {t("nav.goPro")}
          </div>
        </Link>
        <Link href="/donate">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <span className="text-base">💝</span>
            {t("nav.donate")}
          </div>
        </Link>
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings size={18} className="text-gray-400" />
            {t("nav.settings")}
          </div>
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
        >
          <LogOut size={18} />
          {t("nav.signOut")}
        </button>
      </div>
    </aside>
  );
}
