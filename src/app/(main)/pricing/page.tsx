"use client";
import { motion } from "framer-motion";
import { Check, X, Crown, Bot, BookMarked, MessageCircle, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const profile = useAuthStore((s) => s.profile);
  const isPro = profile?.access_tier === "pro";
  const { t } = useTranslation();

  const FREE_FEATURES = [
    { label: t("pricing.feature1"), ok: true },
    { label: t("pricing.feature2"), ok: true },
    { label: t("pricing.feature3"), ok: true },
    { label: t("pricing.feature4"), ok: true },
    { label: t("pricing.feature5"), ok: true },
    { label: t("pricing.feature6"), ok: false },
    { label: t("pricing.feature7"), ok: false },
    { label: t("pricing.feature8"), ok: false },
  ];

  const PRO_FEATURES = [
    { label: t("pricing.proAllFree"), ok: true },
    { label: t("pricing.proChat"), ok: true },
    { label: t("pricing.proGrammar"), ok: true },
    { label: t("pricing.proDict"), ok: true },
    { label: t("pricing.proSupport"), ok: true },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Hero: the Pro plan card carries the page heading */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card !rounded-[2rem] p-6 relative overflow-hidden !border-orange-300 !shadow-[0_6px_0_#fdba74]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight">{t("pricing.choosePlan")}</h1>
            <p className="text-sm font-bold text-gray-500 mt-1">{t("pricing.subtitle")}</p>
          </div>
          <span className="btn-3d inline-flex items-center gap-1 bg-orange-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shrink-0 [--btn-edge:#c2410c]">
            <Crown size={11} aria-hidden="true" /> PRO
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <h2 className="font-display text-lg text-gray-900 leading-tight">✨ {t("pricing.pro")}</h2>
            <p className="text-xs font-extrabold text-gray-500">{t("pricing.fullAi")}</p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="font-display text-5xl text-orange-500 tabular-nums leading-none">$5</span>
              <span className="text-sm font-extrabold text-gray-500">{t("pricing.perMonth")}</span>
            </div>
            <p className="text-[11px] font-extrabold text-gray-500 mt-1">{t("pricing.approxBaht", { n: 175 })}</p>
          </div>
        </div>

        <div className="space-y-2 my-5">
          {PRO_FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full flex items-center justify-center border-2 bg-orange-100 border-orange-300 shrink-0">
                <Check size={13} strokeWidth={3} className="text-orange-600" />
              </span>
              <span className="text-sm font-bold text-gray-700">{f.label}</span>
            </div>
          ))}
        </div>
        {isPro ? (
          <div className="py-2 text-center text-sm font-extrabold text-amber-600 bg-amber-50 border-2 border-amber-200 rounded-2xl">
            👑 {t("pricing.youHavePro")}
          </div>
        ) : (
          <Link href="/subscribe">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn-3d shimmer w-full h-14 rounded-2xl bg-orange-500 text-white font-display text-base flex items-center justify-center gap-2 [--btn-edge:#c2410c]"
            >
              <Zap size={18} className="fill-white" />
              {t("pricing.subscribeBtn")}
            </motion.button>
          </Link>
        )}
      </motion.section>

      {/* Free plan: secondary */}
      <section className={cn("game-panel p-5", isPro && "opacity-60")}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h2 className="font-display text-base text-gray-900 leading-tight">🎒 {t("pricing.free")}</h2>
            <p className="text-[11px] font-extrabold text-gray-500">{t("pricing.noCost")}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display text-2xl text-gray-400 tabular-nums">$0</span>
            <p className="text-[11px] font-extrabold text-gray-500">{t("pricing.forever")}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {FREE_FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0",
                  f.ok ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-200"
                )}
              >
                {f.ok
                  ? <Check size={11} strokeWidth={3} className="text-green-600" />
                  : <X size={11} strokeWidth={3} className="text-gray-400" />}
              </span>
              <span className={cn("text-sm font-bold", f.ok ? "text-gray-700" : "text-gray-400 line-through")}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
        {!isPro && (
          <p className="mt-3 text-sm font-extrabold text-green-600">
            ✅ {t("pricing.yourCurrentPlan")}
          </p>
        )}
      </section>

      {/* AI Features showcase */}
      <section className="space-y-2">
        <h3 className="font-display text-lg text-gray-900 px-1">🔓 {t("pricing.whatProUnlocks")}</h3>
        <div className="game-panel game-rows px-4">
          {[
            { icon: Bot, title: t("pricing.kruChatTitle"), desc: t("pricing.kruChatDesc"), color: "text-purple-500", bg: "bg-purple-50 border-purple-200" },
            { icon: BookMarked, title: t("pricing.aiDictTitle"), desc: t("pricing.aiDictDesc"), color: "text-sky-500", bg: "bg-sky-50 border-sky-200" },
            { icon: MessageCircle, title: t("pricing.grammarTitle"), desc: t("pricing.grammarDesc"), color: "text-green-500", bg: "bg-green-50 border-green-200" },
          ].map((item, i) => (
            <div key={i} className="py-3.5 flex items-start gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border-2 shrink-0", item.bg)}>
                <item.icon size={18} className={item.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs font-bold text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              {!isPro && (
                <Lock size={14} className="text-gray-400 shrink-0 mt-1" />
              )}
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs font-bold text-gray-400 px-4">
        {t("pricing.cancelNote")}
      </p>
    </div>
  );
}
