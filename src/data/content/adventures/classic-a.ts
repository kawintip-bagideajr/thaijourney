import { drill, choose, order, stage } from "../build";
import type { ProvinceAdventure, Word } from "../types";

// ---------------------------------------------------------------- Bangkok
const BKK_RIVER: Word[] = [
  { th: "แม่น้ำ", rom: "mae-nam", en: "river" },
  { th: "ท่าเรือ", rom: "tha-rua", en: "pier" },
  { th: "เรือด่วน", rom: "rua duan", en: "express boat" },
  { th: "ตั๋ว", rom: "tua", en: "ticket" },
  { th: "ลงที่นี่", rom: "long thee-nee", en: "get off here" },
  { th: "ฝั่งตรงข้าม", rom: "fang trong-kham", en: "the opposite bank" },
];
const BKK_FOOD: Word[] = [
  { th: "เยาวราช", rom: "yao-wa-rat", en: "Yaowarat (Chinatown)" },
  { th: "ผัดไทย", rom: "phat thai", en: "pad thai" },
  { th: "ต้มยำกุ้ง", rom: "tom yam kung", en: "spicy-sour shrimp soup" },
  { th: "ข้าวมันไก่", rom: "khao man gai", en: "chicken rice" },
  { th: "ไม่เผ็ด", rom: "mai phet", en: "not spicy" },
  { th: "ใส่ถุง", rom: "sai thung", en: "to take away (in a bag)" },
];
const BKK_TEMPLE: Word[] = [
  { th: "วัดพระแก้ว", rom: "wat phra kaeo", en: "Temple of the Emerald Buddha" },
  { th: "วัดโพธิ์", rom: "wat pho", en: "Wat Pho" },
  { th: "พระนอน", rom: "phra non", en: "reclining Buddha" },
  { th: "ถอดรองเท้า", rom: "thot rong-thao", en: "take off your shoes" },
  { th: "แต่งกายสุภาพ", rom: "taeng-kai su-phap", en: "dress modestly" },
  { th: "นวดแผนไทย", rom: "nuat phaen thai", en: "traditional Thai massage" },
];
const BKK_CHAT: Word[] = [
  { th: "มาจากไหน", rom: "ma jak nai", en: "where are you from?" },
  { th: "มาเที่ยว", rom: "ma thiao", en: "here on holiday" },
  { th: "รถติด", rom: "rot tit", en: "traffic jam" },
  { th: "อากาศร้อน", rom: "a-kat ron", en: "the weather is hot" },
  { th: "สนุก", rom: "sa-nuk", en: "fun" },
  { th: "ชอบ", rom: "chop", en: "to like" },
];

// ---------------------------------------------------------------- Ayutthaya
const AYU_BIKE: Word[] = [
  { th: "จักรยาน", rom: "jak-kra-yan", en: "bicycle" },
  { th: "เช่า", rom: "chao", en: "to rent" },
  { th: "วันละ", rom: "wan la", en: "per day" },
  { th: "ตรงไป", rom: "trong pai", en: "go straight" },
  { th: "เลี้ยวซ้าย", rom: "liao sai", en: "turn left" },
  { th: "เลี้ยวขวา", rom: "liao khwa", en: "turn right" },
];
const AYU_FOOD: Word[] = [
  { th: "ก๋วยเตี๋ยวเรือ", rom: "kuai-tiao rua", en: "boat noodles" },
  { th: "โรตีสายไหม", rom: "ro-tee sai-mai", en: "roti with cotton-candy threads" },
  { th: "กุ้งเผา", rom: "kung phao", en: "grilled prawns" },
  { th: "หวาน", rom: "wan", en: "sweet" },
  { th: "ชามเล็ก", rom: "cham lek", en: "small bowl" },
  { th: "อีกชาม", rom: "eek cham", en: "one more bowl" },
];
const AYU_PAST: Word[] = [
  { th: "ช้าง", rom: "chang", en: "elephant" },
  { th: "กษัตริย์", rom: "ka-sat", en: "king" },
  { th: "เมืองหลวงเก่า", rom: "mueang luang kao", en: "old capital" },
  { th: "เจดีย์", rom: "je-dee", en: "stupa (chedi)" },
  { th: "พระพุทธรูป", rom: "phra phut-tha-rup", en: "Buddha image" },
  { th: "อิฐ", rom: "it", en: "brick" },
];
const AYU_CHAT: Word[] = [
  { th: "เมื่อก่อน", rom: "muea-kon", en: "in the past" },
  { th: "ตอนนี้", rom: "ton-nee", en: "now" },
  { th: "สวย", rom: "suai", en: "beautiful" },
  { th: "ประทับใจ", rom: "pra-thap-jai", en: "impressed" },
  { th: "แนะนำ", rom: "nae-nam", en: "to recommend" },
  { th: "ที่เที่ยว", rom: "thee thiao", en: "place to visit" },
];

