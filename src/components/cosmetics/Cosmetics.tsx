"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { COSMETIC_BY_ID, RARITY, KIND_LABEL, bannerCss, type Cosmetic } from "@/data/cosmetics";
import { cn } from "@/lib/utils";

/** Wraps an avatar with the equipped frame (a coloured ring + optional corner badge). */
export function AvatarFrame({ frameId, children, className, thickness = 4 }: {
  frameId?: string | null;
  children: ReactNode;
  className?: string;
  /** Ring thickness in px. */
  thickness?: number;
}) {
  const frame = frameId ? COSMETIC_BY_ID[frameId]?.frame : undefined;
  if (!frame) return <div className={cn("relative inline-flex shrink-0", className)}>{children}</div>;
  const legendary = COSMETIC_BY_ID[frameId!]?.rarity === "legendary";
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn("rounded-[inherit] inline-flex", legendary && "frame-legendary")}
        style={{ padding: thickness, background: frame.ring, borderRadius: "1.6rem", boxShadow: "0 3px 0 rgba(0,0,0,.12)" }}
      >
        <div className="rounded-[1.2rem] overflow-hidden bg-white inline-flex">{children}</div>
      </div>
      {frame.badge && (
        <span className="absolute -top-2.5 -right-2.5 text-xl drop-shadow-[0_2px_0_rgba(255,255,255,.9)] select-none" aria-hidden="true">
          {frame.badge}
        </span>
      )}
    </div>
  );
}

/** The equipped title as a small pill. Renders nothing if no title is equipped. */
export function TitleTag({ titleId, lang = "th", className }: { titleId?: string | null; lang?: "th" | "en"; className?: string }) {
  const c = titleId ? COSMETIC_BY_ID[titleId] : undefined;
  if (!c?.title) return null;
  const r = RARITY[c.rarity];
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold border-2 bg-white", className)}
      style={{ color: r.color, borderColor: r.color }}
    >
      <span aria-hidden="true">🏷️</span>
      {lang === "th" ? c.title.th : c.title.en}
    </span>
  );
}

/** What an item looks like, small: avatar emoji, banner swatch, frame ring or title text. */
export function CosmeticPreview({ item, size = 56, locked }: { item: Cosmetic; size?: number; locked?: boolean }) {
  const box = { width: size, height: size };
  if (locked) {
    return (
      <div className="rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 font-display text-xl" style={box}>
        ?
      </div>
    );
  }
  if (item.kind === "avatar") {
    return <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center" style={{ ...box, fontSize: size * 0.55 }}>{item.avatar}</div>;
  }
  if (item.kind === "banner" && item.banner) {
    return <div className="rounded-2xl border-2 border-white shadow-[0_3px_0_rgba(0,0,0,.08)]" style={{ ...box, ...bannerCss(item.banner) }} />;
  }
  if (item.kind === "frame" && item.frame) {
    return (
      <div className="relative" style={box}>
        <div className="rounded-2xl w-full h-full" style={{ padding: 5, background: item.frame.ring }}>
          <div className="rounded-xl bg-white w-full h-full flex items-center justify-center text-lg">🙂</div>
        </div>
        {item.frame.badge && <span className="absolute -top-2 -right-2 text-base" aria-hidden="true">{item.frame.badge}</span>}
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-white border-2 flex items-center justify-center text-center px-1 text-[10px] font-extrabold leading-tight"
      style={{ ...box, borderColor: RARITY[item.rarity].color, color: RARITY[item.rarity].color }}>
      {item.title?.th}
    </div>
  );
}

export function RarityPill({ rarity, className }: { rarity: Cosmetic["rarity"]; className?: string }) {
  const r = RARITY[rarity];
  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-black text-white", className)} style={{ background: r.color }}>
      {r.label_th}
    </span>
  );
}

/** Loot reveal shown after beating a guardian: a chest that pops open into the item card. */
export function LootReveal({ ids }: { ids: string[] }) {
  const items = ids.map((id) => COSMETIC_BY_ID[id]).filter(Boolean);
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-center font-display text-base text-gray-900">🎁 ของรางวัลตก!</p>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((item, i) => {
          const r = RARITY[item.rarity];
          return (
            <motion.div
              key={item.id}
              initial={{ scale: 0.3, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.25 + i * 0.25 }}
              className="game-card p-3 w-36 text-center"
              style={{ borderColor: r.color, boxShadow: `0 5px 0 ${r.color}, 0 0 24px ${r.glow}` }}
            >
              <div className="flex justify-center mb-2"><CosmeticPreview item={item} size={64} /></div>
              <RarityPill rarity={item.rarity} />
              <p className="font-display text-sm text-gray-900 leading-tight mt-1">{item.name_th}</p>
              <p className="text-[10px] font-bold text-gray-400">{KIND_LABEL[item.kind].th} · {item.name_en}</p>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center text-[11px] font-bold text-gray-500">ไปใส่ได้ที่หน้าโปรไฟล์ → คอลเลกชัน</p>
    </div>
  );
}
