"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThaiText } from "@/components/shared/ThaiText";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { useRecorder } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface PronunciationPracticeProps {
  thaiText: string;
  romanization?: string;
  audioUrl?: string;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function PronunciationPractice({
  thaiText,
  romanization,
  audioUrl,
  onAnswer,
  disabled,
}: PronunciationPracticeProps) {
  const { startRecording, stopRecording, isRecording, audioBlob } = useRecorder();
  const [score, setScore] = useState<number | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const { t } = useTranslation();

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setIsAnalysing(true);
      // Simulate AI scoring (replace with real API call)
      await new Promise((r) => setTimeout(r, 1500));
      const mockScore = Math.floor(Math.random() * 40) + 60;
      setScore(mockScore);
      setIsAnalysing(false);
      onAnswer(mockScore >= 70);
    } else {
      await startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-7 py-2">
      <div className="game-card relative w-full flex flex-col items-center gap-4 py-8 px-4 overflow-hidden">
        <span className="absolute -top-2 -right-2 text-6xl opacity-10 select-none pointer-events-none" aria-hidden="true">🎤</span>
        <ThaiText thai={thaiText} romanization={romanization} size="xl" />

        {audioUrl && (
          <div className="flex items-center gap-3 rounded-2xl bg-sky-50 border-2 border-sky-200 px-3 py-2">
            <AudioPlayer url={audioUrl} size="lg" />
            <span className="text-sm font-bold text-sky-700">{t("ex.listenFirst")}</span>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={handleRecord}
          disabled={disabled || isAnalysing}
          className={cn(
            "btn-3d w-24 h-24 rounded-full flex items-center justify-center border-4 border-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
            isRecording
              ? "bg-red-500 [--btn-edge:#b91c1c]"
              : "bg-orange-500 [--btn-edge:#c2410c]"
          )}
        >
          {isRecording ? (
            <MicOff size={36} className="text-white" />
          ) : (
            <Mic size={36} className="text-white" />
          )}
        </button>

        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-pulse-ring pointer-events-none" />
        )}
      </div>

      <p className={cn(
        "text-sm font-extrabold rounded-full px-4 py-1.5 border-2",
        isRecording ? "text-red-600 bg-red-50 border-red-200" : "text-gray-500 bg-white border-[var(--game-edge)]"
      )}>
        {isRecording ? t("ex.recording") : t("ex.tapRecord")}
      </p>

      <AnimatePresence>
        {isAnalysing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-orange-500"
          >
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce" />
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:0.1s]" />
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
            <span className="ml-2 text-sm font-bold">{t("ex.analysing")}</span>
          </motion.div>
        )}

        {score !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              "game-card text-center px-8 py-5 min-w-[200px]",
            )}
          >
            <div className="text-3xl mb-1" aria-hidden="true">
              {score >= 90 ? "🌟" : score >= 70 ? "👍" : "💪"}
            </div>
            <div className={cn(
              "font-display text-6xl tabular-nums leading-none mb-2",
              score >= 90 ? "text-green-500" :
              score >= 70 ? "text-orange-500" : "text-red-500"
            )}>
              {score}%
            </div>
            <p className="text-gray-500 text-sm font-bold">
              {score >= 90 ? t("ex.scorePerfect") : score >= 70 ? t("ex.scoreGood") : t("ex.scoreKeep")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
