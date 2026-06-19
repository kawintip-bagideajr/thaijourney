import type { ActiveExercise } from "@/types/lesson";

export const BODY_PARTS: ActiveExercise[] = [
  {
    id: "body-mc-1", type: "multiple_choice",
    instruction: "หัว = ?",
    question: "หัว", thaiText: "หัว", romanization: "hua",
    options: { choices: [{ id: "a", text: "hand" }, { id: "b", text: "foot" }, { id: "c", text: "head" }, { id: "d", text: "eye" }] },
    correctAnswer: "c", explanation: "หัว (hua) = head. It also means the top/beginning of things — หัวหน้า = leader (head person).",
  },
  {
    id: "body-mc-2", type: "multiple_choice",
    instruction: "มือ = ?",
    question: "มือ", thaiText: "มือ", romanization: "mue",
    options: { choices: [{ id: "a", text: "foot" }, { id: "b", text: "hand" }, { id: "c", text: "arm" }, { id: "d", text: "finger" }] },
    correctAnswer: "b", explanation: "มือ (mue) = hand. มือถือ = mobile phone (hand-held device).",
  },
  {
    id: "body-mc-3", type: "multiple_choice",
    instruction: "ตา = ?",
    question: "ตา", thaiText: "ตา", romanization: "ta",
    options: { choices: [{ id: "a", text: "ear" }, { id: "b", text: "nose" }, { id: "c", text: "mouth" }, { id: "d", text: "eye" }] },
    correctAnswer: "d", explanation: "ตา (ta) = eye. Also means maternal grandfather! Context matters in Thai.",
  },
  {
    id: "body-match-1", type: "match_pairs",
    instruction: "Match body parts",
    question: "Match each Thai body part to English",
    options: {
      pairs: [
        { id: "1", thai: "หัว (hua)", english: "head" },
        { id: "2", thai: "มือ (mue)", english: "hand" },
        { id: "3", thai: "เท้า (thao)", english: "foot" },
        { id: "4", thai: "ปาก (pak)", english: "mouth" },
      ],
    },
    correctAnswer: {},
    explanation: "Remember: in Thai culture, the head is sacred and feet are considered low — never point feet at people!",
  },
  {
    id: "body-mc-4", type: "multiple_choice",
    instruction: "หน้า can mean?",
    question: "หน้า (na) — which TWO meanings does it have?",
    options: { choices: [{ id: "a", text: "face AND front" }, { id: "b", text: "ear AND hear" }, { id: "c", text: "hand AND hold" }, { id: "d", text: "eye AND see" }] },
    correctAnswer: "a", explanation: "หน้า (na) = face AND front/next. ข้างหน้า = in front of. หน้าตา = appearance.",
  },
];

export const BODY_PHRASES: ActiveExercise[] = [
  {
    id: "bodyphr-mc-1", type: "multiple_choice",
    instruction: "ปวดหลัง = ?",
    question: "ปวดหลัง", thaiText: "ปวดหลัง", romanization: "puat lang",
    options: { choices: [{ id: "a", text: "neck pain" }, { id: "b", text: "knee pain" }, { id: "c", text: "back pain" }, { id: "d", text: "chest pain" }] },
    correctAnswer: "c", explanation: "ปวดหลัง (puat lang) = back pain. ปวด = ache/hurt, หลัง = back.",
  },
  {
    id: "bodyphr-mc-2", type: "multiple_choice",
    instruction: "เป็นไข้ = ?",
    question: "เป็นไข้", thaiText: "เป็นไข้", romanization: "pen khai",
    options: { choices: [{ id: "a", text: "have a cold" }, { id: "b", text: "have a fever" }, { id: "c", text: "be dizzy" }, { id: "d", text: "be tired" }] },
    correctAnswer: "b", explanation: "เป็นไข้ (pen khai) = have a fever. เป็น here means 'to have/be afflicted with'.",
  },
  {
    id: "bodyphr-fill-1", type: "fill_blank",
    instruction: "Fill in: 'My head hurts'",
    question: "ฉัน___หัว",
    options: { sentence: "ฉัน ___ หัว", blanks: [{ position: 0, answer: "ปวด" }] },
    correctAnswer: "ปวด",
    explanation: "ฉันปวดหัว = I have a headache. ปวด = hurt/ache + body part.",
  },
  {
    id: "bodyphr-match-1", type: "match_pairs",
    instruction: "Match ailments",
    question: "Match each phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ปวดหัว (puat hua)", english: "headache" },
        { id: "2", thai: "ปวดท้อง (puat thong)", english: "stomachache" },
        { id: "3", thai: "เป็นไข้ (pen khai)", english: "have a fever" },
        { id: "4", thai: "เจ็บคอ (jep kho)", english: "sore throat" },
      ],
    },
    correctAnswer: {},
    explanation: "Pattern: ปวด + body part = that body part hurts. เจ็บ also means hurt but more sharp pain.",
  },
  {
    id: "bodyphr-mc-3", type: "multiple_choice",
    instruction: "How do you say 'I can't breathe well'?",
    question: "I'm having trouble breathing.",
    options: { choices: [{ id: "a", text: "ฉันหายใจไม่สะดวก" }, { id: "b", text: "ฉันปวดหลัง" }, { id: "c", text: "ฉันเป็นไข้" }, { id: "d", text: "ฉันเจ็บเท้า" }] },
    correctAnswer: "a", explanation: "หายใจ (hai jai) = breathe. ไม่สะดวก = not convenient/comfortable.",
  },
];
