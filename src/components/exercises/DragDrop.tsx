"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      <p className="text-xl font-bold text-gray-900 text-center">{question}</p>

      {/* Answer area */}
      <div className="min-h-[60px] bg-white border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
        {selected.length === 0 ? (
          <span className="text-gray-400 text-sm">Tap words to build your answer...</span>
        ) : (
          selected.map((word, i) => (
            <motion.button
              key={i}
              layout
              onClick={() => removeWord(i)}
              className="px-4 py-2 bg-orange-100 text-orange-800 rounded-xl text-sm font-bold thai-text border-2 border-orange-200 hover:border-orange-400 transition-all active:scale-95"
            >
              {word}
            </motion.button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center">
        {available.map((word, i) => (
          <motion.button
            key={`${word}-${i}`}
            layout
            onClick={() => addWord(word)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-800 rounded-xl text-sm font-bold thai-text shadow-sm transition-all"
          >
            {word}
          </motion.button>
        ))}
      </div>

      <Button
        onClick={handleCheck}
        disabled={selected.length === 0 || disabled}
        size="lg"
        className="mt-2"
      >
        Check Answer
      </Button>
    </div>
  );
}
