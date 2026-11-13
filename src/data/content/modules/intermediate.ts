import { drill, choose, order, fill, lesson } from "../build";
import type { ModuleDef, Word } from "../types";

// ---------- Hotel & Stay ----------
const HOTEL_CHECKIN: Word[] = [
  { th: "โรงแรม", rom: "rong-raem", en: "hotel" },
  { th: "ห้อง", rom: "hong", en: "room" },
  { th: "จองไว้แล้ว", rom: "jong wai laeo", en: "already booked" },
  { th: "เช็คอิน", rom: "chek-in", en: "check in" },
  { th: "พาสปอร์ต", rom: "phat-sa-pot", en: "passport" },
  { th: "กุญแจ", rom: "kun-jae", en: "key" },
];
const HOTEL_BOOKING: Word[] = [
  { th: "ห้องว่าง", rom: "hong wang", en: "vacant room" },
  { th: "เตียงเดี่ยว", rom: "tiang diao", en: "single bed" },
  { th: "เตียงใหญ่", rom: "tiang yai", en: "double bed" },
  { th: "คืน", rom: "khuen", en: "night" },
  { th: "คืนละเท่าไหร่", rom: "khuen la tao-rai", en: "how much per night?" },
  { th: "รวมอาหารเช้า", rom: "ruam a-han chao", en: "breakfast included" },
];
const HOTEL_PROBLEMS: Word[] = [
  { th: "แอร์ไม่เย็น", rom: "ae mai yen", en: "the AC isn't cold" },
  { th: "น้ำไม่ไหล", rom: "nam mai lai", en: "no running water" },
  { th: "ไวไฟ", rom: "wai-fai", en: "wifi" },
  { th: "รหัสผ่าน", rom: "ra-hat phan", en: "password" },
  { th: "ผ้าเช็ดตัว", rom: "pha chet tua", en: "towel" },
  { th: "เสีย", rom: "sia", en: "broken" },
];
const HOTEL_CHECKOUT: Word[] = [
  { th: "อาหารเช้า", rom: "a-han chao", en: "breakfast" },
  { th: "กี่โมง", rom: "kee mong", en: "what time?" },
  { th: "เช็คเอาท์", rom: "chek-ao", en: "check out" },
  { th: "ฝากกระเป๋า", rom: "fak kra-pao", en: "leave luggage" },
  { th: "ใบเสร็จ", rom: "bai set", en: "receipt" },
  { th: "เงินมัดจำ", rom: "ngoen mat-jam", en: "deposit" },
];

// ---------- Pharmacy ----------
const PH_SYMPTOMS: Word[] = [
  { th: "ร้านขายยา", rom: "ran khai ya", en: "pharmacy" },
  { th: "ไม่สบาย", rom: "mai sa-bai", en: "unwell" },
  { th: "ปวดหัว", rom: "puat hua", en: "headache" },
  { th: "เจ็บคอ", rom: "jep kho", en: "sore throat" },
  { th: "เป็นไข้", rom: "pen khai", en: "have a fever" },
  { th: "ไอ", rom: "ai", en: "cough" },
];
const PH_STOMACH: Word[] = [
  { th: "ปวดท้อง", rom: "puat thong", en: "stomachache" },
  { th: "ท้องเสีย", rom: "thong sia", en: "diarrhea" },
  { th: "คลื่นไส้", rom: "khluen sai", en: "nauseous" },
  { th: "อาเจียน", rom: "a-jian", en: "vomit" },
  { th: "เวียนหัว", rom: "wian hua", en: "dizzy" },
  { th: "ผงเกลือแร่", rom: "phong kluea rae", en: "rehydration salts" },
];
const PH_MEDICINE: Word[] = [
  { th: "ยา", rom: "ya", en: "medicine" },
  { th: "กินยา", rom: "kin ya", en: "take medicine" },
  { th: "ก่อนอาหาร", rom: "kon a-han", en: "before meals" },
  { th: "หลังอาหาร", rom: "lang a-han", en: "after meals" },
  { th: "ก่อนนอน", rom: "kon non", en: "before bed" },
  { th: "วันละสามครั้ง", rom: "wan la sam khrang", en: "three times a day" },
  { th: "ครั้งละหนึ่งเม็ด", rom: "khrang la nueng met", en: "one tablet each time" },
];
const PH_ALLERGY: Word[] = [
  { th: "แพ้ยา", rom: "phae ya", en: "allergic to medicine" },
  { th: "แพ้อาหารทะเล", rom: "phae a-han tha-le", en: "allergic to seafood" },
  { th: "ผื่น", rom: "phuen", en: "rash" },
  { th: "คัน", rom: "khan", en: "itchy" },
  { th: "หมอ", rom: "mo", en: "doctor" },
  { th: "โรงพยาบาล", rom: "rong pha-ya-ban", en: "hospital" },
];

