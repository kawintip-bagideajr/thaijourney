"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, X, Sparkles, Loader2, BookMarked, Crown, Lock } from "lucide-react";
import Link from "next/link";
import { DICTIONARY, DICTIONARY_CATEGORIES, type DictionaryCategory } from "@/data/dictionary";
import { speakThai } from "@/lib/speech";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

const CATEGORY_EMOJI: Record<string, string> = {
  All: "📖", Essentials: "⭐", Greetings: "👋", Questions: "❓",
  Verbs: "⚡", Adjectives: "✨", "Numbers & Time": "🔢", Family: "👨‍👩‍👧",
  "Body & Health": "💪", "Food & Drink": "🍜", Colors: "🎨", Emotions: "😊",
  Places: "📍", Nature: "🌿", Travel: "✈️", Shopping: "🛍️", Culture: "🏯",
};

const DIFF_STRIPE: Record<string, string> = {
  beginner: "bg-green-400",
  intermediate: "bg-amber-400",
  advanced: "bg-red-400",
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
            <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full border-2 border-orange-200 capitalize">
              {pos}
            </span>
          )}
        </div>
        <button
          onClick={onSpeak}
          className="btn-3d flex-shrink-0 w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white [--btn-edge:#c2410c]"
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
  const { t, tc } = useTranslation();

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
        text: res.ok && data.result ? data.result : (data.error ?? t("dict.cantSearch")),
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

      {/* Header: the search box is the hero */}
      <header className="game-card p-4 sm:p-5 space-y-3">
        <div className="flex items-baseline justify-between gap-x-3 gap-y-0.5 flex-wrap px-0.5">
          <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight">{t("dict.title")}</h1>
          <p className="text-sm font-bold text-gray-500">{t("dict.subtitle")}</p>
        </div>

      {/* Search + AI button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setAiResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleAiLookup()}
            placeholder={t("dict.searchPlaceholder")}
            className="w-full h-14 pl-12 pr-10 rounded-2xl border-2 border-[var(--game-edge)] bg-orange-50/40 text-base font-bold outline-none focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
          />
          {search && (
            <button onClick={() => { setSearch(""); setAiResult(null); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl flex items-center justify-center text-gray-500 bg-orange-50 hover:bg-orange-100">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleAiLookup}
          disabled={!hasSearch || aiLoading}
          className={cn(
            "btn-3d h-14 flex items-center gap-1.5 px-4 rounded-2xl font-display text-sm flex-shrink-0",
            hasSearch && !aiLoading
              ? isPro ? "bg-orange-500 text-white [--btn-edge:#c2410c]" : "bg-amber-100 text-amber-700 border-2 border-amber-300 [--btn-edge:#fcd34d]"
              : "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-default [--btn-edge:var(--game-edge)]"
          )}
        >
          {aiLoading
            ? <Loader2 size={15} className="animate-spin" />
            : isPro ? <Sparkles size={15} /> : <Lock size={15} />}
          <span className="hidden sm:inline">{isPro ? t("nav.ai") : t("common.pro")}</span>
        </button>
      </div>

        {/* Stat line */}
        <p className="flex items-center gap-x-3 gap-y-1 flex-wrap px-0.5 text-xs font-extrabold text-gray-500">
          <span className="inline-flex items-center gap-1 text-orange-600 tabular-nums">
            <BookMarked size={13} aria-hidden="true" />{t("dict.wordCount", { n: DICTIONARY.length })}
          </span>
          <span className="text-green-700">{t("dict.categories")}</span>
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Sparkles size={13} aria-hidden="true" />{t("dict.aiAnyWord")}
          </span>
        </p>
      </header>

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
          <div className="flex gap-2 px-6 pt-1 pb-2.5" style={{ width: "max-content" }}>
            {DICTIONARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border-2 transition-colors duration-150",
                  activeCategory === cat
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-[var(--game-edge)] shadow-[0_3px_0_var(--game-edge)] hover:bg-orange-50 hover:text-orange-600"
                )}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="category-active-bg"
                    className="absolute -inset-[2px] bg-orange-500 rounded-2xl shadow-[0_3px_0_#c2410c]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10" aria-hidden="true">{CATEGORY_EMOJI[cat]}</span>
                <span className="relative z-10">{cat}</span>
                <span className={cn(
                  "relative z-10 text-[10px] font-bold tabular-nums px-1.5 py-px rounded-full",
                  activeCategory === cat ? "bg-white/30 text-white" : "bg-orange-50 text-orange-500"
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
        <p className="text-xs font-extrabold text-gray-500 px-1">
          🔎 {t("dict.found", { n: filtered.length })}
          {!isThai(search) && filtered.length > 0 && (
            <span className="ml-1 font-bold text-gray-400">{t("dict.pressAiMore")}</span>
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
              "game-card overflow-hidden",
              aiResult?.isError ? "!border-red-200 !shadow-[0_5px_0_#fecaca]" : "!border-orange-200 !shadow-[0_5px_0_#fed7aa]"
            )}
          >
            <div className={cn(
              "px-4 py-2.5 flex items-center gap-2",
              aiResult?.isError ? "bg-red-50" : "bg-orange-500"
            )}>
              {aiLoading
                ? <Loader2 size={13} className="text-white animate-spin" />
                : <Sparkles size={13} className={aiResult?.isError ? "text-red-400" : "text-white"} />}
              <span className={cn("text-xs font-extrabold", aiResult?.isError ? "text-red-600" : "text-white")}>
                {aiLoading
                  ? t("dict.searching", { q: search.trim() })
                  : aiResult?.isError
                  ? t("dict.searchFailed")
                  : t("dict.aiDictResult", { q: aiResult?.query ?? "" })}
              </span>
            </div>
            {aiResult && (
              <div className="p-4 space-y-3">
                {aiResult.isError && aiResult.text === "PRO_REQUIRED" ? (
                  <div className="flex flex-col items-center text-center py-2 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                      <Lock size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-display text-gray-900 text-base">{t("dict.proFeature")}</p>
                      <p className="text-xs font-bold text-gray-500 mt-0.5">{t("dict.aiDictRequiresPro")}</p>
                    </div>
                    <Link href="/pricing" className="btn-3d h-11 px-5 rounded-2xl bg-orange-500 text-white font-display text-sm flex items-center gap-1.5 [--btn-edge:#c2410c]">
                      <Crown size={14} />{t("dict.upgradeToPro")}
                    </Link>
                    <button onClick={() => setAiResult(null)} className="text-xs font-bold text-gray-500 hover:text-gray-700">{t("common.dismiss")}</button>
                  </div>
                ) : aiResult.isError ? (
                  <>
                    <p className="text-sm font-bold text-red-500">{aiResult.text}</p>
                    <div className="flex items-center gap-3 pt-3 border-t-2 border-gray-100">
                      <button onClick={handleAiLookup} className="btn-3d h-9 px-4 rounded-2xl bg-orange-500 text-white text-xs font-extrabold [--btn-edge:#c2410c]">{t("common.tryAgain")}</button>
                      <button onClick={() => setAiResult(null)} className="text-xs font-bold text-gray-500 ml-auto hover:text-gray-700">{t("common.dismiss")}</button>
                    </div>
                  </>
                ) : (
                  <>
                    <AiResultBody text={aiResult.text} onSpeak={() => speakThai(aiResult.query)} />
                    <div className="flex items-center gap-3 pt-3 border-t-2 border-gray-100">
                      <button onClick={() => setAiResult(null)} className="text-xs font-bold text-gray-500 ml-auto hover:text-gray-700">{t("common.dismiss")}</button>
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
        <div className="game-panel text-center py-10 px-5 text-gray-500">
          <div className="text-6xl mb-3 select-none" aria-hidden="true">🔍</div>
          <p className="font-display text-base text-gray-700">{t("dict.noResults")}</p>
          {hasSearch && (
            <p className="text-xs font-bold mt-1">
              {t("dict.pressAiToSearch", { ai: "AI" })}
            </p>
          )}
        </div>
      )}

      {/* Word list */}
      {filtered.length > 0 && (
        <div className="game-panel game-rows overflow-hidden">
          {filtered.map((entry, i) => (
            <div
              key={`${entry.thai}-${i}`}
              className="p-4 pl-3 flex gap-3"
            >
              <span className={cn("w-1.5 shrink-0 self-stretch rounded-full", DIFF_STRIPE[entry.difficulty])} aria-hidden="true" />
              <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
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
                  <p className="text-gray-800 text-sm font-bold mt-0.5">{tc(entry.english)}</p>
                  {/* Example */}
                  {entry.example && (
                    <p className="text-xs font-semibold text-gray-500 mt-2 italic leading-relaxed rounded-xl bg-orange-50 border-2 border-orange-100 px-2.5 py-1.5">
                      {entry.example}
                    </p>
                  )}
                  {/* Tags */}
                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-white text-gray-600 rounded-full border-2 border-[var(--game-edge)]">
                      {CATEGORY_EMOJI[entry.category]} {entry.category}
                    </span>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full capitalize",
                      DIFF_BADGE[entry.difficulty]
                    )}>
                      {entry.difficulty}
                    </span>
                  </div>
                </div>

                {/* Speak button */}
                <button
                  onClick={() => speakThai(entry.thai)}
                  className="btn-3d flex-shrink-0 w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center text-white [--btn-edge:#c2410c]"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-24 lg:h-6" />
    </div>
  );
}
