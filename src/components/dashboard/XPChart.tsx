"use client";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useSettingsStore } from "@/store/settingsStore";

interface XPChartProps {
  data: Array<{ day: string; xp: number }>;
}

const THEME_COLOR: Record<string, string> = {
  light:         "#EA580C",
  sakura:        "#ec4899",
  ocean:         "#0ea5e9",
  forest:        "#059669",
  "dark-indigo": "#818cf8",
  "dark-teal":   "#14b8a6",
  "dark-emerald":"#34d399",
  "dark-rose":   "#fb7185",
  "dark-sky":    "#38bdf8",
};

export function XPChart({ data }: XPChartProps) {
  const theme = useSettingsStore((s) => s.theme);
  const darkAccent = useSettingsStore((s) => s.darkAccent);

  const colorKey = theme === "dark" ? `dark-${darkAccent}` : theme;
  const color = THEME_COLOR[colorKey] ?? "#EA580C";
  const isDark = theme === "dark";
  const gridColor = isDark ? "#252d42" : "#f3f4f6";
  const tickColor = isDark ? "#475569" : "#9CA3AF";
  const tooltipBg = isDark ? "#1f2740" : "#ffffff";
  const tooltipBorder = isDark ? "#252d42" : "#f3f4f6";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ backgroundColor: tooltipBg, borderColor: tooltipBorder }}
        className="rounded-xl shadow-lg border px-3 py-2 text-sm">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="font-bold" style={{ color }}>{payload[0].value} XP</p>
      </div>
    );
  };

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.28} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="xp"
            stroke={color}
            strokeWidth={2.5}
            fill="url(#xpGradient)"
            dot={{ fill: color, strokeWidth: 2, r: 4, stroke: isDark ? "#161b2a" : "white" }}
            activeDot={{ r: 6, fill: color, stroke: isDark ? "#161b2a" : "white", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
