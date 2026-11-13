import type { ActiveExercise } from "@/types/lesson";
import { thToEn, enToTh, match, say, choose, order } from "./build";
import type { Word } from "./types";

/** [thai, romanization, english, tip] */
type T = [string, string, string, string];

const words = (list: T[]): Word[] => list.map(([th, rom, en]) => ({ th, rom, en }));

/**
 * Standard boost pack for one lesson: Thai→English (word 0), a match round (words 1–4),
 * a speaking task (word 5), then the hand-written extras.
 * `full` (for very short lessons) instead asks Thai→English (word 0), English→Thai (word 1),
 * optionally English→Thai on word 2 (`more`), a match round (words 2–5) and a speaking task.
 */
function pack(lid: string, list: T[], extra: (p: string) => ActiveExercise[], opts: { sayIdx?: number; more?: boolean; full?: boolean } = {}): ActiveExercise[] {
  const p = `bx-${lid}-`;
  const W = words(list);
  const tip = (i: number) => `${W[i].th} (${W[i].rom}) = ${W[i].en}. ${list[i][3]}`;
  const out: ActiveExercise[] = [thToEn(`${p}1`, W[0], W, tip(0))];
  let sayIdx = opts.sayIdx ?? 5;
  if (opts.full) {
    sayIdx = opts.sayIdx ?? 3;
    out.push(enToTh(`${p}2`, W[1], W, tip(1)));
    if (opts.more) out.push(enToTh(`${p}5`, W[2], W, tip(2)));
    out.push(match(`${p}3`, W.slice(2, 6)));
  } else {
    out.push(match(`${p}3`, W.slice(1, 5)));
  }
  const s = say(`${p}4`, W[sayIdx]);
  s.explanation = tip(sayIdx);
  out.push(s);
  out.push(...extra(p));
  return out;
}

