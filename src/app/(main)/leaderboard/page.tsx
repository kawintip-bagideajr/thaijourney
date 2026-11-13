"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

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
const rankTiles = [
  "bg-yellow-100 border-yellow-300 text-yellow-600",
  "bg-gray-100 border-gray-300 text-gray-500",
  "bg-amber-50 border-amber-300 text-amber-700",
];
const rankMedals = ["🥇", "🥈", "🥉"];

// Avatar with graceful fallback: if the image fails to load (broken/expired URL),
// show the user's initial letter on a gradient background instead.
function LeaderAvatar({ leader, size, bold = false }: { leader: Leader; size: number; bold?: boolean }) {
  const [errored, setErrored] = useState(false);
  const name = leader.display_name ?? leader.username;
  const style = { width: size, height: size };
  if (leader.avatar_url && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={leader.avatar_url}
        alt={name}
        onError={() => setErrored(true)}
        className="rounded-full object-cover"
        style={style}
      />
    );
  }
  return (
    <div
      className={cn("rounded-full gradient-thai flex items-center justify-center text-white", bold ? "font-black" : "font-bold")}
      style={{ ...style, fontSize: size * 0.4 }}
    >
      {name[0]?.toUpperCase()}
    </div>
  );
}

export default function LeaderboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"weekly" | "allTime">("allTime");
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?type=${activeTab}`)
      .then((r) => r.json())
      .then((data) => {
        setLeaders(data.leaders ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const topThree = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* Header: title row + period switch, with the podium (or empty state) as the hero */}
      <header className="game-card overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight">{t("leaderboard.title")}</h1>
            <p className="text-sm font-bold text-gray-500 mt-0.5">{t("leaderboard.topLearers")}</p>
          </div>
          <div className="w-full sm:w-auto flex gap-1 p-1 rounded-2xl bg-orange-50 border-2 border-orange-100">
            {[{ id: "weekly", label: t("leaderboard.thisWeek"), emoji: "📅" }, { id: "allTime", label: t("leaderboard.allTime"), emoji: "🌟" }].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "weekly" | "allTime")}
                aria-pressed={activeTab === tab.id}
                className={cn(
                  "flex-1 sm:flex-none h-9 px-3 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200",
                  activeTab === tab.id
                    ? "btn-3d bg-orange-500 text-white [--btn-edge:#c2410c]"
                    : "text-gray-500 hover:bg-white"
                )}
              >
                <span aria-hidden="true">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {leaders.length === 0 ? (
          <div className="px-5 pt-6 pb-7 text-center">
            <p className="text-6xl mb-3" aria-hidden="true">🏆</p>
            <p className="font-display text-lg text-gray-900">{t("leaderboard.noData")}</p>
            <p className="text-sm font-bold text-gray-500 mt-1">{t("leaderboard.completeToAppear")}</p>
            <Link
              href="/learn"
              className="btn-3d inline-flex items-center justify-center mt-5 h-12 px-6 rounded-2xl bg-orange-500 text-white font-display [--btn-edge:#c2410c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              <span aria-hidden="true" className="mr-2">▶</span>{t("dash.continueLearning")}
            </Link>
          </div>
        ) : topThree.length >= 1 && (
              <div className="px-3 pt-5 flex items-end justify-center gap-2 sm:gap-4">
                {[topThree[1], topThree[0], topThree[2]].map((leader, i) => {
                  if (!leader) return <div key={i} className="w-20 sm:w-24" />;
                  const heights = ["h-20", "h-28", "h-16"];
                  const displayRank = [2, 1, 3][i];
                  return (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center gap-1.5 w-20 sm:w-24 min-w-0"
                    >
                      <div className="text-2xl h-8 leading-8" aria-hidden="true">{displayRank === 1 ? "👑" : ""}</div>
                      <div className={cn(
                        "rounded-full overflow-hidden flex-shrink-0 border-4 shadow-[0_4px_0_var(--game-edge)]",
                        displayRank === 1 ? "border-yellow-300" : displayRank === 2 ? "border-gray-300" : "border-amber-300"
                      )}>
                        <LeaderAvatar leader={leader} size={displayRank === 1 ? 60 : 50} bold />
                      </div>
                      <p className="text-xs font-extrabold text-gray-800 max-w-full text-center truncate">
                        {leader.display_name ?? leader.username}
                      </p>
                      <p className="flex items-center gap-0.5 text-xs text-amber-600 font-black tabular-nums">
                        <Zap size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                        {leader.weeklyXP} XP
                      </p>
                      <div className={cn(
                        "w-full rounded-t-2xl flex flex-col items-center justify-start pt-2 border-2 border-b-0",
                        heights[i],
                        displayRank === 1 ? "bg-yellow-100 border-yellow-300" :
                        displayRank === 2 ? "bg-gray-100 border-gray-300" : "bg-amber-50 border-amber-200"
                      )}>
                        <span className="text-xl leading-none" aria-hidden="true">{rankMedals[displayRank - 1]}</span>
                        <span className={cn("font-display text-2xl leading-tight", rankColors[displayRank - 1])}>
                          {displayRank}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
        )}
      </header>

      {leaders.length > 0 && (
          /* Full list */
          <div className="game-panel game-rows overflow-hidden">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className={cn(
                  "px-3 sm:px-4 py-3 flex items-center gap-3",
                  leader.isCurrentUser && "bg-orange-50"
                )}
              >
                <span className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center font-display text-lg border-2 shrink-0 tabular-nums",
                  rankTiles[leader.rank - 1] ?? "bg-orange-50 border-orange-200 text-gray-500"
                )}>
                  {leader.rank}
                </span>
                <div className="rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--game-edge)]">
                  <LeaderAvatar leader={leader} size={40} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-extrabold text-sm text-gray-900 truncate">
                      {leader.display_name ?? leader.username}
                    </p>
                    {leader.isCurrentUser && (
                      <span className="shrink-0 text-[10px] bg-orange-500 text-white font-black px-2 py-0.5 rounded-full">{t("common.you")}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <LevelBadge level={leader.level} size="sm" />
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200">
                      <Flame size={12} className="text-orange-500 fill-orange-400" aria-hidden="true" />
                      <span className="text-[11px] font-extrabold text-gray-600">{t("common.dayShort", { n: leader.current_streak })}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <Zap size={15} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                    <span className="font-display text-amber-600 text-base tabular-nums">{leader.weeklyXP}</span>
                  </div>
                  <p className="text-[11px] font-extrabold text-gray-500">{t("common.thisWeek")}</p>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}
