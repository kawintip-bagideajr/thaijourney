import type { ActiveExercise } from "@/types/lesson";

// Bangkok: street food, tuk-tuks, city life
export const PROVINCE_BANGKOK: ActiveExercise[] = [
  {
    id: "bkk-mc-1", type: "multiple_choice",
    instruction: "What does กรุงเทพฯ mean?",
    question: "กรุงเทพฯ", thaiText: "กรุงเทพฯ", romanization: "Grung Thep",
    options: { choices: [{ id: "a", text: "City of Elephants" }, { id: "b", text: "City of Angels" }, { id: "c", text: "Golden City" }, { id: "d", text: "River City" }] },
    correctAnswer: "b", explanation: "กรุงเทพมหานคร = City of Angels / the Great City! Bangkok's full ceremonial name is one of the world's longest place names.",
  },
  {
    id: "bkk-mc-2", type: "multiple_choice",
    instruction: "How do you ask for a tuk-tuk?",
    question: "Calling a tuk-tuk driver:",
    options: { choices: [{ id: "a", text: "ขอรถไฟ" }, { id: "b", text: "ขอตุ๊กตุ๊กหน่อย" }, { id: "c", text: "ขอเรือ" }, { id: "d", text: "ขอรถเมล์" }] },
    correctAnswer: "b", explanation: "ตุ๊กตุ๊ก = tuk-tuk (the iconic 3-wheel taxi). Always negotiate the price before getting in!",
  },
  {
    id: "bkk-mc-3", type: "multiple_choice",
    instruction: "BTS ย่านสีลม = ?",
    question: "What kind of transport is BTS?",
    options: { choices: [{ id: "a", text: "Bus" }, { id: "b", text: "Subway" }, { id: "c", text: "Skytrain" }, { id: "d", text: "Ferry" }] },
    correctAnswer: "c", explanation: "BTS = Bangkok Mass Transit System (Skytrain). รถไฟฟ้า = electric train. Clean, fast, air-conditioned!",
  },
  {
    id: "bkk-match-1", type: "match_pairs",
    instruction: "Match Bangkok transport",
    question: "Match each Thai transport word to English",
    options: {
      pairs: [
        { id: "1", thai: "ตุ๊กตุ๊ก", english: "tuk-tuk (3-wheel taxi)" },
        { id: "2", thai: "รถไฟฟ้า (BTS)", english: "skytrain" },
        { id: "3", thai: "เรือแท็กซี่", english: "river taxi / ferry" },
        { id: "4", thai: "วินมอเตอร์ไซค์", english: "motorbike taxi" },
      ],
    },
    correctAnswer: {},
    explanation: "Bangkok has one of the most diverse transport systems in Southeast Asia!",
  },
  {
    id: "bkk-mc-4", type: "multiple_choice",
    instruction: "Chatuchak market in Thai = ?",
    question: "Where is the world's largest weekend market?",
    options: { choices: [{ id: "a", text: "ตลาดนัดจตุจักร" }, { id: "b", text: "ตลาดโต้รุ่ง" }, { id: "c", text: "ตลาดน้ำ" }, { id: "d", text: "ตลาดอินทนิล" }] },
    correctAnswer: "a", explanation: "จตุจักร (Chatuchak) = one of the world's largest markets with 15,000+ stalls! Open weekends only.",
  },
];

