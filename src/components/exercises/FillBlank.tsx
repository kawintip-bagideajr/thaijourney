"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

  const handleSubmit = () => {
    if (!value.trim()) return;
    const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase() ||
                      value.trim() === correctAnswer;
    onAnswer(isCorrect);
  };

  const parts = sentence.split("___");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-gray-900 py-6">
        {parts.map((part, i) => (
          <span key={i} className="thai-text">
            {part}
            {i < parts.length - 1 && (
              <span className="inline-block border-b-4 border-orange-400 min-w-[80px] mx-1 text-center">
                <span className="opacity-0">_</span>
              </span>
            )}
          </span>
        ))}
      </div>

      {hint && (
        <p className="text-center text-sm text-gray-400 italic">Hint: {hint}</p>
      )}

      <div className="flex gap-3 max-w-sm mx-auto w-full">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          placeholder="Type your answer..."
          className="thai-text text-lg text-center"
          autoFocus
        />
        <Button onClick={handleSubmit} disabled={!value.trim() || disabled}>
          Check
        </Button>
      </div>
    </div>
  );
}
