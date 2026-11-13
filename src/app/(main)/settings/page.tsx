"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Volume2, VolumeX, Palette, Globe, Crown, Heart,
  Bell, ChevronRight, Check,
} from "lucide-react";
import Link from "next/link";
import { useSettingsStore, type AppTheme, type AppLanguage, type DarkAccent } from "@/store/settingsStore";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { cn } from "@/lib/utils";

/* Raw preview colors — immune to CSS theme overrides */
const THEMES: {
  id: AppTheme; label: string; desc: string;
  prevBg: string; prevCard: string; prevPill: string; prevDot: string;
  prevLabelBg: string; prevLabelText: string; prevDescText: string;
}[] = [
  {
    id: "light", label: "Classic", desc: "Warm Thai orange",
    prevBg: "#fff7ed", prevCard: "#ffffff", prevPill: "#f97316",
    prevDot: "#f59e0b", prevLabelBg: "#ffffff", prevLabelText: "#111827", prevDescText: "#9ca3af",
  },
  {
    id: "sakura", label: "Sakura", desc: "Cherry blossom pink",
    prevBg: "#fdf2f6", prevCard: "#fff8fb", prevPill: "#ec4899",
    prevDot: "#f43f5e", prevLabelBg: "#fff8fb", prevLabelText: "#111827", prevDescText: "#be87a8",
  },
  {
    id: "ocean", label: "Ocean", desc: "Calm Andaman blue",
    prevBg: "#f0f7ff", prevCard: "#f5f9ff", prevPill: "#0ea5e9",
    prevDot: "#06b6d4", prevLabelBg: "#f5f9ff", prevLabelText: "#111827", prevDescText: "#4a7fa8",
  },
  {
    id: "forest", label: "Forest", desc: "Emerald green",
    prevBg: "#ecfdf5", prevCard: "#f7fdfb", prevPill: "#059669",
    prevDot: "#34d399", prevLabelBg: "#f7fdfb", prevLabelText: "#111827", prevDescText: "#065f46",
  },
  {
    id: "dark", label: "Night", desc: "Easy on your eyes",
    prevBg: "#161b2a", prevCard: "#1f2740", prevPill: "#818cf8",
    prevDot: "#6366f1", prevLabelBg: "#1f2740", prevLabelText: "#e2e8f0", prevDescText: "#64748b",
  },
];

const DARK_ACCENTS: { id: DarkAccent; label: string; color: string }[] = [
  { id: "indigo",  label: "Indigo",  color: "#818cf8" },
  { id: "teal",    label: "Teal",    color: "#14b8a6" },
  { id: "emerald", label: "Emerald", color: "#34d399" },
  { id: "rose",    label: "Rose",    color: "#fb7185" },
  { id: "sky",     label: "Sky",     color: "#38bdf8" },
];

