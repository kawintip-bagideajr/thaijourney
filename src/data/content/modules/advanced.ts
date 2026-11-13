import { drill, choose, order, fill, lesson } from "../build";
import type { ModuleDef, Word } from "../types";

// ---------- Particles ----------
const P_SOFT: Word[] = [
  { th: "ไว้เจอกันนะ", rom: "wai joe kan na", en: "see you later, okay?" },
  { th: "ขอบคุณนะ", rom: "khop-khun na", en: "thanks a lot (warm)" },
  { th: "รอแป๊บนึงนะ", rom: "ro paep neung na", en: "wait a sec, okay?" },
  { th: "ได้จ้ะ", rom: "dai ja", en: "sure, dear" },
  { th: "ไปไหนจ๊ะ", rom: "pai nai ja", en: "where are you off to, dear?" },
  { th: "ช่วยหน่อย", rom: "chuai noi", en: "give me a hand, please" },
];
const P_PUSH: Word[] = [
  { th: "กินสิ", rom: "kin si", en: "go on, eat!" },
  { th: "มาสิ", rom: "ma si", en: "come on over!" },
  { th: "ไปเลย", rom: "pai loei", en: "go right ahead" },
  { th: "เอาเลย", rom: "ao loei", en: "go for it!" },
  { th: "ไปเถอะ", rom: "pai thoe", en: "let's just go" },
  { th: "พักเถอะ", rom: "phak thoe", en: "just take a rest" },
];
const P_BACK: Word[] = [
  { th: "ไม่เป็นไรหรอก", rom: "mai pen rai rok", en: "oh, it's really nothing" },
  { th: "ไม่แพงหรอก", rom: "mai phaeng rok", en: "it's not that expensive" },
  { th: "แล้วคุณล่ะ", rom: "laeo khun la", en: "and what about you?" },
  { th: "จะไปไหนล่ะ", rom: "ja pai nai la", en: "so where are you going then?" },
  { th: "อะไรน่ะ", rom: "a-rai na", en: "what's that? (curious)" },
  { th: "ก็ฝนตกน่ะ", rom: "ko fon tok na", en: "well, it's raining, you see" },
];
const P_MIX: Word[] = [
  { th: "น่ารักจัง", rom: "na-rak jang", en: "so cute!" },
  { th: "อร่อยจัง", rom: "a-roi jang", en: "so tasty!" },
  { th: "ร้อนเนอะ", rom: "ron noe", en: "hot, isn't it?" },
  { th: "ค่ะ", rom: "kha", en: "polite ending (female, statements)" },
  { th: "คะ", rom: "kha", en: "polite ending (female, questions)" },
  { th: "ครับ", rom: "khrap", en: "polite ending (male)" },
];

// ---------- Tones ----------
const T_FIVE: Word[] = [
  { th: "มา", rom: "ma", en: "to come" },
  { th: "ม้า", rom: "ma", en: "horse" },
  { th: "หมา", rom: "ma", en: "dog" },
  { th: "ไม่", rom: "mai", en: "no / not" },
  { th: "ใหม่", rom: "mai", en: "new" },
  { th: "ไม้", rom: "mai", en: "wood" },
];
const T_MARKS: Word[] = [
  { th: "ปา", rom: "pa", en: "to throw" },
  { th: "ป่า", rom: "pa", en: "forest" },
  { th: "ป้า", rom: "pa", en: "aunt (older than your parent)" },
  { th: "โต๊ะ", rom: "to", en: "table" },
  { th: "ก๋วยเตี๋ยว", rom: "kuai-tiao", en: "noodle soup" },
  { th: "เก้าอี้", rom: "kao-ee", en: "chair" },
];
const T_CLASS: Word[] = [
  { th: "ไก่", rom: "kai", en: "chicken" },
  { th: "ไข่", rom: "khai", en: "egg" },
  { th: "ข้าว", rom: "khao", en: "rice" },
  { th: "ข่าว", rom: "khao", en: "news" },
  { th: "ขาว", rom: "khao", en: "white" },
  { th: "ขา", rom: "kha", en: "leg" },
];
const T_PAIRS: Word[] = [
  { th: "ใกล้", rom: "klai", en: "near" },
  { th: "ไกล", rom: "klai", en: "far" },
  { th: "เสือ", rom: "suea", en: "tiger" },
  { th: "เสื้อ", rom: "suea", en: "shirt" },
  { th: "สวย", rom: "suai", en: "beautiful" },
  { th: "ซวย", rom: "suai", en: "unlucky" },
];

