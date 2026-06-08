"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { PROVINCES, type ProvinceData } from "@/data/provinces";
import { cn } from "@/lib/utils";

interface ThailandMapProps {
  unlockedProvinceIds: string[];
  userXP: number;
  onProvinceClick: (province: ProvinceData) => void;
}

export function ThailandMap({ unlockedProvinceIds, userXP, onProvinceClick }: ThailandMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Thailand silhouette background */}
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
        {/* Province nodes */}
        {PROVINCES.map((province) => {
          const isUnlocked = unlockedProvinceIds.includes(province.id) || province.unlock_xp === 0;
          const canUnlock = userXP >= province.unlock_xp;
          const isHovered = hoveredId === province.id;

          return (
            <motion.button
              key={province.id}
              style={{
                position: "absolute",
                left: `${province.map_x}%`,
                top: `${province.map_y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProvinceClick(province)}
              onHoverStart={() => setHoveredId(province.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative z-10"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-3 border-white transition-all duration-200",
                  isUnlocked
                    ? "shadow-lg shadow-orange-200"
                    : canUnlock
                    ? "opacity-70 grayscale-[30%]"
                    : "opacity-40 grayscale"
                )}
                style={{
                  background: isUnlocked
                    ? `linear-gradient(135deg, ${province.color}, ${province.color}dd)`
                    : "#e5e7eb",
                }}
              >
                {isUnlocked ? (
                  <span>{province.emoji}</span>
                ) : (
                  <Lock size={18} className="text-gray-400" />
                )}
              </div>

              {/* Unlocked glow */}
              {isUnlocked && (
                <div
                  className="absolute inset-0 rounded-full animate-pulse opacity-30"
                  style={{ background: province.color, filter: "blur(8px)" }}
                />
              )}

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none"
                >
                  <div className="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl">
                    <p className="font-bold">{province.name_en}</p>
                    <p className="thai-text text-[11px] opacity-75">{province.name_th}</p>
                    {!isUnlocked && (
                      <p className="text-orange-300 text-[10px] mt-1">{province.unlock_xp} XP to unlock</p>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full gradient-thai" />
          <span>Unlocked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-200" />
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}
