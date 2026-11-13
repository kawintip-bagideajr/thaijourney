/**
 * Profile cosmetics dropped by regional guardians.
 *
 * Shared by the client (collection, equip, display) and /api/boss (the server
 * rolls drops inside the battle transaction, so the client never picks loot).
 */
import type { CSSProperties } from "react";

export type CosmeticKind = "avatar" | "banner" | "frame" | "title";
export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface Cosmetic {
  id: string;
  kind: CosmeticKind;
  rarity: Rarity;
  boss: string;
  name_en: string;
  name_th: string;
  /** Avatar: the emoji avatar itself. */
  avatar?: string;
  /** Banner: profile cover gradient + pattern. */
  banner?: { from: string; to: string; pattern?: "dots" | "waves" | "stars" };
  /** Frame: ring around the avatar (CSS background) + optional corner badge. */
  frame?: { ring: string; badge?: string };
  /** Title: shown under the player's name. */
  title?: { th: string; en: string };
}

export const RARITY: Record<Rarity, { label_th: string; label_en: string; color: string; glow: string; weight: number }> = {
  common:    { label_th: "ธรรมดา",  label_en: "Common",    color: "#8a9bb0", glow: "rgba(138,155,176,.35)", weight: 60 },
  rare:      { label_th: "หายาก",   label_en: "Rare",      color: "#2b9be0", glow: "rgba(43,155,224,.4)",  weight: 28 },
  epic:      { label_th: "มหากาพย์", label_en: "Epic",      color: "#a855f7", glow: "rgba(168,85,247,.45)", weight: 10 },
  legendary: { label_th: "ตำนาน",   label_en: "Legendary", color: "#f59e0b", glow: "rgba(245,158,11,.55)", weight: 2 },
};

export const KIND_LABEL: Record<CosmeticKind, { th: string; en: string; emoji: string }> = {
  avatar: { th: "อวาตาร์", en: "Avatar", emoji: "🙂" },
  banner: { th: "ปกโปรไฟล์", en: "Banner", emoji: "🖼️" },
  frame:  { th: "กรอบรูป", en: "Frame", emoji: "💠" },
  title:  { th: "ฉายา", en: "Title", emoji: "🏷️" },
};

type Def = Omit<Cosmetic, "boss" | "kind" | "rarity">;
interface BossLoot {
  boss: string;
  avatars: [Def, Def];   // common, rare
  banners: [Def, Def];   // common, epic
  frames: [Def, Def];    // rare, legendary
  titles: [Def, Def];    // common, rare
}

const ring = (...stops: string[]) => `conic-gradient(from 210deg, ${[...stops, stops[0]].join(", ")})`;