// ---------- Market ----------
const MK_PRICES: Word[] = [
  { th: "ตลาด", rom: "ta-lat", en: "market" },
  { th: "เท่าไหร่", rom: "tao-rai", en: "how much?" },
  { th: "บาท", rom: "baht", en: "baht" },
  { th: "แพง", rom: "phaeng", en: "expensive" },
  { th: "ถูก", rom: "thuk", en: "cheap" },
  { th: "แม่ค้า", rom: "mae kha", en: "female vendor" },
];
const MK_HAGGLE: Word[] = [
  { th: "ลดได้ไหม", rom: "lot dai mai", en: "can you lower the price?" },
  { th: "ลดหน่อย", rom: "lot noi", en: "a small discount" },
  { th: "ราคาพิเศษ", rom: "ra-kha phi-set", en: "special price" },
  { th: "ซื้อสองอัน", rom: "sue song an", en: "buy two pieces" },
  { th: "เอา", rom: "ao", en: "I'll take it" },
  { th: "ไม่เอา", rom: "mai ao", en: "I don't want it" },
];
const MK_NUMBERS: Word[] = [
  { th: "ยี่สิบ", rom: "yee-sip", en: "twenty" },
  { th: "ห้าสิบ", rom: "ha-sip", en: "fifty" },
  { th: "ร้อย", rom: "roi", en: "hundred" },
  { th: "พัน", rom: "phan", en: "thousand" },
  { th: "หมื่น", rom: "muen", en: "ten thousand" },
  { th: "สองร้อยห้าสิบ", rom: "song roi ha-sip", en: "two hundred fifty" },
];
const MK_FRUIT: Word[] = [
  { th: "มะม่วง", rom: "ma-muang", en: "mango" },
  { th: "ทุเรียน", rom: "thu-rian", en: "durian" },
  { th: "มังคุด", rom: "mang-khut", en: "mangosteen" },
  { th: "กิโล", rom: "ki-lo", en: "kilo" },
  { th: "ครึ่งกิโล", rom: "khrueng ki-lo", en: "half a kilo" },
  { th: "ลูก", rom: "luk", en: "counter for round fruit" },
  { th: "หวี", rom: "wee", en: "hand of bananas" },
];

// ---------- Phone & Internet ----------
const PT_SIM: Word[] = [
  { th: "มือถือ", rom: "mue-thue", en: "mobile phone" },
  { th: "ซิมการ์ด", rom: "sim-kat", en: "SIM card" },
  { th: "เติมเงิน", rom: "toem ngoen", en: "top up" },
  { th: "แพ็กเกจเน็ต", rom: "phaek-ket net", en: "data package" },
  { th: "โทร", rom: "tho", en: "to call" },
  { th: "เบอร์โทร", rom: "boe tho", en: "phone number" },
];
const PT_WIFI: Word[] = [
  { th: "เน็ตช้า", rom: "net cha", en: "the internet is slow" },
  { th: "เน็ตหลุด", rom: "net lut", en: "the connection dropped" },
  { th: "รหัสไวไฟ", rom: "ra-hat wai-fai", en: "wifi password" },
  { th: "แบตหมด", rom: "baet mot", en: "battery is dead" },
  { th: "ชาร์จ", rom: "chat", en: "to charge" },
  { th: "ปลั๊ก", rom: "plak", en: "power socket" },
];
const PT_CALL: Word[] = [
  { th: "ฮัลโหล", rom: "han-lo", en: "hello (on the phone)" },
  { th: "พูดช้าๆ", rom: "phut cha cha", en: "speak slowly" },
  { th: "ไม่ได้ยิน", rom: "mai dai yin", en: "I can't hear" },
  { th: "โทรกลับ", rom: "tho klap", en: "call back" },
  { th: "สายไม่ว่าง", rom: "sai mai wang", en: "the line is busy" },
  { th: "ส่งข้อความ", rom: "song kho-khwam", en: "send a message" },
];
const PT_APPS: Word[] = [
  { th: "แอป", rom: "aep", en: "app" },
  { th: "เรียกแกร็บ", rom: "riak kraep", en: "call a Grab" },
  { th: "สั่งอาหาร", rom: "sang a-han", en: "order food" },
  { th: "ส่งของ", rom: "song khong", en: "deliver things" },
  { th: "ไรเดอร์", rom: "rai-doe", en: "rider" },
  { th: "ปักหมุด", rom: "pak mut", en: "drop a map pin" },
  { th: "ถึงแล้ว", rom: "thueng laeo", en: "arrived" },
];

