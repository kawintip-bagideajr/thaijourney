import type { ActiveExercise } from "@/types/lesson";

/** A vocabulary item: Thai, romanization, English meaning. */
export interface Word {
  th: string;
  rom: string;
  en: string;
}

export type LessonKind = "vocabulary" | "grammar" | "listening" | "culture" | "speaking" | "conversation";
export type Track = "beginner" | "intermediate" | "advanced";

export interface LessonDef {
  /** Globally unique slug (progress is stored per lesson id). */
  id: string;
  title: string;
  type: LessonKind;
  xp: number;
  exercises: ActiveExercise[];
}

/** A module shown on the Learn page. */
export interface ModuleDef {
  id: string;
  track: Track;
  title: string;
  description: string;
  icon: string;
  /** Tailwind gradient stops, e.g. "from-orange-400 to-amber-400". */
  color: string;
  /** Tailwind background class, e.g. "bg-orange-50". */
  bgColor: string;
  requiredXP: number;
  lessons: LessonDef[];
}

/** One stage of a province adventure on the map. Stages unlock in order. */
export interface AdventureStage {
  /** Globally unique slug, e.g. "bangkok-2". Played at /learn/adventure/lesson/<id>. */
  id: string;
  title: string;
  title_th: string;
  emoji: string;
  xp: number;
  exercises: ActiveExercise[];
}

export interface ProvinceAdventure {
  provinceId: string;
  stages: AdventureStage[];
}