const LOOT: BossLoot[] = [
  {
    boss: "yak_wat_arun",
    avatars: [
      { id: "av_temple", name_en: "Little Temple", name_th: "วัดน้อย", avatar: "🛕" },
      { id: "av_yak", name_en: "Giant Buddy", name_th: "ยักษ์จอมป่วน", avatar: "👹" },
    ],
    banners: [
      { id: "bn_chao_phraya", name_en: "Chao Phraya", name_th: "เจ้าพระยา", banner: { from: "#38bdf8", to: "#14b8a6", pattern: "waves" } },
      { id: "bn_dawn", name_en: "Temple of Dawn", name_th: "แสงอรุณ", banner: { from: "#fb923c", to: "#ec4899", pattern: "stars" } },
    ],
    frames: [
      { id: "fr_porcelain", name_en: "Porcelain Mosaic", name_th: "กระเบื้องเคลือบ", frame: { ring: ring("#60a5fa", "#ffffff", "#f472b6", "#ffffff") } },
      { id: "fr_giant_gold", name_en: "Giant's Gold", name_th: "ทองยักษ์", frame: { ring: ring("#fde047", "#f59e0b", "#fff7cc", "#d97706"), badge: "👑" } },
    ],
    titles: [
      { id: "tt_giant_slayer", name_en: "Giant Slayer", name_th: "ผู้พิชิตยักษ์", title: { th: "ผู้พิชิตยักษ์", en: "Giant Slayer" } },
      { id: "tt_lord_dawn", name_en: "Keeper of Dawn", name_th: "ผู้เฝ้ารุ่งอรุณ", title: { th: "ผู้เฝ้ารุ่งอรุณ", en: "Keeper of Dawn" } },
    ],
  },
  {
    boss: "naga_doi_suthep",
    avatars: [
      { id: "av_sakura", name_en: "Mountain Blossom", name_th: "ดอกพญาเสือโคร่ง", avatar: "🌸" },
      { id: "av_naga_north", name_en: "Baby Naga", name_th: "พญานาคน้อย", avatar: "🐍" },
    ],
    banners: [
      { id: "bn_misty_doi", name_en: "Misty Doi", name_th: "ดอยหมอก", banner: { from: "#a78bfa", to: "#c4b5fd", pattern: "waves" } },
      { id: "bn_yi_peng", name_en: "Lantern Night", name_th: "คืนยี่เป็ง", banner: { from: "#312e81", to: "#f97316", pattern: "stars" } },
    ],
    frames: [
      { id: "fr_naga_scales", name_en: "Naga Scales", name_th: "เกล็ดนาคา", frame: { ring: ring("#34d399", "#065f46", "#6ee7b7", "#047857") } },
      { id: "fr_golden_stupa", name_en: "Golden Stupa", name_th: "พระธาตุทอง", frame: { ring: ring("#fcd34d", "#b45309", "#fef3c7", "#f59e0b"), badge: "🛕" } },
    ],
    titles: [
      { id: "tt_climber", name_en: "Mountain Climber", name_th: "นักปีนดอย", title: { th: "นักปีนดอย", en: "Mountain Climber" } },
      { id: "tt_naga_friend", name_en: "Friend of the Naga", name_th: "สหายพญานาค", title: { th: "สหายพญานาค", en: "Friend of the Naga" } },
    ],
  },
  {
    boss: "phi_ta_khon",
    avatars: [
      { id: "av_rice", name_en: "Sticky Rice", name_th: "ข้าวเหนียว", avatar: "🌾" },
      { id: "av_mask", name_en: "Festival Mask", name_th: "หน้ากากผีตาโขน", avatar: "👺" },
    ],
    banners: [
      { id: "bn_rice_field", name_en: "Rice Fields", name_th: "ทุ่งนา", banner: { from: "#a3e635", to: "#facc15", pattern: "dots" } },
      { id: "bn_ghost_fest", name_en: "Ghost Festival", name_th: "งานบุญหลวง", banner: { from: "#ef4444", to: "#a855f7", pattern: "dots" } },
    ],
    frames: [
      { id: "fr_mask_stripes", name_en: "Mask Stripes", name_th: "ลายหน้ากาก", frame: { ring: ring("#ef4444", "#facc15", "#22c55e", "#3b82f6") } },
      { id: "fr_isan_silk", name_en: "Isan Silk", name_th: "ไหมอีสาน", frame: { ring: ring("#f472b6", "#7c3aed", "#fbbf24", "#db2777"), badge: "🧵" } },
    ],
    titles: [
      { id: "tt_spicy", name_en: "Spicy Soul", name_th: "สายแซ่บ", title: { th: "สายแซ่บ", en: "Spicy Soul" } },
      { id: "tt_phi_ta_khon", name_en: "Festival Spirit", name_th: "วิญญาณงานบุญ", title: { th: "วิญญาณงานบุญ", en: "Festival Spirit" } },
    ],
  },
  {
    boss: "yak_nang_talung",
    avatars: [
      { id: "av_crab", name_en: "Beach Crab", name_th: "ปูทะเล", avatar: "🦀" },
      { id: "av_merfolk", name_en: "Sea Friend", name_th: "เงือกน้อย", avatar: "🧜" },
    ],
    banners: [
      { id: "bn_andaman", name_en: "Andaman Sea", name_th: "ทะเลอันดามัน", banner: { from: "#22d3ee", to: "#2563eb", pattern: "waves" } },
      { id: "bn_shadow_play", name_en: "Shadow Play", name_th: "จอหนังตะลุง", banner: { from: "#f59e0b", to: "#e11d48", pattern: "dots" } },
    ],
    frames: [
      { id: "fr_coral", name_en: "Coral Reef", name_th: "ปะการัง", frame: { ring: ring("#fb7185", "#fdba74", "#f472b6", "#fecdd3") } },
      { id: "fr_pearl", name_en: "Andaman Pearl", name_th: "ไข่มุกอันดามัน", frame: { ring: ring("#ffffff", "#e0f2fe", "#f5d0fe", "#ffffff"), badge: "🦪" } },
    ],
    titles: [
      { id: "tt_voyager", name_en: "Southern Voyager", name_th: "นักเดินทางทะเลใต้", title: { th: "นักเดินทางทะเลใต้", en: "Southern Voyager" } },
      { id: "tt_puppet_master", name_en: "Puppet Master", name_th: "นายหนังตะลุง", title: { th: "นายหนังตะลุง", en: "Puppet Master" } },
    ],
  },
  {
    boss: "hanuman_lopburi",
    avatars: [
      { id: "av_monkey", name_en: "Cheeky Monkey", name_th: "ลิงจอมซน", avatar: "🐒" },
      { id: "av_see_no_evil", name_en: "Shy Monkey", name_th: "ลิงขี้อาย", avatar: "🙈" },
    ],
    banners: [
      { id: "bn_sunflower", name_en: "Sunflower Field", name_th: "ทุ่งทานตะวัน", banner: { from: "#fde047", to: "#fb923c", pattern: "dots" } },
      { id: "bn_ramakien", name_en: "Ramakien Epic", name_th: "รามเกียรติ์", banner: { from: "#10b981", to: "#eab308", pattern: "stars" } },
    ],
    frames: [
      { id: "fr_monkey_tail", name_en: "Monkey Tails", name_th: "หางลิง", frame: { ring: ring("#a16207", "#fde68a", "#ca8a04", "#fef3c7") } },
      { id: "fr_white_flame", name_en: "White Flame", name_th: "เปลวไฟขาว", frame: { ring: ring("#ffffff", "#93c5fd", "#fde68a", "#e0e7ff"), badge: "🔥" } },
    ],
    titles: [
      { id: "tt_monkey_pal", name_en: "Monkey Pal", name_th: "เพื่อนลิงลพบุรี", title: { th: "เพื่อนลิงลพบุรี", en: "Monkey Pal" } },
      { id: "tt_ramakien", name_en: "Ramakien Hero", name_th: "วีรชนรามเกียรติ์", title: { th: "วีรชนรามเกียรติ์", en: "Ramakien Hero" } },
    ],
  },
  {
    boss: "kinnaree_nan",
    avatars: [
      { id: "av_canoe", name_en: "Race Boat", name_th: "เรือแข่ง", avatar: "🛶" },
      { id: "av_peacock", name_en: "Peacock", name_th: "นกยูง", avatar: "🦚" },
    ],
    banners: [
      { id: "bn_nan_valley", name_en: "Nan Valley", name_th: "หุบเขาน่าน", banner: { from: "#4ade80", to: "#38bdf8", pattern: "waves" } },
      { id: "bn_himmaphan", name_en: "Himmaphan Forest", name_th: "ป่าหิมพานต์", banner: { from: "#8b5cf6", to: "#14b8a6", pattern: "stars" } },
    ],
    frames: [
      { id: "fr_feathers", name_en: "Feather Crown", name_th: "มงกุฎขนนก", frame: { ring: ring("#22d3ee", "#a78bfa", "#34d399", "#60a5fa") } },
      { id: "fr_kinnaree_wings", name_en: "Kinnaree Wings", name_th: "ปีกกินรี", frame: { ring: ring("#f0abfc", "#fde68a", "#c4b5fd", "#fbcfe8"), badge: "🦋" } },
    ],
    titles: [
      { id: "tt_boat_racer", name_en: "Boat Racer", name_th: "นักพายเรือ", title: { th: "นักพายเรือ", en: "Boat Racer" } },
      { id: "tt_himmaphan", name_en: "Himmaphan Keeper", name_th: "ผู้พิทักษ์หิมพานต์", title: { th: "ผู้พิทักษ์หิมพานต์", en: "Himmaphan Keeper" } },
    ],
  },
  {
    boss: "naga_mekong",
    avatars: [
      { id: "av_sunset", name_en: "Mekong Sunset", name_th: "ตะวันริมโขง", avatar: "🌅" },
      { id: "av_dragon", name_en: "Mekong Naga", name_th: "พญานาคแม่โขง", avatar: "🐉" },
    ],
    banners: [
      { id: "bn_mekong", name_en: "Mekong Dusk", name_th: "โขงยามเย็น", banner: { from: "#fb923c", to: "#7c3aed", pattern: "waves" } },
      { id: "bn_fireballs", name_en: "Naga Fireballs", name_th: "บั้งไฟพญานาค", banner: { from: "#1e3a8a", to: "#ef4444", pattern: "dots" } },
    ],
    frames: [
      { id: "fr_ripple", name_en: "River Ripple", name_th: "ระลอกน้ำ", frame: { ring: ring("#7dd3fc", "#0369a1", "#bae6fd", "#0284c7") } },
      { id: "fr_naga_fire", name_en: "Naga Fire", name_th: "ไฟพญานาค", frame: { ring: ring("#f87171", "#fb923c", "#fde047", "#dc2626"), badge: "🔥" } },
    ],
    titles: [
      { id: "tt_mekong_child", name_en: "Child of the Mekong", name_th: "ลูกแม่น้ำโขง", title: { th: "ลูกแม่น้ำโขง", en: "Child of the Mekong" } },
      { id: "tt_fireball", name_en: "Fireball Witness", name_th: "ผู้เห็นบั้งไฟ", title: { th: "ผู้เห็นบั้งไฟ", en: "Fireball Witness" } },
    ],
  },
  {
    boss: "manora_south",
    avatars: [
      { id: "av_hibiscus", name_en: "Hibiscus", name_th: "ดอกชบา", avatar: "🌺" },
      { id: "av_swan", name_en: "Swan Dancer", name_th: "หงส์ร่ายรำ", avatar: "🦢" },
    ],
    banners: [
      { id: "bn_south_sunrise", name_en: "Southern Sunrise", name_th: "อรุณแดนใต้", banner: { from: "#f9a8d4", to: "#fb923c", pattern: "waves" } },
      { id: "bn_nora", name_en: "Nora Dance", name_th: "รำโนรา", banner: { from: "#dc2626", to: "#f59e0b", pattern: "stars" } },
    ],
    frames: [
      { id: "fr_nora_beads", name_en: "Nora Beads", name_th: "ลูกปัดโนรา", frame: { ring: ring("#ef4444", "#fde047", "#22c55e", "#ffffff") } },
      { id: "fr_golden_crown", name_en: "Golden Sert Crown", name_th: "เทริดทอง", frame: { ring: ring("#fbbf24", "#fef3c7", "#d97706", "#fde68a"), badge: "👑" } },
    ],
    titles: [
      { id: "tt_nora_dancer", name_en: "Nora Dancer", name_th: "นักรำโนรา", title: { th: "นักรำโนรา", en: "Nora Dancer" } },
      { id: "tt_south_star", name_en: "Star of the South", name_th: "ดาวแห่งปักษ์ใต้", title: { th: "ดาวแห่งปักษ์ใต้", en: "Star of the South" } },
    ],
  },
];