// ---------- Sports & Muay Thai ----------
const SP_WORDS: Word[] = [
  { th: "กีฬา", rom: "kee-la", en: "sport" },
  { th: "ฟุตบอล", rom: "fut-bon", en: "football" },
  { th: "ว่ายน้ำ", rom: "wai nam", en: "swim" },
  { th: "วิ่ง", rom: "wing", en: "run" },
  { th: "แบดมินตัน", rom: "baet-min-tan", en: "badminton" },
  { th: "ตะกร้อ", rom: "ta-kro", en: "takraw (kick volleyball)" },
  { th: "เล่น", rom: "len", en: "play" },
];
const SP_GYM: Word[] = [
  { th: "ยิม", rom: "yim", en: "gym" },
  { th: "ออกกำลังกาย", rom: "ok kam-lang kai", en: "exercise" },
  { th: "ยกเวท", rom: "yok wet", en: "lift weights" },
  { th: "เหนื่อย", rom: "nueai", en: "tired" },
  { th: "เหงื่อ", rom: "nguea", en: "sweat" },
  { th: "ครูฝึก", rom: "khru fuek", en: "trainer" },
  { th: "สมาชิก", rom: "sa-ma-chik", en: "member" },
];
const SP_MUAY: Word[] = [
  { th: "มวยไทย", rom: "muai thai", en: "Muay Thai" },
  { th: "ค่ายมวย", rom: "khai muai", en: "boxing camp" },
  { th: "หมัด", rom: "mat", en: "punch" },
  { th: "เตะ", rom: "te", en: "kick" },
  { th: "เข่า", rom: "khao", en: "knee" },
  { th: "ศอก", rom: "sok", en: "elbow" },
];
const SP_CHEER: Word[] = [
  { th: "เชียร์", rom: "chia", en: "cheer" },
  { th: "ชนะ", rom: "cha-na", en: "win" },
  { th: "แพ้", rom: "phae", en: "lose" },
  { th: "เสมอ", rom: "sa-moe", en: "draw (tie)" },
  { th: "ทีม", rom: "thim", en: "team" },
  { th: "แฟนบอล", rom: "faen bon", en: "football fan" },
  { th: "ยิงประตู", rom: "ying pra-tu", en: "score a goal" },
];

