import type { ActiveExercise } from "@/types/lesson";

export const GREETINGS_VOCABULARY = [
  { thai: "สวัสดี", romanization: "sa-wat-dee", english: "Hello / Goodbye", cultural_note: "Used for both greeting and farewell" },
  { thai: "ครับ", romanization: "khrap", english: "(polite particle - male)", cultural_note: "Men add ครับ to be polite" },
  { thai: "ค่ะ", romanization: "kha", english: "(polite particle - female)", cultural_note: "Women add ค่ะ (statement) or คะ (question)" },
  { thai: "ขอบคุณ", romanization: "khob-khun", english: "Thank you", cultural_note: "Add ครับ/ค่ะ at the end to sound polite" },
  { thai: "ไม่เป็นไร", romanization: "mai-pen-rai", english: "You're welcome / Never mind / It's OK", cultural_note: "One of the most versatile Thai phrases" },
  { thai: "ขอโทษ", romanization: "kho-thot", english: "Sorry / Excuse me", cultural_note: "Use for apologies and getting attention" },
  { thai: "ใช่", romanization: "chai", english: "Yes (that's correct)", cultural_note: "Confirms a statement is true" },
  { thai: "ไม่ใช่", romanization: "mai-chai", english: "No (that's not correct)", cultural_note: "ไม่ (mai) negates the word after it" },
  { thai: "คุณชื่ออะไร", romanization: "khun-chue-a-rai", english: "What is your name?", cultural_note: "คุณ is a polite title like 'you' or 'Mr/Ms'" },
  { thai: "ผม/ฉันชื่อ...", romanization: "phom/chan-chue...", english: "My name is... (male/female)", cultural_note: "ผม = I (male), ฉัน = I (female)" },
  { thai: "ยินดีที่ได้รู้จัก", romanization: "yin-dee-thee-dai-roo-jak", english: "Nice to meet you", cultural_note: "Used when meeting someone for the first time" },
  { thai: "เป็นยังไงบ้าง", romanization: "pen-yang-ngai-bang", english: "How are you?", cultural_note: "Casual, used with friends" },
  { thai: "สบายดี", romanization: "sa-bai-dee", english: "I'm fine / I'm well", cultural_note: "สบาย = comfortable, ดี = good" },
  { thai: "แล้วคุณล่ะ", romanization: "laew-khun-la", english: "And you?", cultural_note: "ล่ะ softens or asks for more information" },
];

export const GREETINGS_EXERCISES: ActiveExercise[] = [
  {
    id: "greet-mc-1",
    type: "multiple_choice",
    instruction: "What does สวัสดี mean?",
    question: "สวัสดี",
    thaiText: "สวัสดี",
    romanization: "sa-wat-dee",
    options: {
      choices: [
        { id: "a", text: "Thank you" },
        { id: "b", text: "Hello / Goodbye" },
        { id: "c", text: "I'm sorry" },
        { id: "d", text: "Nice to meet you" },
      ],
    },
    correctAnswer: "b",
    explanation: "สวัสดี is used for both hello and goodbye in Thai — it's a blessing for well-being.",
  },
  {
    id: "greet-mc-2",
    type: "multiple_choice",
    instruction: "Which particle do men add to sound polite?",
    question: "Which particle do men use to show politeness?",
    options: {
      choices: [
        { id: "a", text: "ค่ะ (kha)" },
        { id: "b", text: "นะ (na)" },
        { id: "c", text: "ครับ (khrap)" },
        { id: "d", text: "จ้า (jaa)" },
      ],
    },
    correctAnswer: "c",
    explanation: "Men use ครับ (khrap) and women use ค่ะ/คะ (kha) to be polite in Thai.",
  },
  {
    id: "greet-fill-1",
    type: "fill_blank",
    instruction: "Fill in the blank",
    question: "สวัสดี___ (Add the polite male particle)",
    options: {
      sentence: "สวัสดี ___",
      blanks: [{ position: 0, answer: "ครับ" }],
    },
    correctAnswer: "ครับ",
    explanation: "Male speakers add ครับ after สวัสดี to be polite: สวัสดีครับ",
  },
  {
    id: "greet-match-1",
    type: "match_pairs",
    instruction: "Match the Thai with the English",
    question: "Match each Thai phrase with its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "สวัสดี", english: "Hello / Goodbye" },
        { id: "2", thai: "ขอบคุณ", english: "Thank you" },
        { id: "3", thai: "ขอโทษ", english: "Sorry / Excuse me" },
        { id: "4", thai: "ไม่เป็นไร", english: "Never mind / You're welcome" },
      ],
    },
    correctAnswer: { "1": "Hello / Goodbye", "2": "Thank you", "3": "Sorry / Excuse me", "4": "Never mind / You're welcome" },
    explanation: "These are the four most essential Thai social phrases.",
  },
  {
    id: "greet-drag-1",
    type: "drag_drop",
    instruction: "Arrange the words in the correct order",
    question: "Arrange to say: 'My name is ...' (male speaker)",
    options: {
      words: ["ผม", "ชื่อ", "อเล็กซ์"],
    },
    correctAnswer: ["ผม", "ชื่อ", "อเล็กซ์"],
    explanation: "Thai sentence structure: Subject + ชื่อ (name/is named) + Name",
  },
  {
    id: "greet-mc-3",
    type: "multiple_choice",
    instruction: "How do you say 'How are you?' in casual Thai?",
    question: "How do you ask 'How are you?' to a friend?",
    options: {
      choices: [
        { id: "a", text: "คุณชื่ออะไร" },
        { id: "b", text: "เป็นยังไงบ้าง" },
        { id: "c", text: "ยินดีที่ได้รู้จัก" },
        { id: "d", text: "ไม่เป็นไร" },
      ],
    },
    correctAnswer: "b",
    explanation: "เป็นยังไงบ้าง (pen yang ngai bang) is the casual way to ask how someone is doing.",
  },
];