// ---------- Idioms ----------
const I_WATER: Word[] = [
  { th: "น้ำขึ้นให้รีบตัก", rom: "nam khuen hai rip tak", en: "seize the chance while you can" },
  { th: "ตำน้ำพริกละลายแม่น้ำ", rom: "tam nam phrik la-lai mae-nam", en: "waste resources for no return" },
  { th: "น้ำนิ่งไหลลึก", rom: "nam ning lai luek", en: "quiet people run deep" },
  { th: "ช้าๆ ได้พร้าเล่มงาม", rom: "cha cha dai phra lem ngam", en: "slow and steady gets the best result" },
  { th: "ฝนตกไม่ทั่วฟ้า", rom: "fon tok mai thua fa", en: "good things aren't shared equally" },
  { th: "น้ำผึ้งหยดเดียว", rom: "nam phueng yot diao", en: "a tiny thing that sparks a big fight" },
];
const I_ANIMALS: Word[] = [
  { th: "ไก่เห็นตีนงู งูเห็นนมไก่", rom: "kai hen teen ngu, ngu hen nom kai", en: "we both know each other's secrets" },
  { th: "กระต่ายตื่นตูม", rom: "kra-tai tuen toom", en: "panic over nothing" },
  { th: "ไก่ได้พลอย", rom: "kai dai phloi", en: "a treasure given to someone who can't value it" },
  { th: "ขี่ช้างจับตั๊กแตน", rom: "khee chang jap tak-ka-taen", en: "huge effort for a tiny gain" },
  { th: "สอนจระเข้ว่ายน้ำ", rom: "son ja-ra-khe wai nam", en: "teaching an expert their own job" },
  { th: "หมูไปไก่มา", rom: "moo pai kai ma", en: "give and take (trading favors)" },
];
const I_LIFE: Word[] = [
  { th: "เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม", rom: "khao mueang ta lio tong lio ta tam", en: "when in Rome, do as the Romans do" },
  { th: "ปิดทองหลังพระ", rom: "pit thong lang phra", en: "do good without seeking credit" },
  { th: "ใจดีสู้เสือ", rom: "jai dee soo suea", en: "stay calm when facing danger" },
  { th: "จับปลาสองมือ", rom: "jap pla song mue", en: "chase two things and lose both" },
  { th: "ฆ่าควายเสียดายพริก", rom: "kha khwai sia-dai phrik", en: "penny-wise, pound-foolish" },
  { th: "เกลือเป็นหนอน", rom: "kluea pen non", en: "a traitor from within" },
];
const I_USE: Word[] = [
  { th: "สำนวน", rom: "sam-nuan", en: "idiom / figure of speech" },
  { th: "สุภาษิต", rom: "su-pha-sit", en: "proverb (moral saying)" },
  { th: "ชักแม่น้ำทั้งห้า", rom: "chak mae-nam thang ha", en: "flatter at length before asking a favor" },
  { th: "ไม่เห็นโลงศพไม่หลั่งน้ำตา", rom: "mai hen long-sop mai lang nam-ta", en: "won't learn until it's too late" },
  { th: "หัวล้านได้หวี", rom: "hua lan dai wee", en: "getting something useless to you" },
  { th: "คนดีผีคุ้ม", rom: "khon dee phee khum", en: "good people are protected" },
];

// ---------- Opinions ----------
const O_THINK: Word[] = [
  { th: "คิดว่า", rom: "khit wa", en: "to think that" },
  { th: "รู้สึกว่า", rom: "roo-suek wa", en: "to feel that" },
  { th: "ความคิดเห็น", rom: "khwam-khit-hen", en: "opinion" },
  { th: "เห็นด้วย", rom: "hen duai", en: "to agree" },
  { th: "ไม่เห็นด้วย", rom: "mai hen duai", en: "to disagree" },
  { th: "ไม่แน่ใจ", rom: "mai nae-jai", en: "not sure" },
];
const O_AGREE: Word[] = [
  { th: "จริงด้วย", rom: "jing duai", en: "that's so true" },
  { th: "ใช่เลย", rom: "chai loei", en: "exactly!" },
  { th: "ก็ได้", rom: "ko dai", en: "okay, fine I guess" },
  { th: "ไม่ค่อยเห็นด้วย", rom: "mai khoi hen duai", en: "don't quite agree" },
  { th: "แล้วแต่คุณ", rom: "laeo tae khun", en: "up to you" },
  { th: "ไม่จริงหรอก", rom: "mai jing rok", en: "that's not really true" },
];
const O_LINK: Word[] = [
  { th: "เพราะว่า", rom: "phro wa", en: "because" },
  { th: "แต่", rom: "tae", en: "but" },
  { th: "ถ้า", rom: "tha", en: "if" },
  { th: "ก็", rom: "ko", en: "then / so (after ถ้า)" },
  { th: "ดังนั้น", rom: "dang-nan", en: "therefore" },
  { th: "ถึงแม้ว่า", rom: "thueng-mae wa", en: "even though" },
];
const O_COMPARE: Word[] = [
  { th: "ดีกว่า", rom: "dee kwa", en: "better" },
  { th: "กว่า", rom: "kwa", en: "more than" },
  { th: "ที่สุด", rom: "thee-sut", en: "the most" },
  { th: "ดีที่สุด", rom: "dee thee-sut", en: "the best" },
  { th: "เหมือนกัน", rom: "muean kan", en: "the same / alike" },
  { th: "แพงกว่า", rom: "phaeng kwa", en: "more expensive" },
];

