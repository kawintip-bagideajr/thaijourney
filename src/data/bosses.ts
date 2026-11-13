import { PROVINCES, type ProvinceData } from "./provinces";
import { EXTRA_BOSSES } from "./bosses-extra";
import { ADVENTURE_BY_PROVINCE } from "./content";

/**
 * Regional Guardians — one boss per region of Thailand, drawn from Thai legend.
 * Beat a guardian in a quiz battle to earn that region's passport stamp.
 *
 * This file is shared by the battle page (client) and /api/boss (server).
 * The server replays the submitted answers with `simulateBattle`, so the
 * client can never award itself a win.
 */

export interface BossQuestion {
  id: string;
  instruction: string;
  /** Big text shown on the card (usually Thai). */
  prompt: string;
  romanization?: string;
  /** Exactly 4 choices; `answer` is the index of the correct one. */
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
}

export interface BossData {
  id: string;
  region: "Central" | "North" | "Northeast" | "South";
  name_en: string;
  name_th: string;
  emoji: string;
  /** Short legend shown on the intro screen. */
  legend: string;
  /** Battle cry shown + spoken at the start (Thai). */
  taunt_th: string;
  taunt_en: string;
  color: string;
  hp: number;
  stamp_th: string;
  questions: BossQuestion[];
  /** XP needed to challenge. Fixed per boss so new provinces never move an existing guardian. */
  unlockXP: number;
  /** 1 = first guardian of the region, 2 = the stronger second guardian. */
  tier?: 1 | 2;
}

export const BOSS_RULES = {
  playerHearts: 3,
  secondsPerQuestion: 15,
  /** From this many correct answers in a row, each hit does double damage. */
  comboForDouble: 3,
  maxAnswers: 40,
  xpFirstWin: 50,
  xpRepeatWin: 10,
  xpFlawlessBonus: 20,
  xpLoss: 5,
} as const;

