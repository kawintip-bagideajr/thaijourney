"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import type { ThaiConsonant } from "@/data/alphabet";
import { cn } from "@/lib/utils";

interface ConsonantCardProps {
  consonant: ThaiConsonant;
  isFlipped?: boolean;
  onClick?: () => void;
}

const classColors = {
  high: "from-blue-400 to-blue-500",
  mid: "from-orange-400 to-orange-500",
  low: "from-green-400 to-green-500",
};

const classBg = {
  high: "bg-blue-50 border-blue-200",
  mid: "bg-orange-50 border-orange-200",
  low: "bg-green-50 border-green-200",
};

export function ConsonantCard({ consonant, isFlipped, onClick }: ConsonantCardProps) {
  const [flipped, setFlipped] = useState(isFlipped ?? false);

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => { setFlipped((f) => !f); onClick?.(); }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 backface-hidden",
            classBg[consonant.class]
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={cn(
            "w-8 h-5 rounded-full bg-gradient-to-r text-white text-[9px] font-bold flex items-center justify-center",
            classColors[consonant.class]
          )}>
            {consonant.class.toUpperCase()}
          </div>
          <span className="text-6xl thai-text font-bold text-gray-900">{consonant.thai}</span>
          <span className="text-sm font-bold text-gray-500">{consonant.rtgs}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-3 p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-4xl thai-text font-bold text-gray-900">{consonant.thai}</span>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-700">{consonant.example}</p>
            <p className="text-xs text-gray-400">{consonant.exampleMeaning}</p>
          </div>
          <div className="text-xs text-center text-gray-500 space-y-1">
            <p>Initial: <strong>{consonant.ipaInitial}</strong></p>
            <p>Final: <strong>{consonant.ipaFinal}</strong></p>
          </div>
          <AudioPlayer size="sm" label={`Hear ${consonant.thai}`} />
        </div>
      </motion.div>
    </div>
  );
}