// ---------- Dialects ----------
const D_ISAN: Word[] = [
  { th: "แซ่บ", rom: "saep", en: "delicious (Isan)" },
  { th: "เบิ่ง", rom: "boeng", en: "to look (Isan)" },
  { th: "หลาย", rom: "lai", en: "very / a lot (Isan)" },
  { th: "บ่", rom: "bo", en: "no / not (Isan)" },
  { th: "เฮ็ด", rom: "het", en: "to do / make (Isan)" },
  { th: "ข้อย", rom: "khoi", en: "I / me (Isan)" },
];
const D_NORTH: Word[] = [
  { th: "กิ๋น", rom: "kin", en: "to eat (Northern)" },
  { th: "ลำ", rom: "lam", en: "delicious (Northern)" },
  { th: "อู้", rom: "oo", en: "to speak (Northern)" },
  { th: "แอ่ว", rom: "aeo", en: "to go visit / travel (Northern)" },
  { th: "เจ้า", rom: "jao", en: "polite yes / ending (Northern)" },
  { th: "ยินดีเจ้า", rom: "yin-dee jao", en: "thank you (Northern)" },
];
const D_SOUTH: Word[] = [
  { th: "หรอย", rom: "roi", en: "delicious (Southern)" },
  { th: "หรอยจังฮู้", rom: "roi jang hoo", en: "super delicious (Southern)" },
  { th: "แหลง", rom: "laeng", en: "to speak (Southern)" },
  { th: "ไม่ไหร", rom: "mai rai", en: "never mind / it's okay (Southern)" },
  { th: "พันพรือ", rom: "phan-phrue", en: "how? / what's up? (Southern)" },
  { th: "หลบบ้าน", rom: "lop ban", en: "to go home (Southern)" },
];
const D_MIX: Word[] = [
  { th: "อร่อย", rom: "a-roi", en: "delicious (Standard)" },
  { th: "แซ่บ", rom: "saep", en: "spicy-delicious (Isan)" },
  { th: "ลำ", rom: "lam", en: "tasty (Northern)" },
  { th: "หรอย", rom: "roi", en: "yummy (Southern)" },
  { th: "ม่วน", rom: "muan", en: "fun (Isan & Northern)" },
  { th: "ตำบักหุ่ง", rom: "tam bak-hung", en: "papaya salad (Isan)" },
];

