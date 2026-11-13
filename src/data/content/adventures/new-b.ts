import { drill, choose, order, fill, stage } from "../build";
import type { ActiveExercise } from "@/types/lesson";
import type { AdventureStage, ProvinceAdventure, Word } from "../types";

/** A stage = a 5-word vocabulary drill (7 exercises) plus hand-written questions. */
function st(
  id: string,
  emoji: string,
  title: string,
  title_th: string,
  xp: number,
  words: Word[],
  extra: (p: string) => ActiveExercise[],
): AdventureStage {
  return stage(id, emoji, title, title_th, xp, [...drill(id, words, { speak: 1 }), ...extra(id)]);
}

// ---------------------------------------------------------------- Nong Khai
const NONG_KHAI: AdventureStage[] = [
  st("nong_khai-1", "🌉", "Across the Friendship Bridge", "สะพานมิตรภาพ", 25, [
    { th: "แม่น้ำโขง", rom: "mae-nam khong", en: "the Mekong River" },
    { th: "สะพาน", rom: "sa-phan", en: "bridge" },
    { th: "ลาว", rom: "lao", en: "Laos" },
    { th: "ฝั่ง", rom: "fang", en: "riverbank / side" },
    { th: "ด่าน", rom: "dan", en: "border checkpoint" },
  ], (p) => [
    choose(`${p}-c1`, { question: "You want to find the Friendship Bridge. You ask…", choices: ["สะพานมิตรภาพอยู่ที่ไหนครับ", "สะพานมิตรภาพเท่าไหร่ครับ", "สะพานมิตรภาพอร่อยไหมครับ", "สะพานมิตรภาพชื่ออะไรครับ"], answer: 0, explanation: "อยู่ที่ไหน = where is it? มิตรภาพ (mit-tra-phap) means friendship. Women end with ค่ะ instead of ครับ." }),
    choose(`${p}-c2`, { question: "The first Thai-Lao Friendship Bridge links Nong Khai with which Lao city?", choices: ["Vientiane", "Luang Prabang", "Phnom Penh", "Yangon"], answer: 0, explanation: "The bridge crosses the Mekong to the Vientiane side." }),
    order(`${p}-o1`, ["ผม", "จะไป", "ลาว", "ครับ"], "I'm going to Laos", "ผม (I) + จะไป (will go) + ลาว (Laos) + ครับ. Women say ฉัน … ค่ะ."),
  ]),
  st("nong_khai-2", "🐟", "Riverside Dinner", "อาหารริมโขง", 28, [
    { th: "ปลา", rom: "pla", en: "fish" },
    { th: "ย่าง", rom: "yang", en: "grilled" },
    { th: "ริมแม่น้ำ", rom: "rim mae-nam", en: "riverside" },
    { th: "ข้าวเหนียว", rom: "khao-niao", en: "sticky rice" },
    { th: "ส้มตำ", rom: "som-tam", en: "papaya salad" },
  ], (p) => [
    choose(`${p}-c1`, { question: "At a Mekong restaurant you want one grilled fish. You say…", choices: ["ขอปลาย่างหนึ่งตัวครับ", "ปลาย่างอยู่ที่ไหนครับ", "ไม่เอาปลาครับ", "ปลาย่างไม่อร่อยครับ"], answer: 0, explanation: "ขอ = may I have, ตัว is the counter for whole animals, so a whole fish is หนึ่งตัว." }),
    choose(`${p}-c2`, { question: "Your papaya salad is too hot to handle. Next time you ask for…", choices: ["ไม่เผ็ด", "เผ็ดมาก", "หวานมาก", "เค็มมาก"], answer: 0, explanation: "ไม่ (not) + เผ็ด (spicy)." }),
    order(`${p}-o1`, ["ขอ", "ส้มตำ", "ไม่เผ็ด", "ครับ"], "Papaya salad, not spicy, please", "ขอ (may I have) + ส้มตำ (papaya salad) + ไม่เผ็ด (not spicy) + ครับ."),
  ]),
  st("nong_khai-3", "🗿", "Giant Sculpture Garden", "ศาลาแก้วกู่", 30, [
    { th: "รูปปั้น", rom: "rup-pan", en: "statue" },
    { th: "พญานาค", rom: "pha-ya-nak", en: "naga serpent" },
    { th: "ใหญ่มาก", rom: "yai mak", en: "very big" },
    { th: "ถ่ายรูป", rom: "thai rup", en: "to take a photo" },
    { th: "สวน", rom: "suan", en: "garden / park" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Sala Kaew Ku is famous for…", choices: ["Giant concrete sculptures of Buddhist and Hindu figures", "A floating market on the Mekong", "Ancient cliff paintings", "A wooden castle by the sea"], answer: 0, explanation: "Sala Kaew Ku is a park full of huge, strange concrete statues, including a giant Buddha sheltered by a many-headed naga." }),
    choose(`${p}-c2`, { question: "You want a photo with a statue. How do you ask politely if it's OK?", choices: ["ถ่ายรูปได้ไหมครับ", "ถ่ายรูปเท่าไหร่ครับ", "ถ่ายรูปไม่ได้ครับ", "ถ่ายรูปอยู่ไหนครับ"], answer: 0, explanation: "ได้ไหม = can I? / is it OK? Adding it to any verb turns it into a polite request." }),
    order(`${p}-o1`, ["รูปปั้น", "นี้", "ใหญ่มาก", "ครับ"], "This statue is very big", "In Thai, นี้ (this) comes after the noun: รูปปั้นนี้ = this statue. Adjectives need no 'is'."),
  ]),
  st("nong_khai-4", "🔥", "Naga Fireball Night", "บั้งไฟพญานาค", 32, [
    { th: "บั้งไฟพญานาค", rom: "bang-fai pha-ya-nak", en: "naga fireballs" },
    { th: "ออกพรรษา", rom: "ok phan-sa", en: "end of Buddhist Lent" },
    { th: "กลางคืน", rom: "klang-khuen", en: "night" },
    { th: "ท้องฟ้า", rom: "thong-fa", en: "sky" },
    { th: "ตำนาน", rom: "tam-nan", en: "legend" },
  ], (p) => [
    choose(`${p}-c1`, { question: "When do people gather on the Mekong banks to watch for the naga fireballs?", choices: ["At the end of Buddhist Lent", "On New Year's Eve", "During Songkran in April", "Every Sunday night"], answer: 0, explanation: "The fireballs are said to rise from the Mekong around ออกพรรษา, the end of Buddhist Lent, usually in October." }),
    choose(`${p}-c2`, { question: "A local smiles and says: \"ไปดูบั้งไฟพญานาคกันไหม\". What is she asking?", choices: ["Shall we go watch the naga fireballs?", "Have you eaten yet?", "Where is your hotel?", "Do you like the Mekong?"], answer: 0, explanation: "ไป (go) + ดู (watch) + … + กันไหม (shall we, together?). กันไหม is a friendly way to invite someone." }),
    order(`${p}-o1`, ["ไป", "ดู", "บั้งไฟพญานาค", "กัน"], "Let's go watch the naga fireballs", "ไป (go) + ดู (watch) + บั้งไฟพญานาค + กัน (together / let's)."),
  ]),
];

// ---------------------------------------------------------------- Hua Hin
const HUA_HIN: AdventureStage[] = [
  st("hua_hin-1", "🚂", "Hua Hin Railway Station", "สถานีรถไฟหัวหิน", 25, [
    { th: "สถานีรถไฟ", rom: "sa-tha-ni rot-fai", en: "train station" },
    { th: "ตั๋ว", rom: "tua", en: "ticket" },
    { th: "ชานชาลา", rom: "chan-cha-la", en: "platform" },
    { th: "กี่โมง", rom: "ki mong", en: "what time?" },
    { th: "ถึง", rom: "thueng", en: "to arrive" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Hua Hin railway station is famous for…", choices: ["Its pretty red-and-white wooden royal waiting pavilion", "Being the biggest station in Asia", "Trains that run on the beach", "A glass roof over the sea"], answer: 0, explanation: "The red-and-white wooden pavilion on the platform was a waiting room for the royal family." }),
    choose(`${p}-c2`, { question: "At the counter you want one ticket to Bangkok. You say…", choices: ["ขอตั๋วไปกรุงเทพหนึ่งใบครับ", "ตั๋วไปกรุงเทพอร่อยไหมครับ", "กรุงเทพอยู่ที่ไหนครับ", "ไม่เอาตั๋วครับ"], answer: 0, explanation: "ขอ (may I have) + ตั๋ว (ticket) + ไป (to) + place. ใบ is the counter for tickets and cards." }),
    order(`${p}-o1`, ["รถไฟ", "ออก", "กี่โมง", "ครับ"], "What time does the train leave?", "รถไฟ (train) + ออก (depart) + กี่โมง (what time) + ครับ. Question words go at the end in Thai."),
  ]),
  st("hua_hin-2", "🐴", "Let's Go to the Sea", "ไปทะเลกัน", 28, [
    { th: "ทะเล", rom: "tha-le", en: "sea" },
    { th: "ชายหาด", rom: "chai-hat", en: "beach" },
    { th: "ขี่ม้า", rom: "khi ma", en: "to ride a horse" },
    { th: "ครีมกันแดด", rom: "khrim kan-daet", en: "sunscreen" },
    { th: "คลื่น", rom: "khluen", en: "wave" },
  ], (p) => [
    choose(`${p}-c1`, { question: "A pony owner waves at you on Hua Hin beach. You want to know the price. You ask…", choices: ["ขี่ม้ากี่บาทครับ", "ขี่ม้าที่ไหนครับ", "ม้าชื่ออะไรครับ", "ม้าไม่สวยครับ"], answer: 0, explanation: "กี่บาท = how many baht?" }),
    choose(`${p}-c2`, { question: "What does กัน add to ไปทะเลกัน?", choices: ["\"Let's / together\": Let's go to the sea", "\"Not\": Don't go to the sea", "\"Already\": I went to the sea", "\"Where\": Where is the sea?"], answer: 0, explanation: "กัน at the end of a sentence means doing something together, like 'let's'. ไปกินกัน = let's go eat." }),
    order(`${p}-o1`, ["ไป", "ทะเล", "กัน", "ครับ"], "Let's go to the sea", "ไป (go) + ทะเล (sea) + กัน (together) + ครับ."),
  ]),
  st("hua_hin-3", "🦐", "Seafood Night Market", "ตลาดกลางคืนหัวหิน", 30, [
    { th: "อาหารทะเล", rom: "a-han tha-le", en: "seafood" },
    { th: "กุ้ง", rom: "kung", en: "shrimp" },
    { th: "ปู", rom: "pu", en: "crab" },
    { th: "ปลาหมึก", rom: "pla-muek", en: "squid" },
    { th: "สด", rom: "sot", en: "fresh" },
  ], (p) => [
    choose(`${p}-c1`, { question: "The shrimp on ice look good. You want to check they are fresh. You ask…", choices: ["สดไหมครับ", "เผ็ดไหมครับ", "อยู่ไหนครับ", "ชื่ออะไรครับ"], answer: 0, explanation: "สด (fresh) + ไหม (question particle). At Hua Hin night market, expect the answer สดครับ (yes, fresh)." }),
    choose(`${p}-c2`, { question: "You are allergic to shrimp. How do you tell the cook?", choices: ["ผมแพ้กุ้งครับ", "ผมชอบกุ้งครับ", "ผมอยากกินกุ้งครับ", "กุ้งอร่อยมากครับ"], answer: 0, explanation: "แพ้ (phae) = to be allergic to. Women say ฉันแพ้กุ้งค่ะ." }),
    order(`${p}-o1`, ["ขอ", "กุ้งเผา", "หนึ่ง", "จาน", "ครับ"], "One plate of grilled shrimp, please", "ขอ + dish + หนึ่ง (one) + จาน (plate). เผา means roasted over fire."),
  ]),
  st("hua_hin-4", "👑", "Royal Seaside Town", "เมืองตากอากาศ", 32, [
    { th: "พระราชวัง", rom: "phra-rat-cha-wang", en: "royal palace" },
    { th: "นักท่องเที่ยว", rom: "nak thong-thiao", en: "tourist" },
    { th: "เงียบ", rom: "ngiap", en: "quiet" },
    { th: "สบาย", rom: "sa-bai", en: "relaxed / comfortable" },
    { th: "อากาศดี", rom: "a-kat di", en: "nice weather" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Hua Hin is known as a royal seaside town because…", choices: ["Thai kings built a summer palace there, Klai Kangwon", "It is the capital of Thailand", "It has the oldest temple in Asia", "Kings were crowned on its beach"], answer: 0, explanation: "Klai Kangwon (ไกลกังวล) means 'far from worries'. King Rama VII had it built in the 1920s." }),
    choose(`${p}-c2`, { question: "A friendly vendor asks: \"มาเที่ยวกี่วันครับ\". A good answer is…", choices: ["สามวันครับ", "สามบาทครับ", "สามโมงครับ", "สามคนครับ"], answer: 0, explanation: "กี่วัน = how many days? so answer with วัน (days). บาท = baht, โมง = o'clock, คน = people." }),
    order(`${p}-o1`, ["ผม", "ชอบ", "หัวหิน", "มาก"], "I like Hua Hin a lot", "ผม (I) + ชอบ (like) + หัวหิน + มาก (a lot). หัวหิน literally means 'stone head', after the rocks on the beach."),
  ]),
];

// ---------------------------------------------------------------- Hat Yai (Songkhla)
const HAT_YAI: AdventureStage[] = [
  st("hat_yai-1", "🛺", "Getting Around Hat Yai", "เที่ยวเมืองหาดใหญ่", 25, [
    { th: "สนามบิน", rom: "sa-nam-bin", en: "airport" },
    { th: "โรงแรม", rom: "rong-raem", en: "hotel" },
    { th: "ใกล้", rom: "klai", en: "near" },
    { th: "ตรงไป", rom: "trong pai", en: "go straight" },
    { th: "เลี้ยวซ้าย", rom: "liao sai", en: "turn left" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Hat Yai is the biggest city of which province?", choices: ["Songkhla", "Phuket", "Krabi", "Chiang Mai"], answer: 0, explanation: "Hat Yai is in Songkhla province. It's the busiest city of the deep south, though the provincial capital is Songkhla town." }),
    choose(`${p}-c2`, { question: "You show the driver your hotel's name. What do you say?", choices: ["ไปโรงแรมนี้ครับ", "โรงแรมนี้อร่อยครับ", "ไม่ไปโรงแรมครับ", "โรงแรมกี่โมงครับ"], answer: 0, explanation: "ไป (go) + place + นี้ (this). Point at the address and say ไปที่นี่ครับ works too." }),
    order(`${p}-o1`, ["โรงแรม", "อยู่", "ใกล้", "ไหม"], "Is the hotel near?", "โรงแรม (hotel) + อยู่ (is located) + ใกล้ (near) + ไหม (question). Add ครับ/ค่ะ to be polite."),
  ]),
  st("hat_yai-2", "🍗", "Hat Yai Fried Chicken", "ไก่ทอดหาดใหญ่", 28, [
    { th: "ไก่ทอด", rom: "kai thot", en: "fried chicken" },
    { th: "หอมเจียว", rom: "hom-jiao", en: "crispy fried shallots" },
    { th: "ข้าวเหนียว", rom: "khao-niao", en: "sticky rice" },
    { th: "น่องไก่", rom: "nong kai", en: "chicken drumstick" },
    { th: "กรอบ", rom: "krop", en: "crispy" },
  ], (p) => [
    choose(`${p}-c1`, { question: "What makes ไก่ทอดหาดใหญ่ easy to recognise?", choices: ["A heap of crispy fried shallots on top", "It is served raw", "It is cooked in coconut milk", "It comes frozen with ice cream"], answer: 0, explanation: "Hat Yai fried chicken comes buried under golden หอมเจียว (fried shallots), usually with sticky rice." }),
    choose(`${p}-c2`, { question: "You want one drumstick with sticky rice. You say…", choices: ["ขอน่องไก่หนึ่งชิ้นกับข้าวเหนียวครับ", "น่องไก่อยู่ที่ไหนครับ", "ไม่เอาข้าวเหนียวครับ", "ข้าวเหนียวกี่โมงครับ"], answer: 0, explanation: "ชิ้น = piece, กับ = with. ขอ + item + amount is the simplest way to order anything." }),
    order(`${p}-o1`, ["ไก่ทอด", "กรอบ", "มาก", "ครับ"], "The fried chicken is very crispy", "ไก่ทอด (fried chicken) + กรอบ (crispy) + มาก (very) + ครับ."),
  ]),
  st("hat_yai-3", "🧜", "Samila Beach Mermaid", "นางเงือกหาดสมิหลา", 30, [
    { th: "นางเงือก", rom: "nang-ngueak", en: "mermaid" },
    { th: "หาด", rom: "hat", en: "beach" },
    { th: "สงขลา", rom: "song-khla", en: "Songkhla" },
    { th: "รูปปั้น", rom: "rup-pan", en: "statue" },
    { th: "ทราย", rom: "sai", en: "sand" },
  ], (p) => [
    choose(`${p}-c1`, { question: "The famous Golden Mermaid statue on Samila Beach is…", choices: ["Sitting on a rock combing her hair", "Riding a giant fish", "Holding a fried chicken", "Standing on a boat"], answer: 0, explanation: "The Golden Mermaid of Samila Beach in Songkhla town sits on a rock combing her long hair." }),
    choose(`${p}-c2`, { question: "หาดใหญ่ is made of หาด + ใหญ่. What do the two parts mean?", choices: ["beach + big", "market + new", "city + old", "river + long"], answer: 0, explanation: "หาด = beach, ใหญ่ = big. You already know the second half from ใหญ่มาก (very big)!" }),
    order(`${p}-o1`, ["ไป", "หาดสมิหลา", "ยังไง", "ครับ"], "How do I get to Samila Beach?", "ไป (go) + place + ยังไง (how) + ครับ. ยังไง is the everyday spoken form of อย่างไร."),
  ]),
  st("hat_yai-4", "🗣️", "Southern Words", "ภาษาใต้", 33, [
    { th: "ภาษาใต้", rom: "pha-sa tai", en: "Southern Thai dialect" },
    { th: "คนใต้", rom: "khon tai", en: "Southern people" },
    { th: "หรอย", rom: "roi", en: "delicious (Southern)" },
    { th: "แหลง", rom: "laeng", en: "to speak (Southern)" },
    { th: "จังหู้", rom: "jang-hu", en: "very much (Southern)" },
  ], (p) => [
    choose(`${p}-c1`, { question: "The chicken seller asks: \"หรอยไหม\". In Standard Thai that is…", choices: ["อร่อยไหม (Is it tasty?)", "เผ็ดไหม (Is it spicy?)", "แพงไหม (Is it expensive?)", "ไปไหม (Are you going?)"], answer: 0, explanation: "หรอย is the Southern word for อร่อย. Reply หรอยจังหู้! (Southern: so delicious!)" }),
    choose(`${p}-c2`, { question: "Why do you see signs in Thai, Chinese and Malay around Hat Yai?", choices: ["The south mixes Thai, Chinese and Malay Muslim cultures", "They are only for exams", "Hat Yai was once in China", "Every Thai city uses three alphabets"], answer: 0, explanation: "Hat Yai is a trading city near the Malaysian border. Buddhist temples, Chinese shrines and mosques share the same neighbourhoods." }),
    order(`${p}-o1`, ["ผม", "พูด", "ภาษาใต้", "ไม่เป็น"], "I can't speak Southern Thai", "ไม่เป็น after a verb = don't know how to. In the south a local might say แหลงใต้ instead of พูดภาษาใต้."),
  ]),
];

// ---------------------------------------------------------------- Ubon Ratchathani
const UBON: AdventureStage[] = [
  st("ubon_ratchathani-1", "🕯️", "Candle Festival Parade", "แห่เทียนพรรษา", 26, [
    { th: "เทียน", rom: "thian", en: "candle" },
    { th: "แห่", rom: "hae", en: "parade / procession" },
    { th: "เข้าพรรษา", rom: "khao phan-sa", en: "start of Buddhist Lent" },
    { th: "แกะสลัก", rom: "kae-sa-lak", en: "to carve" },
    { th: "ขี้ผึ้ง", rom: "khi-phueng", en: "wax" },
  ], (p) => [
    choose(`${p}-c1`, { question: "When does Ubon hold its famous candle festival?", choices: ["At the start of Buddhist Lent, around July", "At Chinese New Year", "On Valentine's Day", "In the cool season, in December"], answer: 0, explanation: "The แห่เทียนพรรษา celebrates เข้าพรรษา, when monks begin their three-month rains retreat." }),
    choose(`${p}-c2`, { question: "The giant candles in the parade are…", choices: ["Carved from wax into temples, nagas and gods", "Made of plastic and lights", "Cut from ice", "Painted wooden boats"], answer: 0, explanation: "Teams spend weeks carving ขี้ผึ้ง (wax) into huge detailed sculptures, which ride through town on floats." }),
    order(`${p}-o1`, ["เทียน", "นี้", "สวย", "มาก"], "This candle is very beautiful", "เทียน (candle) + นี้ (this) + สวย (beautiful) + มาก (very). Add ครับ/ค่ะ to be polite."),
  ]),
  st("ubon_ratchathani-2", "🌄", "First Sunrise at Pha Taem", "ผาแต้ม", 28, [
    { th: "พระอาทิตย์ขึ้น", rom: "phra-a-thit khuen", en: "sunrise" },
    { th: "หน้าผา", rom: "na-pha", en: "cliff" },
    { th: "ภาพเขียนสี", rom: "phap khian si", en: "rock paintings" },
    { th: "โบราณ", rom: "bo-ran", en: "ancient" },
    { th: "ตื่นเช้า", rom: "tuen chao", en: "to wake up early" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Why do people wake up very early at Pha Taem?", choices: ["It is known as the first place in Thailand to see the sunrise", "The park closes at 7 a.m.", "The paintings disappear at noon", "Monks ring a bell for tourists"], answer: 0, explanation: "Ubon is at Thailand's eastern edge, so Pha Taem cliff, high above the Mekong, catches the sun first." }),
    choose(`${p}-c2`, { question: "What will you see painted on the cliff at Pha Taem?", choices: ["Ancient pictures of people, fish and hands", "Modern street art", "Royal portraits", "Road signs in Lao"], answer: 0, explanation: "The ภาพเขียนสี are prehistoric red paintings thousands of years old: hand prints, fish, animals and people." }),
    order(`${p}-o1`, ["ไป", "ดู", "พระอาทิตย์ขึ้น", "กัน"], "Let's go watch the sunrise", "ไป (go) + ดู (watch) + พระอาทิตย์ขึ้น (sunrise: 'the sun rises') + กัน (let's)."),
  ]),
  st("ubon_ratchathani-3", "🍲", "Isan Food in Ubon", "อาหารอีสาน", 30, [
    { th: "ลาบ", rom: "lap", en: "spicy minced meat salad" },
    { th: "ไก่ย่าง", rom: "kai yang", en: "grilled chicken" },
    { th: "ปลาร้า", rom: "pla-ra", en: "fermented fish sauce" },
    { th: "แจ่ว", rom: "jaeo", en: "Isan chili dip" },
    { th: "เผ็ดมาก", rom: "phet mak", en: "very spicy" },
  ], (p) => [
    choose(`${p}-c1`, { question: "How do people in Isan usually eat sticky rice with lap?", choices: ["Roll a small ball of rice by hand and dip it", "With chopsticks only", "Mixed into soup with a spoon", "Wrapped in bread"], answer: 0, explanation: "ข้าวเหนียว is kept in a little basket. Pinch off a ball with your fingers and scoop up the lap or แจ่ว." }),
    choose(`${p}-c2`, { question: "You love spice but not too much. You say…", choices: ["เผ็ดน้อยครับ", "เผ็ดมากๆครับ", "ไม่หิวครับ", "อิ่มแล้วครับ"], answer: 0, explanation: "น้อย = a little. เผ็ดน้อย = only a little spicy. อิ่มแล้ว = I'm full already." }),
    order(`${p}-o1`, ["ไม่", "ใส่", "ปลาร้า", "ครับ"], "No pla ra, please", "ไม่ใส่ = don't put in. Use it for anything: ไม่ใส่ผงชูรส = no MSG."),
  ]),
  st("ubon_ratchathani-4", "🛶", "Chatting in Isan", "คุยกับคนอุบล", 33, [
    { th: "แซ่บ", rom: "saep", en: "delicious (Isan)" },
    { th: "เว้า", rom: "wao", en: "to speak (Isan)" },
    { th: "บ่", rom: "bo", en: "not (Isan)" },
    { th: "ข่อย", rom: "khoi", en: "I / me (Isan)" },
    { th: "แม่น้ำมูล", rom: "mae-nam mun", en: "the Mun River" },
  ], (p) => [
    choose(`${p}-c1`, { question: "An auntie hands you som tam and says \"บ่เผ็ด\". What does she mean?", choices: ["Not spicy", "Very spicy", "Very sweet", "Too expensive"], answer: 0, explanation: "บ่ is the Isan (and Lao) word for ไม่ (not). บ่เผ็ด = ไม่เผ็ด." }),
    choose(`${p}-c2`, { question: "You finish a great meal in Ubon and want to praise it like a local. You say…", choices: ["แซ่บหลาย", "เผ็ดน้อย", "บ่ไป", "ข่อยหิว"], answer: 0, explanation: "แซ่บหลาย is Isan for 'very delicious' (หลาย = very / a lot in Isan)." }),
    order(`${p}-o1`, ["อุบล", "สวย", "มาก", "ครับ"], "Ubon is very beautiful", "Locals call the city อุบล for short."),
  ]),
];

// ---------------------------------------------------------------- Pattaya (Chonburi)
const PATTAYA: AdventureStage[] = [
  st("pattaya-1", "🚐", "Songthaew Rides", "ขึ้นรถสองแถว", 26, [
    { th: "รถสองแถว", rom: "rot song-thaeo", en: "songthaew (shared pickup taxi)" },
    { th: "ขึ้นรถ", rom: "khuen rot", en: "to get on" },
    { th: "ลงรถ", rom: "long rot", en: "to get off" },
    { th: "จอด", rom: "jot", en: "to stop / park" },
    { th: "ค่ารถ", rom: "kha rot", en: "fare" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Why is it called รถสองแถว?", choices: ["สองแถว = two rows, for the two benches in the back", "It has two drivers", "It costs two baht", "It only stops twice"], answer: 0, explanation: "สอง (two) + แถว (row). Passengers sit facing each other on two benches in the back of the pickup." }),
    choose(`${p}-c2`, { question: "You press the buzzer and want the songthaew to stop here. You say…", choices: ["จอดตรงนี้ครับ", "ขึ้นรถครับ", "ไปสนามบินครับ", "ค่ารถแพงครับ"], answer: 0, explanation: "จอด (stop) + ตรงนี้ (right here)." }),
    order(`${p}-o1`, ["ขอ", "ลง", "ตรงนี้", "ครับ"], "I'd like to get off here", "ขอ (may I) + ลง (get off) + ตรงนี้ (right here) + ครับ."),
  ]),
  st("pattaya-2", "🏝️", "Boat to Koh Larn", "เกาะล้าน", 28, [
    { th: "เกาะ", rom: "ko", en: "island" },
    { th: "เรือ", rom: "ruea", en: "boat" },
    { th: "ท่าเรือ", rom: "tha-ruea", en: "pier" },
    { th: "เสื้อชูชีพ", rom: "suea chu-chip", en: "life jacket" },
    { th: "น้ำใส", rom: "nam sai", en: "clear water" },
  ], (p) => [
    choose(`${p}-c1`, { question: "At the pier you want to know when the next boat leaves. You ask…", choices: ["เรือออกกี่โมงครับ", "เรืออร่อยไหมครับ", "เรือชื่ออะไรครับ", "เรือไม่ไปครับ"], answer: 0, explanation: "Same pattern as trains: vehicle + ออก (depart) + กี่โมง (what time)." }),
    choose(`${p}-c2`, { question: "Koh Larn is…", choices: ["An island near Pattaya reached by ferry or speedboat", "A mountain in the north", "A shopping mall", "A temple in Bangkok"], answer: 0, explanation: "เกาะล้าน is a short boat ride from Pattaya, with white beaches and clear water." }),
    order(`${p}-o1`, ["ผม", "อยาก", "ไป", "เกาะล้าน"], "I want to go to Koh Larn", "ผม (I) + อยาก (want to) + ไป (go) + place. Women say ฉันอยากไปเกาะล้านค่ะ."),
  ]),
  st("pattaya-3", "🏯", "Sanctuary of Truth", "ปราสาทสัจธรรม", 30, [
    { th: "ปราสาท", rom: "pra-sat", en: "castle / sanctuary" },
    { th: "ไม้", rom: "mai", en: "wood" },
    { th: "แกะสลัก", rom: "kae-sa-lak", en: "to carve" },
    { th: "ช่างไม้", rom: "chang-mai", en: "carpenter" },
    { th: "สวยงาม", rom: "suai-ngam", en: "beautiful" },
  ], (p) => [
    choose(`${p}-c1`, { question: "What is special about the Sanctuary of Truth?", choices: ["It is a huge building made entirely of carved wood, still being built", "It is made of gold bars", "It floats on the sea", "It is the oldest building in Thailand"], answer: 0, explanation: "Every surface is hand-carved wood, and craftsmen have been working on it for decades. You can watch the ช่างไม้ at work." }),
    choose(`${p}-c2`, { question: "You visit a sacred place like the Sanctuary. What is polite to wear?", choices: ["Clothes that cover your shoulders and knees", "Swimwear", "A party costume", "A tank top and very short shorts"], answer: 0, explanation: "At temples and shrines in Thailand, covered shoulders and knees show respect." }),
    order(`${p}-o1`, ["ทำ", "จาก", "ไม้", "ทั้งหมด"], "Made entirely of wood", "ทำจาก = made from, ไม้ = wood, ทั้งหมด = all. Careful: ไม้ (wood) has a high tone, unlike ไม่ (not)."),
  ]),
  st("pattaya-4", "🌇", "Evening by the Beach", "เดินเล่นริมหาด", 32, [
    { th: "เดินเล่น", rom: "doen-len", en: "to go for a stroll" },
    { th: "ถนนคนเดิน", rom: "tha-non khon doen", en: "walking street" },
    { th: "ตอนเย็น", rom: "ton yen", en: "in the evening" },
    { th: "คนเยอะ", rom: "khon yoe", en: "crowded" },
    { th: "ห้องน้ำ", rom: "hong-nam", en: "toilet / restroom" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Your Thai friend asks: \"ไปเดินเล่นกันไหม\". She means…", choices: ["Shall we go for a walk?", "Are you hungry?", "Where are you from?", "Do you want to swim?"], answer: 0, explanation: "เดิน (walk) + เล่น (play) = to stroll for fun. กันไหม turns it into an invitation." }),
    choose(`${p}-c2`, { question: "The beach road is busy and you need a restroom. You ask…", choices: ["ห้องน้ำอยู่ที่ไหนครับ", "ห้องน้ำเท่าไหร่ครับ", "ห้องน้ำอร่อยครับ", "ไม่มีห้องน้ำครับ"], answer: 0, explanation: "ห้อง (room) + น้ำ (water) = bathroom." }),
    order(`${p}-o1`, ["ไป", "เดินเล่น", "ริมหาด", "กัน"], "Let's go for a walk along the beach", "ไป (go) + เดินเล่น (stroll) + ริมหาด (along the beach) + กัน (let's)."),
  ]),
];

// ---------------------------------------------------------------- Nakhon Si Thammarat
const NAKHON: AdventureStage[] = [
  st("nakhon_si_thammarat-1", "🛕", "Wat Phra Mahathat", "วัดพระมหาธาตุ", 27, [
    { th: "วัด", rom: "wat", en: "temple" },
    { th: "เจดีย์", rom: "je-di", en: "stupa" },
    { th: "ไหว้พระ", rom: "wai phra", en: "to pay respect to the Buddha" },
    { th: "ถอดรองเท้า", rom: "thot rong-thao", en: "to take off your shoes" },
    { th: "ทอง", rom: "thong", en: "gold" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Wat Phra Mahathat in Nakhon Si Thammarat is famous for…", choices: ["A tall, ancient white stupa topped with gold", "A giant reclining Buddha in a cave", "A temple made of beer bottles", "A floating pagoda on the sea"], answer: 0, explanation: "Its white เจดีย์ with a golden spire is said to hold relics of the Buddha, and pilgrims come from all over the south." }),
    choose(`${p}-c2`, { question: "A sign at the hall door says ถอดรองเท้า. What should you do?", choices: ["Take off your shoes", "Turn off your phone", "Pay an entrance fee", "Wait in line"], answer: 0, explanation: "ถอด (take off) + รองเท้า (shoes). Always remove your shoes before entering a temple hall." }),
    order(`${p}-o1`, ["ไป", "ไหว้พระ", "ที่", "วัด"], "Go pay respect at the temple", "ไป (go) + ไหว้พระ (pay respect) + ที่ (at) + วัด (temple)."),
  ]),
  st("nakhon_si_thammarat-2", "🎭", "Shadow Puppet Show", "หนังตะลุง", 29, [
    { th: "หนังตะลุง", rom: "nang ta-lung", en: "Southern shadow puppet show" },
    { th: "เงา", rom: "ngao", en: "shadow" },
    { th: "จอ", rom: "jo", en: "screen" },
    { th: "ตลก", rom: "ta-lok", en: "funny" },
    { th: "สนุก", rom: "sa-nuk", en: "fun" },
  ], (p) => [
    choose(`${p}-c1`, { question: "หนังตะลุง puppets are made of…", choices: ["Leather (animal hide), cut and painted", "Glass", "Paper plates", "Clay"], answer: 0, explanation: "หนัง means leather or skin. The puppets are cut from hide, and light shines through them onto a white จอ." }),
    choose(`${p}-c2`, { question: "During a หนังตะลุง show, who speaks for all the puppets?", choices: ["One master puppeteer, often joking in Southern dialect", "A recorded voice from a speaker", "The audience", "Nobody, it is silent"], answer: 0, explanation: "The puppeteer (นายหนัง) voices every character, sings and cracks jokes, often in Southern Thai." }),
    order(`${p}-o1`, ["หนังตะลุง", "สนุก", "มาก", "ครับ"], "The shadow puppet show is great fun", "หนังตะลุง + สนุก (fun) + มาก (very) + ครับ. หนัง also means 'movie' in Thai."),
  ]),
  st("nakhon_si_thammarat-3", "🍛", "Khanom Jeen & Southern Curry", "ขนมจีนแกงใต้", 31, [
    { th: "ขนมจีน", rom: "kha-nom jeen", en: "fresh rice noodles" },
    { th: "น้ำยา", rom: "nam-ya", en: "curry sauce for noodles" },
    { th: "แกงไตปลา", rom: "kaeng tai pla", en: "Southern fish curry" },
    { th: "ผักเหนาะ", rom: "phak no", en: "fresh side vegetables (Southern)" },
    { th: "เผ็ดร้อน", rom: "phet ron", en: "hot and spicy" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Southern Thai curries are best known for being…", choices: ["Very spicy, often yellow with turmeric", "Sweet and mild", "Served cold", "Made without chili"], answer: 0, explanation: "Southern food is known as the spiciest in Thailand, so plates of ผักเหนาะ (fresh veg) come free on the side to cool your mouth." }),
    choose(`${p}-c2`, { question: "You want one plate of khanom jeen with curry sauce. You say…", choices: ["ขอขนมจีนน้ำยาหนึ่งจานครับ", "ขนมจีนอยู่ที่ไหนครับ", "ไม่เอาขนมจีนครับ", "ขนมจีนกี่โมงครับ"], answer: 0, explanation: "The name sounds like 'Chinese snack' (ขนม + จีน), but ขนมจีน is a Thai rice noodle." }),
    order(`${p}-o1`, ["แกง", "นี้", "เผ็ด", "มาก"], "This curry is very spicy", "แกง (curry) + นี้ (this) + เผ็ด (spicy) + มาก (very). Ask for ไม่เผ็ด if it's too hot for you."),
  ]),
  st("nakhon_si_thammarat-4", "🌿", "Misty Khiriwong Village", "หมู่บ้านคีรีวง", 34, [
    { th: "หมู่บ้าน", rom: "mu-ban", en: "village" },
    { th: "ภูเขา", rom: "phu-khao", en: "mountain" },
    { th: "หมอก", rom: "mok", en: "mist / fog" },
    { th: "ลำธาร", rom: "lam-than", en: "stream" },
    { th: "ผลไม้", rom: "phon-la-mai", en: "fruit" },
  ], (p) => [
    choose(`${p}-c1`, { question: "Khiriwong village is known for…", choices: ["Fresh mountain air, fruit orchards and natural-dye cloth", "Skyscrapers and nightclubs", "Desert camel rides", "Snow and ski slopes"], answer: 0, explanation: "Khiriwong sits at the foot of Khao Luang mountain, with clear streams, mixed fruit gardens and tie-dyed fabrics." }),
    choose(`${p}-c2`, { question: "A villager gives you fresh fruit from her garden. The nicest reply is…", choices: ["ขอบคุณมากครับ", "ไม่เป็นไรครับ", "เท่าไหร่ครับ", "ลาก่อนครับ"], answer: 0, explanation: "ขอบคุณมาก = thank you very much. ไม่เป็นไร is the reply to a thank-you, not a thank-you itself." }),
    fill(`${p}-f1`, "หมู่บ้านนี้สวย___ (This village is very beautiful)", "มาก", "มาก (mak) = very. It comes after the adjective: สวยมาก = very beautiful."),
    order(`${p}-o1`, ["ผม", "ชอบ", "หมู่บ้าน", "นี้"], "I like this village", "ผม (I) + ชอบ (like) + หมู่บ้าน (village) + นี้ (this). นี้ always comes after the noun."),
  ]),
];

export const ADVENTURES_NEW_B: ProvinceAdventure[] = [
  { provinceId: "nong_khai", stages: NONG_KHAI },
  { provinceId: "hua_hin", stages: HUA_HIN },
  { provinceId: "hat_yai", stages: HAT_YAI },
  { provinceId: "ubon_ratchathani", stages: UBON },
  { provinceId: "pattaya", stages: PATTAYA },
  { provinceId: "nakhon_si_thammarat", stages: NAKHON },
];
