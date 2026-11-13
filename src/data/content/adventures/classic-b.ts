import { drill, choose, order, stage } from "../build";
import type { ProvinceAdventure, Word } from "../types";

// ---------------------------------------------------------------- Phuket
const PHUKET_2: Word[] = [
  { th: "รถตุ๊กตุ๊ก", rom: "rot tuk-tuk", en: "tuk-tuk" },
  { th: "สนามบิน", rom: "sa-nam-bin", en: "airport" },
  { th: "เมืองเก่า", rom: "mueang kao", en: "old town" },
  { th: "เช่ามอเตอร์ไซค์", rom: "chao mo-toe-sai", en: "rent a motorbike" },
  { th: "หมวกกันน็อก", rom: "muak kan nok", en: "helmet" },
  { th: "ไปส่งที่โรงแรม", rom: "pai song thi rong-raem", en: "drop me at the hotel" },
];
const PHUKET_3: Word[] = [
  { th: "หมี่ฮกเกี้ยน", rom: "mi hok-kian", en: "Hokkien noodles" },
  { th: "ติ่มซำ", rom: "tim-sam", en: "dim sum" },
  { th: "โอ้เอ๋ว", rom: "o-aeo", en: "o-aew jelly dessert" },
  { th: "หรอย", rom: "roi", en: "delicious (Southern)" },
  { th: "เผ็ดน้อย", rom: "phet noi", en: "a little spicy" },
  { th: "ขอเมนูหน่อย", rom: "kho me-nu noi", en: "the menu, please" },
];
const PHUKET_4: Word[] = [
  { th: "พระใหญ่", rom: "phra yai", en: "Big Buddha" },
  { th: "แหลมพรหมเทพ", rom: "laem phrom-thep", en: "Promthep Cape" },
  { th: "พระอาทิตย์ตก", rom: "phra a-thit tok", en: "sunset" },
  { th: "จุดชมวิว", rom: "jut chom wiu", en: "viewpoint" },
  { th: "แต่งตัวสุภาพ", rom: "taeng tua su-phap", en: "dress modestly" },
  { th: "ลมแรง", rom: "lom raeng", en: "strong wind" },
];
const PHUKET_5: Word[] = [
  { th: "เทศกาลกินเจ", rom: "tet-sa-kan gin je", en: "Vegetarian Festival" },
  { th: "มาจากไหน", rom: "ma jak nai", en: "where are you from?" },
  { th: "มาเที่ยวกี่วัน", rom: "ma thiao gi wan", en: "how many days is your trip?" },
  { th: "ชอบภูเก็ตไหม", rom: "chop phu-ket mai", en: "do you like Phuket?" },
  { th: "ชอบมาก", rom: "chop mak", en: "I like it a lot" },
  { th: "คนใจดี", rom: "khon jai dee", en: "kind people" },
];

// ---------------------------------------------------------------- Krabi
const KRABI_2: Word[] = [
  { th: "ท่าเรือ", rom: "tha rua", en: "pier" },
  { th: "ตั๋วเรือ", rom: "tua rua", en: "boat ticket" },
  { th: "ไปกลับ", rom: "pai klap", en: "round trip" },
  { th: "เสื้อชูชีพ", rom: "suea chu-chip", en: "life jacket" },
  { th: "รถสองแถว", rom: "rot song-thaeo", en: "songthaew (shared pickup taxi)" },
  { th: "เกาะ", rom: "ko", en: "island" },
];
const KRABI_3: Word[] = [
  { th: "ข้าวยำ", rom: "khao yam", en: "Southern rice salad" },
  { th: "แกงเหลือง", rom: "gaeng lueang", en: "sour yellow curry" },
  { th: "แกงไตปลา", rom: "gaeng tai pla", en: "fish-innards curry" },
  { th: "ขนมจีน", rom: "kha-nom jeen", en: "fresh rice noodles" },
  { th: "เผ็ดมาก", rom: "phet mak", en: "very spicy" },
  { th: "ผักสด", rom: "phak sot", en: "fresh vegetables" },
];
const KRABI_4: Word[] = [
  { th: "วัดถ้ำเสือ", rom: "wat tham suea", en: "Tiger Cave Temple" },
  { th: "ถ้ำ", rom: "tham", en: "cave" },
  { th: "บันได", rom: "ban-dai", en: "stairs" },
  { th: "สระมรกต", rom: "sa mo-ra-kot", en: "Emerald Pool" },
  { th: "ลิง", rom: "ling", en: "monkey" },
  { th: "เหนื่อย", rom: "nueai", en: "tired" },
];
const KRABI_5: Word[] = [
  { th: "ทัวร์สี่เกาะ", rom: "thua si ko", en: "four-island tour" },
  { th: "แหลง", rom: "laeng", en: "to speak (Southern)" },
  { th: "พูดช้าๆ", rom: "phut cha cha", en: "speak slowly" },
  { th: "ฟังไม่ออก", rom: "fang mai ok", en: "I can't understand (what I hear)" },
  { th: "อีกครั้ง", rom: "ik khrang", en: "again" },
  { th: "เมาเรือ", rom: "mao rua", en: "seasick" },
];

