import type { ActiveExercise } from "@/types/lesson";
import { GREETINGS_EXERCISES } from "./greetings";
import { FAMILY_VOCAB, FAMILY_RELATIONSHIPS, FAMILY_CONVERSATION } from "./family";
import { TIME_VOCAB, DAYS_MONTHS, TIME_PHRASES } from "./time";
import { WEATHER_VOCAB, THAI_SEASONS } from "./weather";
import { THAI_CUSTOMS, THAI_FESTIVALS } from "./culture";
import { WORK_VOCAB, OFFICE_PHRASES } from "./work";
import { EMOTIONS_VOCAB, EMOTIONS_EXPRESSIONS } from "./emotions";
import { COLORS_VOCAB, COLORS_ADJECTIVES } from "./colors";
import { BODY_PARTS, BODY_PHRASES } from "./body";
import { ANIMALS_VOCAB, NATURE_VOCAB } from "./animals";
import { THAI_SLANG, CASUAL_SPEECH } from "./slang";
import {
  PROVINCE_BANGKOK, PROVINCE_CHIANG_MAI, PROVINCE_PHUKET,
  PROVINCE_AYUTTHAYA, PROVINCE_KRABI, PROVINCE_CHIANG_RAI,
} from "./province-lessons";

const NUMBERS_1_10: ActiveExercise[] = [
  {
    id: "num-mc-1", type: "multiple_choice",
    instruction: "What does ๑ (neung) mean?",
    question: "๑", thaiText: "๑", romanization: "neung",
    options: { choices: [{ id: "a", text: "2" }, { id: "b", text: "1" }, { id: "c", text: "3" }, { id: "d", text: "5" }] },
    correctAnswer: "b", explanation: "๑ is the Thai numeral for 1 — หนึ่ง (neung).",
  },
  {
    id: "num-mc-2", type: "multiple_choice",
    instruction: "How do you say '5' in Thai?",
    question: "5 = ?",
    options: { choices: [{ id: "a", text: "สี่ (see)" }, { id: "b", text: "หก (hok)" }, { id: "c", text: "ห้า (ha)" }, { id: "d", text: "เจ็ด (jet)" }] },
    correctAnswer: "c", explanation: "5 = ห้า (ha). Remember: high five → ห้า!",
  },
  {
    id: "num-mc-3", type: "multiple_choice",
    instruction: "What does สาม mean?",
    question: "สาม", thaiText: "สาม", romanization: "sam",
    options: { choices: [{ id: "a", text: "2" }, { id: "b", text: "4" }, { id: "c", text: "3" }, { id: "d", text: "6" }] },
    correctAnswer: "c", explanation: "สาม (sam) = 3. Like 'sam'urai — count to 3.",
  },
  {
    id: "num-match-1", type: "match_pairs",
    instruction: "Match the Thai number to its digit",
    question: "Match each Thai number word to the correct digit",
    options: {
      pairs: [
        { id: "1", thai: "หนึ่ง (neung)", english: "1" },
        { id: "2", thai: "สอง (song)", english: "2" },
        { id: "3", thai: "ห้า (ha)", english: "5" },
        { id: "4", thai: "เก้า (gao)", english: "9" },
      ],
    },
    correctAnswer: {},
    explanation: "หนึ่ง=1, สอง=2, ห้า=5, เก้า=9",
  },
  {
    id: "num-mc-4", type: "multiple_choice",
    instruction: "เจ็ด = ?",
    question: "เจ็ด", thaiText: "เจ็ด", romanization: "jet",
    options: { choices: [{ id: "a", text: "6" }, { id: "b", text: "8" }, { id: "c", text: "7" }, { id: "d", text: "10" }] },
    correctAnswer: "c", explanation: "เจ็ด (jet) = 7. Like a jet has 7 letters!",
  },
];