export const BOSSES: BossData[] = [
  {
    id: "yak_wat_arun",
    unlockXP: 150,
    tier: 1,
    region: "Central",
    name_en: "Giant Guardian of Wat Arun",
    name_th: "ยักษ์วัดแจ้ง",
    emoji: "👹",
    legend:
      "Legend says the giant of Wat Arun once fought the giant of Wat Pho over a debt, flattening the land into Tha Tien. Now he guards the Chao Phraya and only lets polite travellers pass.",
    taunt_th: "เจ้ามนุษย์ พูดไทยให้สุภาพหน่อย!",
    taunt_en: "Human! Speak Thai politely to me!",
    color: "#10B981",
    hp: 10,
    stamp_th: "ภาคกลาง",
    questions: [
      { id: "ya1", instruction: "What does this mean?", prompt: "ขอบคุณครับ", romanization: "khàwp khun khráp", choices: ["Excuse me", "Thank you", "Goodbye", "Sorry"], answer: 1, explanation: "ขอบคุณ = thank you. Men add ครับ, women add ค่ะ to sound polite." },
      { id: "ya2", instruction: "A woman ends a polite sentence with…", prompt: "สวัสดี___", choices: ["ครับ", "ค่ะ", "จ้ะ", "นะ"], answer: 1, explanation: "Women use ค่ะ (khâ) for statements; men use ครับ (khráp)." },
      { id: "ya3", instruction: "What does this mean?", prompt: "วัด", romanization: "wát", choices: ["Palace", "Market", "Temple", "River"], answer: 2, explanation: "วัด = Buddhist temple. Wat Arun = Temple of Dawn." },
      { id: "ya4", instruction: "What does this mean?", prompt: "แม่น้ำ", romanization: "mâe náam", choices: ["Mother", "River", "Rain", "Sea"], answer: 1, explanation: "แม่ (mother) + น้ำ (water) = river, literally 'mother of waters'. แม่น้ำเจ้าพระยา = Chao Phraya River." },
      { id: "ya5", instruction: "How do you say 'Sorry / Excuse me'?", prompt: "Sorry", choices: ["ไม่เป็นไร", "ขอโทษ", "สบายดี", "เท่าไหร่"], answer: 1, explanation: "ขอโทษ (khǎw thôht) = sorry / excuse me. ไม่เป็นไร = never mind." },
      { id: "ya6", instruction: "The traditional Thai greeting with palms together is called…", prompt: "🙏", choices: ["ไหว้ (wâi)", "กราบ (gràap)", "ยิ้ม (yím)", "จับมือ (jàp mue)"], answer: 0, explanation: "ไหว้ (wâi). The higher your hands, the more respect you show." },
      { id: "ya7", instruction: "What does this mean?", prompt: "ไม่เป็นไร", romanization: "mâi pen rai", choices: ["Never mind / no problem", "I don't know", "Not delicious", "Don't go"], answer: 0, explanation: "ไม่เป็นไร = it's fine, no worries. You'll hear it many times a day in Thailand." },
      { id: "ya8", instruction: "Ayutthaya was Thailand's…", prompt: "อยุธยา", romanization: "a-yút-tha-yaa", choices: ["Beach resort", "Old royal capital", "Northern mountain", "Floating market"], answer: 1, explanation: "Ayutthaya was the capital of Siam for over 400 years (1350–1767)." },
      { id: "ya9", instruction: "What does this mean?", prompt: "เท่าไหร่", romanization: "thâo rài", choices: ["Where?", "When?", "How much?", "Who?"], answer: 2, explanation: "อันนี้เท่าไหร่ = How much is this?" },
      { id: "ya10", instruction: "What does this mean?", prompt: "ยักษ์", romanization: "yák", choices: ["Ghost", "Giant", "Angel", "Dragon"], answer: 1, explanation: "ยักษ์ = giant / ogre guardian, often seen at temple gates." },
    ],
  },
  {
    id: "naga_doi_suthep",
    unlockXP: 300,
    tier: 1,
    region: "North",
    name_en: "Naga of Doi Suthep",
    name_th: "พญานาคดอยสุเทพ",
    emoji: "🐉",
    legend:
      "Two great serpents form the 306-step staircase up to Wat Phra That Doi Suthep. The Naga king tests every pilgrim: answer the northern way, or start climbing again.",
    taunt_th: "ขึ้นบันไดนาคได้ ต้องตอบให้ถูก!",
    taunt_en: "To climb the Naga stairs, you must answer correctly!",
    color: "#8B5CF6",
    hp: 12,
    stamp_th: "ภาคเหนือ",
    questions: [
      { id: "nd1", instruction: "What does this mean?", prompt: "ภูเขา", romanization: "phuu khǎo", choices: ["Mountain", "Waterfall", "Forest", "Cave"], answer: 0, explanation: "ภูเขา = mountain. ดอย (doi) is the northern word for mountain." },
      { id: "nd2", instruction: "In northern dialect, 'doi' (ดอย) means…", prompt: "ดอย", romanization: "dawy", choices: ["Lake", "Mountain", "Temple", "Village"], answer: 1, explanation: "Many northern peaks start with ดอย, like ดอยสุเทพ and ดอยอินทนนท์." },
      { id: "nd3", instruction: "What does this mean?", prompt: "หนาว", romanization: "nǎao", choices: ["Hot", "Cold", "Rainy", "Windy"], answer: 1, explanation: "หนาว = cold. The north gets chilly in December and January." },
      { id: "nd4", instruction: "A northern 'hello' you might hear in Chiang Mai:", prompt: "Northern greeting", choices: ["สวัสดีเจ้า", "หวัดดีจ้ะ", "อรุณสวัสดิ์", "ลาก่อน"], answer: 0, explanation: "เจ้า (jâo) is the northern polite particle, like ค่ะ/ครับ." },
      { id: "nd5", instruction: "What does this mean?", prompt: "ขึ้น", romanization: "khêun", choices: ["Go down", "Go up", "Go in", "Go out"], answer: 1, explanation: "ขึ้น = to go up / climb. ขึ้นบันได = climb the stairs." },
      { id: "nd6", instruction: "What does this mean?", prompt: "บันได", romanization: "ban-dai", choices: ["Bridge", "Stairs", "Door", "Road"], answer: 1, explanation: "บันได = stairs / ladder." },
      { id: "nd7", instruction: "Northern Thailand's famous curry noodle soup is…", prompt: "🍜", choices: ["ต้มยำ", "ข้าวซอย", "ผัดไทย", "ส้มตำ"], answer: 1, explanation: "ข้าวซอย (khâo sawy): coconut curry noodles with crispy noodles on top." },
      { id: "nd8", instruction: "What does this mean?", prompt: "กินข้าวแล้วหรือยัง", romanization: "gin khâo láew rǔe yang", choices: ["Are you hungry?", "Have you eaten yet?", "What will you eat?", "Is it delicious?"], answer: 1, explanation: "Thais often ask this instead of 'how are you?'. It means they care whether you're OK." },
      { id: "nd9", instruction: "The old northern kingdom centred on Chiang Mai was…", prompt: "อาณาจักร…", choices: ["ล้านนา (Lanna)", "ล้านช้าง (Lan Xang)", "สุโขทัย (Sukhothai)", "ทวารวดี (Dvaravati)"], answer: 0, explanation: "ล้านนา = 'a million rice fields', founded 1296 with Chiang Mai as capital." },
      { id: "nd10", instruction: "What does this mean?", prompt: "นาค", romanization: "nâak", choices: ["Tiger", "Serpent / Naga", "Elephant", "Bird"], answer: 1, explanation: "นาค / พญานาค = the mythical serpent guardian of water and temples." },
    ],
  },
  {
    id: "phi_ta_khon",
    unlockXP: 180,
    tier: 1,
    region: "Northeast",
    name_en: "Phi Ta Khon Spirit",
    name_th: "ผีตาโขน",
    emoji: "👺",
    legend:
      "Every year in Dan Sai, Loei, colourful masked spirits dance through the streets for the Phi Ta Khon festival. This mischievous spirit will only stop dancing for someone who knows Isan.",
    taunt_th: "มาเต้นกับข้อยบ่? ตอบให้ได้ก่อน!",
    taunt_en: "Wanna dance with me? Answer first!",
    color: "#EF4444",
    hp: 10,
    stamp_th: "ภาคอีสาน",
    questions: [
      { id: "pt1", instruction: "Isan's famous spicy papaya salad is…", prompt: "🥗", choices: ["ส้มตำ", "ลาบ", "ต้มยำ", "แกงเขียวหวาน"], answer: 0, explanation: "ส้มตำ (sôm tam): green papaya pounded with chilli, lime and fish sauce." },
      { id: "pt2", instruction: "What does this mean?", prompt: "เผ็ด", romanization: "phèt", choices: ["Sweet", "Sour", "Spicy", "Salty"], answer: 2, explanation: "เผ็ด = spicy. ไม่เผ็ด = not spicy." },
      { id: "pt3", instruction: "In Isan dialect, 'บ่' (bɔ̀) means…", prompt: "บ่", choices: ["Yes", "No / not", "Very", "Please"], answer: 1, explanation: "บ่ = ไม่ (not). บ่เป็นหยัง = ไม่เป็นไร (no problem)." },
      { id: "pt4", instruction: "What does this mean?", prompt: "ข้าวเหนียว", romanization: "khâo nǐao", choices: ["Fried rice", "Sticky rice", "Rice soup", "Rice noodles"], answer: 1, explanation: "ข้าวเหนียว = sticky rice, eaten with your hands in Isan." },
      { id: "pt5", instruction: "What does this mean?", prompt: "หน้ากาก", romanization: "nâa gàak", choices: ["Mask", "Hat", "Face", "Costume"], answer: 0, explanation: "หน้า (face) + กาก = mask." },
      { id: "pt6", instruction: "What does this mean?", prompt: "เต้น", romanization: "tên", choices: ["Sing", "Dance", "Run", "Sleep"], answer: 1, explanation: "เต้น = to dance. เต้นรำ = dancing." },
      { id: "pt7", instruction: "Isan minced-meat salad with toasted rice is…", prompt: "🌿", choices: ["ลาบ", "แกงส้ม", "ข้าวมันไก่", "ผัดกะเพรา"], answer: 0, explanation: "ลาบ (lâap): minced meat, herbs, lime and roasted rice powder." },
      { id: "pt8", instruction: "What does this mean?", prompt: "ผี", romanization: "phǐi", choices: ["Ghost / spirit", "Monk", "Friend", "King"], answer: 0, explanation: "ผี = ghost or spirit. ผีตาโขน = the Phi Ta Khon spirits." },
      { id: "pt9", instruction: "What does this mean?", prompt: "อร่อย", romanization: "a-ròi", choices: ["Expensive", "Delicious", "Hungry", "Full"], answer: 1, explanation: "อร่อยมาก = very delicious! Isan people use แซ่บ (sâep) too." },
      { id: "pt10", instruction: "Isan slang 'แซ่บ' (sâep) means…", prompt: "แซ่บ", choices: ["Tasty & spicy", "Tired", "Beautiful", "Angry"], answer: 0, explanation: "แซ่บ = delicious with a kick. You'll hear it all over Thailand now." },
    ],
  },
  {
    id: "yak_nang_talung",
    unlockXP: 400,
    tier: 1,
    region: "South",
    name_en: "Shadow-Puppet Giant",
    name_th: "ยักษ์หนังตะลุง",
    emoji: "🎭",
    legend:
      "In the southern shadow-puppet theatre (หนังตะลุง), the puppet master brings giants to life behind a glowing screen. Tonight one giant has stepped off the screen and is blocking the road to the Andaman Sea.",
    taunt_th: "อยากไปทะเล ต้องผ่านข้าไปก่อน!",
    taunt_en: "Want to reach the sea? Get past me first!",
    color: "#0EA5E9",
    hp: 14,
    stamp_th: "ภาคใต้",
    questions: [
      { id: "ns1", instruction: "What does this mean?", prompt: "ทะเล", romanization: "tha-lee", choices: ["River", "Sea", "Island", "Beach"], answer: 1, explanation: "ทะเล = sea. ทะเลสวยมาก = the sea is very beautiful." },
      { id: "ns2", instruction: "What does this mean?", prompt: "เกาะ", romanization: "gàw", choices: ["Island", "Boat", "Bay", "Cave"], answer: 0, explanation: "เกาะ = island. เกาะสมุย = Koh Samui, เกาะพีพี = Koh Phi Phi." },
      { id: "ns3", instruction: "What does this mean?", prompt: "เรือ", romanization: "ruea", choices: ["Car", "Train", "Boat", "Plane"], answer: 2, explanation: "เรือ = boat. เรือหางยาว = long-tail boat." },
      { id: "ns4", instruction: "How do you say 'beach'?", prompt: "Beach", choices: ["ชายหาด", "ภูเขา", "น้ำตก", "ป่า"], answer: 0, explanation: "ชายหาด (chaai hàat) = beach. Also just หาด, like หาดป่าตอง (Patong Beach)." },
      { id: "ns5", instruction: "What does this mean?", prompt: "ร้อน", romanization: "ráwn", choices: ["Cold", "Hot", "Wet", "Cool"], answer: 1, explanation: "ร้อน = hot. ร้อนมาก = very hot, which the south is for most of the year." },
      { id: "ns6", instruction: "What does this mean?", prompt: "ว่ายน้ำ", romanization: "wâai náam", choices: ["Drink water", "Swim", "Fish", "Dive"], answer: 1, explanation: "ว่าย (swim) + น้ำ (water) = to swim." },
      { id: "ns7", instruction: "Southern Thai food is famous for being…", prompt: "อาหารใต้", choices: ["Very sweet", "Very spicy", "Very bland", "Always cold"], answer: 1, explanation: "Southern curries like แกงไตปลา and คั่วกลิ้ง are among the spiciest in Thailand." },
      { id: "ns8", instruction: "What does this mean?", prompt: "หนังตะลุง", romanization: "nǎng ta-lung", choices: ["Shadow puppet show", "Boxing match", "Boat race", "Night market"], answer: 0, explanation: "หนัง (leather) + ตะลุง: leather puppets performed behind a lit screen." },
      { id: "ns9", instruction: "How do you ask 'Where is the beach?'", prompt: "Where is the beach?", choices: ["ชายหาดอยู่ที่ไหน", "ชายหาดเท่าไหร่", "ชายหาดสวยไหม", "ไปชายหาดไหม"], answer: 0, explanation: "…อยู่ที่ไหน (yùu thîi nǎi) = where is …?" },
      { id: "ns10", instruction: "What does this mean?", prompt: "ปลา", romanization: "plaa", choices: ["Shrimp", "Crab", "Fish", "Squid"], answer: 2, explanation: "ปลา = fish. Shrimp = กุ้ง, crab = ปู, squid = ปลาหมึก." },
      { id: "ns11", instruction: "What does this mean?", prompt: "สวย", romanization: "sǔai", choices: ["Beautiful", "Big", "Far", "Clean"], answer: 0, explanation: "สวย = beautiful (for places and things, and for women)." },
      { id: "ns12", instruction: "What does this mean?", prompt: "ครีมกันแดด", romanization: "khriim gan dàet", choices: ["Sunscreen", "Swimsuit", "Sunglasses", "Umbrella"], answer: 0, explanation: "กัน (protect) + แดด (sunshine)." },
    ],
  },
  ...EXTRA_BOSSES,
];

