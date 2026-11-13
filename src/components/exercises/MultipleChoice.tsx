"use client";
import { useState } from "react";
import { Volume2 } from "lucide-react";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { ThaiText } from "@/components/shared/ThaiText";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";
import { useTranslation } from "@/lib/i18n/useTranslation";
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
  const { t, tc } = useTranslation();

  const handleSelect = (id: string) => {
    if (disabled || selected) return;
    setSelected(id);
    onAnswer(id === correctAnswer);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Question display */}
      <div className="game-card relative flex flex-col items-center gap-4 py-8 px-4 overflow-hidden">
        <span className="absolute -top-2 -right-2 text-6xl opacity-10 select-none pointer-events-none" aria-hidden="true">💬</span>
        {audioUrl && <AudioPlayer url={audioUrl} size="lg" />}
        {thaiText ? (
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <ThaiText thai={thaiText} romanization={romanization} size="xl" />
            <button
              onClick={() => speakThai(thaiText)}
              className="btn-3d flex-shrink-0 w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white [--btn-edge:#0369a1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
              title={t("ex.listenThai")}
              aria-label={t("ex.listenThai")}
            >
              <Volume2 size={22} />
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold text-gray-900 text-center">{tc(question)}</p>
        )}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.choices.map((choice, i) => {
          const isSelected = selected === choice.id;
          const isCorrect = choice.id === correctAnswer;
          const showResult = selected !== null;

          return (
            <div key={choice.id}>
              <button
                onClick={() => handleSelect(choice.id)}
                disabled={!!selected || disabled}
                className={cn(
                  "btn-3d relative w-full p-4 min-h-[72px] rounded-2xl border-[3px] text-left font-extrabold text-base text-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100",
                  !showResult && "border-[var(--game-edge)] bg-white hover:border-orange-300 hover:bg-orange-50 [--btn-edge:var(--game-edge)]",
                  showResult && isSelected && isCorrect && "border-green-500 bg-green-100 text-green-800 [--btn-edge:#22c55e]",
                  showResult && isSelected && !isCorrect && "border-red-500 bg-red-100 text-red-800 animate-shake [--btn-edge:#ef4444]",
                  showResult && !isSelected && isCorrect && "border-green-400 bg-green-50 text-green-700 [--btn-edge:#86efac]",
                  showResult && !isSelected && !isCorrect && "border-gray-200 bg-gray-50 text-gray-400 opacity-60 [--btn-edge:var(--game-edge)]"
                )}
              >
                <span className={cn(
                  "absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl border-2 flex items-center justify-center text-xs font-black",
                  showResult && isCorrect ? "border-green-400 bg-green-500 text-white"
                    : showResult && isSelected ? "border-red-400 bg-red-500 text-white"
                    : "border-[var(--game-edge)] bg-orange-50 text-orange-600"
                )}>
                  {showResult && isCorrect ? "✓" : showResult && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <span className="block pl-11">
                  {choice.thai ? (
                    <span className="thai-text text-lg">{choice.thai}</span>
                  ) : (
                    tc(choice.text)
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
