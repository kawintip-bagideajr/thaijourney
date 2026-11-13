import type { ActiveExercise } from "@/types/lesson";
import type { AdventureStage, ModuleDef } from "./types";
import { BEGINNER_MODULES } from "./modules/beginner";
import { INTERMEDIATE_MODULES } from "./modules/intermediate";
import { ADVANCED_MODULES } from "./modules/advanced";
import { BOOST } from "./boost";
import { ADVENTURES_CLASSIC_A } from "./adventures/classic-a";
import { ADVENTURES_CLASSIC_B } from "./adventures/classic-b";
import { ADVENTURES_NEW_A } from "./adventures/new-a";
import { ADVENTURES_NEW_B } from "./adventures/new-b";
import {
  PROVINCE_BANGKOK, PROVINCE_CHIANG_MAI, PROVINCE_PHUKET,
  PROVINCE_AYUTTHAYA, PROVINCE_KRABI, PROVINCE_CHIANG_RAI,
} from "../lessons/province-lessons";

export { BOOST };
export type { ModuleDef, AdventureStage };

/** New Learn-page modules (appended after the original ones). */
export const EXTRA_MODULES: ModuleDef[] = [...BEGINNER_MODULES, ...INTERMEDIATE_MODULES, ...ADVANCED_MODULES];

/**
 * The first province lessons become stage 1 of their adventure. They keep their
 * old ids, so progress players already made still counts.
 */
const LEGACY_FIRST_STAGE: Record<string, AdventureStage> = {
  bangkok: { id: "bangkok", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_BANGKOK },
  chiang_mai: { id: "chiang_mai", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_CHIANG_MAI },
  phuket: { id: "phuket", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_PHUKET },
  ayutthaya: { id: "ayutthaya", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_AYUTTHAYA },
  krabi: { id: "krabi", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_KRABI },
  chiang_rai: { id: "chiang_rai", emoji: "🛬", title: "Arrival", title_th: "มาถึงแล้ว", xp: 20, exercises: PROVINCE_CHIANG_RAI },
};

/** Province id → its adventure stages, in play order. */
export const ADVENTURE_BY_PROVINCE: Record<string, AdventureStage[]> = (() => {
  const out: Record<string, AdventureStage[]> = {};
  for (const a of [...ADVENTURES_CLASSIC_A, ...ADVENTURES_CLASSIC_B, ...ADVENTURES_NEW_A, ...ADVENTURES_NEW_B]) {
    out[a.provinceId] = [...(out[a.provinceId] ?? []), ...a.stages];
  }
  for (const [pid, first] of Object.entries(LEGACY_FIRST_STAGE)) out[pid] = [first, ...(out[pid] ?? [])];
  return out;
})();

/** Route path for a stage. */
export const stageHref = (stageId: string) => `/learn/adventure/lesson/${stageId}`;

/** Every lesson added by the content packs, keyed "<moduleId>/<lessonId>" like LESSON_MAP. */
export const EXTRA_LESSON_MAP: Record<string, ActiveExercise[]> = (() => {
  const out: Record<string, ActiveExercise[]> = {};
  for (const m of EXTRA_MODULES) for (const l of m.lessons) out[`${m.id}/${l.id}`] = l.exercises;
  for (const stages of Object.values(ADVENTURE_BY_PROVINCE)) for (const s of stages) out[`adventure/${s.id}`] = s.exercises;
  return out;
})();