// Chiang Mai: temples, crafts, mountain culture
export const PROVINCE_CHIANG_MAI: ActiveExercise[] = [
  {
    id: "cnx-mc-1", type: "multiple_choice",
    instruction: "เชียงใหม่ = ?",
    question: "เชียงใหม่ means?",
    options: { choices: [{ id: "a", text: "Northern City" }, { id: "b", text: "New City" }, { id: "c", text: "City of Mountains" }, { id: "d", text: "Rose City" }] },
    correctAnswer: "b", explanation: "เชียง = city (northern dialect), ใหม่ = new. So Chiang Mai = 'New City'. Founded in 1296 as the Lanna Kingdom capital.",
  },
  {
    id: "cnx-mc-2", type: "multiple_choice",
    instruction: "วัด = ?",
    question: "วัด", thaiText: "วัด", romanization: "wat",
    options: { choices: [{ id: "a", text: "market" }, { id: "b", text: "temple" }, { id: "c", text: "palace" }, { id: "d", text: "museum" }] },
    correctAnswer: "b", explanation: "วัด (wat) = Buddhist temple. Chiang Mai has 300+ temples! วัดพระธาตุดอยสุเทพ is the most famous.",
  },
  {
    id: "cnx-mc-3", type: "multiple_choice",
    instruction: "ยี่เป็ง (Yi Peng) is what famous event?",
    question: "What happens during Yi Peng festival?",
    options: { choices: [{ id: "a", text: "Water-throwing festival" }, { id: "b", text: "Lantern releasing festival" }, { id: "c", text: "Elephant parade" }, { id: "d", text: "Flower festival" }] },
    correctAnswer: "b", explanation: "ยี่เป็ง = Sky Lantern Festival! Thousands of glowing lanterns (โคมลอย) float into the night sky. It's magical!",
  },
  {
    id: "cnx-match-1", type: "match_pairs",
    instruction: "Match Chiang Mai culture",
    question: "Match each word to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "วัด (wat)", english: "temple" },
        { id: "2", thai: "พระ (phra)", english: "monk / sacred" },
        { id: "3", thai: "โคมลอย (khom loi)", english: "sky lantern" },
        { id: "4", thai: "ล้านนา (Lanna)", english: "ancient northern kingdom" },
      ],
    },
    correctAnswer: {},
    explanation: "The Lanna Kingdom had its own script, language, and culture distinct from Central Thai.",
  },
  {
    id: "cnx-mc-4", type: "multiple_choice",
    instruction: "ข้าวซอย = ?",
    question: "ข้าวซอย (Khao Soi) is?",
    options: { choices: [{ id: "a", text: "Sticky rice" }, { id: "b", text: "Coconut curry noodle soup" }, { id: "c", text: "Papaya salad" }, { id: "d", text: "Grilled pork" }] },
    correctAnswer: "b", explanation: "ข้าวซอย = Khao Soi — Chiang Mai's signature dish! Creamy coconut curry broth with egg noodles and crispy fried noodles on top.",
  },
];

// Phuket: beaches, seafood, island vibes
export const PROVINCE_PHUKET: ActiveExercise[] = [
  {
    id: "hkt-mc-1", type: "multiple_choice",
    instruction: "ภูเก็ต (Phuket) is famous for?",
    question: "ภูเก็ต is known as?",
    options: { choices: [{ id: "a", text: "Mountain temples" }, { id: "b", text: "Ancient ruins" }, { id: "c", text: "Beaches and islands" }, { id: "d", text: "Elephant sanctuaries" }] },
    correctAnswer: "c", explanation: "ภูเก็ต (Phuket) = Thailand's largest island and beach paradise. ภู = mountain/hill, เก็ต from an old Malay word.",
  },
  {
    id: "hkt-mc-2", type: "multiple_choice",
    instruction: "หาดทราย = ?",
    question: "หาดทราย", thaiText: "หาดทราย", romanization: "hat sai",
    options: { choices: [{ id: "a", text: "coral reef" }, { id: "b", text: "sandy beach" }, { id: "c", text: "rocky shore" }, { id: "d", text: "ocean current" }] },
    correctAnswer: "b", explanation: "หาดทราย (hat sai) = sandy beach. หาด = beach, ทราย = sand. หาดป่าตอง = Patong Beach.",
  },
  {
    id: "hkt-mc-3", type: "multiple_choice",
    instruction: "How do you say 'sunscreen' in Thai?",
    question: "Essential for Phuket beaches:",
    options: { choices: [{ id: "a", text: "ยากันแดด" }, { id: "b", text: "ยาแก้ปวด" }, { id: "c", text: "แว่นตา" }, { id: "d", text: "ผ้าเช็ดตัว" }] },
    correctAnswer: "a", explanation: "ยากันแดด (ya kan daed) = sunscreen. ยา = medicine/lotion, กัน = protect, แดด = sun.",
  },
  {
    id: "hkt-match-1", type: "match_pairs",
    instruction: "Match beach words",
    question: "Match each Thai beach word to English",
    options: {
      pairs: [
        { id: "1", thai: "ทะเล (tha-le)", english: "sea" },
        { id: "2", thai: "คลื่น (khluen)", english: "wave" },
        { id: "3", thai: "ปะการัง (pa-ga-rang)", english: "coral reef" },
        { id: "4", thai: "เรือหางยาว (rua hang yao)", english: "longtail boat" },
      ],
    },
    correctAnswer: {},
    explanation: "เรือหางยาว = longtail boat — the iconic wooden boat of Thai beaches and rivers.",
  },
  {
    id: "hkt-mc-4", type: "multiple_choice",
    instruction: "อาหารทะเล = ?",
    question: "อาหารทะเล", thaiText: "อาหารทะเล", romanization: "a-han tha-le",
    options: { choices: [{ id: "a", text: "Thai curry" }, { id: "b", text: "seafood" }, { id: "c", text: "fresh water fish" }, { id: "d", text: "vegetarian food" }] },
    correctAnswer: "b", explanation: "อาหารทะเล = seafood. อาหาร = food, ทะเล = sea. Phuket is famous for its fresh grilled seafood!",
  },
];

