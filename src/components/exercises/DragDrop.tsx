"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { DragDropOptions } from "@/types/lesson";

interface DragDropProps {
  question: string;
  options: DragDropOptions;
  correctAnswer: string[];
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function DragDrop({ question, options, correctAnswer, onAnswer, disabled }: DragDropProps) {
  const [available, setAvailable] = useState<string[]>([...options.words].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<string[]>([]);
  const { t, tc } = useTranslation();

  const addWord = (word: string) => {
    if (disabled) return;
    setAvailable((prev) => {
      const idx = prev.indexOf(word);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setSelected((prev) => [...prev, word]);
  };

  const removeWord = (index: number) => {
    if (disabled) return;
    const word = selected[index];
    setSelected((prev) => prev.filter((_, i) => i !== index));
    setAvailable((prev) => [...prev, word]);
  };

  const handleCheck = () => {
    const isCorrect = JSON.stringify(selected) === JSON.stringify(correctAnswer);
    onAnswer(isCorrect);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="game-card relative px-4 py-6 overflow-hidden">
        <span className="absolute -top-2 -right-2 text-6xl opacity-10 select-none pointer-events-none" aria-hidden="true">🧩</span>
        <p className="relative text-xl font-display text-gray-900 text-center">{tc(question)}</p>
      </div>

      {/* Answer area */}
      <div className="min-h-[76px] rounded-3xl border-[3px] border-dashed border-orange-200 bg-orange-50/70 p-3 sm:p-4 flex flex-wrap gap-2 items-center">
        {selected.length === 0 ? (
          <span className="w-full text-center text-gray-400 text-sm font-bold">{t("ex.tapWords")}</span>
        ) : (
          selected.map((word, i) => (
            <motion.div key={i} layout>
              <button
                onClick={() => removeWord(i)}
                className="btn-3d px-4 py-2.5 bg-orange-100 text-orange-800 rounded-2xl text-base font-extrabold thai-text border-[3px] border-orange-300 [--btn-edge:#fdba74] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
              >
                {word}
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {available.map((word, i) => (
          <motion.div key={`${word}-${i}`} layout>
            <button
              onClick={() => addWord(word)}
              className="btn-3d px-4 py-3 bg-white border-[3px] border-[var(--game-edge)] hover:border-orange-300 hover:bg-orange-50 text-gray-800 rounded-2xl text-base font-extrabold thai-text [--btn-edge:var(--game-edge)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
            >
              {word}
            </button>
          </motion.div>
        ))}
      </div>

      <Button
        onClick={handleCheck}
        disabled={selected.length === 0 || disabled}
        size="lg"
        className="mt-2 w-full font-display text-lg"
      >
        {t("ex.checkAnswer")}
      </Button>
    </div>
  );
}
