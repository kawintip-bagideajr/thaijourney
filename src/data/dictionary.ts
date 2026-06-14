export type DictionaryEntry = {
  thai: string;
  romanization: string;
  english: string;
  usage_example?: string;
  category: string;
};

export const DICTIONARY: DictionaryEntry[] = [
  // ── Greetings ──
  { thai: "สวัสดี", romanization: "sa-wat-dee", english: "Hello / Goodbye", usage_example: "สวัสดีครับ — Hello (male speaker)", category: "Greetings" },
  { thai: "ครับ", romanization: "khrap", english: "Polite particle (male)", usage_example: "ขอบคุณครับ — Thank you (male)", category: "Greetings" },
  { thai: "ค่ะ / คะ", romanization: "kha", english: "Polite particle (female)", usage_example: "สวัสดีค่ะ — Hello (female)", category: "Greetings" },
  { thai: "ขอบคุณ", romanization: "khob-khun", english: "Thank you", usage_example: "ขอบคุณมากครับ — Thank you very much", category: "Greetings" },
  { thai: "ไม่เป็นไร", romanization: "mai-pen-rai", english: "You're welcome / Never mind", usage_example: "ไม่เป็นไรครับ — No problem at all", category: "Greetings" },
  { thai: "ขอโทษ", romanization: "kho-thot", english: "Sorry / Excuse me", usage_example: "ขอโทษครับ — I'm sorry", category: "Greetings" },
  { thai: "ใช่", romanization: "chai", english: "Yes (correct)", usage_example: "ใช่ครับ — Yes, that's right", category: "Greetings" },
  { thai: "ไม่ใช่", romanization: "mai-chai", english: "No (not correct)", usage_example: "ไม่ใช่ค่ะ — No, that's not right", category: "Greetings" },
  { thai: "คุณชื่ออะไร", romanization: "khun-chue-a-rai", english: "What is your name?", usage_example: "คุณชื่ออะไรครับ — What is your name?", category: "Greetings" },
  { thai: "ผม/ฉันชื่อ", romanization: "phom/chan-chue", english: "My name is... (male/female)", usage_example: "ผมชื่อซอม — My name is Som", category: "Greetings" },
  { thai: "ยินดีที่ได้รู้จัก", romanization: "yin-dee-thee-dai-roo-jak", english: "Nice to meet you", usage_example: "ยินดีที่ได้รู้จักครับ — Nice to meet you", category: "Greetings" },
  { thai: "เป็นยังไงบ้าง", romanization: "pen-yang-ngai-bang", english: "How are you?", usage_example: "เป็นยังไงบ้างครับ — How are you doing?", category: "Greetings" },
  { thai: "สบายดี", romanization: "sa-bai-dee", english: "I'm fine / I'm well", usage_example: "สบายดีครับ ขอบคุณ — I'm fine, thank you", category: "Greetings" },
  { thai: "แล้วคุณล่ะ", romanization: "laew-khun-la", english: "And you?", usage_example: "สบายดี แล้วคุณล่ะ — I'm fine, and you?", category: "Greetings" },

  // ── Numbers ──
  { thai: "ศูนย์", romanization: "soon", english: "Zero (0)", usage_example: "ศูนย์บาท — Zero baht", category: "Numbers" },
  { thai: "หนึ่ง", romanization: "neung", english: "One (1)", usage_example: "หนึ่งวัน — One day", category: "Numbers" },
  { thai: "สอง", romanization: "song", english: "Two (2)", usage_example: "สองคน — Two people", category: "Numbers" },
  { thai: "สาม", romanization: "sam", english: "Three (3)", usage_example: "สามวัน — Three days", category: "Numbers" },
  { thai: "สี่", romanization: "see", english: "Four (4)", usage_example: "สี่บาท — Four baht", category: "Numbers" },
  { thai: "ห้า", romanization: "ha", english: "Five (5)", usage_example: "ห้าคน — Five people", category: "Numbers" },
  { thai: "หก", romanization: "hok", english: "Six (6)", usage_example: "หกโมง — Six o'clock", category: "Numbers" },
  { thai: "เจ็ด", romanization: "jet", english: "Seven (7)", usage_example: "เจ็ดวัน — Seven days", category: "Numbers" },
  { thai: "แปด", romanization: "paet", english: "Eight (8)", usage_example: "แปดบาท — Eight baht", category: "Numbers" },
  { thai: "เก้า", romanization: "gao", english: "Nine (9)", usage_example: "เก้าโมง — Nine o'clock", category: "Numbers" },
  { thai: "สิบ", romanization: "sip", english: "Ten (10)", usage_example: "สิบบาท — Ten baht", category: "Numbers" },
  { thai: "ยี่สิบ", romanization: "yee-sip", english: "Twenty (20)", usage_example: "ยี่สิบบาท — Twenty baht", category: "Numbers" },
  { thai: "ร้อย", romanization: "roi", english: "Hundred", usage_example: "หนึ่งร้อยบาท — One hundred baht", category: "Numbers" },
  { thai: "พัน", romanization: "pan", english: "Thousand", usage_example: "หนึ่งพันบาท — One thousand baht", category: "Numbers" },
  { thai: "หมื่น", romanization: "meun", english: "Ten thousand", usage_example: "หนึ่งหมื่นบาท — Ten thousand baht", category: "Numbers" },

  // ── Classifiers ──
  { thai: "คน", romanization: "khon", english: "Classifier: people", usage_example: "นักเรียนสองคน — Two students", category: "Classifiers" },
  { thai: "ตัว", romanization: "tua", english: "Classifier: animals / clothing", usage_example: "แมวสองตัว — Two cats", category: "Classifiers" },
  { thai: "อัน", romanization: "an", english: "Classifier: small objects", usage_example: "ปากกาสามอัน — Three pens", category: "Classifiers" },
  { thai: "เล่ม", romanization: "lem", english: "Classifier: books", usage_example: "หนังสือสี่เล่ม — Four books", category: "Classifiers" },
  { thai: "ใบ", romanization: "bai", english: "Classifier: flat objects / leaves", usage_example: "จานสามใบ — Three plates", category: "Classifiers" },
  { thai: "ขวด", romanization: "khuat", english: "Classifier: bottles", usage_example: "น้ำสองขวด — Two bottles of water", category: "Classifiers" },

  // ── Food & Drink ──
  { thai: "ข้าว", romanization: "khao", english: "Rice", usage_example: "ขอข้าวหนึ่งจาน — One plate of rice please", category: "Food" },
  { thai: "ผัดไทย", romanization: "phat-thai", english: "Pad Thai noodles", usage_example: "ขอผัดไทยไม่เผ็ด — Pad Thai, not spicy please", category: "Food" },
  { thai: "ต้มยำกุ้ง", romanization: "tom-yam-kung", english: "Spicy shrimp soup", usage_example: "ต้มยำกุ้งอร่อยมาก — Tom yum goong is very delicious", category: "Food" },
  { thai: "แกงเขียวหวาน", romanization: "kaeng-khiao-wan", english: "Green curry", usage_example: "ขอแกงเขียวหวานหนึ่งจาน — One green curry please", category: "Food" },
  { thai: "ส้มตำ", romanization: "som-tam", english: "Papaya salad", usage_example: "ส้มตำไม่เผ็ด — Papaya salad, not spicy", category: "Food" },
  { thai: "ข้าวมันไก่", romanization: "khao-man-kai", english: "Chicken rice", usage_example: "ขอข้าวมันไก่หนึ่งจาน — One chicken rice please", category: "Food" },
  { thai: "น้ำ", romanization: "nam", english: "Water", usage_example: "ขอน้ำเย็น — Cold water please", category: "Food" },
  { thai: "ชา", romanization: "cha", english: "Tea", usage_example: "ขอชาร้อน — Hot tea please", category: "Food" },
  { thai: "กาแฟ", romanization: "ka-fae", english: "Coffee", usage_example: "กาแฟเย็นหนึ่งแก้ว — One iced coffee", category: "Food" },
  { thai: "เบียร์", romanization: "bia", english: "Beer", usage_example: "เบียร์สองขวด — Two beers", category: "Food" },
  { thai: "เผ็ด", romanization: "phet", english: "Spicy", usage_example: "ไม่เผ็ดนะ — Not spicy, okay?", category: "Food" },
  { thai: "หวาน", romanization: "wan", english: "Sweet", usage_example: "หวานมาก — Very sweet", category: "Food" },
  { thai: "เปรี้ยว", romanization: "priao", english: "Sour", usage_example: "เปรี้ยวนิดหน่อย — A little sour", category: "Food" },
  { thai: "เค็ม", romanization: "khem", english: "Salty", usage_example: "เค็มเกินไป — Too salty", category: "Food" },
  { thai: "อร่อย", romanization: "a-roi", english: "Delicious", usage_example: "อร่อยมากครับ — Very delicious!", category: "Food" },
  { thai: "ขอเมนู", romanization: "kho-me-nu", english: "May I have the menu?", usage_example: "ขอเมนูได้ไหมครับ — May I see the menu?", category: "Food" },
  { thai: "เก็บเงิน", romanization: "kep-ngoen", english: "Bill please", usage_example: "เก็บเงินด้วยครับ — Check please!", category: "Food" },
  { thai: "เท่าไหร่", romanization: "thao-rai", english: "How much?", usage_example: "ราคาเท่าไหร่ — How much does it cost?", category: "Food" },

  // ── Transport ──
  { thai: "ไป", romanization: "pai", english: "To go / Go to", usage_example: "ไปไหน — Where are you going?", category: "Transport" },
  { thai: "มา", romanization: "ma", english: "To come", usage_example: "มาจากไหน — Where do you come from?", category: "Transport" },
  { thai: "รถ", romanization: "rot", english: "Car / Vehicle", usage_example: "รถติด — Traffic jam", category: "Transport" },
  { thai: "รถไฟฟ้า", romanization: "rot-fai-fa", english: "BTS Skytrain", usage_example: "นั่งรถไฟฟ้าไปสยาม — Take the BTS to Siam", category: "Transport" },
  { thai: "รถเมล์", romanization: "rot-me", english: "Bus", usage_example: "รถเมล์สาย 15 — Bus line 15", category: "Transport" },
  { thai: "แท็กซี่", romanization: "taek-si", english: "Taxi", usage_example: "เรียกแท็กซี่ — Call a taxi", category: "Transport" },
  { thai: "มอเตอร์ไซค์", romanization: "mo-toer-sai", english: "Motorcycle", usage_example: "นั่งมอเตอร์ไซค์รับจ้าง — Ride a motorbike taxi", category: "Transport" },
  { thai: "สถานี", romanization: "sa-tha-nee", english: "Station", usage_example: "สถานีรถไฟ — Train station", category: "Transport" },
  { thai: "ซ้าย", romanization: "sai", english: "Left", usage_example: "เลี้ยวซ้าย — Turn left", category: "Transport" },
  { thai: "ขวา", romanization: "khwa", english: "Right", usage_example: "เลี้ยวขวา — Turn right", category: "Transport" },
  { thai: "ตรงไป", romanization: "trong-pai", english: "Straight ahead", usage_example: "ตรงไปเลย — Go straight ahead", category: "Transport" },
  { thai: "ใกล้", romanization: "glai", english: "Near / Close", usage_example: "อยู่ใกล้ๆ — It's nearby", category: "Transport" },
  { thai: "ไกล", romanization: "glai", english: "Far", usage_example: "ไกลมากไหม — Is it very far?", category: "Transport" },

  // ── Shopping ──
  { thai: "ซื้อ", romanization: "sue", english: "To buy", usage_example: "ซื้ออะไรดี — What should I buy?", category: "Shopping" },
  { thai: "ขาย", romanization: "khai", english: "To sell", usage_example: "ขายอะไรบ้าง — What do you sell?", category: "Shopping" },
  { thai: "ราคา", romanization: "ra-kha", english: "Price", usage_example: "ราคาเท่าไหร่ — What's the price?", category: "Shopping" },
  { thai: "แพง", romanization: "phaeng", english: "Expensive", usage_example: "แพงเกินไป — Too expensive", category: "Shopping" },
  { thai: "ถูก", romanization: "thuk", english: "Cheap", usage_example: "ถูกมาก — Very cheap", category: "Shopping" },
  { thai: "ลดราคา", romanization: "lot-ra-kha", english: "Discount / Sale", usage_example: "ลดราคาได้ไหม — Can you give a discount?", category: "Shopping" },
  { thai: "จ่ายเงิน", romanization: "jai-ngoen", english: "To pay", usage_example: "จ่ายด้วยบัตรได้ไหม — Can I pay by card?", category: "Shopping" },
  { thai: "บาท", romanization: "baht", english: "Thai Baht (currency)", usage_example: "ห้าร้อยบาท — Five hundred baht", category: "Shopping" },
  { thai: "ตลาด", romanization: "ta-lat", english: "Market", usage_example: "ไปตลาด — Go to the market", category: "Shopping" },
  { thai: "ห้างสรรพสินค้า", romanization: "hang-sap-pa-sin-kha", english: "Department store / Mall", usage_example: "ไปห้างสรรพสินค้า — Go to the mall", category: "Shopping" },

  // ── Emergency ──
  { thai: "ช่วยด้วย", romanization: "chuai-duai", english: "Help!", usage_example: "ช่วยด้วยครับ — Help me please!", category: "Emergency" },
  { thai: "ตำรวจ", romanization: "tam-ruat", english: "Police", usage_example: "เรียกตำรวจ — Call the police", category: "Emergency" },
  { thai: "หมอ", romanization: "mo", english: "Doctor", usage_example: "ต้องการหมอ — I need a doctor", category: "Emergency" },
  { thai: "โรงพยาบาล", romanization: "rong-pha-ya-ban", english: "Hospital", usage_example: "ไปโรงพยาบาลได้ยังไง — How do I get to the hospital?", category: "Emergency" },
  { thai: "เจ็บปวด", romanization: "jep-puat", english: "Pain / Hurt", usage_example: "เจ็บปวดมาก — It hurts a lot", category: "Emergency" },
  { thai: "แพ้ยา", romanization: "phae-ya", english: "Allergic to medicine", usage_example: "ผมแพ้เพนิซิลิน — I'm allergic to penicillin", category: "Emergency" },
  { thai: "โทรศัพท์", romanization: "tho-ra-sap", english: "Telephone", usage_example: "ขอยืมโทรศัพท์ได้ไหม — Can I borrow your phone?", category: "Emergency" },
  { thai: "หาย", romanization: "hai", english: "Lost / Missing", usage_example: "กระเป๋าหาย — My bag is lost", category: "Emergency" },
];

export const DICTIONARY_CATEGORIES = [
  "All",
  "Greetings",
  "Numbers",
  "Classifiers",
  "Food",
  "Transport",
  "Shopping",
  "Emergency",
] as const;

export type DictionaryCategory = typeof DICTIONARY_CATEGORIES[number];