// ---------------------------------------------------------------- Pai
const PAI_1: Word[] = [
  { th: "รถตู้", rom: "rot tu", en: "minivan" },
  { th: "โค้ง", rom: "khong", en: "bend in the road" },
  { th: "ภูเขา", rom: "phu-khao", en: "mountain" },
  { th: "เวียนหัว", rom: "wian hua", en: "dizzy" },
  { th: "ขับช้าๆ", rom: "khap cha cha", en: "drive slowly" },
  { th: "ถึงแล้ว", rom: "thueng laeo", en: "we've arrived" },
];
const PAI_2: Word[] = [
  { th: "ถนนคนเดิน", rom: "tha-non khon doen", en: "walking street" },
  { th: "ข้าวซอย", rom: "khao soi", en: "khao soi curry noodles" },
  { th: "ไส้อั่ว", rom: "sai ua", en: "Northern herb sausage" },
  { th: "ปิ้ง", rom: "ping", en: "grilled" },
  { th: "มังสวิรัติ", rom: "mang-sa-wi-rat", en: "vegetarian" },
  { th: "อิ่มแล้ว", rom: "im laeo", en: "I'm full" },
];
const PAI_3: Word[] = [
  { th: "บ่อน้ำร้อน", rom: "bo nam ron", en: "hot spring" },
  { th: "น้ำตก", rom: "nam tok", en: "waterfall" },
  { th: "หน้าผา", rom: "na pha", en: "cliff" },
  { th: "ระวัง", rom: "ra-wang", en: "be careful" },
  { th: "ลื่น", rom: "luen", en: "slippery" },
  { th: "สะพานไม้ไผ่", rom: "sa-phan mai phai", en: "bamboo bridge" },
];
const PAI_4: Word[] = [
  { th: "ร้านกาแฟ", rom: "ran ga-fae", en: "café" },
  { th: "พักผ่อน", rom: "phak-phon", en: "to relax" },
  { th: "ทะเลหมอก", rom: "tha-le mok", en: "sea of mist" },
  { th: "ตื่นเช้า", rom: "tuen chao", en: "wake up early" },
  { th: "เจ้า", rom: "jao", en: "polite particle (Northern)" },
  { th: "อยู่กี่คืน", rom: "yu gi khuen", en: "how many nights are you staying?" },
];

// ---------------------------------------------------------------- Khao Yai / Korat
const KHAO_YAI_1: Word[] = [
  { th: "อุทยานแห่งชาติ", rom: "ut-tha-yan haeng chat", en: "national park" },
  { th: "ค่าเข้า", rom: "kha khao", en: "entrance fee" },
  { th: "เช่ารถ", rom: "chao rot", en: "rent a car" },
  { th: "ด่าน", rom: "dan", en: "checkpoint gate" },
  { th: "แผนที่", rom: "phaen-thi", en: "map" },
  { th: "ป่า", rom: "pa", en: "forest" },
];
const KHAO_YAI_2: Word[] = [
  { th: "ผัดหมี่โคราช", rom: "phat mi ko-rat", en: "Korat-style fried noodles" },
  { th: "ส้มตำ", rom: "som tam", en: "papaya salad" },
  { th: "ข้าวเหนียว", rom: "khao niao", en: "sticky rice" },
  { th: "ไก่ย่าง", rom: "gai yang", en: "grilled chicken" },
  { th: "แซ่บ", rom: "saep", en: "tasty and spicy (Isan)" },
  { th: "น้ำเปล่า", rom: "nam plao", en: "plain water" },
];
const KHAO_YAI_3: Word[] = [
  { th: "ช้างป่า", rom: "chang pa", en: "wild elephant" },
  { th: "นกเงือก", rom: "nok ngueak", en: "hornbill" },
  { th: "กวาง", rom: "kwang", en: "deer" },
  { th: "ชะนี", rom: "cha-ni", en: "gibbon" },
  { th: "งู", rom: "ngu", en: "snake" },
  { th: "ส่องสัตว์", rom: "song sat", en: "spot wildlife at night" },
];
const KHAO_YAI_4: Word[] = [
  { th: "ทางเดิน", rom: "thang doen", en: "trail" },
  { th: "ทาก", rom: "thak", en: "leech" },
  { th: "เปียก", rom: "piak", en: "wet" },
  { th: "สดชื่น", rom: "sot-chuen", en: "refreshed" },
  { th: "บ่", rom: "bo", en: "not (Isan)" },
  { th: "เด้อ", rom: "doe", en: "okay? / you know (Isan particle)" },
];

