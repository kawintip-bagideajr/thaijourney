export type ConsonantClass = "high" | "mid" | "low";

export interface ThaiConsonant {
  id: string;
  thai: string;
  rtgs: string;
  ipaInitial: string;
  ipaFinal: string;
  class: ConsonantClass;
  example: string;
  exampleMeaning: string;
  category: string;
}

export interface ThaiVowel {
  id: string;
  thai: string;
  rtgs: string;
  ipa: string;
  length: "short" | "long";
  example: string;
  exampleMeaning: string;
}

export interface ToneMark {
  id: string;
  name: string;
  thai: string;
  symbol: string;
  description: string;
}

export const CONSONANTS: ThaiConsonant[] = [
  { id: "ก", thai: "ก", rtgs: "k", ipaInitial: "k", ipaFinal: "k", class: "mid", example: "ไก่", exampleMeaning: "chicken", category: "mid" },
  { id: "ข", thai: "ข", rtgs: "kh", ipaInitial: "kʰ", ipaFinal: "k", class: "high", example: "ไข่", exampleMeaning: "egg", category: "high" },
  { id: "ค", thai: "ค", rtgs: "kh", ipaInitial: "kʰ", ipaFinal: "k", class: "low", example: "ควาย", exampleMeaning: "buffalo", category: "low" },
  { id: "ง", thai: "ง", rtgs: "ng", ipaInitial: "ŋ", ipaFinal: "ŋ", class: "low", example: "งู", exampleMeaning: "snake", category: "low" },
  { id: "จ", thai: "จ", rtgs: "ch", ipaInitial: "tɕ", ipaFinal: "t", class: "mid", example: "จาน", exampleMeaning: "plate", category: "mid" },
  { id: "ช", thai: "ช", rtgs: "ch", ipaInitial: "tɕʰ", ipaFinal: "t", class: "low", example: "ช้าง", exampleMeaning: "elephant", category: "low" },
  { id: "ซ", thai: "ซ", rtgs: "s", ipaInitial: "s", ipaFinal: "t", class: "low", example: "โซ่", exampleMeaning: "chain", category: "low" },
  { id: "ญ", thai: "ญ", rtgs: "y", ipaInitial: "j", ipaFinal: "n", class: "low", example: "หญิง", exampleMeaning: "woman", category: "low" },
  { id: "ด", thai: "ด", rtgs: "d", ipaInitial: "d", ipaFinal: "t", class: "mid", example: "เด็ก", exampleMeaning: "child", category: "mid" },
  { id: "ต", thai: "ต", rtgs: "t", ipaInitial: "t", ipaFinal: "t", class: "mid", example: "ตา", exampleMeaning: "eye/grandfather", category: "mid" },
  { id: "ถ", thai: "ถ", rtgs: "th", ipaInitial: "tʰ", ipaFinal: "t", class: "high", example: "ถุง", exampleMeaning: "bag", category: "high" },
  { id: "ท", thai: "ท", rtgs: "th", ipaInitial: "tʰ", ipaFinal: "t", class: "low", example: "ทหาร", exampleMeaning: "soldier", category: "low" },
  { id: "น", thai: "น", rtgs: "n", ipaInitial: "n", ipaFinal: "n", class: "low", example: "หนู", exampleMeaning: "mouse/rat", category: "low" },
  { id: "บ", thai: "บ", rtgs: "b", ipaInitial: "b", ipaFinal: "p", class: "mid", example: "ใบไม้", exampleMeaning: "leaf", category: "mid" },
  { id: "ป", thai: "ป", rtgs: "p", ipaInitial: "p", ipaFinal: "p", class: "mid", example: "ปลา", exampleMeaning: "fish", category: "mid" },
  { id: "ผ", thai: "ผ", rtgs: "ph", ipaInitial: "pʰ", ipaFinal: "-", class: "high", example: "ผึ้ง", exampleMeaning: "bee", category: "high" },
  { id: "ฝ", thai: "ฝ", rtgs: "f", ipaInitial: "f", ipaFinal: "-", class: "high", example: "ฝา", exampleMeaning: "lid", category: "high" },
  { id: "พ", thai: "พ", rtgs: "ph", ipaInitial: "pʰ", ipaFinal: "p", class: "low", example: "พาน", exampleMeaning: "tray", category: "low" },
  { id: "ฟ", thai: "ฟ", rtgs: "f", ipaInitial: "f", ipaFinal: "p", class: "low", example: "ฟัน", exampleMeaning: "teeth", category: "low" },
  { id: "ม", thai: "ม", rtgs: "m", ipaInitial: "m", ipaFinal: "m", class: "low", example: "ม้า", exampleMeaning: "horse", category: "low" },
  { id: "ย", thai: "ย", rtgs: "y", ipaInitial: "j", ipaFinal: "j", class: "low", example: "ยักษ์", exampleMeaning: "giant", category: "low" },
  { id: "ร", thai: "ร", rtgs: "r", ipaInitial: "r", ipaFinal: "n", class: "low", example: "เรือ", exampleMeaning: "boat", category: "low" },
  { id: "ล", thai: "ล", rtgs: "l", ipaInitial: "l", ipaFinal: "n", class: "low", example: "ลิง", exampleMeaning: "monkey", category: "low" },
  { id: "ว", thai: "ว", rtgs: "w", ipaInitial: "w", ipaFinal: "w", class: "low", example: "แหวน", exampleMeaning: "ring", category: "low" },
  { id: "ส", thai: "ส", rtgs: "s", ipaInitial: "s", ipaFinal: "t", class: "high", example: "เสือ", exampleMeaning: "tiger", category: "high" },
  { id: "ห", thai: "ห", rtgs: "h", ipaInitial: "h", ipaFinal: "-", class: "high", example: "หีบ", exampleMeaning: "box/chest", category: "high" },
  { id: "อ", thai: "อ", rtgs: "-", ipaInitial: "ʔ", ipaFinal: "ʔ", class: "mid", example: "อ่าง", exampleMeaning: "basin", category: "mid" },
  { id: "ฮ", thai: "ฮ", rtgs: "h", ipaInitial: "h", ipaFinal: "-", class: "low", example: "นกฮูก", exampleMeaning: "owl", category: "low" },
];

