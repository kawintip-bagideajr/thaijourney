"use client";
import type { ThaiConsonant } from "@/data/alphabet";
import { cn } from "@/lib/utils";

interface ConsonantCardProps {
  consonant: ThaiConsonant;
  onSelect: (consonant: ThaiConsonant) => void;
}

const classBg = {
  high: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  mid: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  low: "bg-green-50 border-green-200 hover:bg-green-100",
};

const classText = {
  high: "text-blue-700",
  mid: "text-orange-700",
  low: "text-green-700",
};

const classBadge = {
  high: "bg-blue-200 text-blue-800",
  mid: "bg-orange-200 text-orange-800",
  low: "bg-green-200 text-green-800",
};

export function ConsonantCard({ consonant, onSelect }: ConsonantCardProps) {
  return (
    <button
      onClick={() => onSelect(consonant)}
      className={cn(
        "w-full aspect-[3/4] rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-sm",
        classBg[consonant.class]
      )}
    >
      <span className={cn("text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md", classBadge[consonant.class])}>
        {consonant.class}
      </span>
      <span className={cn("text-5xl thai-text font-bold", classText[consonant.class])}>
        {consonant.thai}
      </span>
      <span className="text-xs font-semibold text-gray-500">{consonant.rtgs}</span>
    </button>
  );
}
