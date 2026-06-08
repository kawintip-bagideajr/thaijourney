"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { ThaiText } from "@/components/shared/ThaiText";
import { cn } from "@/lib/utils";
import type { MultipleChoiceOptions } from "@/types/lesson";

interface MultipleChoiceProps {
  question: string;
  thaiText?: string;
  romanization?: string;
  audioUrl?: string;
  options: MultipleChoiceOptions;
  correctAnswer: string;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoice({
  question,
  thaiText,
  romanization,
  audioUrl,
  options,
  correctAnswer,
  onAnswer,
  disabled,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (disabled || selected) return;
    setSelected(id);
    onAnswer(id === correctAnswer);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Question display */}
      <div className="flex flex-col items-center gap-4 py-6">
        {audioUrl && <AudioPlayer url={audioUrl} size="lg" />}
        {thaiText ? (
          <ThaiText thai={thaiText} romanization={romanization} size="xl" />
        ) : (
          <p className="text-2xl font-bold text-gray-900 text-center">{question}</p>
        )}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.choices.map((choice, i) => {
          const isSelected = selected === choice.id;
          const isCorrect = choice.id === correctAnswer;
          const showResult = selected !== null;

          return (
            <motion.button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              disabled={!!selected || disabled}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={!selected ? { scale: 1.02 } : {}}
              whileTap={!selected ? { scale: 0.98 } : {}}
              className={cn(
                "relative p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all duration-200",
                !showResult && "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50",
                showResult && isSelected && isCorrect && "border-green-400 bg-green-50 text-green-800",
                showResult && isSelected && !isCorrect && "border-red-400 bg-red-50 text-red-800 animate-shake",
                showResult && !isSelected && isCorrect && "border-green-300 bg-green-50 text-green-700",
                showResult && !isSelected && !isCorrect && "border-gray-100 bg-gray-50 text-gray-400 opacity-60"
              )}
            >
              <span className="absolute left-4 top-4 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="pl-8">
                {choice.thai ? (
                  <span className="thai-text text-lg">{choice.thai}</span>
                ) : (
                  choice.text
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
