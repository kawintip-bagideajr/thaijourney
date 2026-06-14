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
  high: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", gradient: "from-blue-400 to-blue-600" },
  mid:  { bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-100 text-orange-700", gradient: "from-orange-400 to-orange-600" },
  low:  { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700", gradient: "from-green-400 to-green-600" },
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
        className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn("px-6 pt-6 pb-4 flex items-center justify-between", c.bg)}>
            <div>
              <span className={cn("text-xs font-black uppercase tracking-wider px-2 py-1 rounded-lg", c.badge)}>
                {consonant.class.toUpperCase()} CLASS
              </span>
              <p className={cn("text-sm font-semibold mt-1", c.text)}>
                /{consonant.rtgs}/ · RTGS
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-gray-500 hover:bg-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Main content */}
          <div className="px-6 py-6 space-y-6">
            {/* Thai character + pronunciation button */}
            <div className="flex items-center justify-between">
              <span className={cn("thai-text font-black", "text-[80px] leading-none", c.text)}>
                {consonant.thai}
              </span>
              <button
                onClick={() => speakThai(consonant.thai)}
                className={cn(
                  "w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md transition-all active:scale-95",
                  `bg-gradient-to-br ${c.gradient}`
                )}
              >
                <Volume2 size={22} className="text-white" />
                <span className="text-[10px] text-white font-bold">Pronounce</span>
              </button>
            </div>

            {/* IPA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Initial sound</p>
                <p className="font-black text-gray-900 text-lg">/{consonant.ipaInitial}/</p>
                <p className="text-xs text-gray-500 mt-0.5">at start of syllable</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Final sound</p>
                <p className="font-black text-gray-900 text-lg">/{consonant.ipaFinal}/</p>
                <p className="text-xs text-gray-500 mt-0.5">at end of syllable</p>
              </div>
            </div>

            {/* Example word */}
            <div className={cn("rounded-2xl p-4 flex items-center justify-between", c.bg)}>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Example word</p>
                <button
                  onClick={() => speakThai(consonant.example)}
                  className={cn("thai-text text-2xl font-black flex items-center gap-2", c.text)}
                >
                  {consonant.example}
                  <Volume2 size={14} />
                </button>
                <p className="text-sm text-gray-600 mt-0.5 capitalize">{consonant.exampleMeaning}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
