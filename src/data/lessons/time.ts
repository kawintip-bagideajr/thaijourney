import type { ActiveExercise } from "@/types/lesson";

export const TIME_VOCAB: ActiveExercise[] = [
  {
    id: "time-mc-1", type: "multiple_choice",
    instruction: "กี่โมง = ?",
    question: "กี่โมง", thaiText: "กี่โมง", romanization: "gee mong",
    options: { choices: [{ id: "a", text: "What time is it?" }, { id: "b", text: "How long?" }, { id: "c", text: "What day?" }, { id: "d", text: "How many hours?" }] },
    correctAnswer: "a", explanation: "กี่โมง (gee mong) = What time is it? กี่ = how many, โมง = o'clock.",
  },
  {
    id: "time-mc-2", type: "multiple_choice",
    instruction: "สามโมงเช้า = ?",
    question: "สามโมงเช้า", thaiText: "สามโมงเช้า", romanization: "sam mong chao",
    options: { choices: [{ id: "a", text: "3 PM" }, { id: "b", text: "3 AM (morning)" }, { id: "c", text: "3:30 AM" }, { id: "d", text: "13:00" }] },
    correctAnswer: "b", explanation: "เช้า (chao) = morning. สามโมงเช้า = 3 in the morning (3 AM).",
  },
  {
    id: "time-mc-3", type: "multiple_choice",
    instruction: "ตอนเย็น = ?",
    question: "ตอนเย็น", thaiText: "ตอนเย็น", romanization: "ton yen",
    options: { choices: [{ id: "a", text: "morning" }, { id: "b", text: "noon" }, { id: "c", text: "evening / late afternoon" }, { id: "d", text: "midnight" }] },
    correctAnswer: "c", explanation: "ตอนเย็น (ton yen) = in the evening (roughly 4–7 PM). เย็น also means cool.",
  },
  {
    id: "time-match-1", type: "match_pairs",
    instruction: "Match time words",
    question: "Match each Thai word to the time of day",
    options: {
      pairs: [
        { id: "1", thai: "เช้า (chao)", english: "morning" },
        { id: "2", thai: "เที่ยง (thiang)", english: "noon" },
        { id: "3", thai: "เย็น (yen)", english: "evening" },
        { id: "4", thai: "คืน (khuen)", english: "night" },
      ],
    },
    correctAnswer: {},
    explanation: "Thai has four main time-of-day words: เช้า, เที่ยง, เย็น, and คืน.",
  },
  {
    id: "time-mc-4", type: "multiple_choice",
    instruction: "ครึ่งชั่วโมง = ?",
    question: "ครึ่งชั่วโมง", thaiText: "ครึ่งชั่วโมง", romanization: "khrueng chua mong",
    options: { choices: [{ id: "a", text: "one hour" }, { id: "b", text: "15 minutes" }, { id: "c", text: "half an hour" }, { id: "d", text: "two hours" }] },
    correctAnswer: "c", explanation: "ครึ่ง (khrueng) = half, ชั่วโมง (chua mong) = hour. ครึ่งชั่วโมง = 30 minutes.",
  },
];