const NUMBERS_11_100: ActiveExercise[] = [
  {
    id: "num-mc-5", type: "multiple_choice",
    instruction: "สิบ = ?",
    question: "สิบ", thaiText: "สิบ", romanization: "sip",
    options: { choices: [{ id: "a", text: "10" }, { id: "b", text: "11" }, { id: "c", text: "20" }, { id: "d", text: "100" }] },
    correctAnswer: "a", explanation: "สิบ (sip) = 10. It's also the root for all teens: สิบเอ็ด (11), สิบสอง (12)...",
  },
  {
    id: "num-mc-6", type: "multiple_choice",
    instruction: "How do you say 11 in Thai?",
    question: "11 = ?",
    options: { choices: [{ id: "a", text: "สิบสอง" }, { id: "b", text: "สิบเอ็ด" }, { id: "c", text: "ยี่สิบ" }, { id: "d", text: "สิบ" }] },
    correctAnswer: "b", explanation: "11 = สิบเอ็ด (sip-et). สิบ (10) + เอ็ด (1 — special form used for 11, 21, 31...)",
  },
  {
    id: "num-mc-7", type: "multiple_choice",
    instruction: "ยี่สิบ = ?",
    question: "ยี่สิบ", thaiText: "ยี่สิบ", romanization: "yee-sip",
    options: { choices: [{ id: "a", text: "12" }, { id: "b", text: "21" }, { id: "c", text: "20" }, { id: "d", text: "30" }] },
    correctAnswer: "c", explanation: "ยี่สิบ (yee-sip) = 20. Note: 20 uses ยี่ not สอง as the prefix.",
  },
  {
    id: "num-match-2", type: "match_pairs",
    instruction: "Match numbers to Thai",
    question: "Match each number to its Thai word",
    options: {
      pairs: [
        { id: "1", thai: "สิบ (sip)", english: "10" },
        { id: "2", thai: "สิบเอ็ด (sip-et)", english: "11" },
        { id: "3", thai: "ยี่สิบ (yee-sip)", english: "20" },
        { id: "4", thai: "หนึ่งร้อย (neung-roi)", english: "100" },
      ],
    },
    correctAnswer: {},
    explanation: "สิบ=10, สิบเอ็ด=11, ยี่สิบ=20, หนึ่งร้อย=100",
  },
  {
    id: "num-mc-8", type: "multiple_choice",
    instruction: "หนึ่งร้อย = ?",
    question: "หนึ่งร้อย", thaiText: "หนึ่งร้อย", romanization: "neung-roi",
    options: { choices: [{ id: "a", text: "10" }, { id: "b", text: "1,000" }, { id: "c", text: "100" }, { id: "d", text: "10,000" }] },
    correctAnswer: "c", explanation: "ร้อย (roi) = hundred. หนึ่งร้อย = one hundred.",
  },
];

const CLASSIFIERS: ActiveExercise[] = [
  {
    id: "clf-mc-1", type: "multiple_choice",
    instruction: "Which classifier is used for people?",
    question: "นักเรียนสองคน (two students) — what does คน mean here?",
    options: { choices: [{ id: "a", text: "people (classifier)" }, { id: "b", text: "animals" }, { id: "c", text: "books" }, { id: "d", text: "bottles" }] },
    correctAnswer: "a", explanation: "คน (khon) is used to count people. นักเรียนสองคน = two students.",
  },
  {
    id: "clf-mc-2", type: "multiple_choice",
    instruction: "แมวสองตัว = ?",
    question: "แมวสองตัว — what does ตัว count?",
    options: { choices: [{ id: "a", text: "people" }, { id: "b", text: "animals & clothing" }, { id: "c", text: "flat objects" }, { id: "d", text: "bottles" }] },
    correctAnswer: "b", explanation: "ตัว (tua) counts animals and clothing. แมวสองตัว = two cats.",
  },
  {
    id: "clf-mc-3", type: "multiple_choice",
    instruction: "หนังสือสี่เล่ม — what does เล่ม count?",
    question: "หนังสือสี่เล่ม = four ___",
    options: { choices: [{ id: "a", text: "bottles" }, { id: "b", text: "pens" }, { id: "c", text: "books" }, { id: "d", text: "people" }] },
    correctAnswer: "c", explanation: "เล่ม (lem) counts books and sharp objects. หนังสือสี่เล่ม = four books.",
  },
  {
    id: "clf-match-1", type: "match_pairs",
    instruction: "Match the classifier to what it counts",
    question: "Match each classifier to what it's used for",
    options: {
      pairs: [
        { id: "1", thai: "คน (khon)", english: "people" },
        { id: "2", thai: "ตัว (tua)", english: "animals / clothing" },
        { id: "3", thai: "อัน (an)", english: "small objects" },
        { id: "4", thai: "ขวด (khuat)", english: "bottles" },
      ],
    },
    correctAnswer: {},
    explanation: "Thai classifiers depend on the category of the noun, not the quantity.",
  },
  {
    id: "clf-mc-4", type: "multiple_choice",
    instruction: "น้ำสองขวด = ?",
    question: "น้ำสองขวด — ขวด counts what?",
    options: { choices: [{ id: "a", text: "cups" }, { id: "b", text: "bags" }, { id: "c", text: "bottles" }, { id: "d", text: "cans" }] },
    correctAnswer: "c", explanation: "ขวด (khuat) = bottle. น้ำสองขวด = two bottles of water.",
  },
];

