import { TONE_MARKS } from "@/data/alphabet";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function ToneChart() {
  const { t } = useTranslation();
  const toneRows = [
    { label: t("alphabet.midClass"), mid: "mid", mai_ek: "low", mai_tho: "falling", mai_tri: "high", mai_jattawa: "rising" },
    { label: t("alphabet.highClass"), mid: "rising", mai_ek: "low", mai_tho: "falling", mai_tri: "-", mai_jattawa: "-" },
    { label: t("alphabet.lowClass"), mid: "mid", mai_ek: "falling", mai_tho: "high", mai_tri: "-", mai_jattawa: "-" },
  ];

  const toneColors: Record<string, string> = {
    mid: "bg-gray-100 border-gray-200 text-gray-700",
    low: "bg-sky-100 border-sky-200 text-sky-700",
    falling: "bg-red-100 border-red-200 text-red-700",
    high: "bg-amber-100 border-amber-200 text-amber-700",
    rising: "bg-green-100 border-green-200 text-green-700",
    "-": "bg-gray-50 border-gray-100 text-gray-300",
  };
  const toneLabel: Record<string, string> = {
    mid: t("alphabet.mid"), low: t("alphabet.low"), falling: t("alphabet.falling"),
    high: t("alphabet.high"), rising: t("alphabet.rising"), "-": "—",
  };

  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-orange-100 bg-orange-50/40">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-orange-50 border-b-2 border-orange-100">
            <th className="p-3 text-left font-extrabold text-gray-700">{t("alphabet.classSuffix")}</th>
            <th className="p-3 font-extrabold text-gray-700">{t("alphabet.noMark")}</th>
            {TONE_MARKS.slice(0, 4).map((tm) => (
              <th key={tm.id} className="p-3 font-extrabold text-gray-700">
                <span className="thai-text text-lg">ก{tm.symbol}า</span>
                <br />
                <span className="text-[11px] font-bold text-gray-500">{tm.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {toneRows.map((row) => (
            <tr key={row.label} className="border-b-2 border-orange-100 last:border-0">
              <td className="p-3 font-extrabold text-gray-700 whitespace-nowrap">{row.label}</td>
              {[row.mid, row.mai_ek, row.mai_tho, row.mai_tri, row.mai_jattawa].map((tone, i) => (
                <td key={i} className="p-3 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full border-2 text-xs font-extrabold whitespace-nowrap ${toneColors[tone] ?? ""}`}>
                    {toneLabel[tone] ?? tone}
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