export const COSMETICS: Cosmetic[] = LOOT.flatMap((l) => [
  { ...l.avatars[0], boss: l.boss, kind: "avatar", rarity: "common" },
  { ...l.avatars[1], boss: l.boss, kind: "avatar", rarity: "rare" },
  { ...l.banners[0], boss: l.boss, kind: "banner", rarity: "common" },
  { ...l.banners[1], boss: l.boss, kind: "banner", rarity: "epic" },
  { ...l.frames[0], boss: l.boss, kind: "frame", rarity: "rare" },
  { ...l.frames[1], boss: l.boss, kind: "frame", rarity: "legendary" },
  { ...l.titles[0], boss: l.boss, kind: "title", rarity: "common" },
  { ...l.titles[1], boss: l.boss, kind: "title", rarity: "rare" },
] satisfies Cosmetic[]);

export const COSMETIC_BY_ID: Record<string, Cosmetic> = Object.fromEntries(COSMETICS.map((c) => [c.id, c]));
export const LOOT_BY_BOSS: Record<string, Cosmetic[]> = COSMETICS.reduce<Record<string, Cosmetic[]>>((acc, c) => {
  (acc[c.boss] ??= []).push(c);
  return acc;
}, {});

export const LOOT_RULES = {
  /** Chance of a drop on a repeat win (first win always drops). */
  repeatWinChance: 0.6,
  /** A flawless win rolls one extra time with this chance. */
  flawlessBonusChance: 0.5,
  /** XP given instead when every item of a boss is already owned. */
  duplicateXP: 5,
} as const;

