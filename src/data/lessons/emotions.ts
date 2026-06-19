import type { ActiveExercise } from "@/types/lesson";

export const EMOTIONS_VOCAB: ActiveExercise[] = [
  {
    id: "emo-mc-1", type: "multiple_choice",
    instruction: "ดีใจ = ?",
    question: "ดีใจ", thaiText: "ดีใจ", romanization: "dee jai",
    options: { choices: [{ id: "a", text: "sad" }, { id: "b", text: "happy / glad" }, { id: "c", text: "angry" }, { id: "d", text: "tired" }] },
    correctAnswer: "b", explanation: "ดีใจ (dee jai) = happy/glad. ดี = good, ใจ = heart. Literally 'good heart'.",
  },
  {
    id: "emo-mc-2", type: "multiple_choice",
    instruction: "เสียใจ = ?",
    question: "เสียใจ", thaiText: "เสียใจ", romanization: "sia jai",
    options: { choices: [{ id: "a", text: "excited" }, { id: "b", text: "bored" }, { id: "c", text: "sad / sorry" }, { id: "d", text: "angry" }] },
    correctAnswer: "c", explanation: "เสียใจ (sia jai) = sad/sorry. เสีย = lost/damaged, ใจ = heart. 'Lost heart'.",
  },
  {
    id: "emo-mc-3", type: "multiple_choice",
    instruction: "โกรธ = ?",
    question: "โกรธ", thaiText: "โกรธ", romanization: "grot",
    options: { choices: [{ id: "a", text: "happy" }, { id: "b", text: "nervous" }, { id: "c", text: "surprised" }, { id: "d", text: "angry" }] },
    correctAnswer: "d", explanation: "โกรธ (grot) = angry. In Thailand, showing anger openly is considered bad form — stay calm!",
  },
  {
    id: "emo-match-1", type: "match_pairs",
    instruction: "Match emotions to English",
    question: "Match each Thai emotion word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ดีใจ (dee jai)", english: "happy / glad" },
        { id: "2", thai: "เสียใจ (sia jai)", english: "sad / sorry" },
        { id: "3", thai: "โกรธ (grot)", english: "angry" },
        { id: "4", thai: "กลัว (glua)", english: "scared / afraid" },
      ],
    },
    correctAnswer: {},
    explanation: "Thai emotion words often combine ใจ (heart) — a window into the language's feelings.",
  },
  {
    id: "emo-mc-4", type: "multiple_choice",
    instruction: "ตื่นเต้น = ?",
    question: "ตื่นเต้น", thaiText: "ตื่นเต้น", romanization: "dteun den",
    options: { choices: [{ id: "a", text: "bored" }, { id: "b", text: "excited" }, { id: "c", text: "confused" }, { id: "d", text: "relaxed" }] },
    correctAnswer: "b", explanation: "ตื่นเต้น (dteun den) = excited. Use it to express anticipation.",
  },
];

export const EMOTIONS_EXPRESSIONS: ActiveExercise[] = [
  {
    id: "emoex-mc-1", type: "multiple_choice",
    instruction: "How do you say 'I miss you'?",
    question: "I miss you.",
    options: { choices: [{ id: "a", text: "ฉันรักคุณ" }, { id: "b", text: "ฉันคิดถึงคุณ" }, { id: "c", text: "ฉันเหนื่อย" }, { id: "d", text: "ฉันเบื่อ" }] },
    correctAnswer: "b", explanation: "คิดถึง (khit theung) = miss/think of. ฉันคิดถึงคุณ = I miss you / I'm thinking of you.",
  },
  {
    id: "emoex-mc-2", type: "multiple_choice",
    instruction: "เครียด = ?",
    question: "เครียด", thaiText: "เครียด", romanization: "khriat",
    options: { choices: [{ id: "a", text: "relaxed" }, { id: "b", text: "happy" }, { id: "c", text: "stressed" }, { id: "d", text: "lonely" }] },
    correctAnswer: "c", explanation: "เครียด (khriat) = stressed. Very commonly used — Thais often say อย่าเครียด (don't stress).",
  },
  {
    id: "emoex-fill-1", type: "fill_blank",
    instruction: "Fill in: 'I'm very happy today'",
    question: "ฉัน___ มากวันนี้",
    options: { sentence: "ฉัน ___ มากวันนี้", blanks: [{ position: 0, answer: "ดีใจ" }] },
    correctAnswer: "ดีใจ",
    explanation: "ดีใจมากวันนี้ = very happy today. มาก = very/a lot.",
  },
  {
    id: "emoex-match-1", type: "match_pairs",
    instruction: "Match feeling phrases",
    question: "Match each phrase to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "คิดถึง (khit theung)", english: "miss / think of" },
        { id: "2", thai: "เครียด (khriat)", english: "stressed" },
        { id: "3", thai: "เหนื่อย (nueai)", english: "tired / exhausted" },
        { id: "4", thai: "สบายดี (sa-bai dee)", english: "doing well / fine" },
      ],
    },
    correctAnswer: {},
    explanation: "สบายดี is the classic Thai 'I'm fine' — used as both a greeting response and a state.",
  },
  {
    id: "emoex-mc-3", type: "multiple_choice",
    instruction: "How do you say 'I love you' (romantic)?",
    question: "I love you.",
    options: { choices: [{ id: "a", text: "ฉันชอบคุณ" }, { id: "b", text: "ฉันคิดถึงคุณ" }, { id: "c", text: "ฉันรักคุณ" }, { id: "d", text: "ฉันดีใจมาก" }] },
    correctAnswer: "c", explanation: "รัก (rak) = love. ฉันรักคุณ = I love you. ชอบ means like (less intense).",
  },
];