const LANGUAGES: { id: AppLanguage; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "th", label: "ภาษาไทย", flag: "🇹🇭" },
  { id: "ja", label: "日本語", flag: "🇯🇵" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
  { id: "ko", label: "한국어", flag: "🇰🇷" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

export default function SettingsPage() {
  const {
    sfxEnabled, sfxVolume, theme, language, darkAccent,
    setSfxEnabled, setSfxVolume, setTheme, setLanguage, setDarkAccent,
  } = useSettingsStore();
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const isPro = profile?.access_tier === "pro";
  const { t } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-sakura", "theme-ocean", "theme-forest", "theme-dark");
    root.classList.remove("dark-accent-indigo", "dark-accent-teal", "dark-accent-emerald", "dark-accent-rose", "dark-accent-sky");
    if (theme !== "light") root.classList.add(`theme-${theme}`);
    if (theme === "dark") root.classList.add(`dark-accent-${darkAccent}`);
  }, [theme, darkAccent]);

  return (
    <div className="max-w-xl mx-auto px-4 py-5 space-y-5 pb-28">
      <header className="px-1 pt-1">
        <h1 className="font-display text-3xl sm:text-4xl text-gray-900 leading-tight">{t("settings.title")}</h1>
        <p className="text-sm font-bold text-gray-500 mt-1">{t("settings.subtitle")}</p>
      </header>

      {/* Access Tier */}
      <Section title={t("settings.subscription")} icon={<Crown size={18} className="text-amber-500" />} tile="bg-amber-50 border-amber-200">
        <div className="p-4">
          <div className={cn(
            "flex items-center justify-between gap-3 p-4 rounded-2xl border-2",
            isPro ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200" : "bg-orange-50 border-orange-100"
          )}>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl shrink-0" aria-hidden="true">{isPro ? "👑" : "🎟️"}</span>
              <div className="min-w-0">
                <p className="font-display text-gray-900 text-base leading-tight">
                  {isPro ? t("settings.proAccess") : t("settings.freeAccess")}
                </p>
                <p className="text-xs font-bold text-gray-500 mt-0.5">
                  {isPro ? t("settings.fullAi") : t("settings.upgradeToUnlock")}
                </p>
              </div>
            </div>
            {!isPro && (
              <Link href="/subscribe" className="shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="btn-3d shimmer gradient-thai text-white font-display text-sm h-11 px-5 rounded-2xl [--btn-edge:#b45309]"
                >
                  {t("settings.upgrade")}
                </motion.button>
              </Link>
            )}
            {isPro && <Crown size={22} className="text-amber-500 shrink-0" />}
          </div>
        </div>
      </Section>

      {/* Sound */}
      <Section title={t("settings.soundAudio")} icon={<Volume2 size={18} className="text-orange-500" />} tile="bg-orange-50 border-orange-200">
        <SettingRow
          label={t("settings.soundEffects")}
          description={t("settings.soundDesc")}
          right={
            <button
              onClick={() => setSfxEnabled(!sfxEnabled)}
              className={cn(
                "w-14 h-8 rounded-full transition-colors relative border-2",
                sfxEnabled ? "gradient-thai border-orange-600" : "bg-gray-200 border-gray-300"
              )}
            >
              <motion.div
                animate={{ x: sfxEnabled ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute top-0.5 w-6 h-6 bg-zinc-100 rounded-full shadow-[0_2px_0_rgba(0,0,0,0.2)]"
              />
            </button>
          }
        />
        {sfxEnabled && (
          <div className="mx-4 mb-4 rounded-2xl bg-orange-50 border-2 border-orange-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <VolumeX size={16} className="text-gray-400" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="flex-1 accent-orange-500"
              />
              <Volume2 size={16} className="text-gray-500" />
            </div>
            <p className="text-[11px] font-extrabold text-gray-500 text-center mt-1 tabular-nums">
              {t("settings.volume", { n: Math.round(sfxVolume * 100) })}
            </p>
          </div>
        )}
      </Section>

      {/* Theme */}
      <Section primary title={t("settings.theme")} icon={<Palette size={18} className="text-purple-500" />} tile="bg-purple-50 border-purple-200">
        <div className="grid grid-cols-2 gap-3 p-4">
          {THEMES.map((tp) => (
            <motion.button
              key={tp.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setTheme(tp.id)}
              className="relative rounded-2xl border-[3px] overflow-hidden text-left transition-all hover:-translate-y-0.5"
              style={{
                borderColor: theme === tp.id ? tp.prevPill : "var(--game-edge)",
                boxShadow: theme === tp.id ? `0 4px 0 ${tp.prevPill}` : "0 4px 0 var(--game-edge)",
              }}
            >
              {/* Mini preview — all inline styles so no theme CSS can override */}
              <div style={{ backgroundColor: tp.prevBg }} className="p-2.5 pb-2">
                <div style={{ backgroundColor: tp.prevPill, opacity: 0.55 }} className="h-1.5 rounded-full w-3/4 mb-2" />
                <div style={{ backgroundColor: tp.prevCard }} className="rounded-xl p-2">
                  <div className="flex items-center gap-1.5">
                    <div style={{ backgroundColor: tp.prevPill }} className="w-5 h-5 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div style={{ backgroundColor: tp.prevDot, opacity: 0.75 }} className="h-1.5 rounded-full w-full" />
                      <div style={{ backgroundColor: tp.prevDot, opacity: 0.4 }} className="h-1 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 justify-center">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: i === 0 ? tp.prevPill : tp.prevDot,
                        width: i === 0 ? 16 : 8,
                        opacity: 0.55,
                      }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>
              {/* Label */}
              <div style={{ backgroundColor: tp.prevLabelBg }} className="px-3 py-2">
                <p style={{ color: tp.prevLabelText }} className="text-xs font-black">{themeLabel(tp.id, t)}</p>
                <p style={{ color: tp.prevDescText }} className="text-[10px] font-bold leading-tight">{themeDesc(tp.id, t)}</p>
              </div>
              {theme === tp.id && (
                <div
                  style={{ backgroundColor: tp.prevPill }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                >
                  <Check size={12} strokeWidth={3} className="text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Dark mode accent color picker */}
        {theme === "dark" && (
          <div className="px-4 pb-4 space-y-2">
            <p className="text-xs font-extrabold text-gray-500">{t("settings.nightAccent")}</p>
            <div className="flex flex-wrap gap-3">
              {DARK_ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setDarkAccent(a.id)}
                  title={accentLabel(a.id, t)}
                  className="relative w-10 h-10 rounded-full border-[3px] border-white/80 transition-all hover:scale-110 active:scale-95"
                  style={{
                    backgroundColor: a.color,
                    boxShadow: darkAccent === a.id ? `0 0 0 3px ${a.color}50, 0 0 0 5px ${a.color}20` : undefined,
                    transform: darkAccent === a.id ? "scale(1.15)" : undefined,
                  }}
                >
                  {darkAccent === a.id && (
                    <Check size={15} strokeWidth={3} className="absolute inset-0 m-auto text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Language */}
      <Section title={t("settings.appLanguage")} icon={<Globe size={18} className="text-sky-500" />} tile="bg-sky-50 border-sky-200">
        <p className="text-xs font-bold text-gray-500 px-4 pt-3 pb-2">
          {t("settings.changesLabels")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 pb-4">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl border-2 transition hover:-translate-y-0.5",
                language === lang.id
                  ? "bg-orange-50 border-orange-300 shadow-[0_4px_0_#fdba74]"
                  : "bg-white border-[var(--game-edge)] shadow-[0_3px_0_var(--game-edge)] hover:bg-orange-50"
              )}
            >
              <span className="w-9 h-9 rounded-xl bg-white border-2 border-[var(--game-edge)] flex items-center justify-center text-xl leading-none shrink-0">{lang.flag}</span>
              <span className="flex-1 text-sm font-extrabold text-gray-800 text-left">{lang.label}</span>
              {language === lang.id && (
                <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Notifications placeholder */}
      <Section title={t("settings.notifications")} icon={<Bell size={18} className="text-indigo-500" />} tile="bg-indigo-50 border-indigo-200">
        <SettingRow
          label={t("settings.dailyReminder")}
          description={t("settings.remindDesc")}
          right={
            <button className="w-14 h-8 rounded-full bg-gray-200 border-2 border-gray-300 relative opacity-70">
              <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-zinc-100 rounded-full shadow-[0_2px_0_rgba(0,0,0,0.2)]" />
            </button>
          }
        />
        <p className="px-4 pb-4 text-xs font-extrabold text-gray-500">
          <span aria-hidden="true">🚧 </span>{t("settings.comingSoon")}
        </p>
      </Section>

      {/* Donate */}
      <Link href="/donate" className="block">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 p-4 bg-rose-50 border-2 border-rose-200 rounded-3xl shadow-[0_5px_0_#fecdd3] transition hover:-translate-y-0.5"
        >
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center border-2 bg-white border-rose-200 shrink-0">
            <Heart size={20} className="text-rose-500 fill-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-rose-700 text-base leading-tight">{t("settings.supportThaiJN")}</p>
            <p className="text-xs font-bold text-rose-500">{t("settings.helpKeepFree")}</p>
          </div>
          <ChevronRight size={18} className="text-rose-400 shrink-0" />
        </motion.div>
      </Link>

      <div className="h-6" />
    </div>
  );
}


// Map theme id → translated label
const THEME_LABEL_KEY: Record<string, string> = {
  light: "settings.classic", sakura: "settings.sakura", ocean: "settings.ocean",
  forest: "settings.forest", dark: "settings.night",
};
const THEME_DESC_KEY: Record<string, string> = {
  light: "settings.classicDesc", sakura: "settings.sakuraDesc", ocean: "settings.oceanDesc",
  forest: "settings.forestDesc", dark: "settings.nightDesc",
};
const ACCENT_KEY: Record<string, string> = {
  indigo: "settings.accentIndigo", teal: "settings.accentTeal", emerald: "settings.accentEmerald",
  rose: "settings.accentRose", sky: "settings.accentSky",
};
type TFn = (key: string, vars?: Record<string, string | number>, fallbackStr?: string) => string;
function themeLabel(id: string, t: TFn) { return t(THEME_LABEL_KEY[id] ?? "settings.classic"); }
function themeDesc(id: string, t: TFn) { return t(THEME_DESC_KEY[id] ?? "settings.classicDesc"); }
function accentLabel(id: string, t: TFn) { return t(ACCENT_KEY[id] ?? "settings.accentIndigo"); }


function Section({ title, icon, tile, primary, children }: { title: string; icon: React.ReactNode; tile?: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <section className={cn(primary ? "game-card" : "game-panel", "overflow-hidden")}>
      <div className={cn("flex items-center px-4 pt-4 pb-1", primary ? "gap-3" : "gap-2.5")}>
        <div className={cn(
          "flex items-center justify-center border-2 shrink-0",
          primary ? "w-11 h-11 rounded-2xl" : "w-8 h-8 rounded-xl",
          tile ?? "bg-orange-50 border-orange-200"
        )}>
          {icon}
        </div>
        <h2 className={cn("text-gray-900 leading-tight", primary ? "text-lg" : "text-base")}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SettingRow({ label, description, right }: {
  label: string;
  description: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-gray-900">{label}</p>
        <p className="text-xs font-bold text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">{right}</div>
    </div>
  );
}