export const VOWELS: ThaiVowel[] = [
  { id: "อะ", thai: "อะ / อั", rtgs: "a", ipa: "a", length: "short", example: "กัน", exampleMeaning: "each other" },
  { id: "อา", thai: "อา", rtgs: "aa", ipa: "aː", length: "long", example: "ปลา", exampleMeaning: "fish" },
  { id: "อิ", thai: "อิ", rtgs: "i", ipa: "i", length: "short", example: "กิน", exampleMeaning: "eat" },
  { id: "อี", thai: "อี", rtgs: "ii", ipa: "iː", length: "long", example: "ดี", exampleMeaning: "good" },
  { id: "อึ", thai: "อึ", rtgs: "ue", ipa: "ɯ", length: "short", example: "จึง", exampleMeaning: "therefore" },
  { id: "อื", thai: "อื", rtgs: "uue", ipa: "ɯː", length: "long", example: "มือ", exampleMeaning: "hand" },
  { id: "อุ", thai: "อุ", rtgs: "u", ipa: "u", length: "short", example: "กุ้ง", exampleMeaning: "shrimp" },
  { id: "อู", thai: "อู", rtgs: "uu", ipa: "uː", length: "long", example: "ดู", exampleMeaning: "watch/look" },
  { id: "เอะ", thai: "เอะ / เอ็", rtgs: "e", ipa: "e", length: "short", example: "เก็บ", exampleMeaning: "collect" },
  { id: "เอ", thai: "เอ", rtgs: "ee", ipa: "eː", length: "long", example: "เก", exampleMeaning: "lazy" },
  { id: "แอะ", thai: "แอะ", rtgs: "ae", ipa: "ɛ", length: "short", example: "แกะ", exampleMeaning: "sheep" },
  { id: "แอ", thai: "แอ", rtgs: "aae", ipa: "ɛː", length: "long", example: "แมว", exampleMeaning: "cat" },
  { id: "โอะ", thai: "โอะ", rtgs: "o", ipa: "o", length: "short", example: "โต๊ะ", exampleMeaning: "table" },
  { id: "โอ", thai: "โอ", rtgs: "oo", ipa: "oː", length: "long", example: "โต", exampleMeaning: "big" },
  { id: "เอาะ", thai: "เอาะ", rtgs: "o", ipa: "ɔ", length: "short", example: "กอ", exampleMeaning: "(letter ก)" },
  { id: "ออ", thai: "ออ", rtgs: "oo", ipa: "ɔː", length: "long", example: "พ่อ", exampleMeaning: "father" },
  { id: "เอียะ", thai: "เอียะ", rtgs: "ia", ipa: "ia", length: "short", example: "เปียะ", exampleMeaning: "wet (dialect)" },
  { id: "เอีย", thai: "เอีย", rtgs: "ia", ipa: "ia", length: "long", example: "เบียร์", exampleMeaning: "beer" },
];

export const TONE_MARKS: ToneMark[] = [
  { id: "mai_ek", name: "Mai Ek", thai: "ไม้เอก", symbol: "่", description: "Falling tone marker — lowers the tone of the syllable" },
  { id: "mai_tho", name: "Mai Tho", thai: "ไม้โท", symbol: "้", description: "Rising tone marker — modifies tone based on consonant class" },
  { id: "mai_tri", name: "Mai Tri", thai: "ไม้ตรี", symbol: "๊", description: "High tone marker — used mainly with low class consonants" },
  { id: "mai_jattawa", name: "Mai Jattawa", thai: "ไม้จัตวา", symbol: "๋", description: "Rising tone marker — rare, used in specific words" },
  { id: "mai_taikhu", name: "Mai Taikhu", thai: "ไม้ไต่คู้", symbol: "็", description: "Short vowel marker — shortens syllable length" },
];
