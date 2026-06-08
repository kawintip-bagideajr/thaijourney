"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "@/types/database";

interface AuthState {
  profile: Profile | null;
  isLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: true,
      setProfile: (profile) => set({ profile, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      clearAuth: () => set({ profile: null, isLoading: false }),
    }),
    {
      name: "thaijourney-auth",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