// ---------------------------------------------------------------- Koh Samui
const SAMUI_1: Word[] = [
  { th: "เรือเฟอร์รี่", rom: "rua foe-ri", en: "ferry" },
  { th: "ขึ้นเรือ", rom: "khuen rua", en: "get on the boat" },
  { th: "ลงเรือ", rom: "long rua", en: "get off the boat" },
  { th: "คลื่นแรง", rom: "khluen raeng", en: "big waves" },
  { th: "ชั้นบน", rom: "chan bon", en: "upper deck" },
  { th: "ห้องน้ำอยู่ไหน", rom: "hong nam yu nai", en: "where is the toilet?" },
];
const SAMUI_2: Word[] = [
  { th: "มะพร้าว", rom: "ma-phrao", en: "coconut" },
  { th: "น้ำมะพร้าว", rom: "nam ma-phrao", en: "coconut water" },
  { th: "กะทิ", rom: "ka-thi", en: "coconut milk" },
  { th: "ปลาหมึกย่าง", rom: "pla muek yang", en: "grilled squid" },
  { th: "หวาน", rom: "wan", en: "sweet" },
  { th: "หรอยจัง", rom: "roi jang", en: "so delicious (Southern)" },
];
const SAMUI_3: Word[] = [
  { th: "พระพุทธรูป", rom: "phra phut-tha-rup", en: "Buddha image" },
  { th: "ไหว้พระ", rom: "wai phra", en: "pay respect to the Buddha" },
  { th: "ถอดรองเท้า", rom: "thot rong-thao", en: "take off your shoes" },
  { th: "ธูป", rom: "thup", en: "incense stick" },
  { th: "ทำบุญ", rom: "tham bun", en: "make merit" },
  { th: "สีทอง", rom: "si thong", en: "golden" },
];
const SAMUI_4: Word[] = [
  { th: "บังกะโล", rom: "bang-ka-lo", en: "bungalow" },
  { th: "ห้องว่าง", rom: "hong wang", en: "vacant room" },
  { th: "แอร์", rom: "ae", en: "air-conditioning" },
  { th: "พัดลม", rom: "phat-lom", en: "electric fan" },
  { th: "อาหารเช้า", rom: "a-han chao", en: "breakfast" },
  { th: "เช็คเอาท์", rom: "chek-ao", en: "check out" },
];

