"use client";
import { create } from "zustand";

interface GamificationState {
  pendingXP: number;
  showXPAnimation: boolean;
  showAchievement: { slug: string; title: string; icon: string } | null;
  showLevelUp: number | null;
  addXP: (amount: number) => void;
  triggerAchievement: (achievement: { slug: string; title: string; icon: string }) => void;
  triggerLevelUp: (newLevel: number) => void;
  clearAnimations: () => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  pendingXP: 0,
  showXPAnimation: false,
  showAchievement: null,
  showLevelUp: null,

  addXP: (amount) =>
    set((state) => ({
      pendingXP: state.pendingXP + amount,
      showXPAnimation: true,
    })),

  triggerAchievement: (achievement) =>
    set({ showAchievement: achievement }),

  triggerLevelUp: (newLevel) =>
    set({ showLevelUp: newLevel }),

  clearAnimations: () =>
    set({ pendingXP: 0, showXPAnimation: false, showAchievement: null, showLevelUp: null }),
}));
