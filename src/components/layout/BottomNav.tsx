"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookMarked,
  Trophy, Star, User, Settings, LogOut,
  MoreHorizontal, X, Flame, Crown, Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";

const MAIN_NAV = [
  { href: "/dashboard", emoji: "🏠", key: "nav.home" },
  { href: "/learn", emoji: "📚", key: "nav.learn" },
  { href: "/map", emoji: "🗺️", key: "nav.map" },
  { href: "/chat", emoji: "💬", key: "nav.ai" },
];

const MORE_NAV = [
  { href: "/dictionary", icon: BookMarked, key: "nav.dictionary" },
  { href: "/leaderboard", icon: Trophy, key: "nav.leaderboard" },
  { href: "/alphabet", icon: Star, key: "nav.alphabet" },
  { href: "/achievements", icon: Flame, key: "nav.achievements" },
  { href: "/profile", icon: User, key: "nav.profile" },
  { href: "/subscribe", icon: Crown, key: "common.pro" },
  { href: "/donate", icon: Heart, key: "nav.donate" },
  { href: "/settings", icon: Settings, key: "nav.settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const { signOut } = useAuth();
  const profile = useAuthStore((s) => s.profile);
  const { t } = useTranslation();

  if (pathname.includes("/lesson/")) return null;

  const isMoreActive = MORE_NAV.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setShowMore(false)}
          />
        )}
      </AnimatePresence>

      {/* More drawer */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <p className="font-black text-gray-900">{t("nav.more")}</p>
              <button
                onClick={() => setShowMore(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X size={15} />
              </button>
            </div>

            {/* Grid of extra nav items */}
            <div className="grid grid-cols-4 gap-2 px-4 pb-4">
              {MORE_NAV.map(({ href, icon: Icon, key }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setShowMore(false)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-colors",
                      isActive ? "bg-orange-50" : "bg-gray-50 active:bg-gray-100"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      isActive ? "gradient-thai" : "bg-white border border-gray-100 shadow-sm"
                    )}>
                      <Icon size={18} className={isActive ? "text-white" : "text-gray-500"} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-semibold text-center leading-tight",
                      isActive ? "text-orange-500" : "text-gray-600"
                    )}>
                      {t(key)}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Sign out */}
            <div className="px-5 pb-2">
              <button
                onClick={() => { setShowMore(false); signOut(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 text-red-500 font-semibold text-sm"
              >
                <LogOut size={16} />
                {t("nav.signOut")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--game-edge)] z-40"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around px-1 pt-1 pb-1">
          {MAIN_NAV.map(({ href, emoji, key }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-0.5 flex-1 py-0.5">
                <div className={cn(
                  "w-11 h-10 flex items-center justify-center rounded-2xl border-2 transition-all text-xl",
                  isActive ? "bg-orange-50 border-orange-300 shadow-[0_3px_0_#fdba74] -translate-y-0.5" : "!border-transparent grayscale-[40%] opacity-80"
                )}>
                  {emoji}
                </div>
                <span className={cn(
                  "text-[10px] font-extrabold leading-none",
                  isActive ? "text-orange-500" : "text-gray-400"
                )}>
                  {t(key)}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMore((v) => !v)}
            className="flex flex-col items-center gap-0.5 flex-1 py-0.5"
          >
            <div className={cn(
              "w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
              (showMore || isMoreActive) ? "bg-orange-100" : ""
            )}>
              <MoreHorizontal
                size={20}
                className={cn((showMore || isMoreActive) ? "text-orange-500" : "text-gray-400")}
                strokeWidth={(showMore || isMoreActive) ? 2.5 : 1.8}
              />
            </div>
            <span className={cn(
              "text-[9px] font-semibold leading-none",
              (showMore || isMoreActive) ? "text-orange-500" : "text-gray-400"
            )}>
              {t("nav.more")}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
