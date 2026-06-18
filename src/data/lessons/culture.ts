import type { ActiveExercise } from "@/types/lesson";

export const THAI_CUSTOMS: ActiveExercise[] = [
  {
    id: "cust-mc-1", type: "multiple_choice",
    instruction: "ไหว้ is used for what?",
    question: "ไหว้ (wai) — what is this gesture?",
    options: {
      choices: [
        { id: "a", text: "A handshake" },
        { id: "b", text: "A bow with hands pressed together — Thai greeting" },
        { id: "c", text: "Pointing at someone" },
        { id: "d", text: "A wave goodbye" },
      ],
    },
    correctAnswer: "b", explanation: "ไหว้ (wai) is Thailand's respectful greeting: press palms together and bow slightly.",
  },
  {
    id: "cust-mc-2", type: "multiple_choice",
    instruction: "พระราชวัง = ?",
    question: "พระราชวัง", thaiText: "พระราชวัง", romanization: "phra rat-cha wang",
    options: { choices: [{ id: "a", text: "temple" }, { id: "b", text: "royal palace" }, { id: "c", text: "market" }, { id: "d", text: "museum" }] },
    correctAnswer: "b", explanation: "พระราชวัง = royal palace. พระ is a prefix for sacred/royal things.",
  },
  {
    id: "cust-mc-3", type: "multiple_choice",
    instruction: "ห้ามถ่ายรูป = ?",
    question: "ห้ามถ่ายรูป", thaiText: "ห้ามถ่ายรูป", romanization: "ham thai rup",
    options: { choices: [{ id: "a", text: "Please take photos!" }, { id: "b", text: "Photography area" }, { id: "c", text: "No photography allowed" }, { id: "d", text: "Free entry" }] },
    correctAnswer: "c", explanation: "ห้าม (ham) = forbidden/not allowed. ถ่ายรูป = take photos.",
  },
  {
    id: "cust-match-1", type: "match_pairs",
    instruction: "Match cultural words",
    question: "Match each Thai word to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ไหว้ (wai)", english: "greeting gesture" },
        { id: "2", thai: "วัด (wat)", english: "Buddhist temple" },
        { id: "3", thai: "พระ (phra)", english: "monk / sacred prefix" },
        { id: "4", thai: "สงกรานต์ (song-kran)", english: "Thai New Year water festival" },
      ],
    },
    correctAnswer: {},
    explanation: "สงกรานต์ is celebrated in April with water splashing — Thailand's biggest festival.",
  },
  {
    id: "cust-mc-4", type: "multiple_choice",
    instruction: "Visiting a temple — what should you wear?",
    question: "What is the dress code for Thai temples?",
    options: {
      choices: [
        { id: "a", text: "Anything is fine" },
        { id: "b", text: "Shorts and sleeveless tops" },
        { id: "c", text: "Modest clothing — shoulders and knees covered" },
        { id: "d", text: "Traditional Thai silk only" },
      ],
    },
    correctAnswer: "c", explanation: "Thai temples require modest dress — cover shoulders and knees. Some temples provide sarongs.",
  },
];

export const THAI_FESTIVALS: ActiveExercise[] = [
  {
    id: "fest-mc-1", type: "multiple_choice",
    instruction: "สงกรานต์ = ?",
    question: "สงกรานต์", thaiText: "สงกรานต์", romanization: "song-kran",
    options: { choices: [{ id: "a", text: "Lantern festival" }, { id: "b", text: "Thai New Year (April)" }, { id: "c", text: "Vegetarian festival" }, { id: "d", text: "Royal ceremony" }] },
    correctAnswer: "b", explanation: "สงกรานต์ is Thai New Year in April, famous for the water-splashing tradition.",
  },
  {
    id: "fest-mc-2", type: "multiple_choice",
    instruction: "ลอยกระทง = ?",
    question: "ลอยกระทง", thaiText: "ลอยกระทง", romanization: "loi kra-thong",
    options: { choices: [{ id: "a", text: "Floating lantern festival" }, { id: "b", text: "Water festival" }, { id: "c", text: "Floating basket festival (full moon)" }, { id: "d", text: "Merit-making ceremony" }] },
    correctAnswer: "c", explanation: "ลอยกระทง = float (ลอย) + basket (กระทง). Held on the full moon of November.",
  },
  {
    id: "fest-mc-3", type: "multiple_choice",
    instruction: "ทำบุญ = ?",
    question: "ทำบุญ", thaiText: "ทำบุญ", romanization: "tham bun",
    options: { choices: [{ id: "a", text: "go to market" }, { id: "b", text: "make merit / do good deeds" }, { id: "c", text: "celebrate a birthday" }, { id: "d", text: "pray at home" }] },
    correctAnswer: "b", explanation: "ทำบุญ (tham bun) = make merit. Thais do this regularly at temples — giving food to monks.",
  },
  {
    id: "fest-match-1", type: "match_pairs",
    instruction: "Match Thai festivals",
    question: "Match each festival to its description",
    options: {
      pairs: [
        { id: "1", thai: "สงกรานต์", english: "Thai New Year — water festival" },
        { id: "2", thai: "ลอยกระทง", english: "Full moon floating baskets" },
        { id: "3", thai: "วันมาฆบูชา", english: "Buddhist holy day" },
        { id: "4", thai: "ตรุษจีน (trut jin)", english: "Chinese New Year" },
      ],
    },
    correctAnswer: {},
    explanation: "Thailand celebrates both Thai and Chinese New Year due to its large Chinese-Thai population.",
  },
  {
    id: "fest-mc-4", type: "multiple_choice",
    instruction: "สุขสันต์วันเกิด = ?",
    question: "สุขสันต์วันเกิด", thaiText: "สุขสันต์วันเกิด", romanization: "suk san wan gert",
    options: { choices: [{ id: "a", text: "Happy New Year" }, { id: "b", text: "Congratulations" }, { id: "c", text: "Happy Birthday" }, { id: "d", text: "Good luck" }] },
    correctAnswer: "c", explanation: "สุขสันต์วันเกิด (suk san wan gert) = Happy Birthday. สุขสันต์ = joy/happiness.",
  },
];
