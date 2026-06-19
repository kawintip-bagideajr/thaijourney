"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, Check, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

const AMOUNTS = [
  { label: "฿50",   value: 50,  desc: "Buy us a coffee ☕" },
  { label: "฿100",  value: 100, desc: "Small treat 🍜" },
  { label: "฿300",  value: 300, desc: "Super supporter 🙏" },
  { label: "Custom", value: 0,  desc: "Your choice" },
];
const MIN_AMOUNT = 50;
const PROMPTPAY_ID = "0812345678";

export default function DonatePage() {
  const [selected, setSelected] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [thanked, setThanked] = useState(false);

  const amount = AMOUNTS[selected].value || parseInt(customAmount) || 0;
  const canConfirm = amount >= MIN_AMOUNT;

  const copyId = () => {
    navigator.clipboard.writeText(PROMPTPAY_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setThanked(true);
  };

  if (thanked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 pb-28 flex flex-col items-center text-center space-y-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center"
        >
          <Heart size={36} className="text-white fill-white" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-black text-gray-900">Thank you! 🙏</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Your support means the world to us. It helps keep ThaiJN free for learners everywhere.
            ขอบคุณมากๆ นะ!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-rose-50 border border-rose-100 rounded-2xl w-full"
        >
          <p className="text-sm text-rose-700 font-medium">
            💖 Every donation goes directly toward server costs and making the app better for everyone.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Header */}
      <div className="bg-rose-500 rounded-3xl p-6 text-white text-center">
        <Heart size={32} className="mx-auto mb-3 fill-white/40" />
        <h1 className="text-2xl font-black">Support ThaiJN</h1>
        <p className="text-sm opacity-80 mt-1">
          Help us keep Thai learning free for everyone
        </p>
      </div>

      {/* What donations go to */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Your donation helps fund</p>
        {[
          "🖥️  Server & hosting costs",
          "🤖  AI API usage for lessons",
          "✨  New features & content",
          "🆓  Keeping core lessons free",
        ].map((item) => (
          <p key={item} className="text-sm text-gray-700">{item}</p>
        ))}
      </div>

      {/* Amount picker */}
      <div>
        <h2 className="font-bold text-gray-700 text-sm mb-3">
          Choose amount <span className="text-gray-400 font-normal">(minimum ฿{MIN_AMOUNT})</span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {AMOUNTS.map((a, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-colors",
                selected === i
                  ? "border-rose-400 bg-rose-50"
                  : "border-gray-100 bg-white"
              )}
            >
              <p className="font-black text-gray-900 text-lg">{a.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
            </motion.button>
          ))}
        </div>
        {selected === 3 && (
          <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-gray-500 font-bold">฿</span>
            <input
              type="number"
              min={MIN_AMOUNT}
              placeholder={`${MIN_AMOUNT} minimum`}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 font-bold text-lg"
            />
          </div>
        )}
        {selected === 3 && amount > 0 && amount < MIN_AMOUNT && (
          <p className="text-xs text-red-500 mt-2 px-1">Minimum donation is ฿{MIN_AMOUNT}</p>
        )}
      </div>

      {/* Payment info */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <QrCode size={16} className="text-gray-500" />
            Pay via PromptPay
          </h2>
        </div>
        <div className="p-6 flex flex-col items-center gap-4">
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
              Transfer the amount above, then tap <strong>"I've donated"</strong>.
              Include your username in the note if possible.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => canConfirm && setShowConfirm(true)}
        className={cn(
          "w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-opacity",
          canConfirm ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
        )}
      >
        <Heart size={18} className={canConfirm ? "fill-white/60" : ""} />
        {canConfirm ? `Donate ฿${amount}` : `Minimum ฿${MIN_AMOUNT}`}
      </motion.button>

      <p className="text-center text-xs text-gray-400 px-4">
        Donations support the project and do not include any subscription or features.
        {" "}<a href="/subscribe" className="underline">Subscribe to Pro</a> to unlock AI features.
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
                <div className="w-12 h-12 bg-rose-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <Heart size={22} className="text-white fill-white/60" />
                </div>
                <h3 className="font-black text-gray-900">Confirm Donation</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Did you transfer <strong>฿{amount}</strong> to PromptPay {PROMPTPAY_ID}?
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
                  className="flex-1 py-3 rounded-2xl bg-rose-500 text-white font-bold text-sm"
                >
                  Yes, thanks! 🙏
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
