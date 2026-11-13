"use client";
import { useState } from "react";
import { CONSONANTS, VOWELS, TONE_MARKS, type ConsonantClass, type ThaiConsonant } from "@/data/alphabet";
import { ConsonantCard } from "@/components/alphabet/ConsonantCard";
import { ConsonantDetailModal } from "@/components/alphabet/ConsonantDetailModal";
import { ToneChart } from "@/components/alphabet/ToneChart";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";
import { useTranslation } from "@/lib/i18n/useTranslation";

const CLASS_COLORS: Record<ConsonantClass, { badge: string; dot: string }> = {
  high: { badge: "bg-sky-50 border-sky-200 text-sky-700", dot: "bg-sky-500" },
  mid: { badge: "bg-orange-50 border-orange-200 text-orange-700", dot: "bg-orange-500" },
  low: { badge: "bg-green-50 border-green-200 text-green-700", dot: "bg-green-500" },
};

const FILTER_ACTIVE: Record<ConsonantClass | "all", string> = {
  all: "bg-orange-500 border-orange-600 text-white [--btn-edge:#c2410c]",
  high: "bg-sky-500 border-sky-600 text-white [--btn-edge:#0369a1]",
  mid: "bg-orange-500 border-orange-600 text-white [--btn-edge:#c2410c]",
  low: "bg-green-500 border-green-600 text-white [--btn-edge:#15803d]",
};

