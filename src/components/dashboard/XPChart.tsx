"use client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface XPChartProps {
  data: Array<{ day: string; xp: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 text-sm">
      <p className="font-bold text-gray-700">{label}</p>
      <p className="text-orange-500 font-bold">{payload[0].value} XP</p>
    </div>
  );
};

export function XPChart({ data }: XPChartProps) {
  const maxXP = Math.max(...data.map((d) => d.xp), 1);

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={20} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="xp" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.xp === maxXP ? "#EA580C" : "#FED7AA"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