const FOOD_VOCAB: ActiveExercise[] = [
  {
    id: "food-mc-1", type: "multiple_choice",
    instruction: "What does ผัดไทย mean?",
    question: "ผัดไทย", thaiText: "ผัดไทย", romanization: "phat-thai",
    options: { choices: [{ id: "a", text: "green curry" }, { id: "b", text: "Pad Thai noodles" }, { id: "c", text: "spicy shrimp soup" }, { id: "d", text: "papaya salad" }] },
    correctAnswer: "b", explanation: "ผัดไทย (Pad Thai) is Thailand's most famous stir-fried noodle dish.",
  },
  {
    id: "food-mc-2", type: "multiple_choice",
    instruction: "How do you say 'delicious' in Thai?",
    question: "How do you say 'delicious'?",
    options: { choices: [{ id: "a", text: "เผ็ด (phet)" }, { id: "b", text: "หวาน (wan)" }, { id: "c", text: "อร่อย (a-roi)" }, { id: "d", text: "เค็ม (khem)" }] },
    correctAnswer: "c", explanation: "อร่อย (a-roi) = delicious. A compliment every Thai cook loves to hear!",
  },
  {
    id: "food-mc-3", type: "multiple_choice",
    instruction: "เผ็ด means?",
    question: "เผ็ด", thaiText: "เผ็ด", romanization: "phet",
    options: { choices: [{ id: "a", text: "sweet" }, { id: "b", text: "salty" }, { id: "c", text: "sour" }, { id: "d", text: "spicy" }] },
    correctAnswer: "d", explanation: "เผ็ด (phet) = spicy. Very useful when ordering food in Thailand!",
  },
  {
    id: "food-match-1", type: "match_pairs",
    instruction: "Match the Thai word to English",
    question: "Match each Thai food word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ข้าว (khao)", english: "rice" },
        { id: "2", thai: "เผ็ด (phet)", english: "spicy" },
        { id: "3", thai: "หวาน (wan)", english: "sweet" },
        { id: "4", thai: "น้ำ (nam)", english: "water" },
      ],
    },
    correctAnswer: {},
    explanation: "These are essential words for any meal in Thailand.",
  },
  {
    id: "food-mc-4", type: "multiple_choice",
    instruction: "ต้มยำกุ้ง = ?",
    question: "ต้มยำกุ้ง", thaiText: "ต้มยำกุ้ง", romanization: "tom-yam-kung",
    options: { choices: [{ id: "a", text: "green curry" }, { id: "b", text: "spicy shrimp soup" }, { id: "c", text: "chicken rice" }, { id: "d", text: "papaya salad" }] },
    correctAnswer: "b", explanation: "ต้มยำกุ้ง (Tom Yam Kung) is the famous spicy and sour shrimp soup.",
  },
];

const ORDERING_FOOD: ActiveExercise[] = [
  {
    id: "ord-mc-1", type: "multiple_choice",
    instruction: "How do you say 'May I have...' in Thai?",
    question: "May I have Pad Thai, please.",
    options: { choices: [{ id: "a", text: "เก็บเงิน..." }, { id: "b", text: "เท่าไหร่..." }, { id: "c", text: "ขอ..." }, { id: "d", text: "ไม่..." }] },
    correctAnswer: "c", explanation: "ขอ (kho) = May I have / I'd like. Say ขอผัดไทยหนึ่งจาน to order one plate.",
  },
  {
    id: "ord-fill-1", type: "fill_blank",
    instruction: "Fill in the blank",
    question: "ไม่___ please (I don't want it spicy)",
    options: { sentence: "ไม่ ___", blanks: [{ position: 0, answer: "เผ็ด" }] },
    correctAnswer: "เผ็ด",
    explanation: "ไม่เผ็ด (mai phet) = not spicy. ไม่ negates the word after it.",
  },
  {
    id: "ord-mc-2", type: "multiple_choice",
    instruction: "How do you ask 'how much?'",
    question: "เท่าไหร่", thaiText: "เท่าไหร่", romanization: "thao-rai",
    options: { choices: [{ id: "a", text: "how much?" }, { id: "b", text: "too spicy!" }, { id: "c", text: "check please" }, { id: "d", text: "one more" }] },
    correctAnswer: "a", explanation: "เท่าไหร่ (thao-rai) = how much? Essential for shopping and restaurants.",
  },
  {
    id: "ord-mc-3", type: "multiple_choice",
    instruction: "How do you ask for the bill?",
    question: "Check please!",
    options: { choices: [{ id: "a", text: "ขอเมนู" }, { id: "b", text: "อร่อยมาก" }, { id: "c", text: "เก็บเงิน" }, { id: "d", text: "ไม่เผ็ด" }] },
    correctAnswer: "c", explanation: "เก็บเงิน (kep-ngoen) = collect money / bill please. Say เก็บเงินด้วยครับ/ค่ะ to be polite.",
  },
  {
    id: "ord-drag-1", type: "drag_drop",
    instruction: "Arrange to order 'one plate of Pad Thai'",
    question: "Order: one plate of Pad Thai",
    options: { words: ["ขอ", "ผัดไทย", "หนึ่งจาน"] },
    correctAnswer: ["ขอ", "ผัดไทย", "หนึ่งจาน"],
    explanation: "ขอ + food + amount. ขอผัดไทยหนึ่งจาน = one plate of Pad Thai please.",
  },
];