// Ayutthaya: history, temples, ruins
export const PROVINCE_AYUTTHAYA: ActiveExercise[] = [
  {
    id: "ayu-mc-1", type: "multiple_choice",
    instruction: "อยุธยา = ?",
    question: "Ayutthaya was?",
    options: { choices: [{ id: "a", text: "A fishing village" }, { id: "b", text: "Former capital of Siam" }, { id: "c", text: "A royal summer palace" }, { id: "d", text: "A Buddhist learning center" }] },
    correctAnswer: "b", explanation: "อยุธยา (Ayutthaya) was the capital of the Ayutthaya Kingdom (1350-1767 AD) — one of Asia's greatest trading cities.",
  },
  {
    id: "ayu-mc-2", type: "multiple_choice",
    instruction: "วัดมหาธาตุ is famous for?",
    question: "What is วัดมหาธาตุ famous for?",
    options: { choices: [{ id: "a", text: "Golden spires" }, { id: "b", text: "Buddha head in tree roots" }, { id: "c", text: "Giant reclining Buddha" }, { id: "d", text: "Elephant kraal" }] },
    correctAnswer: "b", explanation: "วัดมหาธาตุ has an iconic Buddha head entwined in fig tree roots — a must-see! Please dress respectfully.",
  },
  {
    id: "ayu-mc-3", type: "multiple_choice",
    instruction: "ประวัติศาสตร์ = ?",
    question: "ประวัติศาสตร์", thaiText: "ประวัติศาสตร์", romanization: "pra-wat-ti-sat",
    options: { choices: [{ id: "a", text: "geography" }, { id: "b", text: "culture" }, { id: "c", text: "history" }, { id: "d", text: "archaeology" }] },
    correctAnswer: "c", explanation: "ประวัติศาสตร์ (pra-wat-ti-sat) = history. อยุธยาเป็นเมืองประวัติศาสตร์ = Ayutthaya is a historical city.",
  },
  {
    id: "ayu-match-1", type: "match_pairs",
    instruction: "Match historical terms",
    question: "Match each Thai historical word to English",
    options: {
      pairs: [
        { id: "1", thai: "พระราชวัง (phra ratcha wang)", english: "royal palace" },
        { id: "2", thai: "ซากปรักหักพัง", english: "ruins / rubble" },
        { id: "3", thai: "โบราณ (bo-ran)", english: "ancient / antique" },
        { id: "4", thai: "มรดกโลก", english: "UNESCO World Heritage" },
      ],
    },
    correctAnswer: {},
    explanation: "Ayutthaya is a UNESCO World Heritage Site — มรดกโลก (world heritage).",
  },
  {
    id: "ayu-mc-4", type: "multiple_choice",
    instruction: "How do you say 'take a photo'?",
    question: "May I take a photo here?",
    options: { choices: [{ id: "a", text: "ถ่ายรูปที่นี่ได้ไหม" }, { id: "b", text: "ดูรูปได้ไหม" }, { id: "c", text: "ซื้อรูปได้ไหม" }, { id: "d", text: "เปิดรูปได้ไหม" }] },
    correctAnswer: "a", explanation: "ถ่ายรูป (thai rup) = take a photo/photo. ถ่ายรูปที่นี่ได้ไหม = May I take a photo here?",
  },
];

// Krabi: caves, climbing, nature
export const PROVINCE_KRABI: ActiveExercise[] = [
  {
    id: "kbi-mc-1", type: "multiple_choice",
    instruction: "กระบี่ is famous for?",
    question: "กระบี่ (Krabi) is best known for:",
    options: { choices: [{ id: "a", text: "Night markets" }, { id: "b", text: "Limestone cliffs and emerald waters" }, { id: "c", text: "Night life and parties" }, { id: "d", text: "Ancient temples" }] },
    correctAnswer: "b", explanation: "กระบี่ has dramatic limestone karst landscapes, turquoise Andaman waters, and hidden caves. Rai Leh Beach is accessible only by boat!",
  },
  {
    id: "kbi-mc-2", type: "multiple_choice",
    instruction: "ปีนหน้าผา = ?",
    question: "ปีนหน้าผา", thaiText: "ปีนหน้าผา", romanization: "peen na pha",
    options: { choices: [{ id: "a", text: "swim in the sea" }, { id: "b", text: "rock climbing" }, { id: "c", text: "kayaking" }, { id: "d", text: "island hopping" }] },
    correctAnswer: "b", explanation: "ปีนหน้าผา = rock climbing. ปีน = climb, หน้า = face/front, ผา = cliff. Krabi is a world-class climbing destination!",
  },
  {
    id: "kbi-mc-3", type: "multiple_choice",
    instruction: "How do you say 'beautiful view'?",
    question: "Wow, what a view!",
    options: { choices: [{ id: "a", text: "วิวสวยมาก" }, { id: "b", text: "ทะเลเผ็ด" }, { id: "c", text: "เกาะใหญ่มาก" }, { id: "d", text: "น้ำร้อนมาก" }] },
    correctAnswer: "a", explanation: "วิวสวยมาก (wiw suay mak) = very beautiful view! วิว = view/scenery, สวย = beautiful.",
  },
  {
    id: "kbi-match-1", type: "match_pairs",
    instruction: "Match outdoor activity words",
    question: "Match each Thai outdoor word to English",
    options: {
      pairs: [
        { id: "1", thai: "ดำน้ำ (dam nam)", english: "scuba diving" },
        { id: "2", thai: "พายเรือ (phai rua)", english: "kayaking / rowing" },
        { id: "3", thai: "เดินป่า (doen pa)", english: "hiking" },
        { id: "4", thai: "ล่องเรือ (long rua)", english: "boat cruising" },
      ],
    },
    correctAnswer: {},
    explanation: "Krabi is an outdoor paradise — pick your adventure! ล่องเรือ = riding/drifting by boat.",
  },
  {
    id: "kbi-mc-4", type: "multiple_choice",
    instruction: "น้ำทะเลใสมาก = ?",
    question: "น้ำทะเลใสมาก",
    options: { choices: [{ id: "a", text: "The sea is very rough" }, { id: "b", text: "The sea is very clear / crystal" }, { id: "c", text: "The sea is very warm" }, { id: "d", text: "The sea is very big" }] },
    correctAnswer: "b", explanation: "ใส (sai) = clear/transparent. น้ำทะเลใสมาก = the sea is incredibly clear!",
  },
];

