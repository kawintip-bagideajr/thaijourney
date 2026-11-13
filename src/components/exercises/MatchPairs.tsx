"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";
import { useTranslation } from "@/lib/i18n/useTranslation";
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
  const { t, tc } = useTranslation();

  // useState lazy init runs once per mount — English column order never reshuffles
  const [shuffledEnglish] = useState(() =>
    [...options.pairs].sort(() => Math.random() - 0.5)
  );

  const handleThaiClick = (id: string, thaiText: string) => {
    if (disabled || matched[id]) return;
    speakThai(thaiText);
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

  const tile =
    "btn-3d w-full p-3 sm:p-4 min-h-[60px] rounded-2xl border-[3px] text-center font-extrabold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 disabled:cursor-default";

  return (
    <div className="flex gap-2 sm:gap-4">
      {/* Thai column */}
      <div className="flex-1 min-w-0 flex flex-col gap-2.5 sm:gap-3">
        <p className="text-xs font-extrabold text-gray-500 text-center mb-1">
          <span aria-hidden="true">🇹🇭 </span>{t("ex.thai")}
        </p>
        {options.pairs.map((pair) => (
          <button
            key={pair.id}
            onClick={() => handleThaiClick(pair.id, pair.thai)}
            aria-pressed={selectedThai === pair.id}
            className={cn(
              tile,
              "thai-text text-lg sm:text-xl",
              matched[pair.id] && "border-green-400 bg-green-100 text-green-700 opacity-60 [--btn-edge:#86efac]",
              selectedThai === pair.id && !matched[pair.id] && "border-orange-400 bg-orange-100 text-orange-800 -translate-y-1 [--btn-edge:#fb923c]",
              !matched[pair.id] && selectedThai !== pair.id && "border-[var(--game-edge)] bg-white text-gray-800 hover:border-orange-300 hover:bg-orange-50 [--btn-edge:var(--game-edge)]"
            )}
          >
            {pair.thai}
          </button>
        ))}
      </div>

      {/* English column */}
      <div className="flex-1 min-w-0 flex flex-col gap-2.5 sm:gap-3">
        <p className="text-xs font-extrabold text-gray-500 text-center mb-1">
          <span aria-hidden="true">🔤 </span>{t("ex.english")}
        </p>
        {shuffledEnglish.map((pair) => (
          <button
            key={pair.id}
            onClick={() => handleEnglishClick(pair.id)}
            className={cn(
              tile,
              "text-sm break-words",
              matched[pair.id] && "border-green-400 bg-green-100 text-green-700 opacity-60 [--btn-edge:#86efac]",
              wrong === pair.id && "border-red-500 bg-red-100 text-red-700 animate-shake [--btn-edge:#ef4444]",
              !matched[pair.id] && wrong !== pair.id && "border-[var(--game-edge)] bg-white text-gray-800 hover:border-orange-300 hover:bg-orange-50 [--btn-edge:var(--game-edge)]"
            )}
          >
            {tc(pair.english)}
          </button>
        ))}
      </div>
    </div>
  );
}
