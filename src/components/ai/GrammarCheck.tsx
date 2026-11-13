"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Lightbulb, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GrammarResult {
  isCorrect: boolean;
  original: string;
  corrected: string;
  romanization: string;
  explanation: string;
  tip: string;
}

const EXAMPLES = [
  "ผมไปตลาดเมื่อวาน",
  "ฉัน ชอบ กิน ข้าวผัด",
  "เขา ไม่ มา โรงเรียน",
];

export function GrammarCheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<GrammarResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = async (input = text) => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Grammar check failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-4">
      {/* Input card */}
      <div className="game-card p-5 space-y-3">
        <p className="font-display text-base text-gray-900">✍️ Enter Thai text to check</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) check();
          }}
          placeholder="พิมพ์ประโยคภาษาไทยที่นี่..."
          className="w-full rounded-2xl border-2 border-[var(--game-edge)] bg-white px-4 py-3 text-base font-bold thai-text resize-none outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
          rows={3}
        />
        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setText(ex); check(ex); }}
              className="text-sm font-bold thai-text bg-orange-50 text-orange-600 border-2 border-orange-200 rounded-2xl px-3 py-1 hover:bg-orange-100 hover:-translate-y-0.5 transition"
            >
              {ex}
            </button>
          ))}
        </div>
        <Button
          onClick={() => check()}
          disabled={!text.trim() || loading}
          className="w-full h-12 rounded-2xl font-display text-base"
        >
          {loading
            ? <><Loader2 size={16} className="animate-spin mr-2" />Checking...</>
            : "Check Grammar"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-2xl px-4 py-3 text-sm font-bold border-2 border-red-200">
          <AlertTriangle size={16} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="game-card p-5 space-y-4">
          {/* Status banner */}
          <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl font-display text-base border-2",
            result.isCorrect ? "bg-green-50 text-green-700 border-green-300" : "bg-amber-50 text-amber-700 border-amber-200"
          )}>
            <span className="text-2xl" aria-hidden="true">{result.isCorrect ? "🎉" : "🧐"}</span>
            {result.isCorrect
              ? <CheckCircle2 size={20} className="shrink-0" />
              : <XCircle size={20} className="shrink-0" />}
            {result.isCorrect ? "Looks correct!" : "Found an issue"}
          </div>

          {/* Before / After */}
          {!result.isCorrect && (
            <div className="game-rows rounded-2xl bg-orange-50 border-2 border-orange-100 px-3">
              <div className="flex items-start gap-3 py-2.5">
                <span className="text-xs font-extrabold text-red-500 mt-1 w-16 flex-shrink-0">Before</span>
                <span className="thai-text text-base text-red-500 line-through leading-relaxed">{result.original}</span>
              </div>
              <div className="flex items-start gap-3 py-2.5">
                <span className="text-xs font-extrabold text-green-600 mt-1 w-16 flex-shrink-0">After</span>
                <span className="thai-text text-base text-green-700 font-bold leading-relaxed">{result.corrected}</span>
              </div>
            </div>
          )}

          {/* Romanization */}
          <div>
            <p className="text-xs font-extrabold text-gray-500 mb-1">🔤 Romanization (RTGS)</p>
            <p className="text-base font-extrabold text-orange-500 break-words">{result.romanization}</p>
          </div>

          {/* Explanation */}
          <div>
            <p className="text-xs font-extrabold text-gray-500 mb-1">📝 Explanation</p>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>

          {/* Tip */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 flex gap-3">
            <Lightbulb size={18} className="text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-sky-600 mb-0.5">Grammar Tip</p>
              <p className="text-sm font-semibold text-sky-800 leading-relaxed">{result.tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
