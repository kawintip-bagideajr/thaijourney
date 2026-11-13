"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: "orange" | "green" | "blue" | "purple";
  animated?: boolean;
}

const colorMap = {
  green:  "from-green-400 to-emerald-400",
  blue:   "from-blue-400 to-cyan-400",
  purple: "from-purple-400 to-violet-400",
};

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel,
  color = "orange",
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200/80 shadow-inner", className)}>
      <motion.div
        className={cn(
          "h-full rounded-full",
          color === "orange"
            ? "xp-bar"
            : `bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]}`
        )}
        initial={animated ? { width: 0 } : { width: `${pct}%` }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {showLabel && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white drop-shadow">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
