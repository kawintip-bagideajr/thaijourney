"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThaiText } from "@/components/shared/ThaiText";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { useRecorder } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col items-center gap-8 py-6">
      <ThaiText thai={thaiText} romanization={romanization} size="xl" />

      {audioUrl && (
        <div className="flex items-center gap-3">
          <AudioPlayer url={audioUrl} size="lg" />
          <span className="text-sm text-gray-500">Listen first</span>
        </div>
      )}

      <div className="relative">
        <motion.button
          onClick={handleRecord}
          disabled={disabled || isAnalysing}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-200",
            isRecording
              ? "bg-red-500 shadow-red-200 shadow-2xl"
              : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
          )}
        >
          {isRecording ? (
            <MicOff size={36} className="text-white" />
          ) : (
            <Mic size={36} className="text-white" />
          )}
        </motion.button>

        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-pulse-ring pointer-events-none" />
        )}
      </div>

      <p className="text-sm text-gray-500">
        {isRecording ? "Recording... tap to stop" : "Tap to start recording"}
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
            <span className="ml-2 text-sm">Analysing pronunciation...</span>
          </motion.div>
        )}

        {score !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className={cn(
              "text-6xl font-black mb-2",
              score >= 90 ? "text-green-500" :
              score >= 70 ? "text-orange-500" : "text-red-500"
            )}>
              {score}%
            </div>
            <p className="text-gray-500 text-sm">
              {score >= 90 ? "Perfect!" : score >= 70 ? "Good job!" : "Keep practising!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