// ---------------------------------------------------------------- Chiang Mai
const CNX_RIDE: Word[] = [
  { th: "รถแดง", rom: "rot daeng", en: "red truck (shared taxi)" },
  { th: "คูเมือง", rom: "khu mueang", en: "city moat" },
  { th: "ประตูท่าแพ", rom: "pra-tu tha-phae", en: "Tha Phae Gate" },
  { th: "ดอยสุเทพ", rom: "doi su-thep", en: "Doi Suthep mountain" },
  { th: "ไกลไหม", rom: "klai mai", en: "is it far?" },
  { th: "จอดตรงนี้", rom: "jot trong-nee", en: "stop here" },
];
const CNX_FOOD: Word[] = [
  { th: "ไส้อั่ว", rom: "sai ua", en: "northern herb sausage" },
  { th: "น้ำพริกหนุ่ม", rom: "nam phrik num", en: "roasted green chili dip" },
  { th: "น้ำพริกอ่อง", rom: "nam phrik ong", en: "tomato and pork chili dip" },
  { th: "แคบหมู", rom: "khaep mu", en: "pork crackling" },
  { th: "ข้าวเหนียว", rom: "khao niao", en: "sticky rice" },
  { th: "ขันโตก", rom: "khan tok", en: "khantoke (low tray dinner)" },
];
const CNX_TEMPLE: Word[] = [
  { th: "บันได", rom: "ban-dai", en: "stairs" },
  { th: "พญานาค", rom: "pha-ya-nak", en: "naga (serpent)" },
  { th: "พระธาตุ", rom: "phra-that", en: "relic stupa" },
  { th: "พระสงฆ์", rom: "phra song", en: "monks" },
  { th: "ไหว้พระ", rom: "wai phra", en: "to pay respect to the Buddha" },
  { th: "ทำบุญ", rom: "tham bun", en: "to make merit" },
];
const CNX_KAMMUANG: Word[] = [
  { th: "เจ้า", rom: "jao", en: "yes / polite word (Northern)" },
  { th: "กิ๋น", rom: "gin", en: "to eat (Northern)" },
  { th: "ลำ", rom: "lam", en: "delicious (Northern)" },
  { th: "บ่", rom: "bo", en: "no / not (Northern)" },
  { th: "แอ่ว", rom: "aeo", en: "to go out and travel (Northern)" },
  { th: "ม่วน", rom: "muan", en: "fun (Northern)" },
];

// ---------------------------------------------------------------- Chiang Rai
const CEI_BUS: Word[] = [
  { th: "สถานีขนส่ง", rom: "sa-tha-nee khon-song", en: "bus station" },
  { th: "รถทัวร์", rom: "rot thua", en: "coach bus" },
  { th: "แม่สาย", rom: "mae sai", en: "Mae Sai (border town)" },
  { th: "ออกกี่โมง", rom: "ok kee mong", en: "what time does it leave?" },
  { th: "ถึง", rom: "thueng", en: "to arrive" },
  { th: "หนังสือเดินทาง", rom: "nang-sue doen-thang", en: "passport" },
];
const CEI_TEA: Word[] = [
  { th: "ไร่ชา", rom: "rai cha", en: "tea plantation" },
  { th: "ชาอูหลง", rom: "cha u-long", en: "oolong tea" },
  { th: "กาแฟเย็น", rom: "ga-fae yen", en: "iced coffee" },
  { th: "หวานน้อย", rom: "wan noi", en: "less sweet" },
  { th: "ดอย", rom: "doi", en: "mountain (Northern)" },
  { th: "หมอก", rom: "mok", en: "mist" },
];
const CEI_ART: Word[] = [
  { th: "สีขาว", rom: "see khao", en: "white" },
  { th: "สีดำ", rom: "see dam", en: "black" },
  { th: "สีน้ำเงิน", rom: "see nam-ngoen", en: "blue" },
  { th: "ศิลปิน", rom: "sin-la-pin", en: "artist" },
  { th: "บ้านดำ", rom: "ban dam", en: "Black House (Baan Dam)" },
  { th: "หอนาฬิกา", rom: "ho na-li-ka", en: "clock tower" },
];
const CEI_CHAT: Word[] = [
  { th: "ไปไหนมา", rom: "pai nai ma", en: "where have you been?" },
  { th: "ไปเที่ยวมา", rom: "pai thiao ma", en: "I've been out sightseeing" },
  { th: "กาด", rom: "kat", en: "market (Northern)" },
  { th: "อู้", rom: "u", en: "to speak (Northern)" },
  { th: "ชาวเขา", rom: "chao khao", en: "hill people" },
  { th: "หมู่บ้าน", rom: "mu-ban", en: "village" },
];

