"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ThailandMap } from "@/components/map/ThailandMap";
import { ProvinceModal } from "@/components/map/ProvinceModal";
import { PROVINCES, type ProvinceData } from "@/data/provinces";
import { formatNumber } from "@/lib/utils";
import { Zap, Map } from "lucide-react";

export default function MapPage() {
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);

  if (!profile) return null;

  const unlockedIds = PROVINCES.filter((p) => p.unlock_xp <= profile.total_xp).map((p) => p.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Thailand Adventure Map</h1>
          <p className="text-gray-500 text-sm mt-1">Unlock provinces by earning XP</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2">
          <Zap size={16} className="text-amber-400 fill-amber-400" />
          <span className="font-black text-amber-600">{formatNumber(profile.total_xp)} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Map size={16} className="text-green-500" />
            <span className="text-sm font-bold text-gray-700">{unlockedIds.length} / {PROVINCES.length} Provinces Unlocked</span>
          </div>
          <span className="text-sm text-gray-400">{Math.round((unlockedIds.length / PROVINCES.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-thai rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedIds.length / PROVINCES.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
        <ThailandMap
          unlockedProvinceIds={unlockedIds}
          userXP={profile.total_xp}
          onProvinceClick={setSelectedProvince}
        />
      </div>

      {/* Province list */}
      <div>
        <h2 className="font-bold text-gray-900 mb-3">All Provinces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROVINCES.sort((a, b) => a.unlock_xp - b.unlock_xp).map((province) => {
            const unlocked = unlockedIds.includes(province.id);
            return (
              <motion.button
                key={province.id}
                onClick={() => setSelectedProvince(province)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                  unlocked
                    ? "bg-white border-gray-100 shadow-sm hover:shadow-md"
                    : "bg-gray-50 border-gray-100 opacity-60"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: unlocked ? `${province.color}22` : "#f3f4f6" }}
                >
                  {unlocked ? province.emoji : "🔒"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">{province.name_en}</p>
                  <p className="thai-text text-xs text-gray-500">{province.name_th}</p>
                </div>
                {!unlocked && (
                  <span className="text-xs font-bold text-orange-400 flex-shrink-0">{province.unlock_xp} XP</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Province modal */}
      {selectedProvince && (
        <ProvinceModal
          province={selectedProvince}
          isUnlocked={unlockedIds.includes(selectedProvince.id)}
          userXP={profile.total_xp}
          onClose={() => setSelectedProvince(null)}
          onStartLesson={(id) => {
            setSelectedProvince(null);
            router.push("/learn");
          }}
        />
      )}
    </div>
  );
}