/** Extra exercises appended to existing lessons, keyed by "<moduleId>/<lessonId>". */
export const BOOST: Record<string, ActiveExercise[]> = {
  // ───────────── Greetings ─────────────
  "greetings/greet-basics": pack("greet-basics", [
    ["สบายดีไหม", "sa-bai dee mai", "are you well?", "ไหม at the end turns a statement into a yes/no question."],
    ["สบายดี", "sa-bai dee", "I'm fine", "สบาย = comfortable, ดี = good. The classic answer to สบายดีไหม."],
    ["ยินดีที่ได้รู้จัก", "yin-dee tee dai ru-jak", "nice to meet you", "Literally 'glad to have got to know (you)'."],
    ["แล้วพบกันใหม่", "laew phop gan mai", "see you again", "A friendly goodbye: พบกัน = meet each other, ใหม่ = again."],
    ["โชคดี", "chok dee", "good luck", "โชค = luck, ดี = good. Thais also say it as a cheerful 'take care, bye!'."],
    ["ลาก่อน", "la gon", "goodbye (for a long time)", "ลาก่อน sounds quite final; for everyday goodbyes Thais prefer สวัสดี or แล้วพบกันใหม่."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "A colleague asks you สบายดีไหมครับ. What is the best reply?",
      choices: ["สบายดีครับ", "ลาก่อนครับ", "โชคดีครับ", "ขอโทษครับ"],
      answer: 0,
      explanation: "สบายดีครับ = I'm fine (women say สบายดีค่ะ). You can add แล้วคุณล่ะ (laew khun la) = and you?",
    }),
    choose(`${p}c2`, {
      question: "You accidentally bump into someone on the BTS. What do you say?",
      choices: ["ขอโทษครับ", "ขอบคุณครับ", "ยินดีที่ได้รู้จักครับ", "โชคดีครับ"],
      answer: 0,
      explanation: "ขอโทษ (kho-thot) = sorry / excuse me. Add ครับ or ค่ะ to sound polite.",
    }),
    order(`${p}o1`, ["สบายดี", "ไหม", "ครับ"], "Are you well? (male speaker)", "สบายดี (fine) + ไหม (question) + ครับ (polite). Women end with คะ instead."),
  ], { more: true, full: true }),

  "greetings/polite-particles": pack("polite-particles", [
    ["ขอบคุณค่ะ", "khop-khun kha", "thank you (female speaker)", "Women end statements with ค่ะ (falling tone)."],
    ["ใช่ครับ", "chai khrap", "yes, that's right (male speaker)", "ใช่ = correct / yes. Men add ครับ."],
    ["ไม่ใช่ค่ะ", "mai chai kha", "no, that's not right (female speaker)", "ไม่ = not, so ไม่ใช่ = not correct."],
    ["ได้ครับ", "dai khrap", "sure, I can (male speaker)", "ได้ = can / OK. A very handy answer to requests."],
    ["คุณ", "khun", "you / Mr. / Ms.", "คุณ is the polite 'you' and also goes before first names: คุณสมชาย."],
    ["ครับผม", "khrap phom", "yes sir (extra-polite male)", "Men use ครับผม to sound extra respectful, e.g. to a boss or customer."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "A woman asks 'Where is the toilet?' Which ending is correct?",
      choices: ["ห้องน้ำอยู่ที่ไหนคะ", "ห้องน้ำอยู่ที่ไหนค่ะ", "ห้องน้ำอยู่ที่ไหนครับ", "ห้องน้ำอยู่ที่ไหนจ๊ะ"],
      answer: 0,
      explanation: "Women use คะ (high tone) at the end of questions and ค่ะ (falling tone) at the end of statements.",
    }),
    choose(`${p}c2`, {
      question: "Someone thanks you. Which reply works for anyone, man or woman?",
      choices: ["ไม่เป็นไร", "ครับผม", "ขอบคุณค่ะ", "ใช่ครับ"],
      answer: 0,
      explanation: "ไม่เป็นไร (mai pen rai) = you're welcome / no problem. Add ครับ or ค่ะ to fit your own gender.",
    }),
    order(`${p}o1`, ["ขอบคุณ", "มาก", "ครับ"], "Thank you very much (male speaker)", "ขอบคุณ (thank you) + มาก (very much) + ครับ. Women say ขอบคุณมากค่ะ."),
  ], { sayIdx: 0, full: true }),

  "greetings/greet-practice": pack("greet-practice", [
    ["คุณชื่ออะไร", "khun chue a-rai", "what's your name?", "คุณ (you) + ชื่อ (name) + อะไร (what). Question words go at the end in Thai."],
    ["มาจากไหน", "ma jak nai", "where are you from?", "มา = come, จาก = from, ไหน = where."],
    ["ฉัน", "chan", "I (often used by women)", "Women usually say ฉัน or ดิฉัน; men say ผม."],
    ["มาจากอังกฤษ", "ma jak ang-krit", "I'm from England", "Swap in your country: มาจากอเมริกา, มาจากญี่ปุ่น..."],
    ["พูดไทยได้นิดหน่อย", "phut thai dai nit noi", "I speak a little Thai", "พูด = speak, ได้ = can, นิดหน่อย = a little. Thais love hearing this."],
    ["ไม่เข้าใจ", "mai khao jai", "I don't understand", "เข้าใจ = understand, ไม่ = not."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "A woman introduces herself. Which sentence sounds natural?",
      choices: ["ฉันชื่อมาลีค่ะ", "ผมชื่อมาลีค่ะ", "ฉันชื่อมาลีครับ", "ผมชื่อมาลีครับ"],
      answer: 0,
      explanation: "Women use ฉัน (I) and end with ค่ะ. Men use ผม and end with ครับ.",
    }),
    choose(`${p}c2`, {
      question: "Someone is speaking Thai too fast for you. What do you say?",
      choices: ["พูดช้าๆ หน่อยครับ", "พูดเร็วๆ หน่อยครับ", "ยินดีที่ได้รู้จักครับ", "สบายดีครับ"],
      answer: 0,
      explanation: "ช้า = slow; repeating it (ช้าๆ) softens it, and หน่อย makes it a polite request.",
    }),
    order(`${p}o1`, ["คุณ", "ชื่อ", "อะไร", "ครับ"], "What is your name? (male speaker)", "คุณ (you) + ชื่อ (name) + อะไร (what) + ครับ. The question word อะไร comes at the end."),
  ], { more: true, full: true }),

  // ───────────── Numbers ─────────────
  "numbers/numbers-1-10": pack("numbers-1-10", [
    ["ศูนย์", "sun", "0", "ศูนย์ = zero. You hear it a lot in phone numbers."],
    ["สี่", "see", "4", "สี่ has a low tone, so it doesn't sound like สี (colour)."],
    ["หก", "hok", "6", "หก sounds a bit like 'hock'."],
    ["แปด", "paet", "8", "แปด rhymes roughly with 'pet'."],
    ["สิบ", "sip", "10", "สิบ = ten, the base for all bigger numbers."],
    ["ครึ่ง", "khrueng", "half", "ครึ่ง = half, as in ครึ่งชั่วโมง (half an hour)."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Which number do many Thais consider lucky?",
      choices: ["9 (เก้า)", "4 (สี่)", "6 (หก)", "0 (ศูนย์)"],
      answer: 0,
      explanation: "เก้า (gao) sounds like ก้าว (gao) = to step forward or progress, so 9 is a lucky number.",
    }),
    choose(`${p}c2`, {
      question: "Which Thai digit is 4?",
      choices: ["๔", "๕", "๒", "๘"],
      answer: 0,
      explanation: "Thai digits: ๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙ ๐ = 1–9 and 0.",
    }),
    order(`${p}o1`, ["หนึ่ง", "สอง", "สาม", "สี่"], "Count from 1 to 4", "หนึ่ง (neung) 1, สอง (song) 2, สาม (sam) 3, สี่ (see) 4."),
  ]),

  "numbers/numbers-11-100": pack("numbers-11-100", [
    ["สิบสอง", "sip-song", "12", "Just say ten + two: สิบ + สอง."],
    ["สิบห้า", "sip-ha", "15", "สิบ (10) + ห้า (5)."],
    ["ยี่สิบเอ็ด", "yee-sip-et", "21", "20 is ยี่สิบ, and a final 1 becomes เอ็ด."],
    ["สามสิบ", "sam-sip", "30", "สาม (3) × สิบ (10). Only 20 is special (ยี่สิบ)."],
    ["ห้าสิบ", "ha-sip", "50", "ห้า (5) × สิบ (10)."],
    ["หนึ่งพัน", "neung phan", "1,000", "พัน = thousand. A 1,000-baht note is แบงค์พัน (baeng phan)."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "11, 21 and 31 all end with the same word for 'one'. Which one?",
      choices: ["เอ็ด (et)", "หนึ่ง (neung)", "สอง (song)", "สิบ (sip)"],
      answer: 0,
      explanation: "After สิบ the final 'one' becomes เอ็ด: สิบเอ็ด 11, ยี่สิบเอ็ด 21, สามสิบเอ็ด 31.",
    }),
    choose(`${p}c2`, {
      question: "A street vendor says เจ็ดสิบบาท. How much is it?",
      choices: ["70 baht", "17 baht", "7 baht", "700 baht"],
      answer: 0,
      explanation: "เจ็ด (7) + สิบ (10) = 70. Seventeen would be สิบเจ็ด, with the order reversed.",
    }),
    order(`${p}o1`, ["ห้าสิบ", "บาท", "ครับ"], "It's 50 baht (male speaker)", "Number first, then บาท, then ครับ: ห้าสิบบาทครับ."),
  ]),

  "numbers/classifiers": pack("classifiers", [
    ["แก้ว", "gaew", "glass / cup (classifier)", "Use แก้ว for drinks in a glass: กาแฟสองแก้ว = two coffees."],
    ["จาน", "jan", "plate (classifier)", "Use จาน for plates of food: ข้าวผัดหนึ่งจาน."],
    ["คัน", "khan", "vehicles / umbrellas (classifier)", "Cars, motorbikes and even umbrellas use คัน."],
    ["ใบ", "bai", "bags / tickets / cards (classifier)", "ใบ literally means 'leaf' and counts flat or hollow things."],
    ["หลัง", "lang", "houses (classifier)", "บ้านสองหลัง = two houses."],
    ["ชิ้น", "chin", "pieces (classifier)", "เค้กหนึ่งชิ้น = one piece of cake."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "How do you say 'two glasses of iced coffee'?",
      choices: ["กาแฟเย็นสองแก้ว", "สองกาแฟเย็นแก้ว", "กาแฟเย็นแก้วสอง", "แก้วสองกาแฟเย็น"],
      answer: 0,
      explanation: "The pattern is noun + number + classifier: กาแฟเย็น + สอง + แก้ว.",
    }),
    choose(`${p}c2`, {
      question: "รถสามคัน means three…",
      choices: ["cars", "houses", "plates", "glasses"],
      answer: 0,
      explanation: "รถ = car / vehicle and คัน is its classifier. Houses use หลัง, plates use จาน.",
    }),
    order(`${p}o1`, ["ขอ", "น้ำ", "สอง", "ขวด"], "Two bottles of water, please", "ขอ (may I have) + น้ำ (water) + สอง (two) + ขวด (bottle classifier)."),
  ]),

  // ───────────── Food ─────────────
  "food/food-vocab": pack("food-vocab", [
    ["ส้มตำ", "som-tam", "papaya salad", "ส้มตำ comes from Isan and is famously sour, sweet and spicy."],
    ["ข้าวเหนียว", "khao niao", "sticky rice", "เหนียว = sticky. Eaten by hand, especially in the North and Isan."],
    ["ไก่", "gai", "chicken", "ไก่ has a low tone; ไข่ (khai) is egg, so don't mix them up."],
    ["หมู", "mu", "pork", "หมู = pig / pork, as in ข้าวผัดหมู (pork fried rice)."],
    ["กุ้ง", "kung", "shrimp", "Found in ต้มยำกุ้ง."],
    ["เปรี้ยว", "priao", "sour", "Lime and tamarind make Thai food เปรี้ยว."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "You see a yellow flag with the sign อาหารเจ. What does it sell?",
      choices: ["Vegan Buddhist-style food (no meat)", "Seafood", "Halal food", "Desserts only"],
      answer: 0,
      explanation: "เจ (je) food has no meat, fish, dairy or eggs. Look for the yellow flags with red letters.",
    }),
    choose(`${p}c2`, {
      question: "Which famous dessert is ข้าวเหนียวมะม่วง?",
      choices: ["Mango sticky rice", "Coconut ice cream", "Banana pancake", "Sweet sticky rice with durian"],
      answer: 0,
      explanation: "ข้าวเหนียว (sticky rice) + มะม่วง (mango).",
    }),
    order(`${p}o1`, ["ส้มตำ", "อร่อย", "มาก"], "The papaya salad is very tasty", "Noun + adjective + มาก (very): ส้มตำอร่อยมาก. Thai needs no 'is'."),
  ]),

  "food/ordering-food": pack("ordering-food", [
    ["ขอน้ำแข็ง", "kho nam khaeng", "ice, please", "น้ำแข็ง = 'hard water' = ice."],
    ["กินที่นี่", "gin tee nee", "eat here", "กิน = eat, ที่นี่ = here."],
    ["ห่อกลับบ้าน", "ho glap ban", "take away", "ห่อ = wrap, กลับบ้าน = go home."],
    ["เผ็ดนิดหน่อย", "phet nit noi", "a little spicy", "นิดหน่อย = a little. Thai 'a little spicy' can still be pretty hot."],
    ["ไม่ใส่ผัก", "mai sai phak", "no vegetables", "ไม่ใส่ = don't put in. Swap ผัก for anything you don't want."],
    ["เอาอีกหนึ่ง", "ao eek neung", "one more", "เอา = want / take, อีก = more / another."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "The vendor asks ทานที่นี่หรือกลับบ้านครับ. What is he asking?",
      choices: ["Eat here or take away?", "Is it too spicy?", "Do you want rice?", "Are you paying by card?"],
      answer: 0,
      explanation: "ทาน is a polite word for 'eat', ที่นี่ = here, หรือ = or, กลับบ้าน = (take) home.",
    }),
    choose(`${p}c2`, {
      question: "You want to call the waiter politely. What do you say?",
      choices: ["น้องครับ", "เก็บเงินครับ", "อร่อยครับ", "เผ็ดครับ"],
      answer: 0,
      explanation: "Thais call young staff น้อง (little brother/sister). It's friendly, not rude. Older staff can be พี่.",
    }),
    order(`${p}o1`, ["ขอ", "น้ำเปล่า", "หนึ่ง", "ขวด"], "One bottle of plain water, please", "ขอ + น้ำเปล่า (plain water) + หนึ่ง + ขวด (bottle classifier)."),
  ]),

  "food/food-listening": pack("food-listening", [
    ["อิ่มแล้ว", "im laew", "I'm full", "อิ่ม = full (from eating), แล้ว = already."],
    ["หิวมาก", "hiu mak", "very hungry", "หิว = hungry, มาก = very."],
    ["แนะนำอะไรดี", "nae-nam a-rai dee", "what do you recommend?", "แนะนำ = recommend. Great for finding the house special."],
    ["ไม่กินหมู", "mai gin mu", "I don't eat pork", "ไม่กิน + food = I don't eat it."],
    ["ขอช้อนส้อม", "kho chon som", "a spoon and fork, please", "Thais eat with a spoon and fork, not a knife. Chopsticks are for noodles."],
    ["ได้เลย", "dai loei", "sure, right away!", "เลย adds 'right away / totally' to ได้ (can)."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "The server says หมดแล้วค่ะ about the dish you ordered. What does she mean?",
      choices: ["It's sold out", "It's ready", "It's very spicy", "It's free"],
      answer: 0,
      explanation: "หมด = used up / finished, แล้ว = already.",
    }),
    choose(`${p}c2`, {
      question: "How do Thais usually eat a plate of fried rice?",
      choices: ["Spoon in the right hand, fork in the left", "With chopsticks", "With a knife and fork", "With the hands"],
      answer: 0,
      explanation: "The fork pushes food onto the spoon, and the spoon goes into your mouth.",
    }),
    order(`${p}o1`, ["ไม่", "ใส่", "น้ำตาล", "ครับ"], "No sugar, please (male speaker)", "ไม่ใส่ (don't put in) + น้ำตาล (sugar) + ครับ."),
  ]),

  // ───────────── Transport ─────────────
  "transport/transport-vocab": pack("transport-vocab", [
    ["รถเมล์", "rot mae", "city bus", "รถเมล์ comes from English 'mail', because early buses carried mail."],
    ["ตั๋ว", "tua", "ticket", "ตั๋วรถไฟ = train ticket."],
    ["เรือ", "ruea", "boat", "Bangkok's river boats are เรือด่วน (express boats)."],
    ["รถตุ๊กตุ๊ก", "rot tuk-tuk", "tuk-tuk", "Agree on the price before you get in."],
    ["รถไฟฟ้า", "rot fai fa", "skytrain / metro", "ไฟฟ้า = electricity, so 'electric train', like the BTS and MRT."],
    ["มอเตอร์ไซค์รับจ้าง", "mo-toe-sai rap jang", "motorbike taxi", "รับจ้าง = for hire. Drivers wear coloured vests."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "You want the taxi driver to use the meter. What do you say?",
      choices: ["เปิดมิเตอร์ด้วยครับ", "ปิดแอร์ด้วยครับ", "จอดตรงนี้ครับ", "เลี้ยวซ้ายครับ"],
      answer: 0,
      explanation: "เปิด = turn on / open, มิเตอร์ = meter, ด้วย makes it a polite request.",
    }),
    choose(`${p}c2`, {
      question: "Where do you take a รถไฟฟ้า in Bangkok?",
      choices: ["At a BTS or MRT station", "At the pier", "At the airport runway", "At a bus stop"],
      answer: 0,
      explanation: "รถไฟฟ้า is the electric rail system: the BTS Skytrain and the MRT subway.",
    }),
    order(`${p}o1`, ["ไป", "สนามบิน", "ครับ"], "To the airport, please (male speaker)", "ไป (go) + place + ครับ is all you need to tell a driver where to go."),
  ]),

  "transport/directions": pack("directions", [
    ["เลี้ยวซ้าย", "liao sai", "turn left", "เลี้ยว = turn, ซ้าย = left."],
    ["เลี้ยวขวา", "liao khwa", "turn right", "เลี้ยว = turn, ขวา = right."],
    ["กลับรถ", "glap rot", "make a U-turn", "Literally 'return the car'. Very common on Thai roads."],
    ["สี่แยก", "see yaek", "crossroads", "สี่ = four, แยก = split: a four-way junction."],
    ["ข้างหน้า", "khang na", "up ahead / in front", "ข้าง = side, หน้า = front."],
    ["ไฟแดง", "fai daeng", "traffic light", "Literally 'red light'. Thais say ไฟแดง for the whole traffic light."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "ไกลไหม (glai mai, mid tone) asks…",
      choices: ["Is it far?", "Is it near?", "Is it open?", "Is it cheap?"],
      answer: 0,
      explanation: "ไกล (mid tone) = far, ใกล้ (falling tone) = near. Only the tone tells them apart.",
    }),
    choose(`${p}c2`, {
      question: "Your taxi has reached your hotel. What do you say?",
      choices: ["ถึงแล้วครับ จอดตรงนี้ครับ", "ตรงไปอีกครับ", "กลับรถครับ", "ไกลไหมครับ"],
      answer: 0,
      explanation: "ถึงแล้ว = we've arrived, จอดตรงนี้ = stop here.",
    }),
    order(`${p}o1`, ["ห้องน้ำ", "อยู่", "ที่ไหน", "ครับ"], "Where is the toilet? (male speaker)", "Thing + อยู่ที่ไหน (is where) + ครับ. The question word comes last."),
  ]),

  // ───────────── Shopping ─────────────
  "shopping/shopping-vocab": pack("shopping-vocab", [
    ["ร้าน", "ran", "shop", "ร้านอาหาร = restaurant, ร้านกาแฟ = coffee shop."],
    ["ห้าง", "hang", "shopping mall", "Short for ห้างสรรพสินค้า (department store)."],
    ["ใบเสร็จ", "bai set", "receipt", "ขอใบเสร็จด้วย = a receipt, please."],
    ["เงินทอน", "ngoen thon", "change (money back)", "เงิน = money, ทอน = give back."],
    ["ลองได้ไหม", "long dai mai", "can I try it on?", "ลอง = try, ได้ไหม = may I?"],
    ["บัตรเครดิต", "bat khre-dit", "credit card", "Many market stalls take cash or QR payment only."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "You like a shirt, but in another colour. What do you ask?",
      choices: ["มีสีอื่นไหมครับ", "มีไซซ์ใหญ่ไหมครับ", "ลดได้ไหมครับ", "ไม่เอาครับ"],
      answer: 0,
      explanation: "มี (have) + สีอื่น (other colour) + ไหม? = Do you have another colour?",
    }),
    choose(`${p}c2`, {
      question: "A shop assistant says ไม่รับบัตรค่ะ. What does it mean?",
      choices: ["They don't accept cards", "The card is broken", "Card payments get a discount", "Please show your ID card"],
      answer: 0,
      explanation: "ไม่รับ = don't accept, บัตร = card.",
    }),
    order(`${p}o1`, ["ขอ", "ดู", "หน่อย", "ครับ"], "Can I have a look, please? (male speaker)", "ขอ (may I) + ดู (look) + หน่อย (a little, softener) + ครับ."),
  ]),

  "shopping/bargaining": pack("bargaining", [
    ["ร้อยบาทได้ไหม", "roi baht dai mai", "is 100 baht OK?", "Offer a price with ได้ไหม at the end."],
    ["ขอคิดดูก่อน", "kho khit du gon", "let me think about it", "A polite way to walk away, and sellers often drop the price when you say it."],
    ["แถม", "thaem", "freebie / throw in for free", "แถมหน่อยได้ไหม = can you throw something in?"],
    ["ลูกค้าประจำ", "luk kha pra-jam", "regular customer", "ประจำ = regular. Regulars often get a better price."],
    ["ซื้อเยอะ", "sue yoe", "buy a lot", "เยอะ = a lot. Buying many items is a good reason to ask for a discount."],
    ["ถูกจัง", "thuk jang", "so cheap!", "จัง = so / really (casual)."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Where is bargaining normal in Thailand?",
      choices: ["Street and night markets", "7-Eleven", "Supermarkets", "Mall restaurants"],
      answer: 0,
      explanation: "Haggle at markets and stalls without price tags. Prices with tags in shops and malls are fixed.",
    }),
    choose(`${p}c2`, {
      question: "You're buying three T-shirts. Which is the best bargaining line?",
      choices: ["ซื้อสามตัว ลดหน่อยได้ไหมครับ", "ซื้อสามตัว แพงไปครับ เอาเลย", "ไม่ซื้อครับ ลดได้ไหม", "สามตัว ถูกจังครับ ขอขึ้นราคา"],
      answer: 0,
      explanation: "ซื้อสามตัว (I'm buying three; ตัว counts clothes) + ลดหน่อยได้ไหม (can you discount a bit?).",
    }),
    order(`${p}o1`, ["ลด", "หน่อย", "ได้ไหม", "ครับ"], "Can you lower it a bit? (male speaker)", "ลด (lower) + หน่อย (a little) + ได้ไหม (can you?) + ครับ."),
  ]),

  // ───────────── Emergency ─────────────
  "emergency/emergency-phrases": pack("emergency-phrases", [
    ["เรียกรถพยาบาล", "riak rot pha-ya-ban", "call an ambulance", "เรียก = call, รถพยาบาล = 'nurse car' = ambulance."],
    ["ไฟไหม้", "fai mai", "fire!", "ไฟ = fire, ไหม้ = burn."],
    ["หลงทาง", "long thang", "lost (the way)", "หลง = lost, ทาง = way."],
    ["กระเป๋าหาย", "gra-pao hai", "my bag is lost", "หาย = gone / missing. Swap in โทรศัพท์ (phone) or พาสปอร์ต."],
    ["ระวัง", "ra-wang", "watch out!", "Shout ระวัง to warn someone."],
    ["อันตราย", "an-ta-rai", "dangerous", "You see it on signs: อันตราย ห้ามเข้า = danger, no entry."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Which number do you call for an ambulance in Thailand?",
      choices: ["1669", "191", "199", "1155"],
      answer: 0,
      explanation: "1669 = emergency medical service. 191 = police, 199 = fire, 1155 = tourist police.",
    }),
    choose(`${p}c2`, {
      question: "Which hotline is the English-speaking tourist police?",
      choices: ["1155", "1669", "199", "911"],
      answer: 0,
      explanation: "The Tourist Police (ตำรวจท่องเที่ยว) answer on 1155 and can help in English.",
    }),
    order(`${p}o1`, ["ผม", "หลงทาง", "ครับ"], "I'm lost (male speaker)", "ผม (I) + หลงทาง (lost) + ครับ. Women say ฉันหลงทางค่ะ."),
  ]),

  "emergency/hospital": pack("hospital", [
    ["ร้านขายยา", "ran khai ya", "pharmacy", "ร้าน (shop) + ขาย (sell) + ยา (medicine)."],
    ["แพ้", "phae", "allergic to", "แพ้ + thing: แพ้กุ้ง = allergic to shrimp."],
    ["ไอ", "ai", "cough", "ไอ sounds like English 'I'."],
    ["ท้องเสีย", "thong sia", "diarrhea", "ท้อง = stomach, เสีย = broken / spoiled."],
    ["เวียนหัว", "wian hua", "dizzy", "เวียน = spin around, หัว = head."],
    ["คลินิก", "khli-nik", "clinic", "Small private clinics are everywhere and fine for minor problems."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Tell the doctor you are allergic to penicillin.",
      choices: ["ผมแพ้ยาเพนิซิลลินครับ", "ผมชอบยาเพนิซิลลินครับ", "ผมซื้อยาเพนิซิลลินครับ", "ผมไม่มียาครับ"],
      answer: 0,
      explanation: "แพ้ยา = allergic to a medicine.",
    }),
    choose(`${p}c2`, {
      question: "The pharmacist says กินวันละสามครั้ง. How often do you take it?",
      choices: ["Three times a day", "Every three days", "Three pills at once", "For three weeks"],
      answer: 0,
      explanation: "วันละ = per day, สามครั้ง = three times.",
    }),
    order(`${p}o1`, ["กิน", "ยา", "หลัง", "อาหาร"], "Take the medicine after meals", "กินยา (take medicine) + หลังอาหาร (after food). You'll see หลังอาหาร on medicine labels."),
  ]),

  // ───────────── Family ─────────────
  "family/family-vocab": pack("family-vocab", [
    ["พี่สาว", "phi sao", "older sister", "พี่ = older sibling, สาว = female."],
    ["น้องชาย", "nong chai", "younger brother", "น้อง = younger sibling, ชาย = male."],
    ["ตา", "ta", "grandfather (mother's side)", "ตา also means 'eye', so context matters."],
    ["ยาย", "yai", "grandmother (mother's side)", "On the father's side it's ปู่ and ย่า."],
    ["ลุง", "lung", "uncle (older than your parent)", "Thais also call any older man ลุง in a friendly way."],
    ["ป้า", "pa", "aunt (older than your parent)", "Market sellers are often called ป้า affectionately."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Who can you call พี่?",
      choices: ["Anyone a bit older than you, even a stranger", "Only your real older brother", "Only people younger than you", "Only your parents"],
      answer: 0,
      explanation: "Thais use family words for everyone: พี่ for older people, น้อง for younger ones.",
    }),
    choose(`${p}c2`, {
      question: "Your mother's mother is your…",
      choices: ["ยาย", "ย่า", "ป้า", "พี่สาว"],
      answer: 0,
      explanation: "Mother's side: ตา and ยาย. Father's side: ปู่ and ย่า.",
    }),
    order(`${p}o1`, ["นี่", "คือ", "แม่", "ของผม"], "This is my mother (male speaker)", "นี่ (this) + คือ (is) + แม่ (mother) + ของผม (of me)."),
  ]),

  "family/relationships": pack("relationships", [
    ["เพื่อน", "phuean", "friend", "เพื่อน is also a friendly way to address someone your age."],
    ["แต่งงาน", "taeng ngan", "to marry", "แต่งงานแล้ว = already married."],
    ["โสด", "sot", "single", "ยังโสด = still single."],
    ["ลูกชาย", "luk chai", "son", "ลูก = child, ชาย = male."],
    ["ลูกสาว", "luk sao", "daughter", "ลูก = child, สาว = female."],
    ["เพื่อนสนิท", "phuean sa-nit", "close friend", "สนิท = close / intimate."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "A friendly aunty asks you มีแฟนหรือยัง. What is she asking?",
      choices: ["Do you have a partner yet?", "Are you hungry yet?", "Have you met my family?", "Do you have a fan in your room?"],
      answer: 0,
      explanation: "แฟน = boyfriend / girlfriend, หรือยัง = ...yet? Thais often ask this to be friendly.",
    }),
    choose(`${p}c2`, {
      question: "How do you answer 'not yet' to a หรือยัง question?",
      choices: ["ยัง", "ไม่", "แล้ว", "ใช่"],
      answer: 0,
      explanation: "To หรือยัง questions answer แล้ว (already) or ยัง (not yet), for example ยังครับ.",
    }),
    order(`${p}o1`, ["ผม", "แต่งงาน", "แล้ว", "ครับ"], "I'm married (male speaker)", "ผม + แต่งงาน (marry) + แล้ว (already) + ครับ."),
  ]),

  "family/family-conversation": pack("family-conversation", [
    ["มีลูกกี่คน", "mee luk gee khon", "how many children do you have?", "กี่ = how many, คน = classifier for people."],
    ["อายุเท่าไหร่", "a-yu tao-rai", "how old are you?", "อายุ = age, เท่าไหร่ = how much."],
    ["คนโต", "khon to", "the eldest child", "โต = big / grown up."],
    ["คนเล็ก", "khon lek", "the youngest child", "เล็ก = small."],
    ["ครอบครัวใหญ่", "khrop-khrua yai", "big family", "Many Thai families live with grandparents in one house."],
    ["คิดถึงบ้าน", "khit theung ban", "homesick", "Literally 'miss home'."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Why do Thais often ask your age soon after meeting?",
      choices: ["To know whether to call you พี่ or น้อง", "To be rude", "To check your visa", "For a horoscope only"],
      answer: 0,
      explanation: "Age decides how people address each other, so it's a normal, friendly question.",
    }),
    choose(`${p}c2`, {
      question: "ผมเป็นคนเล็ก means…",
      choices: ["I'm the youngest child", "I'm a short person", "I'm the eldest child", "I'm an only child"],
      answer: 0,
      explanation: "คนเล็ก = the youngest in the family. The eldest is คนโต, an only child is ลูกคนเดียว.",
    }),
    order(`${p}o1`, ["คุณ", "มี", "พี่น้อง", "กี่คน"], "How many siblings do you have?", "คุณ (you) + มี (have) + พี่น้อง (siblings) + กี่คน (how many people)."),
  ]),

  // ───────────── Time ─────────────
  "time/time-vocab": pack("time-vocab", [
    ["ชั่วโมง", "chua mong", "hour", "สองชั่วโมง = two hours."],
    ["นาที", "na-thee", "minute", "ห้านาที = five minutes."],
    ["เที่ยงคืน", "thiang khuen", "midnight", "เที่ยง = noon, คืน = night."],
    ["บ่ายโมง", "bai mong", "1 PM", "บ่าย = afternoon. 1–3 PM are บ่ายโมง, บ่ายสองโมง, บ่ายสามโมง."],
    ["หกโมงเย็น", "hok mong yen", "6 PM", "เย็น = evening, used for 4–6 PM."],
    ["ตีสอง", "tee song", "2 AM", "ตี = strike (an old gong), used for 1–5 AM."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "What time is บ่ายสามโมง?",
      choices: ["3 PM", "3 AM", "9 AM", "9 PM"],
      answer: 0,
      explanation: "บ่าย marks the afternoon, so บ่ายสามโมง = 3 PM.",
    }),
    choose(`${p}c2`, {
      question: "How do Thais usually say 7 PM?",
      choices: ["หนึ่งทุ่ม", "เจ็ดโมงเช้า", "ตีเจ็ด", "บ่ายเจ็ดโมง"],
      answer: 0,
      explanation: "From 7 to 11 PM Thais count ทุ่ม (thum): หนึ่งทุ่ม 7 PM, สองทุ่ม 8 PM...",
    }),
    order(`${p}o1`, ["ตอนนี้", "กี่โมง", "ครับ"], "What time is it now? (male speaker)", "ตอนนี้ (now) + กี่โมง (what time) + ครับ."),
  ]),

  "time/days-months": pack("days-months", [
    ["วันอังคาร", "wan ang-khan", "Tuesday", "Named after Mars (อังคาร)."],
    ["วันพฤหัสบดี", "wan pha-rue-hat-sa-bo-dee", "Thursday", "Usually shortened to วันพฤหัส (wan pha-rue-hat)."],
    ["วันเสาร์", "wan sao", "Saturday", "Named after Saturn (เสาร์)."],
    ["เดือนเมษายน", "duean me-sa-yon", "April", "April is the hottest month and has Songkran."],
    ["เดือนธันวาคม", "duean than-wa-khom", "December", "December is in the cool, dry season."],
    ["สุดสัปดาห์", "sut sap-da", "weekend", "สุด = end, สัปดาห์ = week."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Thai months ending in -คม (like มกราคม) have how many days?",
      choices: ["31", "30", "28", "29"],
      answer: 0,
      explanation: "-คม = 31 days, -ยน (like เมษายน) = 30 days, and กุมภาพันธ์ (February) has 28 or 29.",
    }),
    choose(`${p}c2`, {
      question: "Each Thai weekday has a colour. Which colour is Monday?",
      choices: ["Yellow", "Red", "Green", "Purple"],
      answer: 0,
      explanation: "Monday is yellow, Sunday red, Tuesday pink, Wednesday green, Thursday orange, Friday blue and Saturday purple.",
    }),
    order(`${p}o1`, ["วันนี้", "วัน", "อะไร"], "What day is today?", "วันนี้ (today) + วันอะไร (what day). Answer: วันนี้วันจันทร์."),
  ]),

  "time/time-phrases": pack("time-phrases", [
    ["ตอนนี้", "ton nee", "now", "ตอน = time / period, นี้ = this."],
    ["มะรืนนี้", "ma-ruen nee", "the day after tomorrow", "One step after พรุ่งนี้ (tomorrow)."],
    ["อาทิตย์ที่แล้ว", "a-thit tee laew", "last week", "อาทิตย์ is the everyday word for week; ที่แล้ว = last / previous."],
    ["ปีหน้า", "pee na", "next year", "หน้า = front / next: เดือนหน้า = next month."],
    ["มาสาย", "ma sai", "to arrive late", "สาย = late (in the morning / for an appointment)."],
    ["เดี๋ยว", "diao", "in a moment", "เดี๋ยวมา = back in a moment. It can mean 5 minutes... or 50!"],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Your friend texts ขอโทษ มาสายนิดหน่อย. What happened?",
      choices: ["They'll be a little late", "They're cancelling", "They arrived early", "They're lost"],
      answer: 0,
      explanation: "มาสาย = arrive late, นิดหน่อย = a little. Thais tend to be relaxed about time.",
    }),
    choose(`${p}c2`, {
      question: "Which phrase means 'last month'?",
      choices: ["เดือนที่แล้ว", "เดือนหน้า", "เดือนนี้", "ปีที่แล้ว"],
      answer: 0,
      explanation: "ที่แล้ว = last / previous; หน้า = next; นี้ = this.",
    }),
    order(`${p}o1`, ["อีก", "สิบ", "นาที"], "In ten more minutes", "อีก (more) + สิบ (ten) + นาที (minutes)."),
  ]),

  // ───────────── Weather ─────────────
  "weather/weather-vocab": pack("weather-vocab", [
    ["หนาว", "nao", "cold (weather)", "หนาว is for cold air or feeling cold. เย็น is pleasantly cool."],
    ["ลมแรง", "lom raeng", "strong wind", "ลม = wind, แรง = strong."],
    ["เมฆ", "mek", "cloud", "เมฆเยอะ = very cloudy."],
    ["ชื้น", "chuen", "humid", "Thailand is ชื้น most of the year."],
    ["ฟ้าร้อง", "fa rong", "thunder", "Literally 'the sky shouts'."],
    ["ร่ม", "rom", "umbrella", "ร่ม also means 'shade'. Useful for both sun and rain."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "It's an April afternoon in Bangkok. Which complaint fits best?",
      choices: ["วันนี้ร้อนมาก", "วันนี้หนาวมาก", "วันนี้หิมะตก", "วันนี้ไม่มีแดด"],
      answer: 0,
      explanation: "April is the hottest month. หิมะตก (snow falling) never happens in Thailand.",
    }),
    choose(`${p}c2`, {
      question: "Your friend says ฟ้าครึ้ม เดี๋ยวฝนตก. What should you do?",
      choices: ["Take an umbrella, rain is coming", "Put on sunscreen", "Wear a winter coat", "Go to the beach to sunbathe"],
      answer: 0,
      explanation: "ฟ้าครึ้ม = the sky is overcast, เดี๋ยวฝนตก = it'll rain soon.",
    }),
    order(`${p}o1`, ["อากาศ", "ร้อน", "มาก"], "The weather is very hot", "อากาศ (weather) + ร้อน (hot) + มาก (very). In Thai, มาก comes after the word it makes stronger."),
  ]),

  "weather/seasons": pack("seasons", [
    ["ฤดู", "rue-du", "season (formal)", "ฤดูร้อน is the formal way to say หน้าร้อน."],
    ["น้ำท่วม", "nam thuam", "flood", "Floods can happen late in the rainy season."],
    ["ครีมกันแดด", "khrim kan daet", "sunscreen", "กัน = protect against, แดด = sunshine."],
    ["เสื้อกันหนาว", "suea kan nao", "jacket / sweater", "Useful for the cool season in the North, and for chilly air-con."],
    ["มรสุม", "mo-ra-sum", "monsoon", "The southwest monsoon brings the rainy season."],
    ["ฝุ่น", "fun", "dust / smog", "Haze and PM2.5 smog are a problem in the dry season, especially up North."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "When is the cool, dry season that most tourists love?",
      choices: ["November to February", "April to May", "July to September", "Only in October"],
      answer: 0,
      explanation: "หน้าหนาว (roughly November–February) is the most comfortable time to visit most of Thailand.",
    }),
    choose(`${p}c2`, {
      question: "You're going to Chiang Mai in December. What should you pack?",
      choices: ["เสื้อกันหนาว", "เสื้อชูชีพ", "ร่มกันหิมะ", "พัดลม"],
      answer: 0,
      explanation: "Northern mornings and nights can be chilly in December, so bring a เสื้อกันหนาว (jacket).",
    }),
    order(`${p}o1`, ["หน้าหนาว", "อากาศ", "ดี"], "In the cool season the weather is nice", "Season first, then อากาศดี (weather good)."),
  ]),

  // ───────────── Culture ─────────────
  "culture/customs": pack("customs", [
    ["ถอดรองเท้า", "thot rong-thao", "take off shoes", "Do it before entering homes, temples and some shops."],
    ["เกรงใจ", "kreng jai", "considerate (not wanting to bother others)", "Thais care a lot about not imposing on others."],
    ["ใจเย็น", "jai yen", "calm / patient", "Literally 'cool heart'. Losing your temper is frowned upon."],
    ["เสียหน้า", "sia na", "to lose face", "Avoid embarrassing someone in public."],
    ["ยิ้ม", "yim", "to smile", "Thailand is called the Land of Smiles (สยามเมืองยิ้ม)."],
    ["สุภาพ", "su-phap", "polite", "พูดสุภาพ = speak politely."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Which body part should you avoid touching, even on a child?",
      choices: ["The head", "The hand", "The shoulder", "The arm"],
      answer: 0,
      explanation: "The head is the highest, most respected part of the body. The feet are the lowest.",
    }),
    choose(`${p}c2`, {
      question: "Sitting in a temple, how should your feet point?",
      choices: ["Away from the Buddha and monks", "Towards the Buddha image", "Towards the monks", "It doesn't matter"],
      answer: 0,
      explanation: "Pointing your feet at people or sacred images is rude. Tuck them behind you.",
    }),
    order(`${p}o1`, ["กรุณา", "ถอด", "รองเท้า"], "Please take off your shoes", "กรุณา (please, formal) + ถอด (take off) + รองเท้า (shoes). You'll see this on signs."),
  ]),

  "culture/festivals": pack("festivals", [
    ["สวัสดีปีใหม่", "sa-wat-dee pee mai", "Happy New Year", "ปีใหม่ = new year. Used on 1 January and at Songkran."],
    ["กระทง", "gra-thong", "floating basket", "Made of banana leaves and flowers for Loy Krathong."],
    ["โคมลอย", "khom loi", "sky lantern", "Released into the sky at Yi Peng in Chiang Mai."],
    ["รดน้ำดำหัว", "rot nam dam hua", "water blessing for elders", "At Songkran, young people pour scented water on elders' hands and ask for blessings."],
    ["ยี่เป็ง", "yee peng", "Yi Peng (Northern lantern festival)", "A Lanna festival in Chiang Mai, on the same full moon as Loy Krathong."],
    ["เทศกาลกินเจ", "thet-sa-kan gin je", "vegetarian festival", "Famous in Phuket, held in the 9th lunar month."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "When is Songkran celebrated?",
      choices: ["13–15 April", "1 January", "The full moon of November", "31 December"],
      answer: 0,
      explanation: "Songkran (13–15 April) is the traditional Thai New Year, in the hottest month.",
    }),
    choose(`${p}c2`, {
      question: "What do people do with a กระทง?",
      choices: ["Float it on a river or lake", "Throw water with it", "Eat it as dessert", "Hang it on a temple wall"],
      answer: 0,
      explanation: "On Loy Krathong night people float a กระทง to thank the water goddess and let go of bad luck.",
    }),
    order(`${p}o1`, ["สุขสันต์", "วัน", "สงกรานต์"], "Happy Songkran Day", "สุขสันต์ (happy) + วัน (day) + สงกรานต์. Same pattern as สุขสันต์วันเกิด."),
  ]),

  // ───────────── Work ─────────────
  "work/work-vocab": pack("work-vocab", [
    ["ออฟฟิศ", "op-fit", "office", "Borrowed from English 'office'."],
    ["เพื่อนร่วมงาน", "phuean ruam ngan", "colleague", "เพื่อน (friend) + ร่วม (shared) + งาน (work)."],
    ["ลูกค้า", "luk kha", "customer / client", "ลูกค้า is also what shopkeepers call you."],
    ["อาชีพ", "a-cheep", "occupation", "อาชีพอะไร = what's your occupation?"],
    ["ครู", "khru", "teacher", "Teachers are highly respected in Thailand."],
    ["เลิกงาน", "loek ngan", "to finish work (for the day)", "เลิก = stop / quit. เลิกงานกี่โมง = what time do you finish?"],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Someone asks คุณทำงานอะไร. What do they want to know?",
      choices: ["Your job", "Your salary", "Your office address", "Your working hours"],
      answer: 0,
      explanation: "ทำงาน (work) + อะไร (what) = what work do you do? Answer: ผมเป็นครูครับ.",
    }),
    choose(`${p}c2`, {
      question: "How do you say 'I'm a teacher' (male speaker)?",
      choices: ["ผมเป็นครูครับ", "ผมคือครูครับ", "ผมครูเป็นครับ", "เป็นผมครูครับ"],
      answer: 0,
      explanation: "Use เป็น (to be) for jobs and roles: ผม + เป็น + ครู.",
    }),
    order(`${p}o1`, ["ผม", "ทำงาน", "ที่", "บริษัท"], "I work at a company (male speaker)", "ผม + ทำงาน (work) + ที่ (at) + บริษัท (company)."),
  ]),

  "work/office-phrases": pack("office-phrases", [
    ["ยังไม่เสร็จ", "yang mai set", "not finished yet", "ยัง = still / yet, ไม่เสร็จ = not done."],
    ["เข้าใจแล้ว", "khao jai laew", "understood / got it", "เข้าใจ = understand, แล้ว = already."],
    ["ช่วยหน่อยได้ไหม", "chuai noi dai mai", "can you help me?", "ช่วย = help, หน่อย softens it."],
    ["โทรกลับ", "tho glap", "to call back", "โทร = phone, กลับ = back."],
    ["เลื่อนประชุม", "luean pra-chum", "to postpone the meeting", "เลื่อน = move / shift."],
    ["ยกเลิก", "yok loek", "to cancel", "ประชุมยกเลิก = the meeting is cancelled."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Your boss asks a hard question and you need a moment. What do you say?",
      choices: ["ขอเวลาคิดสักครู่ครับ", "ไม่รู้ครับ ลาก่อน", "เลิกงานแล้วครับ", "ยกเลิกครับ"],
      answer: 0,
      explanation: "ขอเวลา (may I have time) + คิด (think) + สักครู่ (a moment). It's polite, and nobody loses face.",
    }),
    choose(`${p}c2`, {
      question: "Your colleague says ประชุมเลื่อนไปพรุ่งนี้. What happened?",
      choices: ["The meeting moved to tomorrow", "The meeting is cancelled", "The meeting starts now", "The meeting was yesterday"],
      answer: 0,
      explanation: "เลื่อน = postponed / moved, ไปพรุ่งนี้ = to tomorrow.",
    }),
    order(`${p}o1`, ["ผม", "จะ", "โทรกลับ", "ครับ"], "I'll call back (male speaker)", "ผม + จะ (will) + โทรกลับ (call back) + ครับ."),
  ]),

  // ───────────── Emotions ─────────────
  "emotions/emotions-vocab": pack("emotions-vocab", [
    ["เบื่อ", "buea", "bored", "เบื่อจัง = so bored!"],
    ["เหงา", "ngao", "lonely", "เหงา is a common feeling in Thai pop songs."],
    ["ตกใจ", "tok jai", "startled / shocked", "Literally 'the heart drops'."],
    ["อาย", "ai", "shy / embarrassed", "อายจัง = how embarrassing!"],
    ["สบายใจ", "sa-bai jai", "at ease / relieved", "สบาย (comfortable) + ใจ (heart)."],
    ["มีความสุข", "mee khwam suk", "content / happy (lasting)", "ความสุข = happiness. ดีใจ is happy about one event; มีความสุข is a lasting state."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Many Thai feeling words use ใจ (heart). What is เสียใจ literally?",
      choices: ["A broken / spoiled heart", "A big heart", "A cold heart", "A hot heart"],
      answer: 0,
      explanation: "เสีย = broken / spoiled + ใจ = heart, so sad or sorry. ดีใจ = good heart = glad.",
    }),
    choose(`${p}c2`, {
      question: "A dog suddenly barks behind you. You feel…",
      choices: ["ตกใจ", "เบื่อ", "เหงา", "สบายใจ"],
      answer: 0,
      explanation: "ตกใจ = startled. Thais often say ตกใจหมดเลย = that scared me!",
    }),
    order(`${p}o1`, ["ผม", "ตื่นเต้น", "มาก"], "I'm very excited (male speaker)", "ผม + ตื่นเต้น (excited) + มาก (very). Thai needs no 'am'."),
  ]),

  "emotions/emotions-expressions": pack("emotions-expressions", [
    ["ใจเย็นๆ", "jai yen yen", "calm down", "Literally 'cool heart'. Said to someone who is getting upset."],
    ["ไม่ต้องห่วง", "mai tong huang", "don't worry", "ไม่ต้อง = no need, ห่วง = worry."],
    ["เป็นห่วง", "pen huang", "to worry about (someone)", "เป็นห่วงนะ = I'm worried about you, take care."],
    ["ยินดีด้วย", "yin-dee duay", "congratulations", "ยินดี = glad, ด้วย = with (you)."],
    ["สู้ๆ", "su su", "you can do it!", "สู้ = fight. Cheer friends on before an exam or a match."],
    ["เสียใจด้วย", "sia jai duay", "I'm sorry to hear that", "Use it when someone shares bad news."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "ใจร้อน (jai ron, 'hot heart') describes someone who is…",
      choices: ["impatient / short-tempered", "kind and warm", "brave", "in love"],
      answer: 0,
      explanation: "ใจร้อน = hot-tempered, the opposite of ใจเย็น (cool heart, calm).",
    }),
    choose(`${p}c2`, {
      question: "Your friend just passed a big exam. What do you say?",
      choices: ["ยินดีด้วยนะ", "เสียใจด้วยนะ", "ใจเย็นๆ นะ", "ไม่ต้องห่วงนะ"],
      answer: 0,
      explanation: "ยินดีด้วย = congratulations. Save เสียใจด้วย for bad news.",
    }),
    order(`${p}o1`, ["ฉัน", "เป็นห่วง", "คุณ"], "I'm worried about you", "ฉัน (I) + เป็นห่วง (worry about) + คุณ (you)."),
  ]),

  // ───────────── Colors ─────────────
  "colors/colors-vocab": pack("colors-vocab", [
    ["สีชมพู", "see chom-phu", "pink", "ชมพู is also the rose apple fruit."],
    ["สีม่วง", "see muang", "purple", "ม่วง has a falling tone."],
    ["สีส้ม", "see som", "orange", "ส้ม = orange (the fruit), just like in English."],
    ["สีน้ำตาล", "see nam-tan", "brown", "น้ำตาล = sugar. Brown is 'the colour of (palm) sugar'."],
    ["สีเทา", "see thao", "grey", "เทา sounds like 'tao'."],
    ["สีฟ้า", "see fa", "light blue", "ฟ้า = sky, so 'sky colour'. Dark blue is สีน้ำเงิน."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Where does the colour word go in 'a red car'?",
      choices: ["รถสีแดง", "สีแดงรถ", "แดงสีรถ", "รถแดงสี"],
      answer: 0,
      explanation: "Noun first, then the colour: รถ (car) + สีแดง (red).",
    }),
    choose(`${p}c2`, {
      question: "Monks in Thailand usually wear robes of which colour?",
      choices: ["สีส้ม / saffron", "สีดำ", "สีชมพู", "สีฟ้า"],
      answer: 0,
      explanation: "Thai monks wear saffron (orange to brown) robes.",
    }),
    order(`${p}o1`, ["ผม", "ชอบ", "สีฟ้า"], "I like light blue (male speaker)", "ผม (I) + ชอบ (like) + สีฟ้า (light blue)."),
  ]),

  "colors/adjectives": pack("adjectives", [
    ["ช้า", "cha", "slow", "The opposite of เร็ว (fast)."],
    ["เตี้ย", "tia", "short (height)", "Used for people. The opposite of สูง (tall)."],
    ["ยาว", "yao", "long", "ผมยาว = long hair."],
    ["สั้น", "san", "short (length)", "Used for things, like a short skirt (กระโปรงสั้น)."],
    ["ใหม่", "mai", "new", "ใหม่ has a low tone, unlike ไหม (question) and ไม่ (not)."],
    ["เก่า", "gao", "old (things)", "For old people use แก่ (gae) instead."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "How do you say 'a big house'?",
      choices: ["บ้านใหญ่", "ใหญ่บ้าน", "บ้านเป็นใหญ่", "ใหญ่ของบ้าน"],
      answer: 0,
      explanation: "In Thai the adjective comes after the noun: บ้าน (house) + ใหญ่ (big).",
    }),
    choose(`${p}c2`, {
      question: "Which word describes an old car?",
      choices: ["เก่า", "แก่", "เตี้ย", "ช้า"],
      answer: 0,
      explanation: "เก่า = old for things; แก่ = old for people and animals.",
    }),
    order(`${p}o1`, ["ห้อง", "นี้", "เล็ก", "มาก"], "This room is very small", "ห้อง (room) + นี้ (this) + เล็ก (small) + มาก (very). นี้ comes after the noun."),
  ]),

  // ───────────── Body ─────────────
  "body/body-parts": pack("body-parts", [
    ["หู", "hu", "ear", "หู has a rising tone."],
    ["จมูก", "ja-muk", "nose", "Two syllables: ja-muk."],
    ["ผม", "phom", "hair (on the head)", "It's the same word as the male 'I'."],
    ["แขน", "khaen", "arm", "แขนเสื้อ = sleeve (the shirt's arm)."],
    ["ขา", "kha", "leg", "ขา has a rising tone. ปวดขา = my leg aches."],
    ["ฟัน", "fan", "tooth / teeth", "หมอฟัน = dentist."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "ผม means 'hair', but it also means…",
      choices: ["I (male speaker)", "you", "she", "we"],
      answer: 0,
      explanation: "ผม is both 'hair' and the polite male 'I'. Context makes it clear.",
    }),
    choose(`${p}c2`, {
      question: "Which body part counts as the lowest and should never point at people?",
      choices: ["เท้า (feet)", "มือ (hands)", "หัว (head)", "ตา (eyes)"],
      answer: 0,
      explanation: "Feet are considered low and dirty, so never point them at people or Buddha images.",
    }),
    order(`${p}o1`, ["ล้าง", "มือ", "ก่อน", "กิน", "ข้าว"], "Wash your hands before eating", "ล้างมือ (wash hands) + ก่อน (before) + กินข้าว (eat)."),
  ]),

  "body/body-phrases": pack("body-phrases", [
    ["ปวดฟัน", "puat fan", "toothache", "ปวด (ache) + ฟัน (tooth)."],
    ["เป็นหวัด", "pen wat", "have a cold", "Like เป็นไข้: use เป็น for illnesses."],
    ["เจ็บขา", "jep kha", "my leg hurts", "เจ็บ = hurt, ขา = leg."],
    ["คัน", "khan", "itchy", "Mosquito bites make you คัน."],
    ["บวม", "buam", "swollen", "ข้อเท้าบวม = swollen ankle."],
    ["ข้อเท้าแพลง", "kho thao phlaeng", "sprained ankle", "ข้อเท้า = ankle, แพลง = sprained."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "You cut your finger. Which word fits best: ___ นิ้ว?",
      choices: ["เจ็บ", "ปวด", "คัน", "หนาว"],
      answer: 0,
      explanation: "เจ็บ = sharp hurt or injury. ปวด = a dull ache inside, like ปวดหัว.",
    }),
    choose(`${p}c2`, {
      question: "A mosquito bit you and your arm is itchy. You say…",
      choices: ["คันแขน", "ปวดฟัน", "เป็นหวัด", "ข้อเท้าแพลง"],
      answer: 0,
      explanation: "คัน = itchy + แขน = arm.",
    }),
    order(`${p}o1`, ["ผม", "ปวด", "ฟัน", "มาก"], "I have a bad toothache (male speaker)", "ผม + ปวดฟัน (toothache) + มาก (very)."),
  ]),

  // ───────────── Animals & nature ─────────────
  "animals/animals-vocab": pack("animals-vocab", [
    ["ลิง", "ling", "monkey", "Watch your snacks around ลิง in Lopburi!"],
    ["งู", "ngu", "snake", "ง (ng) at the start of a word is common in Thai."],
    ["ม้า", "ma", "horse", "ม้า has a high tone; หมา (dog) has a rising tone."],
    ["วัว", "wua", "cow", "นมวัว = cow's milk."],
    ["ไก่", "gai", "chicken", "ไก่ is the animal and the meat."],
    ["เต่า", "tao", "turtle", "Sea turtles nest on some Andaman beaches."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Which word means 'horse'? (Watch the tone marks!)",
      choices: ["ม้า", "หมา", "มา", "แม่"],
      answer: 0,
      explanation: "ม้า (high) = horse, หมา (rising) = dog, มา (mid) = come, แม่ = mother.",
    }),
    choose(`${p}c2`, {
      question: "Which animal is a national symbol of Thailand?",
      choices: ["ช้าง (elephant)", "ม้า (horse)", "วัว (cow)", "งู (snake)"],
      answer: 0,
      explanation: "The elephant (ช้าง) is Thailand's national animal.",
    }),
    order(`${p}o1`, ["ผม", "กลัว", "งู"], "I'm afraid of snakes (male speaker)", "ผม + กลัว (be afraid of) + งู (snake)."),
  ]),

  "animals/nature-vocab": pack("nature-vocab", [
    ["ต้นไม้", "ton mai", "tree", "ต้น = trunk / plant, ไม้ = wood."],
    ["ชายหาด", "chai hat", "beach", "หาด = beach, as in หาดป่าตอง (Patong Beach)."],
    ["ทะเลสาบ", "tha-le sap", "lake", "Literally a 'sea' (ทะเล) on land. Songkhla Lake is ทะเลสาบสงขลา."],
    ["ถ้ำ", "tham", "cave", "Thailand has many caves with Buddha images."],
    ["ท้องฟ้า", "thong fa", "sky", "ฟ้า on its own also means sky."],
    ["ดวงอาทิตย์", "duang a-thit", "sun", "ดวง is a classifier for round shining things; อาทิตย์ = sun (also Sunday)."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "Northern place names like ดอยอินทนนท์ start with ดอย. What does ดอย mean?",
      choices: ["mountain (Northern word)", "lake", "temple", "village"],
      answer: 0,
      explanation: "ดอย is the Northern word for mountain, like ภูเขา in Central Thai.",
    }),
    choose(`${p}c2`, {
      question: "เกาะสมุย, เกาะพีพี, เกาะช้าง… what are these places?",
      choices: ["Islands", "Waterfalls", "Caves", "Rivers"],
      answer: 0,
      explanation: "เกาะ (ko) = island. You'll see 'Koh' or 'Ko' in English spellings.",
    }),
    order(`${p}o1`, ["ไป", "ทะเล", "กัน"], "Let's go to the sea", "ไป (go) + ทะเล (sea) + กัน (together / let's)."),
  ]),

  // ───────────── Slang ─────────────
  "slang/thai-slang": pack("thai-slang", [
    ["ชิลๆ", "chill chill", "chilled / relaxed", "From English 'chill', doubled for a laid-back feel."],
    ["ปัง", "pang", "awesome / a big hit", "Like 'bang!'. ปังมาก = totally awesome."],
    ["จริงดิ", "jing di", "really?!", "Casual version of จริงเหรอ (really?)."],
    ["มั่ว", "mua", "messy / making it up", "มั่ว = guessing or doing it any old way."],
    ["เป๊ะ", "pe", "perfect / spot on", "ตรงเวลาเป๊ะ = exactly on time."],
    ["แซ่บ", "saep", "spicy-delicious (Isan word)", "From Isan; now used everywhere for tasty spicy food."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "A Thai friend texts you 555. What does it mean?",
      choices: ["hahaha", "555 baht", "call me", "goodbye"],
      answer: 0,
      explanation: "ห้า (5) is pronounced 'ha', so 555 = 'hahaha'!",
    }),
    choose(`${p}c2`, {
      question: "You taste a great som tam. Which slang fits?",
      choices: ["แซ่บมาก", "มั่วมาก", "เบื่อมาก", "เหงามาก"],
      answer: 0,
      explanation: "แซ่บ = spicy and delicious, perfect for Isan food like ส้มตำ.",
    }),
    order(`${p}o1`, ["ชุด", "นี้", "ปัง", "มาก"], "This outfit is awesome", "ชุด (outfit) + นี้ (this) + ปัง (awesome) + มาก (very)."),
  ]),

  "slang/casual-speech": pack("casual-speech", [
    ["ว่าไง", "wa ngai", "what's up?", "A casual hello between friends."],
    ["จ้า", "ja", "yes~ / OK~ (friendly)", "A cute, friendly 'yes', common among women and in texts."],
    ["เปล่า", "plao", "no / not really", "Answer to 'did you…?' questions: เปล่า = nope."],
    ["แป๊บนึง", "paep neung", "just a sec", "Casual version of สักครู่ (a moment)."],
    ["ช่างมัน", "chang man", "forget it / whatever", "Let it go. Close to ไม่เป็นไร, but more casual."],
    ["ไปไหน", "pai nai", "where are you going?", "Often just a friendly greeting, like 'how's it going?'."],
  ], (p) => [
    choose(`${p}c1`, {
      question: "With whom is it OK to drop ครับ / ค่ะ?",
      choices: ["Close friends", "Your boss", "A monk", "A police officer"],
      answer: 0,
      explanation: "Casual speech without particles is for close friends. Keep ครับ / ค่ะ for everyone else.",
    }),
    choose(`${p}c2`, {
      question: "A friend asks ไปไหน as you pass by. A natural casual answer is…",
      choices: ["ไปกินข้าว", "ยินดีที่ได้รู้จัก", "ขอโทษครับ", "ลาก่อน"],
      answer: 0,
      explanation: "Just say where you're going: ไปกินข้าว = going to eat. It's really a greeting, so nobody expects details.",
    }),
    order(`${p}o1`, ["กิน", "อะไร", "ดี"], "What should we eat?", "กิน (eat) + อะไร (what) + ดี (good). The ดี makes it 'what would be good to…?'."),
  ]),
};
