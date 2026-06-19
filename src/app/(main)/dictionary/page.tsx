"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, X, Sparkles, Loader2, BookMarked, Crown, Lock } from "lucide-react";
import Link from "next/link";
import { DICTIONARY, DICTIONARY_CATEGORIES, type DictionaryCategory } from "@/data/dictionary";
import { speakThai } from "@/lib/speech";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const CATEGORY_EMOJI: Record<string, string> = {
  All: "📖", Essentials: "⭐", Greetings: "👋", Questions: "❓",
  Verbs: "⚡", Adjectives: "✨", "Numbers & Time": "🔢", Family: "👨‍👩‍👧",
  "Body & Health": "💪", "Food & Drink": "🍜", Colors: "🎨", Emotions: "😊",
  Places: "📍", Nature: "🌿", Travel: "✈️", Shopping: "🛍️", Culture: "🏯",
};

const DIFF_BORDER: Record<string, string> = {
  beginner: "border-l-green-400",
  intermediate: "border-l-amber-400",
  advanced: "border-l-red-400",
};

const DIFF_BADGE: Record<string, string> = {
  beginner: "bg-green-50 text-green-600 ring-1 ring-green-200",
  intermediate: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  advanced: "bg-red-50 text-red-500 ring-1 ring-red-200",
};

type AIResult = { query: string; text: string; isError?: boolean } | null;

const isThai = (s: string) => /[฀-๿]/.test(s);

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

const THAI_RE = /[฀-๿]/;

function parseAiResult(text: string) {
  const lines = text.split("\n").map((l) => l.replace(/\*\*/g, "").trim()).filter(Boolean);

  const wordLine = lines.find((l) => THAI_RE.test(l) && !(/—|–/.test(l) && l.split(/—|–/).length > 1 && THAI_RE.test(l.split(/—|–/)[0]))) ?? null;
  const meaningLine = lines.find((l) => /^meaning:/i.test(l)) ?? null;
  const exampleLine = lines.find((l) => /^example:|^phrase:/i.test(l) || (THAI_RE.test(l) && /—|–/.test(l) && l !== wordLine)) ?? null;

  let thai = "", romanization = "", pos = "";
  if (wordLine) {
    const thaiMatch = wordLine.match(/[฀-๿]+/g);
    thai = thaiMatch ? thaiMatch.join("") : "";
    const parenMatch = wordLine.match(/\(([^)]+)\)/);
    const afterThai = wordLine.replace(/[฀-๿]+/g, "").replace(/\(([^)]+)\)/, "").trim();
    const dotParts = afterThai.split(/[·\-–]/).map((s) => s.trim()).filter(Boolean);
    romanization = parenMatch ? parenMatch[1] : (dotParts[0] ?? "");
    pos = dotParts[dotParts.length - 1] && dotParts.length > 1 ? dotParts[dotParts.length - 1] : (dotParts[0] !== romanization ? dotParts[0] : "");
  }

  const meaning = meaningLine
    ? meaningLine.replace(/^meaning:\s*/i, "").trim()
    : (lines.find((l) => !THAI_RE.test(l) && !/^example:|^phrase:/i.test(l) && l !== wordLine) ?? "");

  const exampleRaw = exampleLine
    ? exampleLine.replace(/^(example|phrase):\s*/i, "").trim()
    : null;

  return { thai, romanization, pos, meaning, example: exampleRaw, parsed: !!(thai || meaning), raw: text };
}

