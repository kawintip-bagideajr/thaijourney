"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Zap, Map, Flame } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";
import { GoalRing } from "@/components/dashboard/GoalRing";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { XPChart } from "@/components/dashboard/XPChart";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { xpProgressInLevel, formatNumber } from "@/lib/utils";

interface DayXP { day: string; xp: number; }

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const [weekData, setWeekData] = useState<DayXP[]>([]);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [provincesCount, setProvincesCount] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (!profile) return;
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // Weekly XP + today minutes
    const activityQuery = query(
      collection(db, "daily_activity"),
      where("user_id", "==", profile.id),
      where("activity_date", ">=", sevenDaysAgo)
    );
    getDocs(activityQuery).then((snap) => {
      const byDate: Record<string, { xp: number; mins: number }> = {};
      snap.docs.forEach((doc) => {
        const d = doc.data();
        byDate[d.activity_date] = { xp: d.xp_earned ?? 0, mins: d.minutes_studied ?? 0 };
      });

      const week: DayXP[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().split("T")[0];
        week.push({ day: DAYS[d.getDay()], xp: byDate[key]?.xp ?? 0 });
      }
      setWeekData(week);
      setTodayMinutes(byDate[todayStr]?.mins ?? 0);

      const total = snap.docs.reduce((sum, doc) => sum + (doc.data().minutes_studied ?? 0), 0);
      setTotalMinutes(total);
    });

    // Provinces count
    const provincesQuery = query(
      collection(db, "user_provinces"),
      where("user_id", "==", profile.id)
    );
    getCountFromServer(provincesQuery).then((snap) => setProvincesCount(snap.data().count));
  }, [profile?.id]);

  if (!profile) return null;

  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);
  const hoursStudied = Math.floor(totalMinutes / 60);
  const minsRemainder = totalMinutes % 60;
  const timeDisplay = hoursStudied > 0 ? `${hoursStudied}h${minsRemainder > 0 ? ` ${minsRemainder}m` : ""}` : `${totalMinutes}m`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total XP" value={formatNumber(profile.total_xp)} icon={Zap} color="orange" />
        <StatsCard label="Best Streak" value={`${profile.longest_streak}d`} icon={Flame} color="red" />
        <StatsCard label="Time Studied" value={totalMinutes > 0 ? timeDisplay : "0m"} icon={Clock} color="blue" />
        <StatsCard label="Provinces" value={String(provincesCount)} icon={Map} color="green" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <h2 className="font-bold text-gray-900 mb-4">Weekly XP</h2>
        <XPChart data={weekData} />
      </motion.div>

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
