import type { ActiveExercise } from "@/types/lesson";

export const THAI_SLANG: ActiveExercise[] = [
  {
    id: "slang-mc-1", type: "multiple_choice",
    instruction: "เว่อร์ = ?",
    question: "เว่อร์ (wer)", thaiText: "เว่อร์",
    options: { choices: [{ id: "a", text: "boring" }, { id: "b", text: "over-the-top / exaggerated" }, { id: "c", text: "cool" }, { id: "d", text: "cheap" }] },
    correctAnswer: "b", explanation: "เว่อร์ (wer) = over the top / exaggerated. Borrowed from 'over'. 'คุณเว่อร์มาก' = you're so extra!",
  },
  {
    id: "slang-mc-2", type: "multiple_choice",
    instruction: "เก๋ = ?",
    question: "เก๋ (ge)", thaiText: "เก๋",
    options: { choices: [{ id: "a", text: "ugly" }, { id: "b", text: "tired" }, { id: "c", text: "stylish / chic" }, { id: "d", text: "loud" }] },
    correctAnswer: "c", explanation: "เก๋ (ge) = stylish/chic/cute. 'เสื้อตัวนี้เก๋มาก' = this shirt is so chic!",
  },
  {
    id: "slang-mc-3", type: "multiple_choice",
    instruction: "โอเค = ?",
    question: "โอเค", thaiText: "โอเค",
    options: { choices: [{ id: "a", text: "not good" }, { id: "b", text: "OK / fine" }, { id: "c", text: "wow" }, { id: "d", text: "goodbye" }] },
    correctAnswer: "b", explanation: "โอเค = OK, borrowed from English. You'll hear it all the time in casual Thai.",
  },
  {
    id: "slang-match-1", type: "match_pairs",
    instruction: "Match Thai slang",
    question: "Match each slang word to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "เว่อร์ (wer)", english: "over-the-top" },
        { id: "2", thai: "เก๋ (ge)", english: "stylish / chic" },
        { id: "3", thai: "เฟี้ยว (fiao)", english: "sharp / cool-looking" },
        { id: "4", thai: "ซ่า (sa)", english: "fizzy / wild / lively" },
      ],
    },
    correctAnswer: {},
    explanation: "Modern Thai slang borrows a lot of English words and gives them a Thai twist.",
  },
  {
    id: "slang-mc-4", type: "multiple_choice",
    instruction: "ไม่โอเค vs โอเค: which means 'not OK'?",
    question: "I'm not feeling great about this.",
    options: { choices: [{ id: "a", text: "โอเคมาก" }, { id: "b", text: "ไม่โอเค" }, { id: "c", text: "โอเคๆ" }, { id: "d", text: "โอเคนะ" }] },
    correctAnswer: "b", explanation: "ไม่โอเค = not OK. ไม่ negates: ไม่ดี = not good, ไม่ชอบ = don't like.",
  },
];

export const CASUAL_SPEECH: ActiveExercise[] = [
  {
    id: "cas-mc-1", type: "multiple_choice",
    instruction: "ไปไหนมา? (casual) = ?",
    question: "ไปไหนมา", thaiText: "ไปไหนมา", romanization: "pai nai ma",
    options: { choices: [{ id: "a", text: "Where are you going?" }, { id: "b", text: "Where have you been?" }, { id: "c", text: "What are you doing?" }, { id: "d", text: "Are you tired?" }] },
    correctAnswer: "b", explanation: "ไปไหนมา? = Where have you been? It's a casual greeting, like 'What's up?', so nobody expects a real answer.",
  },
  {
    id: "cas-mc-2", type: "multiple_choice",
    instruction: "นะ / นะครับ / นะคะ adds what feeling?",
    question: "คุณสวยนะ: what does นะ add?",
    options: { choices: [{ id: "a", text: "Makes it negative" }, { id: "b", text: "Softens or adds warmth" }, { id: "c", text: "Makes it a command" }, { id: "d", text: "Expresses anger" }] },
    correctAnswer: "b", explanation: "นะ softens the tone and makes you sound warmer. คุณสวยนะ = you're beautiful, you know~",
  },
  {
    id: "cas-fill-1", type: "fill_blank",
    instruction: "Add the casual particle to soften 'let's go'",
    question: "ไป___ (let's go, softly)",
    options: { sentence: "ไป ___", blanks: [{ position: 0, answer: "นะ" }] },
    correctAnswer: "นะ",
    explanation: "ไปนะ = let's go (softly). นะ makes invitations and suggestions friendlier.",
  },
  {
    id: "cas-match-1", type: "match_pairs",
    instruction: "Match casual particles",
    question: "Match each particle to its effect",
    options: {
      pairs: [
        { id: "1", thai: "นะ / นะครับ", english: "softens, adds warmth" },
        { id: "2", thai: "เลย", english: "emphasizes / right away" },
        { id: "3", thai: "สิ / ซิ", english: "encourages / of course!" },
        { id: "4", thai: "หน่อย", english: "a little / please (softener)" },
      ],
    },
    correctAnswer: {},
    explanation: "Particles change how a sentence feels. Think of them as emoji for tone.",
  },
  {
    id: "cas-mc-3", type: "multiple_choice",
    instruction: "กินข้าวหรือยัง = ?",
    question: "กินข้าวหรือยัง", thaiText: "กินข้าวหรือยัง", romanization: "gin khao reu yang",
    options: { choices: [{ id: "a", text: "What's for dinner?" }, { id: "b", text: "Have you eaten yet?" }, { id: "c", text: "Are you hungry?" }, { id: "d", text: "Do you like Thai food?" }] },
    correctAnswer: "b", explanation: "กินข้าวหรือยัง = Have you eaten yet? Thais ask this as a friendly greeting. Answer กินแล้ว (already ate) or ยังไม่ได้กิน (haven't eaten yet).",
  },
];
