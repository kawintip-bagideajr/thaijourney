"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MatchPairsOptions } from "@/types/lesson";

interface MatchPairsProps {
  options: MatchPairsOptions;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function MatchPairs({ options, onAnswer, disabled }: MatchPairsProps) {
  const [selectedThai, setSelectedThai] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const shuffledEnglish = [...options.pairs].sort(() => Math.random() - 0.5);

  const handleThaiClick = (id: string) => {
    if (disabled || matched[id]) return;
    setSelectedThai(id === selectedThai ? null : id);
    setWrong(null);
  };

  const handleEnglishClick = (id: string) => {
    if (disabled || !selectedThai || matched[id]) return;
    if (selectedThai === id) {
      const newMatched = { ...matched, [id]: true };
      setMatched(newMatched);
      setSelectedThai(null);
      if (Object.keys(newMatched).length === options.pairs.length) {
        onAnswer(true);
      }
    } else {
      setWrong(id);
      onAnswer(false);
      setTimeout(() => setWrong(null), 500);
      setSelectedThai(null);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Thai column */}
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-xs font-bold text-gray-400 uppercase text-center mb-1">Thai</p>
        {options.pairs.map((pair) => (
          <motion.button
            key={pair.id}
            onClick={() => handleThaiClick(pair.id)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "p-4 rounded-2xl border-2 thai-text text-center text-xl font-bold transition-all duration-150",
              matched[pair.id] && "border-green-300 bg-green-50 text-green-700 opacity-60",
              selectedThai === pair.id && !matched[pair.id] && "border-orange-400 bg-orange-50 scale-105",
              !matched[pair.id] && selectedThai !== pair.id && "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            {pair.thai}
          </motion.button>
        ))}
      </div>

      {/* English column */}
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-xs font-bold text-gray-400 uppercase text-center mb-1">English</p>
        {shuffledEnglish.map((pair) => (
          <motion.button
            key={pair.id}
            onClick={() => handleEnglishClick(pair.id)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "p-4 rounded-2xl border-2 text-center text-sm font-semibold transition-all duration-150",
              matched[pair.id] && "border-green-300 bg-green-50 text-green-700 opacity-60",
              wrong === pair.id && "border-red-400 bg-red-50 animate-shake",
              !matched[pair.id] && wrong !== pair.id && "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            {pair.english}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
