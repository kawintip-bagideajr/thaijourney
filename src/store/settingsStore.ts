"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppTheme = "light" | "sakura" | "ocean" | "dark";
export type AppLanguage = "en" | "th" | "ja" | "zh" | "ko" | "fr";

interface SettingsState {
  sfxEnabled: boolean;
  sfxVolume: number;
  theme: AppTheme;
  language: AppLanguage;
  setSfxEnabled: (v: boolean) => void;
  setSfxVolume: (v: number) => void;
  setTheme: (v: AppTheme) => void;
  setLanguage: (v: AppLanguage) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sfxEnabled: true,
      sfxVolume: 0.7,
      theme: "light",
      language: "en",
      setSfxEnabled: (sfxEnabled) => set({ sfxEnabled }),
      setSfxVolume: (sfxVolume) => set({ sfxVolume }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    { name: "thaiJN-settings" }
  )
);