export default function AlphabetPage() {
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels" | "tones">("consonants");
  const [filterClass, setFilterClass] = useState<ConsonantClass | "all">("all");
  const [selectedConsonant, setSelectedConsonant] = useState<ThaiConsonant | null>(null);
  const { t } = useTranslation();

  const filteredConsonants = filterClass === "all"
    ? CONSONANTS
    : CONSONANTS.filter((c) => c.class === filterClass);

  const tabs = [
    { id: "consonants", label: t("alphabet.consonants"), count: CONSONANTS.length, emoji: "ก" },
    { id: "vowels", label: t("alphabet.vowels"), count: VOWELS.length, emoji: "อา" },
    { id: "tones", label: t("alphabet.tones"), count: TONE_MARKS.length, emoji: "่" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-5 space-y-5">
      <ConsonantDetailModal consonant={selectedConsonant} onClose={() => setSelectedConsonant(null)} />

      {/* Header: title on the page, then the three script sections as big letter tiles */}
      <header className="space-y-3">
        <div className="px-1">
          <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight">
            <span aria-hidden="true">🔤 </span>{t("alphabet.title")}
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1">{t("alphabet.subtitle")}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              aria-pressed={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "btn-3d min-w-0 flex flex-col items-center justify-center gap-1 py-3 sm:py-4 px-1 rounded-3xl border-2 text-xs sm:text-sm font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
                activeTab === tab.id
                  ? "bg-orange-500 border-orange-600 text-white [--btn-edge:#c2410c]"
                  : "bg-white border-[var(--game-edge)] text-gray-600 [--btn-edge:var(--game-edge)] hover:bg-orange-50"
              )}
            >
              <span className="thai-text font-bold text-3xl sm:text-4xl leading-tight">{tab.emoji}</span>
              <span className="truncate max-w-full">{tab.label}</span>
              <span className={cn("text-[10px] tabular-nums", activeTab === tab.id ? "opacity-90" : "opacity-60")}>({tab.count})</span>
            </button>
          ))}
        </div>
      </header>

      {/* Consonants */}
      {activeTab === "consonants" && (
        <div className="space-y-4">
          <div className="space-y-2.5">
            {/* Class filter */}
            <div className="flex flex-wrap gap-2">
              {(["all", "high", "mid", "low"] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  aria-pressed={filterClass === cls}
                  className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-extrabold border-2 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
                    filterClass === cls
                      ? cn("btn-3d", FILTER_ACTIVE[cls])
                      : "bg-white text-gray-600 border-[var(--game-edge)] hover:bg-orange-50 hover:-translate-y-0.5"
                  )}
                >
                  {cls === "all"
                    ? t("alphabet.allClasses")
                    : t("alphabet.classConsonants", { name: cls === "high" ? t("alphabet.highClass") : cls === "mid" ? t("alphabet.midClass") : t("alphabet.lowClass"), n: CONSONANTS.filter((c) => c.class === cls).length })}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
              {(["high", "mid", "low"] as ConsonantClass[]).map((cls) => (
                <div key={cls} className={cn("flex items-center gap-1.5 text-[11px] font-extrabold !bg-transparent", CLASS_COLORS[cls].badge)}>
                  <div className={cn("w-2.5 h-2.5 rounded-full", CLASS_COLORS[cls].dot)} />
                  {t("alphabet.classConsonants", { name: cls === "high" ? t("alphabet.highClass") : cls === "mid" ? t("alphabet.midClass") : t("alphabet.lowClass"), n: CONSONANTS.filter((c) => c.class === cls).length })}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {filteredConsonants.map((consonant) => (
              <ConsonantCard key={consonant.id} consonant={consonant} onSelect={setSelectedConsonant} />
            ))}
          </div>
        </div>
      )}

      {/* Vowels */}
      {activeTab === "vowels" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VOWELS.map((vowel) => (
              <div
                key={vowel.id}
                className="game-panel p-4 flex items-center gap-4"
              >
                <button
                  onClick={() => speakThai(vowel.thai.replace("_", ""))}
                  className={cn(
                    "btn-3d w-16 rounded-2xl border-2 flex items-center justify-center thai-text text-3xl font-bold flex-shrink-0 overflow-visible focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
                    "py-5 px-2 leading-none",
                    vowel.length === "long"
                      ? "bg-purple-50 border-purple-200 text-purple-800 [--btn-edge:#e9d5ff]"
                      : "bg-teal-50 border-teal-200 text-teal-800 [--btn-edge:#99f6e4]"
                  )}
                  title={t("alphabet.tapToHear")}
                >
                  {vowel.thai}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-gray-900 leading-tight">{vowel.rtgs}</p>
                  <p className="text-sm font-bold text-gray-500">{vowel.ipa}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={cn(
                      "text-[11px] px-2.5 py-0.5 rounded-full font-extrabold border-2",
                      vowel.length === "long" ? "bg-purple-100 border-purple-200 text-purple-700" : "bg-teal-100 border-teal-200 text-teal-700"
                    )}>
                      {vowel.length === "long" ? t("alphabet.long") : t("alphabet.short")}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{t("alphabet.eg")} <strong className="thai-text text-gray-700">{vowel.example}</strong> ({vowel.exampleMeaning})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tones */}
      {activeTab === "tones" && (
        <div className="space-y-5">
          <p className="flex items-start gap-2 px-1 text-sm font-bold text-gray-600 leading-relaxed">
            <span aria-hidden="true">🎵</span>
            <span>{t("alphabet.toneIntro")}</span>
          </p>

          {/* Tone mark cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TONE_MARKS.map((mark) => (
              <div
                key={mark.id}
                className="game-panel p-4"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 shrink-0 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-center justify-center">
                    <span className="thai-text text-3xl font-bold text-amber-700">ก{mark.symbol}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg text-gray-900 leading-tight">{mark.name}</p>
                    <p className="thai-text text-sm font-bold text-gray-500">{mark.thai}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 bg-orange-50 border-2 border-orange-100 rounded-2xl px-3 py-2">{mark.description}</p>
              </div>
            ))}
          </div>

          {/* Tone table */}
          <section className="game-card p-4 sm:p-5">
            <h3 className="text-lg text-gray-900 mb-3"><span aria-hidden="true">📊 </span>{t("alphabet.toneChartTitle")}</h3>
            <ToneChart />
          </section>
        </div>
      )}
    </div>
  );
}
