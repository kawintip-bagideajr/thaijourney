"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Copy, Check, QrCode, Zap, RefreshCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const PROMPTPAY_ID = "0812345678";
const MONTHLY_THB = 175;
const MONTHLY_USD = 5;

export default function SubscribePage() {
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activated, setActivated] = useState(false);

  const isPro = profile?.access_tier === "pro";

  const copyId = () => {
    navigator.clipboard.writeText(PROMPTPAY_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      await fetch("/api/user/upgrade", { method: "POST" });
      updateProfile({ access_tier: "pro" });
    } catch {}
    setActivated(true);
  };

  if (activated || isPro) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 pb-28 flex flex-col items-center text-center space-y-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="w-20 h-20 gradient-thai rounded-3xl flex items-center justify-center"
        >
          <Crown size={36} className="text-white" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-black text-gray-900">
            {activated && !isPro ? "Pro Activated! 🎉" : "You're already Pro!"}
          </h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Welcome to Pro. All AI features are unlocked. Your subscription renews monthly — just repeat the payment each month to stay Pro.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-2"
        >
          {["Kru AI Chat ✓", "Grammar Checker ✓", "AI Dictionary ✓"].map((f) => (
            <div key={f} className="flex items-center gap-2 p-3 bg-orange-50 rounded-2xl">
              <Sparkles size={14} className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">{f}</span>
            </div>
          ))}
        </motion.div>
        <Link href="/chat">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="gradient-thai text-white font-black px-8 py-3.5 rounded-2xl flex items-center gap-2"
          >
            <Zap size={16} />
            Start Using AI Features
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Header */}
      <div className="gradient-thai rounded-3xl p-6 text-white text-center">
        <Crown size={32} className="mx-auto mb-3" />
        <h1 className="text-2xl font-black">Pro Subscription</h1>
        <div className="flex items-baseline justify-center gap-1 mt-2">
          <span className="text-4xl font-black">${MONTHLY_USD}</span>
          <span className="text-lg opacity-80">/ month</span>
        </div>
        <p className="text-sm opacity-70 mt-1">≈ ฿{MONTHLY_THB} / month</p>
      </div>

      {/* What you get */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Included in Pro</p>
        {[
          "Kru AI Chat — unlimited Thai tutoring",
          "AI Grammar Checker for Thai sentences",
          "Smart AI Dictionary with examples",
          "Priority support",
        ].map((f) => (
          <div key={f} className="flex items-center gap-2">
            <Check size={14} className="text-orange-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{f}</span>
          </div>
        ))}
      </div>

      {/* Renewal note */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <RefreshCcw size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Monthly renewal:</strong> Your Pro access lasts 30 days from activation.
          To renew, simply repeat the payment each month and tap "I've paid."
        </p>
      </div>

      {/* Payment info */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <QrCode size={16} className="text-gray-500" />
            Pay ฿{MONTHLY_THB} via PromptPay
          </h2>
        </div>
        <div className="p-6 flex flex-col items-center gap-4">
          {/* QR placeholder */}
          <div className="w-44 h-44 bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <QrCode size={44} className="mx-auto mb-2 text-gray-300" />
              <p className="text-xs text-gray-400">QR Code</p>
              <p className="text-xs text-gray-400">(available after setup)</p>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-gray-400 mb-1 text-center">PromptPay number</p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
              <span className="flex-1 font-mono font-bold text-gray-900 tracking-widest text-center">
                {PROMPTPAY_ID}
              </span>
              <button onClick={copyId} className="text-gray-400">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="w-full bg-blue-50 rounded-xl p-3">
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              Transfer <strong>฿{MONTHLY_THB}</strong> and include your
              <strong> username</strong> in the payment note.
              Then tap <strong>"I've paid"</strong> below.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowConfirm(true)}
        className="w-full gradient-thai text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
      >
        <Crown size={18} />
        I&apos;ve paid — Activate Pro!
      </motion.button>

      <p className="text-center text-xs text-gray-400 px-4">
        Activation is instant after confirmation. For questions, contact us via the app.
      </p>

      {/* Confirm modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4"
            >
              <div className="text-center">
                <div className="w-12 h-12 gradient-thai rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <Crown size={22} className="text-white" />
                </div>
                <h3 className="font-black text-gray-900">Confirm Payment</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Did you transfer <strong>฿{MONTHLY_THB}</strong> to PromptPay <strong>{PROMPTPAY_ID}</strong>?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm"
                >
                  Not yet
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-2xl gradient-thai text-white font-bold text-sm"
                >
                  Yes, activate!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
