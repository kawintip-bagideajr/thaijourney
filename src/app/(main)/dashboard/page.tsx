"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, BookOpen, Clock, Trophy, Zap, Map, Star } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import { GoalRing } from "@/components/dashboard/GoalRing";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { XPChart } from "@/components/dashboard/XPChart";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { xpProgressInLevel, formatNumber } from "@/lib/utils";

function generateWeekData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    day,
    xp: i < 5 ? Math.floor(Math.random() * 80) + 10 : Math.floor(Math.random() * 30),
  }));
}

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const [weekData] = useState(generateWeekData());
  const [todayMinutes] = useState(Math.floor(Math.random() * 20));

  if (!profile) return null;

  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            สวัสดี, {profile.display_name ?? profile.username}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {profile.current_streak > 0
              ? `You're on a ${profile.current_streak}-day streak! Keep it going.`
              : "Start a lesson to begin your streak!"}
          </p>
        </div>
        <Link href="/learn">
          <Button size="lg" className="gap-2 shadow-md">
            <BookOpen size={18} />
            Continue Learning
          </Button>
        </Link>
      </motion.div>

      {/* Top row: Goal ring + Level progress + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center"
        >
          <GoalRing current={todayMinutes} goal={profile.daily_goal_minutes} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center gap-4"
        >
          <div className="flex items-center gap-4">
            <LevelBadge level={profile.level} size="lg" />
            <div>
              <p className="text-sm text-gray-400 font-medium">Current Level</p>
              <p className="text-3xl font-black text-gray-900">{profile.level}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>{current} XP</span>
              <span>{needed} XP to next level</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center"
        >
          <StreakCounter streak={profile.current_streak} size="lg" />
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total XP" value={formatNumber(profile.total_xp)} icon={Zap} color="orange" />
        <StatsCard label="Best Streak" value={`${profile.longest_streak}d`} icon={Flame} color="red" />
        <StatsCard label="Time Studied" value="12h" icon={Clock} color="blue" />
        <StatsCard label="Provinces" value="3" icon={Map} color="green" />
      </div>

      {/* XP Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <h2 className="font-bold text-gray-900 mb-4">Weekly XP</h2>
        <XPChart data={weekData} />
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Link href="/alphabet" className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100 hover:shadow-md transition-all">
          <div className="text-3xl mb-3">🔤</div>
          <p className="font-bold text-blue-900">Thai Alphabet</p>
          <p className="text-sm text-blue-600 mt-1">Master the basics</p>
        </Link>
        <Link href="/map" className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 hover:shadow-md transition-all">
          <div className="text-3xl mb-3">🗺️</div>
          <p className="font-bold text-green-900">Adventure Map</p>
          <p className="text-sm text-green-600 mt-1">Unlock new provinces</p>
        </Link>
        <Link href="/chat" className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 border border-purple-100 hover:shadow-md transition-all">
          <div className="text-3xl mb-3">🤖</div>
          <p className="font-bold text-purple-900">AI Chat</p>
          <p className="text-sm text-purple-600 mt-1">Practice conversation</p>
        </Link>
      </motion.div>
    </div>
  );
}
