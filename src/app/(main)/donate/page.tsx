"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, Check, Crown, QrCode, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const AMOUNTS = [
  { label: "฿50", value: 50, desc: "Buy us a coffee ☕" },
  { label: "฿100", value: 100, desc: "Get Pro Access 🌟" },
  { label: "฿200", value: 200, desc: "Super supporter 🙏" },
  { label: "Custom", value: 0, desc: "Your amount" },
];

export default function DonatePage() {
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [selected, setSelected] = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const isPro = profile?.access_tier === "pro";
  const amount = AMOUNTS[selected].value || parseInt(customAmount) || 0;
  const promptPayId = "0812345678";

  const copyPromptPay = () => {
    navigator.clipboard.writeText(promptPayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDonation = async () => {
    setShowConfirm(false);
    try {
      await fetch("/api/user/upgrade", { method: "POST" });
      updateProfile({ access_tier: "pro" });
      setConfirmed(true);
    } catch {
      setConfirmed(true);
    }
  };

  if (confirmed || isPro) {
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
            {confirmed && !isPro ? "Pro Activated! 🎉" : "You have Pro Access!"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Thank you so much for supporting ThaiJN. All AI features are now unlocked for you!
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
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Header */}
      <div className="gradient-thai rounded-3xl p-6 text-white text-center">
        <Heart size={32} className="mx-auto mb-3 fill-white/40" />
        <h1 className="text-2xl font-black">Support ThaiJN</h1>
        <p className="text-sm opacity-80 mt-1">
          Help us keep Thai learning free & AI-powered
        </p>
      </div>

      {/* Amount picker */}
      <div>
        <h2 className="font-bold text-gray-700 text-sm mb-3">Choose amount</h2>
        <div className="grid grid-cols-2 gap-3">
          {AMOUNTS.map((a, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-colors",
                selected === i
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-100 bg-white"
              )}
            >
              <p className="font-black text-gray-900 text-lg">{a.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
              {i === 1 && (
                <span className="inline-block mt-1.5 text-[9px] font-black gradient-thai text-white px-2 py-0.5 rounded-full">
                  RECOMMENDED
                </span>
              )}
            </motion.button>
          ))}
        </div>
        {selected === 3 && (
          <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-gray-500 font-bold">฿</span>
            <input
              type="number"
              min={1}
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 font-bold text-lg"
            />
          </div>
        )}
      </div>

      {amount >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-2xl"
        >
          <Crown size={14} className="text-amber-500" />
          <p className="text-xs font-bold text-amber-700">
            Donating ฿100+ activates Pro Access for your account!
          </p>
        </motion.div>
      )}

      {/* Payment info */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <QrCode size={16} className="text-gray-500" />
            Pay via PromptPay
          </h2>
        </div>

        {/* QR placeholder */}
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm font-medium">
            <div className="text-center">
              <QrCode size={40} className="mx-auto mb-2 text-gray-300" />
              <p className="text-xs">QR Code</p>
              <p className="text-xs">(shown after setup)</p>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-gray-400 mb-1 text-center">PromptPay number</p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
              <span className="flex-1 font-mono font-bold text-gray-900 tracking-widest text-center">
                {promptPayId}
              </span>
              <button onClick={copyPromptPay} className="text-gray-400">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="w-full bg-blue-50 rounded-xl p-3">
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              Transfer to the number above, then tap <strong>"I've donated"</strong> below.
              Include your username in the note if possible.
            </p>
          </div>
        </div>
      </div>

      {/* Confirm button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowConfirm(true)}
        className="w-full gradient-thai text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
      >
        <Heart size={18} className="fill-white/60" />
        I&apos;ve donated ฿{amount || "–"} — Activate Pro!
      </motion.button>

      <p className="text-center text-xs text-gray-400">
        After confirmation, Pro Access is activated instantly on your account.
        Manual verification may take up to 24h for large amounts.
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
                <h3 className="font-black text-gray-900">Confirm Donation</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Did you transfer <strong>฿{amount}</strong> to PromptPay {promptPayId}?
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
                  onClick={handleConfirmDonation}
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
