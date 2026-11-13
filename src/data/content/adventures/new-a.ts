import { drill, choose, order, stage } from "../build";
import type { ProvinceAdventure, Word } from "../types";

// ---------------------------------------------------------------- Khon Kaen
const KK1: Word[] = [
  { th: "สถานีขนส่ง", rom: "sa-tha-nee khon-song", en: "bus terminal" },
  { th: "รถตู้", rom: "rot-tu", en: "minivan" },
  { th: "สนามบิน", rom: "sa-nam-bin", en: "airport" },
  { th: "โรงแรม", rom: "rong-raem", en: "hotel" },
  { th: "แผนที่", rom: "phaen-thee", en: "map" },
  { th: "ไกลไหม", rom: "klai mai", en: "is it far?" },
];
const KK2: Word[] = [
  { th: "ส้มตำ", rom: "som-tam", en: "papaya salad" },
  { th: "ข้าวเหนียว", rom: "khao-niao", en: "sticky rice" },
  { th: "ไก่ย่าง", rom: "gai-yang", en: "grilled chicken" },
  { th: "เผ็ด", rom: "phet", en: "spicy" },
  { th: "ไม่เผ็ด", rom: "mai phet", en: "not spicy" },
  { th: "แซ่บ", rom: "saep", en: "tasty, zesty (Isan)" },
];
const KK3: Word[] = [
  { th: "ไดโนเสาร์", rom: "dai-no-sao", en: "dinosaur" },
  { th: "พิพิธภัณฑ์", rom: "phi-phit-tha-phan", en: "museum" },
  { th: "กระดูก", rom: "kra-duk", en: "bone" },
  { th: "ฟอสซิล", rom: "fos-sin", en: "fossil" },
  { th: "อุทยานแห่งชาติ", rom: "ut-tha-yan haeng chat", en: "national park" },
  { th: "ใหญ่มาก", rom: "yai mak", en: "very big" },
];
const KK4: Word[] = [
  { th: "ผ้าไหม", rom: "pha-mai", en: "silk cloth" },
  { th: "สวย", rom: "suay", en: "beautiful" },
  { th: "ซื้อ", rom: "sue", en: "to buy" },
  { th: "เบิ่ง", rom: "boeng", en: "to look (Isan)" },
  { th: "หลาย", rom: "lai", en: "very, a lot (Isan)" },
  { th: "บ่", rom: "bo", en: "not, no (Isan)" },
];

// ---------------------------------------------------------------- Kanchanaburi
const KB1: Word[] = [
  { th: "รถไฟ", rom: "rot-fai", en: "train" },
  { th: "สถานีรถไฟ", rom: "sa-tha-nee rot-fai", en: "train station" },
  { th: "ตั๋ว", rom: "tua", en: "ticket" },
  { th: "แม่น้ำ", rom: "mae-nam", en: "river" },
  { th: "สะพาน", rom: "sa-phan", en: "bridge" },
  { th: "กี่โมง", rom: "gee mong", en: "what time?" },
];
const KB2: Word[] = [
  { th: "ปลา", rom: "pla", en: "fish" },
  { th: "ร้านอาหาร", rom: "ran a-han", en: "restaurant" },
  { th: "ต้มยำ", rom: "tom-yam", en: "tom yum soup" },
  { th: "ทอด", rom: "thot", en: "fried" },
  { th: "เมนู", rom: "me-nu", en: "menu" },
  { th: "อิ่มแล้ว", rom: "im laew", en: "I'm full" },
];
const KB3: Word[] = [
  { th: "น้ำตก", rom: "nam-tok", en: "waterfall" },
  { th: "ชั้น", rom: "chan", en: "level, tier" },
  { th: "ว่ายน้ำ", rom: "wai-nam", en: "to swim" },
  { th: "ป่า", rom: "pa", en: "forest, jungle" },
  { th: "เย็น", rom: "yen", en: "cool" },
  { th: "ชุดว่ายน้ำ", rom: "chut wai-nam", en: "swimsuit" },
];
const KB4: Word[] = [
  { th: "บ้านแพ", rom: "ban-phae", en: "raft house" },
  { th: "เรือ", rom: "ruea", en: "boat" },
  { th: "พายเรือ", rom: "phai ruea", en: "to paddle a boat" },
  { th: "ยุง", rom: "yung", en: "mosquito" },
  { th: "ดาว", rom: "dao", en: "star" },
  { th: "เงียบ", rom: "ngiap", en: "quiet" },
];