const FOOD_LISTENING: ActiveExercise[] = [
  {
    id: "fl-mc-1", type: "multiple_choice",
    instruction: "อร่อยมาก = ?",
    question: "อร่อยมาก", thaiText: "อร่อยมาก", romanization: "a-roi-mak",
    options: { choices: [{ id: "a", text: "Not delicious" }, { id: "b", text: "Very delicious!" }, { id: "c", text: "A little spicy" }, { id: "d", text: "I'm full" }] },
    correctAnswer: "b", explanation: "อร่อยมาก = very delicious! มาก (mak) = very/a lot.",
  },
  {
    id: "fl-mc-2", type: "multiple_choice",
    instruction: "ขอเมนูได้ไหม = ?",
    question: "ขอเมนูได้ไหม", thaiText: "ขอเมนูได้ไหม", romanization: "kho me-nu dai mai",
    options: { choices: [{ id: "a", text: "The food is ready" }, { id: "b", text: "Can I see the menu?" }, { id: "c", text: "No menu available" }, { id: "d", text: "What's the special today?" }] },
    correctAnswer: "b", explanation: "ขอเมนูได้ไหม = Can I see the menu? ได้ไหม (dai mai) turns it into a polite question.",
  },
  {
    id: "fl-match-1", type: "match_pairs",
    instruction: "Match restaurant phrases",
    question: "Match each Thai phrase to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ขอเมนูได้ไหม", english: "Can I see the menu?" },
        { id: "2", thai: "ไม่ใส่ผงชูรส", english: "No MSG please" },
        { id: "3", thai: "อร่อยมาก", english: "Very delicious!" },
        { id: "4", thai: "เก็บเงินด้วยครับ", english: "Check please!" },
      ],
    },
    correctAnswer: {},
    explanation: "These phrases cover a complete restaurant experience in Thailand.",
  },
  {
    id: "fl-mc-3", type: "multiple_choice",
    instruction: "ไม่ใส่ผงชูรส = ?",
    question: "ไม่ใส่ผงชูรส", thaiText: "ไม่ใส่ผงชูรส", romanization: "mai sai phong chu rot",
    options: { choices: [{ id: "a", text: "Extra MSG please" }, { id: "b", text: "Very spicy please" }, { id: "c", text: "No MSG please" }, { id: "d", text: "Without vegetables" }] },
    correctAnswer: "c", explanation: "ไม่ใส่ (mai sai) = don't put in / without. ผงชูรส = MSG.",
  },
  {
    id: "fl-mc-4", type: "multiple_choice",
    instruction: "How do you say 'one plate of ...'?",
    question: "One plate of green curry, please.",
    options: { choices: [{ id: "a", text: "แกงเขียวหวาน สองจาน" }, { id: "b", text: "ขอแกงเขียวหวานหนึ่งจาน" }, { id: "c", text: "เก็บแกงเขียวหวาน" }, { id: "d", text: "ไม่แกงเขียวหวาน" }] },
    correctAnswer: "b", explanation: "ขอ + dish + หนึ่งจาน (one plate). Always start with ขอ when ordering.",
  },
];

const TRANSPORT_VOCAB: ActiveExercise[] = [
  {
    id: "trans-mc-1", type: "multiple_choice",
    instruction: "รถแท็กซี่ = ?",
    question: "รถแท็กซี่", thaiText: "รถแท็กซี่", romanization: "rot-taek-see",
    options: { choices: [{ id: "a", text: "bus" }, { id: "b", text: "taxi" }, { id: "c", text: "train" }, { id: "d", text: "motorbike" }] },
    correctAnswer: "b", explanation: "รถแท็กซี่ = taxi. รถ (rot) means 'vehicle' — you'll see it in many transport words.",
  },
  {
    id: "trans-mc-2", type: "multiple_choice",
    instruction: "How do you say 'station'?",
    question: "station = ?",
    options: { choices: [{ id: "a", text: "รถไฟ" }, { id: "b", text: "สนามบิน" }, { id: "c", text: "สถานี" }, { id: "d", text: "ท่าเรือ" }] },
    correctAnswer: "c", explanation: "สถานี (sa-tha-nee) = station. Used for BTS, MRT, and train stations.",
  },
  {
    id: "trans-mc-3", type: "multiple_choice",
    instruction: "สนามบิน = ?",
    question: "สนามบิน", thaiText: "สนามบิน", romanization: "sa-nam-bin",
    options: { choices: [{ id: "a", text: "bus stop" }, { id: "b", text: "harbor" }, { id: "c", text: "train station" }, { id: "d", text: "airport" }] },
    correctAnswer: "d", explanation: "สนามบิน (sa-nam-bin) = airport. บิน (bin) means 'to fly'.",
  },
  {
    id: "trans-match-1", type: "match_pairs",
    instruction: "Match transport words",
    question: "Match each Thai word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "รถแท็กซี่", english: "taxi" },
        { id: "2", thai: "รถไฟ (rot-fai)", english: "train" },
        { id: "3", thai: "สถานี (sa-tha-nee)", english: "station" },
        { id: "4", thai: "สนามบิน (sa-nam-bin)", english: "airport" },
      ],
    },
    correctAnswer: {},
    explanation: "รถ = vehicle, ไฟ = fire/electric, สถานี = station, บิน = fly.",
  },
  {
    id: "trans-mc-4", type: "multiple_choice",
    instruction: "How do you say 'stop here'?",
    question: "Please stop here (to a taxi driver)",
    options: { choices: [{ id: "a", text: "ไปที่นี่" }, { id: "b", text: "จอดตรงนี้" }, { id: "c", text: "เลี้ยวซ้าย" }, { id: "d", text: "รีบขึ้น" }] },
    correctAnswer: "b", explanation: "จอดตรงนี้ (jot trong nee) = stop right here. จอด = stop/park.",
  },
];

