import { drill, choose, order, fill, lesson } from "../build";
import type { ModuleDef, Word } from "../types";

// ---------- Question Words ----------
const Q_BASICS: Word[] = [
  { th: "อะไร", rom: "a-rai", en: "what" },
  { th: "ที่ไหน", rom: "thi-nai", en: "where" },
  { th: "เมื่อไหร่", rom: "muea-rai", en: "when" },
  { th: "ใคร", rom: "khrai", en: "who" },
  { th: "ทำไม", rom: "tham-mai", en: "why" },
  { th: "ยังไง", rom: "yang-ngai", en: "how (casual)" },
];
const Q_YESNO: Word[] = [
  { th: "ไหม", rom: "mai", en: "yes/no question particle" },
  { th: "หรือเปล่า", rom: "rue-plao", en: "…or not?" },
  { th: "ใช่ไหม", rom: "chai mai", en: "…right? / isn't it?" },
  { th: "ใช่", rom: "chai", en: "yes, that's right" },
  { th: "ไม่ใช่", rom: "mai chai", en: "no, that's not right" },
  { th: "ได้ไหม", rom: "dai mai", en: "can you? / is it OK?" },
];
const Q_ANSWERS: Word[] = [
  { th: "ไม่รู้", rom: "mai ru", en: "I don't know" },
  { th: "ที่นี่", rom: "thi-ni", en: "here" },
  { th: "ที่นั่น", rom: "thi-nan", en: "there" },
  { th: "วันนี้", rom: "wan-ni", en: "today" },
  { th: "พรุ่งนี้", rom: "phrung-ni", en: "tomorrow" },
  { th: "เพื่อน", rom: "phuean", en: "friend" },
];
const Q_CHAT: Word[] = [
  { th: "มาจากไหน", rom: "ma chak nai", en: "where are you from?" },
  { th: "อายุเท่าไหร่", rom: "a-yu thao-rai", en: "how old are you?" },
  { th: "อยู่ที่ไหน", rom: "yu thi-nai", en: "where do you live? / where is it?" },
  { th: "ทำงานอะไร", rom: "tham-ngan a-rai", en: "what's your job?" },
  { th: "ชอบอะไร", rom: "chop a-rai", en: "what do you like?" },
  { th: "กี่โมง", rom: "ki mong", en: "what time?" },
];

// ---------- Everyday Verbs ----------
const V_BASICS: Word[] = [
  { th: "กิน", rom: "kin", en: "eat" },
  { th: "ดื่ม", rom: "duem", en: "drink" },
  { th: "ไป", rom: "pai", en: "go" },
  { th: "มา", rom: "ma", en: "come" },
  { th: "นอน", rom: "non", en: "sleep / lie down" },
  { th: "ตื่น", rom: "tuen", en: "wake up" },
];
const V_ROUTINE: Word[] = [
  { th: "อาบน้ำ", rom: "ap-nam", en: "take a shower" },
  { th: "ทำงาน", rom: "tham-ngan", en: "work" },
  { th: "เรียน", rom: "rian", en: "study" },
  { th: "ดู", rom: "du", en: "watch / look" },
  { th: "ฟัง", rom: "fang", en: "listen" },
  { th: "พูด", rom: "phut", en: "speak" },
];
const V_TENSE: Word[] = [
  { th: "กำลัง", rom: "kam-lang", en: "-ing (happening now)" },
  { th: "แล้ว", rom: "laeo", en: "already" },
  { th: "จะ", rom: "ja", en: "will (future)" },
  { th: "ยัง", rom: "yang", en: "not yet / still" },
  { th: "อ่าน", rom: "an", en: "read" },
  { th: "เขียน", rom: "khian", en: "write" },
];
const V_SPEAK: Word[] = [
  { th: "กินข้าวแล้ว", rom: "kin khao laeo", en: "I've already eaten" },
  { th: "กำลังทำงาน", rom: "kam-lang tham-ngan", en: "working right now" },
  { th: "จะไปนอน", rom: "ja pai non", en: "going to bed" },
  { th: "ตื่นสาย", rom: "tuen sai", en: "wake up late" },
  { th: "ไปเที่ยว", rom: "pai thiao", en: "go out for fun / travel" },
  { th: "กลับบ้าน", rom: "klap ban", en: "go home" },
];