export const INTERMEDIATE_MODULES: ModuleDef[] = [
  {
    id: "hotel", track: "intermediate", title: "Hotel & Stay", description: "Check in, sort out room problems and check out",
    icon: "🏨", color: "from-sky-400 to-indigo-500", bgColor: "bg-sky-50", requiredXP: 270,
    lessons: [
      lesson("hotel-checkin", "Checking In", "vocabulary", 20, [
        ...drill("hotel-checkin", HOTEL_CHECKIN, { speak: 1 }),
        choose("hotel-checkin-c1", { question: "The receptionist asks: \"จองไว้หรือยังครับ\" (Have you booked yet?). You have a booking. You answer…", choices: ["จองไว้แล้วครับ", "ยังไม่ได้กินครับ", "ไม่เป็นไรครับ", "ห้องน้ำอยู่ไหนครับ"], answer: 0, explanation: "หรือยัง = \"yet?\". Answer with แล้ว (already): จองไว้แล้ว = I've already booked." }),
        choose("hotel-checkin-c2", { question: "The receptionist says \"ขอดูพาสปอร์ตหน่อยครับ\". What should you do?", choices: ["Show your passport", "Give them your room key", "Pay for breakfast", "Tell them your room is broken"], answer: 0, explanation: "ขอดู = may I see, หน่อย makes it gentle." }),
        order("hotel-checkin-o1", ["ผม", "จองห้อง", "ไว้แล้ว", "ครับ"], "I have already booked a room", "ผม (I) + จองห้อง (book a room) + ไว้แล้ว (already, in advance) + ครับ. Women say ฉัน … ค่ะ."),
      ]),
      lesson("hotel-booking", "Booking a Room", "conversation", 25, [
        ...drill("hotel-booking", HOTEL_BOOKING, { speak: 1 }),
        choose("hotel-booking-c1", { question: "You walk into a guesthouse without a booking. What do you ask first?", choices: ["มีห้องว่างไหมครับ", "เช็คเอาท์กี่โมงครับ", "แอร์ไม่เย็นครับ", "ขอใบเสร็จครับ"], answer: 0, explanation: "มี…ไหม = do you have…? ห้องว่าง = a free (empty) room." }),
        choose("hotel-booking-c2", { question: "The receptionist asks \"พักกี่คืนครับ\" (How many nights?). You stay two nights. You say…", choices: ["สองคืนครับ", "คืนสองครับ", "สองโมงครับ", "สองห้องครับ"], answer: 0, explanation: "Number + คืน: สองคืน = two nights. สองโมง is a time of day and สองห้อง means two rooms." }),
        choose("hotel-booking-c3", { question: "What does \"คืนละ 900 บาท รวมอาหารเช้า\" mean?", choices: ["900 baht per night, breakfast included", "900 baht for breakfast only", "9 nights for 900 baht", "Breakfast is not included"], answer: 0, explanation: "X ละ = per X, so คืนละ = per night. รวม = including." }),
        order("hotel-booking-o1", ["มี", "ห้องว่าง", "ไหม", "ครับ"], "Do you have a free room?", "มี (have) + ห้องว่าง (free room) + ไหม (question) + ครับ. ไหม always goes at the end."),
      ]),
      lesson("hotel-problems", "Room Problems", "speaking", 25, [
        ...drill("hotel-problems", HOTEL_PROBLEMS, { speak: 1 }),
        choose("hotel-problems-c1", { question: "You need to get online. You ask the front desk…", choices: ["รหัสไวไฟคืออะไรครับ", "ไวไฟเสียครับ", "ขอผ้าเช็ดตัวครับ", "น้ำไม่ไหลครับ"], answer: 0, explanation: "รหัส = code, คืออะไร = what is it? Many Thais just say รหัสไวไฟ for the wifi password." }),
        choose("hotel-problems-c2", { question: "The TV in your room doesn't work. You call reception and say…", choices: ["ทีวีเสียครับ", "ทีวีอร่อยครับ", "ทีวีแพงครับ", "ทีวีว่างครับ"], answer: 0, explanation: "เสีย = broken / out of order. It works for anything: แอร์เสีย, ไฟเสีย, ทีวีเสีย." }),
        order("hotel-problems-o1", ["ขอ", "ผ้าเช็ดตัว", "เพิ่ม", "ครับ"], "Could I have more towels?", "ขอ (may I have) + ผ้าเช็ดตัว (towel) + เพิ่ม (more, extra) + ครับ."),
        fill("hotel-problems-f1", "แอร์___เย็นครับ (The AC isn't cold)", "ไม่", "ไม่ goes right before the word it negates: ไม่เย็น = not cold."),
      ]),
      lesson("hotel-checkout", "Breakfast & Check-out", "culture", 30, [
        ...drill("hotel-checkout", HOTEL_CHECKOUT, { speak: 1 }),
        choose("hotel-checkout-c1", { question: "You want to know when breakfast is served. You ask…", choices: ["อาหารเช้ากี่โมงครับ", "อาหารเช้าเท่าไหร่ครับ", "อาหารเช้าอยู่ไหมครับ", "อาหารเช้าเสียครับ"], answer: 0, explanation: "กี่โมง = what time (literally \"how many o'clock\"). เท่าไหร่ asks the price." }),
        choose("hotel-checkout-c2", { question: "You check out at 11 but your flight is at night. You ask…", choices: ["ฝากกระเป๋าได้ไหมครับ", "ขอกุญแจเพิ่มครับ", "มีห้องว่างไหมครับ", "เช็คอินกี่โมงครับ"], answer: 0, explanation: "ฝาก = leave something in someone's care." }),
        choose("hotel-checkout-c3", { question: "At check-out the receptionist says \"คืนเงินมัดจำนะครับ\". What is happening?", choices: ["You get your deposit back", "You must pay a fine", "Breakfast is finished", "Your room is not ready"], answer: 0, explanation: "คืนเงิน = return money. Many Thai hotels take a cash deposit at check-in and return it when you leave." }),
        order("hotel-checkout-o1", ["ฝาก", "กระเป๋า", "ได้ไหม", "ครับ"], "Can I leave my bag here?", "ฝาก (leave in care) + กระเป๋า (bag) + ได้ไหม (can I?) + ครับ."),
      ]),
    ],
  },
  {
    id: "pharmacy", track: "intermediate", title: "Pharmacy & Feeling Sick", description: "Describe symptoms and understand medicine instructions",
    icon: "💊", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", requiredXP: 310,
    lessons: [
      lesson("pharmacy-symptoms", "How Do You Feel?", "vocabulary", 20, [
        ...drill("pharmacy-symptoms", PH_SYMPTOMS, { speak: 1 }),
        choose("pharmacy-symptoms-c1", { question: "The pharmacist asks \"เป็นอะไรครับ\" (What's wrong?). Your head hurts. You say…", choices: ["ปวดหัวครับ", "ปวดท้องครับ", "เจ็บขาครับ", "หิวข้าวครับ"], answer: 0, explanation: "ปวด = ache, หัว = head. Swap the body part: ปวดท้อง = stomachache, ปวดฟัน = toothache." }),
        choose("pharmacy-symptoms-c2", { question: "Which word fits a sharp, sore pain like a sore throat?", choices: ["เจ็บ", "ปวด", "หิว", "ง่วง"], answer: 0, explanation: "เจ็บ = sore or sharp pain (เจ็บคอ), ปวด = a deep, dull ache (ปวดหัว). Thais pick the one that matches the feeling." }),
        order("pharmacy-symptoms-o1", ["ผม", "ไม่", "สบาย", "ครับ"], "I'm not feeling well", "สบาย = well/comfortable, so ไม่สบาย = unwell, sick. Women say ฉันไม่สบายค่ะ."),
      ]),
      lesson("pharmacy-stomach", "Tummy Trouble", "listening", 25, [
        ...drill("pharmacy-stomach", PH_STOMACH, { speak: 1 }),
        choose("pharmacy-stomach-c1", { question: "Too much spicy street food! You keep running to the toilet. You tell the pharmacist…", choices: ["ท้องเสียครับ", "เจ็บคอครับ", "ไอครับ", "ปวดหัวครับ"], answer: 0, explanation: "ท้อง = stomach, เสีย = broken. A \"broken stomach\" means diarrhea." }),
        choose("pharmacy-stomach-c2", { question: "The pharmacist says \"ดื่มน้ำเยอะๆ นะครับ\". What is the advice?", choices: ["Drink lots of water", "Don't drink anything", "Eat more spicy food", "Go to sleep early"], answer: 0, explanation: "ดื่มน้ำ = drink water, เยอะๆ = a lot. Doubling a word with ๆ adds emphasis." }),
        order("pharmacy-stomach-o1", ["ผม", "ปวดท้อง", "มาก", "ครับ"], "My stomach hurts a lot", "มาก (very, a lot) comes after the word it describes: ปวดท้องมาก."),
      ]),
      lesson("pharmacy-medicine", "Taking Medicine", "grammar", 25, [
        ...drill("pharmacy-medicine", PH_MEDICINE, { speak: 1 }),
        choose("pharmacy-medicine-c1", { question: "The label says \"กินหลังอาหาร วันละสามครั้ง\". What do you do?", choices: ["Take it after meals, three times a day", "Take it before meals, three times a day", "Take three tablets once a day", "Take it before bed only"], answer: 0, explanation: "หลังอาหาร = after food, วันละสามครั้ง = three times per day. Thais say กินยา (eat medicine) for taking pills." }),
        choose("pharmacy-medicine-c2", { question: "In \"ครั้งละสองเม็ด\", what does ละ mean?", choices: ["per / each", "before", "more", "not"], answer: 0, explanation: "X ละ Y = Y per X. ครั้งละสองเม็ด = two tablets each time. You also saw it in คืนละ (per night)." }),
        order("pharmacy-medicine-o1", ["วันละ", "สอง", "ครั้ง"], "twice a day", "วันละ (per day) + สอง (two) + ครั้ง (times). The counting word ครั้ง comes after the number."),
      ]),
      lesson("pharmacy-allergy", "Allergies & Getting Help", "conversation", 30, [
        ...drill("pharmacy-allergy", PH_ALLERGY, { speak: 1 }),
        choose("pharmacy-allergy-c1", { question: "The pharmacist asks \"แพ้ยาอะไรไหมครับ\" (Allergic to any medicine?). You have no allergies. You answer…", choices: ["ไม่แพ้อะไรครับ", "แพ้ทุกอย่างครับ", "อร่อยมากครับ", "ไม่เป็นไข้ครับ"], answer: 0, explanation: "ไม่ + แพ้ + อะไร = not allergic to anything." }),
        choose("pharmacy-allergy-c2", { question: "You have a red, itchy rash after dinner. You say…", choices: ["มีผื่น คันมากครับ", "ปวดหัวนิดหน่อยครับ", "เวียนหัวครับ", "ไอมากครับ"], answer: 0, explanation: "มีผื่น = I have a rash, คันมาก = very itchy. Show the pharmacist where it is." }),
        choose("pharmacy-allergy-c3", { question: "It's serious and you need an ambulance in Thailand. Which number do you call?", choices: ["1669", "191", "1155", "1690"], answer: 0, explanation: "1669 is the medical emergency number. 191 is police and 1155 is the Tourist Police." }),
        order("pharmacy-allergy-o1", ["ผม", "แพ้", "อาหารทะเล", "ครับ"], "I'm allergic to seafood", "แพ้ = allergic to, put the thing right after it. Note: on its own แพ้ can also mean \"to lose\" a game."),
      ]),
    ],
  },
  {
    id: "market", track: "intermediate", title: "Market Haggling", description: "Bargain, count baht and buy fruit at Thai markets",
    icon: "🧺", color: "from-amber-400 to-orange-500", bgColor: "bg-amber-50", requiredXP: 360,
    lessons: [
      lesson("market-prices", "How Much?", "vocabulary", 20, [
        ...drill("market-prices", MK_PRICES, { speak: 1 }),
        choose("market-prices-c1", { question: "You point at a nice bag. How do you ask the price?", choices: ["อันนี้เท่าไหร่ครับ", "อันนี้อร่อยไหมครับ", "อันนี้กี่โมงครับ", "อันนี้อยู่ไหนครับ"], answer: 0, explanation: "อันนี้ = this one, เท่าไหร่ = how much. Pointing + อันนี้ works for almost anything." }),
        choose("market-prices-c2", { question: "The seller says 300 baht. You think it's a bit too much. You say…", choices: ["แพงไปหน่อยครับ", "ถูกมากครับ", "เอาเลยครับ", "ขอบคุณครับ"], answer: 0, explanation: "แพง = expensive, ไป = too, หน่อย = a little." }),
        order("market-prices-o1", ["แพง", "ไป", "หน่อย", "ครับ"], "It's a bit too expensive", "Adjective + ไป = too (much). หน่อย softens it, so it doesn't sound rude."),
      ]),
      lesson("market-haggle", "Let's Haggle", "conversation", 25, [
        ...drill("market-haggle", MK_HAGGLE, { speak: 1 }),
        choose("market-haggle-c1", { question: "The vendor says \"ร้อยห้าสิบบาทค่ะ\" (150 baht). You want it cheaper. You answer…", choices: ["ลดได้ไหมครับ", "ไม่เป็นไรครับ", "สวัสดีครับ", "อร่อยครับ"], answer: 0, explanation: "ลด = reduce, ได้ไหม = can you? Most haggling starts with a polite, smiling ลดได้ไหม." }),
        choose("market-haggle-c2", { question: "The vendor replies \"ลดให้เหลือร้อยยี่สิบค่ะ\". What's the new price?", choices: ["120 baht", "150 baht", "20 baht", "200 baht"], answer: 0, explanation: "ลดให้ = I'll lower it for you, เหลือ = leaving / down to. ร้อยยี่สิบ = 120." }),
        choose("market-haggle-c3", { question: "Where is haggling normal in Thailand?", choices: ["Street markets and night markets", "7-Eleven", "Shopping mall food courts", "Supermarkets with price tags"], answer: 0, explanation: "Bargain at markets and souvenir stalls. Fixed-price shops don't haggle, and food stalls rarely do." }),
        order("market-haggle-o1", ["ซื้อ", "สองอัน", "ลดได้ไหม", "ครับ"], "If I buy two, can you give a discount?", "ซื้อสองอัน (buy two) + ลดได้ไหม (can you discount?)."),
      ]),
      lesson("market-numbers", "Big Numbers in Baht", "grammar", 25, [
        ...drill("market-numbers", MK_NUMBERS, { speak: 1 }),
        choose("market-numbers-c1", { question: "The seller says \"สามร้อยยี่สิบบาท\". How much is it?", choices: ["320 baht", "302 baht", "230 baht", "3,020 baht"], answer: 0, explanation: "สาม (3) + ร้อย (100) + ยี่สิบ (20) = 320. Note 20 is ยี่สิบ, never สองสิบ." }),
        choose("market-numbers-c2", { question: "At a market you hear \"พันห้า\". How much is that?", choices: ["1,500 baht", "1,005 baht", "5,000 baht", "150 baht"], answer: 0, explanation: "Casual Thai drops the last unit: พันห้า = หนึ่งพันห้าร้อย = 1,500. Likewise ร้อยห้า = 150." }),
        choose("market-numbers-c3", { question: "How do you say 10,000 baht?", choices: ["หนึ่งหมื่นบาท", "สิบร้อยบาท", "ร้อยพันบาท", "หนึ่งพันบาท"], answer: 0, explanation: "Thai has its own word for ten thousand: หมื่น. หนึ่งพัน is only 1,000." }),
        order("market-numbers-o1", ["สอง", "ร้อย", "ห้า", "สิบ"], "250", "Read big to small: สองร้อย (200) + ห้าสิบ (50) = สองร้อยห้าสิบ."),
      ]),
      lesson("market-fruit", "Fruit & Quantities", "listening", 30, [
        ...drill("market-fruit", MK_FRUIT, { speak: 1 }),
        choose("market-fruit-c1", { question: "The fruit seller says \"มังคุดกิโลละแปดสิบค่ะ\". What does that mean?", choices: ["Mangosteen is 80 baht per kilo", "Mangosteen is 8 baht each", "Eight kilos of mangosteen", "Mangosteen is sold out"], answer: 0, explanation: "กิโลละ = per kilo, แปดสิบ = 80." }),
        choose("market-fruit-c2", { question: "Why might your hotel have a \"no durian\" sign?", choices: ["Durian has a very strong smell", "Durian is illegal in Thailand", "Durian is too expensive", "Durian is only for monks"], answer: 0, explanation: "Thais call durian the \"king of fruits\", but it smells so strong that many hotels and trains ban it." }),
        order("market-fruit-o1", ["ขอ", "มะม่วง", "สอง", "ลูก"], "Two mangoes, please", "Thai order: thing + number + counter. ลูก is the counter for round fruit, so มะม่วงสองลูก."),
      ]),
    ],
  },
  {
    id: "phone_tech", track: "intermediate", title: "Phone & Internet", description: "SIM cards, wifi, phone calls and delivery apps",
    icon: "📱", color: "from-violet-400 to-fuchsia-500", bgColor: "bg-violet-50", requiredXP: 400,
    lessons: [
      lesson("phone_tech-sim", "SIM Card & Top-up", "vocabulary", 20, [
        ...drill("phone_tech-sim", PT_SIM, { speak: 1 }),
        choose("phone_tech-sim-c1", { question: "At the phone shop, you want a tourist SIM. You say…", choices: ["ขอซื้อซิมการ์ดครับ", "ขอเติมน้ำครับ", "ขอโทรศัพท์ฟรีครับ", "ซิมการ์ดเสียครับ"], answer: 0, explanation: "ขอซื้อ = I'd like to buy." }),
        choose("phone_tech-sim-c2", { question: "At 7-Eleven you say \"เติมเงินร้อยบาทครับ\". What are you asking for?", choices: ["A 100-baht phone top-up", "A 100-baht discount", "100 baht in change", "A new phone number"], answer: 0, explanation: "เติม = fill up, เงิน = money. Convenience stores everywhere can top up prepaid SIMs." }),
        order("phone_tech-sim-o1", ["เติมเงิน", "ร้อย", "บาท", "ครับ"], "Top up 100 baht, please", "เติมเงิน (top up) + amount + บาท + ครับ. Women say ค่ะ."),
      ]),
      lesson("phone_tech-wifi", "Wifi & Battery", "grammar", 25, [
        ...drill("phone_tech-wifi", PT_WIFI, { speak: 1 }),
        choose("phone_tech-wifi-c1", { question: "You sit down in a café and want to get online. You ask…", choices: ["ขอรหัสไวไฟหน่อยครับ", "ขอปลั๊กกินครับ", "เน็ตอร่อยครับ", "ไวไฟกี่โมงครับ"], answer: 0, explanation: "ขอ…หน่อย = could I have… please." }),
        choose("phone_tech-wifi-c2", { question: "Your friend says \"แบตใกล้หมดแล้ว\". What's the problem?", choices: ["The battery is almost dead", "The battery is fully charged", "The wifi is fast", "The phone is new"], answer: 0, explanation: "แบต = battery (from English), หมด = run out, ใกล้ = nearly. ใกล้…แล้ว = almost…" }),
        choose("phone_tech-wifi-c3", { question: "You want to charge your phone in a restaurant. You ask…", choices: ["ชาร์จแบตได้ไหมครับ", "แบตหมดไหมครับ", "ชาร์จเงินครับ", "ปลั๊กเท่าไหร่ครับ"], answer: 0, explanation: "Verb + ได้ไหม = can I…? ชาร์จแบตได้ไหม = Can I charge my battery?" }),
        order("phone_tech-wifi-o1", ["เน็ต", "ช้า", "มาก", "ครับ"], "The internet is very slow", "Thais shorten อินเทอร์เน็ต to เน็ต. The describing word ช้า (slow) comes after the noun, then มาก (very)."),
      ]),
      lesson("phone_tech-calling", "Making a Call", "speaking", 25, [
        ...drill("phone_tech-calling", PT_CALL, { speak: 1 }),
        choose("phone_tech-calling-c1", { question: "A Thai friend calls but the street is noisy. You say…", choices: ["ไม่ได้ยินครับ พูดดังๆ หน่อย", "สายไม่ว่างครับ", "ส่งข้อความครับ", "ฮัลโหล ขอบคุณครับ"], answer: 0, explanation: "ไม่ได้ยิน = can't hear, พูดดังๆ = speak loudly. หน่อย makes the request polite." }),
        choose("phone_tech-calling-c2", { question: "You're busy and say \"เดี๋ยวโทรกลับนะครับ\". What did you say?", choices: ["I'll call you back soon", "Please don't call me", "The line is busy", "I can't hear you"], answer: 0, explanation: "เดี๋ยว = in a moment, โทรกลับ = call back. นะ makes it friendly." }),
        order("phone_tech-calling-o1", ["ช่วย", "พูด", "ช้าๆ", "หน่อย", "ครับ"], "Please speak slowly", "ช่วย…หน่อย wraps a polite request: ช่วยพูดช้าๆ หน่อยครับ."),
      ]),
      lesson("phone_tech-apps", "Apps, Grab & Delivery", "conversation", 30, [
        ...drill("phone_tech-apps", PT_APPS, { speak: 1 }),
        choose("phone_tech-apps-c1", { question: "The Grab rider calls: \"ผมถึงแล้วครับ อยู่หน้าคอนโด\". You answer…", choices: ["รอแป๊บนึงครับ กำลังลงไป", "ไม่ได้สั่งครับ", "เติมเงินครับ", "ปวดหัวครับ"], answer: 0, explanation: "The rider has arrived in front of your condo. รอแป๊บนึง = wait a moment, กำลังลงไป = I'm coming down." }),
        choose("phone_tech-apps-c2", { question: "Which messaging app do most people in Thailand use with friends and shops?", choices: ["LINE", "Telegram", "Snapchat", "Signal"], answer: 0, explanation: "Almost everyone in Thailand uses LINE. To swap contacts, people ask \"มีไลน์ไหม\" (Do you have LINE?)." }),
        order("phone_tech-apps-o1", ["ผม", "เรียกแกร็บ", "แล้ว", "ครับ"], "I've already called a Grab", "แล้ว after the verb means the action is done: เรียกแกร็บแล้ว = already called a Grab."),
      ]),
    ],
  },
  {
    id: "sports_fitness", track: "intermediate", title: "Sports & Muay Thai", description: "Talk sports, hit the gym and learn Muay Thai culture",
    icon: "🥊", color: "from-rose-400 to-red-500", bgColor: "bg-rose-50", requiredXP: 440,
    lessons: [
      lesson("sports_fitness-words", "Sports Words", "vocabulary", 20, [
        ...drill("sports_fitness-words", SP_WORDS, { speak: 1 }),
        choose("sports_fitness-words-c1", { question: "A new friend asks \"ชอบเล่นกีฬาอะไรครับ\". You love football. You answer…", choices: ["ชอบเล่นฟุตบอลครับ", "ชอบกินฟุตบอลครับ", "ไม่ชอบกีฬาอะไรครับ", "เล่นวิ่งครับ"], answer: 0, explanation: "ชอบเล่น + sport = I like to play… Use เล่น for games with a ball: ฟุตบอล, แบดมินตัน, ตะกร้อ." }),
        choose("sports_fitness-words-c2", { question: "Which sentence is correct Thai for \"I like swimming\"?", choices: ["ผมชอบว่ายน้ำครับ", "ผมชอบเล่นว่ายน้ำครับ", "ผมว่ายน้ำชอบครับ", "ชอบผมว่ายน้ำครับ"], answer: 0, explanation: "ว่ายน้ำ and วิ่ง are verbs already, so no เล่น. Word order is subject + ชอบ + activity." }),
        order("sports_fitness-words-o1", ["ผม", "ชอบ", "เล่น", "ตะกร้อ"], "I like playing takraw", "ตะกร้อ is a Southeast Asian sport: players kick a rattan ball over a net, like volleyball with feet."),
      ]),
      lesson("sports_fitness-gym", "At the Gym", "speaking", 25, [
        ...drill("sports_fitness-gym", SP_GYM, { speak: 1 }),
        choose("sports_fitness-gym-c1", { question: "The gym staff asks \"เป็นสมาชิกไหมครับ\" (Are you a member?). You just want one visit. You say…", choices: ["ไม่ใช่ครับ ขอซื้อแบบรายวันครับ", "ใช่ครับ ผมเหนื่อยครับ", "ยกเวทครับ", "เหงื่อเยอะครับ"], answer: 0, explanation: "ไม่ใช่ = no, I'm not. แบบรายวัน = a daily type (day pass)." }),
        choose("sports_fitness-gym-c2", { question: "Your trainer shouts \"สู้ๆ\" during your last set. What does it mean?", choices: ["Keep going, you can do it!", "Stop now!", "That's wrong!", "Time to eat!"], answer: 0, explanation: "สู้ = fight. Thais say สู้ๆ to cheer someone on before an exam, at work or in the gym." }),
        order("sports_fitness-gym-o1", ["ผม", "ออกกำลังกาย", "ทุกวัน", "ครับ"], "I exercise every day", "ทุกวัน (every day) usually comes at the end of the sentence, before ครับ."),
      ]),
      lesson("sports_fitness-muaythai", "Muay Thai Basics", "culture", 30, [
        ...drill("sports_fitness-muaythai", SP_MUAY, { speak: 1 }),
        choose("sports_fitness-muaythai-c1", { question: "Muay Thai is called \"the art of eight limbs\". Which are the eight?", choices: ["Two fists, two elbows, two knees, two feet", "Two hands, two feet, head, two shoulders, back", "Eight different kicks", "Eight rounds in a fight"], answer: 0, explanation: "หมัด, ศอก, เข่า and เตะ: fists, elbows, knees and kicks, two of each." }),
        choose("sports_fitness-muaythai-c2", { question: "Before a fight, boxers perform a slow dance around the ring. What is it called?", choices: ["ไหว้ครูรำมวย (wai khru ram muai)", "สงกรานต์ (songkran)", "ลอยกระทง (loi krathong)", "ตะกร้อ (ta-kro)"], answer: 0, explanation: "ไหว้ครู = pay respect to the teacher. The boxer honours their teachers and camp before fighting." }),
        order("sports_fitness-muaythai-o1", ["ผม", "ฝึก", "มวยไทย", "ครับ"], "I train Muay Thai", "ฝึก = to train or practise. Many visitors train at a ค่ายมวย (boxing camp)."),
      ]),
      lesson("sports_fitness-cheer", "Cheering & Watching", "listening", 25, [
        ...drill("sports_fitness-cheer", SP_CHEER, { speak: 1 }),
        choose("sports_fitness-cheer-c1", { question: "At a bar showing football, someone asks \"เชียร์ทีมไหนครับ\". What do they want to know?", choices: ["Which team you support", "Where the toilet is", "What you want to drink", "Who won yesterday"], answer: 0, explanation: "เชียร์ = cheer for / support, ทีมไหน = which team." }),
        choose("sports_fitness-cheer-c2", { question: "The commentator says \"เสมอกันหนึ่งต่อหนึ่ง\". What's the score?", choices: ["A 1–1 draw", "One team won 1–0", "Two goals to none", "The match was cancelled"], answer: 0, explanation: "เสมอกัน = tied with each other, หนึ่งต่อหนึ่ง = one to one. ต่อ links the two scores." }),
        order("sports_fitness-cheer-o1", ["ทีม", "เรา", "ชนะ", "แล้ว"], "Our team won!", "ทีมเรา = our team, ชนะ = win, แล้ว = done/already. The opposite is แพ้ (lose)."),
      ]),
    ],
  },
];
