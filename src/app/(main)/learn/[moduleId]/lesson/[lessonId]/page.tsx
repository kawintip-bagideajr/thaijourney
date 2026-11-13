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
import { cn, calcCurrentHearts, msToNextHeart, MAX_HEARTS } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { ActiveExercise } from "@/types/lesson";
import type { MultipleChoiceOptions, MatchPairsOptions, DragDropOptions } from "@/types/lesson";

type ReplayMode = "normal" | "review" | "heart";

function NoHeartsScreen({ heartsUpdatedAt, onBack }: { heartsUpdatedAt: string; onBack: () => void }) {
  const [msLeft, setMsLeft] = useState(() => msToNextHeart(0, heartsUpdatedAt));

  useEffect(() => {
    const id = setInterval(() => {
      setMsLeft(msToNextHeart(0, heartsUpdatedAt));
    }, 1000);
    return () => clearInterval(id);
  }, [heartsUpdatedAt]);

  const totalSecs = Math.ceil(msLeft / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="game-card p-6 sm:p-8 max-w-sm w-full space-y-6 text-center">
        <div className="text-7xl inline-block" aria-hidden="true">💔</div>
        <div>
          <h2 className="font-display text-2xl text-gray-900">หัวใจหมดแล้ว!</h2>
          <p className="text-gray-500 text-sm font-bold mt-2">รอสักครู่ หัวใจจะค่อยๆ เติมขึ้นเองทีละดวงทุก 30 นาที</p>
        </div>

        <div className="flex justify-center gap-1.5 py-1">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart key={i} size={30} strokeWidth={2.5} className="text-gray-300 fill-gray-100 opacity-60" />
          ))}
        </div>

        <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4">
          <p className="text-[11px] text-red-500 font-extrabold mb-1"><span aria-hidden="true">⏳ </span>หัวใจดวงถัดไปใน</p>
          <p className="font-display text-4xl text-red-500 tabular-nums">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </p>
        </div>

        <button
          onClick={onBack}
          className="btn-3d w-full h-12 rounded-2xl bg-white border-2 border-[var(--game-edge)] text-gray-700 font-display text-base [--btn-edge:var(--game-edge)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
        >
          กลับไปหน้าเรียน
        </button>
      </div>
    </div>
  );
}

function LessonComplete({
  xpEarned, mistakes, saving, replayMode, onRestart, onContinue,
}: {
  xpEarned: number; mistakes: number; saving: boolean; replayMode: ReplayMode;
  onRestart: () => void; onContinue: () => void;
}) {
  const { t } = useTranslation();
  const isPerfect = mistakes === 0;
  const isReview = replayMode === "review";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="game-card w-full max-w-sm p-6 sm:p-8 flex flex-col items-center text-center gap-6">
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: 2, duration: 0.5 }}
        className="text-8xl drop-shadow-[0_6px_6px_rgba(120,50,30,0.22)]"
        aria-hidden="true"
      >
        {isReview ? "📖" : isPerfect ? "🏆" : "✅"}
      </motion.div>
      <div>
        <h1 className="font-display text-3xl text-gray-900 mb-2">
          {isReview ? t("lesson.reviewComplete") : isPerfect ? t("lesson.perfect") : t("lesson.complete")}
        </h1>
        <p className="text-gray-500 text-sm font-bold">
          {isReview
            ? t("lesson.reviewDone")
            : isPerfect
            ? t("lesson.flawless")
            : (mistakes === 1 ? t("lesson.mistakeOne", { n: mistakes }) : t("lesson.mistakes", { n: mistakes }))}
        </p>
      </div>
      {!isReview && (
        <div className="w-full flex items-center justify-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 shadow-[0_5px_0_#fcd34d]">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 bg-amber-100 border-amber-300 shrink-0">
            <Zap size={26} className="text-amber-500 fill-amber-400" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-amber-700 font-extrabold">{t("lesson.xpEarned")}</p>
            <p className="font-display text-4xl text-amber-600 tabular-nums leading-none">+{xpEarned}</p>
          </div>
        </div>
      )}
      {saving && (
        <div className="flex items-center gap-2 text-gray-500 text-sm font-bold">
          <Loader2 size={16} className="animate-spin" />
          {t("lesson.saving")}
        </div>
      )}
      <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
        <Button variant="secondary" size="lg" onClick={onRestart} className="gap-2 flex-1 font-display" disabled={saving}>
          <RotateCcw size={16} />
          {t("lesson.tryAgain")}
        </Button>
        <Button size="lg" onClick={onContinue} className="gap-2 flex-1 font-display" disabled={saving}>
          <Trophy size={16} />
          {t("lesson.continue")}
        </Button>
      </div>
      </div>
    </motion.div>
  );
}