// ---------- My Home ----------
const H_ROOMS: Word[] = [
  { th: "บ้าน", rom: "ban", en: "house / home" },
  { th: "ห้องนอน", rom: "hong-non", en: "bedroom" },
  { th: "ห้องน้ำ", rom: "hong-nam", en: "bathroom / toilet" },
  { th: "ห้องครัว", rom: "hong-khrua", en: "kitchen" },
  { th: "ห้องนั่งเล่น", rom: "hong-nang-len", en: "living room" },
  { th: "ประตู", rom: "pra-tu", en: "door" },
  { th: "หน้าต่าง", rom: "na-tang", en: "window" },
];
const H_FURNITURE: Word[] = [
  { th: "เตียง", rom: "tiang", en: "bed" },
  { th: "โต๊ะ", rom: "to", en: "table / desk" },
  { th: "เก้าอี้", rom: "kao-i", en: "chair" },
  { th: "ตู้เย็น", rom: "tu-yen", en: "fridge" },
  { th: "โซฟา", rom: "so-fa", en: "sofa" },
  { th: "แอร์", rom: "ae", en: "air conditioner" },
  { th: "พัดลม", rom: "phat-lom", en: "electric fan" },
];
const H_OBJECTS: Word[] = [
  { th: "กุญแจ", rom: "kun-jae", en: "key" },
  { th: "ทีวี", rom: "thi-wi", en: "TV" },
  { th: "หมอน", rom: "mon", en: "pillow" },
  { th: "ผ้าห่ม", rom: "pha-hom", en: "blanket" },
  { th: "แก้ว", rom: "kaeo", en: "glass / cup" },
  { th: "จาน", rom: "chan", en: "plate" },
];
const H_CHORES: Word[] = [
  { th: "ทำความสะอาด", rom: "tham khwam sa-at", en: "clean" },
  { th: "กวาดบ้าน", rom: "kwat ban", en: "sweep the house" },
  { th: "ล้างจาน", rom: "lang chan", en: "wash the dishes" },
  { th: "ซักผ้า", rom: "sak pha", en: "do the laundry" },
  { th: "ทำอาหาร", rom: "tham a-han", en: "cook" },
  { th: "ทิ้งขยะ", rom: "thing kha-ya", en: "take out the trash" },
];

// ---------- Café & Drinks ----------
const C_DRINKS: Word[] = [
  { th: "กาแฟ", rom: "ka-fae", en: "coffee" },
  { th: "ชา", rom: "cha", en: "tea" },
  { th: "ชาเย็น", rom: "cha yen", en: "Thai iced tea" },
  { th: "ชาเขียว", rom: "cha khiao", en: "green tea" },
  { th: "โกโก้", rom: "ko-ko", en: "cocoa" },
  { th: "น้ำส้ม", rom: "nam som", en: "orange juice" },
  { th: "นม", rom: "nom", en: "milk" },
];
const C_SWEET: Word[] = [
  { th: "หวานน้อย", rom: "wan noi", en: "less sweet" },
  { th: "ไม่หวาน", rom: "mai wan", en: "not sweet / no sugar" },
  { th: "หวานปกติ", rom: "wan pa-ka-ti", en: "normal sweetness" },
  { th: "น้ำแข็ง", rom: "nam khaeng", en: "ice" },
  { th: "ร้อน", rom: "ron", en: "hot" },
  { th: "เย็น", rom: "yen", en: "iced / cold" },
];
const C_BOBA: Word[] = [
  { th: "ชานมไข่มุก", rom: "cha nom khai-muk", en: "bubble milk tea" },
  { th: "ไข่มุก", rom: "khai-muk", en: "tapioca pearls" },
  { th: "แก้วเล็ก", rom: "kaeo lek", en: "small cup" },
  { th: "แก้วใหญ่", rom: "kaeo yai", en: "large cup" },
  { th: "หลอด", rom: "lot", en: "straw" },
  { th: "เพิ่ม", rom: "phoem", en: "add / extra" },
];
const C_ORDER: Word[] = [
  { th: "รับอะไรดีครับ", rom: "rap a-rai dee khrap", en: "what would you like?" },
  { th: "ทานที่นี่", rom: "than thi-ni", en: "for here" },
  { th: "กลับบ้าน", rom: "klap ban", en: "to go / takeaway" },
  { th: "ทั้งหมดเท่าไหร่", rom: "thang-mot thao-rai", en: "how much altogether?" },
  { th: "เงินสด", rom: "ngoen sot", en: "cash" },
  { th: "สแกนจ่าย", rom: "sa-kaen jai", en: "pay by QR scan" },
  { th: "ใบเสร็จ", rom: "bai-set", en: "receipt" },
];