// ---------------------------------------------------------------- Sukhothai
const SKT_WELCOME: Word[] = [
  { th: "ยินดีต้อนรับ", rom: "yin-dee ton-rap", en: "welcome" },
  { th: "สุข", rom: "suk", en: "happiness" },
  { th: "อาณาจักร", rom: "a-na-jak", en: "kingdom" },
  { th: "เมืองเก่า", rom: "mueang kao", en: "old town" },
  { th: "อุทยานประวัติศาสตร์", rom: "ut-tha-yan pra-wat-ti-sat", en: "historical park" },
  { th: "ตั๋วเข้าชม", rom: "tua khao chom", en: "entrance ticket" },
];
const SKT_FOOD: Word[] = [
  { th: "ก๋วยเตี๋ยวสุโขทัย", rom: "kuai-tiao su-kho-thai", en: "Sukhothai noodles" },
  { th: "ถั่วลิสง", rom: "thua li-song", en: "peanuts" },
  { th: "ถั่วฝักยาว", rom: "thua fak yao", en: "long beans" },
  { th: "เปรี้ยว", rom: "priao", en: "sour" },
  { th: "เส้นเล็ก", rom: "sen lek", en: "thin rice noodles" },
  { th: "แห้ง", rom: "haeng", en: "dry (no soup)" },
];
const SKT_HERITAGE: Word[] = [
  { th: "ลอยกระทง", rom: "loi kra-thong", en: "Loy Krathong festival" },
  { th: "กระทง", rom: "kra-thong", en: "floating flower basket" },
  { th: "พระจันทร์เต็มดวง", rom: "phra-jan tem duang", en: "full moon" },
  { th: "พ่อขุนรามคำแหง", rom: "pho khun ram-kham-haeng", en: "King Ramkhamhaeng" },
  { th: "ตัวอักษรไทย", rom: "tua ak-son thai", en: "Thai alphabet" },
  { th: "ศิลาจารึก", rom: "si-la ja-ruek", en: "stone inscription" },
];
const SKT_CRAFT: Word[] = [
  { th: "สังคโลก", rom: "sang-kha-lok", en: "Sangkhalok ceramics" },
  { th: "เครื่องปั้นดินเผา", rom: "khrueang pan din phao", en: "pottery" },
  { th: "ทำมือ", rom: "tham mue", en: "handmade" },
  { th: "ของฝาก", rom: "khong fak", en: "souvenir gift" },
  { th: "ห่อ", rom: "ho", en: "to wrap" },
  { th: "ระวังแตก", rom: "ra-wang taek", en: "fragile (careful, it breaks)" },
];

