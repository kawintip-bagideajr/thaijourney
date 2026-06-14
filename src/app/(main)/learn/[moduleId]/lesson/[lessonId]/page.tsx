"use client";
import { useState, use, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, Zap, RotateCcw, Loader2, Heart, BookOpen } from "lucide-react";
import { ExerciseWrapper } from "@/components/exercises/ExerciseWrapper";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { MatchPairs } from "@/components/exercises/MatchPairs";
import { DragDrop } from "@/components/exercises/DragDrop";
import { FillBlank } from "@/components/exercises/FillBlank";
import { PronunciationPractice } from "@/components/exercises/PronunciationPractice";
import { Button } from "@/components/ui/button";
import { getLessonExercises } from "@/data/lessons/index";
import { useAuthStore } from "@/store/authStore";
import { useSound } from "@/hooks/useSound";
import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { cn } from "@/lib/utils";
import type { ActiveExercise } from "@/types/lesson";
import type { MultipleChoiceOptions, MatchPairsOptions, DragDropOptions } from "@/types/lesson";

type ReplayMode = "normal" | "review" | "heart";

function LessonComplete({
  xpEarned, mistakes, saving, replayMode, onRestart, onContinue,
}: {
  xpEarned: number; mistakes: number; saving: boolean; replayMode: ReplayMode;
  onRestart: () => void; onContinue: () => void;
}) {
  const isPerfect = mistakes === 0;
  const isReview = replayMode === "review";
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
        {isReview ? "📖" : isPerfect ? "🏆" : "✅"}
      </motion.div>
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          {isReview ? "Review Complete!" : isPerfect ? "Perfect!" : "Lesson Complete!"}
        </h1>
        <p className="text-gray-500">
          {isReview
            ? "Practice done — no XP this time"
            : isPerfect
            ? "No mistakes — flawless!"
            : `${mistakes} mistake${mistakes !== 1 ? "s" : ""}`}
        </p>
      </div>
      {!isReview && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4">
          <Zap size={28} className="text-amber-400 fill-amber-400" />
          <div className="text-left">
            <p className="text-sm text-amber-600 font-medium">XP Earned</p>
            <p className="text-3xl font-black text-amber-600">+{xpEarned}</p>
          </div>
        </div>
      )}
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

function ReplayPrompt({
  hearts, onReview, onHeartSacrifice, onBack,
}: {
  hearts: number; onReview: () => void; onHeartSacrifice: () => void; onBack: () => void;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-lg space-y-6"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-black text-gray-900">Already Completed!</h2>
          <p className="text-gray-500 text-sm mt-2">
            You&apos;ve finished this lesson. How do you want to replay?
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onReview}
            className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-left transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Review for free</p>
                <p className="text-xs text-gray-500">No XP earned — just practice</p>
              </div>
            </div>
          </button>

          <button
            onClick={onHeartSacrifice}
            disabled={hearts <= 0}
            className={cn(
              "w-full p-4 rounded-2xl text-left transition-colors border",
              hearts > 0
                ? "bg-red-50 hover:bg-red-100 border-red-200"
                : "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart size={18} className="text-red-500 fill-red-500" />
              </div>
              <div>
                <p className="font-bold text-red-700">Spend 1 heart for XP</p>
                <p className="text-xs text-red-400">
                  {hearts > 0
                    ? `Earn XP as normal (${hearts} heart${hearts !== 1 ? "s" : ""} left)`
                    : "No hearts remaining!"}
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={onBack}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Go back
        </button>
      </motion.div>
    </div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const setProfile = useAuthStore((s) => s.setProfile);
  const profile = useAuthStore((s) => s.profile);
  const exercises: ActiveExercise[] = getLessonExercises(moduleId, lessonId);
  const startTimeRef = useRef(Date.now());
  const { playCorrect, playWrong, playComplete } = useSound();

  const [replayMode, setReplayMode] = useState<ReplayMode | null>(null); // null = checking
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(profile?.hearts ?? 5);
  const [xpEarned, setXPEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check if this lesson was already completed
  useEffect(() => {
    if (!profile) return;
    const progressId = `${profile.id}_${lessonId}`;
    getDoc(doc(db, "user_lesson_progress", progressId)).then((snap) => {
      if (snap.exists()) {
        setReplayMode("prompt" as ReplayMode); // show prompt
      } else {
        setReplayMode("normal");
      }
    }).catch(() => setReplayMode("normal"));
  }, [profile?.id, lessonId]);

  // Save progress when lesson completes
  useEffect(() => {
    if (!isComplete || replayMode === null || replayMode === ("prompt" as ReplayMode)) return;

    // Review mode → no API call
    if (replayMode === "review") return;

    const timeMs = Date.now() - startTimeRef.current;
    setSaving(true);

    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonSlug: lessonId,
        moduleSlug: moduleId,
        xpEarned,
        mistakes,
        timeMs,
        heartSacrifice: replayMode === "heart",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.newXP !== undefined && profile) {
          setProfile({
            ...profile,
            total_xp: data.newXP,
            level: data.newLevel,
            current_streak: data.newStreak ?? profile.current_streak,
            hearts: data.newHearts ?? profile.hearts,
          });
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
      playCorrect();
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setMistakes((m) => m + 1);
      playWrong();
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    if (currentIndex + 1 >= exercises.length) {
      setIsComplete(true);
      playComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHearts(profile?.hearts ?? 5);
    setXPEarned(0);
    setMistakes(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setIsComplete(false);
    startTimeRef.current = Date.now();
  };

  // Loading state while checking completion
  if (replayMode === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={28} className="animate-spin text-orange-400" />
      </div>
    );
  }

  // Replay prompt
  if ((replayMode as string) === "prompt") {
    return (
      <ReplayPrompt
        hearts={profile?.hearts ?? 0}
        onReview={() => { setReplayMode("review"); startTimeRef.current = Date.now(); }}
        onHeartSacrifice={() => { setReplayMode("heart"); startTimeRef.current = Date.now(); }}
        onBack={() => router.push("/learn")}
      />
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <LessonComplete
          xpEarned={xpEarned}
          mistakes={mistakes}
          saving={saving}
          replayMode={replayMode}
          onRestart={handleRestart}
          onContinue={() => router.push("/learn")}
        />
      </div>
    );
  }

  const exercise = exercises[currentIndex];

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
