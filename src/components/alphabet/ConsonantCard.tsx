"use client";
import type { ThaiConsonant, ConsonantClass } from "@/data/alphabet";

interface ConsonantCardProps {
  consonant: ThaiConsonant;
  onSelect: (consonant: ThaiConsonant) => void;
}

const classConfig: Record<ConsonantClass, {
  bg: string; border: string; edge: string; char: string; badgeBg: string; badgeText: string;
}> = {
  high: {
    bg: "#f0f9ff",
    border: "#bae6fd",
    edge: "#7dd3fc",
    char: "#0284c7",
    badgeBg: "#e0f2fe",
    badgeText: "#0369a1",
  },
  mid: {
    bg: "#fff7ed",
    border: "#fed7aa",
    edge: "#fdba74",
    char: "#ea580c",
    badgeBg: "#ffedd5",
    badgeText: "#c2410c",
  },
  low: {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    edge: "#86efac",
    char: "#16a34a",
    badgeBg: "#dcfce7",
    badgeText: "#15803d",
  },
};

export function ConsonantCard({ consonant, onSelect }: ConsonantCardProps) {
  const cfg = classConfig[consonant.class];
  return (
    <button
      onClick={() => onSelect(consonant)}
      style={{ background: cfg.bg, borderColor: cfg.border, ["--btn-edge" as string]: cfg.edge }}
      className="btn-3d w-full aspect-[3/4] rounded-3xl border-2 flex flex-col items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
    >
      <span
        style={{ background: cfg.badgeBg, color: cfg.badgeText }}
        className="text-[9px] font-black capitalize px-2 py-0.5 rounded-full"
      >
        {consonant.class}
      </span>
      <span style={{ color: cfg.char }} className="text-5xl thai-text font-bold leading-none drop-shadow-sm">
        {consonant.thai}
      </span>
      <span className="text-[11px] font-extrabold text-gray-500">{consonant.rtgs}</span>
    </button>
  );
}
