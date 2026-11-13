"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface FillBlankProps {
  sentence: string;
  correctAnswer: string;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
  hint?: string;
}

export function FillBlank({ sentence, correctAnswer, onAnswer, disabled, hint }: FillBlankProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, tc } = useTranslation();

  const handleSubmit = () => {
    if (!value.trim()) return;
    const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase() ||
                      value.trim() === correctAnswer;
    onAnswer(isCorrect);
  };

  const parts = sentence.split("___");

  return (
    <div className="flex flex-col gap-6">
      <div className="game-card relative flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-gray-900 py-8 px-4 overflow-hidden">
        <span className="absolute -top-2 -right-2 text-6xl opacity-10 select-none pointer-events-none" aria-hidden="true">✏️</span>
        {parts.map((part, i) => (
          <span key={i} className="thai-text">
            {part}
            {i < parts.length - 1 && (
              <span className={cn(
                "inline-block align-middle min-w-[88px] h-10 mx-1 rounded-xl border-2 border-dashed text-center px-2 leading-9",
                value.trim() ? "border-orange-400 bg-orange-50 text-orange-700" : "border-orange-300 bg-orange-50/60"
              )}>
                <span className="opacity-0">_</span>
              </span>
            )}
          </span>
        ))}
      </div>

      {hint && (
        <p className="text-center text-sm font-bold text-gray-500 italic bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-2 mx-auto">
          <span aria-hidden="true">💡 </span>{t("ex.hint", { hint: tc(hint) })}
        </p>
      )}

      <div className="flex gap-3 max-w-sm mx-auto w-full">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          placeholder={t("ex.typeAnswer")}
          className="thai-text text-lg text-center h-14 min-w-0"
          autoFocus
        />
        <Button onClick={handleSubmit} disabled={!value.trim() || disabled} size="lg" className="px-6 font-display text-base flex-shrink-0">
          {t("ex.check")}
        </Button>
      </div>
    </div>
  );
}
