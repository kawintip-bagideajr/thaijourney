"use client";
import { useState, use, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, Zap, RotateCcw, Loader2 } from "lucide-react";
import { ExerciseWrapper } from "@/components/exercises/ExerciseWrapper";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { MatchPairs } from "@/components/exercises/MatchPairs";
import { DragDrop } from "@/components/exercises/DragDrop";
import { FillBlank } from "@/components/exercises/FillBlank";
import { PronunciationPractice } from "@/components/exercises/PronunciationPractice";
import { Button } from "@/components/ui/button";
import { GREETINGS_EXERCISES } from "@/data/lessons/greetings";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import type { ActiveExercise } from "@/types/lesson";
import type { MultipleChoiceOptions, MatchPairsOptions, DragDropOptions } from "@/types/lesson";

function LessonComplete({ xpEarned, mistakes, saving, onRestart, onContinue }: {
  xpEarned: number; mistakes: number; saving: boolean;
  onRestart: () => void; onContinue: () => void;
}) {
  const isPerfect = mistakes === 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: 2, duration: 0.5 }}
        className="text-8xl"
      >
        {isPerfect ? "🏆" : "✅"}
      </motion.div>
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          {isPerfect ? "Perfect!" : "Lesson Complete!"}
        </h1>
        <p className="text-gray-500">
          {isPerfect ? "No mistakes — flawless!" : `${mistakes} mistake${mistakes !== 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4">
        <Zap size={28} className="text-amber-400 fill-amber-400" />
        <div className="text-left">
          <p className="text-sm text-amber-600 font-medium">XP Earned</p>
          <p className="text-3xl font-black text-amber-600">+{xpEarned}</p>
        </div>
      </div>
      {saving && (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Loader2 size={16} className="animate-spin" />
          Saving progress...
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Button variant="outline" onClick={onRestart} className="gap-2 flex-1" disabled={saving}>
          <RotateCcw size={16} />
          Try Again
        </Button>
        <Button onClick={onContinue} className="gap-2 flex-1" disabled={saving}>
          <Trophy size={16} />
          Continue
        </Button>
      </div>
    </motion.div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const setProfile = useAuthStore((s) => s.setProfile);
  const profile = useAuthStore((s) => s.profile);
  const exercises: ActiveExercise[] = GREETINGS_EXERCISES;
  const startTimeRef = useRef(Date.now());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXPEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  // Save progress when lesson completes
  useEffect(() => {
    if (!isComplete) return;

    const timeMs = Date.now() - startTimeRef.current;
    setSaving(true);

    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonSlug: lessonId, moduleSlug: moduleId, xpEarned, mistakes, timeMs }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.newXP !== undefined && profile) {
          // Update local profile with new XP and level
          setProfile({ ...profile, total_xp: data.newXP, level: data.newLevel, current_streak: data.newStreak ?? profile.current_streak });
        }
      })
      .catch(() => {})
      .finally(() => setSaving(false));
  }, [isComplete]);

  const handleAnswer = (correct: boolean) => {
    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setXPEarned((p) => p + 10);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setMistakes((m) => m + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    if (currentIndex + 1 >= exercises.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHearts(5);
    setXPEarned(0);
    setMistakes(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setIsComplete(false);
    startTimeRef.current = Date.now();
  };

  if (isComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <LessonComplete
          xpEarned={xpEarned}
          mistakes={mistakes}
          saving={saving}
          onRestart={handleRestart}
          onContinue={() => router.push("/learn")}
        />
      </div>
    );
  }

  const renderExercise = () => {
    if (!exercise) return null;
    switch (exercise.type) {
      case "multiple_choice":
        return (
          <MultipleChoice
            question={exercise.question}
            thaiText={exercise.thaiText}
            romanization={exercise.romanization}
            audioUrl={exercise.audioUrl}
            options={exercise.options as MultipleChoiceOptions}
            correctAnswer={exercise.correctAnswer as string}
            onAnswer={handleAnswer}
            disabled={isAnswered}
          />
        );
      case "match_pairs":
        return <MatchPairs options={exercise.options as MatchPairsOptions} onAnswer={handleAnswer} disabled={isAnswered} />;
      case "drag_drop":
        return <DragDrop question={exercise.question} options={exercise.options as DragDropOptions} correctAnswer={exercise.correctAnswer as string[]} onAnswer={handleAnswer} disabled={isAnswered} />;
      case "fill_blank":
        return <FillBlank sentence={exercise.question} correctAnswer={exercise.correctAnswer as string} onAnswer={handleAnswer} disabled={isAnswered} />;
      case "pronunciation":
        return <PronunciationPractice thaiText={exercise.thaiText ?? exercise.question} romanization={exercise.romanization} audioUrl={exercise.audioUrl} onAnswer={handleAnswer} disabled={isAnswered} />;
      default:
        return <p className="text-gray-500">Exercise type not supported yet.</p>;
    }
  };

  const exercise = exercises[currentIndex];

  return (
    <ExerciseWrapper
      exercises={exercises}
      hearts={hearts}
      currentIndex={currentIndex}
      onCorrect={() => {}}
      onWrong={() => {}}
      onNext={handleNext}
      onQuit={() => router.push("/learn")}
      isAnswered={isAnswered}
      isCorrect={isCorrect}
    >
      {renderExercise()}
    </ExerciseWrapper>
  );
}