// ---------- Hobbies & Free Time ----------
const F_LIKE: Word[] = [
  { th: "ชอบ", rom: "chop", en: "like" },
  { th: "ไม่ชอบ", rom: "mai chop", en: "don't like" },
  { th: "ชอบมาก", rom: "chop mak", en: "like a lot" },
  { th: "งานอดิเรก", rom: "ngan a-di-rek", en: "hobby" },
  { th: "ว่าง", rom: "wang", en: "free / not busy" },
  { th: "เวลาว่าง", rom: "we-la wang", en: "free time" },
];
const F_SPORTS: Word[] = [
  { th: "ฟุตบอล", rom: "fut-bon", en: "football (soccer)" },
  { th: "ว่ายน้ำ", rom: "wai-nam", en: "swim" },
  { th: "วิ่ง", rom: "wing", en: "run" },
  { th: "เล่น", rom: "len", en: "play" },
  { th: "ออกกำลังกาย", rom: "ok kam-lang kai", en: "exercise / work out" },
  { th: "มวยไทย", rom: "muai thai", en: "Muay Thai" },
  { th: "แบดมินตัน", rom: "baet-min-tan", en: "badminton" },
];
const F_MUSIC: Word[] = [
  { th: "ฟังเพลง", rom: "fang phleng", en: "listen to music" },
  { th: "ร้องเพลง", rom: "rong phleng", en: "sing" },
  { th: "ดูหนัง", rom: "du nang", en: "watch a movie" },
  { th: "เล่นเกม", rom: "len kem", en: "play games" },
  { th: "อ่านหนังสือ", rom: "an nang-sue", en: "read books" },
  { th: "วาดรูป", rom: "wat rup", en: "draw / paint" },
];
const F_PLANS: Word[] = [
  { th: "ว่างไหม", rom: "wang mai", en: "are you free?" },
  { th: "ไม่ว่าง", rom: "mai wang", en: "busy / not free" },
  { th: "ไปด้วยกัน", rom: "pai duai kan", en: "go together" },
  { th: "สุดสัปดาห์", rom: "sut sap-da", en: "weekend" },
  { th: "สนุก", rom: "sa-nuk", en: "fun" },
  { th: "น่าเบื่อ", rom: "na buea", en: "boring" },
];