function AiResultBody({ text, onSpeak }: { text: string; onSpeak: () => void }) {
  const { thai, romanization, pos, meaning, example, parsed, raw } = parseAiResult(text);

  if (!parsed) {
    return <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{raw}</p>;
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            {thai && <span className="thai-text text-2xl font-bold text-gray-900 leading-tight">{thai}</span>}
            {romanization && <span className="text-sm text-orange-500 font-semibold">{romanization}</span>}
          </div>
          {pos && (
            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full ring-1 ring-orange-200 capitalize">
              {pos}
            </span>
          )}
        </div>
        <button
          onClick={onSpeak}
          className="flex-shrink-0 w-9 h-9 rounded-xl gradient-thai flex items-center justify-center text-white shadow-sm active:scale-95 transition-all"
        >
          <Volume2 size={15} />
        </button>
      </div>
      {meaning && <p className="text-sm font-semibold text-gray-800">{meaning}</p>}
      {example && (
        <p className="text-xs text-gray-400 italic border-l-2 border-orange-200 pl-2.5 leading-relaxed">{example}</p>
      )}
    </div>
  );
}

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
  const profile = useAuthStore((s) => s.profile);
  const isPro = profile?.access_tier === "pro";

  const filtered = useMemo(() => {
    const raw = search.trim();
    if (!raw) {
      return DICTIONARY.filter((e) => activeCategory === "All" || e.category === activeCategory);
    }
    const matchCat = (e: (typeof DICTIONARY)[0]) => activeCategory === "All" || e.category === activeCategory;

    if (isThai(raw)) {
      const q = raw.toLowerCase();
      return DICTIONARY.filter((e) => matchCat(e) && (e.thai.includes(raw) || e.romanization.toLowerCase().includes(q)));
    }

    const terms = expandQuery(raw);
    const scored = DICTIONARY
      .filter((e) => {
        if (!matchCat(e)) return false;
        const eng = e.english.toLowerCase();
        return terms.some((t) => eng.includes(t));
      })
      .map((e) => {
        const eng = e.english.toLowerCase();
        const engWords = eng.split(/[\s/,;()\-]+/);
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
    if (!isPro) {
      setAiResult({ query: q, text: "PRO_REQUIRED", isError: true });
      return;
    }
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/dictionary/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: q }),
      });
      const data = await res.json();
      if (data.error === "PRO_REQUIRED") {
        setAiResult({ query: q, text: "PRO_REQUIRED", isError: true });
        return;
      }
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

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    let velocity = 0;
    let rafId = 0;
    const tick = () => {
      if (Math.abs(velocity) < 0.4) { velocity = 0; return; }
      el.scrollLeft += velocity;
      velocity *= 0.86;
      rafId = requestAnimationFrame(tick);
    };
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        velocity += e.deltaY * 0.55;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => { el.removeEventListener("wheel", handler); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-thai rounded-3xl p-5 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <BookMarked size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black leading-tight">พจนานุกรม</h1>
            <p className="text-orange-100 text-xs font-medium">Thai Dictionary</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <div className="bg-white/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-bold">{DICTIONARY.length} คำ</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-bold">16 หมวดหมู่</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-bold">✨ AI ค้นหาได้ทุกคำ</p>
          </div>
        </div>
      </motion.div>

      {/* Search + AI button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setAiResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleAiLookup()}
            placeholder="ไทย, romanization, หรือ English..."
            className="w-full pl-10 pr-9 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm"
          />
          {search && (
            <button onClick={() => { setSearch(""); setAiResult(null); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleAiLookup}
          disabled={!hasSearch || aiLoading}
          className={cn(
            "flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all flex-shrink-0 shadow-sm",
            hasSearch && !aiLoading
              ? isPro ? "gradient-thai text-white active:scale-95 hover:opacity-90" : "bg-amber-100 text-amber-600 active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-default"
          )}
        >
          {aiLoading
            ? <Loader2 size={15} className="animate-spin" />
            : isPro ? <Sparkles size={15} /> : <Lock size={15} />}
          <span className="hidden sm:inline">{isPro ? "AI" : "Pro"}</span>
        </button>
      </div>

      {/* Category pills — gradient-fade edges + momentum scroll + spring active indicator */}
      <div className="relative -mx-4">
        <div
          ref={categoryScrollRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            maskImage: "linear-gradient(to right, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%)",
          }}
        >
          <div className="flex gap-2 px-6 pb-1" style={{ width: "max-content" }}>
            {DICTIONARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-150",
                  activeCategory === cat
                    ? "text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                )}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="category-active-bg"
                    className="absolute inset-0 gradient-thai rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{CATEGORY_EMOJI[cat]}</span>
                <span className="relative z-10">{cat}</span>
                <span className={cn(
                  "relative z-10 text-[10px] font-bold tabular-nums px-1.5 py-px rounded-full",
                  activeCategory === cat ? "bg-white/30 text-white" : "bg-gray-100 text-gray-400"
                )}>
                  {countByCategory[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      {hasSearch && (
        <p className="text-xs text-gray-400 px-0.5">
          พบ <span className="font-bold text-gray-600">{filtered.length}</span> คำ
          {!isThai(search) && filtered.length > 0 && (
            <span className="ml-1 text-gray-300">· กด AI เพื่อค้นเพิ่ม</span>
          )}
        </p>
      )}

      {/* AI Result card */}
      <AnimatePresence>
        {(aiResult || aiLoading) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={cn(
              "rounded-2xl border overflow-hidden shadow-md",
              aiResult?.isError ? "border-red-200" : "border-orange-200"
            )}
          >
            <div className={cn(
              "px-4 py-2.5 flex items-center gap-2",
              aiResult?.isError ? "bg-red-50" : "gradient-thai"
            )}>
              {aiLoading
                ? <Loader2 size={13} className="text-white animate-spin" />
                : <Sparkles size={13} className={aiResult?.isError ? "text-red-400" : "text-white"} />}
              <span className={cn("text-xs font-bold", aiResult?.isError ? "text-red-600" : "text-white")}>
                {aiLoading
                  ? `กำลังค้นหา "${search.trim()}"...`
                  : aiResult?.isError
                  ? "ค้นหาไม่สำเร็จ"
                  : `AI Dictionary — "${aiResult?.query}"`}
              </span>
            </div>
            {aiResult && (
              <div className="p-4 bg-white space-y-3">
                {aiResult.isError && aiResult.text === "PRO_REQUIRED" ? (
                  <div className="flex flex-col items-center text-center py-2 gap-3">
                    <Lock size={20} className="text-amber-400" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Pro Feature</p>
                      <p className="text-xs text-gray-500 mt-0.5">AI Dictionary requires Pro Access</p>
                    </div>
                    <Link href="/pricing" className="text-xs font-bold text-orange-500 flex items-center gap-1">
                      <Crown size={12} />Upgrade to Pro →
                    </Link>
                    <button onClick={() => setAiResult(null)} className="text-xs text-gray-400">Dismiss</button>
                  </div>
                ) : aiResult.isError ? (
                  <>
                    <p className="text-sm text-red-500">{aiResult.text}</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                      <button onClick={handleAiLookup} className="text-xs font-semibold text-orange-500">Try again →</button>
                      <button onClick={() => setAiResult(null)} className="text-xs text-gray-400 ml-auto">Dismiss</button>
                    </div>
                  </>
                ) : (
                  <>
                    <AiResultBody text={aiResult.text} onSpeak={() => speakThai(aiResult.query)} />
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                      <button onClick={() => setAiResult(null)} className="text-xs text-gray-400 ml-auto hover:text-gray-600">Dismiss</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && !aiLoading && !aiResult && (
        <div className="text-center py-16 text-gray-400">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Search size={24} className="text-gray-300" />
          </div>
          <p className="font-semibold text-sm text-gray-500">ไม่พบในพจนานุกรม</p>
          {hasSearch && (
            <p className="text-xs mt-1">
              กด <span className="text-orange-500 font-bold">AI</span> เพื่อค้นหาจาก AI
            </p>
          )}
        </div>
      )}

      {/* Word list */}
      {filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map((entry, i) => (
            <motion.div
              key={`${entry.thai}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.012, 0.18) }}
              className={cn(
                "bg-white rounded-2xl border border-gray-100 shadow-sm p-4 border-l-4",
                DIFF_BORDER[entry.difficulty]
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Thai + romanization */}
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="thai-text text-2xl font-bold text-gray-900 leading-tight">
                      {entry.thai}
                    </span>
                    <span className="text-sm text-orange-500 font-semibold tracking-wide">
                      {entry.romanization}
                    </span>
                  </div>
                  {/* English meaning */}
                  <p className="text-gray-800 text-sm font-bold mt-0.5">{entry.english}</p>
                  {/* Example */}
                  {entry.example && (
                    <p className="text-xs text-gray-400 mt-1.5 italic leading-relaxed border-l-2 border-gray-100 pl-2">
                      {entry.example}
                    </p>
                  )}
                  {/* Tags */}
                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
                      {CATEGORY_EMOJI[entry.category]} {entry.category}
                    </span>
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize",
                      DIFF_BADGE[entry.difficulty]
                    )}>
                      {entry.difficulty}
                    </span>
                  </div>
                </div>

                {/* Speak button */}
                <button
                  onClick={() => speakThai(entry.thai)}
                  className="flex-shrink-0 w-10 h-10 rounded-xl gradient-thai flex items-center justify-center text-white shadow-sm active:scale-95 transition-all hover:opacity-90"
                >
                  <Volume2 size={16} />
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