export const BOSS_BY_ID: Record<string, BossData> = Object.fromEntries(BOSSES.map((b) => [b.id, b]));

/** The region's provinces on the road before this guardian, in route order. */
export function bossRequiredProvinces(boss: BossData): ProvinceData[] {
  return PROVINCES
    .filter((p) => p.region === boss.region && p.unlock_xp <= boss.unlockXP)
    .sort((a, b) => a.unlock_xp - b.unlock_xp);
}

/** Every adventure stage in those provinces. All of them must be cleared to challenge the guardian. */
export function bossRequiredStages(boss: BossData): string[] {
  return bossRequiredProvinces(boss).flatMap((p) => (ADVENTURE_BY_PROVINCE[p.id] ?? []).map((s) => s.id));
}

/** A tier-2 guardian waits until its region's tier-1 guardian is beaten. */
export function bossPrerequisite(boss: BossData): BossData | undefined {
  if ((boss.tier ?? 1) === 1) return undefined;
  return BOSSES.find((b) => b.region === boss.region && (b.tier ?? 1) === 1);
}

/** XP needed to reach the guardian on the map. */
export function bossUnlockXP(boss: BossData): number {
  return boss.unlockXP;
}

export interface BossGate {
  unlocked: boolean;
  xpOk: boolean;
  stagesDone: number;
  stagesTotal: number;
  /** First province with an unfinished stage, to send the player back to. */
  nextProvince?: ProvinceData;
  /** Guardian that must be beaten first, if not yet beaten. */
  needsBoss?: BossData;
}

