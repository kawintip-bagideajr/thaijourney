"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/gamificationStore";

export function AchievementPopup() {
  const { showAchievement, showLevelUp, clearAnimations } = useGamificationStore();

  useEffect(() => {
    if (showAchievement || showLevelUp) {
      const timer = setTimeout(clearAnimations, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAchievement, showLevelUp, clearAnimations]);

  return (
    <AnimatePresence>
      {showAchievement && (
        <motion.div
          key="achievement"
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-200 px-6 py-4 flex items-center gap-4 min-w-[280px]">
            <div className="text-4xl animate-bounce-in">{showAchievement.icon}</div>
            <div>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Achievement Unlocked!</p>
              <p className="font-bold text-gray-900">{showAchievement.title}</p>
            </div>
          </div>
        </motion.div>
      )}

      {showLevelUp && (
        <motion.div
          key="levelup"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-4"
            >
              🎉
            </motion.div>
            <div className="bg-white rounded-3xl shadow-2xl px-12 py-8 border-4 border-amber-300">
              <p className="text-amber-500 font-bold text-lg">Level Up!</p>
              <p className="text-6xl font-black text-gray-900 my-2">{showLevelUp}</p>
              <p className="text-gray-500">You reached a new level!</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