export const DAYS_MONTHS: ActiveExercise[] = [
  {
    id: "day-mc-1", type: "multiple_choice",
    instruction: "วันจันทร์ = ?",
    question: "วันจันทร์", thaiText: "วันจันทร์", romanization: "wan jan",
    options: { choices: [{ id: "a", text: "Sunday" }, { id: "b", text: "Tuesday" }, { id: "c", text: "Monday" }, { id: "d", text: "Saturday" }] },
    correctAnswer: "c", explanation: "วันจันทร์ (wan jan) = Monday. Thai days are named after planets: จันทร์ = moon.",
  },
  {
    id: "day-mc-2", type: "multiple_choice",
    instruction: "วันศุกร์ = ?",
    question: "วันศุกร์", thaiText: "วันศุกร์", romanization: "wan suk",
    options: { choices: [{ id: "a", text: "Thursday" }, { id: "b", text: "Friday" }, { id: "c", text: "Wednesday" }, { id: "d", text: "Saturday" }] },
    correctAnswer: "b", explanation: "วันศุกร์ (wan suk) = Friday. ศุกร์ relates to the planet Venus.",
  },
  {
    id: "day-mc-3", type: "multiple_choice",
    instruction: "วันหยุด = ?",
    question: "วันหยุด", thaiText: "วันหยุด", romanization: "wan yut",
    options: { choices: [{ id: "a", text: "working day" }, { id: "b", text: "holiday / day off" }, { id: "c", text: "Monday" }, { id: "d", text: "Sunday" }] },
    correctAnswer: "b", explanation: "วันหยุด (wan yut) = holiday or day off. หยุด = stop/rest.",
  },
  {
    id: "day-match-1", type: "match_pairs",
    instruction: "Match the days",
    question: "Match each Thai day to English",
    options: {
      pairs: [
        { id: "1", thai: "วันจันทร์", english: "Monday" },
        { id: "2", thai: "วันพุธ (wan phut)", english: "Wednesday" },
        { id: "3", thai: "วันศุกร์", english: "Friday" },
        { id: "4", thai: "วันอาทิตย์ (wan a-thit)", english: "Sunday" },
      ],
    },
    correctAnswer: {},
    explanation: "Thai days: จันทร์, อังคาร, พุธ, พฤหัส, ศุกร์, เสาร์, อาทิตย์.",
  },
  {
    id: "day-mc-4", type: "multiple_choice",
    instruction: "เดือนมกราคม = ?",
    question: "เดือนมกราคม", thaiText: "เดือนมกราคม", romanization: "deuan mok-ga-ra-khom",
    options: { choices: [{ id: "a", text: "December" }, { id: "b", text: "March" }, { id: "c", text: "January" }, { id: "d", text: "February" }] },
    correctAnswer: "c", explanation: "มกราคม (mok-ga-ra-khom) = January. เดือน (deuan) = month.",
  },
];

export const TIME_PHRASES: ActiveExercise[] = [
  {
    id: "tp-mc-1", type: "multiple_choice",
    instruction: "เมื่อวาน = ?",
    question: "เมื่อวาน", thaiText: "เมื่อวาน", romanization: "mua wan",
    options: { choices: [{ id: "a", text: "today" }, { id: "b", text: "tomorrow" }, { id: "c", text: "yesterday" }, { id: "d", text: "next week" }] },
    correctAnswer: "c", explanation: "เมื่อวาน (mua wan) = yesterday. วันนี้ = today, พรุ่งนี้ = tomorrow.",
  },
  {
    id: "tp-mc-2", type: "multiple_choice",
    instruction: "พรุ่งนี้ = ?",
    question: "พรุ่งนี้", thaiText: "พรุ่งนี้", romanization: "phrung nee",
    options: { choices: [{ id: "a", text: "yesterday" }, { id: "b", text: "today" }, { id: "c", text: "tomorrow" }, { id: "d", text: "next month" }] },
    correctAnswer: "c", explanation: "พรุ่งนี้ (phrung nee) = tomorrow. มะรืน (ma-ruen) = the day after tomorrow.",
  },
  {
    id: "tp-mc-3", type: "multiple_choice",
    instruction: "นัดกี่โมง = ?",
    question: "นัดกี่โมง", thaiText: "นัดกี่โมง", romanization: "nat gee mong",
    options: { choices: [{ id: "a", text: "Where do we meet?" }, { id: "b", text: "What time is the appointment?" }, { id: "c", text: "Who made the appointment?" }, { id: "d", text: "How far is it?" }] },
    correctAnswer: "b", explanation: "นัด (nat) = appointment/meeting. นัดกี่โมง = what time is the meeting?",
  },
  {
    id: "tp-match-1", type: "match_pairs",
    instruction: "Match time expressions",
    question: "Match each phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "เมื่อวาน (mua wan)", english: "yesterday" },
        { id: "2", thai: "วันนี้ (wan nee)", english: "today" },
        { id: "3", thai: "พรุ่งนี้ (phrung nee)", english: "tomorrow" },
        { id: "4", thai: "สัปดาห์หน้า (sap-da na)", english: "next week" },
      ],
    },
    correctAnswer: {},
    explanation: "หน้า = next (future), ที่แล้ว = last/past.",
  },
  {
    id: "tp-drag-1", type: "drag_drop",
    instruction: "Arrange: 'I'll meet you tomorrow at 3 PM'",
    question: "Arrange: meet you tomorrow at 3",
    options: { words: ["พรุ่งนี้", "บ่ายสามโมง", "เจอกัน"] },
    correctAnswer: ["เจอกัน", "พรุ่งนี้", "บ่ายสามโมง"],
    explanation: "เจอกัน = meet each other, บ่ายสามโมง = 3 PM (บ่าย = afternoon).",
  },
];
