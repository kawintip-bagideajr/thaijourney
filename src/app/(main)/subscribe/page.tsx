"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown, Check, Zap, Sparkles, Heart, RefreshCcw,
  Settings, Loader2, AlertCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";

const MONTHLY_USD = 5;
const MONTHLY_THB = 175;

function SubscribeContent() {
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isPro = profile?.access_tier === "pro";

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccess(true);
      router.replace("/subscribe");
      // Poll for Pro status — webhook may take a few seconds
      let attempts = 0;
      const interval = setInterval(async () => {
        attempts++;
        try {
          const res = await fetch("/api/user/me");
          if (res.ok) {
            const data = await res.json();
            if (data.access_tier === "pro") {
              updateProfile({ access_tier: "pro" });
              clearInterval(interval);
            }
          }
        } catch { /* ignore */ }
        if (attempts >= 10) clearInterval(interval);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [searchParams, router, updateProfile]);

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "มีบางอย่างผิดพลาด ลองใหม่อีกครั้งนะ");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("มีบางอย่างผิดพลาด ลองใหม่อีกครั้งนะ");
    } finally {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // ignore
    } finally {
      setPortalLoading(false);
    }
  };

  if (showSuccess || isPro) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 pb-28">
        <div className="game-card p-6 flex flex-col items-center text-center space-y-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="w-24 h-24 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-[0_5px_0_#fde68a] flex items-center justify-center"
          >
            <span className="text-6xl select-none" aria-hidden="true">👑</span>
          </motion.div>

          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-gray-900">
              {showSuccess && !isPro ? "กำลังอัปเดต..." : t("subscribe.alreadyPro")}
            </h1>
            <p className="text-sm font-bold text-gray-500 mt-2 leading-relaxed">
              {t("subscribe.welcomeToPro")}
            </p>
          </div>

          <div className="w-full game-rows rounded-2xl bg-orange-50 border-2 border-orange-100 px-3 text-left">
            {[t("subscribe.feature1"), t("subscribe.feature2"), t("subscribe.feature3")].map((f) => (
              <div key={f} className="flex items-center gap-3 py-2.5">
                <Sparkles size={15} className="text-orange-500 shrink-0" />
                <span className="text-sm font-extrabold text-orange-700">{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-3 pt-1">
            <motion.a
              href="/chat"
              whileTap={{ scale: 0.97 }}
              className="btn-3d h-14 px-8 rounded-2xl bg-orange-500 text-white font-display text-base flex items-center justify-center gap-2 [--btn-edge:#c2410c]"
            >
              <Zap size={18} className="fill-white" />
              {t("subscribe.startUsingAi")}
            </motion.a>
            <button
              onClick={handleManage}
              disabled={portalLoading}
              className="btn-3d h-12 px-6 rounded-2xl bg-white border-2 border-[var(--game-edge)] text-gray-700 font-extrabold text-sm flex items-center justify-center gap-2 [--btn-edge:var(--game-edge)] disabled:opacity-60"
            >
              {portalLoading ? <Loader2 size={16} className="animate-spin" /> : <Settings size={16} />}
              จัดการ Subscription
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Hero: the plan card itself, with the checkout button */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card !rounded-[2rem] p-6 !border-orange-300 !shadow-[0_6px_0_#fdba74]"
      >
        <p className="text-xs font-extrabold text-orange-500 flex items-center gap-1">
          <Crown size={12} aria-hidden="true" /> PRO
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight mt-1">{t("subscribe.title")}</h1>

        <div className="mt-4 flex items-baseline gap-1 flex-wrap">
          <span className="font-display text-5xl text-orange-500 tabular-nums leading-none">${MONTHLY_USD}</span>
          <span className="text-base font-extrabold text-gray-500">{t("subscribe.perMonth")}</span>
          <span className="text-[11px] font-extrabold text-gray-500 ml-auto">{t("subscribe.approxBaht", { n: MONTHLY_THB })}</span>
        </div>

        <div className="mt-5 space-y-2.5">
          <p className="text-xs font-extrabold text-gray-500">🎁 {t("subscribe.includedInPro")}</p>
          {[t("subscribe.proItem1"), t("subscribe.proItem2"), t("subscribe.proItem3"), t("subscribe.proItem4")].map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full flex items-center justify-center border-2 bg-orange-100 border-orange-300 shrink-0">
                <Check size={13} strokeWidth={3} className="text-orange-600" />
              </span>
              <span className="text-sm font-bold text-gray-700">{f}</span>
            </div>
          ))}
        </div>

        {/* Stripe CTA */}
        {error && (
          <div className="mt-5 flex items-start gap-2 p-3 rounded-2xl bg-red-50 border-2 border-red-200" role="alert">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-red-600">{error}</p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubscribe}
          disabled={loading}
          className="btn-3d shimmer mt-5 w-full h-14 rounded-2xl bg-orange-500 text-white font-display text-lg flex items-center justify-center gap-2 [--btn-edge:#c2410c] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Crown size={18} />
              สมัคร Pro ด้วย Stripe
            </>
          )}
        </motion.button>
      </motion.section>

      {/* Renewal note: plain hint, no box */}
      <div className="flex items-start gap-3 px-2">
        <RefreshCcw size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-700 font-extrabold">ต่ออายุอัตโนมัติทุกเดือน</p>
          <p className="text-xs font-bold text-amber-600 mt-0.5">ยกเลิกได้ตลอดเวลาผ่าน Stripe portal ไม่มีค่าปรับ</p>
        </div>
      </div>

      {/* Trust line */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-extrabold text-gray-500">
        <span>🔒 ชำระผ่าน Stripe</span>
        <span>💳 จ่ายด้วยบัตรได้</span>
        <span className="flex items-center gap-1">
          <Heart size={10} className="text-rose-400 fill-rose-400" />
          ยกเลิกได้ทุกเมื่อ
        </span>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribeContent />
    </Suspense>
  );
}