function ReplayPrompt({
  hearts, onReview, onHeartSacrifice, onBack,
}: {
  hearts: number; onReview: () => void; onHeartSacrifice: () => void; onBack: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="game-card p-6 sm:p-8 max-w-sm w-full space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-3 inline-block" aria-hidden="true">✅</div>
          <h2 className="font-display text-2xl text-gray-900">{t("lesson.alreadyCompleted")}</h2>
          <p className="text-gray-500 text-sm font-bold mt-2">
            {t("lesson.replayHow")}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onReview}
            className="btn-3d w-full p-4 bg-white hover:bg-sky-50 rounded-2xl text-left border-2 border-[var(--game-edge)] hover:border-sky-300 [--btn-edge:var(--game-edge)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center border-2 bg-sky-50 border-sky-200 shrink-0">
                <BookOpen size={20} className="text-sky-500" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-gray-900">{t("lesson.reviewFree")}</p>
                <p className="text-xs text-gray-500">{t("lesson.reviewFreeDesc")}</p>
              </div>
            </div>
          </button>

          <button
            onClick={onHeartSacrifice}
            disabled={hearts <= 0}
            className={cn(
              "btn-3d w-full p-4 rounded-2xl text-left border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100",
              hearts > 0
                ? "bg-red-50 hover:bg-red-100 border-red-200 [--btn-edge:#fecaca]"
                : "bg-gray-50 border-gray-200 grayscale opacity-60 cursor-not-allowed [--btn-edge:var(--game-edge)]"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center border-2 bg-red-100 border-red-200 shrink-0">
                <Heart size={20} className="text-red-500 fill-red-500" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-red-700">{t("lesson.spendHeart")}</p>
                <p className="text-xs font-bold text-red-400">
                  {hearts > 0
                    ? (hearts === 1 ? t("lesson.earnXpNormalOne", { n: hearts }) : t("lesson.earnXpNormal", { n: hearts }))
                    : t("lesson.noHearts")}
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={onBack}
          className="w-full text-center text-sm font-extrabold text-gray-500 hover:text-orange-600 transition-colors rounded-xl py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
        >
          {t("lesson.goBack")}
        </button>
      </div>
    </div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const setProfile = useAuthStore((s) => s.setProfile);
  const profile = useAuthStore((s) => s.profile);
  const { t } = useTranslation();
  const exercises: ActiveExercise[] = getLessonExercises(moduleId, lessonId);
  const isAdventure = moduleId === "adventure" || moduleId === "province";
  const backHref = isAdventure ? "/map" : "/learn";
  const startTimeRef = useRef(Date.now());
  const { playCorrect, playWrong, playComplete } = useSound();

  const [replayMode, setReplayMode] = useState<ReplayMode | null>(null); // null = checking
  const [currentIndex, setCurrentIndex] = useState(0);
  const startingHearts = profile
    ? calcCurrentHearts(profile.hearts, profile.hearts_updated_at)
    : MAX_HEARTS;
  const [hearts, setHearts] = useState(startingHearts);
  const [heartsRanOut, setHeartsRanOut] = useState(false);
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
        heartsLost: replayMode === "normal" ? startingHearts - hearts : 0,
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

  const saveHeartsLost = (lost: number) => {
    if (lost <= 0) return;
    fetch("/api/hearts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heartsLost: lost }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.newHearts !== undefined && profile) {
          setProfile({ ...profile, hearts: data.newHearts, hearts_updated_at: new Date().toISOString() });
        }
      })
      .catch(() => {});
  };

  const handleAnswer = (correct: boolean) => {
    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setXPEarned((p) => p + 10);
      playCorrect();
    } else {
      setHearts((h) => {
        const next = Math.max(0, h - 1);
        if (next === 0) setHeartsRanOut(true);
        return next;
      });
      setMistakes((m) => m + 1);
      playWrong();
    }
  };

  const handleNext = () => {
    // Hearts ran out mid-lesson — save & block
    if (heartsRanOut && replayMode === "normal") {
      saveHeartsLost(startingHearts - hearts);
      setIsAnswered(false);
      return;
    }
    setIsAnswered(false);
    setIsCorrect(null);
    if (currentIndex + 1 >= exercises.length) {
      setIsComplete(true);
      playComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleQuit = () => {
    const lost = startingHearts - hearts;
    if (lost > 0 && replayMode === "normal") saveHeartsLost(lost);
    router.push(backHref);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHeartsRanOut(false);
    setHearts(startingHearts);
    setXPEarned(0);
    setMistakes(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setIsComplete(false);
    startTimeRef.current = Date.now();
  };

  if (exercises.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="game-card p-6 max-w-sm w-full text-center space-y-4">
          <div className="text-6xl inline-block" aria-hidden="true">🧭</div>
          <h2 className="font-display text-xl text-gray-900">ไม่พบบทเรียนนี้</h2>
          <p className="text-sm font-bold text-gray-500">ลิงก์นี้อาจเก่าหรือพิมพ์ผิด ลองเลือกบทเรียนใหม่อีกครั้ง</p>
          <Button onClick={() => router.push(backHref)} className="w-full">{isAdventure ? "กลับไปที่แผนที่" : "กลับไปหน้าเรียน"}</Button>
        </div>
      </div>
    );
  }

  // Loading state while checking completion
  if (replayMode === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={28} className="animate-spin text-orange-400" />
      </div>
    );
  }

  // No hearts gate — block normal lessons at start
  if (replayMode === "normal" && startingHearts === 0 && profile) {
    return (
      <NoHeartsScreen
        heartsUpdatedAt={profile.hearts_updated_at}
        onBack={() => router.push(backHref)}
      />
    );
  }

  // Hearts ran out mid-lesson
  if (heartsRanOut && replayMode === "normal" && !isAnswered && profile) {
    return (
      <NoHeartsScreen
        heartsUpdatedAt={profile.hearts_updated_at}
        onBack={() => router.push(backHref)}
      />
    );
  }

  // Replay prompt
  if ((replayMode as string) === "prompt") {
    return (
      <ReplayPrompt
        hearts={startingHearts}
        onReview={() => { setReplayMode("review"); startTimeRef.current = Date.now(); }}
        onHeartSacrifice={() => { setReplayMode("heart"); startTimeRef.current = Date.now(); }}
        onBack={() => router.push(backHref)}
      />
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <LessonComplete
          xpEarned={xpEarned}
          mistakes={mistakes}
          saving={saving}
          replayMode={replayMode}
          onRestart={handleRestart}
          onContinue={() => router.push(backHref)}
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
        return (
          <div className="game-card p-6 text-center">
            <div className="text-5xl mb-2" aria-hidden="true">🚧</div>
            <p className="text-sm font-bold text-gray-500">{t("lesson.notSupported")}</p>
          </div>
        );
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
      onQuit={handleQuit}
      isAnswered={isAnswered}
      isCorrect={isCorrect}
    >
      {renderExercise()}
    </ExerciseWrapper>
  );
}
