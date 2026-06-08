"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";
import type { ActiveExercise } from "@/types/lesson";

interface ExerciseWrapperProps {
  exercises: ActiveExercise[];
  hearts: number;
  currentIndex: number;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
  onQuit: () => void;
  children: React.ReactNode;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

export function ExerciseWrapper({
  exercises,
  hearts,
  currentIndex,
  onCorrect,
  onWrong,
  onNext,
  onQuit,
  children,
  isAnswered,
  isCorrect,
}: ExerciseWrapperProps) {
  const progress = ((currentIndex) / exercises.length) * 100;
  const exercise = exercises[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onQuit} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
          <div className="flex-1">
            <ProgressBar value={progress} animated />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                size={20}
                className={cn(
                  "transition-all duration-300",
                  i < hearts ? "text-red-500 fill-red-500" : "text-gray-200 fill-gray-100"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exercise content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8">
        {exercise?.instruction && (
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
            {exercise.instruction}
          </p>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer feedback + continue */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 px-4 py-6 border-t-2",
              isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            )}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 size={28} className="text-green-500" />
                ) : (
                  <XCircle size={28} className="text-red-500" />
                )}
                <div>
                  <p className={cn("font-bold text-lg", isCorrect ? "text-green-700" : "text-red-700")}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </p>
                  {!isCorrect && exercise?.explanation && (
                    <p className="text-sm text-red-600">{exercise.explanation}</p>
                  )}
                </div>
              </div>
              <Button
                onClick={onNext}
                variant={isCorrect ? "success" : "destructive"}
                size="lg"
                className="min-w-[120px]"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
