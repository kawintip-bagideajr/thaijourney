"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";

interface Leader {
  rank: number;
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  level: number;
  current_streak: number;
  weeklyXP: number;
  isCurrentUser: boolean;
}

const rankColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export default function LeaderboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"weekly" | "allTime">("weekly");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => {
        setLeaders(data.leaders ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const topThree = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Leaderboard</h1>
        <p className="text-gray-500 text-sm mt-1">Top learners this week</p>
      </div>

      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
        {[{ id: "weekly", label: "This Week" }, { id: "allTime", label: "All Time" }].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "weekly" | "allTime")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {leaders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🏆</p>
          <p className="font-semibold">No data yet</p>
          <p className="text-sm mt-1">Complete lessons to appear on the leaderboard!</p>
        </div>
      ) : (
        <>
          {/* Podium */}
          {topThree.length >= 1 && (
            <div className="flex items-end justify-center gap-4 pt-4 pb-8">
              {[topThree[1], topThree[0], topThree[2]].map((leader, i) => {
                if (!leader) return <div key={i} className="w-16" />;
                const heights = ["h-24", "h-32", "h-20"];
                const displayRank = [2, 1, 3][i];
                return (
                  <motion.div
                    key={leader.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="text-2xl">{displayRank === 1 ? "👑" : ""}</div>
                    <div className="w-12 h-12 gradient-thai rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {(leader.display_name ?? leader.username)[0].toUpperCase()}
                    </div>
                    <p className="text-xs font-bold text-gray-700 max-w-[80px] text-center truncate">
                      {leader.display_name ?? leader.username}
                    </p>
                    <p className="text-xs text-amber-500 font-bold">{leader.weeklyXP} XP</p>
                    <div className={cn(
                      "w-16 rounded-t-2xl flex items-end justify-center pb-2",
                      heights[i],
                      displayRank === 1 ? "bg-yellow-100 border-2 border-yellow-300" :
                      displayRank === 2 ? "bg-gray-100 border-2 border-gray-300" : "bg-amber-50 border-2 border-amber-200"
                    )}>
                      <span className={cn("text-2xl font-black", rankColors[displayRank - 1])}>
                        {displayRank}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Full list */}
          <div className="space-y-2">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                  leader.isCurrentUser ? "bg-orange-50 border-orange-200 shadow-sm" : "bg-white border-gray-100"
                )}
              >
                <span className={cn("text-lg font-black w-6 text-center", rankColors[leader.rank - 1] ?? "text-gray-400")}>
                  {leader.rank}
                </span>
                <div className="w-10 h-10 gradient-thai rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                  {(leader.display_name ?? leader.username)[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      {leader.display_name ?? leader.username}
                    </p>
                    {leader.isCurrentUser && (
                      <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded-full">You</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <LevelBadge level={leader.level} size="sm" />
                    <div className="flex items-center gap-1">
                      <Flame size={12} className="text-orange-400" />
                      <span className="text-xs text-gray-400">{leader.current_streak}d</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Zap size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-black text-amber-600 text-sm">{leader.weeklyXP}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">this week</p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
