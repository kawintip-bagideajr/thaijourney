import type { ActiveExercise } from "@/types/lesson";

export const FAMILY_VOCAB: ActiveExercise[] = [
  {
    id: "fam-mc-1", type: "multiple_choice",
    instruction: "พ่อ = ?",
    question: "พ่อ", thaiText: "พ่อ", romanization: "pho",
    options: { choices: [{ id: "a", text: "mother" }, { id: "b", text: "father" }, { id: "c", text: "brother" }, { id: "d", text: "grandfather" }] },
    correctAnswer: "b", explanation: "พ่อ (pho) = father. พ่อแม่ (pho mae) = parents.",
  },
  {
    id: "fam-mc-2", type: "multiple_choice",
    instruction: "แม่ = ?",
    question: "แม่", thaiText: "แม่", romanization: "mae",
    options: { choices: [{ id: "a", text: "sister" }, { id: "b", text: "aunt" }, { id: "c", text: "mother" }, { id: "d", text: "grandmother" }] },
    correctAnswer: "c", explanation: "แม่ (mae) = mother. Also used informally to address older women.",
  },
  {
    id: "fam-mc-3", type: "multiple_choice",
    instruction: "พี่ชาย = ?",
    question: "พี่ชาย", thaiText: "พี่ชาย", romanization: "phi chai",
    options: { choices: [{ id: "a", text: "younger brother" }, { id: "b", text: "older brother" }, { id: "c", text: "older sister" }, { id: "d", text: "cousin" }] },
    correctAnswer: "b", explanation: "พี่ (phi) = older sibling, ชาย (chai) = male. พี่ชาย = older brother.",
  },
  {
    id: "fam-match-1", type: "match_pairs",
    instruction: "Match family members",
    question: "Match each Thai word to the correct family member",
    options: {
      pairs: [
        { id: "1", thai: "พ่อ (pho)", english: "father" },
        { id: "2", thai: "แม่ (mae)", english: "mother" },
        { id: "3", thai: "ปู่ (pu)", english: "grandfather (paternal)" },
        { id: "4", thai: "ย่า (ya)", english: "grandmother (paternal)" },
      ],
    },
    correctAnswer: {},
    explanation: "Thai distinguishes paternal (ปู่/ย่า) and maternal (ตา/ยาย) grandparents.",
  },
  {
    id: "fam-mc-4", type: "multiple_choice",
    instruction: "น้องสาว = ?",
    question: "น้องสาว", thaiText: "น้องสาว", romanization: "nong sao",
    options: { choices: [{ id: "a", text: "older sister" }, { id: "b", text: "younger brother" }, { id: "c", text: "younger sister" }, { id: "d", text: "cousin" }] },
    correctAnswer: "c", explanation: "น้อง (nong) = younger sibling, สาว (sao) = female. น้องสาว = younger sister.",
  },
];

export const FAMILY_RELATIONSHIPS: ActiveExercise[] = [
  {
    id: "rel-mc-1", type: "multiple_choice",
    instruction: "แฟน = ?",
    question: "แฟน", thaiText: "แฟน", romanization: "faen",
    options: { choices: [{ id: "a", text: "friend" }, { id: "b", text: "boyfriend/girlfriend" }, { id: "c", text: "husband" }, { id: "d", text: "colleague" }] },
    correctAnswer: "b", explanation: "แฟน (faen, from 'fan') = boyfriend or girlfriend in Thai.",
  },
  {
    id: "rel-mc-2", type: "multiple_choice",
    instruction: "สามี = ?",
    question: "สามี", thaiText: "สามี", romanization: "sa-mee",
    options: { choices: [{ id: "a", text: "wife" }, { id: "b", text: "fiancé" }, { id: "c", text: "husband" }, { id: "d", text: "son-in-law" }] },
    correctAnswer: "c", explanation: "สามี (sa-mee) = husband. ภรรยา (pan-ra-ya) = wife.",
  },
  {
    id: "rel-mc-3", type: "multiple_choice",
    instruction: "How do you say 'I have two siblings'?",
    question: "I have two siblings.",
    options: {
      choices: [
        { id: "a", text: "ฉันมีพี่น้องสองคน" },
        { id: "b", text: "ฉันไม่มีพี่น้อง" },
        { id: "c", text: "พ่อแม่ฉันมีสองคน" },
        { id: "d", text: "ฉันมีเพื่อนสองคน" },
      ],
    },
    correctAnswer: "a", explanation: "ฉันมีพี่น้องสองคน = I have two siblings. พี่น้อง = siblings, มี = have.",
  },
  {
    id: "rel-match-1", type: "match_pairs",
    instruction: "Match relationship words",
    question: "Match each Thai word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "แฟน (faen)", english: "boyfriend/girlfriend" },
        { id: "2", thai: "สามี (sa-mee)", english: "husband" },
        { id: "3", thai: "ภรรยา (pan-ra-ya)", english: "wife" },
        { id: "4", thai: "ลูก (luk)", english: "child / son / daughter" },
      ],
    },
    correctAnswer: {},
    explanation: "ลูก = child, ลูกชาย = son, ลูกสาว = daughter.",
  },
  {
    id: "rel-fill-1", type: "fill_blank",
    instruction: "Fill in: 'I live with my family'",
    question: "ฉันอยู่กับ___ (I live with my family)",
    options: { sentence: "ฉันอยู่กับ ___", blanks: [{ position: 0, answer: "ครอบครัว" }] },
    correctAnswer: "ครอบครัว",
    explanation: "ครอบครัว (khrob-khrua) = family. อยู่กับ = live with.",
  },
];

