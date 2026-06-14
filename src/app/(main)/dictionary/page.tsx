"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Volume2, X } from "lucide-react";
import { DICTIONARY, DICTIONARY_CATEGORIES, type DictionaryCategory } from "@/data/dictionary";
import { speakThai } from "@/lib/speech";
import { cn } from "@/lib/utils";

const CATEGORY_EMOJI: Record<string, string> = {
  All: "📖",
  Greetings: "👋",
  Numbers: "🔢",
  Classifiers: "📦",
  Food: "🍜",
  Transport: "🚌",
  Shopping: "🛍️",
  Emergency: "🚨",
};

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<DictionaryCategory>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DICTIONARY.filter((entry) => {
      const matchesCategory = activeCategory === "All" || entry.category === activeCategory;
      if (!q) return matchesCategory;
      return matchesCategory && (
        entry.thai.includes(q) ||
        entry.romanization.toLowerCase().includes(q) ||
        entry.english.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dictionary</h1>
        <p className="text-gray-500 text-sm mt-1">{DICTIONARY.length} words from all lessons</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Thai, romanization, or English..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {DICTIONARY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
              activeCategory === cat
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            )}
          >
            <span>{CATEGORY_EMOJI[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 -mt-2">
        {filtered.length} {filtered.length === 1 ? "word" : "words"} found
      </p>

      {/* Word list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">No words found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry, i) => (
            <motion.div
              key={`${entry.thai}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="thai-text text-2xl font-bold text-gray-900">{entry.thai}</span>
                    <span className="text-sm text-orange-500 font-semibold">{entry.romanization}</span>
                  </div>
                  <p className="text-gray-700 font-medium mt-0.5">{entry.english}</p>
                  {entry.usage_example && (
                    <p className="text-xs text-gray-400 mt-1 italic leading-relaxed">{entry.usage_example}</p>
                  )}
                  <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                    {CATEGORY_EMOJI[entry.category]} {entry.category}
                  </span>
                </div>
                <button
                  onClick={() => speakThai(entry.thai)}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-500 transition-colors active:scale-95"
                  aria-label={`Pronounce ${entry.thai}`}
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Bottom padding for mobile nav */}
      <div className="h-20 lg:h-4" />
    </div>
  );
}
