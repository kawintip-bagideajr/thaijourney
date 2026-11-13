"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2 } from "lucide-react";
import { speakThai } from "@/lib/speech";
import type { ThaiConsonant } from "@/data/alphabet";
import { cn } from "@/lib/utils";

interface ConsonantDetailModalProps {
  consonant: ThaiConsonant | null;
  onClose: () => void;
}

const classColors = {
  high: { bg: "bg-sky-50 border-sky-200", text: "text-sky-700", badge: "bg-sky-100 border-sky-200 text-sky-700", btn: "bg-sky-500 [--btn-edge:#0369a1]" },
  mid:  { bg: "bg-orange-50 border-orange-200", text: "text-orange-700", badge: "bg-orange-100 border-orange-200 text-orange-700", btn: "bg-orange-500 [--btn-edge:#c2410c]" },
  low:  { bg: "bg-green-50 border-green-200", text: "text-green-700", badge: "bg-green-100 border-green-200 text-green-700", btn: "bg-green-500 [--btn-edge:#15803d]" },
};

export function ConsonantDetailModal({ consonant, onClose }: ConsonantDetailModalProps) {
  if (!consonant) return null;
  const c = classColors[consonant.class];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="game-card !rounded-b-none sm:!rounded-3xl w-full max-w-sm overflow-hidden p-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn("rounded-2xl border-2 px-4 py-3 flex items-center justify-between", c.bg)}>
            <div>
              <span className={cn("text-[11px] font-black px-2.5 py-1 rounded-full border-2", c.badge)}>
                <span className="capitalize">{consonant.class}</span> class
              </span>
              <p className={cn("text-sm font-extrabold mt-1.5", c.text)}>
                /{consonant.rtgs}/ · RTGS
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="btn-3d w-10 h-10 rounded-2xl bg-white border-2 border-[var(--game-edge)] [--btn-edge:var(--game-edge)] flex items-center justify-center text-gray-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Main content */}
          <div className="px-3 pt-5 pb-3 space-y-5">
            {/* Thai character + pronunciation button */}
            <div className="flex items-center justify-between gap-3">
              <span className={cn("thai-text font-black", "text-[80px] leading-none drop-shadow-sm", c.text)}>
                {consonant.thai}
              </span>
              <button
                onClick={() => speakThai(consonant.thai)}
                className={cn(
                  "btn-3d w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
                  c.btn
                )}
              >
                <Volume2 size={24} className="text-white" strokeWidth={2.5} />
                <span className="text-[11px] text-white font-extrabold">Pronounce</span>
              </button>
            </div>

            {/* IPA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3 text-center">
                <p className="text-[11px] text-gray-500 font-extrabold mb-1">Initial sound</p>
                <p className="font-display text-gray-900 text-xl">/{consonant.ipaInitial}/</p>
                <p className="text-xs font-bold text-gray-500 mt-0.5">at start of syllable</p>
              </div>
              <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3 text-center">
                <p className="text-[11px] text-gray-500 font-extrabold mb-1">Final sound</p>
                <p className="font-display text-gray-900 text-xl">/{consonant.ipaFinal}/</p>
                <p className="text-xs font-bold text-gray-500 mt-0.5">at end of syllable</p>
              </div>
            </div>

            {/* Example word */}
            <div className={cn("rounded-2xl border-2 p-4 flex items-center gap-3", c.bg)}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-2 bg-white border-[var(--game-edge)] shrink-0" aria-hidden="true">
                💡
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500 font-extrabold mb-1">Example word</p>
                <button
                  onClick={() => speakThai(consonant.example)}
                  className={cn("thai-text text-2xl font-black flex items-center gap-2 rounded-lg hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200", c.text)}
                >
                  {consonant.example}
                  <Volume2 size={16} />
                </button>
                <p className="text-sm font-bold text-gray-600 mt-0.5 capitalize">{consonant.exampleMeaning}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