// Chiang Rai: White Temple, tea, border culture
export const PROVINCE_CHIANG_RAI: ActiveExercise[] = [
  {
    id: "cer-mc-1", type: "multiple_choice",
    instruction: "วัดร่องขุ่น (Rong Khun) is also called?",
    question: "วัดร่องขุ่น is known as?",
    options: { choices: [{ id: "a", text: "Black Temple" }, { id: "b", text: "White Temple" }, { id: "c", text: "Golden Temple" }, { id: "d", text: "Silver Temple" }] },
    correctAnswer: "b", explanation: "วัดร่องขุ่น = the famous White Temple. Designed by artist Chalermchai Kositpipat, it's still being built — a living artwork!",
  },
  {
    id: "cer-mc-2", type: "multiple_choice",
    instruction: "สามเหลี่ยมทองคำ = ?",
    question: "สามเหลี่ยมทองคำ (Sam Liam Thong Kham)",
    options: { choices: [{ id: "a", text: "Three Golden Peaks" }, { id: "b", text: "Golden Triangle" }, { id: "c", text: "Golden Coast" }, { id: "d", text: "Golden Road" }] },
    correctAnswer: "b", explanation: "สามเหลี่ยมทองคำ = Golden Triangle — where Thailand, Laos and Myanmar meet. สาม=three, เหลี่ยม=angle/corner, ทองคำ=gold.",
  },
  {
    id: "cer-mc-3", type: "multiple_choice",
    instruction: "ชา = ?",
    question: "ชา", thaiText: "ชา", romanization: "cha",
    options: { choices: [{ id: "a", text: "coffee" }, { id: "b", text: "juice" }, { id: "c", text: "tea" }, { id: "d", text: "milk" }] },
    correctAnswer: "c", explanation: "ชา (cha) = tea. Chiang Rai produces famous Oolong and green teas! ชาเย็น = iced tea, ชาร้อน = hot tea.",
  },
  {
    id: "cer-match-1", type: "match_pairs",
    instruction: "Match Chiang Rai vocab",
    question: "Match each word to its meaning",
    options: {
      pairs: [
        { id: "1", thai: "ชา (cha)", english: "tea" },
        { id: "2", thai: "กาแฟ (ga-fae)", english: "coffee" },
        { id: "3", thai: "ชนเผ่า (chon phao)", english: "ethnic tribe / hill tribe" },
        { id: "4", thai: "ชายแดน (chai daen)", english: "border / frontier" },
      ],
    },
    correctAnswer: {},
    explanation: "Chiang Rai is home to hill tribe communities (Akha, Karen, Hmong) — each with unique cultures.",
  },
  {
    id: "cer-mc-4", type: "multiple_choice",
    instruction: "How do you say 'try this'?",
    question: "Offering tea to a guest:",
    options: { choices: [{ id: "a", text: "ลองดูนะ" }, { id: "b", text: "ไม่ต้องกินนะ" }, { id: "c", text: "แพงมากนะ" }, { id: "d", text: "ไม่อร่อยนะ" }] },
    correctAnswer: "a", explanation: "ลองดูนะ = try it (please give it a taste). ลอง = try/attempt, ดู = see/look, นะ = softener.",
  },
];