export const ADVANCED_MODULES: ModuleDef[] = [
  // ======================= PARTICLES =======================
  {
    id: "particles", track: "advanced", title: "Sentence Particles & Nuance",
    description: "นะ สิ เลย หรอก ล่ะ: the tiny words that add feeling",
    icon: "🌈", color: "from-pink-400 to-fuchsia-500", bgColor: "bg-pink-50", requiredXP: 450,
    lessons: [
      lesson("particles-soft", "Soft & Sweet: นะ จ้ะ จ๊ะ", "vocabulary", 25, [
        ...drill("particles-soft", P_SOFT, { speak: 1 }),
        choose("particles-soft-c1", {
          question: "You need a friend to wait a moment. Which sounds the friendliest?",
          choices: ["รอแป๊บนึงนะ", "รอ!", "รอไหม", "รอแล้ว"],
          answer: 0,
          explanation: "นะ at the end softens a request, like adding \"okay?\" in English. A bare รอ! sounds like an order.",
        }),
        choose("particles-soft-c2", {
          question: "A grandma smiles and asks you ไปไหนจ๊ะ. What does จ๊ะ add?",
          choices: ["Warmth and affection to the question", "Anger and impatience", "It turns the question into the past tense", "It means \"tomorrow\""],
          answer: 0,
          explanation: "จ๊ะ (questions) and จ้ะ (answers) are warm, affectionate endings used with friends, kids or by older people. Use ครับ/ค่ะ with strangers and seniors.",
        }),
        order("particles-soft-o1", ["ไว้", "เจอ", "กัน", "นะ"], "See you later, okay?", "ไว้ (later) + เจอกัน (meet each other) + นะ (friendly softener). Friends say this all the time when they part."),
      ]),
      lesson("particles-push", "Urging & Suggesting: สิ เลย เถอะ", "grammar", 30, [
        ...drill("particles-push", P_PUSH, { speak: 1 }),
        choose("particles-push-c1", {
          question: "Your friend hesitates to try your mango sticky rice. You encourage them:",
          choices: ["ลองสิ", "ลองไหม", "ไม่ลองหรอก", "ลองแล้ว"],
          answer: 0,
          explanation: "สิ urges someone on: ลองสิ = \"go on, try it!\" ลองไหม only asks politely if they want to.",
        }),
        choose("particles-push-c2", {
          question: "What does เลย add in อร่อยมากเลย?",
          choices: ["It makes it stronger: \"really, so delicious\"", "It makes it negative", "It turns it into a question", "It means \"a little bit\""],
          answer: 0,
          explanation: "After an adjective, เลย intensifies: อร่อยมากเลย = really delicious. After a verb, ไปเลย = go right now / go ahead.",
        }),
        choose("particles-push-c3", {
          question: "เถอะ in ไปกันเถอะ gives the sentence what feeling?",
          choices: ["A gentle suggestion: \"let's…\"", "A strict command from a boss", "A polite apology", "Surprise and shock"],
          answer: 0,
          explanation: "เถอะ makes a soft suggestion or gentle persuasion: กินเถอะ = just eat, go ahead. Add ครับ/ค่ะ to stay polite.",
        }),
        order("particles-push-o1", ["ไป", "กัน", "เถอะ"], "Let's go together!", "ไป (go) + กัน (together) + เถอะ (let's)."),
      ]),
      lesson("particles-back", "Softening No & Asking Back: หรอก ล่ะ น่ะ", "conversation", 30, [
        ...drill("particles-back", P_BACK, { speak: 1 }),
        choose("particles-back-c1", {
          question: "Someone asks สบายดีไหมครับ. You answer สบายดีครับ and ask back:",
          choices: ["แล้วคุณล่ะครับ", "แล้วคุณเถอะครับ", "แล้วคุณสิครับ", "แล้วคุณเลยครับ"],
          answer: 0,
          explanation: "ล่ะ turns the question back: แล้วคุณล่ะ = \"and you?\" Female speakers say แล้วคุณล่ะคะ.",
        }),
        choose("particles-back-c2", {
          question: "Which sentence uses หรอก naturally?",
          choices: ["ไม่ยากหรอก", "ไปเลยหรอก", "กินสิหรอก", "หรอกสวัสดี"],
          answer: 0,
          explanation: "หรอก goes with negative or contradicting statements to soften them: ไม่ยากหรอก = \"it's not really hard, don't worry.\"",
        }),
        order("particles-back-o1", ["ไม่", "เป็นไร", "หรอก", "ครับ"], "Oh, it's really nothing.", "ไม่เป็นไร (it's okay) + หรอก (softly brushing it off) + ครับ. Use it when someone thanks you or says sorry."),
      ]),
      lesson("particles-mix", "Particle Party: Mixing Moods", "speaking", 35, [
        ...drill("particles-mix", P_MIX, { speak: 1 }),
        choose("particles-mix-c1", {
          question: "A woman asks \"Where is the bathroom?\" politely. Which is right?",
          choices: ["ห้องน้ำอยู่ไหนคะ", "ห้องน้ำอยู่ไหนค่ะ", "ห้องน้ำอยู่ไหนเถอะ", "ห้องน้ำอยู่ไหนหรอก"],
          answer: 0,
          explanation: "Women use คะ (high tone) for questions and ค่ะ (falling tone) for statements. Men use ครับ for both.",
        }),
        choose("particles-mix-c2", {
          question: "Which ending should you avoid with your boss or an older stranger?",
          choices: ["จ้ะ", "ครับ", "ค่ะ", "นะครับ"],
          answer: 0,
          explanation: "จ้ะ is intimate and warm, used with friends, kids or people younger than you. With seniors, stick to ครับ/ค่ะ.",
        }),
        choose("particles-mix-c3", {
          question: "It's 38°C. You want your friend to agree it's hot. You say:",
          choices: ["ร้อนเนอะ", "ร้อนหรอก", "ร้อนล่ะ", "ร้อนเถอะ"],
          answer: 0,
          explanation: "เนอะ asks for agreement, like \"isn't it?\" Expect the reply ใช่ (yes) or จริง (true).",
        }),
        order("particles-mix-o1", ["อร่อย", "มาก", "เลย", "ครับ"], "It's really delicious!", "อร่อย (delicious) + มาก (very) + เลย (really!) + ครับ."),
      ]),
    ],
  },

  // ======================= TONES =======================
  {
    id: "tones", track: "advanced", title: "Tones & Reading",
    description: "The 5 tones, tone marks and consonant classes",
    icon: "🎵", color: "from-violet-400 to-indigo-500", bgColor: "bg-violet-50", requiredXP: 520,
    lessons: [
      lesson("tones-five", "The Five Tones", "listening", 25, [
        ...drill("tones-five", T_FIVE, { speak: 1 }),
        choose("tones-five-c1", {
          question: "How many tones does Standard Thai have?",
          choices: ["5", "4", "6", "9"],
          answer: 0,
          explanation: "Five: สามัญ (mid), เอก (low), โท (falling), ตรี (high) and จัตวา (rising).",
        }),
        choose("tones-five-c2", {
          question: "Which tone does ม้า (horse) have?",
          choices: ["High", "Rising", "Mid", "Low"],
          answer: 0,
          explanation: "ม is a low-class consonant. Low class + ไม้โท (้) gives a HIGH tone. มา (come) is mid and หมา (dog) is rising.",
        }),
        choose("tones-five-c3", {
          question: "Why does หมา (dog) have a rising tone?",
          choices: ["The silent ห in front makes ม act as high class", "Because dogs bark loudly", "It has a hidden ไม้เอก", "All animals have rising tones"],
          answer: 0,
          explanation: "A silent ห before a low consonant (ห นำ) makes it high class. High class with no tone mark in a live syllable = rising tone.",
        }),
        order("tones-five-o1", ["หมา", "ไม่ใช่", "ม้า"], "A dog is not a horse.", "หมา (rising) + ไม่ใช่ (is not) + ม้า (high). Both are \"ma\", but the tones are different."),
      ]),
      lesson("tones-marks", "Tone Marks ่ ้ ๊ ๋", "grammar", 30, [
        ...drill("tones-marks", T_MARKS, { speak: 1 }),
        choose("tones-marks-c1", {
          question: "What is the tone mark ่ called?",
          choices: ["ไม้เอก (mai ek)", "ไม้โท (mai tho)", "ไม้ตรี (mai tri)", "ไม้จัตวา (mai jattawa)"],
          answer: 0,
          explanation: "่ = ไม้เอก, ้ = ไม้โท, ๊ = ไม้ตรี, ๋ = ไม้จัตวา. They sit above the first consonant of the syllable.",
        }),
        choose("tones-marks-c2", {
          question: "ป is mid class. With ไม้โท, ป้า (aunt) has which tone?",
          choices: ["Falling", "High", "Low", "Rising"],
          answer: 0,
          explanation: "Mid class: ่ = low (ป่า forest), ้ = falling (ป้า aunt), ๊ = high (โต๊ะ table), ๋ = rising (ก๋วยเตี๋ยว).",
        }),
        choose("tones-marks-c3", {
          question: "Which tone marks are normally written only on mid-class consonants?",
          choices: ["๊ and ๋ (ไม้ตรี and ไม้จัตวา)", "่ and ้ (ไม้เอก and ไม้โท)", "Only ่", "All four are used equally on every class"],
          answer: 0,
          explanation: "ไม้ตรี and ไม้จัตวา appear on mid-class letters (ก จ ด ต บ ป อ…). ไม้เอก and ไม้โท work on all three classes.",
        }),
        order("tones-marks-o1", ["ป้า", "อยู่", "ใน", "ป่า"], "Auntie is in the forest.", "ป้า (falling) and ป่า (low) look almost the same, but the tone mark changes the meaning."),
      ]),
      lesson("tones-classes", "Consonant Classes", "grammar", 30, [
        ...drill("tones-classes", T_CLASS, { speak: 1 }),
        choose("tones-classes-c1", {
          question: "Which consonant is HIGH class?",
          choices: ["ข", "ก", "ม", "ค"],
          answer: 0,
          explanation: "High class: ข ฉ ฐ ถ ผ ฝ ศ ษ ส ห (and ฃ). ก is mid; ม and ค are low.",
        }),
        choose("tones-classes-c2", {
          question: "Which consonant is MID class?",
          choices: ["ก", "ข", "ส", "ม"],
          answer: 0,
          explanation: "Mid class: ก จ ฎ ฏ ด ต บ ป อ. Thai kids remember them with ไก่จิกเด็กตายบนปากโอ่ง.",
        }),
        choose("tones-classes-c3", {
          question: "ไก่ (chicken) and ไข่ (egg) both have ไม้เอก and a low tone. What tells them apart?",
          choices: ["The first sound: unaspirated k vs breathy kh", "Their tones are different", "ไข่ has no tone", "Nothing, they sound identical"],
          answer: 0,
          explanation: "Both are low tone. ก is a hard k with no puff of air; ข is kh with a puff. Hold a hand in front of your mouth to feel it.",
        }),
        order("tones-classes-o1", ["ไก่", "ออก", "ไข่"], "The chicken lays an egg.", "ไก่ (chicken) + ออกไข่ (lay an egg)."),
      ]),
      lesson("tones-pairs", "Minimal Pairs Challenge", "listening", 35, [
        ...drill("tones-pairs", T_PAIRS, { speak: 1 }),
        choose("tones-pairs-c1", {
          question: "The receptionist says the beach is ใกล้ (falling tone). Is it near or far?",
          choices: ["Near", "Far", "Closed", "Expensive"],
          answer: 0,
          explanation: "ใกล้ (falling, with ้) = near. ไกล (mid, no mark) = far. Same sounds, opposite meanings!",
        }),
        choose("tones-pairs-c2", {
          question: "At the shop you want to see a shirt. Which do you ask for?",
          choices: ["ขอดูเสื้อหน่อยครับ", "ขอดูเสือหน่อยครับ", "ขอดูเสื้อไหมหรอก", "ขอเสือดูหน่อยครับ"],
          answer: 0,
          explanation: "เสื้อ (falling) = shirt. เสือ (rising) = tiger. Asking to see a tiger will get you a funny look!",
        }),
        choose("tones-pairs-c3", {
          question: "If you say \"beautiful\" (สวย) with a flat mid tone, it sounds like…",
          choices: ["ซวย (unlucky)", "ซอย (small street)", "สวน (garden)", "สาย (late)"],
          answer: 0,
          explanation: "สวย is rising (high-class ส). ซวย has low-class ซ and a mid tone, meaning \"unlucky\".",
        }),
        order("tones-pairs-o1", ["บ้าน", "อยู่", "ไกล", "มาก"], "The house is very far.", "บ้าน (house) + อยู่ (is located) + ไกล (far, mid tone) + มาก (very)."),
      ]),
    ],
  },

  // ======================= IDIOMS =======================
  {
    id: "idioms", track: "advanced", title: "Thai Idioms & Sayings",
    description: "Classic สำนวน (sayings) and when to use them",
    icon: "📜", color: "from-yellow-400 to-amber-500", bgColor: "bg-yellow-50", requiredXP: 600,
    lessons: [
      lesson("idioms-water", "Water & Opportunity", "culture", 25, [
        ...drill("idioms-water", I_WATER, { speak: 1 }),
        choose("idioms-water-c1", {
          question: "A big sale ends today. Your friend says น้ำขึ้นให้รีบตัก. She means…",
          choices: ["Buy now while the chance is here", "Don't waste water", "Wait until next year", "The shop is flooded"],
          answer: 0,
          explanation: "Literally \"when the water rises, hurry to scoop it.\" In the old days, people collected water when the river was high.",
        }),
        choose("idioms-water-c2", {
          question: "Your cousin keeps pouring money into a shop with no customers. Which saying fits?",
          choices: ["ตำน้ำพริกละลายแม่น้ำ", "น้ำนิ่งไหลลึก", "ช้าๆ ได้พร้าเล่มงาม", "น้ำขึ้นให้รีบตัก"],
          answer: 0,
          explanation: "\"Pounding chili paste and dissolving it in the river\": spending effort or money where it's lost for nothing.",
        }),
        order("idioms-water-o1", ["น้ำ", "ขึ้น", "ให้", "รีบ", "ตัก"], "When the water rises, hurry and scoop.", "น้ำ (water) + ขึ้น (rises) + ให้รีบ (hurry) + ตัก (scoop). Thailand's \"make hay while the sun shines.\""),
      ]),
      lesson("idioms-animals", "Animal Sayings", "vocabulary", 30, [
        ...drill("idioms-animals", I_ANIMALS, { speak: 1 }),
        choose("idioms-animals-c1", {
          question: "Two old classmates each know the other's embarrassing secrets. Which saying fits?",
          choices: ["ไก่เห็นตีนงู งูเห็นนมไก่", "หมูไปไก่มา", "สอนจระเข้ว่ายน้ำ", "ขี่ช้างจับตั๊กแตน"],
          answer: 0,
          explanation: "\"The chicken sees the snake's feet, the snake sees the chicken's breasts\": each sees what the other hides.",
        }),
        choose("idioms-animals-c2", {
          question: "Everyone panics about a rumor before checking if it's true. That's…",
          choices: ["กระต่ายตื่นตูม", "ไก่ได้พลอย", "หมูไปไก่มา", "สอนจระเข้ว่ายน้ำ"],
          answer: 0,
          explanation: "\"The startled rabbit\" comes from a fable where a rabbit hears a fruit fall (ตูม!) and thinks the world is ending.",
        }),
        order("idioms-animals-o1", ["อย่า", "กระต่าย", "ตื่น", "ตูม"], "Don't panic over nothing!", "อย่า (don't) + กระต่ายตื่นตูม (startled rabbit). Say it to calm a worried friend."),
      ]),
      lesson("idioms-life", "Life Lessons", "culture", 30, [
        ...drill("idioms-life", I_LIFE, { speak: 1 }),
        choose("idioms-life-c1", {
          question: "You take off your shoes before entering a Thai home because everyone does. Which saying fits?",
          choices: ["เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม", "จับปลาสองมือ", "เกลือเป็นหนอน", "ฆ่าควายเสียดายพริก"],
          answer: 0,
          explanation: "\"Entering a town of squinters, you must squint too\" = when in Rome, do as the Romans do.",
        }),
        choose("idioms-life-c2", {
          question: "What does ปิดทองหลังพระ (gilding the back of the Buddha) mean?",
          choices: ["Doing good quietly without seeking credit", "Stealing gold from a temple", "Being very rich", "Praying every morning"],
          answer: 0,
          explanation: "People press gold leaf onto Buddha images. Gold on the back is never seen, so it means doing good without being noticed.",
        }),
        order("idioms-life-o1", ["ต้อง", "หลิ่ว", "ตา", "ตาม"], "You must squint along too.", "ต้อง (must) + หลิ่วตา (squint) + ตาม (follow along): the second half of เข้าเมืองตาหลิ่ว…"),
      ]),
      lesson("idioms-use", "Using Idioms in Conversation", "conversation", 35, [
        ...drill("idioms-use", I_USE, { speak: 1 }),
        choose("idioms-use-c1", {
          question: "Your friend praises you for ten minutes before asking to borrow money. He's…",
          choices: ["ชักแม่น้ำทั้งห้า", "ปิดทองหลังพระ", "ใจดีสู้เสือ", "คนดีผีคุ้ม"],
          answer: 0,
          explanation: "\"Drawing in all five rivers\" comes from the Vessantara Jataka, where a long flattering speech came before a request.",
        }),
        choose("idioms-use-c2", {
          question: "To introduce a saying in conversation, Thais often say…",
          choices: ["อย่างที่เขาว่ากัน", "ยินดีที่ได้รู้จัก", "เช็คบิลด้วยครับ", "ขอโทษครับ"],
          answer: 0,
          explanation: "อย่างที่เขาว่ากัน = \"as they say…\", then the idiom. It works as a lead-in for any สำนวน.",
        }),
        choose("idioms-use-c3", {
          question: "Your friend won a set of golf clubs but never plays golf. Which saying fits?",
          choices: ["หัวล้านได้หวี", "น้ำขึ้นให้รีบตัก", "ใจดีสู้เสือ", "น้ำนิ่งไหลลึก"],
          answer: 0,
          explanation: "\"A bald man gets a comb\": receiving something you have no use for.",
        }),
        order("idioms-use-o1", ["อย่า", "ชัก", "แม่น้ำ", "ทั้งห้า"], "Don't beat around the bush.", "อย่า (don't) + ชักแม่น้ำทั้งห้า. A playful way to say \"just get to the point!\""),
      ]),
    ],
  },

  // ======================= OPINIONS =======================
  {
    id: "opinions", track: "advanced", title: "Giving Opinions",
    description: "Agree, disagree, explain and compare",
    icon: "💭", color: "from-sky-400 to-cyan-500", bgColor: "bg-sky-50", requiredXP: 680,
    lessons: [
      lesson("opinions-think", "I Think…", "vocabulary", 25, [
        ...drill("opinions-think", O_THINK, { speak: 1 }),
        choose("opinions-think-c1", {
          question: "How do you ask \"What do you think?\"",
          choices: ["คุณคิดว่ายังไงครับ", "คุณชื่ออะไรครับ", "คุณไปไหนครับ", "คุณกินข้าวหรือยังครับ"],
          answer: 0,
          explanation: "คิดว่า (think that) + ยังไง (how). Women end with คะ: คุณคิดว่ายังไงคะ.",
        }),
        choose("opinions-think-c2", {
          question: "In casual speech, ผมคิดว่า is often shortened to…",
          choices: ["ผมว่า", "ผมคิด", "ผมเห็น", "ผมรู้"],
          answer: 0,
          explanation: "ผมว่า / ฉันว่า = \"I reckon\". You'll hear it all the time: ผมว่าดีนะ = I reckon it's good.",
        }),
        order("opinions-think-o1", ["ผม", "คิด", "ว่า", "ดี", "ครับ"], "I think it's good.", "ผม (I) + คิดว่า (think that) + ดี (good) + ครับ. Women say ฉันคิดว่าดีค่ะ."),
      ]),
      lesson("opinions-agree", "Agree & Disagree", "conversation", 30, [
        ...drill("opinions-agree", O_AGREE, { speak: 1 }),
        choose("opinions-agree-c1", {
          question: "You want to politely disagree with your boss. You say:",
          choices: ["ผมไม่ค่อยเห็นด้วยครับ", "ผิดแล้ว!", "ไร้สาระ", "ไม่ใช่เลย!"],
          answer: 0,
          explanation: "ไม่ค่อย = \"not really\", so it's much softer than a flat no. Out of เกรงใจ (consideration for others), Thais tend to avoid open disagreement.",
        }),
        choose("opinions-agree-c2", {
          question: "Your friend says อาหารร้านนี้อร่อยนะ and you totally agree. You say:",
          choices: ["ใช่เลย", "ไม่ค่อยเห็นด้วย", "แล้วแต่คุณ", "ไม่แน่ใจ"],
          answer: 0,
          explanation: "ใช่เลย = \"exactly!\" เลย makes the agreement strong.",
        }),
        fill("opinions-agree-f1", "ผม ___ เห็นด้วยครับ (I disagree)", "ไม่", "ไม่ (not) goes right before the verb: ไม่เห็นด้วย = disagree."),
        order("opinions-agree-o1", ["ผม", "เห็นด้วย", "กับ", "คุณ", "ครับ"], "I agree with you.", "เห็นด้วย (agree) + กับ (with) + คุณ (you). Women say ฉันเห็นด้วยกับคุณค่ะ."),
      ]),
      lesson("opinions-because", "Because, But & If", "grammar", 30, [
        ...drill("opinions-because", O_LINK, { speak: 1 }),
        choose("opinions-because-c1", {
          question: "Complete: ถ้าฝนตก ___ ไม่ไป (If it rains, then I won't go.)",
          choices: ["ก็", "แต่", "เพราะว่า", "ถึงแม้ว่า"],
          answer: 0,
          explanation: "ถ้า… ก็… = \"if… then…\". ก็ comes before the result.",
        }),
        choose("opinions-because-c2", {
          question: "How do you say \"I like Bangkok, but it's very hot\"?",
          choices: ["ผมชอบกรุงเทพฯ แต่ร้อนมาก", "ผมชอบกรุงเทพฯ เพราะว่าร้อนมาก", "ผมชอบกรุงเทพฯ ถ้าร้อนมาก", "ผมชอบกรุงเทพฯ ดังนั้นร้อนมาก"],
          answer: 0,
          explanation: "แต่ = but, for contrast. เพราะว่า would mean you like Bangkok because it's hot!",
        }),
        choose("opinions-because-c3", {
          question: "ผมชอบเชียงใหม่ เพราะว่าอากาศดี means…",
          choices: ["I like Chiang Mai because the weather is nice", "I like Chiang Mai but the weather is bad", "If the weather is nice, I'll go to Chiang Mai", "Chiang Mai has the best weather"],
          answer: 0,
          explanation: "เพราะว่า (because) gives the reason. In speech it's often just เพราะ.",
        }),
        order("opinions-because-o1", ["ถ้า", "ว่าง", "ก็", "มา", "นะ"], "If you're free, come over, okay?", "ถ้า (if) + ว่าง (free) + ก็ (then) + มา (come) + นะ (friendly softener)."),
      ]),
      lesson("opinions-compare", "Better & Best", "grammar", 35, [
        ...drill("opinions-compare", O_COMPARE, { speak: 1 }),
        choose("opinions-compare-c1", {
          question: "How do you say \"Thai food is the most delicious\"?",
          choices: ["อาหารไทยอร่อยที่สุด", "อาหารไทยที่สุดอร่อย", "ที่สุดอาหารไทยอร่อย", "อาหารไทยอร่อยกว่าที่สุด"],
          answer: 0,
          explanation: "Adjective + ที่สุด = the most. อร่อยที่สุด = most delicious.",
        }),
        choose("opinions-compare-c2", {
          question: "\"Chiang Mai is cooler than Bangkok\" is…",
          choices: ["เชียงใหม่เย็นกว่ากรุงเทพฯ", "กรุงเทพฯเย็นกว่าเชียงใหม่", "เชียงใหม่กว่าเย็นกรุงเทพฯ", "เชียงใหม่เย็นที่สุดกรุงเทพฯ"],
          answer: 0,
          explanation: "A + adjective + กว่า + B = A is more … than B. The adjective always comes before กว่า.",
        }),
        order("opinions-compare-o1", ["อันนี้", "ดีกว่า", "ครับ"], "This one is better.", "อันนี้ (this one) + ดีกว่า (better) + ครับ."),
      ]),
    ],
  },

  // ======================= DIALECTS =======================
  {
    id: "dialects", track: "advanced", title: "Regional Dialects",
    description: "Fun words from Isan, the North and the South",
    icon: "🗺️", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", requiredXP: 760,
    lessons: [
      lesson("dialects-isan", "Isan Talk", "vocabulary", 25, [
        ...drill("dialects-isan", D_ISAN, { speak: 1 }),
        choose("dialects-isan-c1", {
          question: "Your somtam at an Isan restaurant is amazing. Which praise fits best there?",
          choices: ["แซ่บหลาย", "หรอยจังฮู้", "ลำแต้ๆ", "ไม่ไหร"],
          answer: 0,
          explanation: "แซ่บหลาย = very delicious in Isan. หรอยจังฮู้ is Southern and ลำแต้ๆ is Northern.",
        }),
        choose("dialects-isan-c2", {
          question: "In Isan, เบิ่ง means the same as which Standard Thai word?",
          choices: ["ดู (look)", "กิน (eat)", "พูด (speak)", "ไป (go)"],
          answer: 0,
          explanation: "เบิ่ง = ดู. You might hear มาเบิ่งนี่ = come look at this!",
        }),
        order("dialects-isan-o1", ["ข้อย", "บ่", "ไป"], "I'm not going. (Isan)", "ข้อย (I) + บ่ (not) + ไป (go). Standard Thai: ฉันไม่ไป / ผมไม่ไป."),
      ]),
      lesson("dialects-north", "Northern Kham Mueang", "vocabulary", 30, [
        ...drill("dialects-north", D_NORTH, { speak: 1 }),
        choose("dialects-north-c1", {
          question: "A lady in Chiang Mai asks กิ๋นข้าวแล้วกาเจ้า. What is she asking?",
          choices: ["Have you eaten yet?", "Where are you going?", "How much is it?", "Are you tired?"],
          answer: 0,
          explanation: "กิ๋น = กิน (eat), กา works like หรือยัง, and เจ้า is a polite Northern ending. Standard: กินข้าวหรือยังคะ.",
        }),
        choose("dialects-north-c2", {
          question: "The sign says มาแอ่วเชียงใหม่. What does it invite you to do?",
          choices: ["Come visit Chiang Mai", "Leave Chiang Mai", "Eat in Chiang Mai", "Sleep in Chiang Mai"],
          answer: 0,
          explanation: "แอ่ว (Northern) = to go out, visit, travel for fun.",
        }),
        order("dialects-north-o1", ["มา", "แอ่ว", "เชียงใหม่"], "Come visit Chiang Mai! (Northern)", "มา (come) + แอ่ว (visit, Northern) + เชียงใหม่."),
      ]),
      lesson("dialects-south", "Southern Pak Tai", "listening", 30, [
        ...drill("dialects-south", D_SOUTH, { speak: 1 }),
        choose("dialects-south-c1", {
          question: "Southern ไม่ไหร is the same as which Standard Thai phrase?",
          choices: ["ไม่เป็นไร", "ไม่อร่อย", "ไม่ไป", "ไม่รู้"],
          answer: 0,
          explanation: "ไม่ไหร = ไม่เป็นไร (never mind, it's okay). Southern Thai often clips words short like this.",
        }),
        choose("dialects-south-c2", {
          question: "Southern Thai (ภาษาใต้) is famous for being…",
          choices: ["Spoken fast with short, clipped words", "Always sung like a song", "Written in a different alphabet", "Identical to Bangkok Thai"],
          answer: 0,
          explanation: "Southern speech is known for speed and shortened words, and it's written with the same Thai alphabet.",
        }),
        order("dialects-south-o1", ["แกงไตปลา", "หรอย", "จังฮู้"], "Gaeng tai pla is super delicious! (Southern)", "แกงไตปลา is a spicy Southern curry. หรอยจังฮู้ = super delicious in Pak Tai."),
      ]),
      lesson("dialects-mix", "Delicious Around Thailand", "culture", 35, [
        ...drill("dialects-mix", D_MIX, { speak: 1 }),
        choose("dialects-mix-c1", {
          question: "เว้า (Isan), อู้ (Northern) and แหลง (Southern) all mean…",
          choices: ["พูด (to speak)", "กิน (to eat)", "นอน (to sleep)", "ดู (to look)"],
          answer: 0,
          explanation: "Each region has its own word for \"speak\": อู้กำเมือง, เว้าอีสาน, แหลงใต้.",
        }),
        choose("dialects-mix-c2", {
          question: "Standard Thai, used on TV and in schools, is based on…",
          choices: ["Central Thai, as spoken around Bangkok", "Southern Thai", "Northern Kham Mueang", "Isan"],
          answer: 0,
          explanation: "Standard Thai comes from Central Thai. Everyone learns it at school, but many people speak their regional dialect at home.",
        }),
        choose("dialects-mix-c3", {
          question: "Which word for \"no / not\" do Isan and Northern speakers both use?",
          choices: ["บ่", "หรอย", "แหลง", "กิ๋น"],
          answer: 0,
          explanation: "บ่ replaces ไม่ in both Isan and Northern Thai: บ่เป็นหยัง = it's nothing.",
        }),
        order("dialects-mix-o1", ["ส้มตำ", "แซ่บ", "หลาย"], "The papaya salad is very delicious! (Isan)", "ส้มตำ (papaya salad) + แซ่บ (delicious, Isan) + หลาย (very, Isan)."),
      ]),
    ],
  },
];
