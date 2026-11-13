import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getLevelColor(level: number) {
  if (level >= 40) return "from-yellow-400 to-amber-500";
  if (level >= 30) return "from-purple-400 to-violet-500";
  if (level >= 20) return "from-blue-400 to-cyan-500";
  if (level >= 10) return "from-green-400 to-emerald-500";
  return "from-orange-400 to-red-400";
}

function getLevelEmoji(level: number) {
  if (level >= 40) return "👑";
  if (level >= 30) return "💎";
  if (level >= 20) return "🥇";
  if (level >= 10) return "🌟";
  return "⭐";
}

export function LevelBadge({ level, size = "md", className }: LevelBadgeProps) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex flex-col items-center justify-center font-black text-white border-2 border-white/70 shadow-[0_3px_0_rgba(0,0,0,0.18)] [text-shadow:0_1px_0_rgba(0,0,0,0.2)] tabular-nums shrink-0",
        getLevelColor(level),
        sizeMap[size],
        className
      )}
    >
      <span className="leading-none">{level}</span>
      {size !== "sm" && <span className="text-[8px] leading-none opacity-90" aria-hidden="true">{getLevelEmoji(level)}</span>}
    </div>
  );
}