const DIRECTIONS: ActiveExercise[] = [
  {
    id: "dir-mc-1", type: "multiple_choice",
    instruction: "ซ้าย = ?",
    question: "ซ้าย", thaiText: "ซ้าย", romanization: "sai",
    options: { choices: [{ id: "a", text: "right" }, { id: "b", text: "straight" }, { id: "c", text: "left" }, { id: "d", text: "back" }] },
    correctAnswer: "c", explanation: "ซ้าย (sai) = left. เลี้ยวซ้าย = turn left.",
  },
  {
    id: "dir-mc-2", type: "multiple_choice",
    instruction: "ขวา = ?",
    question: "ขวา", thaiText: "ขวา", romanization: "khwa",
    options: { choices: [{ id: "a", text: "left" }, { id: "b", text: "right" }, { id: "c", text: "straight" }, { id: "d", text: "u-turn" }] },
    correctAnswer: "b", explanation: "ขวา (khwa) = right. เลี้ยวขวา = turn right.",
  },
  {
    id: "dir-mc-3", type: "multiple_choice",
    instruction: "ตรงไป = ?",
    question: "ตรงไป", thaiText: "ตรงไป", romanization: "trong pai",
    options: { choices: [{ id: "a", text: "turn around" }, { id: "b", text: "stop" }, { id: "c", text: "go straight" }, { id: "d", text: "slow down" }] },
    correctAnswer: "c", explanation: "ตรงไป (trong pai) = go straight. ตรง = straight, ไป = go.",
  },
  {
    id: "dir-match-1", type: "match_pairs",
    instruction: "Match directions",
    question: "Match each Thai direction word to English",
    options: {
      pairs: [
        { id: "1", thai: "ซ้าย (sai)", english: "left" },
        { id: "2", thai: "ขวา (khwa)", english: "right" },
        { id: "3", thai: "ตรงไป (trong pai)", english: "straight ahead" },
        { id: "4", thai: "ใกล้ (glai)", english: "near / close" },
      ],
    },
    correctAnswer: {},
    explanation: "ซ้าย=left, ขวา=right, ตรงไป=straight, ใกล้=near.",
  },
  {
    id: "dir-mc-4", type: "multiple_choice",
    instruction: "อยู่ที่ไหน = ?",
    question: "อยู่ที่ไหน", thaiText: "อยู่ที่ไหน", romanization: "yoo thee nai",
    options: { choices: [{ id: "a", text: "How far?" }, { id: "b", text: "How long?" }, { id: "c", text: "Where is...?" }, { id: "d", text: "Is it open?" }] },
    correctAnswer: "c", explanation: "อยู่ที่ไหน (yoo thee nai) = where is...? อยู่ = to be located, ที่ไหน = where.",
  },
];

const SHOPPING_VOCAB: ActiveExercise[] = [
  {
    id: "shop-mc-1", type: "multiple_choice",
    instruction: "ราคา = ?",
    question: "ราคา", thaiText: "ราคา", romanization: "ra-kha",
    options: { choices: [{ id: "a", text: "discount" }, { id: "b", text: "price" }, { id: "c", text: "receipt" }, { id: "d", text: "change" }] },
    correctAnswer: "b", explanation: "ราคา (ra-kha) = price. ราคาเท่าไหร่ = what's the price?",
  },
  {
    id: "shop-mc-2", type: "multiple_choice",
    instruction: "ถูก = ?",
    question: "ถูก", thaiText: "ถูก", romanization: "thuk",
    options: { choices: [{ id: "a", text: "expensive" }, { id: "b", text: "free" }, { id: "c", text: "cheap" }, { id: "d", text: "medium" }] },
    correctAnswer: "c", explanation: "ถูก (thuk) = cheap. Also means 'correct' — context matters!",
  },
  {
    id: "shop-mc-3", type: "multiple_choice",
    instruction: "แพง = ?",
    question: "แพง", thaiText: "แพง", romanization: "phaeng",
    options: { choices: [{ id: "a", text: "cheap" }, { id: "b", text: "expensive" }, { id: "c", text: "free" }, { id: "d", text: "on sale" }] },
    correctAnswer: "b", explanation: "แพง (phaeng) = expensive. แพงไป = too expensive.",
  },
  {
    id: "shop-match-1", type: "match_pairs",
    instruction: "Match shopping words",
    question: "Match each Thai word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ซื้อ (sue)", english: "buy" },
        { id: "2", thai: "ขาย (khai)", english: "sell" },
        { id: "3", thai: "ราคา (ra-kha)", english: "price" },
        { id: "4", thai: "ลดราคา (lot ra-kha)", english: "discount" },
      ],
    },
    correctAnswer: {},
    explanation: "ซื้อ=buy, ขาย=sell, ราคา=price, ลดราคา=discount.",
  },
  {
    id: "shop-mc-4", type: "multiple_choice",
    instruction: "เท่าไหร่ = ?",
    question: "เท่าไหร่", thaiText: "เท่าไหร่", romanization: "thao-rai",
    options: { choices: [{ id: "a", text: "how many?" }, { id: "b", text: "how much?" }, { id: "c", text: "what size?" }, { id: "d", text: "what color?" }] },
    correctAnswer: "b", explanation: "เท่าไหร่ (thao-rai) = how much? Use it for prices everywhere.",
  },
];