/**
 * What stands between the player and this guardian.
 * `completed` holds finished lesson slugs (adventure stage ids); `stamps` is profile.passport_stamps.
 */
export function bossGate(
  boss: BossData,
  totalXP: number,
  completed: ReadonlySet<string>,
  stamps?: Record<string, unknown> | null,
): BossGate {
  const xpOk = totalXP >= boss.unlockXP;
  const stages = bossRequiredStages(boss);
  const stagesDone = stages.filter((id) => completed.has(id)).length;
  const nextProvince = bossRequiredProvinces(boss).find((p) =>
    (ADVENTURE_BY_PROVINCE[p.id] ?? []).some((s) => !completed.has(s.id)));
  const pre = bossPrerequisite(boss);
  const needsBoss = pre && !stamps?.[pre.id] ? pre : undefined;
  return {
    unlocked: xpOk && stagesDone === stages.length && !needsBoss,
    xpOk, stagesDone, stagesTotal: stages.length, nextProvince, needsBoss,
  };
}

export function isBossUnlocked(
  boss: BossData,
  totalXP: number,
  completed: ReadonlySet<string>,
  stamps?: Record<string, unknown> | null,
): boolean {
  return bossGate(boss, totalXP, completed, stamps).unlocked;
}

export interface BattleAnswer {
  qid: string;
  /** Index into the question's original `choices`, or null when time ran out. */
  choice: number | null;
}

