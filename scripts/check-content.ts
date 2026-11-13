/**
 * Sanity checks for lesson, adventure and boss content.
 * Run: npx jiti scripts/check-content.ts
 */
import { LESSON_MAP_FOR_CHECKS } from "../src/data/lessons/index";
import { EXTRA_MODULES, ADVENTURE_BY_PROVINCE, BOOST } from "../src/data/content/index";
import { PROVINCES } from "../src/data/provinces";
import { BOSSES } from "../src/data/bosses";
import type { ActiveExercise } from "../src/types/lesson";

const errors: string[] = [];
const warn: string[] = [];
const seen = new Map<string, string>();

function checkExercise(e: ActiveExercise, where: string) {
  const at = `${where} › ${e.id}`;
  if (!e.id) errors.push(`${where}: exercise without id`);
  const prev = seen.get(e.id);
  if (prev && prev !== where) errors.push(`duplicate exercise id "${e.id}" in ${where} and ${prev}`);
  seen.set(e.id, where);
  if (!e.question) errors.push(`${at}: empty question`);
  switch (e.type) {
    case "multiple_choice": {
      const choices = (e.options as { choices?: { id: string; text: string }[] })?.choices ?? [];
      if (choices.length < 3) errors.push(`${at}: fewer than 3 choices`);
      if (!choices.some((c) => c.id === e.correctAnswer)) errors.push(`${at}: correctAnswer is not a choice id`);
      const texts = choices.map((c) => c.text.trim());
      if (new Set(texts).size !== texts.length) errors.push(`${at}: duplicate choice texts ${JSON.stringify(texts)}`);
      break;
    }
    case "match_pairs": {
      const pairs = (e.options as { pairs?: { thai: string; english: string }[] })?.pairs ?? [];
      if (pairs.length < 3 || pairs.length > 6) errors.push(`${at}: match needs 3–6 pairs`);
      if (new Set(pairs.map((p) => p.english)).size !== pairs.length) errors.push(`${at}: duplicate English in match`);
      if (new Set(pairs.map((p) => p.thai)).size !== pairs.length) errors.push(`${at}: duplicate Thai in match`);
      break;
    }
    case "drag_drop": {
      const words = (e.options as { words?: string[] })?.words ?? [];
      if (words.length < 2) errors.push(`${at}: order needs 2+ words`);
      const answer = Array.isArray(e.correctAnswer) ? (e.correctAnswer as string[]) : [];
      if (JSON.stringify([...words].sort()) !== JSON.stringify([...answer].sort())) errors.push(`${at}: word tiles and answer differ`);
      if (new Set(words).size !== words.length) warn.push(`${at}: repeated word tiles (ambiguous order)`);
      break;
    }
    case "fill_blank":
      if (typeof e.correctAnswer !== "string" || !e.correctAnswer) errors.push(`${at}: fill needs a string answer`);
      if (!e.question.includes("___")) errors.push(`${at}: fill sentence needs ___`);
      break;
    case "pronunciation":
      if (!e.thaiText && !e.question) errors.push(`${at}: nothing to pronounce`);
      break;
    default:
      errors.push(`${at}: unsupported type ${e.type}`);
  }
}

function checkLesson(list: ActiveExercise[], where: string, min: number) {
  if (list.length < min) warn.push(`${where}: only ${list.length} exercises`);
  const fills = list.filter((e) => e.type === "fill_blank").length;
  if (fills > 1) warn.push(`${where}: ${fills} typing exercises (max 1 recommended)`);
  list.forEach((e) => checkExercise(e, where));
}

for (const [key, list] of Object.entries(LESSON_MAP_FOR_CHECKS)) checkLesson([...list, ...(BOOST[key] ?? [])], key, 1);
for (const key of Object.keys(BOOST)) if (!(key in LESSON_MAP_FOR_CHECKS)) errors.push(`BOOST key "${key}" does not match an existing lesson`);

const lessonIds = new Set<string>();
for (const m of EXTRA_MODULES) {
  for (const l of m.lessons) {
    if (lessonIds.has(l.id)) errors.push(`duplicate lesson id ${l.id}`);
    lessonIds.add(l.id);
    checkLesson(l.exercises, `${m.id}/${l.id}`, 8);
  }
}

const stageIds = new Set<string>();
for (const p of PROVINCES) {
  const stages = ADVENTURE_BY_PROVINCE[p.id] ?? [];
  if (stages.length < 4) warn.push(`province ${p.id}: only ${stages.length} adventure stages`);
  for (const s of stages) {
    if (stageIds.has(s.id)) errors.push(`duplicate stage id ${s.id}`);
    stageIds.add(s.id);
    // Stage 1 of a classic province reuses its old lesson, which is already checked above.
    if (s.id !== p.id) checkLesson(s.exercises, `adventure/${s.id}`, 7);
  }
}
for (const pid of Object.keys(ADVENTURE_BY_PROVINCE)) if (!PROVINCES.some((p) => p.id === pid)) errors.push(`adventure for unknown province ${pid}`);

const qids = new Set<string>();
for (const b of BOSSES) {
  if (b.questions.length < 10) warn.push(`boss ${b.id}: only ${b.questions.length} questions`);
  for (const q of b.questions) {
    if (qids.has(q.id)) errors.push(`duplicate boss question id ${q.id}`);
    qids.add(q.id);
    if (q.choices.length !== 4 || q.answer < 0 || q.answer > 3) errors.push(`boss ${b.id} › ${q.id}: needs 4 choices and answer 0–3`);
    if (new Set(q.choices).size !== 4) errors.push(`boss ${b.id} › ${q.id}: duplicate choices`);
  }
}

const total = Object.values(LESSON_MAP_FOR_CHECKS).reduce((n, l) => n + l.length, 0)
  + Object.values(BOOST).reduce((n, l) => n + l.length, 0)
  + EXTRA_MODULES.reduce((n, m) => n + m.lessons.reduce((k, l) => k + l.exercises.length, 0), 0)
  + Object.values(ADVENTURE_BY_PROVINCE).reduce((n, st) => n + st.filter((s) => !(s.id in {})).reduce((k, s) => k + s.exercises.length, 0), 0);
console.log(`modules+${EXTRA_MODULES.length} lessons+${lessonIds.size} stages ${stageIds.size} bosses ${BOSSES.length} exercises≈${total}`);
warn.forEach((w) => console.log("WARN ", w));
errors.forEach((e) => console.log("ERROR", e));
console.log(errors.length ? `${errors.length} errors` : "OK: no errors");
process.exit(errors.length ? 1 : 0);
