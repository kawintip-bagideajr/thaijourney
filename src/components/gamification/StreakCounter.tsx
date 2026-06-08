"use client";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { getStreakEmoji } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StreakCounter({ streak, size = "md", className }: StreakCounterProps) {
  const emoji = getStreakEmoji(streak);
  const isActive = streak > 0;

  const sizeMap = {
    sm: { icon: 16, text: "text-sm", emoji: "text-lg" },
    md: { icon: 22, text: "text-xl", emoji: "text-2xl" },
    lg: { icon: 32, text: "text-3xl", emoji: "text-4xl" },
  };
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Flame
          size={s.icon}
          className={cn(
            "transition-colors",
            isActive ? "text-orange-500 fill-orange-400" : "text-gray-300 fill-gray-200"
          )}
        />
      </motion.div>
      <div className="flex flex-col leading-none">
        <span className={cn("font-black text-gray-900", s.text)}>{streak}</span>
        <span className="text-[10px] text-gray-400 font-medium">day streak</span>
      </div>
      <span className={s.emoji}>{emoji}</span>
    </div>
  );
}
