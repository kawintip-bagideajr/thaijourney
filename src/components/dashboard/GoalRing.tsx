"use client";
import { motion } from "framer-motion";

interface GoalRingProps {
  current: number;
  goal: number;
  unit?: string;
}

export function GoalRing({ current, goal, unit = "min" }: GoalRingProps) {
  const pct = Math.min(100, (current / goal) * 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="url(#goalGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-900">{current}</span>
          <span className="text-xs text-gray-400">/ {goal} {unit}</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-600 mt-2">Daily Goal</p>
      <p className={`text-xs ${pct >= 100 ? "text-green-500 font-bold" : "text-gray-400"}`}>
        {pct >= 100 ? "Goal reached! 🎉" : `${Math.round(pct)}% complete`}
      </p>
    </div>
  );
}