export interface BattleResult {
  win: boolean;
  bossHp: number;
  heartsLeft: number;
  correct: number;
  answered: number;
  maxCombo: number;
}

/** Pure, deterministic battle replay used by both the UI and the server. */
export function simulateBattle(boss: BossData, answers: BattleAnswer[]): BattleResult {
  let hp = boss.hp;
  let hearts: number = BOSS_RULES.playerHearts;
  let combo = 0;
  let maxCombo = 0;
  let correct = 0;
  let answered = 0;
  const byId = new Map(boss.questions.map((q) => [q.id, q]));

  for (const a of answers.slice(0, BOSS_RULES.maxAnswers)) {
    if (hp <= 0 || hearts <= 0) break;
    const q = byId.get(a.qid);
    if (!q) continue;
    answered++;
    const { ok, damage, nextCombo } = resolveHit(q, a.choice, combo);
    combo = nextCombo;
    maxCombo = Math.max(maxCombo, combo);
    if (ok) {
      correct++;
      hp = Math.max(0, hp - damage);
    } else {
      hearts--;
    }
  }

  return { win: hp <= 0 && hearts > 0, bossHp: hp, heartsLeft: hearts, correct, answered, maxCombo };
}

export function resolveHit(q: BossQuestion, choice: number | null, combo: number) {
  const ok = choice === q.answer;
  const nextCombo = ok ? combo + 1 : 0;
  const damage = ok ? (nextCombo >= BOSS_RULES.comboForDouble ? 2 : 1) : 0;
  return { ok, damage, nextCombo };
}
