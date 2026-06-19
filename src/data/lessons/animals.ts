import type { ActiveExercise } from "@/types/lesson";

export const ANIMALS_VOCAB: ActiveExercise[] = [
  {
    id: "ani-mc-1", type: "multiple_choice",
    instruction: "ช้าง = ?",
    question: "ช้าง", thaiText: "ช้าง", romanization: "chang",
    options: { choices: [{ id: "a", text: "tiger" }, { id: "b", text: "monkey" }, { id: "c", text: "elephant" }, { id: "d", text: "snake" }] },
    correctAnswer: "c", explanation: "ช้าง (chang) = elephant — Thailand's national symbol! The white elephant is especially sacred.",
  },
  {
    id: "ani-mc-2", type: "multiple_choice",
    instruction: "เสือ = ?",
    question: "เสือ", thaiText: "เสือ", romanization: "seua",
    options: { choices: [{ id: "a", text: "lion" }, { id: "b", text: "tiger" }, { id: "c", text: "bear" }, { id: "d", text: "wolf" }] },
    correctAnswer: "b", explanation: "เสือ (seua) = tiger. Thailand has rare Indochinese tigers in its national parks.",
  },
  {
    id: "ani-mc-3", type: "multiple_choice",
    instruction: "แมว = ?",
    question: "แมว", thaiText: "แมว", romanization: "maeo",
    options: { choices: [{ id: "a", text: "dog" }, { id: "b", text: "bird" }, { id: "c", text: "cat" }, { id: "d", text: "rabbit" }] },
    correctAnswer: "c", explanation: "แมว (maeo) = cat. The Siamese cat (วิเชียรมาศ) is a famous Thai breed!",
  },
  {
    id: "ani-match-1", type: "match_pairs",
    instruction: "Match animals",
    question: "Match each Thai animal to English",
    options: {
      pairs: [
        { id: "1", thai: "ช้าง (chang)", english: "elephant" },
        { id: "2", thai: "หมา (ma)", english: "dog" },
        { id: "3", thai: "นก (nok)", english: "bird" },
        { id: "4", thai: "ปลา (pla)", english: "fish" },
      ],
    },
    correctAnswer: {},
    explanation: "ปลา (fish) is a huge part of Thai cuisine. หมา = informal word for dog.",
  },
  {
    id: "ani-mc-4", type: "multiple_choice",
    instruction: "กบ = ?",
    question: "กบ", thaiText: "กบ", romanization: "gop",
    options: { choices: [{ id: "a", text: "frog" }, { id: "b", text: "crab" }, { id: "c", text: "turtle" }, { id: "d", text: "shrimp" }] },
    correctAnswer: "a", explanation: "กบ (gop) = frog. Thailand has delicious frog dishes! กุ้ง (kung) = shrimp.",
  },
];

export const NATURE_VOCAB: ActiveExercise[] = [
  {
    id: "nat-mc-1", type: "multiple_choice",
    instruction: "ทะเล = ?",
    question: "ทะเล", thaiText: "ทะเล", romanization: "tha-le",
    options: { choices: [{ id: "a", text: "river" }, { id: "b", text: "mountain" }, { id: "c", text: "sea / ocean" }, { id: "d", text: "waterfall" }] },
    correctAnswer: "c", explanation: "ทะเล (tha-le) = sea/ocean. ไปทะเล = going to the sea. Thailand's beaches are world-famous!",
  },
  {
    id: "nat-mc-2", type: "multiple_choice",
    instruction: "ภูเขา = ?",
    question: "ภูเขา", thaiText: "ภูเขา", romanization: "phu khao",
    options: { choices: [{ id: "a", text: "valley" }, { id: "b", text: "mountain" }, { id: "c", text: "forest" }, { id: "d", text: "field" }] },
    correctAnswer: "b", explanation: "ภูเขา (phu khao) = mountain. ภู = hill/mountain prefix. Doi Inthanon is Thailand's highest peak.",
  },
  {
    id: "nat-mc-3", type: "multiple_choice",
    instruction: "ดอกไม้ = ?",
    question: "ดอกไม้", thaiText: "ดอกไม้", romanization: "dok mai",
    options: { choices: [{ id: "a", text: "tree" }, { id: "b", text: "leaf" }, { id: "c", text: "flower" }, { id: "d", text: "grass" }] },
    correctAnswer: "c", explanation: "ดอกไม้ (dok mai) = flower. ดอก = blossom, ไม้ = wood/plant. The lotus (ดอกบัว) is sacred in Thailand.",
  },
  {
    id: "nat-match-1", type: "match_pairs",
    instruction: "Match nature words",
    question: "Match each Thai nature word to English",
    options: {
      pairs: [
        { id: "1", thai: "ทะเล (tha-le)", english: "sea" },
        { id: "2", thai: "แม่น้ำ (mae nam)", english: "river" },
        { id: "3", thai: "ป่า (pa)", english: "forest / jungle" },
        { id: "4", thai: "เกาะ (ko)", english: "island" },
      ],
    },
    correctAnswer: {},
    explanation: "เกาะ = island — used in many famous names: เกาะสมุย (Koh Samui), เกาะพีพี (Koh Phi Phi).",
  },
  {
    id: "nat-mc-4", type: "multiple_choice",
    instruction: "น้ำตก = ?",
    question: "น้ำตก", thaiText: "น้ำตก", romanization: "nam tok",
    options: { choices: [{ id: "a", text: "lake" }, { id: "b", text: "stream" }, { id: "c", text: "waterfall" }, { id: "d", text: "rain" }] },
    correctAnswer: "c", explanation: "น้ำตก (nam tok) = waterfall. น้ำ = water, ตก = fall. Literally 'falling water'.",
  },
];