export const ADVENTURES_CLASSIC_A: ProvinceAdventure[] = [
  // ================================================================ Bangkok
  {
    provinceId: "bangkok",
    stages: [
      stage("bangkok-2", "🚤", "Chao Phraya River Boat", "ล่องเรือเจ้าพระยา", 20, [
        ...drill("bangkok-2-w", BKK_RIVER, { speak: 1 }),
        choose("bangkok-2-c1", {
          question: "The boat pulls up at the pier you want. You tell the crew…",
          choices: ["ลงที่นี่ครับ", "ไปไหนมาครับ", "อร่อยมากครับ", "ไม่เผ็ดครับ"],
          answer: 0,
          explanation: "ลง = get off / go down, ที่นี่ = here. (Women say ค่ะ.)",
        }),
        choose("bangkok-2-c2", {
          question: "From the river you see Wat Arun (วัดอรุณ). Its English name is…",
          choices: ["Temple of Dawn", "Temple of the Moon", "Temple of the Sea", "Temple of Gold"],
          answer: 0,
          explanation: "อรุณ (a-run) means dawn, so วัดอรุณ is the Temple of Dawn.",
        }),
        order("bangkok-2-o1", ["ท่าเรือ", "อยู่", "ที่ไหน", "ครับ"], "Where is the pier?",
          "Thing + อยู่ (is located) + ที่ไหน (where) + ครับ. Swap ท่าเรือ for any place to ask directions."),
      ]),
      stage("bangkok-3", "🍜", "Chinatown Street Food", "อาหารริมทางเยาวราช", 25, [
        ...drill("bangkok-3-w", BKK_FOOD, { speak: 1 }),
        choose("bangkok-3-c1", {
          question: "The vendor asks if you'll eat here or take it away. You want to eat here:",
          choices: ["กินที่นี่ครับ", "ใส่ถุงครับ", "เช็คบิลครับ", "ไม่เอาครับ"],
          answer: 0,
          explanation: "กิน = eat, ที่นี่ = here. ใส่ถุง (put it in a bag) is what you say for takeaway.",
        }),
        choose("bangkok-3-c2", {
          question: "In ต้มยำกุ้ง, what does กุ้ง mean?",
          choices: ["shrimp", "chicken", "fish", "pork"],
          answer: 0,
          explanation: "ต้ม = boil, ยำ = spicy mix, กุ้ง = shrimp. Thai dish names often list the cooking style and then the main ingredient.",
        }),
        order("bangkok-3-o1", ["ขอ", "ผัดไทย", "ไม่เผ็ด", "ครับ"], "Pad thai, not spicy, please.",
          "ขอ (may I have) + dish + ไม่เผ็ด (not spicy) + ครับ."),
      ]),
      stage("bangkok-4", "🛕", "Grand Palace & Wat Pho", "วัดพระแก้วและวัดโพธิ์", 25, [
        ...drill("bangkok-4-w", BKK_TEMPLE, { speak: 1 }),
        choose("bangkok-4-c1", {
          question: "What should you wear to visit วัดพระแก้ว and the Grand Palace?",
          choices: ["Clothes covering shoulders and knees", "A swimsuit", "Shorts and a tank top", "Anything, there is no dress code"],
          answer: 0,
          explanation: "The Grand Palace has a strict dress code: แต่งกายสุภาพ (dress modestly), shoulders and knees covered.",
        }),
        choose("bangkok-4-c2", {
          question: "Sitting in front of a Buddha image, where should your feet point?",
          choices: ["Away from the Buddha, tucked behind you", "Straight at the Buddha", "Up on the altar", "It doesn't matter"],
          answer: 0,
          explanation: "Feet are the lowest part of the body in Thai culture, so never point them at a Buddha image or at people.",
        }),
        order("bangkok-4-o1", ["ต้อง", "ถอด", "รองเท้า", "ไหม"], "Do I have to take off my shoes?",
          "ต้อง (must) + ถอด (take off) + รองเท้า (shoes) + ไหม (question). You take off your shoes before entering a temple hall."),
      ]),
      stage("bangkok-5", "💬", "Chatting with Bangkokians", "คุยกับคนกรุงเทพฯ", 30, [
        ...drill("bangkok-5-w", BKK_CHAT, { speak: 1 }),
        choose("bangkok-5-c1", {
          question: "A taxi driver asks: มาจากไหนครับ? You answer…",
          choices: ["มาจากอังกฤษครับ", "ไม่เป็นไรครับ", "อร่อยมากครับ", "เท่าไหร่ครับ"],
          answer: 0,
          explanation: "มาจาก = come from. Answer with มาจาก + country: อังกฤษ (England), อเมริกา (America), ญี่ปุ่น (Japan).",
        }),
        choose("bangkok-5-c2", {
          question: "A local smiles: พูดไทยเก่งนะ (You speak Thai well!). A modest reply is…",
          choices: ["ขอบคุณครับ นิดหน่อยครับ", "ใช่ เก่งมากครับ", "ไม่ชอบครับ", "ลงที่นี่ครับ"],
          answer: 0,
          explanation: "นิดหน่อย = just a little. Thais tend to brush off compliments, so say thanks and play it down.",
        }),
        order("bangkok-5-o1", ["ผม", "มา", "เที่ยว", "ครับ"], "I'm here on holiday.",
          "ผม (I, male) + มาเที่ยว (come to travel) + ครับ. Women say ฉันมาเที่ยวค่ะ."),
      ]),
    ],
  },

  // ================================================================ Ayutthaya
  {
    provinceId: "ayutthaya",
    stages: [
      stage("ayutthaya-2", "🚲", "Cycling the Island City", "ปั่นจักรยานรอบเกาะเมือง", 20, [
        ...drill("ayutthaya-2-w", AYU_BIKE, { speak: 1 }),
        choose("ayutthaya-2-c1", {
          question: "At the bike shop near the station, you want to rent one bicycle:",
          choices: ["ขอเช่าจักรยานหนึ่งคันครับ", "ขอซื้อรถไฟหนึ่งคันครับ", "ขอเช่าเรือหนึ่งลำครับ", "ขอกินจักรยานครับ"],
          answer: 0,
          explanation: "ขอเช่า = I'd like to rent. Vehicles are counted with คัน (khan), so one bike = จักรยานหนึ่งคัน.",
        }),
        choose("ayutthaya-2-c2", {
          question: "Why do people call old Ayutthaya an island?",
          choices: ["Rivers surround the old city", "It is in the sea", "It is on a lake", "It is surrounded by mountains"],
          answer: 0,
          explanation: "The Chao Phraya, Pa Sak and Lopburi rivers ring the old city, so locals call it เกาะเมือง (the city island).",
        }),
        order("ayutthaya-2-o1", ["เช่า", "วันละ", "เท่าไหร่", "ครับ"], "How much to rent per day?",
          "เช่า (rent) + วันละ (per day) + เท่าไหร่ (how much) + ครับ."),
      ]),
      stage("ayutthaya-3", "🍤", "Boat Noodles & Roti", "ก๋วยเตี๋ยวเรือและโรตีสายไหม", 25, [
        ...drill("ayutthaya-3-w", AYU_FOOD, { speak: 1 }),
        choose("ayutthaya-3-c1", {
          question: "Boat noodle bowls are tiny. You finished yours and want another:",
          choices: ["ขออีกชามครับ", "เช็คบิลครับ", "ไม่เอาแล้วครับ", "ชามใหญ่มากครับ"],
          answer: 0,
          explanation: "อีก = another / more, ชาม = bowl. Most people order a few small bowls of ก๋วยเตี๋ยวเรือ and stack up the empties.",
        }),
        choose("ayutthaya-3-c2", {
          question: "What do you do with โรตีสายไหม?",
          choices: ["Wrap the sugar threads in the thin roti and eat", "Pour it into soup", "Grill it over charcoal", "Drink it with ice"],
          answer: 0,
          explanation: "You roll the fluffy sugar threads up inside a thin, soft roti sheet. Thais often buy a bag to take home as ของฝาก (a gift for people back home).",
        }),
        order("ayutthaya-3-o1", ["กุ้ง", "ตัว", "ใหญ่", "มาก"], "The prawn is really big!",
          "กุ้ง + ตัว (classifier for animals) + ใหญ่ (big) + มาก (very)."),
      ]),
      stage("ayutthaya-4", "🐘", "Kings, Chedis & Elephants", "กษัตริย์ เจดีย์ และช้าง", 25, [
        ...drill("ayutthaya-4-w", AYU_PAST, { speak: 1 }),
        choose("ayutthaya-4-c1", {
          question: "For roughly how long was Ayutthaya the Thai capital?",
          choices: ["About 400 years", "About 40 years", "About 10 years", "About 1,000 years"],
          answer: 0,
          explanation: "Ayutthaya was the capital from 1350 until 1767, more than 400 years. That's why it is the เมืองหลวงเก่า (old capital).",
        }),
        choose("ayutthaya-4-c2", {
          question: "Wat Phra Si Sanphet is famous for its row of…",
          choices: ["three big bell-shaped chedis", "giant golden Buddhas", "floating markets", "white marble towers"],
          answer: 0,
          explanation: "Its three tall chedis (เจดีย์) stand in a row, and you'll see them on most Ayutthaya postcards.",
        }),
        order("ayutthaya-4-o1", ["เจดีย์", "นี้", "เก่า", "มาก"], "This chedi is very old.",
          "Noun + นี้ (this) comes after the noun, then the adjective เก่า (old) + มาก (very)."),
      ]),
      stage("ayutthaya-5", "🌙", "Chatting at the Night Market", "คุยกับคนท้องถิ่น", 30, [
        ...drill("ayutthaya-5-w", AYU_CHAT, { speak: 1 }),
        choose("ayutthaya-5-c1", {
          question: "You want a local to recommend a place to visit. You ask…",
          choices: ["แนะนำที่เที่ยวหน่อยครับ", "ที่เที่ยวแพงไหมครับ", "ไม่ชอบที่เที่ยวครับ", "ที่เที่ยวอยู่ที่นี่ครับ"],
          answer: 0,
          explanation: "แนะนำ (recommend) + ที่เที่ยว (place to visit) + หน่อย (softener).",
        }),
        choose("ayutthaya-5-c2", {
          question: "A vendor asks: ชอบอยุธยาไหมครับ? You loved it:",
          choices: ["ชอบมากครับ", "ไม่ชอบครับ", "ไปไหนครับ", "เท่าไหร่ครับ"],
          answer: 0,
          explanation: "To answer a ไหม question, repeat the verb: ชอบ (like) + มาก (very). The negative is ไม่ชอบ.",
        }),
        order("ayutthaya-5-o1", ["อยุธยา", "สวย", "มาก", "ครับ"], "Ayutthaya is very beautiful.",
          "Thai needs no word for \"is\" before an adjective: place + สวย (beautiful) + มาก (very) + ครับ."),
      ]),
    ],
  },

  // ================================================================ Chiang Mai
  {
    provinceId: "chiang_mai",
    stages: [
      stage("chiang_mai-2", "🛻", "Riding the Red Truck", "นั่งรถแดง", 20, [
        ...drill("chiang_mai-2-w", CNX_RIDE, { speak: 1 }),
        choose("chiang_mai-2-c1", {
          question: "Before hopping into a รถแดง, what's smart to do?",
          choices: ["Tell the driver where you're going and agree the price", "Pay after a week", "Sit on the roof", "Ask for a menu"],
          answer: 0,
          explanation: "รถแดง are shared taxis with no meter. Say your stop (ไปประตูท่าแพครับ) and check the price first.",
        }),
        choose("chiang_mai-2-c2", {
          question: "What surrounds Chiang Mai's square old city?",
          choices: ["A moat and old walls", "The sea", "A desert", "A huge lake"],
          answer: 0,
          explanation: "คูเมือง (city moat) and old brick walls with gates like ประตูท่าแพ still frame the old city.",
        }),
        order("chiang_mai-2-o1", ["ไป", "ประตูท่าแพ", "เท่าไหร่", "ครับ"], "How much to Tha Phae Gate?",
          "ไป (go) + place + เท่าไหร่ (how much) + ครับ."),
      ]),
      stage("chiang_mai-3", "🌶️", "Northern Flavors", "อาหารเหนือ", 25, [
        ...drill("chiang_mai-3-w", CNX_FOOD, { speak: 1 }),
        choose("chiang_mai-3-c1", {
          question: "How do people usually eat ข้าวเหนียว in the North?",
          choices: ["Roll it into a small ball with the hand", "With chopsticks", "Through a straw", "Spread on bread"],
          answer: 0,
          explanation: "Squeeze a little sticky rice into a ball with your fingers, then dip it into น้ำพริกหนุ่ม or น้ำพริกอ่อง.",
        }),
        choose("chiang_mai-3-c2", {
          question: "What is a ขันโตก dinner?",
          choices: ["A Lanna meal of small dishes on a low round tray", "A floating market boat", "A spicy papaya salad", "A coffee shop"],
          answer: 0,
          explanation: "ขันโตก is a traditional Northern (Lanna) way of dining: you sit on the floor around a low tray of shared dishes.",
        }),
        order("chiang_mai-3-o1", ["ไส้อั่ว", "อร่อย", "มาก", "ครับ"], "The northern sausage is very tasty.",
          "Food + อร่อย (delicious) + มาก (very) + ครับ. In Northern dialect you might also hear ลำ for delicious."),
      ]),
      stage("chiang_mai-4", "🐉", "Doi Suthep & Monk Chat", "ไหว้พระธาตุดอยสุเทพ", 25, [
        ...drill("chiang_mai-4-w", CNX_TEMPLE, { speak: 1 }),
        choose("chiang_mai-4-c1", {
          question: "Climbing to Wat Phra That Doi Suthep, the long staircase is lined with…",
          choices: ["naga serpents", "elephants", "lions", "dragons made of ice"],
          answer: 0,
          explanation: "Over 300 steps climb up between two long พญานาค (naga) railings.",
        }),
        choose("chiang_mai-4-c2", {
          question: "At a monk chat, which is polite?",
          choices: ["Women avoid touching monks or handing things straight to them", "Hug the monk to say thanks", "Sit higher than the monk", "Point your feet at the monk"],
          answer: 0,
          explanation: "Women should not touch พระสงฆ์ (monks). Sit a bit lower, keep your feet tucked away, and ask friendly questions.",
        }),
        order("chiang_mai-4-o1", ["ไป", "ไหว้พระ", "ที่", "ดอยสุเทพ"], "Go to pay respect at Doi Suthep.",
          "ไป (go) + ไหว้พระ (pay respect) + ที่ (at) + place. Locals say it as one phrase when they head up the mountain."),
      ]),
      stage("chiang_mai-5", "🗣️", "Speak a Little คำเมือง", "อู้กำเมือง", 30, [
        ...drill("chiang_mai-5-w", CNX_KAMMUANG, { speak: 1 }),
        choose("chiang_mai-5-c1", {
          question: "A Chiang Mai grandma says ลำขนาด about her khao soi. She means…",
          choices: ["It's super delicious", "It's very expensive", "It's too spicy", "It's not ready"],
          answer: 0,
          explanation: "In Northern Thai ลำ = delicious and ขนาด = very. In Standard Thai you'd say อร่อยมาก.",
        }),
        choose("chiang_mai-5-c2", {
          question: "The Northern word กิ๋น is Standard Thai…",
          choices: ["กิน (eat)", "ไป (go)", "นอน (sleep)", "ซื้อ (buy)"],
          answer: 0,
          explanation: "กิ๋น is the Northern way of saying กิน (to eat).",
        }),
        order("chiang_mai-5-o1", ["ข้าวซอย", "ลำ", "ขนาด"], "Khao soi is super delicious! (Northern)",
          "Northern Thai: food + ลำ (delicious) + ขนาด (very). Say it to the cook after your first spoonful."),
      ]),
    ],
  },

  // ================================================================ Chiang Rai
  {
    provinceId: "chiang_rai",
    stages: [
      stage("chiang_rai-2", "🚌", "Bus to the Border", "นั่งรถไปแม่สาย", 20, [
        ...drill("chiang_rai-2-w", CEI_BUS, { speak: 1 }),
        choose("chiang_rai-2-c1", {
          question: "What is special about แม่สาย?",
          choices: ["It is Thailand's northernmost town, on the Myanmar border", "It is a beach resort", "It is the capital city", "It is an island"],
          answer: 0,
          explanation: "Mae Sai sits at the very top of Thailand, right on the border with Myanmar. Bring your หนังสือเดินทาง (passport) if you plan to cross.",
        }),
        choose("chiang_rai-2-c2", {
          question: "At the Golden Triangle, Thailand, Laos and Myanmar meet along which river?",
          choices: ["แม่น้ำโขง (Mekong)", "แม่น้ำเจ้าพระยา (Chao Phraya)", "แม่น้ำปิง (Ping)", "แม่น้ำน่าน (Nan)"],
          answer: 0,
          explanation: "The แม่น้ำโขง (Mekong River) forms the border here. แม่น้ำ = river.",
        }),
        order("chiang_rai-2-o1", ["รถ", "ออก", "กี่โมง", "ครับ"], "What time does the bus leave?",
          "รถ (vehicle) + ออก (leave) + กี่โมง (what time) + ครับ."),
      ]),
      stage("chiang_rai-3", "🍵", "Tea Hills in the Mist", "ไร่ชาบนดอย", 25, [
        ...drill("chiang_rai-3-w", CEI_TEA, { speak: 1 }),
        choose("chiang_rai-3-c1", {
          question: "At a café on the hill you want iced coffee, less sweet:",
          choices: ["ขอกาแฟเย็นหวานน้อยครับ", "ขอกาแฟร้อนหวานมากครับ", "ขอชาเย็นไม่ใส่น้ำแข็งครับ", "ขอน้ำเปล่าครับ"],
          answer: 0,
          explanation: "Thai iced coffee is often very sweet, so หวานน้อย (less sweet) is a handy phrase.",
        }),
        choose("chiang_rai-3-c2", {
          question: "Locals call Doi Mae Salong a ดอย. In Standard Thai, a mountain is…",
          choices: ["ภูเขา", "ทะเล", "แม่น้ำ", "เกาะ"],
          answer: 0,
          explanation: "ดอย is the Northern word, ภูเขา (phu-khao) is Standard Thai.",
        }),
        order("chiang_rai-3-o1", ["ขอ", "ชา", "ร้อน", "ครับ"], "Hot tea, please.",
          "ขอ (may I have) + ชา (tea) + ร้อน (hot) + ครับ. In Thai the describing word comes after the noun."),
      ]),
      stage("chiang_rai-4", "🎨", "White, Black & Blue", "วัดขาว บ้านดำ วัดสีน้ำเงิน", 25, [
        ...drill("chiang_rai-4-w", CEI_ART, { speak: 1 }),
        choose("chiang_rai-4-c1", {
          question: "Wat Rong Suea Ten in Chiang Rai is famous for its…",
          choices: ["deep blue color", "all-white color", "black wooden houses", "golden beach"],
          answer: 0,
          explanation: "Wat Rong Suea Ten is the \"Blue Temple\". Colors in Thai start with สี: สีน้ำเงิน = blue.",
        }),
        choose("chiang_rai-4-c2", {
          question: "Who created Wat Rong Khun (the White Temple)?",
          choices: ["A Thai artist, Chalermchai Kositpipat", "A king of Ayutthaya", "A French architect", "Nobody knows"],
          answer: 0,
          explanation: "The ศิลปิน (artist) Chalermchai Kositpipat, a Chiang Rai local, designed it.",
        }),
        order("chiang_rai-4-o1", ["วัด", "นี้", "สวย", "มาก"], "This temple is very beautiful.",
          "วัด + นี้ (this) + สวย (beautiful) + มาก (very). นี้ always follows the noun."),
      ]),
      stage("chiang_rai-5", "👋", "Where Have You Been?", "ไปไหนมา", 30, [
        ...drill("chiang_rai-5-w", CEI_CHAT, { speak: 1 }),
        choose("chiang_rai-5-c1", {
          question: "A neighbour calls out: ไปไหนมา? What does she really want?",
          choices: ["Just a friendly hello; a short answer is fine", "Your full travel plan", "Your passport", "Money"],
          answer: 0,
          explanation: "ไปไหนมา works like \"Hi!\". A casual ไปเที่ยวมาครับ (been out sightseeing) is all the answer they need.",
        }),
        choose("chiang_rai-5-c2", {
          question: "An old man asks: อู้คำเมืองได้ก่อ? He's asking…",
          choices: ["Can you speak Northern Thai?", "Have you eaten?", "Where is the market?", "Are you tired?"],
          answer: 0,
          explanation: "อู้ = speak (Northern), คำเมือง = Northern Thai, ก่อ = Northern question word like ไหม. If you know a few words, answer ได้หน่อยครับ (a little).",
        }),
        order("chiang_rai-5-o1", ["ผม", "ไป", "กาด", "มา"], "I've been to the market.",
          "ไป + place + มา = went somewhere and came back. กาด is the Northern word for market (Standard Thai: ตลาด)."),
      ]),
    ],
  },

  // ================================================================ Sukhothai
  {
    provinceId: "sukhothai",
    stages: [
      stage("sukhothai-1", "🌅", "Dawn of Happiness", "รุ่งอรุณแห่งความสุข", 20, [
        ...drill("sukhothai-1-w", SKT_WELCOME, { speak: 1 }),
        choose("sukhothai-1-c1", {
          question: "สุโขทัย comes from สุข + อุทัย. What does the name mean?",
          choices: ["Dawn of happiness", "City of rivers", "Golden mountain", "Land of elephants"],
          answer: 0,
          explanation: "สุข = happiness and อุทัย = dawn / sunrise, so Sukhothai is the \"Dawn of Happiness\".",
        }),
        choose("sukhothai-1-c2", {
          question: "Why is Sukhothai important in Thai history?",
          choices: ["It is often called the first Thai kingdom", "It is the newest Thai city", "It was a Portuguese port", "It is where Bangkok began"],
          answer: 0,
          explanation: "The Sukhothai อาณาจักร (kingdom) rose in the 13th century, and Thai history lessons usually start here.",
        }),
        order("sukhothai-1-o1", ["ยินดี", "ต้อนรับ", "สู่", "สุโขทัย"], "Welcome to Sukhothai.",
          "ยินดีต้อนรับ (welcome) + สู่ (to) + place. You'll see this on signs all over Thailand."),
      ]),
      stage("sukhothai-2", "🥜", "Sukhothai Noodles", "ก๋วยเตี๋ยวสุโขทัย", 25, [
        ...drill("sukhothai-2-w", SKT_FOOD, { speak: 1 }),
        choose("sukhothai-2-c1", {
          question: "Which toppings are typical of ก๋วยเตี๋ยวสุโขทัย?",
          choices: ["Peanuts, long beans and pork", "Cheese and tomato", "Coconut and mango", "Seaweed and raw fish"],
          answer: 0,
          explanation: "Sukhothai noodles are sweet, sour and savory, topped with ถั่วลิสง (peanuts), ถั่วฝักยาว (long beans) and pork.",
        }),
        choose("sukhothai-2-c2", {
          question: "You want your noodles without soup. You say…",
          choices: ["ขอแบบแห้งครับ", "ขอน้ำเยอะครับ", "ขอเผ็ดมากครับ", "ขอใส่ถุงครับ"],
          answer: 0,
          explanation: "แบบ = style, แห้ง = dry. Noodle shops serve most noodles น้ำ (with soup) or แห้ง (dry).",
        }),
        order("sukhothai-2-o1", ["ไม่", "ใส่", "ถั่ว", "ครับ"], "No peanuts, please.",
          "ไม่ใส่ (don't put in) + ingredient + ครับ."),
      ]),
      stage("sukhothai-3", "🪷", "Lanterns, Krathong & the Thai Alphabet", "ลอยกระทงและลายสือไทย", 25, [
        ...drill("sukhothai-3-w", SKT_HERITAGE, { speak: 1 }),
        choose("sukhothai-3-c1", {
          question: "King Ramkhamhaeng's famous stone inscription says ในน้ำมีปลา ในนามีข้าว. It means…",
          choices: ["In the water there are fish, in the fields there is rice", "The king is strong and brave", "Rain falls in the north", "Welcome to the old city"],
          answer: 0,
          explanation: "น้ำ = water, ปลา = fish, นา = rice field, ข้าว = rice. The line says Sukhothai had plenty of food to go around.",
        }),
        choose("sukhothai-3-c2", {
          question: "When is ลอยกระทง held?",
          choices: ["On the full moon of the 12th Thai lunar month, usually November", "On New Year's Day", "In the hottest week of April", "Every Monday"],
          answer: 0,
          explanation: "On the พระจันทร์เต็มดวง (full moon) people float a กระทง on the water.",
        }),
        order("sukhothai-3-o1", ["ใน", "น้ำ", "มี", "ปลา"], "In the water there are fish.",
          "ใน (in) + place + มี (there is) + thing. The same pattern: ในนามีข้าว (in the fields there is rice)."),
      ]),
      stage("sukhothai-4", "🏺", "Ceramics & Souvenirs", "สังคโลกและของฝาก", 30, [
        ...drill("sukhothai-4-w", SKT_CRAFT, { speak: 1 }),
        choose("sukhothai-4-c1", {
          question: "You bought a ceramic bowl and want the seller to wrap it:",
          choices: ["ช่วยห่อให้หน่อยครับ", "ช่วยทำแตกหน่อยครับ", "ไม่ต้องจ่ายครับ", "ไปไหนมาครับ"],
          answer: 0,
          explanation: "ช่วย...ให้หน่อย = please do ... for me. ห่อ = wrap. Add ระวังแตก (fragile) so it travels safely.",
        }),
        choose("sukhothai-4-c2", {
          question: "A shop owner asks: ซื้อเป็นของฝากเหรอครับ? She's asking if it is…",
          choices: ["a gift for people back home", "for breakfast", "broken", "too expensive"],
          answer: 0,
          explanation: "ของฝาก = a souvenir gift for friends and family. Thais are expected to bring ของฝาก back for family and coworkers after a trip.",
        }),
        order("sukhothai-4-o1", ["อันนี้", "ทำมือ", "ใช่ไหม", "ครับ"], "This one is handmade, right?",
          "อันนี้ (this one) + ทำมือ (handmade) + ใช่ไหม (right?) + ครับ. ใช่ไหม turns a statement into a check question."),
      ]),
    ],
  },
];