const BARGAINING: ActiveExercise[] = [
  {
    id: "barg-mc-1", type: "multiple_choice",
    instruction: "ลดได้ไหม = ?",
    question: "ลดได้ไหม", thaiText: "ลดได้ไหม", romanization: "lot dai mai",
    options: { choices: [{ id: "a", text: "Can I try this on?" }, { id: "b", text: "Do you have another color?" }, { id: "c", text: "Can you lower the price?" }, { id: "d", text: "Is this new?" }] },
    correctAnswer: "c", explanation: "ลดได้ไหม = Can you reduce the price? ลด = reduce, ได้ไหม = can you?",
  },
  {
    id: "barg-mc-2", type: "multiple_choice",
    instruction: "แพงไป = ?",
    question: "แพงไป", thaiText: "แพงไป", romanization: "phaeng pai",
    options: { choices: [{ id: "a", text: "Good price!" }, { id: "b", text: "Too expensive!" }, { id: "c", text: "Same price" }, { id: "d", text: "A bit cheaper" }] },
    correctAnswer: "b", explanation: "แพงไป (phaeng pai) = too expensive! ไป makes it 'too much'.",
  },
  {
    id: "barg-fill-1", type: "fill_blank",
    instruction: "Fill in: 'Can you discount a little?'",
    question: "ลด___ ได้ไหม (discount a little?)",
    options: { sentence: "ลด ___ ได้ไหม", blanks: [{ position: 0, answer: "หน่อย" }] },
    correctAnswer: "หน่อย",
    explanation: "หน่อย (noi) = a little/a bit. ลดหน่อยได้ไหม = can you discount a bit?",
  },
  {
    id: "barg-match-1", type: "match_pairs",
    instruction: "Match bargaining phrases",
    question: "Match each phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ลดได้ไหม", english: "Can you lower the price?" },
        { id: "2", thai: "แพงไป", english: "Too expensive!" },
        { id: "3", thai: "ถูกกว่านี้ได้ไหม", english: "Can it be cheaper?" },
        { id: "4", thai: "ราคาสุดท้าย", english: "Final / best price" },
      ],
    },
    correctAnswer: {},
    explanation: "Bargaining is expected at Thai markets — use these phrases confidently!",
  },
  {
    id: "barg-mc-3", type: "multiple_choice",
    instruction: "How do you say 'I'll take it'?",
    question: "You've agreed on a price. What do you say?",
    options: { choices: [{ id: "a", text: "ไม่เอา (not taking it)" }, { id: "b", text: "เอาเลย (I'll take it!)" }, { id: "c", text: "แพงไป (too expensive)" }, { id: "d", text: "ลดได้ไหม (can you lower?)" }] },
    correctAnswer: "b", explanation: "เอาเลย (ao loei) = I'll take it! / Deal! เอา = take/want.",
  },
];

const EMERGENCY_PHRASES: ActiveExercise[] = [
  {
    id: "emerg-mc-1", type: "multiple_choice",
    instruction: "ช่วยด้วย = ?",
    question: "ช่วยด้วย", thaiText: "ช่วยด้วย", romanization: "chuay duay",
    options: { choices: [{ id: "a", text: "Thank you!" }, { id: "b", text: "Excuse me" }, { id: "c", text: "Help!" }, { id: "d", text: "I'm lost" }] },
    correctAnswer: "c", explanation: "ช่วยด้วย (chuay duay) = Help! ช่วย = help, ด้วย = also/with.",
  },
  {
    id: "emerg-mc-2", type: "multiple_choice",
    instruction: "โทรตำรวจ = ?",
    question: "โทรตำรวจ", thaiText: "โทรตำรวจ", romanization: "tho tam-ruat",
    options: { choices: [{ id: "a", text: "Call an ambulance" }, { id: "b", text: "Call the police" }, { id: "c", text: "Call a doctor" }, { id: "d", text: "Call the fire department" }] },
    correctAnswer: "b", explanation: "โทรตำรวจ = call the police. โทร = call (telephone), ตำรวจ = police.",
  },
  {
    id: "emerg-mc-3", type: "multiple_choice",
    instruction: "ฉันเจ็บ = ?",
    question: "ฉันเจ็บ", thaiText: "ฉันเจ็บ", romanization: "chan jep",
    options: { choices: [{ id: "a", text: "I'm lost" }, { id: "b", text: "I'm sick" }, { id: "c", text: "I'm hurt" }, { id: "d", text: "I need water" }] },
    correctAnswer: "c", explanation: "ฉันเจ็บ = I'm hurt. เจ็บ = hurt/pain. ฉัน = I (female) / can be used by anyone.",
  },
  {
    id: "emerg-match-1", type: "match_pairs",
    instruction: "Match emergency phrases",
    question: "Match each phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ช่วยด้วย", english: "Help!" },
        { id: "2", thai: "โทรตำรวจ", english: "Call the police" },
        { id: "3", thai: "ฉันเจ็บ", english: "I'm hurt" },
        { id: "4", thai: "โรงพยาบาล", english: "hospital" },
      ],
    },
    correctAnswer: {},
    explanation: "Emergency Thai 191=police, 1669=ambulance, 199=fire.",
  },
  {
    id: "emerg-mc-4", type: "multiple_choice",
    instruction: "What is the emergency number for police in Thailand?",
    question: "Thailand police emergency number?",
    options: { choices: [{ id: "a", text: "999" }, { id: "b", text: "112" }, { id: "c", text: "191" }, { id: "d", text: "911" }] },
    correctAnswer: "c", explanation: "191 = Thai police. 1669 = ambulance. 199 = fire department. Save these!",
  },
];

