"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { PROVINCES, type ProvinceData } from "@/data/provinces";
import { ProvinceModal } from "@/components/map/ProvinceModal";
import { BOSSES, bossGate, bossUnlockXP, isBossUnlocked, type BossData } from "@/data/bosses";
import { formatNumber, cn } from "@/lib/utils";
import { Zap, Lock, Star, Check } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { speakThai } from "@/lib/speech";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { ADVENTURE_BY_PROVINCE, stageHref } from "@/data/content";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";


const REGION_COLOR: Record<string, string> = {
  Central: "#F59E0B", North: "#8B5CF6", Northeast: "#EF4444", South: "#0EA5E9",
};
const REGION_TH: Record<string, string> = {
  Central: "ภาคกลาง", North: "ภาคเหนือ", Northeast: "ภาคอีสาน", South: "ภาคใต้",
};

type Stop =
  | { kind: "province"; province: ProvinceData; xp: number }
  | { kind: "boss"; boss: BossData; xp: number };

/** Provinces by unlock XP, with each region's guardian right after its last province. */
const STOPS: Stop[] = (() => {
  const sorted = [...PROVINCES].sort((a, b) => a.unlock_xp - b.unlock_xp);
  const out: Stop[] = [];
  for (const p of sorted) {
    out.push({ kind: "province", province: p, xp: p.unlock_xp });
    for (const b of BOSSES) {
      if (b.region === p.region && bossUnlockXP(b) === p.unlock_xp) out.push({ kind: "boss", boss: b, xp: p.unlock_xp });
    }
  }
  return out;
})();

// Horizontal offsets (px) for a winding road
const WAVE = [0, 70, 105, 70, 0, -70, -105, -70];