/**
 * Pick one unowned item from a boss's loot table, weighted by rarity.
 * Returns null when the player already owns everything this boss drops.
 */
export function rollLoot(bossId: string, owned: ReadonlySet<string>, rand: () => number = Math.random): Cosmetic | null {
  const pool = (LOOT_BY_BOSS[bossId] ?? []).filter((c) => !owned.has(c.id));
  if (!pool.length) return null;
  const total = pool.reduce((s, c) => s + RARITY[c.rarity].weight, 0);
  let r = rand() * total;
  for (const c of pool) {
    r -= RARITY[c.rarity].weight;
    if (r <= 0) return c;
  }
  return pool[pool.length - 1];
}

// ---------- display helpers ----------
const PATTERNS: Record<NonNullable<NonNullable<Cosmetic["banner"]>["pattern"]>, string> = {
  dots: "radial-gradient(circle at 10px 10px, rgba(255,255,255,.35) 3px, transparent 3.5px) 0 0 / 22px 22px",
  waves: "radial-gradient(ellipse 40px 14px at 50% 100%, rgba(255,255,255,.28) 60%, transparent 62%) 0 0 / 40px 24px",
  stars: "radial-gradient(circle at 20% 30%, rgba(255,255,255,.9) 1.5px, transparent 2px) 0 0 / 46px 46px, radial-gradient(circle at 70% 70%, rgba(255,255,255,.6) 1px, transparent 1.5px) 0 0 / 30px 30px",
};

export function bannerCss(b: NonNullable<Cosmetic["banner"]>): CSSProperties {
  const grad = `linear-gradient(135deg, ${b.from}, ${b.to})`;
  return { background: b.pattern ? `${PATTERNS[b.pattern]}, ${grad}` : grad };
}

/** Cover style for a profile_bg id that is a cosmetic banner, or null if it is not one. */
export function cosmeticBannerStyle(id: string | null | undefined): CSSProperties | null {
  const c = id ? COSMETIC_BY_ID[id] : undefined;
  return c?.banner ? bannerCss(c.banner) : null;
}