const HOSPITAL: ActiveExercise[] = [
  {
    id: "hosp-mc-1", type: "multiple_choice",
    instruction: "หมอ = ?",
    question: "หมอ", thaiText: "หมอ", romanization: "mo",
    options: { choices: [{ id: "a", text: "nurse" }, { id: "b", text: "doctor" }, { id: "c", text: "medicine" }, { id: "d", text: "hospital" }] },
    correctAnswer: "b", explanation: "หมอ (mo) = doctor. More formally: แพทย์ (phaet). หมอฟัน = dentist.",
  },
  {
    id: "hosp-mc-2", type: "multiple_choice",
    instruction: "ยา = ?",
    question: "ยา", thaiText: "ยา", romanization: "ya",
    options: { choices: [{ id: "a", text: "doctor" }, { id: "b", text: "hospital" }, { id: "c", text: "medicine / drug" }, { id: "d", text: "nurse" }] },
    correctAnswer: "c", explanation: "ยา (ya) = medicine/drug. ยาแก้ปวด = painkiller.",
  },
  {
    id: "hosp-mc-3", type: "multiple_choice",
    instruction: "ปวดหัว = ?",
    question: "ปวดหัว", thaiText: "ปวดหัว", romanization: "puat hua",
    options: { choices: [{ id: "a", text: "stomachache" }, { id: "b", text: "headache" }, { id: "c", text: "toothache" }, { id: "d", text: "backache" }] },
    correctAnswer: "b", explanation: "ปวดหัว (puat hua) = headache. ปวด = ache/hurt, หัว = head.",
  },
  {
    id: "hosp-match-1", type: "match_pairs",
    instruction: "Match hospital words",
    question: "Match each Thai word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "หมอ (mo)", english: "doctor" },
        { id: "2", thai: "พยาบาล (pha-ya-ban)", english: "nurse" },
        { id: "3", thai: "ยา (ya)", english: "medicine" },
        { id: "4", thai: "โรงพยาบาล (rong-pha-ya-ban)", english: "hospital" },
      ],
    },
    correctAnswer: {},
    explanation: "หมอ=doctor, พยาบาล=nurse, ยา=medicine, โรงพยาบาล=hospital.",
  },
  {
    id: "hosp-mc-4", type: "multiple_choice",
    instruction: "How do you say 'I have a stomachache'?",
    question: "I have a stomachache.",
    options: { choices: [{ id: "a", text: "ฉันปวดหัว" }, { id: "b", text: "ฉันเป็นไข้" }, { id: "c", text: "ฉันปวดท้อง" }, { id: "d", text: "ฉันเจ็บคอ" }] },
    correctAnswer: "c", explanation: "ฉันปวดท้อง (chan puat thong) = I have a stomachache. ท้อง = stomach.",
  },
];

// Extra greetings exercises for polite-particles and greet-practice lessons
const POLITE_EXTRA: ActiveExercise[] = [
  {
    id: "pol-mc-1", type: "multiple_choice",
    instruction: "ค่ะ/คะ is used by whom?",
    question: "Who uses ค่ะ or คะ at the end of sentences?",
    options: { choices: [{ id: "a", text: "Men" }, { id: "b", text: "Women" }, { id: "c", text: "Both" }, { id: "d", text: "Neither — it's optional" }] },
    correctAnswer: "b", explanation: "ค่ะ (statement) and คะ (question) are used by women. Men use ครับ for both.",
  },
  {
    id: "pol-mc-2", type: "multiple_choice",
    instruction: "How do you greet someone in the evening politely (as a male)?",
    question: "Polite evening greeting (male speaker):",
    options: { choices: [{ id: "a", text: "สวัสดีค่ะ" }, { id: "b", text: "สวัสดีครับ" }, { id: "c", text: "สวัสดีนะ" }, { id: "d", text: "สวัสดีจ้า" }] },
    correctAnswer: "b", explanation: "สวัสดีครับ is the polite male greeting used at any time of day.",
  },
];

