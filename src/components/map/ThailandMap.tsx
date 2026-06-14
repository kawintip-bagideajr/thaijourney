"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { PROVINCES, type ProvinceData } from "@/data/provinces";
import { cn } from "@/lib/utils";

interface ThailandMapProps {
  unlockedProvinceIds: string[];
  userXP: number;
  onProvinceClick: (province: ProvinceData) => void;
}

// Geographic connections between provinces
const MAP_EDGES: [string, string][] = [
  ["bangkok", "ayutthaya"],
  ["ayutthaya", "sukhothai"],
  ["sukhothai", "chiang_mai"],
  ["chiang_mai", "pai"],
  ["chiang_mai", "chiang_rai"],
  ["bangkok", "khao_yai"],
  ["bangkok", "koh_samui"],
  ["koh_samui", "krabi"],
  ["krabi", "phuket"],
];

export function ThailandMap({ unlockedProvinceIds, userXP, onProvinceClick }: ThailandMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const provinceMap = Object.fromEntries(PROVINCES.map((p) => [p.id, p]));

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        className="relative"
        style={{
          backgroundImage: "url('/images/thailand-map-outline.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: 600,
        }}
      >
        {/* Path lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          preserveAspectRatio="none"
        >
          {MAP_EDGES.map(([fromId, toId]) => {
            const from = provinceMap[fromId];
            const to = provinceMap[toId];
            if (!from || !to) return null;
            const bothUnlocked =
              (unlockedProvinceIds.includes(fromId) || from.unlock_xp === 0) &&
              (unlockedProvinceIds.includes(toId) || to.unlock_xp === 0);
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={`${from.map_x}%`}
                y1={`${from.map_y}%`}
                x2={`${to.map_x}%`}
                y2={`${to.map_y}%`}
                stroke={bothUnlocked ? "#F59E0B" : "#D1D5DB"}
                strokeWidth={bothUnlocked ? 2.5 : 1.5}
                strokeDasharray={bothUnlocked ? "none" : "6 5"}
                opacity={bothUnlocked ? 0.7 : 0.5}
              />
            );
          })}
        </svg>

        {/* Province nodes */}
        {PROVINCES.map((province) => {
          const isUnlocked = unlockedProvinceIds.includes(province.id) || province.unlock_xp === 0;
          const canUnlock = !isUnlocked && userXP >= province.unlock_xp;
          const isHovered = hoveredId === province.id;

          return (
            <button
              key={province.id}
              style={{
                position: "absolute",
                left: `${province.map_x}%`,
                top: `${province.map_y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
              onClick={() => onProvinceClick(province)}
              onMouseEnter={() => setHoveredId(province.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow ring for unlocked */}
              {isUnlocked && (
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: province.color,
                    filter: "blur(10px)",
                    opacity: 0.35,
                    transform: "scale(1.4)",
                  }}
                />
              )}

              {/* Can-unlock pulse ring */}
              {canUnlock && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    border: "2px solid #F59E0B",
                    opacity: 0.5,
                    transform: "scale(1.3)",
                  }}
                />
              )}

              <div
                className={cn(
                  "relative w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-3 border-white transition-all duration-150",
                  isHovered && "scale-110",
                  !isUnlocked && !canUnlock && "opacity-40 grayscale"
                )}
                style={{
                  background: isUnlocked
                    ? `linear-gradient(135deg, ${province.color}, ${province.color}cc)`
                    : canUnlock
                    ? `linear-gradient(135deg, #FCD34D, #F59E0B)`
                    : "#E5E7EB",
                }}
              >
                {isUnlocked ? (
                  <span>{province.emoji}</span>
                ) : (
                  <Lock size={18} className={canUnlock ? "text-amber-700" : "text-gray-400"} />
                )}
              </div>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none"
                >
                  <div className="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl">
                    <p className="font-bold">{province.name_en}</p>
                    <p className="thai-text text-[11px] opacity-75">{province.name_th}</p>
                    {!isUnlocked && (
                      <p className={cn("text-[10px] mt-1", canUnlock ? "text-amber-300" : "text-orange-300")}>
                        {canUnlock ? "Tap to explore!" : `${province.unlock_xp} XP to unlock`}
                      </p>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-amber-400" />
          <span>Unlocked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-amber-200 border border-amber-400" />
          <span>Unlockable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-200" />
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}