// ---------------------------------------------------------------- Lampang
const LP1: Word[] = [
  { th: "รถม้า", rom: "rot-ma", en: "horse carriage" },
  { th: "ม้า", rom: "ma", en: "horse" },
  { th: "รอบเมือง", rom: "rop mueang", en: "around town" },
  { th: "เลี้ยวซ้าย", rom: "liao sai", en: "turn left" },
  { th: "เลี้ยวขวา", rom: "liao khwa", en: "turn right" },
  { th: "หยุดตรงนี้", rom: "yut trong-nee", en: "stop here" },
];
const LP2: Word[] = [
  { th: "ชามตราไก่", rom: "cham tra gai", en: "rooster bowl" },
  { th: "ข้าวซอย", rom: "khao soi", en: "curry noodle soup" },
  { th: "ไส้อั่ว", rom: "sai ua", en: "Northern herb sausage" },
  { th: "แคบหมู", rom: "khaep mu", en: "crispy pork skin" },
  { th: "ช้อน", rom: "chon", en: "spoon" },
  { th: "ตะเกียบ", rom: "ta-kiap", en: "chopsticks" },
];
const LP3: Word[] = [
  { th: "วัด", rom: "wat", en: "temple" },
  { th: "เจดีย์", rom: "je-dee", en: "chedi, stupa" },
  { th: "ไม้สัก", rom: "mai sak", en: "teak wood" },
  { th: "ถอดรองเท้า", rom: "thot rong-thao", en: "take off your shoes" },
  { th: "ไหว้พระ", rom: "wai phra", en: "pay respect to the Buddha" },
  { th: "เงียบๆ", rom: "ngiap ngiap", en: "quietly" },
];
const LP4: Word[] = [
  { th: "เจ้า", rom: "jao", en: "polite particle (Northern)" },
  { th: "กิ๋น", rom: "gin", en: "to eat (Northern)" },
  { th: "ลำ", rom: "lam", en: "delicious (Northern)" },
  { th: "ขอบใจ๋", rom: "khop jai", en: "thank you (Northern)" },
  { th: "แอ่ว", rom: "aeo", en: "to go out, to visit (Northern)" },
  { th: "ม่วน", rom: "muan", en: "fun (Northern)" },
];

// ---------------------------------------------------------------- Udon Thani
const UD1: Word[] = [
  { th: "รถสองแถว", rom: "rot song-thaeo", en: "songthaew (shared pickup)" },
  { th: "จอดตรงนี้", rom: "jot trong-nee", en: "pull over here" },
  { th: "ตรงไป", rom: "trong pai", en: "go straight" },
  { th: "เช่ารถ", rom: "chao rot", en: "rent a car" },
  { th: "ตลาด", rom: "ta-lat", en: "market" },
  { th: "ไกลไหม", rom: "klai mai", en: "is it far?" },
];
const UD2: Word[] = [
  { th: "ดอกบัว", rom: "dok bua", en: "lotus flower" },
  { th: "ทะเลสาบ", rom: "tha-le-sap", en: "lake" },
  { th: "เรือ", rom: "ruea", en: "boat" },
  { th: "ตอนเช้า", rom: "ton chao", en: "in the morning" },
  { th: "สีแดง", rom: "see daeng", en: "red" },
  { th: "ถ่ายรูป", rom: "thai rup", en: "take a photo" },
];
const UD3: Word[] = [
  { th: "โบราณ", rom: "bo-ran", en: "ancient" },
  { th: "หม้อ", rom: "mo", en: "pot" },
  { th: "ลวดลาย", rom: "luat-lai", en: "pattern, design" },
  { th: "ปี", rom: "pee", en: "year" },
  { th: "มรดกโลก", rom: "mo-ra-dok lok", en: "World Heritage" },
  { th: "ห้ามจับ", rom: "ham jap", en: "do not touch" },
];
const UD4: Word[] = [
  { th: "ลาบ", rom: "lap", en: "spicy minced meat salad" },
  { th: "น้ำตก", rom: "nam-tok", en: "grilled meat salad" },
  { th: "ต้มแซ่บ", rom: "tom saep", en: "hot and sour Isan soup" },
  { th: "ปลาร้า", rom: "pla-ra", en: "fermented fish sauce" },
  { th: "จิ้มจุ่ม", rom: "jim-jum", en: "Isan clay-pot hot pot" },
  { th: "ข้าวเหนียว", rom: "khao-niao", en: "sticky rice" },
];

// ---------------------------------------------------------------- Lopburi
const LB1: Word[] = [
  { th: "ลิง", rom: "ling", en: "monkey" },
  { th: "ระวัง", rom: "ra-wang", en: "be careful" },
  { th: "กระเป๋า", rom: "kra-pao", en: "bag" },
  { th: "แว่นกันแดด", rom: "waen kan daet", en: "sunglasses" },
  { th: "ขโมย", rom: "kha-moi", en: "to steal" },
  { th: "เดิน", rom: "doen", en: "to walk" },
];
const LB2: Word[] = [
  { th: "ปรางค์", rom: "prang", en: "Khmer-style tower" },
  { th: "สาม", rom: "sam", en: "three" },
  { th: "ยอด", rom: "yot", en: "top, spire" },
  { th: "ขอม", rom: "khom", en: "Khmer (ancient)" },
  { th: "กล้วย", rom: "kluai", en: "banana" },
  { th: "อย่าให้อาหาร", rom: "ya hai a-han", en: "don't feed" },
];
const LB3: Word[] = [
  { th: "พระราชวัง", rom: "phra-rat-cha-wang", en: "royal palace" },
  { th: "กษัตริย์", rom: "ka-sat", en: "king" },
  { th: "ประวัติศาสตร์", rom: "pra-wat-ti-sat", en: "history" },
  { th: "ฝรั่งเศส", rom: "fa-rang-set", en: "France" },
  { th: "เมืองหลวง", rom: "mueang luang", en: "capital city" },
  { th: "ทูต", rom: "thut", en: "envoy, ambassador" },
];
const LB4: Word[] = [
  { th: "ดอกทานตะวัน", rom: "dok than-ta-wan", en: "sunflower" },
  { th: "ทุ่ง", rom: "thung", en: "field" },
  { th: "ร้อน", rom: "ron", en: "hot" },
  { th: "หมวก", rom: "muak", en: "hat" },
  { th: "เมล็ด", rom: "ma-let", en: "seed" },
  { th: "หน้าหนาว", rom: "na nao", en: "cool season" },
];