export const FAMILY_CONVERSATION: ActiveExercise[] = [
  {
    id: "famc-mc-1", type: "multiple_choice",
    instruction: "คุณมีพี่น้องไหม = ?",
    question: "คุณมีพี่น้องไหม", thaiText: "คุณมีพี่น้องไหม", romanization: "khun mee phi nong mai",
    options: { choices: [{ id: "a", text: "Are you married?" }, { id: "b", text: "Do you have siblings?" }, { id: "c", text: "Where is your family?" }, { id: "d", text: "How old is your brother?" }] },
    correctAnswer: "b", explanation: "คุณมีพี่น้องไหม = Do you have siblings? ไหม = question particle.",
  },
  {
    id: "famc-mc-2", type: "multiple_choice",
    instruction: "มีพี่สาวหนึ่งคน = ?",
    question: "มีพี่สาวหนึ่งคน", thaiText: "มีพี่สาวหนึ่งคน", romanization: "mee phi sao neung khon",
    options: { choices: [{ id: "a", text: "I have one older sister" }, { id: "b", text: "I have one younger sister" }, { id: "c", text: "I have one older brother" }, { id: "d", text: "I have one younger brother" }] },
    correctAnswer: "a", explanation: "พี่สาว = older sister, หนึ่งคน = one person.",
  },
  {
    id: "famc-drag-1", type: "drag_drop",
    instruction: "Arrange: 'My father works in Bangkok'",
    question: "Arrange: My father works in Bangkok",
    options: { words: ["พ่อของฉัน", "ทำงาน", "ที่กรุงเทพฯ"] },
    correctAnswer: ["พ่อของฉัน", "ทำงาน", "ที่กรุงเทพฯ"],
    explanation: "ของฉัน = my/mine, ทำงาน = work, ที่ = at/in.",
  },
  {
    id: "famc-mc-3", type: "multiple_choice",
    instruction: "ครอบครัวคุณอยู่ที่ไหน = ?",
    question: "ครอบครัวคุณอยู่ที่ไหน", thaiText: "ครอบครัวคุณอยู่ที่ไหน", romanization: "khrob khrua khun yoo thee nai",
    options: { choices: [{ id: "a", text: "How many people in your family?" }, { id: "b", text: "Do you have children?" }, { id: "c", text: "Where does your family live?" }, { id: "d", text: "What does your family do?" }] },
    correctAnswer: "c", explanation: "อยู่ที่ไหน = where do (they) live? ครอบครัวคุณ = your family.",
  },
  {
    id: "famc-match-1", type: "match_pairs",
    instruction: "Match family phrases",
    question: "Match each phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "คุณมีพี่น้องไหม", english: "Do you have siblings?" },
        { id: "2", thai: "ครอบครัวฉันมีสี่คน", english: "My family has 4 people" },
        { id: "3", thai: "ฉันเป็นลูกคนเดียว", english: "I'm an only child" },
        { id: "4", thai: "พ่อแม่อยู่เชียงใหม่", english: "Parents live in Chiang Mai" },
      ],
    },
    correctAnswer: {},
    explanation: "ลูกคนเดียว = only child (literally 'the single child').",
  },
];
