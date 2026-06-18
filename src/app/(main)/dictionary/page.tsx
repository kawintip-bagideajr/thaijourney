"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, X, Sparkles, Loader2 } from "lucide-react";
import { DICTIONARY, DICTIONARY_CATEGORIES, type DictionaryCategory } from "@/data/dictionary";
import { speakThai } from "@/lib/speech";
import { cn } from "@/lib/utils";

const CATEGORY_EMOJI: Record<string, string> = {
  All: "📖", Essentials: "⭐", Greetings: "👋", Questions: "❓",
  Verbs: "⚡", Adjectives: "✨", "Numbers & Time": "🔢", Family: "👨‍👩‍👧",
  "Body & Health": "💪", "Food & Drink": "🍜", Colors: "🎨", Emotions: "😊",
  Places: "📍", Nature: "🌿", Travel: "✈️", Shopping: "🛍️", Culture: "🏯",
};

const DIFFICULTY_STYLE: Record<string, string> = {
  beginner: "bg-green-100 text-green-600",
  intermediate: "bg-amber-100 text-amber-600",
  advanced: "bg-red-100 text-red-600",
};

type AIResult = { query: string; text: string; isError?: boolean } | null;

const isThai = (s: string) => /[฀-๿]/.test(s);

// Synonym map — expand query before matching so "hi"→"hello", "tasty"→"delicious", etc.
const SYNONYMS: Record<string, string[]> = {
  hi: ["hello", "greet", "greeting"],
  hey: ["hello", "greet"],
  bye: ["goodbye", "farewell"],
  farewell: ["goodbye"],
  greet: ["hello", "greeting"],
  howdy: ["hello"],
  yo: ["hello"],
  yep: ["yes"],
  nope: ["no"],
  ok: ["okay", "alright", "correct"],
  okay: ["yes", "correct", "agree"],
  sure: ["yes", "correct"],
  nah: ["no"],
  tasty: ["delicious"],
  yummy: ["delicious"],
  scrumptious: ["delicious"],
  yuck: ["not delicious"],
  ill: ["sick", "unwell", "fever"],
  sick: ["ill", "fever", "unwell"],
  unwell: ["sick", "ill"],
  pretty: ["beautiful", "lovely"],
  gorgeous: ["beautiful"],
  cute: ["beautiful", "pretty"],
  ugly: ["not beautiful"],
  handsome: ["good-looking"],
  scared: ["afraid", "fear", "frighten"],
  frightened: ["afraid"],
  terrified: ["afraid"],
  fear: ["afraid"],
  glad: ["happy"],
  joyful: ["happy"],
  joyous: ["happy"],
  cheerful: ["happy"],
  unhappy: ["sad"],
  miserable: ["sad"],
  angry: ["mad", "furious"],
  furious: ["angry"],
  mad: ["angry"],
  upset: ["sad", "angry"],
  quick: ["fast"],
  rapid: ["fast"],
  speedy: ["fast"],
  swift: ["fast"],
  huge: ["big", "large"],
  tiny: ["small", "little"],
  little: ["small"],
  purchase: ["buy"],
  shop: ["buy", "shopping"],
  speak: ["talk", "say"],
  chat: ["talk", "speak"],
  physician: ["doctor"],
  doc: ["doctor"],
  nurse: ["nurse"],
  spouse: ["husband", "wife", "partner"],
  partner: ["husband", "wife"],
  boyfriend: ["partner", "love"],
  girlfriend: ["partner", "love"],
  pal: ["friend"],
  buddy: ["friend"],
  mate: ["friend"],
  mommy: ["mother", "mom"],
  mom: ["mother"],
  daddy: ["father", "dad"],
  dad: ["father"],
  grandpa: ["grandfather"],
  grandma: ["grandmother"],
  sleepy: ["tired", "sleep"],
  exhausted: ["tired"],
  starving: ["hungry"],
  thirsty: ["thirsty"],
  annoyed: ["angry", "bored"],
  excited: ["excited"],
  awesome: ["good", "great"],
  great: ["good"],
  excellent: ["good"],
  terrible: ["bad"],
  awful: ["bad"],
  hot: ["hot", "spicy"],
  cold: ["cold", "cool"],
  chilly: ["cold"],
  boiling: ["hot"],
  burning: ["hot"],
  large: ["big"],
  enormous: ["big"],
  petite: ["small"],
  tall: ["tall", "high"],
  short: ["short"],
  look: ["watch", "see"],
  see: ["look", "watch"],
  gaze: ["look", "watch"],
  stare: ["look", "watch"],
  listen: ["hear"],
  hear: ["listen"],
  run: ["jog", "sprint"],
  jog: ["run"],
  walk: ["walk"],
  stroll: ["walk"],
  rest: ["sleep", "relax"],
  relax: ["rest", "calm"],
  study: ["learn", "read"],
  learn: ["study"],
  teach: ["study", "learn"],
  know: ["understand"],
  understand: ["know"],
  forget: ["forget"],
  remember: ["know"],
  help: ["assist"],
  assist: ["help"],
  call: ["phone", "call"],
  phone: ["call"],
  spicy: ["spicy", "hot"],
  sour: ["sour"],
  sweet: ["sweet"],
  salty: ["salty"],
  bitter: ["bitter"],
  flower: ["blossom", "bloom"],
  animal: ["creature"],
  dog: ["canine"],
  cat: ["feline"],
  elephant: ["elephant"],
  temple: ["shrine", "temple"],
  market: ["bazaar", "market"],
  airport: ["terminal"],
  hotel: ["inn", "lodge"],
  hospital: ["clinic"],
  school: ["academy"],
  university: ["college", "school"],
  river: ["stream"],
  mountain: ["hill"],
  ocean: ["sea"],
  rain: ["drizzle"],
  sun: ["sunshine", "sunlight"],
  moon: ["lunar"],
  currency: ["money", "cash"],
  cheap: ["inexpensive", "affordable"],
  expensive: ["costly", "pricey"],
  discount: ["sale", "reduce"],
  receipt: ["invoice", "bill"],
};