export const BEGINNER_MODULES: ModuleDef[] = [
  // ============ 1. Question Words ============
  {
    id: "questions", track: "beginner", title: "Question Words", description: "Ask what, where, when, who, why and how, and answer simply",
    icon: "❓", color: "from-sky-400 to-blue-500", bgColor: "bg-sky-50", requiredXP: 20,
    lessons: [
      lesson("questions-basics", "The Big Six", "vocabulary", 15, [
        ...drill("questions-basics", Q_BASICS, { speak: 1 }),
        choose("questions-basics-c1", { question: "In Thai, where does the question word usually go?", choices: ["At the end of the sentence", "At the very start, like English", "Before the subject only", "It is never used in questions"], answer: 0, explanation: "Thai keeps normal word order and puts the question word where the answer would be: นี่คืออะไร = 'this is what?'" }),
        choose("questions-basics-c2", { question: "You need the toilet. What do you ask?", choices: ["ห้องน้ำอยู่ที่ไหนครับ", "ห้องน้ำคืออะไรครับ", "ห้องน้ำเมื่อไหร่ครับ", "ห้องน้ำใครครับ"], answer: 0, explanation: "อยู่ที่ไหน = is located where? Women say ค่ะ instead of ครับ." }),
        choose("questions-basics-c3", { question: "Which word is the more formal, written form of ยังไง (how)?", choices: ["อย่างไร", "อะไร", "ทำไม", "ที่ไหน"], answer: 0, explanation: "You'll see อย่างไร (yang-rai) in books and on signs. In everyday speech people say ยังไง." }),
        order("questions-basics-o1", ["คุณ", "ชื่อ", "อะไร", "ครับ"], "What is your name?", "คุณ (you) + ชื่อ (name) + อะไร (what) + ครับ. Literally 'you name what?'"),
      ]),
      lesson("questions-yesno", "Yes or No?", "grammar", 20, [
        ...drill("questions-yesno", Q_YESNO, { speak: 1 }),
        choose("questions-yesno-c1", { question: "A vendor asks เผ็ดไหมครับ? about your food. You want to say 'Not spicy.'", choices: ["ไม่เผ็ดครับ", "ไม่ไหมครับ", "เผ็ดไหมครับ", "ใครครับ"], answer: 0, explanation: "Thai has no single word for 'yes' or 'no', so you repeat the verb or adjective: เผ็ด (yes) or ไม่เผ็ด (no)." }),
        choose("questions-yesno-c2", { question: "What does คุณเป็นคนไทยใช่ไหม mean?", choices: ["You're Thai, right?", "Why are you Thai?", "Who is Thai?", "Where are Thai people?"], answer: 0, explanation: "ใช่ไหม at the end checks something you already think is true, like 'right?' Answer ใช่ (yes) or ไม่ใช่ (no)." }),
        order("questions-yesno-o1", ["คุณ", "หิว", "ไหม", "ครับ"], "Are you hungry?", "Add ไหม after a statement to turn it into a yes/no question: คุณหิว (you're hungry) → คุณหิวไหม."),
        fill("questions-yesno-f1", "อร่อย ___ ครับ (Is it tasty?)", "ไหม", "ไหม turns อร่อย (delicious) into a question. It's often said with a high tone, like 'mai?'"),
      ]),
      lesson("questions-answers", "Simple Answers", "listening", 20, [
        ...drill("questions-answers", Q_ANSWERS, { speak: 1 }),
        choose("questions-answers-c1", { question: "Someone asks ห้องน้ำอยู่ที่ไหนครับ. You point across the room and say…", choices: ["อยู่ที่นั่นครับ", "อยู่พรุ่งนี้ครับ", "เพื่อนครับ", "ไม่ใช่ครับ"], answer: 0, explanation: "อยู่ที่นั่น = it's over there. ที่นี่ = here, ที่นั่น = there." }),
        choose("questions-answers-c2", { question: "Your friend asks ไปเมื่อไหร่? (When are you going?) What is a good answer?", choices: ["ไปพรุ่งนี้ครับ", "ไปที่นี่ครับ", "ไปใครครับ", "ไปทำไมครับ"], answer: 0, explanation: "เมื่อไหร่ asks 'when', so answer with a time word: วันนี้ (today) or พรุ่งนี้ (tomorrow)." }),
        order("questions-answers-o1", ["ผม", "ไม่", "รู้", "ครับ"], "I don't know.", "ไม่ goes right before the verb: ไม่รู้ = not know. Women say ฉันไม่รู้ค่ะ."),
      ]),
      lesson("questions-chat", "Getting to Know You", "conversation", 25, [
        ...drill("questions-chat", Q_CHAT, { speak: 1 }),
        choose("questions-chat-c1", { question: "A taxi driver asks มาจากไหนครับ? You're from England. You say…", choices: ["มาจากอังกฤษครับ", "อายุยี่สิบครับ", "ไม่ชอบครับ", "สามโมงครับ"], answer: 0, explanation: "มาจาก = come from. Reuse the question's words in your answer: มาจาก + country." }),
        choose("questions-chat-c2", { question: "A new Thai friend asks your age right away. Why is this common?", choices: ["Age helps decide who is older and which words to use", "It is a way to say goodbye", "They want to sell you something", "It is rude, so it is a joke"], answer: 0, explanation: "Thais care about who is older. Once they know your age, they know whether to call you พี่ (older sibling) or น้อง (younger)." }),
        order("questions-chat-o1", ["คุณ", "มา", "จาก", "ไหน", "ครับ"], "Where are you from?", "คุณ (you) + มา (come) + จาก (from) + ไหน (where) + ครับ."),
      ]),
    ],
  },

  // ============ 2. Everyday Verbs ============
  {
    id: "daily_verbs", track: "beginner", title: "Everyday Verbs", description: "Eat, sleep, go, study: talk about your day with กำลัง, แล้ว and จะ",
    icon: "🏃", color: "from-orange-400 to-amber-500", bgColor: "bg-orange-50", requiredXP: 70,
    lessons: [
      lesson("daily_verbs-basics", "Eat, Drink, Go", "vocabulary", 15, [
        ...drill("daily_verbs-basics", V_BASICS, { speak: 1 }),
        choose("daily_verbs-basics-c1", { question: "กินข้าว literally means 'eat rice'. What does it usually mean?", choices: ["Have a meal", "Only eat plain rice", "Cook rice", "Buy rice"], answer: 0, explanation: "Rice comes with almost every meal, so กินข้าว just means 'to eat / have a meal', whatever the food." }),
        choose("daily_verbs-basics-c2", { question: "How does the verb กิน change for 'I ate', 'she eats', 'they will eat'?", choices: ["It never changes", "Add -ed for the past", "Add -s for she", "It changes tone for the past"], answer: 0, explanation: "Thai verbs never change form. Time words and little helpers like แล้ว and จะ do the work." }),
        order("daily_verbs-basics-o1", ["ผม", "ไป", "ตลาด", "ครับ"], "I go to the market.", "Subject + verb + place. No word for 'to' is needed after ไป. Women say ฉัน … ค่ะ."),
      ]),
      lesson("daily_verbs-routine", "My Daily Routine", "vocabulary", 20, [
        ...drill("daily_verbs-routine", V_ROUTINE, { speak: 1 }),
        choose("daily_verbs-routine-c1", { question: "What does คุณพูดภาษาไทยได้ไหม mean?", choices: ["Can you speak Thai?", "Do you watch Thai TV?", "Are you studying Thai?", "Do you listen to Thai music?"], answer: 0, explanation: "พูด (speak) + ภาษาไทย (Thai language) + ได้ไหม (can you?)." }),
        choose("daily_verbs-routine-c2", { question: "อาบน้ำ is made of อาบ (bathe) + น้ำ. What does น้ำ mean?", choices: ["Water", "Soap", "Morning", "Room"], answer: 0, explanation: "น้ำ (water) shows up everywhere: อาบน้ำ (shower), ห้องน้ำ (bathroom), น้ำส้ม (orange juice)." }),
        order("daily_verbs-routine-o1", ["ฉัน", "ฟัง", "เพลง", "ค่ะ"], "I listen to music. (female speaker)", "ฉัน (I) + ฟัง (listen) + เพลง (song/music) + ค่ะ. A man would say ผมฟังเพลงครับ."),
      ]),
      lesson("daily_verbs-tense", "Now, Done, Later", "grammar", 25, [
        ...drill("daily_verbs-tense", V_TENSE, { speak: 1 }),
        choose("daily_verbs-tense-c1", { question: "What does ผมกำลังกินข้าว mean?", choices: ["I am eating.", "I have eaten.", "I will eat.", "I don't eat."], answer: 0, explanation: "กำลัง before a verb = happening right now, like '-ing'." }),
        choose("daily_verbs-tense-c2", { question: "Pick the sentence for 'I will go to Chiang Mai tomorrow.'", choices: ["พรุ่งนี้ผมจะไปเชียงใหม่", "พรุ่งนี้ผมไปเชียงใหม่แล้ว", "พรุ่งนี้ผมกำลังไปเชียงใหม่", "พรุ่งนี้ผมไม่ไปเชียงใหม่"], answer: 0, explanation: "จะ goes before the verb for the future. แล้ว comes after the verb for 'already'." }),
        choose("daily_verbs-tense-c3", { question: "A Thai friend asks กินข้าวหรือยัง? (Have you eaten yet?) You have. You say…", choices: ["กินแล้วครับ", "จะกินครับ", "กำลังไปครับ", "ไม่รู้ครับ"], answer: 0, explanation: "This is a friendly everyday greeting. Answer กินแล้ว (ate already) or ยัง (not yet)." }),
        order("daily_verbs-tense-o1", ["ผม", "กำลัง", "อ่าน", "หนังสือ"], "I'm reading a book.", "Subject + กำลัง + verb + object. หนังสือ = book."),
      ]),
      lesson("daily_verbs-speak", "Talk About Your Day", "speaking", 20, [
        ...drill("daily_verbs-speak", V_SPEAK, { speak: 2 }),
        choose("daily_verbs-speak-c1", { question: "Your friend texts ทำอะไรอยู่? (What are you doing?) You're at work. You reply…", choices: ["กำลังทำงานครับ", "ทำงานแล้วครับ", "จะไปนอนครับ", "ไปเที่ยวครับ"], answer: 0, explanation: "อยู่ after a verb also means 'right now'. Reply with กำลัง + verb." }),
        choose("daily_verbs-speak-c2", { question: "Someone asks กินข้าวหรือยัง? and you haven't eaten. The shortest natural answer is…", choices: ["ยังครับ", "แล้วครับ", "จะครับ", "ใช่ครับ"], answer: 0, explanation: "ยัง alone means 'not yet'. You can add ยังไม่ได้กิน (haven't eaten yet)." }),
        order("daily_verbs-speak-o1", ["ผม", "จะ", "กลับ", "บ้าน"], "I'm going to go home.", "จะ (will) + กลับ (return) + บ้าน (home). กลับบ้าน = go home."),
      ]),
    ],
  },

  // ============ 3. My Home ============
  {
    id: "home", track: "beginner", title: "My Home", description: "Rooms, furniture, things around the house and chores",
    icon: "🏠", color: "from-teal-400 to-emerald-500", bgColor: "bg-teal-50", requiredXP: 110,
    lessons: [
      lesson("home-rooms", "Rooms of the House", "vocabulary", 15, [
        ...drill("home-rooms", H_ROOMS, { speak: 1 }),
        choose("home-rooms-c1", { question: "ห้อง means 'room'. So ห้องนอน (room + นอน) is…", choices: ["bedroom", "kitchen", "living room", "bathroom"], answer: 0, explanation: "นอน = sleep, so ห้องนอน = sleep room. In the same way, ห้องนั่งเล่น (sit-play room) is the living room." }),
        choose("home-rooms-c2", { question: "You are visiting a Thai friend's house. What should you do at the door?", choices: ["Take off your shoes", "Keep your shoes on", "Knock three times", "Bring your own chair"], answer: 0, explanation: "Take your shoes off before you go into a Thai home (or a temple). Look for the pile of sandals by the door." }),
        order("home-rooms-o1", ["ห้องน้ำ", "อยู่", "ที่ไหน", "ครับ"], "Where is the bathroom?", "Place + อยู่ที่ไหน (is where?) + ครับ. Works for any place."),
      ]),
      lesson("home-furniture", "Furniture", "vocabulary", 20, [
        ...drill("home-furniture", H_FURNITURE, { speak: 1 }),
        choose("home-furniture-c1", { question: "ตู้เย็น is ตู้ (cabinet) + เย็น. What does เย็น mean?", choices: ["cold", "big", "white", "food"], answer: 0, explanation: "A fridge is a 'cold cabinet'. ตู้เสื้อผ้า (clothes cabinet) is a wardrobe." }),
        choose("home-furniture-c2", { question: "It's very hot. How do you ask someone to turn on the air conditioner?", choices: ["เปิดแอร์หน่อยครับ", "ปิดแอร์หน่อยครับ", "แอร์อยู่ที่ไหนครับ", "แอร์อะไรครับ"], answer: 0, explanation: "เปิด = open / turn on, ปิด = close / turn off. หน่อย softens the request." }),
        order("home-furniture-o1", ["เปิด", "แอร์", "หน่อย", "ครับ"], "Please turn on the AC.", "เปิด (turn on) + แอร์ (AC) + หน่อย (a little, softener) + ครับ."),
      ]),
      lesson("home-objects", "Things at Home", "listening", 20, [
        ...drill("home-objects", H_OBJECTS, { speak: 1 }),
        choose("home-objects-c1", { question: "What does กุญแจอยู่บนโต๊ะ mean?", choices: ["The key is on the table.", "The key is under the table.", "The table is in the kitchen.", "Where is the key?"], answer: 0, explanation: "บน = on, ใต้ = under, ใน = in. อยู่ + preposition tells you where something is." }),
        choose("home-objects-c2", { question: "You're leaving the room and want someone to turn off the light. You say…", choices: ["ปิดไฟด้วยครับ", "เปิดไฟด้วยครับ", "ไฟอยู่ที่ไหนครับ", "ซื้อไฟครับ"], answer: 0, explanation: "ไฟ = light (it also means 'fire' and 'electricity'). ปิดไฟ = turn off the light, and ด้วย makes it a polite request." }),
        order("home-objects-o1", ["กุญแจ", "อยู่", "บน", "โต๊ะ"], "The key is on the table.", "Thing + อยู่ (is located) + บน (on) + place."),
      ]),
      lesson("home-chores", "Household Chores", "conversation", 25, [
        ...drill("home-chores", H_CHORES, { speak: 1 }),
        choose("home-chores-c1", { question: "What does ช่วยล้างจานหน่อยได้ไหม mean?", choices: ["Could you help wash the dishes?", "Did you wash the dishes?", "Where are the dishes?", "I don't want to wash the dishes."], answer: 0, explanation: "ช่วย (help) + ล้างจาน (wash dishes) + หน่อยได้ไหม (could you, please?)." }),
        choose("home-chores-c2", { question: "Your host asks you to help cook. You happily agree. You say…", choices: ["ได้ครับ", "ไม่ว่างครับ", "ทำไมครับ", "ไม่รู้ครับ"], answer: 0, explanation: "ได้ = can / sure. Say a quick ได้ครับ (or ได้ค่ะ) to agree to a request." }),
        order("home-chores-o1", ["ผม", "กำลัง", "ซักผ้า", "ครับ"], "I'm doing the laundry.", "กำลัง + verb = doing it now. ซัก (wash fabric) + ผ้า (cloth)."),
      ]),
    ],
  },

  // ============ 4. Café & Drinks ============
  {
    id: "cafe", track: "beginner", title: "Café & Drinks", description: "Order coffee, Thai tea and bubble tea just the way you like it",
    icon: "🧋", color: "from-rose-400 to-pink-500", bgColor: "bg-rose-50", requiredXP: 160,
    lessons: [
      lesson("cafe-drinks", "Café Menu", "vocabulary", 15, [
        ...drill("cafe-drinks", C_DRINKS, { speak: 1 }),
        choose("cafe-drinks-c1", { question: "ชาเย็น is the famous orange drink. What is it?", choices: ["Sweet iced Thai tea with milk", "Hot green tea", "Iced black coffee", "Fresh orange juice"], answer: 0, explanation: "ชาเย็น = 'cold tea': strong Thai tea with sugar and condensed or evaporated milk over ice." }),
        choose("cafe-drinks-c2", { question: "You want one iced coffee. What do you say?", choices: ["ขอกาแฟเย็นหนึ่งแก้วครับ", "กาแฟเย็นอยู่ที่ไหนครับ", "กาแฟเย็นทำไมครับ", "ไม่ชอบกาแฟเย็นครับ"], answer: 0, explanation: "ขอ (may I have) + drink + number + แก้ว (glass, the counting word for drinks)." }),
        order("cafe-drinks-o1", ["ขอ", "ชาเย็น", "หนึ่ง", "แก้ว"], "One Thai iced tea, please.", "ขอ + item + number + classifier. แก้ว is used to count cups and glasses."),
      ]),
      lesson("cafe-sweet", "How Sweet?", "grammar", 20, [
        ...drill("cafe-sweet", C_SWEET, { speak: 1 }),
        choose("cafe-sweet-c1", { question: "Thai drinks are often very sweet. To ask for less sugar, you say…", choices: ["หวานน้อยครับ", "หวานมากครับ", "ร้อนครับ", "เพิ่มน้ำแข็งครับ"], answer: 0, explanation: "หวานน้อย = 'sweet a little'. Say ไม่หวาน if you want no sugar at all." }),
        choose("cafe-sweet-c2", { question: "What does ไม่ใส่น้ำแข็ง mean?", choices: ["No ice", "Extra ice", "Hot, please", "Less sweet"], answer: 0, explanation: "ไม่ใส่ = don't put in. ไม่ใส่ + anything removes it: ไม่ใส่นม = no milk." }),
        order("cafe-sweet-o1", ["ขอ", "หวาน", "น้อย", "ครับ"], "Less sweet, please.", "ขอ + หวานน้อย + ครับ."),
      ]),
      lesson("cafe-boba", "Bubble Tea Time", "culture", 20, [
        ...drill("cafe-boba", C_BOBA, { speak: 1 }),
        choose("cafe-boba-c1", { question: "You want a large bubble milk tea. What do you say?", choices: ["ขอชานมไข่มุกแก้วใหญ่ครับ", "ขอชานมไข่มุกแก้วเล็กครับ", "ชานมไข่มุกอยู่ที่ไหนครับ", "ไม่เอาชานมไข่มุกครับ"], answer: 0, explanation: "ใหญ่ = big, เล็ก = small. The size word comes after แก้ว." }),
        choose("cafe-boba-c2", { question: "ไข่มุก is the Thai word for 'pearl'. How do you ask for extra pearls?", choices: ["เพิ่มไข่มุกครับ", "ไม่ใส่ไข่มุกครับ", "ไข่มุกน้อยครับ", "ไข่มุกอะไรครับ"], answer: 0, explanation: "เพิ่ม = add more. Menus list toppings under เพิ่ม with the extra price." }),
        order("cafe-boba-o1", ["ขอ", "แก้ว", "ใหญ่", "ครับ"], "A large one, please.", "ขอ + แก้วใหญ่ (large cup) + ครับ. For small, say แก้วเล็ก."),
      ]),
      lesson("cafe-order", "Ordering & Paying", "conversation", 25, [
        ...drill("cafe-order", C_ORDER, { speak: 1 }),
        choose("cafe-order-c1", { question: "The barista asks ทานที่นี่หรือกลับบ้านครับ? You want takeaway. You say…", choices: ["กลับบ้านครับ", "ทานที่นี่ครับ", "ใบเสร็จครับ", "หวานน้อยครับ"], answer: 0, explanation: "กลับบ้าน (go home) is how Thais say 'to go'. ทานที่นี่ = eat/drink here." }),
        choose("cafe-order-c2", { question: "At many Thai cafés you can pay by scanning a QR code with a banking app. What is this called?", choices: ["สแกนจ่าย", "เงินสด", "ใบเสร็จ", "ทานที่นี่"], answer: 0, explanation: "สแกนจ่าย = scan to pay. Even street stalls in Thailand usually have a QR code to scan." }),
        order("cafe-order-o1", ["ทั้งหมด", "เท่าไหร่", "ครับ"], "How much is it altogether?", "ทั้งหมด (all of it) + เท่าไหร่ (how much) + ครับ."),
      ]),
    ],
  },

  // ============ 5. Hobbies & Free Time ============
  {
    id: "hobbies", track: "beginner", title: "Hobbies & Free Time", description: "Sports, music, movies and games: say what you like to do",
    icon: "🎮", color: "from-violet-400 to-purple-500", bgColor: "bg-violet-50", requiredXP: 230,
    lessons: [
      lesson("hobbies-like", "I Like…", "grammar", 15, [
        ...drill("hobbies-like", F_LIKE, { speak: 1 }),
        choose("hobbies-like-c1", { question: "What does ตอนว่างชอบทำอะไร mean?", choices: ["What do you like to do in your free time?", "When are you free?", "Why are you busy?", "Who do you like?"], answer: 0, explanation: "ตอนว่าง = when free, ชอบทำอะไร = like to do what?" }),
        choose("hobbies-like-c2", { question: "How do you say 'I really like it'?", choices: ["ชอบมาก", "มากชอบ", "ไม่ชอบ", "ชอบไหม"], answer: 0, explanation: "มาก (very / a lot) goes after the word it describes: ชอบมาก, อร่อยมาก." }),
        order("hobbies-like-o1", ["ผม", "ชอบ", "ดู", "หนัง"], "I like watching movies.", "ชอบ + verb = like doing something. ดูหนัง = watch a movie."),
      ]),
      lesson("hobbies-sports", "Sports", "vocabulary", 20, [
        ...drill("hobbies-sports", F_SPORTS, { speak: 1 }),
        choose("hobbies-sports-c1", { question: "Which verb goes with ฟุตบอล and แบดมินตัน?", choices: ["เล่น", "กิน", "อ่าน", "นอน"], answer: 0, explanation: "เล่น = play, for sports, games and instruments: เล่นฟุตบอล, เล่นเกม, เล่นกีตาร์." }),
        choose("hobbies-sports-c2", { question: "Which sport is known as Thailand's national sport?", choices: ["มวยไทย", "ฟุตบอล", "ว่ายน้ำ", "แบดมินตัน"], answer: 0, explanation: "มวยไทย (Muay Thai) is the 'art of eight limbs', using fists, elbows, knees and shins." }),
        order("hobbies-sports-o1", ["ผม", "ชอบ", "เล่น", "ฟุตบอล"], "I like playing football.", "ชอบ (like) + เล่น (play) + ฟุตบอล."),
      ]),
      lesson("hobbies-music", "Music, Movies & Games", "listening", 20, [
        ...drill("hobbies-music", F_MUSIC, { speak: 1 }),
        choose("hobbies-music-c1", { question: "หนัง and หนังสือ look alike. What do they mean?", choices: ["หนัง = movie, หนังสือ = book", "หนัง = book, หนังสือ = movie", "Both mean book", "Both mean movie"], answer: 0, explanation: "หนัง is movie (and also skin/leather). Add สือ and it becomes หนังสือ, a book." }),
        choose("hobbies-music-c2", { question: "Your Thai friends invite you: ไปร้องคาราโอเกะไหม? What are they asking?", choices: ["Want to go sing karaoke?", "Do you want to watch a movie?", "Can you play games?", "Do you read books?"], answer: 0, explanation: "Thai friends often go out for karaoke. ร้อง = sing, ไป…ไหม = want to go…?" }),
        order("hobbies-music-o1", ["ไป", "ดู", "หนัง", "กัน", "ไหม"], "Shall we go watch a movie?", "ไป (go) + ดูหนัง (watch a movie) + กัน (together) + ไหม (?)."),
      ]),
      lesson("hobbies-plans", "Making Plans", "conversation", 25, [
        ...drill("hobbies-plans", F_PLANS, { speak: 1 }),
        choose("hobbies-plans-c1", { question: "A friend asks เสาร์นี้ว่างไหม? (Free this Saturday?) You're busy. You say…", choices: ["ไม่ว่างครับ ขอโทษนะ", "ว่างมากครับ", "สนุกครับ", "ไปด้วยกันครับ"], answer: 0, explanation: "ไม่ว่าง = not free / busy. Adding ขอโทษนะ (sorry) keeps it friendly." }),
        choose("hobbies-plans-c2", { question: "Thais often say life should be สนุก. What is this idea?", choices: ["Fun and enjoyment in everything you do", "Working without breaks", "Staying home alone", "Saving every baht"], answer: 0, explanation: "Thais put a lot of weight on สนุก (sa-nuk). Even work and chores go better when they're fun." }),
        order("hobbies-plans-o1", ["หนัง", "เรื่อง", "นี้", "สนุก", "มาก"], "This movie is really fun.", "หนังเรื่องนี้ = this movie (เรื่อง is the counting word for movies and stories) + สนุกมาก."),
        fill("hobbies-plans-f1", "สุดสัปดาห์นี้ว่าง ___ ครับ (Are you free this weekend?)", "ไหม", "ว่าง + ไหม = are you free? Answer ว่าง (yes) or ไม่ว่าง (no)."),
      ]),
    ],
  },
];
