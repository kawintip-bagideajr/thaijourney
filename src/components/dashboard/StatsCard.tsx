import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "orange" | "green" | "blue" | "purple" | "red";
  trend?: { value: string; up: boolean };
  className?: string;
}

const colorMap = {
  orange: { bg: "bg-orange-50", icon: "text-orange-500", text: "text-orange-600" },
  green: { bg: "bg-green-50", icon: "text-green-500", text: "text-green-600" },
  blue: { bg: "bg-blue-50", icon: "text-blue-500", text: "text-blue-600" },
  purple: { bg: "bg-purple-50", icon: "text-purple-500", text: "text-purple-600" },
  red: { bg: "bg-red-50", icon: "text-red-500", text: "text-red-600" },
};

export function StatsCard({ label, value, icon: Icon, color = "orange", trend, className }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
          <p className={cn("text-3xl font-black", c.text)}>{value}</p>
          {trend && (
            <p className={cn("text-xs mt-1 font-medium", trend.up ? "text-green-500" : "text-red-400")}>
              {trend.up ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", c.bg)}>
          <Icon size={22} className={c.icon} />
        </div>
      </div>
    </div>
  );
}
