"use client";
import { useSettingsStore } from "@/store/settingsStore";
import { translations } from "./translations";
import { translateContent } from "./content";

/**
 * useTranslation — returns a `t(key, vars?)` function bound to the current app language.
 * Falls back to English, then to the raw key, so missing translations never crash.
 *
 *   const { t } = useTranslation();
 *   t("dash.xpToNext", { n: 120 })  //→ "120 XP to next level"
 */
export function useTranslation() {
  const language = useSettingsStore((s) => s.language);
  const dict = translations[language] ?? translations.en;
  const fallback = translations.en;

  const t = (key: string, vars?: Record<string, string | number>, fallbackStr?: string): string => {
    let str = dict[key] ?? fallback[key];
    if (str === undefined) str = fallbackStr ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return str;
  };

  // Translate content (vocabulary/meaning/instruction) — falls back to the original English.
  const tc = (english: string): string => translateContent(english, language);

  return { t, tc, language };
}
