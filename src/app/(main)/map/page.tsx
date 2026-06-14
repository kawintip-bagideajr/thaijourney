"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { PROVINCES, type ProvinceData } from "@/data/provinces";
import { ProvinceModal } from "@/components/map/ProvinceModal";
import { formatNumber, cn } from "@/lib/utils";
import { Zap, Lock, Star, MapPin } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { speakThai } from "@/lib/speech";

const LESSON_LINKS: Record<string, string> = {
  bangkok: "/learn/greetings/lesson/greet-basics",
  chiang_mai: "/learn/food/lesson/food-vocab",
  ayutthaya: "/learn/transport/lesson/transport-vocab",
  khao_yai: "/learn/numbers/lesson/numbers-1-10",
  chiang_rai: "/learn/numbers/lesson/numbers-11-100",
  sukhothai: "/learn/numbers/lesson/classifiers",
  phuket: "/learn/shopping/lesson/shopping-vocab",
  pai: "/learn/emergency/lesson/emergency-phrases",
  krabi: "/learn/emergency/lesson/hospital",
  koh_samui: "/learn",
};

const SORTED_PROVINCES = [...PROVINCES].sort((a, b) => a.unlock_xp - b.unlock_xp);

export default function MapPage() {
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const { playClick, playUnlock } = useSound();

  if (!profile) return null;

  const userXP = profile.total_xp;
  const unlockedIds = new Set(PROVINCES.filter((p) => p.unlock_xp <= userXP).map((p) => p.id));
  const completedCount = unlockedIds.size;
  const nextLock = SORTED_PROVINCES.find((p) => !unlockedIds.has(p.id));

  const handleProvinceClick = (province: ProvinceData) => {
    playClick();
    speakThai(province.name_th);
    setSelectedProvince(province);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5 pb-28">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Adventure Map</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {completedCount}/{PROVINCES.length} regions explored
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-2xl px-3 py-2">
          <Zap size={15} className="text-amber-400 fill-amber-400" />
          <span className="font-black text-amber-600 text-sm">{formatNumber(userXP)} XP</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-thai rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / PROVINCES.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        {nextLock && (
          <p className="text-xs text-gray-400">
            Next: <span className="text-amber-600 font-semibold">{nextLock.emoji} {nextLock.name_en}</span>
            {" "}— {nextLock.unlock_xp - userXP} XP away
          </p>
        )}
      </div>

      {/* Adventure Path */}
      <div className="relative">
        {SORTED_PROVINCES.map((province, i) => {
          const isUnlocked = unlockedIds.has(province.id);
          const isNext = !isUnlocked && (i === 0 || unlockedIds.has(SORTED_PROVINCES[i - 1]?.id ?? ""));
          const isLast = i === SORTED_PROVINCES.length - 1;
          const alignLeft = i % 2 === 0;

          return (
            <div key={province.id} className="relative">
              {/* Path connector */}
              {!isLast && (
                <div
                  className="absolute left-1/2 -translate-x-px w-0.5 rounded-full"
                  style={{
                    top: "calc(100% - 8px)",
                    height: 44,
                    background: isUnlocked
                      ? "linear-gradient(to bottom, #F59E0B80, #D1D5DB)"
                      : "#E5E7EB",
                    zIndex: 0,
                  }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative z-10 flex items-center gap-3 mb-10",
                  alignLeft ? "flex-row" : "flex-row-reverse"
                )}
              >
                {/* Node button */}
                <motion.button
                  onClick={() => handleProvinceClick(province)}
                  whileTap={{ scale: 0.92 }}
                  className={cn(
                    "w-[72px] h-[72px] flex-shrink-0 rounded-[22px] flex flex-col items-center justify-center gap-1 transition-all duration-200 shadow-md border-[3px]",
                    isUnlocked
                      ? "bg-white border-amber-300"
                      : isNext
                      ? "bg-amber-50 border-amber-200 border-dashed"
                      : "bg-gray-100 border-gray-200"
                  )}
                  style={
                    isUnlocked
                      ? { boxShadow: `0 4px 16px ${province.color}55` }
                      : undefined
                  }
                >
                  <span className="text-3xl leading-none">
                    {isUnlocked ? province.emoji : <Lock size={22} className={cn(isNext ? "text-amber-400" : "text-gray-400")} />}
                  </span>
                  {isUnlocked && (
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, s) => (
                        <Star key={s} size={7} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  )}
                </motion.button>

                {/* Info card */}
                <div className={cn(
                  "flex-1 bg-white rounded-2xl border p-3 min-w-0",
                  isUnlocked
                    ? "border-gray-100 shadow-sm"
                    : "border-gray-100 opacity-60"
                )}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <MapPin size={10} className="text-gray-400 flex-shrink-0" />
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{province.region}</span>
                    <span className="ml-auto text-[10px] font-bold text-gray-300">#{i + 1}</span>
                  </div>
                  <p className="font-black text-sm text-gray-900 leading-tight">{province.name_en}</p>
                  <p className="thai-text text-xs text-gray-500">{province.name_th}</p>
                  {isUnlocked ? (
                    <p className="text-xs text-green-500 font-bold mt-1">✓ Unlocked</p>
                  ) : (
                    <p className="text-xs text-orange-400 font-bold mt-1">
                      🔒 {province.unlock_xp} XP
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* End of path */}
        <div className="flex flex-col items-center py-4 text-gray-300">
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-xs font-bold">More adventures coming soon!</p>
        </div>
      </div>

      <AnimatePresence>
        {selectedProvince && (
          <ProvinceModal
            province={selectedProvince}
            isUnlocked={unlockedIds.has(selectedProvince.id)}
            userXP={userXP}
            onClose={() => setSelectedProvince(null)}
            onStartLesson={(id) => {
              setSelectedProvince(null);
              router.push(LESSON_LINKS[id] ?? "/learn");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
