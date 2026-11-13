"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { cn, MAX_HEARTS } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";
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
  const { t, tc } = useTranslation();
  const progress = ((currentIndex) / exercises.length) * 100;
  const exercise = exercises[currentIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header — game HUD */}
      <div className="sticky top-0 z-10 px-3 sm:px-4 pt-3 pb-2">
        <div className="game-card max-w-2xl mx-auto flex items-center gap-2.5 sm:gap-4 px-2.5 sm:px-3 py-2.5">
          <button
            onClick={onQuit}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors rounded-2xl border-2 border-[var(--game-edge)] bg-gray-50 hover:bg-red-50 hover:border-red-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
          >
            <X size={20} strokeWidth={3} />
          </button>
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <ProgressBar value={progress} animated className="h-4 bg-gray-100 border border-gray-200 shadow-none" />
            <span className="hidden sm:inline text-[11px] font-extrabold text-gray-500 tabular-nums flex-shrink-0">
              {currentIndex + 1}/{exercises.length}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0 rounded-2xl bg-red-50 border-2 border-red-100 px-1.5 sm:px-2 py-1">
            <div className="flex items-center gap-0.5 sm:gap-1">
              {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={i === hearts - 1 && hearts <= 2 && hearts > 0
                    ? { scale: [1, 1.3, 1] }
                    : {}}
                  transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 0.5 }}
                >
                  <Heart
                    size={18}
                    strokeWidth={2.5}
                    className={cn(
                      "transition-all duration-300",
                      i < hearts ? "text-red-500 fill-red-500 drop-shadow-[0_2px_0_#b91c1c]" : "text-gray-300 fill-gray-100"
                    )}
                  />
                </motion.div>
              ))}
            </div>
            {hearts <= 2 && hearts > 0 && (
              <span className="text-[9px] text-red-500 font-extrabold leading-none">
                {hearts === 1 ? "⚠️ เหลือ 1!" : `เหลือ ${hearts}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Exercise content — bottom padding leaves room for the fixed feedback panel */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 pt-6 pb-56 sm:pb-36">
        {exercise?.instruction && (
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-2 bg-orange-50 border-orange-200 flex-shrink-0" aria-hidden="true">
              🐘
            </span>
            <p className="text-xl font-display text-gray-800 leading-tight min-w-0">
              {tc(exercise.instruction)}
            </p>
          </div>
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
              "fixed bottom-0 left-0 right-0 z-50 px-4 pt-5 border-t-4 rounded-t-[2rem]",
              "pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
              "shadow-[0_-10px_24px_-14px_rgba(0,0,0,0.25)]",
              isCorrect
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            )}
          >
            <div className="max-w-2xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <motion.span
                  initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  aria-hidden="true"
                  className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border-[3px] bg-white",
                    isCorrect ? "border-green-400 shadow-[0_4px_0_#4ade80]" : "border-red-400 shadow-[0_4px_0_#f87171]")}
                >
                  {isCorrect ? "🎉" : "😅"}
                </motion.span>
                <div className="min-w-0">
                  <p className={cn("font-display text-2xl leading-tight", isCorrect ? "text-green-700" : "text-red-700")}>
                    {isCorrect ? t("ex.correct") : t("ex.incorrect")}
                  </p>
                  {!isCorrect && exercise?.explanation && (
                    <p className="text-sm font-bold text-red-600 mt-1 break-words">{exercise.explanation}</p>
                  )}
                </div>
              </div>
              <Button
                onClick={onNext}
                variant={isCorrect ? "success" : "destructive"}
                size="lg"
                className="w-full sm:w-auto sm:min-w-[160px] flex-shrink-0 font-display text-lg"
              >
                {t("lesson.continue")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