export const ADVENTURES_CLASSIC_B: ProvinceAdventure[] = [
  {
    provinceId: "phuket",
    stages: [
      stage("phuket-2", "🛺", "Old Town by Tuk-tuk", "นั่งตุ๊กตุ๊กชมเมืองเก่า", 20, [
        ...drill("phuket-2", PHUKET_2, { speak: 1 }),
        choose("phuket-2-c1", {
          question: "You want a tuk-tuk to Patong Beach and need the price first. What do you ask?",
          choices: ["ไปหาดป่าตองเท่าไหร่ครับ", "หาดป่าตองสวยไหมครับ", "ไปหาดป่าตองแล้วครับ", "หาดป่าตองอยู่ที่นี่ครับ"],
          answer: 0,
          explanation: "ไป (go) + place + เท่าไหร่ (how much)? Phuket tuk-tuks don't use meters, so always agree on the price before you get in.",
        }),
        choose("phuket-2-c2", {
          question: "Phuket Old Town (เมืองเก่าภูเก็ต) is best known for…",
          choices: ["Colourful Sino-Portuguese shophouses", "Floating markets on canals", "Ancient Khmer stone temples", "Snowy mountain views"],
          answer: 0,
          explanation: "Tin-mining wealth built pastel Sino-Portuguese shophouses on streets like Thalang Road. เมือง = town/city, เก่า = old.",
        }),
        order("phuket-2-o1", ["เช่า", "มอเตอร์ไซค์", "วันละ", "เท่าไหร่"], "How much is it to rent a motorbike per day?", "เช่า (rent) + มอเตอร์ไซค์ (motorbike) + วันละ (per day) + เท่าไหร่ (how much). Add ครับ/ค่ะ at the end to be polite."),
      ]),
      stage("phuket-3", "🍜", "Phuket Flavours", "อาหารภูเก็ต", 25, [
        ...drill("phuket-3", PHUKET_3, { speak: 1 }),
        choose("phuket-3-c1", {
          question: "A Phuket auntie asks you: หรอยไหม? What is she asking?",
          choices: ["Is it delicious?", "Is it too hot?", "Are you full?", "Do you want more rice?"],
          answer: 0,
          explanation: "หรอย (roi) is the Southern word for อร่อย (delicious). If it was good, answer หรอยมาก (roi mak).",
        }),
        choose("phuket-3-c2", {
          question: "Why are Hokkien noodles and dim sum breakfasts so common in Phuket?",
          choices: ["Many Phuket families have Hokkien Chinese roots", "They were invented for tourists in the 1990s", "Phuket is close to Japan", "They are royal palace dishes"],
          answer: 0,
          explanation: "Hokkien Chinese tin miners settled in Phuket long ago, so their food mixed with Thai and Malay cooking.",
        }),
        order("phuket-3-o1", ["ขอ", "หมี่ฮกเกี้ยน", "หนึ่ง", "จาน"], "One plate of Hokkien noodles, please.", "ขอ (may I have) + dish + number + จาน (plate, the counting word for dishes). Add ครับ/ค่ะ at the end to be polite."),
      ]),
      stage("phuket-4", "🌅", "Big Buddha & Sunset Cape", "พระใหญ่และแหลมพรหมเทพ", 25, [
        ...drill("phuket-4", PHUKET_4, { speak: 1 }),
        choose("phuket-4-c1", {
          question: "You arrive at Phuket's Big Buddha in shorts and a tank top. What is the right thing to do?",
          choices: ["Cover up with a sarong or scarf before going in", "Walk in, nobody minds", "Take your shirt off because it's hot", "Wait in the car park"],
          answer: 0,
          explanation: "Temples ask visitors to แต่งตัวสุภาพ (dress modestly): cover shoulders and knees. Wraps are usually offered at the entrance.",
        }),
        choose("phuket-4-c2", {
          question: "Why do crowds gather at แหลมพรหมเทพ in the evening?",
          choices: ["To watch the sunset", "To see the night market", "To catch the ferry to Bangkok", "To watch Thai boxing"],
          answer: 0,
          explanation: "Promthep Cape, at Phuket's southern tip, is the island's most famous sunset viewpoint. แหลม = cape, พระอาทิตย์ตก = sunset (sun + fall).",
        }),
        order("phuket-4-o1", ["พระอาทิตย์ตก", "สวย", "มาก"], "The sunset is very beautiful.", "Thai adjectives work like verbs: noun + สวย (beautiful) + มาก (very). You don't need a word for 'is'."),
      ]),
      stage("phuket-5", "💬", "Chatting with Phuket Locals", "คุยกับคนภูเก็ต", 30, [
        ...drill("phuket-5", PHUKET_5, { speak: 1 }),
        choose("phuket-5-c1", {
          question: "During Phuket's Vegetarian Festival you see yellow flags with red writing on food stalls. What do they mean?",
          choices: ["The stall sells vegetarian (เจ) food", "The stall is closed", "Seafood is half price", "Only locals may buy here"],
          answer: 0,
          explanation: "In the เทศกาลกินเจ (Vegetarian Festival), yellow flags marked เจ show food with no meat.",
        }),
        choose("phuket-5-c2", {
          question: "A local asks you: มาจากไหนครับ? Which answer fits?",
          choices: ["ผมมาจากอังกฤษครับ", "ผมไปภูเก็ตครับ", "ผมชอบมากครับ", "สามวันครับ"],
          answer: 0,
          explanation: "มาจาก = come from. ผมมาจากอังกฤษครับ = I'm from England. Women say ฉัน…ค่ะ. สามวันครับ answers มาเที่ยวกี่วัน instead.",
        }),
        order("phuket-5-o1", ["ผม", "ชอบ", "ภูเก็ต", "มาก", "ครับ"], "I like Phuket a lot.", "Subject + ชอบ (like) + thing + มาก (a lot) + ครับ. Women: ฉันชอบภูเก็ตมากค่ะ."),
      ]),
    ],
  },
  {
    provinceId: "krabi",
    stages: [
      stage("krabi-2", "⛵", "At the Boat Pier", "ที่ท่าเรือ", 20, [
        ...drill("krabi-2", KRABI_2, { speak: 1 }),
        choose("krabi-2-c1", {
          question: "You bought a boat ticket to Railay. How do you ask what time the boat leaves?",
          choices: ["เรือออกกี่โมงครับ", "เรือสวยไหมครับ", "เรือเท่าไหร่ครับ", "เรืออยู่ไหนครับ"],
          answer: 0,
          explanation: "ออก = leave/depart, กี่โมง = what time. เรือออกกี่โมง = what time does the boat leave?",
        }),
        choose("krabi-2-c2", {
          question: "In Krabi town a รถสองแถว pulls up. What is it?",
          choices: ["A pickup truck with two benches, used as a shared taxi", "A two-storey bus", "A boat with two engines", "A taxi for two people only"],
          answer: 0,
          explanation: "สอง = two, แถว = rows: the two rows of benches in the back.",
        }),
        order("krabi-2-o1", ["ขอ", "ตั๋ว", "ไปกลับ", "ครับ"], "A round-trip ticket, please.", "ขอ (may I have) + ตั๋ว (ticket) + ไปกลับ (go-return = round trip) + ครับ. One way is เที่ยวเดียว."),
      ]),
      stage("krabi-3", "🍛", "Southern Spice", "อาหารใต้รสจัด", 25, [
        ...drill("krabi-3", KRABI_3, { speak: 1 }),
        choose("krabi-3-c1", {
          question: "Southern Thai food has a reputation for being…",
          choices: ["Some of the spiciest in Thailand", "Always sweet", "Never served with rice", "Mostly raw beef"],
          answer: 0,
          explanation: "Southern curries like แกงเหลือง and แกงไตปลา are famous for their heat. Locals cool down with a plate of free ผักสด (fresh vegetables).",
        }),
        choose("krabi-3-c2", {
          question: "You can't handle chilli. What do you tell the cook?",
          choices: ["ไม่เผ็ดได้ไหมครับ", "เผ็ดมากครับ", "อร่อยมากครับ", "ไม่หิวครับ"],
          answer: 0,
          explanation: "ไม่เผ็ด = not spicy, ได้ไหม = can you?",
        }),
        order("krabi-3-o1", ["ขอ", "ไม่", "เผ็ด", "ครับ"], "Not spicy, please.", "ขอ + ไม่เผ็ด (not spicy) + ครับ/ค่ะ. ไม่ always comes right before the word it negates."),
      ]),
      stage("krabi-4", "🐯", "Tiger Cave Temple", "วัดถ้ำเสือ", 25, [
        ...drill("krabi-4", KRABI_4, { speak: 1 }),
        choose("krabi-4-c1", {
          question: "What makes the climb at วัดถ้ำเสือ so famous?",
          choices: ["Over 1,200 steep steps to a Buddha on the peak", "A cable car over the sea", "An underwater tunnel", "A slide back down"],
          answer: 0,
          explanation: "The stairs up to the hilltop shrine are well over a thousand steps. You'll be saying เหนื่อย (tired) at the top, where you look out over Krabi's limestone hills.",
        }),
        choose("krabi-4-c2", {
          question: "A sign on the stairs says ระวังลิง. What should you do?",
          choices: ["Watch out for monkeys and hide your snacks", "Feed the monkeys bananas", "Take off your shoes", "Stop climbing"],
          answer: 0,
          explanation: "ระวัง = watch out, ลิง = monkey.",
        }),
        order("krabi-4-o1", ["เหนื่อย", "มาก", "เลย"], "I'm so tired!", "เหนื่อย (tired) + มาก (very) + เลย (really) makes it stronger. Thai often drops 'I' when it's obvious."),
      ]),
      stage("krabi-5", "🏝️", "Island-Hopping Chat", "คุยกันบนเรือทัวร์", 30, [
        ...drill("krabi-5", KRABI_5, { speak: 1 }),
        choose("krabi-5-c1", {
          question: "On the four-island tour the boatman grins: แหลงไทยเก่งจัง! What does he mean?",
          choices: ["You speak Thai really well!", "You swim really well!", "You are very seasick!", "You eat a lot!"],
          answer: 0,
          explanation: "แหลง (laeng) is Southern for พูด (speak). จัง = so/really. Reply ขอบคุณครับ, ยังเรียนอยู่ (thank you, still learning).",
        }),
        choose("krabi-5-c2", {
          question: "The guide talks too fast and you're lost. What do you say?",
          choices: ["พูดช้าๆ หน่อยได้ไหมครับ", "พูดเร็วๆ หน่อยครับ", "ไม่เป็นไรครับ", "เมาเรือครับ"],
          answer: 0,
          explanation: "พูดช้าๆ = speak slowly, หน่อย softens it, ได้ไหม = could you?",
        }),
        order("krabi-5-o1", ["พูด", "อีกครั้ง", "ได้ไหม", "ครับ"], "Could you say that again?", "พูด (say) + อีกครั้ง (again) + ได้ไหม (could you?) + ครับ/ค่ะ."),
      ]),
    ],
  },
  {
    provinceId: "pai",
    stages: [
      stage("pai-1", "🏍️", "The Winding Road to Pai", "ทางโค้งสู่ปาย", 20, [
        ...drill("pai-1", PAI_1, { speak: 1 }),
        choose("pai-1-c1", {
          question: "The mountain road from Chiang Mai to Pai is famous for…",
          choices: ["Its 762 curves", "Being completely straight", "Running along the sea", "Having no other traffic"],
          answer: 0,
          explanation: "Souvenir shirts brag about surviving the 762 โค้ง (bends). If the minivan makes you เวียนหัว (dizzy), look at the horizon.",
        }),
        choose("pai-1-c2", {
          question: "You feel sick in the minivan. How do you ask the driver to stop for a moment?",
          choices: ["จอดแป๊บนึงได้ไหมครับ", "ขับเร็วๆ ครับ", "ถึงแล้วครับ", "ไปปายครับ"],
          answer: 0,
          explanation: "จอด = stop/park, แป๊บนึง = for a moment (casual), ได้ไหม = can you?",
        }),
        order("pai-1-o1", ["อากาศ", "เย็นสบาย", "มาก"], "The weather is very cool and comfortable.", "อากาศ (weather) + เย็นสบาย (cool and pleasant) + มาก (very). You'll hear it all the time once you're up in Pai."),
      ]),
      stage("pai-2", "🍢", "Walking Street Snacks", "ของกินถนนคนเดิน", 25, [
        ...drill("pai-2", PAI_2, { speak: 1 }),
        choose("pai-2-c1", {
          question: "A Northern vendor at the walking street says: ลำแต้ๆ! What does she mean?",
          choices: ["Really delicious! (Northern)", "Very expensive!", "Almost sold out!", "Be careful, it's hot!"],
          answer: 0,
          explanation: "In the Northern dialect (คำเมือง), ลำ means อร่อย (delicious) and แต้ means really. ลำแต้ๆ = super tasty!",
        }),
        choose("pai-2-c2", {
          question: "You don't eat meat. How do you ask if there's vegetarian food?",
          choices: ["มีอาหารมังสวิรัติไหมครับ", "มีไส้อั่วไหมครับ", "อิ่มแล้วครับ", "ปิ้งเท่าไหร่ครับ"],
          answer: 0,
          explanation: "มี…ไหม = do you have…? มังสวิรัติ = vegetarian.",
        }),
        order("pai-2-o1", ["ขอ", "ข้าวซอย", "ไก่", "ครับ"], "Chicken khao soi, please.", "ขอ + dish + ไก่ (chicken) + ครับ/ค่ะ. In Thai the meat comes after the dish name."),
      ]),
      stage("pai-3", "♨️", "Canyon & Hot Springs", "กองแลนและบ่อน้ำร้อน", 25, [
        ...drill("pai-3", PAI_3, { speak: 1 }),
        choose("pai-3-c1", {
          question: "Pai Canyon has narrow ridges with steep drops on both sides. What do you tell your friend?",
          choices: ["ระวังนะ", "เร็วๆ หน่อย", "อิ่มแล้ว", "ไม่เป็นไร"],
          answer: 0,
          explanation: "ระวัง = be careful, นะ softens it. Locals call Pai Canyon กองแลน (Kong Lan).",
        }),
        choose("pai-3-c2", {
          question: "After a cold Pai morning, where can you warm up?",
          choices: ["At the บ่อน้ำร้อน", "At the หน้าผา", "At the น้ำตก", "At the สะพานไม้ไผ่"],
          answer: 0,
          explanation: "บ่อ = pool/well, น้ำร้อน = hot water. The hot springs near Pai are a favourite way to warm up in the cool season.",
        }),
        order("pai-3-o1", ["ระวัง", "ลื่น", "นะ", "ครับ"], "Careful, it's slippery!", "ระวัง (careful) + ลื่น (slippery) + นะ + ครับ. You'll hear ระวังลื่น on rocks near every waterfall."),
      ]),
      stage("pai-4", "☕", "Slow Life in Pai", "ใช้ชีวิตช้าๆ ที่ปาย", 30, [
        ...drill("pai-4", PAI_4, { speak: 1 }),
        choose("pai-4-c1", {
          question: "A café owner from the North says ขอบคุณเจ้า. What is เจ้า?",
          choices: ["A Northern polite particle, like ค่ะ", "The name of the café", "A word for coffee", "A rude word"],
          answer: 0,
          explanation: "Northern women (and often men) end sentences with เจ้า instead of ค่ะ. Try ending your own thank-you with เจ้า too.",
        }),
        choose("pai-4-c2", {
          question: "You want to see the ทะเลหมอก (sea of mist) from a viewpoint near Pai. When should you go?",
          choices: ["Just before sunrise", "At noon", "Late at night", "Any time, it never moves"],
          answer: 0,
          explanation: "The mist sits in the valleys in the early morning, especially in the cool season, so ตื่นเช้า (wake up early)!",
        }),
        order("pai-4-o1", ["ผม", "มา", "พักผ่อน", "ครับ"], "I came here to relax.", "ผม (I) + มา (came) + พักผ่อน (relax) + ครับ. Women: ฉันมาพักผ่อนค่ะ."),
      ]),
    ],
  },
  {
    provinceId: "khao_yai",
    stages: [
      stage("khao_yai-1", "🚗", "Road to the National Park", "ไปอุทยานแห่งชาติ", 20, [
        ...drill("khao_yai-1", KHAO_YAI_1, { speak: 1 }),
        choose("khao_yai-1-c1", {
          question: "What is special about เขาใหญ่ (Khao Yai)?",
          choices: ["It was Thailand's first national park", "It is Thailand's largest beach", "It is a city in the South", "It is an old royal palace"],
          answer: 0,
          explanation: "Khao Yai became Thailand's first อุทยานแห่งชาติ in 1962 and is part of a UNESCO World Heritage forest. เขา = mountain, ใหญ่ = big.",
        }),
        choose("khao_yai-1-c2", {
          question: "At the park gate you want to know the price. What do you ask?",
          choices: ["ค่าเข้าเท่าไหร่ครับ", "แผนที่อยู่ไหนครับ", "ป่าสวยไหมครับ", "เช่ารถได้ไหมครับ"],
          answer: 0,
          explanation: "ค่า = fee/cost, เข้า = enter. ค่าเข้าเท่าไหร่ = how much is the entrance fee?",
        }),
        order("khao_yai-1-o1", ["ไป", "เขาใหญ่", "กัน"], "Let's go to Khao Yai!", "ไป (go) + place + กัน (together/let's). Put กัน at the end to invite friends along."),
      ]),
      stage("khao_yai-2", "🍝", "Korat Eats", "อาหารโคราช", 25, [
        ...drill("khao_yai-2", KHAO_YAI_2, { speak: 1 }),
        choose("khao_yai-2-c1", {
          question: "Your Isan friend tastes the papaya salad and says แซ่บหลาย! What does she mean?",
          choices: ["It's really tasty! (Isan)", "It's too salty!", "It's cold!", "It's finished!"],
          answer: 0,
          explanation: "แซ่บ (saep) = tasty and spicy, หลาย = very (Isan). It's so popular that people all over Thailand use แซ่บ now.",
        }),
        choose("khao_yai-2-c2", {
          question: "How do people in the Northeast usually eat ข้าวเหนียว (sticky rice)?",
          choices: ["Roll it into a ball with their fingers", "With chopsticks", "With a spoon and fork, like other rice", "Drink it as a soup"],
          answer: 0,
          explanation: "Squeeze a little ball of sticky rice with your right hand and dip it in ส้มตำ or eat it with ไก่ย่าง.",
        }),
        order("khao_yai-2-o1", ["ขอ", "ส้มตำ", "ไม่", "เผ็ด"], "Papaya salad, not spicy, please.", "ขอ + dish + ไม่เผ็ด (not spicy). Add ครับ/ค่ะ at the end to be polite."),
      ]),
      stage("khao_yai-3", "🐘", "Wildlife Spotting", "ส่องสัตว์ป่า", 25, [
        ...drill("khao_yai-3", KHAO_YAI_3, { speak: 1 }),
        choose("khao_yai-3-c1", {
          question: "A ช้างป่า (wild elephant) is walking on the park road ahead of your car. What should you do?",
          choices: ["Stay in the car, keep your distance and wait", "Get out to take a selfie", "Honk loudly to move it", "Drive around it quickly"],
          answer: 0,
          explanation: "Wild elephants are big and unpredictable. Rangers tell drivers to stay in the car, keep well back and let them pass.",
        }),
        choose("khao_yai-3-c2", {
          question: "A sign says ห้ามให้อาหารสัตว์. What does it mean?",
          choices: ["Do not feed the animals", "Animals for sale", "Animal food sold here", "Watch the animals here"],
          answer: 0,
          explanation: "ห้าม = do not / forbidden, ให้อาหาร = give food, สัตว์ = animals. You'll see ห้าม on many signs in Thailand.",
        }),
        order("khao_yai-3-o1", ["ช้าง", "อยู่", "ตรงนั้น"], "The elephant is over there!", "Thing + อยู่ (is located) + ตรงนั้น (over there). Point gently with your whole hand, not one finger."),
      ]),
      stage("khao_yai-4", "💦", "Waterfalls & Isan Words", "น้ำตกและคำอีสาน", 30, [
        ...drill("khao_yai-4", KHAO_YAI_4, { speak: 1 }),
        choose("khao_yai-4-c1", {
          question: "Khao Yai's น้ำตกเหวสุวัต (Haew Suwat Waterfall) appears in which famous film?",
          choices: ["The Beach", "Jurassic Park", "Titanic", "The Lion King"],
          answer: 0,
          explanation: "Leonardo DiCaprio jumps off Haew Suwat in The Beach (2000). น้ำตก = waterfall (water + fall).",
        }),
        choose("khao_yai-4-c2", {
          question: "You step on a Korat uncle's foot. He smiles: บ่เป็นหยังเด้อ. What does he mean?",
          choices: ["Never mind, it's okay! (Isan)", "Watch where you walk!", "Where are you going?", "That hurts a lot!"],
          answer: 0,
          explanation: "บ่ = ไม่ (not), เป็นหยัง = เป็นอะไร, เด้อ = นะ. So บ่เป็นหยังเด้อ is the Isan way to say ไม่เป็นไรนะ.",
        }),
        order("khao_yai-4-o1", ["น้ำตก", "อยู่", "ไกล", "ไหม"], "Is the waterfall far?", "Place + อยู่ (is located) + ไกล (far) + ไหม (question). Add ครับ/ค่ะ to be polite. In the rainy season, rangers will also warn you about ทาก (leeches)."),
      ]),
    ],
  },
  {
    provinceId: "koh_samui",
    stages: [
      stage("koh_samui-1", "⛴️", "Ferry to the Island", "นั่งเรือไปเกาะสมุย", 20, [
        ...drill("koh_samui-1", SAMUI_1, { speak: 1 }),
        choose("koh_samui-1-c1", {
          question: "Where do most ferries to เกาะสมุย leave from?",
          choices: ["Surat Thani province, on the Gulf of Thailand", "Phuket, on the Andaman Sea", "Bangkok's Chao Phraya River", "Chiang Mai"],
          answer: 0,
          explanation: "Koh Samui is in the Gulf of Thailand and belongs to Surat Thani province. Car ferries cross from the mainland piers there.",
        }),
        choose("koh_samui-1-c2", {
          question: "You want to know when the ferry gets to Samui. What do you ask?",
          choices: ["ถึงกี่โมงครับ", "ขึ้นเรือได้ไหมครับ", "ห้องน้ำอยู่ไหนครับ", "คลื่นแรงไหมครับ"],
          answer: 0,
          explanation: "ถึง = arrive, กี่โมง = what time. ถึงกี่โมงครับ = what time do we arrive?",
        }),
        order("koh_samui-1-o1", ["เกาะ", "สวย", "มาก"], "The island is very beautiful.", "เกาะ (island) + สวย (beautiful) + มาก (very). Swap in ทะเล (sea) or หาด (beach) for the same compliment."),
      ]),
      stage("koh_samui-2", "🥥", "Coconut Island Treats", "ของอร่อยเกาะมะพร้าว", 25, [
        ...drill("koh_samui-2", SAMUI_2, { speak: 1 }),
        choose("koh_samui-2-c1", {
          question: "Koh Samui has long been famous for growing lots of…",
          choices: ["Coconuts", "Rice", "Tea", "Strawberries"],
          answer: 0,
          explanation: "Coconut palms cover the island, and มะพร้าว was its main crop for generations.",
        }),
        choose("koh_samui-2-c2", {
          question: "You sip fresh น้ำมะพร้าว and want to say 'so delicious' like a Southerner. What do you say?",
          choices: ["หรอยจัง", "หวานน้อย", "อิ่มแล้ว", "เผ็ดมาก"],
          answer: 0,
          explanation: "หรอย = delicious (Southern), จัง = so/really. Central Thai would say อร่อยจัง.",
        }),
        order("koh_samui-2-o1", ["ขอ", "มะพร้าว", "หนึ่ง", "ลูก"], "One coconut, please.", "ขอ + มะพร้าว + หนึ่ง (one) + ลูก. ลูก is the counting word for round fruits like coconuts. Add ครับ/ค่ะ at the end."),
      ]),
      stage("koh_samui-3", "🛕", "Big Buddha Temple", "วัดพระใหญ่", 25, [
        ...drill("koh_samui-3", SAMUI_3, { speak: 1 }),
        choose("koh_samui-3-c1", {
          question: "Inside the temple you sit down on the floor facing the พระพุทธรูป. How should you sit?",
          choices: ["With your feet tucked away, not pointing at the Buddha", "With your feet stretched toward the Buddha", "Lying down to rest", "Standing on the cushion"],
          answer: 0,
          explanation: "Feet are the lowest part of the body in Thai culture, so never point them at a Buddha image or at people.",
        }),
        choose("koh_samui-3-c2", {
          question: "Samui's famous rocks หินตาหินยาย are named after…",
          choices: ["Grandfather and grandmother", "A king and queen", "Two fishermen", "A tiger and a crocodile"],
          answer: 0,
          explanation: "หิน = rock, ตา = maternal grandfather, ยาย = maternal grandmother. A local legend tells of an old couple lost at sea.",
        }),
        order("koh_samui-3-o1", ["ถอด", "รองเท้า", "ก่อน", "นะ"], "Take off your shoes first, okay?", "ถอด (take off) + รองเท้า (shoes) + ก่อน (first) + นะ (friendly softener). Leave them at the steps before entering a temple hall."),
      ]),
      stage("koh_samui-4", "🌴", "Beach Bungalow Check-in", "เช็คอินบังกะโลริมหาด", 30, [
        ...drill("koh_samui-4", SAMUI_4, { speak: 1 }),
        choose("koh_samui-4-c1", {
          question: "You turn up at a bungalow without a booking. What do you ask first?",
          choices: ["มีห้องว่างไหมครับ", "เช็คเอาท์กี่โมงครับ", "อาหารเช้าอร่อยไหมครับ", "พัดลมเสียครับ"],
          answer: 0,
          explanation: "มี…ไหม = is there…? ห้องว่าง = free room (ว่าง = empty/free). Women end with ค่ะ.",
        }),
        choose("koh_samui-4-c2", {
          question: "The owner offers ห้องพัดลม or ห้องแอร์. Which is usually cheaper?",
          choices: ["ห้องพัดลม (fan room)", "ห้องแอร์ (air-con room)", "They always cost the same", "Neither, both are free"],
          answer: 0,
          explanation: "Fan rooms are the budget choice on Thai islands. แอร์ comes from English 'air', short for air-conditioning.",
        }),
        order("koh_samui-4-o1", ["มี", "ห้องว่าง", "ไหม", "ครับ"], "Do you have a free room?", "มี (have) + ห้องว่าง (vacant room) + ไหม (question) + ครับ/ค่ะ. Use the same pattern for anything: มีน้ำไหมครับ?"),
      ]),
    ],
  },
];
