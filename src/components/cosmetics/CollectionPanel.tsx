"use client";
import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuthStore } from "@/store/authStore";
import { COSMETICS, KIND_LABEL, RARITY, type Cosmetic, type CosmeticKind } from "@/data/cosmetics";
import { BOSS_BY_ID } from "@/data/bosses";
import { CosmeticPreview, RarityPill } from "./Cosmetics";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/database";

const KINDS: CosmeticKind[] = ["avatar", "banner", "frame", "title"];

function isEquipped(item: Cosmetic, p: Profile): boolean {
  switch (item.kind) {
    case "avatar": return !!item.avatar && p.avatar_url === item.avatar;
    case "banner": return p.profile_bg === item.id;
    case "frame": return p.equipped_frame === item.id;
    case "title": return p.equipped_title === item.id;
  }
}

/** Profile fields to write when equipping (or taking off) an item. */
function equipPatch(item: Cosmetic, on: boolean): Partial<Profile> {
  switch (item.kind) {
    case "avatar": return { avatar_url: on ? item.avatar ?? null : null };
    case "banner": return { profile_bg: on ? item.id : "thai" };
    case "frame": return { equipped_frame: on ? item.id : null };
    case "title": return { equipped_title: on ? item.id : null };
  }
}

/** The player's cosmetic collection: owned items can be equipped, the rest show where they drop. */
export function CollectionPanel() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [kind, setKind] = useState<CosmeticKind>("frame");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!profile) return null;

  const owned = profile.cosmetics ?? {};
  const items = COSMETICS.filter((c) => c.kind === kind);
  const ownedCount = COSMETICS.filter((c) => owned[c.id]).length;

  const toggle = async (item: Cosmetic) => {
    if (!owned[item.id] || busy) return;
    const patch = { ...equipPatch(item, !isEquipped(item, profile)), updated_at: new Date().toISOString() };
    setBusy(item.id);
    setError(null);
    try {
      await updateDoc(doc(db, "users", profile.id), patch);
      setProfile({ ...profile, ...patch });
    } catch {
      setError("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="game-panel p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg text-gray-900"><span aria-hidden="true">🎒 </span>คอลเลกชัน</h2>
        <span className="text-xs font-black text-gray-500 tabular-nums">{ownedCount}/{COSMETICS.length}</span>
      </div>
      <p className="text-xs font-bold text-gray-500 mb-4">ชนะบอสผู้พิทักษ์บนแผนที่เพื่อรับของแต่งโปรไฟล์ แตะของที่มีเพื่อใส่หรือถอด</p>

      <div className="rounded-2xl border-2 border-[var(--game-edge)] p-1.5 flex gap-1.5 mb-4" role="tablist">
        {KINDS.map((k) => {
          const active = k === kind;
          return (
            <button key={k} role="tab" aria-selected={active} onClick={() => setKind(k)}
              className={cn("flex-1 h-10 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1 min-w-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100",
                active ? "btn-3d bg-orange-500 text-white [--btn-edge:#c2410c]" : "text-gray-500 hover:bg-orange-50")}>
              <span aria-hidden="true">{KIND_LABEL[k].emoji}</span>
              <span className="truncate">{KIND_LABEL[k].th}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((item) => {
          const has = !!owned[item.id];
          const on = has && isEquipped(item, profile);
          const r = RARITY[item.rarity];
          const boss = BOSS_BY_ID[item.boss];
          return (
            <button key={item.id} type="button" onClick={() => toggle(item)} disabled={!has || busy !== null}
              aria-pressed={on}
              aria-label={has ? `${item.name_th}${on ? " (ใส่อยู่)" : ""}` : `ยังไม่ได้รับ ดรอปจาก ${boss?.name_th ?? ""}`}
              className={cn("relative flex flex-col items-center gap-1 rounded-2xl p-2 border-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100",
                has ? "bg-white hover:-translate-y-0.5" : "bg-gray-50 border-dashed border-gray-200 cursor-default",
                on && "bg-orange-50")}
              style={has ? { borderColor: r.color, boxShadow: on ? `0 4px 0 ${r.color}, 0 0 16px ${r.glow}` : `0 3px 0 ${r.color}55` } : undefined}>
              <CosmeticPreview item={item} size={52} locked={!has} />
              {has ? (
                <>
                  <span className="text-[10px] font-extrabold text-gray-800 leading-tight text-center line-clamp-2">{item.name_th}</span>
                  <RarityPill rarity={item.rarity} />
                </>
              ) : (
                <span className="text-[10px] font-bold text-gray-400 leading-tight text-center flex items-center gap-0.5">
                  <Lock size={9} />{boss?.emoji} {boss?.name_th}
                </span>
              )}
              {on && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white text-white flex items-center justify-center">
                  <Check size={13} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-3 text-xs font-bold text-red-500" role="alert">{error}</p>}
    </div>
  );
}
