import type { ExerciseType } from "./database";

export interface MultipleChoiceOptions {
  choices: Array<{ id: string; text: string; thai?: string; image?: string }>;
}

export interface DragDropOptions {
  words: string[];
}

export interface MatchPairsOptions {
  pairs: Array<{ thai: string; english: string; id: string }>;
}

export interface FillBlankOptions {
  sentence: string;
  blanks: Array<{ position: number; answer: string }>;
}

export interface ActiveExercise {
  id: string;
  type: ExerciseType;
  question: string;
  instruction?: string;
  thaiText?: string;
  romanization?: string;
  audioUrl?: string;
  imageUrl?: string;
  options?: unknown;
  correctAnswer: unknown;
  explanation?: string;
}

export interface LessonSession {
  lessonId: string;
  exercises: ActiveExercise[];
  currentIndex: number;
  hearts: number;
  xpEarned: number;
  mistakes: number;
  startedAt: Date;
}

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  userAnswer: unknown;
  timeMs: number;
}
