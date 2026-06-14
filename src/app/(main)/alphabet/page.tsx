"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONSONANTS, VOWELS, TONE_MARKS, type ConsonantClass, type ThaiConsonant } from "@/data/alphabet";
import { ConsonantCard } from "@/components/alphabet/ConsonantCard";
import { ConsonantDetailModal } from "@/components/alphabet/ConsonantDetailModal";
import { ToneChart } from "@/components/alphabet/ToneChart";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";

const CLASS_COLORS: Record<ConsonantClass, { bg: string; text: string; badge: string }> = {
  high: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  mid: { bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
  low: { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700" },
};

export default function AlphabetPage() {
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels" | "tones">("consonants");
  const [filterClass, setFilterClass] = useState<ConsonantClass | "all">("all");
  const [selectedConsonant, setSelectedConsonant] = useState<ThaiConsonant | null>(null);

  const filteredConsonants = filterClass === "all"
    ? CONSONANTS
    : CONSONANTS.filter((c) => c.class === filterClass);

  const tabs = [
    { id: "consonants", label: "Consonants", count: CONSONANTS.length, emoji: "ก" },
    { id: "vowels", label: "Vowels", count: VOWELS.length, emoji: "อา" },
    { id: "tones", label: "Tone Marks", count: TONE_MARKS.length, emoji: "่" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <ConsonantDetailModal consonant={selectedConsonant} onClose={() => setSelectedConsonant(null)} />
      <div>
        <h1 className="text-2xl font-black text-gray-900">Thai Alphabet</h1>
        <p className="text-gray-500 text-sm mt-1">Master the building blocks of the Thai language</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span className="thai-text">{tab.emoji}</span>
            {tab.label}
            <span className="text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Consonants */}
      {activeTab === "consonants" && (
        <div className="space-y-4">
          {/* Class filter */}
          <div className="flex flex-wrap gap-2">
            {(["all", "high", "mid", "low"] as const).map((cls) => (
              <button
                key={cls}
                onClick={() => setFilterClass(cls)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all border",
                  filterClass === cls
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                )}
              >
                {cls === "all" ? "All Classes" : `${cls.charAt(0).toUpperCase() + cls.slice(1)} Class`}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            {(["high", "mid", "low"] as ConsonantClass[]).map((cls) => (
              <div key={cls} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold", CLASS_COLORS[cls].badge)}>
                <div className={cn("w-2 h-2 rounded-full", cls === "high" ? "bg-blue-500" : cls === "mid" ? "bg-orange-500" : "bg-green-500")} />
                {cls.charAt(0).toUpperCase() + cls.slice(1)} Class — {CONSONANTS.filter((c) => c.class === cls).length} consonants
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {filteredConsonants.map((consonant, i) => (
              <motion.div
                key={consonant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                <ConsonantCard consonant={consonant} onSelect={setSelectedConsonant} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Vowels */}
      {activeTab === "vowels" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VOWELS.map((vowel, i) => (
              <motion.div
                key={vowel.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
              >
                <button
                  onClick={() => speakThai(vowel.thai.replace("_", ""))}
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center thai-text text-3xl font-bold flex-shrink-0 hover:opacity-80 transition-opacity active:scale-95",
                    vowel.length === "long" ? "bg-purple-50 text-purple-800" : "bg-teal-50 text-teal-800"
                  )}
                  title="Tap to hear"
                >
                  {vowel.thai}
                </button>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{vowel.rtgs}</p>
                  <p className="text-sm text-gray-500">{vowel.ipa}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-bold",
                      vowel.length === "long" ? "bg-purple-100 text-purple-600" : "bg-teal-100 text-teal-600"
                    )}>
                      {vowel.length}
                    </span>
                    <span className="text-xs text-gray-400">e.g. <strong className="thai-text">{vowel.example}</strong> ({vowel.exampleMeaning})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tones */}
      {activeTab === "tones" && (
        <div className="space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Thai has 5 tones: <strong>mid, low, falling, high, and rising</strong>.
            Tone marks modify the default tone of a syllable based on the consonant class.
            Getting tones right is essential — the same sounds can mean completely different things!
          </p>

          {/* Tone mark cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TONE_MARKS.map((mark, i) => (
              <motion.div
                key={mark.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <span className="thai-text text-3xl font-bold">ก{mark.symbol}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{mark.name}</p>
                    <p className="thai-text text-sm text-gray-500">{mark.thai}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{mark.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tone table */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Tone Chart by Consonant Class</h3>
            <ToneChart />
          </div>
        </div>
      )}
    </div>
  );
}