const PRACTICE_EXTRA: ActiveExercise[] = [
  {
    id: "prac-mc-1", type: "multiple_choice",
    instruction: "Someone says สวัสดีครับ to you. How do you respond?",
    question: "Someone says สวัสดีครับ — you reply:",
    options: { choices: [{ id: "a", text: "ขอบคุณครับ/ค่ะ" }, { id: "b", text: "สวัสดีครับ/ค่ะ" }, { id: "c", text: "ไม่เป็นไร" }, { id: "d", text: "ขอโทษครับ/ค่ะ" }] },
    correctAnswer: "b", explanation: "You greet back with สวัสดีครับ/ค่ะ — Thai greetings are reciprocal!",
  },
  {
    id: "prac-mc-2", type: "multiple_choice",
    instruction: "ไม่เป็นไร has how many meanings?",
    question: "ไม่เป็นไร can mean:",
    options: {
      choices: [
        { id: "a", text: "Only 'you're welcome'" },
        { id: "b", text: "Only 'never mind'" },
        { id: "c", text: "You're welcome / Never mind / It's OK" },
        { id: "d", text: "Only 'sorry'" },
      ],
    },
    correctAnswer: "c", explanation: "ไม่เป็นไร is extremely versatile — one of the most useful Thai phrases!",
  },
];

const LESSON_MAP: Record<string, ActiveExercise[]> = {
  // Greetings module
  "greetings/greet-basics": [
    ...GREETINGS_EXERCISES.filter((e) => ["greet-mc-1", "greet-match-1", "greet-mc-3"].includes(e.id)),
  ],
  "greetings/polite-particles": [
    ...GREETINGS_EXERCISES.filter((e) => ["greet-mc-2", "greet-fill-1"].includes(e.id)),
    ...POLITE_EXTRA,
  ],
  "greetings/greet-practice": [
    ...GREETINGS_EXERCISES.filter((e) => ["greet-drag-1"].includes(e.id)),
    ...PRACTICE_EXTRA,
  ],

  // Numbers module
  "numbers/numbers-1-10": NUMBERS_1_10,
  "numbers/numbers-11-100": NUMBERS_11_100,
  "numbers/classifiers": CLASSIFIERS,

  // Food module
  "food/food-vocab": FOOD_VOCAB,
  "food/ordering-food": ORDERING_FOOD,
  "food/food-listening": FOOD_LISTENING,

  // Transport module
  "transport/transport-vocab": TRANSPORT_VOCAB,
  "transport/directions": DIRECTIONS,

  // Shopping module
  "shopping/shopping-vocab": SHOPPING_VOCAB,
  "shopping/bargaining": BARGAINING,

  // Emergency module
  "emergency/emergency-phrases": EMERGENCY_PHRASES,
  "emergency/hospital": HOSPITAL,

  // Family module
  "family/family-vocab": FAMILY_VOCAB,
  "family/relationships": FAMILY_RELATIONSHIPS,
  "family/family-conversation": FAMILY_CONVERSATION,

  // Time & Date module
  "time/time-vocab": TIME_VOCAB,
  "time/days-months": DAYS_MONTHS,
  "time/time-phrases": TIME_PHRASES,

  // Weather module
  "weather/weather-vocab": WEATHER_VOCAB,
  "weather/seasons": THAI_SEASONS,

  // Culture module
  "culture/customs": THAI_CUSTOMS,
  "culture/festivals": THAI_FESTIVALS,

  // Work module
  "work/work-vocab": WORK_VOCAB,
  "work/office-phrases": OFFICE_PHRASES,

  // Emotions module
  "emotions/emotions-vocab": EMOTIONS_VOCAB,
  "emotions/emotions-expressions": EMOTIONS_EXPRESSIONS,

  // Colors & Adjectives module
  "colors/colors-vocab": COLORS_VOCAB,
  "colors/adjectives": COLORS_ADJECTIVES,

  // Body module
  "body/body-parts": BODY_PARTS,
  "body/body-phrases": BODY_PHRASES,

  // Animals & Nature module
  "animals/animals-vocab": ANIMALS_VOCAB,
  "animals/nature-vocab": NATURE_VOCAB,

  // Slang module
  "slang/thai-slang": THAI_SLANG,
  "slang/casual-speech": CASUAL_SPEECH,

  // Province Adventure Lessons
  "province/lesson/bangkok": PROVINCE_BANGKOK,
  "province/lesson/chiang_mai": PROVINCE_CHIANG_MAI,
  "province/lesson/phuket": PROVINCE_PHUKET,
  "province/lesson/ayutthaya": PROVINCE_AYUTTHAYA,
  "province/lesson/krabi": PROVINCE_KRABI,
  "province/lesson/chiang_rai": PROVINCE_CHIANG_RAI,
};

export function getLessonExercises(moduleId: string, lessonId: string): ActiveExercise[] {
  return LESSON_MAP[`${moduleId}/${lessonId}`] ?? GREETINGS_EXERCISES;
}
