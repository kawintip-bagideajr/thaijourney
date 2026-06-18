import type { ActiveExercise } from "@/types/lesson";

export const WEATHER_VOCAB: ActiveExercise[] = [
  {
    id: "wea-mc-1", type: "multiple_choice",
    instruction: "ร้อน = ?",
    question: "ร้อน", thaiText: "ร้อน", romanization: "ron",
    options: { choices: [{ id: "a", text: "cold" }, { id: "b", text: "hot" }, { id: "c", text: "rainy" }, { id: "d", text: "windy" }] },
    correctAnswer: "b", explanation: "ร้อน (ron) = hot. Thailand is famous for its ร้อน weather!",
  },
  {
    id: "wea-mc-2", type: "multiple_choice",
    instruction: "ฝนตก = ?",
    question: "ฝนตก", thaiText: "ฝนตก", romanization: "fon tok",
    options: { choices: [{ id: "a", text: "Sunny" }, { id: "b", text: "Cloudy" }, { id: "c", text: "It's raining" }, { id: "d", text: "It's windy" }] },
    correctAnswer: "c", explanation: "ฝน (fon) = rain, ตก (tok) = to fall. ฝนตก = it's raining.",
  },
  {
    id: "wea-mc-3", type: "multiple_choice",
    instruction: "อากาศดี = ?",
    question: "อากาศดี", thaiText: "อากาศดี", romanization: "a-kat dee",
    options: { choices: [{ id: "a", text: "bad weather" }, { id: "b", text: "the weather is good" }, { id: "c", text: "it's hot" }, { id: "d", text: "strong wind" }] },
    correctAnswer: "b", explanation: "อากาศ (a-kat) = weather/air, ดี = good. อากาศดี = the weather is nice.",
  },
  {
    id: "wea-match-1", type: "match_pairs",
    instruction: "Match weather words",
    question: "Match each Thai word to English",
    options: {
      pairs: [
        { id: "1", thai: "ร้อน (ron)", english: "hot" },
        { id: "2", thai: "เย็น (yen)", english: "cool / cold" },
        { id: "3", thai: "ฝนตก (fon tok)", english: "it's raining" },
        { id: "4", thai: "แดดออก (daet ok)", english: "sunny" },
      ],
    },
    correctAnswer: {},
    explanation: "แดด = sunshine, ออก = to come out. แดดออก = the sun is out.",
  },
  {
    id: "wea-mc-4", type: "multiple_choice",
    instruction: "วันนี้อากาศเป็นอย่างไร = ?",
    question: "วันนี้อากาศเป็นอย่างไร", thaiText: "วันนี้อากาศเป็นอย่างไร", romanization: "wan nee a-kat pen yang rai",
    options: { choices: [{ id: "a", text: "What season is it?" }, { id: "b", text: "Is it going to rain?" }, { id: "c", text: "What is the weather like today?" }, { id: "d", text: "How hot is it?" }] },
    correctAnswer: "c", explanation: "วันนี้อากาศเป็นอย่างไร = What is the weather like today? เป็นอย่างไร = how is it?",
  },
];

export const THAI_SEASONS: ActiveExercise[] = [
  {
    id: "sea-mc-1", type: "multiple_choice",
    instruction: "Thailand has how many seasons?",
    question: "How many main seasons does Thailand have?",
    options: { choices: [{ id: "a", text: "4 seasons" }, { id: "b", text: "2 seasons" }, { id: "c", text: "3 seasons" }, { id: "d", text: "1 season" }] },
    correctAnswer: "c", explanation: "Thailand has 3 seasons: hot (ร้อน), rainy (ฝน), and cool (หนาว).",
  },
  {
    id: "sea-mc-2", type: "multiple_choice",
    instruction: "หน้าร้อน = ?",
    question: "หน้าร้อน", thaiText: "หน้าร้อน", romanization: "na ron",
    options: { choices: [{ id: "a", text: "rainy season" }, { id: "b", text: "cool season" }, { id: "c", text: "hot season" }, { id: "d", text: "dry season" }] },
    correctAnswer: "c", explanation: "หน้า (na) = season/face, ร้อน = hot. หน้าร้อน = hot season (March–May).",
  },
  {
    id: "sea-mc-3", type: "multiple_choice",
    instruction: "หน้าฝน occurs when?",
    question: "หน้าฝน (rainy season) is roughly:",
    options: { choices: [{ id: "a", text: "December – February" }, { id: "b", text: "March – May" }, { id: "c", text: "June – October" }, { id: "d", text: "September – November" }] },
    correctAnswer: "c", explanation: "หน้าฝน (rainy season) runs approximately June through October.",
  },
  {
    id: "sea-match-1", type: "match_pairs",
    instruction: "Match Thai seasons",
    question: "Match each season name to its English",
    options: {
      pairs: [
        { id: "1", thai: "หน้าร้อน", english: "hot season" },
        { id: "2", thai: "หน้าฝน", english: "rainy season" },
        { id: "3", thai: "หน้าหนาว", english: "cool/cold season" },
        { id: "4", thai: "อากาศดี", english: "nice weather" },
      ],
    },
    correctAnswer: {},
    explanation: "หนาว (nao) = cold. หน้าหนาว is Thailand's cool season (Nov–Feb).",
  },
  {
    id: "sea-mc-4", type: "multiple_choice",
    instruction: "ต้องพกร่มไหม = ?",
    question: "ต้องพกร่มไหม", thaiText: "ต้องพกร่มไหม", romanization: "tong phok rom mai",
    options: { choices: [{ id: "a", text: "Is it very hot?" }, { id: "b", text: "Should I bring sunscreen?" }, { id: "c", text: "Do I need to bring an umbrella?" }, { id: "d", text: "Will it flood?" }] },
    correctAnswer: "c", explanation: "ต้อง = must/need, พก = to carry, ร่ม (rom) = umbrella. ต้องพกร่มไหม = do I need an umbrella?",
  },
];