// ---------------------------------------------------------------- Nan
const NN1: Word[] = [
  { th: "ภูเขา", rom: "phu-khao", en: "mountain" },
  { th: "หุบเขา", rom: "hup khao", en: "valley" },
  { th: "เช่ามอเตอร์ไซค์", rom: "chao mo-toe-sai", en: "rent a motorbike" },
  { th: "ถนน", rom: "tha-non", en: "road" },
  { th: "ทางโค้ง", rom: "thang khong", en: "winding road, curve" },
  { th: "ช้าๆ", rom: "cha cha", en: "slowly" },
];
const NN2: Word[] = [
  { th: "ภาพวาด", rom: "phap wat", en: "painting" },
  { th: "ผนัง", rom: "pha-nang", en: "wall" },
  { th: "กระซิบ", rom: "kra-sip", en: "to whisper" },
  { th: "ประตู", rom: "pra-tu", en: "door" },
  { th: "พญานาค", rom: "pha-ya-nak", en: "naga serpent" },
  { th: "สี่ทิศ", rom: "see thit", en: "four directions" },
];
const NN3: Word[] = [
  { th: "ดอย", rom: "doi", en: "mountain (Northern)" },
  { th: "ดาว", rom: "dao", en: "star" },
  { th: "ทะเลหมอก", rom: "tha-le mok", en: "sea of mist" },
  { th: "เต็นท์", rom: "ten", en: "tent" },
  { th: "หนาว", rom: "nao", en: "cold" },
  { th: "พระอาทิตย์ขึ้น", rom: "phra-a-thit khuen", en: "sunrise" },
];
const NN4: Word[] = [
  { th: "แข่งเรือ", rom: "khaeng ruea", en: "boat race" },
  { th: "เร็ว", rom: "reo", en: "fast" },
  { th: "อู้", rom: "u", en: "to speak (Northern)" },
  { th: "กาด", rom: "kat", en: "market (Northern)" },
  { th: "งาม", rom: "ngam", en: "beautiful (Northern)" },
  { th: "ปิ๊กบ้าน", rom: "pik ban", en: "go back home (Northern)" },
];