export default function MapPage() {
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const { playClick } = useSound();
  const { t } = useTranslation();
  // Which adventure stages are done (lesson progress is stored per lesson slug).
  const { completed } = useCompletedLessons(profile?.id);

  if (!profile) return null;

  const userXP = profile.total_xp;
  const unlockedIds = new Set(PROVINCES.filter((p) => p.unlock_xp <= userXP).map((p) => p.id));
  const stamps = BOSSES.filter((b) => profile.passport_stamps?.[b.id]).length;

  // "You are here": the last reached stop
  const currentIdx = STOPS.reduce((acc, s, i) => (s.xp <= userXP ? i : acc), 0);

  const openProvince = (province: ProvinceData) => {
    playClick();
    speakThai(province.name_th);
    setSelectedProvince(province);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5 pb-28">
      {/* Title row: the road below is the page itself */}
      <header className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-3xl text-gray-900 leading-tight">🗺️ {t("nav.map")}</h1>
          <p className="text-sm font-bold text-gray-500">
            {t("map.regionsExplored", { n: unlockedIds.size, total: PROVINCES.length })}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 bg-amber-50 border-2 border-amber-200 rounded-full px-3 py-1">
          <Zap size={16} className="text-amber-500 fill-amber-400" />
          <span className="font-display text-amber-600 tabular-nums">{formatNumber(userXP)}</span>
        </div>
      </header>

      {/* Passport strip */}
      <section className="game-panel p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base text-gray-900">🛂 {t("passport.title", undefined, "Thailand Passport")}</h2>
            <p className="text-xs font-bold text-gray-400">{t("passport.subtitle", undefined, "Defeat each region's guardian to earn its stamp")}</p>
          </div>
          <span className="font-display text-sm text-amber-600 bg-amber-50 border-2 border-amber-200 rounded-full px-3 py-0.5">
            {stamps}/{BOSSES.length}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {BOSSES.map((boss) => {
            const stamp = profile.passport_stamps?.[boss.id];
            const ready = isBossUnlocked(boss, userXP, completed, profile.passport_stamps);
            return (
              <motion.button
                key={boss.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => { playClick(); router.push(`/boss/${boss.id}`); }}
                className={cn(
                  "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative",
                  stamp ? "border-dashed -rotate-3" : ready ? "border-orange-300 bg-orange-50 shadow-[0_3px_0_#fdba74]" : "border-gray-200 bg-gray-50"
                )}
                style={stamp ? { borderColor: boss.color, color: boss.color, background: `${boss.color}14` } : undefined}
                aria-label={`${boss.name_en}${stamp ? ", stamped" : ""}`}
              >
                <span className={cn("text-3xl leading-none", !stamp && !ready && "grayscale opacity-30")}>{boss.emoji}</span>
                <span className={cn("thai-text text-sm font-bold leading-tight mt-1", !stamp && "text-gray-500")}>{boss.stamp_th}</span>
                {stamp?.flawless && <Star size={12} className="absolute top-1 right-1 text-amber-400 fill-amber-400" />}
                {!stamp && !ready && <Lock size={11} className="absolute top-1.5 right-1.5 text-gray-400" />}
                {ready && !stamp && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-black bg-red-500 text-white rounded-full px-1.5 py-0.5 shadow">!</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Journey path */}
      <section className="relative pt-4">
        {STOPS.map((stop, i) => {
          const reached = stop.xp <= userXP;
          const isHere = i === currentIdx;
          const isNext = i === currentIdx + 1 && !reached;
          const offset = WAVE[i % WAVE.length];
          const nextOffset = WAVE[(i + 1) % WAVE.length];
          const isLast = i === STOPS.length - 1;
          const labelLeft = offset > 0;

          const region = stop.kind === "province" ? stop.province.region : stop.boss.region;
          const color = stop.kind === "boss" ? stop.boss.color : REGION_COLOR[region];
          // A guardian opens only once the region's stages before it are cleared.
          const gate = stop.kind === "boss" ? bossGate(stop.boss, userXP, completed, profile.passport_stamps) : null;
          const bossOpen = stop.kind === "boss" && (!!gate?.unlocked || !!profile.passport_stamps?.[stop.boss.id]);

          return (
            <div key={stop.kind === "province" ? stop.province.id : stop.boss.id} className="relative h-[124px]">
              {/* road segment to the next stop */}
              {!isLast && (
                <svg className="absolute left-1/2 top-[44px] -translate-x-1/2 overflow-visible pointer-events-none" width="1" height="124" aria-hidden="true">
                  <path
                    d={`M ${offset} 0 C ${offset} 62, ${nextOffset} 62, ${nextOffset} 124`}
                    fill="none"
                    stroke={STOPS[i + 1].xp <= userXP ? "#f59e0b" : "#d6cbb8"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={STOPS[i + 1].xp <= userXP ? undefined : "2 16"}
                  />
                </svg>
              )}

              <div
                className="absolute top-0 left-1/2"
                style={{ transform: `translateX(calc(-50% + ${offset}px))` }}
              >
                {/* You are here marker */}
                {isHere && (
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bob">
                    <span className="text-[10px] font-black bg-gray-900 text-white rounded-full px-2 py-0.5 whitespace-nowrap">
                      {t("map.youAreHere", undefined, "YOU ARE HERE")}
                    </span>
                    <span className="text-2xl -mt-0.5">🧳</span>
                  </div>
                )}

                {stop.kind === "province" ? (
                  <button
                    onClick={() => openProvince(stop.province)}
                    className={cn(
                      "btn-3d relative z-10 w-[88px] h-[88px] rounded-full flex items-center justify-center border-4 text-4xl",
                      reached ? "bg-white" : isNext ? "bg-white" : "bg-gray-200 border-gray-300",
                      isHere && "ring-4 ring-orange-300/60 ring-offset-4 ring-offset-transparent"
                    )}
                    style={reached || isNext ? { borderColor: color, ["--btn-edge" as string]: reached ? color : "#d6cbb8" } : { ["--btn-edge" as string]: "#b8ad9c" }}
                    aria-label={stop.province.name_en}
                  >
                    {reached ? stop.province.emoji : <Lock size={28} className={isNext ? "text-orange-400" : "text-gray-400"} />}
                    {reached && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white rounded-full px-1.5 py-0.5 border-2" style={{ borderColor: color }}>
                        {[0, 1, 2].map((s) => <Star key={s} size={8} className="text-amber-400 fill-amber-400" />)}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => { playClick(); router.push(`/boss/${stop.boss.id}`); }}
                    className={cn(
                      "btn-3d relative z-10 w-[104px] h-[104px] -mt-2 rounded-[32px] flex items-center justify-center border-4 text-5xl rotate-45",
                      !bossOpen && "grayscale"
                    )}
                    style={{
                      background: bossOpen ? `linear-gradient(135deg, ${color}, ${color}bb)` : "#e5e0d6",
                      borderColor: bossOpen ? "#fff" : "#d6cbb8",
                      ["--btn-edge" as string]: bossOpen ? `${color}` : "#b8ad9c",
                    }}
                    aria-label={stop.boss.name_en}
                  >
                    <span className="-rotate-45 drop-shadow-lg">
                      {stop.boss.emoji}
                    </span>
                    {profile.passport_stamps?.[stop.boss.id] && (
                      <span className="-rotate-45 absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                        <Check size={16} className="text-white" strokeWidth={4} />
                      </span>
                    )}
                  </button>
                )}

                {/* Label */}
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-[110px] sm:w-[170px]",
                    labelLeft ? "right-full mr-4 text-right" : "left-full ml-4"
                  )}
                >
                  <div className={cn("inline-block rounded-2xl px-3 py-1.5 border-2 bg-white", !reached && !isNext && "opacity-60")}
                    style={{ borderColor: reached ? `${color}66` : "var(--game-edge)" }}>
                    <p className="text-[10px] font-black" style={{ color }}>
                      {stop.kind === "boss" ? `⚔️ ${t("map.guardian", undefined, "Guardian")}` : REGION_TH[region]}
                    </p>
                    <p className="font-display text-sm text-gray-900 leading-tight">
                      {stop.kind === "province" ? stop.province.name_en : stop.boss.name_en}
                    </p>
                    <p className="thai-text text-sm text-gray-500 leading-tight">
                      {stop.kind === "province" ? stop.province.name_th : stop.boss.name_th}
                    </p>
                    {!reached && (
                      <p className="text-[10px] font-black text-orange-500 mt-0.5">🔒 {stop.xp} XP</p>
                    )}
                    {reached && gate && !bossOpen && (
                      <p className="text-[10px] font-black text-orange-500 mt-0.5 tabular-nums">
                        🔒 {gate.needsBoss && gate.stagesDone === gate.stagesTotal
                          ? `ชนะ ${gate.needsBoss.name_th} ก่อน`
                          : `ผ่านด่าน ${gate.stagesDone}/${gate.stagesTotal}`}
                      </p>
                    )}
                    {reached && stop.kind === "province" && (ADVENTURE_BY_PROVINCE[stop.province.id]?.length ?? 0) > 0 && (() => {
                      const st = ADVENTURE_BY_PROVINCE[stop.province.id];
                      const n = st.filter((x) => completed.has(x.id)).length;
                      return (
                        <p className={cn("text-[10px] font-black mt-0.5 tabular-nums", n === st.length ? "text-green-600" : "text-orange-500")}>
                          {n === st.length ? "🏆" : "🗺️"} {n}/{st.length} ด่าน
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col items-center pt-2 pb-4">
          <div className="text-4xl" aria-hidden="true">🏝️</div>
          <p className="text-xs font-extrabold text-gray-400 mt-1">{t("map.moreSoon")}</p>
        </div>
      </section>

      <AnimatePresence>
        {selectedProvince && (
          <ProvinceModal
            province={selectedProvince}
            isUnlocked={unlockedIds.has(selectedProvince.id)}
            stages={ADVENTURE_BY_PROVINCE[selectedProvince.id] ?? []}
            completed={completed}
            userXP={userXP}
            onClose={() => setSelectedProvince(null)}
            onStartStage={(stageId) => {
              setSelectedProvince(null);
              router.push(stageHref(stageId));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