function expandQuery(q: string): string[] {
  const base = q.toLowerCase().trim();
  const extra = SYNONYMS[base] ?? [];
  return [base, ...extra];
}

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<DictionaryCategory>("All");
  const [aiResult, setAiResult] = useState<AIResult>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = useMemo(() => {
    const raw = search.trim();
    if (!raw) {
      return DICTIONARY.filter((e) => activeCategory === "All" || e.category === activeCategory);
    }
    const matchCat = (e: (typeof DICTIONARY)[0]) => activeCategory === "All" || e.category === activeCategory;

    if (isThai(raw)) {
      // Thai query → match Thai script or romanization
      const q = raw.toLowerCase();
      return DICTIONARY.filter((e) => matchCat(e) && (e.thai.includes(raw) || e.romanization.toLowerCase().includes(q)));
    }

    // English query — expand with synonyms so "hi" finds "hello", "tasty" finds "delicious"
    const terms = expandQuery(raw); // e.g. ["hi", "hello", "greet", "greeting"]

    const scored = DICTIONARY
      .filter((e) => {
        if (!matchCat(e)) return false;
        const eng = e.english.toLowerCase();
        return terms.some((t) => eng.includes(t));
      })
      .map((e) => {
        const eng = e.english.toLowerCase();
        const engWords = eng.split(/[\s/,;()\-]+/);
        // Score: direct exact word match = 3, synonym exact word match = 2, substring = 1
        const score = engWords.some((w) => w === terms[0])
          ? 3
          : engWords.some((w) => terms.includes(w))
          ? 2
          : 1;
        return { e, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(({ e }) => e);

    return scored;
  }, [search, activeCategory]);

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: DICTIONARY.length };
    for (const e of DICTIONARY) counts[e.category] = (counts[e.category] ?? 0) + 1;
    return counts;
  }, []);

  const handleAiLookup = async () => {
    const q = search.trim().replace(/[﻿​‌‍­]/g, "").trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/dictionary/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: q }),
      });
      const data = await res.json();
      setAiResult({
        query: q,
        text: res.ok && data.result ? data.result : (data.error ?? "ไม่สามารถค้นหาได้ ลองใหม่อีกครั้ง"),
        isError: !res.ok || !!data.error,
      });
    } catch (err) {
      setAiResult({ query: q, text: err instanceof Error ? err.message : "Connection error", isError: true });
    } finally {
      setAiLoading(false);
    }
  };

  const hasSearch = search.trim().length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dictionary</h1>
        <p className="text-gray-400 text-xs mt-0.5">{DICTIONARY.length} คำ · ค้นหาเพิ่มเติมด้วย AI</p>
      </div>

      {/* Search + AI button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setAiResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleAiLookup()}
            placeholder="Thai, romanization, or English..."
            className="w-full pl-10 pr-9 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {search && (
            <button onClick={() => { setSearch(""); setAiResult(null); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>
        {/* AI button — always visible when search has text */}
        <button
          onClick={handleAiLookup}
          disabled={!hasSearch || aiLoading}
          className={cn(
            "flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all flex-shrink-0",
            hasSearch && !aiLoading
              ? "bg-orange-500 text-white shadow-sm active:scale-95 hover:bg-orange-600"
              : "bg-gray-100 text-gray-400 cursor-default"
          )}
        >
          {aiLoading
            ? <Loader2 size={15} className="animate-spin" />
            : <Sparkles size={15} />}
          <span className="hidden sm:inline">AI</span>
        </button>
      </div>

      {/* Category pills — full-bleed horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex gap-2 px-4 pb-1" style={{ width: "max-content" }}>
          {DICTIONARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all",
                activeCategory === cat
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 active:bg-orange-50"
              )}
            >
              <span>{CATEGORY_EMOJI[cat]}</span>
              {cat}
              <span className={cn(
                "text-[10px] font-bold tabular-nums px-1.5 py-px rounded-full",
                activeCategory === cat ? "bg-white/30 text-white" : "bg-gray-100 text-gray-400"
              )}>
                {countByCategory[cat] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-400">
        {filtered.length} {filtered.length === 1 ? "word" : "words"}
        {hasSearch && !isThai(search) && filtered.length > 0 && (
          <span className="ml-1 text-gray-300">· tip: กด AI เพื่อค้นเพิ่ม</span>
        )}
      </p>

      {/* AI Result card */}
      <AnimatePresence>
        {(aiResult || aiLoading) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={cn(
              "rounded-2xl border overflow-hidden shadow-sm",
              aiResult?.isError ? "border-red-200 bg-white" : "border-orange-200 bg-white"
            )}>
            <div className={cn(
              "px-4 py-2.5 flex items-center gap-2",
              aiResult?.isError ? "bg-red-50" : "bg-gradient-to-r from-orange-500 to-amber-400"
            )}>
              {aiLoading
                ? <Loader2 size={13} className="text-white animate-spin" />
                : <Sparkles size={13} className={aiResult?.isError ? "text-red-400" : "text-white"} />}
              <span className={cn("text-xs font-bold", aiResult?.isError ? "text-red-600" : "text-white")}>
                {aiLoading ? `กำลังค้นหา "${search.trim()}"...` : aiResult?.isError ? "ค้นหาไม่สำเร็จ" : `AI — "${aiResult?.query}"`}
              </span>
            </div>
            {aiResult && (
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{aiResult.text}</p>
                <div className="flex gap-3">
                  {!aiResult.isError && (
                    <button onClick={() => speakThai(aiResult.query)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600">
                      <Volume2 size={13} /> ออกเสียง
                    </button>
                  )}
                  {aiResult.isError && (
                    <button onClick={handleAiLookup} className="text-xs font-semibold text-orange-500">
                      ลองใหม่ →
                    </button>
                  )}
                  <button onClick={() => setAiResult(null)} className="text-xs text-gray-400 ml-auto">
                    ปิด
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && !aiLoading && !aiResult && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-semibold text-sm">ไม่พบในพจนานุกรม</p>
          {hasSearch && (
            <p className="text-xs mt-1">กด <span className="text-orange-500 font-bold">AI</span> เพื่อค้นหา</p>
          )}
        </div>
      )}

      {/* Word list */}
      {filtered.length > 0 && (
        <div className="space-y-2.5">
          {filtered.map((entry, i) => (
            <motion.div key={`${entry.thai}-${i}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.012, 0.18) }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="thai-text text-2xl font-bold text-gray-900">{entry.thai}</span>
                    <span className="text-sm text-orange-500 font-medium">{entry.romanization}</span>
                  </div>
                  <p className="text-gray-700 text-sm font-semibold mt-0.5">{entry.english}</p>
                  {entry.example && (
                    <p className="text-xs text-gray-400 mt-1.5 italic leading-relaxed">{entry.example}</p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                      {CATEGORY_EMOJI[entry.category]} {entry.category}
                    </span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", DIFFICULTY_STYLE[entry.difficulty])}>
                      {entry.difficulty}
                    </span>
                  </div>
                </div>
                <button onClick={() => speakThai(entry.thai)}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-500 active:scale-95 transition-all">
                  <Volume2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="h-24 lg:h-6" />
    </div>
  );
}
