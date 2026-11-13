/**
 * Small helpers for writing lesson content quickly and consistently.
 *
 * Everything here is deterministic (seeded by the exercise id), because lesson
 * data is evaluated on both the server and the client: Math.random() would make
 * the choice order differ between the two and break hydration.
 */
import type { ActiveExercise } from "@/types/lesson";
import type { AdventureStage, LessonDef, LessonKind, Word } from "./types";

// ---------- seeded randomness ----------
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffleSeeded<T>(arr: readonly T[], seed: string): T[] {
  const r = rng(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const IDS = ["a", "b", "c", "d", "e", "f"];

/** Multiple choice from a list of answer texts; `answer` is the index of the correct text. */
export function choose(
  id: string,
  q: {
    question: string;
    choices: string[];
    answer: number;
    explanation: string;
    instruction?: string;
    thai?: string;
    rom?: string;
  },
): ActiveExercise {
  const order = shuffleSeeded(q.choices.map((text, i) => ({ text, ok: i === q.answer })), id);
  const choices = order.map((c, i) => ({ id: IDS[i], text: c.text }));
  return {
    id,
    type: "multiple_choice",
    instruction: q.instruction ?? "Choose the right answer",
    question: q.question,
    thaiText: q.thai,
    romanization: q.rom,
    options: { choices },
    correctAnswer: IDS[order.findIndex((c) => c.ok)],
    explanation: q.explanation,
  };
}

function distractors(w: Word, pool: Word[], key: "en" | "th", id: string, n = 3): Word[] {
  const others = pool.filter((p) => p[key] !== w[key] && p.th !== w.th);
  return shuffleSeeded(others, id + ":d").slice(0, n);
}

/** Show Thai, pick the English meaning. */
export function thToEn(id: string, w: Word, pool: Word[], explanation?: string): ActiveExercise {
  const wrong = distractors(w, pool, "en", id);
  return choose(id, {
    instruction: "What does this mean?",
    question: w.th,
    thai: w.th,
    rom: w.rom,
    choices: [w.en, ...wrong.map((d) => d.en)],
    answer: 0,
    explanation: explanation ?? `${w.th} (${w.rom}) = ${w.en}`,
  });
}

/** Show English, pick the Thai. */
export function enToTh(id: string, w: Word, pool: Word[], explanation?: string): ActiveExercise {
  const wrong = distractors(w, pool, "th", id);
  return choose(id, {
    instruction: "How do you say this in Thai?",
    question: `"${w.en}"`,
    choices: [`${w.th} (${w.rom})`, ...wrong.map((d) => `${d.th} (${d.rom})`)],
    answer: 0,
    explanation: explanation ?? `${w.en} = ${w.th} (${w.rom})`,
  });
}

/** Match 3–5 Thai words with their English meanings. */
export function match(id: string, words: Word[], instruction = "Match the Thai with the English"): ActiveExercise {
  const pairs = words.slice(0, 5).map((w, i) => ({ id: String(i + 1), thai: w.th, english: w.en }));
  return {
    id,
    type: "match_pairs",
    instruction,
    question: "Tap a Thai word, then its meaning",
    options: { pairs },
    correctAnswer: Object.fromEntries(pairs.map((p) => [p.id, p.english])),
    explanation: words.slice(0, 5).map((w) => `${w.th} = ${w.en}`).join(", "),
  };
}

/** Say a word or phrase out loud. */
export function say(id: string, w: Word): ActiveExercise {
  return {
    id,
    type: "pronunciation",
    instruction: "Say it out loud",
    question: w.th,
    thaiText: w.th,
    romanization: w.rom,
    correctAnswer: w.th,
    explanation: `${w.th} (${w.rom}) = ${w.en}`,
  };
}

/** Put Thai words in order. `words` is the correct order; the player sees them shuffled. */
export function order(id: string, words: string[], meaning: string, explanation: string): ActiveExercise {
  return {
    id,
    type: "drag_drop",
    instruction: "Put the words in order",
    question: `Make: "${meaning}"`,
    options: { words },
    correctAnswer: words,
    explanation,
  };
}

/**
 * Type the missing Thai word. Typing Thai is hard for most learners, so use this
 * sparingly (at most one per lesson) and only for short, very common words.
 */
export function fill(id: string, sentence: string, answer: string, explanation: string): ActiveExercise {
  return {
    id,
    type: "fill_blank",
    instruction: "Type the missing word",
    question: sentence,
    options: { sentence, blanks: [{ position: 0, answer }] },
    correctAnswer: answer,
    explanation,
  };
}

/**
 * A varied vocabulary drill for a word list (4–8 words works best):
 * Thai→English and English→Thai questions alternate, one match round per 4 words,
 * and `speak` pronunciation tasks. `pool` supplies extra wrong answers.
 */
export function drill(prefix: string, words: Word[], opts: { pool?: Word[]; speak?: number } = {}): ActiveExercise[] {
  const pool = [...words, ...(opts.pool ?? [])];
  const out: ActiveExercise[] = [];
  words.forEach((w, i) => {
    out.push(i % 2 === 0 ? thToEn(`${prefix}-q${i}`, w, pool) : enToTh(`${prefix}-q${i}`, w, pool));
    if (i % 4 === 3) out.push(match(`${prefix}-m${i}`, words.slice(i - 3, i + 1)));
  });
  const speak = opts.speak ?? 1;
  shuffleSeeded(words, prefix + ":say").slice(0, speak).forEach((w, i) => out.push(say(`${prefix}-s${i}`, w)));
  return out;
}

export function lesson(id: string, title: string, type: LessonKind, xp: number, exercises: ActiveExercise[]): LessonDef {
  return { id, title, type, xp, exercises };
}

export function stage(id: string, emoji: string, title: string, title_th: string, xp: number, exercises: ActiveExercise[]): AdventureStage {
  return { id, emoji, title, title_th, xp, exercises };
}
