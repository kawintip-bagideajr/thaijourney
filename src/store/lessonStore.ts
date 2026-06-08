"use client";
import { create } from "zustand";
import type { ActiveExercise, ExerciseResult } from "@/types/lesson";

interface LessonState {
  lessonId: string | null;
  exercises: ActiveExercise[];
  currentIndex: number;
  hearts: number;
  xpEarned: number;
  results: ExerciseResult[];
  isComplete: boolean;
  startLesson: (lessonId: string, exercises: ActiveExercise[], hearts: number) => void;
  submitAnswer: (result: ExerciseResult) => void;
  loseHeart: () => void;
  nextExercise: () => void;
  completeLesson: () => void;
  resetLesson: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonId: null,
  exercises: [],
  currentIndex: 0,
  hearts: 5,
  xpEarned: 0,
  results: [],
  isComplete: false,

  startLesson: (lessonId, exercises, hearts) =>
    set({ lessonId, exercises, currentIndex: 0, hearts, xpEarned: 0, results: [], isComplete: false }),

  submitAnswer: (result) =>
    set((state) => ({
      results: [...state.results, result],
      xpEarned: result.correct ? state.xpEarned + 10 : state.xpEarned,
    })),

  loseHeart: () =>
    set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),

  nextExercise: () => {
    const { currentIndex, exercises } = get();
    if (currentIndex + 1 >= exercises.length) {
      set({ isComplete: true });
    } else {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  completeLesson: () => set({ isComplete: true }),

  resetLesson: () =>
    set({ lessonId: null, exercises: [], currentIndex: 0, hearts: 5, xpEarned: 0, results: [], isComplete: false }),
}));
