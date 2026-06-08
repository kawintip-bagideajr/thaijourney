"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Camera, Edit3, Flame, Zap, Trophy, Map } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { xpProgressInLevel, formatNumber } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/data/achievements";

export default function ProfilePage() {
  const profile = useAuthStore((s) => s.profile);
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) return null;
  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);

  const displayedAchievements = ACHIEVEMENTS.slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 gradient-thai relative">
          <button className="absolute bottom-2 right-2 bg-white/20 hover:bg-white/30 transition-colors text-white rounded-full p-2">
            <Camera size={16} />
          </button>
        </div>

        {/* Avatar */}
        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-end justify-between mb-4">
            <div className="relative">
              <div className="w-20 h-20 gradient-thai rounded-2xl border-4 border-white flex items-center justify-center text-3xl text-white font-black shadow-lg">
                {(profile.display_name ?? profile.username)[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <LevelBadge level={profile.level} size="sm" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <Edit3 size={14} />
              Edit Profile
            </Button>
          </div>

          <h1 className="text-2xl font-black text-gray-900">{profile.display_name ?? profile.username}</h1>
          <p className="text-gray-500">@{profile.username}</p>
          {profile.bio && <p className="text-gray-600 text-sm mt-2">{profile.bio}</p>}

          {profile.country && (
            <div className="mt-2">
              <Badge variant="secondary">{profile.country}</Badge>
            </div>
          )}

          {/* XP progress */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Level {profile.level}</span>
              <span className="text-gray-400">{current} / {needed} XP to Level {profile.level + 1}</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total XP", value: formatNumber(profile.total_xp), icon: "⚡", color: "text-amber-600" },
          { label: "Streak", value: `${profile.current_streak}d`, icon: "🔥", color: "text-orange-500" },
          { label: "Best Streak", value: `${profile.longest_streak}d`, icon: "🏆", color: "text-purple-500" },
          { label: "Hearts", value: `${profile.hearts}/5`, icon: "❤️", color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Achievements</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {displayedAchievements.map((ach, i) => (
            <div key={ach.slug} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50">
              <span className="text-3xl">{ach.icon}</span>
              <p className="text-xs font-bold text-gray-700 text-center leading-tight">{ach.title}</p>
              <p className="text-[10px] text-amber-500 font-bold">+{ach.xp_reward} XP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning goal */}
      {profile.learning_goal && (
        <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
          <h2 className="font-bold text-orange-900 mb-1">Learning Goal</h2>
          <p className="text-orange-700 capitalize text-sm">
            {profile.learning_goal === "travel" && "🌏 Learning Thai for Travel"}
            {profile.learning_goal === "work" && "💼 Learning Thai for Work"}
            {profile.learning_goal === "study" && "📚 Learning Thai for Study"}
            {profile.learning_goal === "fluency" && "🎯 Aiming for Full Fluency"}
          </p>
          <p className="text-orange-500 text-xs mt-1">Daily goal: {profile.daily_goal_minutes} minutes</p>
        </div>
      )}
    </div>
  );
}
