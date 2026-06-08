import { TONE_MARKS } from "@/data/alphabet";

export function ToneChart() {
  const toneRows = [
    { label: "Mid class", mid: "mid", mai_ek: "low", mai_tho: "falling", mai_tri: "high", mai_jattawa: "rising" },
    { label: "High class", mid: "rising", mai_ek: "low", mai_tho: "falling", mai_tri: "-", mai_jattawa: "-" },
    { label: "Low class", mid: "mid", mai_ek: "falling", mai_tho: "high", mai_tri: "-", mai_jattawa: "-" },
  ];

  const toneColors: Record<string, string> = {
    mid: "bg-gray-100 text-gray-700",
    low: "bg-blue-100 text-blue-700",
    falling: "bg-red-100 text-red-700",
    high: "bg-yellow-100 text-yellow-700",
    rising: "bg-green-100 text-green-700",
    "-": "bg-gray-50 text-gray-300",
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left font-bold text-gray-700">Class</th>
            <th className="p-3 font-bold text-gray-700">No mark</th>
            {TONE_MARKS.slice(0, 4).map((t) => (
              <th key={t.id} className="p-3 font-bold text-gray-700">
                <span className="thai-text text-lg">กา{t.symbol}</span>
                <br />
                <span className="text-xs font-normal text-gray-400">{t.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {toneRows.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="p-3 font-semibold text-gray-700">{row.label}</td>
              {[row.mid, row.mai_ek, row.mai_tho, row.mai_tri, row.mai_jattawa].map((tone, i) => (
                <td key={i} className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${toneColors[tone] ?? ""}`}>
                    {tone}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
