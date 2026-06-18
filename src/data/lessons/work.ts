import type { ActiveExercise } from "@/types/lesson";

export const WORK_VOCAB: ActiveExercise[] = [
  {
    id: "work-mc-1", type: "multiple_choice",
    instruction: "ทำงาน = ?",
    question: "ทำงาน", thaiText: "ทำงาน", romanization: "tham ngan",
    options: { choices: [{ id: "a", text: "go to school" }, { id: "b", text: "to work" }, { id: "c", text: "to study" }, { id: "d", text: "to sleep" }] },
    correctAnswer: "b", explanation: "ทำงาน (tham ngan) = to work. ทำ = do, งาน = work/job.",
  },
  {
    id: "work-mc-2", type: "multiple_choice",
    instruction: "บริษัท = ?",
    question: "บริษัท", thaiText: "บริษัท", romanization: "bo-ri-sat",
    options: { choices: [{ id: "a", text: "school" }, { id: "b", text: "hospital" }, { id: "c", text: "company" }, { id: "d", text: "government office" }] },
    correctAnswer: "c", explanation: "บริษัท (bo-ri-sat) = company/corporation.",
  },
  {
    id: "work-mc-3", type: "multiple_choice",
    instruction: "ประชุม = ?",
    question: "ประชุม", thaiText: "ประชุม", romanization: "pra-chum",
    options: { choices: [{ id: "a", text: "presentation" }, { id: "b", text: "lunch break" }, { id: "c", text: "meeting" }, { id: "d", text: "report" }] },
    correctAnswer: "c", explanation: "ประชุม (pra-chum) = meeting. มีประชุม = there is a meeting.",
  },
  {
    id: "work-match-1", type: "match_pairs",
    instruction: "Match work vocabulary",
    question: "Match each Thai word to its English meaning",
    options: {
      pairs: [
        { id: "1", thai: "ทำงาน (tham ngan)", english: "to work" },
        { id: "2", thai: "เงินเดือน (ngoen deuan)", english: "salary" },
        { id: "3", thai: "หัวหน้า (hua na)", english: "boss / supervisor" },
        { id: "4", thai: "ลูกน้อง (luk nong)", english: "subordinate / staff" },
      ],
    },
    correctAnswer: {},
    explanation: "หัวหน้า = head person (literally), ลูกน้อง = child-below (subordinate).",
  },
  {
    id: "work-mc-4", type: "multiple_choice",
    instruction: "ลาป่วย = ?",
    question: "ลาป่วย", thaiText: "ลาป่วย", romanization: "la puai",
    options: { choices: [{ id: "a", text: "annual leave" }, { id: "b", text: "sick leave" }, { id: "c", text: "overtime" }, { id: "d", text: "resignation" }] },
    correctAnswer: "b", explanation: "ลา (la) = to take leave, ป่วย (puai) = sick. ลาป่วย = sick leave.",
  },
];

export const OFFICE_PHRASES: ActiveExercise[] = [
  {
    id: "off-mc-1", type: "multiple_choice",
    instruction: "ประชุมกี่โมง = ?",
    question: "ประชุมกี่โมง", thaiText: "ประชุมกี่โมง", romanization: "pra-chum gee mong",
    options: { choices: [{ id: "a", text: "Who is in the meeting?" }, { id: "b", text: "What time is the meeting?" }, { id: "c", text: "Where is the meeting?" }, { id: "d", text: "Is the meeting canceled?" }] },
    correctAnswer: "b", explanation: "ประชุมกี่โมง = What time is the meeting? กี่โมง = what time.",
  },
  {
    id: "off-mc-2", type: "multiple_choice",
    instruction: "ส่งอีเมลแล้ว = ?",
    question: "ส่งอีเมลแล้ว", thaiText: "ส่งอีเมลแล้ว", romanization: "song ee-mel laew",
    options: { choices: [{ id: "a", text: "I'll send the email" }, { id: "b", text: "The email was deleted" }, { id: "c", text: "I've already sent the email" }, { id: "d", text: "Please check your email" }] },
    correctAnswer: "c", explanation: "ส่ง = send, แล้ว = already. ส่งอีเมลแล้ว = already sent the email.",
  },
  {
    id: "off-mc-3", type: "multiple_choice",
    instruction: "How do you say 'I'm busy' politely?",
    question: "I'm busy right now (polite).",
    options: {
      choices: [
        { id: "a", text: "ฉันง่วง" },
        { id: "b", text: "ฉันไม่ว่าง" },
        { id: "c", text: "ฉันหิว" },
        { id: "d", text: "ฉันลาออก" },
      ],
    },
    correctAnswer: "b", explanation: "ฉันไม่ว่าง (chan mai wang) = I'm not free / I'm busy. ว่าง = free/available.",
  },
  {
    id: "off-match-1", type: "match_pairs",
    instruction: "Match office phrases",
    question: "Match each Thai phrase to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ไม่ว่าง (mai wang)", english: "busy / not available" },
        { id: "2", thai: "เสร็จแล้ว (set laew)", english: "finished / done" },
        { id: "3", thai: "กำลังทำ (gam-lang tham)", english: "currently doing" },
        { id: "4", thai: "รอสักครู่ (ro sak khru)", english: "please wait a moment" },
      ],
    },
    correctAnswer: {},
    explanation: "รอสักครู่ is very useful in any service situation in Thailand.",
  },
  {
    id: "off-drag-1", type: "drag_drop",
    instruction: "Arrange: 'I have a meeting at 2 PM'",
    question: "Arrange: meeting at 2 PM",
    options: { words: ["มีประชุม", "บ่ายสองโมง"] },
    correctAnswer: ["มีประชุม", "บ่ายสองโมง"],
    explanation: "มีประชุม = have a meeting, บ่ายสองโมง = 2 PM (afternoon).",
  },
];
