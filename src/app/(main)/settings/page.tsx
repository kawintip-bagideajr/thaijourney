"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Volume2, VolumeX, Palette, Globe, Crown, Heart,
  Bell, Moon, ChevronRight, Check,
} from "lucide-react";
import Link from "next/link";
import { useSettingsStore, type AppTheme, type AppLanguage } from "@/store/settingsStore";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const THEMES: { id: AppTheme; label: string; emoji: string; desc: string }[] = [
  { id: "light", label: "Classic Orange", emoji: "🟠", desc: "Default warm Thai style" },
  { id: "sakura", label: "Sakura Pink", emoji: "🌸", desc: "Soft cherry blossom feel" },
  { id: "ocean", label: "Ocean Blue", emoji: "🌊", desc: "Cool Andaman vibes" },
  { id: "dark", label: "Night Mode", emoji: "🌙", desc: "Easy on the eyes" },
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
    sfxEnabled, sfxVolume, theme, language,
    setSfxEnabled, setSfxVolume, setTheme, setLanguage,
  } = useSettingsStore();
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const isPro = profile?.access_tier === "pro";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-sakura", "theme-ocean", "theme-dark");
    if (theme !== "light") root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5 pb-28">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Customize your ThaiJN experience</p>
      </div>

      {/* Access Tier */}
      <Section title="Subscription" icon={<Crown size={16} className="text-amber-500" />}>
        <div className={cn(
          "flex items-center justify-between p-4 rounded-2xl",
          isPro ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200" : "bg-gray-50"
        )}>
          <div>
            <p className="font-bold text-gray-900 text-sm">
              {isPro ? "⭐ Pro Access" : "Free Access"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isPro
                ? "Full AI features, all content unlocked"
                : "Upgrade to unlock Kru AI and more"}
            </p>
          </div>
          {!isPro && (
            <Link href="/pricing">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="gradient-thai text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Upgrade
              </motion.button>
            </Link>
          )}
          {isPro && <Crown size={20} className="text-amber-500" />}
        </div>
      </Section>

      {/* Sound */}
      <Section title="Sound & Audio" icon={<Volume2 size={16} className="text-orange-500" />}>
        <SettingRow
          label="Sound Effects"
          description="Play sounds for correct/wrong answers"
          right={
            <button
              onClick={() => setSfxEnabled(!sfxEnabled)}
              className={cn(
                "w-11 h-6 rounded-full transition-colors relative",
                sfxEnabled ? "gradient-thai" : "bg-gray-200"
              )}
            >
              <motion.div
                animate={{ x: sfxEnabled ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
              />
            </button>
          }
        />
        {sfxEnabled && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3">
              <VolumeX size={14} className="text-gray-400" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="flex-1 accent-orange-500"
              />
              <Volume2 size={14} className="text-gray-500" />
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1">
              Volume: {Math.round(sfxVolume * 100)}%
            </p>
          </div>
        )}
      </Section>

      {/* Theme */}
      <Section title="Theme" icon={<Palette size={16} className="text-purple-500" />}>
        <div className="grid grid-cols-2 gap-2 p-3">
          {THEMES.map((t) => (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex items-start gap-2.5 p-3 rounded-2xl border-2 text-left transition-colors",
                theme === t.id
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-100 bg-gray-50 hover:bg-gray-100"
              )}
            >
              <span className="text-xl leading-none mt-0.5">{t.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 leading-tight">{t.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{t.desc}</p>
              </div>
              {theme === t.id && (
                <Check size={12} className="text-orange-500 ml-auto mt-0.5 flex-shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Language */}
      <Section title="App Language" icon={<Globe size={16} className="text-blue-500" />}>
        <p className="text-xs text-gray-400 px-4 pb-2">
          Changes lesson descriptions and UI labels
        </p>
        <div className="divide-y divide-gray-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl leading-none">{lang.flag}</span>
              <span className="flex-1 text-sm font-medium text-gray-800 text-left">{lang.label}</span>
              {language === lang.id && <Check size={15} className="text-orange-500" />}
            </button>
          ))}
        </div>
      </Section>

      {/* Notifications placeholder */}
      <Section title="Notifications" icon={<Bell size={16} className="text-indigo-500" />}>
        <SettingRow
          label="Daily Reminder"
          description="Remind me to practice every day"
          right={
            <button className="w-11 h-6 rounded-full bg-gray-200 relative">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow" />
            </button>
          }
        />
        <p className="text-xs text-gray-400 px-4 pb-3">Coming soon</p>
      </Section>

      {/* Donate */}
      <Link href="/donate">
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl"
        >
          <Heart size={18} className="text-rose-500" />
          <div className="flex-1">
            <p className="font-bold text-rose-700 text-sm">Support ThaiJN</p>
            <p className="text-xs text-rose-500">Help keep lessons free for everyone</p>
          </div>
          <ChevronRight size={16} className="text-rose-400" />
        </motion.div>
      </Link>

      <div className="h-6" />
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
        {icon}
        <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
      </div>
      {children}
    </motion.div>
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
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">{right}</div>
    </div>
  );
}