export const ADVENTURES_NEW_A: ProvinceAdventure[] = [
  // ======================================================== KHON KAEN
  {
    provinceId: "khon_kaen",
    stages: [
      stage("khon_kaen-1", "🚌", "Arriving in Khon Kaen", "ถึงขอนแก่น", 25, [
        ...drill("khon_kaen-1-v", KK1, { speak: 1 }),
        choose("khon_kaen-1-c1", {
          question: "You hop in a taxi at the airport and want to know the fare to your hotel. You say…",
          choices: ["ไปโรงแรมเท่าไหร่ครับ", "โรงแรมอยู่ที่ไหนครับ", "ขอแผนที่หน่อยครับ", "สนามบินไกลไหมครับ"],
          answer: 0,
          explanation: "ไป (go) + โรงแรม (hotel) + เท่าไหร่ (how much?) asks the price of the ride. Women end with ค่ะ instead of ครับ.",
        }),
        choose("khon_kaen-1-c2", {
          question: "Khon Kaen is one of the big cities of which Thai region?",
          choices: ["Isan (the Northeast)", "Lanna (the North)", "The Deep South", "The eastern Gulf coast"],
          answer: 0,
          explanation: "Khon Kaen sits in the middle of Isan, the Northeast. People here often speak the Isan language, which is close to Lao.",
        }),
        order("khon_kaen-1-o1", ["สถานีขนส่ง", "อยู่ที่ไหน", "ครับ"], "Where is the bus terminal?",
          "Thai puts the place first, then อยู่ที่ไหน (is where?). สถานีขนส่ง is where long-distance buses and minivans leave from."),
      ]),
      stage("khon_kaen-2", "🥗", "Som Tam & Sticky Rice", "ส้มตำข้าวเหนียว", 28, [
        ...drill("khon_kaen-2-v", KK2, { speak: 1 }),
        choose("khon_kaen-2-c1", {
          question: "The som tam vendor reaches for a handful of chilies. You can only handle a little heat. You say…",
          choices: ["เผ็ดน้อยครับ", "เผ็ดมากครับ", "ขอข้าวเหนียวครับ", "อิ่มแล้วครับ"],
          answer: 0,
          explanation: "เผ็ดน้อย = a little spicy.",
        }),
        choose("khon_kaen-2-c2", {
          question: "A local takes a bite and grins: แซ่บหลาย! What does she mean?",
          choices: ["Very tasty! (Isan)", "Too salty!", "I'm full!", "Not spicy at all!"],
          answer: 0,
          explanation: "แซ่บ = zesty and delicious, หลาย = very (in Isan). In Standard Thai you would say อร่อยมาก.",
        }),
        order("khon_kaen-2-o1", ["ส้มตำ", "แซ่บ", "มาก", "ครับ"], "The som tam is really tasty",
          "Thing first, then how it is: ส้มตำ + แซ่บ + มาก (very). แซ่บ is now used all over Thailand, though it comes from Isan."),
      ]),
      stage("khon_kaen-3", "🦕", "Dinosaurs of Phu Wiang", "ไดโนเสาร์ภูเวียง", 30, [
        ...drill("khon_kaen-3-v", KK3, { speak: 1 }),
        choose("khon_kaen-3-c1", {
          question: "Phu Wiang National Park in Khon Kaen is famous for…",
          choices: ["dinosaur fossils", "a floating market", "white sand beaches", "a giant golden Buddha in the sea"],
          answer: 0,
          explanation: "Dinosaur bones were found at Phu Wiang, and one dinosaur was named Phuwiangosaurus sirindhornae in honour of Princess Sirindhorn.",
        }),
        choose("khon_kaen-3-c2", {
          question: "At the museum counter you want one ticket. You say…",
          choices: ["ขอตั๋วหนึ่งใบครับ", "ขอน้ำหนึ่งขวดครับ", "ห้องน้ำอยู่ที่ไหนครับ", "ไม่เอาครับ"],
          answer: 0,
          explanation: "ขอ (may I have) + ตั๋ว (ticket) + หนึ่งใบ (one, using the classifier ใบ for tickets).",
        }),
        order("khon_kaen-3-o1", ["ไดโนเสาร์", "ตัวนี้", "ใหญ่มาก", "ครับ"], "This dinosaur is very big",
          "ตัว is the classifier for animals, so ตัวนี้ = this one. The adjective comes after the noun: ใหญ่มาก = very big."),
      ]),
      stage("khon_kaen-4", "🧵", "Silk & Isan Words", "ผ้าไหมกับคำอีสาน", 35, [
        ...drill("khon_kaen-4-v", KK4, { speak: 1 }),
        choose("khon_kaen-4-c1", {
          question: "An Isan grandmother says บ่เป็นหยัง (Isan, \"never mind\"). Which Standard Thai word means the same as บ่?",
          choices: ["ไม่", "มาก", "ไป", "ดี"],
          answer: 0,
          explanation: "บ่ (bo) is the Isan (and Northern) word for ไม่ (not). บ่เป็นหยัง is Isan for ไม่เป็นไร (never mind).",
        }),
        choose("khon_kaen-4-c2", {
          question: "In Isan, เบิ่ง means the same as which Standard Thai word?",
          choices: ["ดู (to look)", "กิน (to eat)", "นอน (to sleep)", "ซื้อ (to buy)"],
          answer: 0,
          explanation: "A silk seller may wave you over to เบิ่ง her cloth.",
        }),
        order("khon_kaen-4-o1", ["ผ้าไหม", "ผืนนี้", "สวย", "มาก"], "This silk cloth is very beautiful",
          "ผืน is the classifier for cloth and rugs. Noun + classifier + นี้ (this) + adjective is a very common pattern."),
      ]),
    ],
  },

  // ======================================================== KANCHANABURI
  {
    provinceId: "kanchanaburi",
    stages: [
      stage("kanchanaburi-1", "🚂", "Train to the River Kwai", "นั่งรถไฟไปแม่น้ำแคว", 25, [
        ...drill("kanchanaburi-1-v", KB1, { speak: 1 }),
        choose("kanchanaburi-1-c1", {
          question: "What is the famous \"Bridge over the River Kwai\" called in Thai?",
          choices: ["สะพานข้ามแม่น้ำแคว", "สะพานพระราม 8", "สะพานข้ามทะเล", "สะพานไม้ภูเขา"],
          answer: 0,
          explanation: "สะพาน (bridge) + ข้าม (across) + แม่น้ำแคว (Kwai River).",
        }),
        choose("kanchanaburi-1-c2", {
          question: "At the station counter you want one ticket to Kanchanaburi. You say…",
          choices: ["ขอตั๋วไปกาญจนบุรีหนึ่งใบครับ", "รถไฟไปไหนครับ", "ขอโทษครับ", "สถานีรถไฟอยู่ไหนครับ"],
          answer: 0,
          explanation: "ขอตั๋ว + ไป + place + หนึ่งใบ works at any ticket counter. Female speakers end with ค่ะ.",
        }),
        order("kanchanaburi-1-o1", ["รถไฟ", "ออก", "กี่โมง", "ครับ"], "What time does the train leave?",
          "รถไฟ (train) + ออก (leave) + กี่โมง (what time?). Question words like กี่โมง go at the end in Thai."),
      ]),
      stage("kanchanaburi-2", "🐟", "Riverside Dinner", "อาหารริมแม่น้ำ", 28, [
        ...drill("kanchanaburi-2-v", KB2, { speak: 1 }),
        choose("kanchanaburi-2-c1", {
          question: "You sit down at a riverside restaurant. How do you ask for the menu?",
          choices: ["ขอเมนูหน่อยครับ", "เช็กบิลครับ", "อิ่มแล้วครับ", "ไม่เผ็ดครับ"],
          answer: 0,
          explanation: "ขอ + thing + หน่อย is the friendly way to ask for anything. เช็กบิล is for the end of the meal.",
        }),
        choose("kanchanaburi-2-c2", {
          question: "The waiter asks if you want more food, but you have eaten plenty. You say…",
          choices: ["อิ่มแล้วครับ", "หิวมากครับ", "เอาอีกครับ", "อร่อยไหมครับ"],
          answer: 0,
          explanation: "อิ่ม = full, แล้ว = already. Add ขอบคุณครับ (thank you) to sound extra polite.",
        }),
        order("kanchanaburi-2-o1", ["ขอ", "ปลาทอด", "หนึ่ง", "จาน"], "One plate of fried fish, please",
          "ขอ (may I have) + dish + number + จาน (plate). Note the word order: ปลาทอด = fish fried."),
      ]),
      stage("kanchanaburi-3", "💧", "Erawan Waterfall", "น้ำตกเอราวัณ", 30, [
        ...drill("kanchanaburi-3-v", KB3, { speak: 1 }),
        choose("kanchanaburi-3-c1", {
          question: "How many tiers does Erawan Waterfall have?",
          choices: ["7", "3", "12", "1"],
          answer: 0,
          explanation: "Erawan has seven tiers (ชั้น), named after Erawan, the three-headed elephant of Hindu legend.",
        }),
        choose("kanchanaburi-3-c2", {
          question: "You reach the top tier and want to say how lovely it is. You say…",
          choices: ["น้ำตกสวยมาก", "น้ำตกร้อนมาก", "น้ำตกไกลไหม", "น้ำตกอยู่ไหน"],
          answer: 0,
          explanation: "น้ำตก (water + fall) + สวย (beautiful) + มาก (very).",
        }),
        order("kanchanaburi-3-o1", ["ว่ายน้ำ", "ได้", "ไหม", "ครับ"], "Can I swim?",
          "Verb + ได้ไหม asks \"can I…?\""),
      ]),
      stage("kanchanaburi-4", "🛖", "A Night on a Raft House", "คืนนี้นอนบ้านแพ", 35, [
        ...drill("kanchanaburi-4-v", KB4, { speak: 1 }),
        choose("kanchanaburi-4-c1", {
          question: "The jungle mosquitoes are out. You ask the raft house owner for repellent:",
          choices: ["มียากันยุงไหมครับ", "มีดาวไหมครับ", "มีเรือไหมครับ", "มีห้องน้ำไหมครับ"],
          answer: 0,
          explanation: "ยากันยุง = mosquito repellent (ยา medicine + กัน protect + ยุง mosquito). มี…ไหม = do you have…?",
        }),
        choose("kanchanaburi-4-c2", {
          question: "The owner smiles and asks มาจากไหนครับ. What is he asking?",
          choices: ["Where are you from?", "Where are you going?", "Are you hungry?", "How long will you stay?"],
          answer: 0,
          explanation: "มา (come) + จาก (from) + ไหน (where). Answer มาจาก + your country, e.g. มาจากอังกฤษครับ.",
        }),
        order("kanchanaburi-4-o1", ["ที่นี่", "เงียบ", "ดี", "ครับ"], "It's nice and quiet here",
          "ที่นี่ (here) + เงียบ (quiet) + ดี (nicely)."),
      ]),
    ],
  },

  // ======================================================== LAMPANG
  {
    provinceId: "lampang",
    stages: [
      stage("lampang-1", "🐴", "Horse Carriage Ride", "นั่งรถม้า", 25, [
        ...drill("lampang-1-v", LP1, { speak: 1 }),
        choose("lampang-1-c1", {
          question: "Lampang has a famous nickname. Which is it?",
          choices: ["เมืองรถม้า (horse carriage town)", "เมืองลิง (monkey town)", "เมืองทะเล (sea town)", "เมืองดอกบัว (lotus town)"],
          answer: 0,
          explanation: "Lampang is the only Thai city where horse carriages (รถม้า) still trot around town, so it's called เมืองรถม้า.",
        }),
        choose("lampang-1-c2", {
          question: "Before you climb aboard, you ask the driver the price of a ride around town:",
          choices: ["นั่งรอบเมืองเท่าไหร่ครับ", "ม้าชื่ออะไรครับ", "เลี้ยวซ้ายครับ", "หยุดตรงนี้ครับ"],
          answer: 0,
          explanation: "นั่ง (ride/sit) + รอบเมือง (around town) + เท่าไหร่ (how much?).",
        }),
        order("lampang-1-o1", ["นั่ง", "รถม้า", "รอบ", "เมือง"], "Ride a horse carriage around town",
          "Thai uses นั่ง (sit) for riding vehicles: นั่งรถม้า. รอบเมือง = around (the) town."),
      ]),
      stage("lampang-2", "🐓", "Rooster Bowls & Khao Soi", "ชามตราไก่กับข้าวซอย", 28, [
        ...drill("lampang-2-v", LP2, { speak: 1 }),
        choose("lampang-2-c1", {
          question: "Lampang is a big ceramics town. What is painted on its most famous bowls?",
          choices: ["A rooster", "An elephant", "A dragon", "A lotus"],
          answer: 0,
          explanation: "ชามตราไก่ (rooster bowl) is a classic noodle bowl made in Lampang. The rooster is also a symbol of the province.",
        }),
        choose("lampang-2-c2", {
          question: "Your khao soi arrives with only a spoon. You ask for chopsticks:",
          choices: ["ขอตะเกียบหน่อยครับ", "ขอช้อนหน่อยครับ", "ขอชามหน่อยครับ", "ขอน้ำหน่อยครับ"],
          answer: 0,
          explanation: "ตะเกียบ = chopsticks. Thais eat noodle soups with chopsticks and a spoon together.",
        }),
        order("lampang-2-o1", ["ข้าวซอย", "ชามนี้", "อร่อย", "มาก", "ครับ"], "This bowl of khao soi is very tasty",
          "ชาม (bowl) works as a classifier here: ข้าวซอยชามนี้ = this bowl of khao soi."),
      ]),
      stage("lampang-3", "🛕", "Wat Phra That Lampang Luang", "วัดพระธาตุลำปางหลวง", 30, [
        ...drill("lampang-3-v", LP3, { speak: 1 }),
        choose("lampang-3-c1", {
          question: "What should you wear to visit Wat Phra That Lampang Luang?",
          choices: ["Clothes covering shoulders and knees", "A swimsuit", "Shorts and a tank top", "Anything, there are no rules"],
          answer: 0,
          explanation: "Temples ask for modest dress.",
        }),
        choose("lampang-3-c2", {
          question: "A monk points at a sign by the hall: ถอดรองเท้า. What should you do?",
          choices: ["Take off your shoes", "Take a photo", "Pay respect to the Buddha", "Be quiet"],
          answer: 0,
          explanation: "ถอด = take off, รองเท้า = shoes. Leave them outside before entering a temple hall.",
        }),
        order("lampang-3-o1", ["ถอด", "รองเท้า", "ก่อน", "นะครับ"], "Please take off your shoes first",
          "ก่อน = first / before. นะครับ at the end makes it a gentle request."),
      ]),
      stage("lampang-4", "🗣️", "Chatting in Kham Mueang", "อู้คำเมือง", 35, [
        ...drill("lampang-4-v", LP4, { speak: 1 }),
        choose("lampang-4-c1", {
          question: "A Lampang auntie asks you กิ๋นข้าวแล้วกา? (Northern). What is she asking?",
          choices: ["Have you eaten yet?", "Where are you going?", "Is it delicious?", "Do you want rice?"],
          answer: 0,
          explanation: "กิ๋น = eat (Standard กิน), กา = question word in the Northern dialect. It's a friendly greeting, like กินข้าวหรือยัง.",
        }),
        choose("lampang-4-c2", {
          question: "Lampang's key phrase is ไปเที่ยวกันเจ้า. What does it mean?",
          choices: ["Let's go out! (Northern, polite)", "Thank you very much", "The food is delicious", "Please drive slowly"],
          answer: 0,
          explanation: "ไปเที่ยว = go out / travel, กัน = together, เจ้า = a sweet Northern polite particle, much like ค่ะ.",
        }),
        order("lampang-4-o1", ["ไป", "เที่ยว", "กัน", "เจ้า"], "Let's go out! (Northern)",
          "Same order as Standard Thai ไปเที่ยวกันครับ, just finished with the Northern particle เจ้า."),
      ]),
    ],
  },

  // ======================================================== UDON THANI
  {
    provinceId: "udon_thani",
    stages: [
      stage("udon_thani-1", "🛻", "Getting Around Udon", "เที่ยวในอุดร", 25, [
        ...drill("udon_thani-1-v", UD1, { speak: 1 }),
        choose("udon_thani-1-c1", {
          question: "You're riding a songthaew and see your stop. You tell the driver…",
          choices: ["จอดตรงนี้ครับ", "ตรงไปครับ", "ไกลไหมครับ", "เช่ารถครับ"],
          answer: 0,
          explanation: "จอด = stop/park, ตรงนี้ = right here.",
        }),
        choose("udon_thani-1-c2", {
          question: "Udon Thani is close to the border with which country?",
          choices: ["Laos", "Malaysia", "Myanmar", "Vietnam"],
          answer: 0,
          explanation: "Udon is a short ride from Nong Khai and the Friendship Bridge over the Mekong into Laos.",
        }),
        order("udon_thani-1-o1", ["ไป", "ตลาด", "เท่าไหร่", "ครับ"], "How much to the market?",
          "ไป + place + เท่าไหร่ asks the fare. ตลาด = market. The night market is ตลาดกลางคืน."),
      ]),
      stage("udon_thani-2", "🪷", "The Red Lotus Sea", "ทะเลบัวแดง", 28, [
        ...drill("udon_thani-2-v", UD2, { speak: 1 }),
        choose("udon_thani-2-c1", {
          question: "When is the best time of day to see the Red Lotus Sea?",
          choices: ["Early morning", "Midday", "Late afternoon", "At night"],
          answer: 0,
          explanation: "The lotuses open in the morning and close as the day heats up, so boats go out early (ตอนเช้า).",
        }),
        choose("udon_thani-2-c2", {
          question: "You want the boat driver to take a photo of you. You ask…",
          choices: ["ถ่ายรูปให้หน่อยได้ไหมครับ", "ดอกบัวสีอะไรครับ", "เรือไปไหนครับ", "ไม่ถ่ายรูปครับ"],
          answer: 0,
          explanation: "ถ่ายรูป (take a photo) + ให้ (for me) + หน่อย + ได้ไหม (could you?).",
        }),
        order("udon_thani-2-o1", ["ดอกบัว", "สีแดง", "สวย", "มาก"], "The red lotuses are very beautiful",
          "Colour comes after the noun: ดอกบัวสีแดง = red lotus. ทะเลบัวแดง (Red Lotus Sea) is really a big lake full of them."),
      ]),
      stage("udon_thani-3", "🏺", "Ban Chiang's Ancient Pots", "บ้านเชียง", 30, [
        ...drill("udon_thani-3-v", UD3, { speak: 1 }),
        choose("udon_thani-3-c1", {
          question: "The Ban Chiang archaeological site is famous for…",
          choices: ["ancient painted pottery", "a giant reclining Buddha", "a floating market", "dinosaur footprints"],
          answer: 0,
          explanation: "Ban Chiang's red swirl-patterned pots are thousands of years old. The site is a UNESCO World Heritage Site (มรดกโลก).",
        }),
        choose("udon_thani-3-c2", {
          question: "In the museum you see a sign: ห้ามจับ. What does it mean?",
          choices: ["Do not touch", "No photos", "No entry", "Free entry"],
          answer: 0,
          explanation: "ห้าม = forbidden, จับ = touch/hold. ห้าม + verb is how most Thai warning signs are written.",
        }),
        order("udon_thani-3-o1", ["หม้อ", "ใบนี้", "เก่า", "มาก"], "This pot is very old",
          "ใบ is the classifier for pots, bowls and tickets. เก่า = old (for things); โบราณ = ancient."),
      ]),
      stage("udon_thani-4", "🍖", "An Isan Feast", "อาหารอีสาน", 35, [
        ...drill("udon_thani-4-v", UD4, { speak: 1 }),
        choose("udon_thani-4-c1", {
          question: "How do many Isan people eat sticky rice?",
          choices: ["Roll it into a small ball with their fingers", "With chopsticks only", "Mixed into soup with a ladle", "Fried with egg"],
          answer: 0,
          explanation: "Take a little ข้าวเหนียว from the basket, roll it in your fingers and dip it into ลาบ or a spicy sauce.",
        }),
        choose("udon_thani-4-c2", {
          question: "You'd like your papaya salad without the strong fermented fish sauce. You say…",
          choices: ["ไม่ใส่ปลาร้าครับ", "ใส่ปลาร้าเยอะๆครับ", "ขอจิ้มจุ่มครับ", "ปลาร้าอร่อยครับ"],
          answer: 0,
          explanation: "ไม่ใส่ = don't put in. ปลาร้า smells strong.",
        }),
        order("udon_thani-4-o1", ["ขอ", "ลาบหมู", "หนึ่ง", "จาน"], "One plate of pork larb, please",
          "ลาบหมู = minced pork salad, one of the most common Isan dishes. ขอ + dish + number + จาน."),
      ]),
    ],
  },

  // ======================================================== LOPBURI
  {
    provinceId: "lopburi",
    stages: [
      stage("lopburi-1", "🐒", "Welcome to Monkey Town", "ยินดีต้อนรับสู่เมืองลิง", 25, [
        ...drill("lopburi-1-v", LB1, { speak: 1 }),
        choose("lopburi-1-c1", {
          question: "You're walking through old Lopburi. What's the smartest thing to do with your sunglasses?",
          choices: ["Put them in a zipped bag", "Wear them on top of your head", "Hold them out to the monkeys", "Hang them on your shirt"],
          answer: 0,
          explanation: "Lopburi's macaques love to grab glasses, phones and snacks. Keep things in your กระเป๋า (bag)!",
        }),
        choose("lopburi-1-c2", {
          question: "A local shouts ระวังลิงนะ! What is she telling you?",
          choices: ["Watch out for the monkeys!", "Feed the monkeys!", "The monkeys are cute!", "There are no monkeys here!"],
          answer: 0,
          explanation: "ระวัง = be careful, ลิง = monkey, นะ softens it.",
        }),
        order("lopburi-1-o1", ["ระวัง", "ลิง", "นะครับ"], "Watch out for the monkeys!",
          "ระวัง + what to watch out for. Female speakers say ระวังลิงนะคะ."),
      ]),
      stage("lopburi-2", "🛕", "Phra Prang Sam Yot", "พระปรางค์สามยอด", 28, [
        ...drill("lopburi-2-v", LB2, { speak: 1 }),
        choose("lopburi-2-c1", {
          question: "สามยอด in Phra Prang Sam Yot means…",
          choices: ["three spires", "three monkeys", "three kings", "three rivers"],
          answer: 0,
          explanation: "สาม = three, ยอด = top/spire. The temple has three linked Khmer-style towers (ปรางค์).",
        }),
        choose("lopburi-2-c2", {
          question: "Lopburi holds a famous yearly festival in late November. What happens?",
          choices: ["A giant fruit buffet is laid out for the monkeys", "A dragon boat race on the sea", "A lantern release on a mountain", "A rocket festival in the rice fields"],
          answer: 0,
          explanation: "At the Monkey Buffet Festival, piles of fruit and vegetables are served to the macaques to thank them for bringing visitors.",
        }),
        order("lopburi-2-o1", ["อย่า", "ให้อาหาร", "ลิง", "นะครับ"], "Please don't feed the monkeys",
          "อย่า (don't) + verb is how you say \"don't do something\". ให้อาหาร = give food, feed."),
      ]),
      stage("lopburi-3", "👑", "King Narai's City", "เมืองสมเด็จพระนารายณ์", 30, [
        ...drill("lopburi-3-v", LB3, { speak: 1 }),
        choose("lopburi-3-c1", {
          question: "King Narai made Lopburi his second capital. He was a king of which kingdom?",
          choices: ["Ayutthaya", "Sukhothai", "Lanna", "Rattanakosin (Bangkok)"],
          answer: 0,
          explanation: "King Narai ruled Ayutthaya in the 1600s and spent much of the year at his palace in Lopburi.",
        }),
        choose("lopburi-3-c2", {
          question: "King Narai famously welcomed envoys (ทูต) from which European country?",
          choices: ["France", "Spain", "Germany", "Italy"],
          answer: 0,
          explanation: "Envoys of King Louis XIV of France (ฝรั่งเศส) visited King Narai. ฝรั่ง is also the everyday Thai word for Western foreigners.",
        }),
        order("lopburi-3-o1", ["พระราชวัง", "นี้", "เก่า", "มาก"], "This palace is very old",
          "Noun + นี้ (this) + adjective + มาก."),
      ]),
      stage("lopburi-4", "🌻", "Sunflower Fields", "ทุ่งทานตะวัน", 35, [
        ...drill("lopburi-4-v", LB4, { speak: 1 }),
        choose("lopburi-4-c1", {
          question: "When do Lopburi's sunflower fields usually bloom?",
          choices: ["In the cool season, around November to January", "In the rainy season, around August", "Only in April", "All year round"],
          answer: 0,
          explanation: "Fields turn bright yellow in หน้าหนาว (the cool season). ทานตะวัน literally means \"resisting the sun\".",
        }),
        choose("lopburi-4-c2", {
          question: "A farmer at the field asks ร้อนไหมครับ. You're fine. You answer…",
          choices: ["ไม่ร้อนครับ", "ไม่สวยครับ", "ไม่มีครับ", "ไม่ไปครับ"],
          answer: 0,
          explanation: "ร้อนไหม = is it hot? Answer with ไม่ + the same word: ไม่ร้อน = not hot. Or ร้อนนิดหน่อย = a little hot.",
        }),
        order("lopburi-4-o1", ["ทุ่ง", "ทานตะวัน", "สวย", "มาก"], "The sunflower field is very beautiful",
          "ทุ่งทานตะวัน = sunflower field (field + sunflower). The thing described always comes first."),
      ]),
    ],
  },

  // ======================================================== NAN
  {
    provinceId: "nan",
    stages: [
      stage("nan-1", "🛵", "Into the Nan Valley", "สู่เมืองน่าน", 25, [
        ...drill("nan-1-v", NN1, { speak: 1 }),
        choose("nan-1-c1", {
          question: "You want to explore Nan's mountains on two wheels. At the rental shop you say…",
          choices: ["ขอเช่ามอเตอร์ไซค์หนึ่งคันครับ", "ขอตั๋วหนึ่งใบครับ", "ขอแผนที่ครับ", "ขอน้ำหนึ่งขวดครับ"],
          answer: 0,
          explanation: "เช่า = rent, คัน is the classifier for vehicles.",
        }),
        choose("nan-1-c2", {
          question: "You see a yellow road sign: ทางโค้ง. What does it warn you about?",
          choices: ["Curves ahead", "A market ahead", "A school ahead", "A dead end"],
          answer: 0,
          explanation: "ทาง = way/road, โค้ง = curve. Nan's valley roads twist through the hills, so take them ช้าๆ (slowly).",
        }),
        order("nan-1-o1", ["ขับ", "ช้าๆ", "นะครับ"], "Please drive slowly",
          "ขับ = drive, ช้าๆ = slowly (doubling a word makes it softer). นะครับ turns it into friendly advice."),
      ]),
      stage("nan-2", "🎨", "Murals of Wat Phumin", "จิตรกรรมวัดภูมินทร์", 28, [
        ...drill("nan-2-v", NN2, { speak: 1 }),
        choose("nan-2-c1", {
          question: "Wat Phumin's most famous mural shows a couple sharing secrets. It is often called…",
          choices: ["The Whisper of Love (ปู่ม่านย่าม่าน)", "The Dancing Elephant", "The Golden Boat", "The Sleeping King"],
          answer: 0,
          explanation: "The painting of a man whispering (กระซิบ) to a woman shows up all over Nan, on T-shirts and souvenirs.",
        }),
        choose("nan-2-c2", {
          question: "Wat Phumin's main hall has doors facing…",
          choices: ["all four directions", "only the river", "only the east", "no doors at all"],
          answer: 0,
          explanation: "The hall opens to สี่ทิศ (four directions), and two big naga serpents (พญานาค) carry it on their backs.",
        }),
        order("nan-2-o1", ["ภาพวาด", "นี้", "สวย", "มาก"], "This painting is very beautiful",
          "ภาพ = picture, วาด = to draw/paint. Murals on a wall are called จิตรกรรมฝาผนัง."),
      ]),
      stage("nan-3", "⛺", "Stars at Doi Samer Dao", "ดาวที่ดอยเสมอดาว", 30, [
        ...drill("nan-3-v", NN3, { speak: 1 }),
        choose("nan-3-c1", {
          question: "ดอยเสมอดาว is a famous viewpoint in Nan. What does its name roughly mean?",
          choices: ["Mountain level with the stars", "Mountain of the red sun", "Valley of the river", "Hill of the monkeys"],
          answer: 0,
          explanation: "ดอย = mountain (Northern), เสมอ = level/equal, ดาว = star.",
        }),
        choose("nan-3-c2", {
          question: "It's 5 a.m. at the campsite and freezing. You tell your friend…",
          choices: ["หนาวมากครับ", "ร้อนมากครับ", "หิวมากครับ", "เร็วมากครับ"],
          answer: 0,
          explanation: "หนาว = cold (weather).",
        }),
        order("nan-3-o1", ["ดาว", "เยอะ", "มาก", "ครับ"], "There are so many stars",
          "เยอะ = a lot, many. Thai doesn't need \"there are\": just ดาว (stars) + เยอะมาก (so many)."),
      ]),
      stage("nan-4", "🚣", "Boat Races & Northern Words", "แข่งเรือกับคำเมือง", 35, [
        ...drill("nan-4-v", NN4, { speak: 1 }),
        choose("nan-4-c1", {
          question: "Nan's long racing boats are famous for their decorated bows. What is usually carved there?",
          choices: ["A naga serpent head", "A rooster", "An elephant", "A lotus flower"],
          answer: 0,
          explanation: "Nan's boat races (แข่งเรือ) are held around the end of Buddhist Lent, with long boats topped by naga heads.",
        }),
        choose("nan-4-c2", {
          question: "Nan's key phrase is อู้กำเมือง. What does it mean?",
          choices: ["Speak the Northern dialect", "Go to the market", "Go back home", "Row the boat fast"],
          answer: 0,
          explanation: "อู้ = to speak (Northern), กำเมือง = the Northern dialect (คำเมือง).",
        }),
        order("nan-4-o1", ["เรือ", "ลำนี้", "เร็ว", "มาก"], "This boat is very fast",
          "ลำ is the classifier for boats, so เรือลำนี้ = this boat. Cheer it on with สู้ๆ!"),
      ]),
    ],
  },
];
