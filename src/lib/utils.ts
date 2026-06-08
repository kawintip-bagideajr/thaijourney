import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function levelFromXP(totalXP: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (xpNeeded + xpForLevel(level) <= totalXP) {
    xpNeeded += xpForLevel(level);
    level++;
  }
  return level;
}

export function xpProgressInLevel(totalXP: number): { current: number; needed: number; pct: number } {
  let level = 1;
  let xpUsed = 0;
  while (xpUsed + xpForLevel(level) <= totalXP) {
    xpUsed += xpForLevel(level);
    level++;
  }
  const current = totalXP - xpUsed;
  const needed = xpForLevel(level);
  return { current, needed, pct: Math.round((current / needed) * 100) };
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 365) return "🔥🏆";
  if (streak >= 100) return "🔥💎";
  if (streak >= 30) return "🔥⚡";
  if (streak >= 7) return "🔥";
  if (streak >= 3) return "✨";
  return "⭐";
}

export function heartRefillTime(hearts: number, maxHearts = 5): string {
  if (hearts >= maxHearts) return "Full";
  const minutesPerHeart = 30;
  const minutesLeft = (maxHearts - hearts) * minutesPerHeart;
  const h = Math.floor(minutesLeft / 60);
  const m = minutesLeft % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}
