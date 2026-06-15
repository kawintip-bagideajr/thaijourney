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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3">
        <p className="text-sm font-bold text-gray-700">Enter Thai text to check</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) check();
          }}
          placeholder="พิมพ์ประโยคภาษาไทยที่นี่..."
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm thai-text resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          rows={3}
        />
        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setText(ex); check(ex); }}
              className="text-xs thai-text bg-gray-50 text-gray-600 border border-gray-200 rounded-full px-3 py-1 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
        <Button
          onClick={() => check()}
          disabled={!text.trim() || loading}
          className="w-full rounded-xl"
        >
          {loading
            ? <><Loader2 size={16} className="animate-spin mr-2" />Checking...</>
            : "Check Grammar"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm border border-red-100">
          <AlertTriangle size={16} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          {/* Status banner */}
          <div className={cn(
            "flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold",
            result.isCorrect ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          )}>
            {result.isCorrect
              ? <CheckCircle2 size={20} />
              : <XCircle size={20} />}
            {result.isCorrect ? "Looks correct!" : "Found an issue"}
          </div>

          {/* Before / After */}
          {!result.isCorrect && (
            <div className="space-y-2 bg-gray-50 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide mt-1 w-16 flex-shrink-0">Before</span>
                <span className="thai-text text-base text-red-500 line-through leading-relaxed">{result.original}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wide mt-1 w-16 flex-shrink-0">After</span>
                <span className="thai-text text-base text-green-700 font-bold leading-relaxed">{result.corrected}</span>
              </div>
            </div>
          )}

          {/* Romanization */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Romanization (RTGS)</p>
            <p className="text-sm font-semibold text-orange-500">{result.romanization}</p>
          </div>

          {/* Explanation */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Explanation</p>
            <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>

          {/* Tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3">
            <Lightbulb size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wide mb-0.5">Grammar Tip</p>
              <p className="text-sm text-blue-700 leading-relaxed">{result.tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
