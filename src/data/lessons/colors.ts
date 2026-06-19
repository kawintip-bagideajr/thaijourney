import type { ActiveExercise } from "@/types/lesson";

export const COLORS_VOCAB: ActiveExercise[] = [
  {
    id: "col-mc-1", type: "multiple_choice",
    instruction: "สีแดง = ?",
    question: "สีแดง", thaiText: "สีแดง", romanization: "see daeng",
    options: { choices: [{ id: "a", text: "blue" }, { id: "b", text: "green" }, { id: "c", text: "red" }, { id: "d", text: "yellow" }] },
    correctAnswer: "c", explanation: "สีแดง (see daeng) = red. สี = color. สีแดง is also the color of good luck!",
  },
  {
    id: "col-mc-2", type: "multiple_choice",
    instruction: "สีน้ำเงิน = ?",
    question: "สีน้ำเงิน", thaiText: "สีน้ำเงิน", romanization: "see nam ngoen",
    options: { choices: [{ id: "a", text: "blue" }, { id: "b", text: "purple" }, { id: "c", text: "black" }, { id: "d", text: "navy" }] },
    correctAnswer: "a", explanation: "สีน้ำเงิน (see nam ngoen) = blue. น้ำ = water, เงิน = silver — 'silver water color'.",
  },
  {
    id: "col-mc-3", type: "multiple_choice",
    instruction: "สีเขียว = ?",
    question: "สีเขียว", thaiText: "สีเขียว", romanization: "see khiao",
    options: { choices: [{ id: "a", text: "orange" }, { id: "b", text: "green" }, { id: "c", text: "pink" }, { id: "d", text: "brown" }] },
    correctAnswer: "b", explanation: "สีเขียว (see khiao) = green. Green is associated with Wednesday in Thai culture.",
  },
  {
    id: "col-match-1", type: "match_pairs",
    instruction: "Match colors to Thai",
    question: "Match each color to its Thai name",
    options: {
      pairs: [
        { id: "1", thai: "สีแดง (see daeng)", english: "red" },
        { id: "2", thai: "สีเขียว (see khiao)", english: "green" },
        { id: "3", thai: "สีเหลือง (see lueang)", english: "yellow" },
        { id: "4", thai: "สีขาว (see khao)", english: "white" },
      ],
    },
    correctAnswer: {},
    explanation: "สี = color. Add it before any color word. สีเหลือง=yellow (royal color), สีขาว=white.",
  },
  {
    id: "col-mc-4", type: "multiple_choice",
    instruction: "สีดำ = ?",
    question: "สีดำ", thaiText: "สีดำ", romanization: "see dam",
    options: { choices: [{ id: "a", text: "white" }, { id: "b", text: "grey" }, { id: "c", text: "brown" }, { id: "d", text: "black" }] },
    correctAnswer: "d", explanation: "สีดำ (see dam) = black. สีเทา = grey, สีน้ำตาล = brown.",
  },
];

export const COLORS_ADJECTIVES: ActiveExercise[] = [
  {
    id: "coladj-mc-1", type: "multiple_choice",
    instruction: "How do you say 'big'?",
    question: "big = ?",
    options: { choices: [{ id: "a", text: "เล็ก (lek)" }, { id: "b", text: "ใหญ่ (yai)" }, { id: "c", text: "สวย (suay)" }, { id: "d", text: "แก่ (gae)" }] },
    correctAnswer: "b", explanation: "ใหญ่ (yai) = big/large. เล็ก (lek) = small. รถใหญ่ = big car.",
  },
  {
    id: "coladj-mc-2", type: "multiple_choice",
    instruction: "สวย = ?",
    question: "สวย", thaiText: "สวย", romanization: "suay",
    options: { choices: [{ id: "a", text: "ugly" }, { id: "b", text: "tall" }, { id: "c", text: "beautiful" }, { id: "d", text: "fast" }] },
    correctAnswer: "c", explanation: "สวย (suay) = beautiful. A great compliment! คุณสวยมาก = you're very beautiful.",
  },
  {
    id: "coladj-mc-3", type: "multiple_choice",
    instruction: "เร็ว = ?",
    question: "เร็ว", thaiText: "เร็ว", romanization: "reo",
    options: { choices: [{ id: "a", text: "slow" }, { id: "b", text: "fast" }, { id: "c", text: "loud" }, { id: "d", text: "quiet" }] },
    correctAnswer: "b", explanation: "เร็ว (reo) = fast. ช้า (cha) = slow. ขับรถเร็วไป = driving too fast!",
  },
  {
    id: "coladj-match-1", type: "match_pairs",
    instruction: "Match opposites",
    question: "Match each Thai adjective to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ใหญ่ (yai)", english: "big" },
        { id: "2", thai: "เล็ก (lek)", english: "small" },
        { id: "3", thai: "ร้อน (ron)", english: "hot" },
        { id: "4", thai: "เย็น (yen)", english: "cold / cool" },
      ],
    },
    correctAnswer: {},
    explanation: "Adjectives in Thai come AFTER the noun: น้ำร้อน = hot water, น้ำเย็น = cold water.",
  },
  {
    id: "coladj-mc-4", type: "multiple_choice",
    instruction: "สูง = ?",
    question: "สูง", thaiText: "สูง", romanization: "sung",
    options: { choices: [{ id: "a", text: "short" }, { id: "b", text: "thin" }, { id: "c", text: "tall / high" }, { id: "d", text: "wide" }] },
    correctAnswer: "c", explanation: "สูง (sung) = tall/high. เตี้ย (dtia) = short. คนสูง = tall person.",
  },
];
