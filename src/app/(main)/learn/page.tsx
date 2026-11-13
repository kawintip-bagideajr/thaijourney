"use client";
import { useEffect, useState } from "react";
import { Star, BookOpen, Headphones, MessageSquare, Lock, Crown } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { EXTRA_MODULES } from "@/data/content";

const BASE_MODULES = [
  {
    id: "greetings", track: "beginner",
    title: "Greetings & Politeness", description: "Learn to say hello, thank you, and be polite",
    icon: "👋", color: "from-orange-400 to-amber-400", bgColor: "bg-orange-50", requiredXP: 0,
    lessons: [
      { id: "greet-basics", title: "Basic Greetings", type: "vocabulary", xp: 15 },
      { id: "polite-particles", title: "Polite Particles (ครับ/ค่ะ)", type: "grammar", xp: 15 },
      { id: "greet-practice", title: "Greetings Practice", type: "listening", xp: 20 },
    ],
  },
  {
    id: "numbers", track: "beginner",
    title: "Numbers & Counting", description: "Thai numerals and counting from 1 to 1,000",
    icon: "🔢", color: "from-blue-400 to-cyan-400", bgColor: "bg-blue-50", requiredXP: 30,
    lessons: [
      { id: "numbers-1-10", title: "Numbers 1–10", type: "vocabulary", xp: 15 },
      { id: "numbers-11-100", title: "Numbers 11–100", type: "vocabulary", xp: 15 },
      { id: "classifiers", title: "Number Classifiers", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "food", track: "beginner",
    title: "Food & Restaurants", description: "Order food, describe taste, and eat like a local",
    icon: "🍜", color: "from-red-400 to-pink-400", bgColor: "bg-red-50", requiredXP: 60,
    lessons: [
      { id: "food-vocab", title: "Thai Food Vocabulary", type: "vocabulary", xp: 15 },
      { id: "ordering-food", title: "Ordering Food", type: "grammar", xp: 20 },
      { id: "food-listening", title: "At the Restaurant", type: "listening", xp: 20 },
    ],
  },
  {
    id: "transport", track: "beginner",
    title: "Getting Around", description: "Tuk-tuks, taxis and the BTS: how to get anywhere in Thailand",
    icon: "🛺", color: "from-green-400 to-emerald-400", bgColor: "bg-green-50", requiredXP: 120,
    lessons: [
      { id: "transport-vocab", title: "Transport Vocabulary", type: "vocabulary", xp: 15 },
      { id: "directions", title: "Asking Directions", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "shopping", track: "intermediate",
    title: "Shopping & Bargaining", description: "Haggle at Thai markets and get a fair price",
    icon: "🛍️", color: "from-purple-400 to-violet-400", bgColor: "bg-purple-50", requiredXP: 250,
    lessons: [
      { id: "shopping-vocab", title: "Shopping Vocabulary", type: "vocabulary", xp: 20 },
      { id: "bargaining", title: "Bargaining Phrases", type: "grammar", xp: 25 },
    ],
  },
  {
    id: "emergency", track: "intermediate",
    title: "Emergency & Health", description: "Phrases for when you need help fast",
    icon: "🚑", color: "from-rose-400 to-red-500", bgColor: "bg-rose-50", requiredXP: 300,
    lessons: [
      { id: "emergency-phrases", title: "Emergency Phrases", type: "vocabulary", xp: 25 },
      { id: "hospital", title: "At the Hospital", type: "grammar", xp: 25 },
    ],
  },
  {
    id: "family", track: "beginner",
    title: "Family & Relationships", description: "Talk about your family and relationships in Thai",
    icon: "👨‍👩‍👧", color: "from-pink-400 to-rose-400", bgColor: "bg-pink-50", requiredXP: 150,
    lessons: [
      { id: "family-vocab", title: "Family Members", type: "vocabulary", xp: 20 },
      { id: "relationships", title: "Relationships & Status", type: "grammar", xp: 20 },
      { id: "family-conversation", title: "Talking About Family", type: "listening", xp: 25 },
    ],
  },
  {
    id: "time", track: "beginner",
    title: "Time & Date", description: "Tell the time, days of the week, and schedule plans",
    icon: "🕐", color: "from-cyan-400 to-blue-400", bgColor: "bg-cyan-50", requiredXP: 210,
    lessons: [
      { id: "time-vocab", title: "Telling Time", type: "vocabulary", xp: 20 },
      { id: "days-months", title: "Days & Months", type: "vocabulary", xp: 20 },
      { id: "time-phrases", title: "Scheduling & Appointments", type: "grammar", xp: 25 },
    ],
  },
  {
    id: "weather", track: "intermediate",
    title: "Weather & Nature", description: "Describe Thailand's weather and three seasons",
    icon: "⛅", color: "from-sky-400 to-indigo-400", bgColor: "bg-sky-50", requiredXP: 200,
    lessons: [
      { id: "weather-vocab", title: "Weather Vocabulary", type: "vocabulary", xp: 20 },
      { id: "seasons", title: "Thailand's 3 Seasons", type: "culture", xp: 25 },
    ],
  },
  {
    id: "culture", track: "intermediate",
    title: "Thai Culture & Festivals", description: "Customs, manners and the big festivals",
    icon: "🏯", color: "from-amber-400 to-orange-500", bgColor: "bg-amber-50", requiredXP: 350,
    lessons: [
      { id: "customs", title: "Customs & Etiquette", type: "culture", xp: 30 },
      { id: "festivals", title: "Thai Festivals", type: "culture", xp: 30 },
    ],
  },
  {
    id: "emotions", track: "beginner",
    title: "Emotions & Feelings", description: "Say how you feel: happy, sad, excited, in love",
    icon: "🥰", color: "from-pink-400 to-fuchsia-400", bgColor: "bg-pink-50", requiredXP: 90,
    lessons: [
      { id: "emotions-vocab", title: "Emotion Vocabulary", type: "vocabulary", xp: 20 },
      { id: "emotions-expressions", title: "Feeling Expressions", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "colors", track: "beginner",
    title: "Colors & Adjectives", description: "Describe the world around you in Thai",
    icon: "🎨", color: "from-violet-400 to-purple-500", bgColor: "bg-violet-50", requiredXP: 180,
    lessons: [
      { id: "colors-vocab", title: "Thai Colors", type: "vocabulary", xp: 15 },
      { id: "adjectives", title: "Describing Things", type: "vocabulary", xp: 20 },
    ],
  },
  {
    id: "body", track: "beginner",
    title: "Body & Health", description: "Know your body parts and describe aches",
    icon: "🧍", color: "from-teal-400 to-cyan-500", bgColor: "bg-teal-50", requiredXP: 240,
    lessons: [
      { id: "body-parts", title: "Body Parts", type: "vocabulary", xp: 20 },
      { id: "body-phrases", title: "Describing Symptoms", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "animals", track: "intermediate",
    title: "Animals & Nature", description: "Animals and the outdoors in Thailand",
    icon: "🐘", color: "from-lime-400 to-green-500", bgColor: "bg-lime-50", requiredXP: 320,
    lessons: [
      { id: "animals-vocab", title: "Thai Animals", type: "vocabulary", xp: 20 },
      { id: "nature-vocab", title: "Nature & Landscape", type: "vocabulary", xp: 20 },
    ],
  },
  {
    id: "work", track: "advanced",
    title: "Work & Business", description: "Professional Thai for the workplace",
    icon: "💼", color: "from-slate-400 to-gray-600", bgColor: "bg-slate-50", requiredXP: 400,
    lessons: [
      { id: "work-vocab", title: "Work Vocabulary", type: "vocabulary", xp: 30 },
      { id: "office-phrases", title: "Office Phrases", type: "grammar", xp: 30 },
    ],
  },
  {
    id: "slang", track: "advanced",
    title: "Thai Slang & Casual Speech", description: "Talk like a local with particles, slang and everyday chat",
    icon: "💬", color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-50", requiredXP: 500,
    lessons: [
      { id: "thai-slang", title: "Thai Slang Words", type: "vocabulary", xp: 30 },
      { id: "casual-speech", title: "Casual Particles & Tone", type: "grammar", xp: 35 },
    ],
  },
];

/** Original modules + the content packs (exercises stay in the data layer). */
const MODULES = [
  ...BASE_MODULES,
  ...EXTRA_MODULES.map(({ lessons, ...m }) => ({ ...m, lessons: lessons.map(({ id, title, type, xp }) => ({ id, title, type, xp })) })),
];

const typeIcons = {
  vocabulary: BookOpen, grammar: Star, listening: Headphones,
  culture: MessageSquare, speaking: MessageSquare, conversation: MessageSquare,
};

export default function LearnPage() {
  const profile = useAuthStore((s) => s.profile);
  const userXP = profile?.total_xp ?? 0;
  const { t } = useTranslation();
  const [activeTrack, setActiveTrack] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!profile) return;

    const q = query(
      collection(db, "user_lesson_progress"),
      where("user_id", "==", profile.id),
      where("status", "in", ["completed", "mastered"])
    );
    getDocs(q).then((snap) => {
      const slugs = new Set(snap.docs.map((doc) => doc.data().lesson_slug as string));
      setCompletedLessons(slugs);
    });
  }, [profile?.id]);

  const tracks = [
    { id: "beginner", label: t("learn.beginner"), emoji: "🌱" },
    { id: "intermediate", label: t("learn.intermediate"), emoji: "🌿" },
    { id: "advanced", label: t("learn.advanced"), emoji: "🌳" },
  ] as const;

  const filteredModules = MODULES.filter((m) => m.track === activeTrack);

  // The lesson to highlight with "START": first unfinished lesson in the first unlocked module
  let startId: string | null = null;
  let currentModuleId: string | null = null;
  for (const m of filteredModules) {
    if (userXP < m.requiredXP) continue;
    const l = m.lessons.find((x) => !completedLessons.has(x.id));
    if (l) { startId = l.id; currentModuleId = m.id; break; }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">📚 {t("learn.title")}</h1>
        <p className="text-gray-500 text-sm font-bold mt-0.5">{t("learn.subtitle")}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tracks.map((track) => {
          const active = activeTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={cn(
                "btn-3d flex items-center justify-center gap-1.5 h-12 rounded-2xl border-2 font-extrabold text-xs sm:text-sm min-w-0",
                active ? "bg-green-500 border-green-600 text-white [--btn-edge:#15803d]" : "bg-white border-[var(--game-edge)] text-gray-600 [--btn-edge:var(--game-edge)]"
              )}
            >
              <span className="text-base leading-none">{track.emoji}</span>
              <span className="truncate">{track.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
        {filteredModules.map((module, moduleIdx) => {
          const isLocked = userXP < module.requiredXP;
          const completedCount = module.lessons.filter((l) => completedLessons.has(l.id)).length;
          const allDone = completedCount === module.lessons.length;
          const isCurrent = module.id === currentModuleId;

          return (
            <section key={module.id}>
              {/* Unit banner */}
              {/* Current unit: full colour + drop edge. Done / waiting: flat panel. Locked: dashed outline, no fill. */}
              <div
                className={cn(
                  "flex items-center gap-3",
                  isCurrent
                    ? cn("rounded-[1.75rem] p-5 text-white shadow-[0_6px_0_rgba(0,0,0,0.18)] bg-gradient-to-r", module.color)
                    : isLocked
                      ? "rounded-2xl px-4 py-3 border-2 border-dashed border-[var(--game-edge)] text-gray-400"
                      : "game-panel px-4 py-3 text-gray-800"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center flex-shrink-0",
                  isCurrent
                    ? "w-16 h-16 rounded-2xl bg-white/25 border-2 border-white/40 text-4xl"
                    : isLocked
                      ? "w-11 h-11 rounded-xl bg-gray-100 text-xl grayscale"
                      : cn("w-12 h-12 rounded-xl text-2xl bg-gradient-to-br", module.color)
                )}>
                  {isLocked ? "🔒" : module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-[11px] font-black", isCurrent ? "opacity-90" : isLocked ? "" : "text-gray-400")}>
                    {t("learn.unit", { n: moduleIdx + 1 }, `Unit ${moduleIdx + 1}`)}
                  </p>
                  <h3 className={cn("leading-tight", isCurrent ? "text-xl drop-shadow-sm" : "text-base")}>{t(`learn.mod.${module.id}.title`, {}, module.title)}</h3>
                  <p className={cn("text-xs font-bold line-clamp-1", isCurrent ? "opacity-90" : isLocked ? "hidden sm:block" : "text-gray-500")}>{t(`learn.mod.${module.id}.desc`, {}, module.description)}</p>
                </div>
                <div className="shrink-0 text-right">
                  {isLocked ? (
                    <span className="font-display text-sm text-gray-400 whitespace-nowrap">🔒 {module.requiredXP} XP</span>
                  ) : (
                    <span className={cn("font-display text-sm rounded-full px-3 py-1", isCurrent ? "bg-white/25" : allDone ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>
                      {allDone ? "👑" : `${completedCount}/${module.lessons.length}`}
                    </span>
                  )}
                </div>
              </div>

              {/* Lesson nodes on a winding path */}
              <div className={cn("relative flex flex-col items-center gap-5 pt-8 pb-2", isLocked && "opacity-60")}>
                {module.lessons.map((lesson, i) => {
                  const Icon = typeIcons[lesson.type as keyof typeof typeIcons] ?? BookOpen;
                  const isDone = completedLessons.has(lesson.id);
                  const isStart = lesson.id === startId;
                  const offset = [0, 50, 70, 50, 0, -50, -70, -50][(i + moduleIdx * 2) % 8];
                  const node = (
                    <div className="relative" style={{ transform: `translateX(${offset}px)` }}>
                      {isStart && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
                          <span className="block text-xs font-black text-green-600 bg-white border-2 border-[var(--game-edge)] rounded-xl px-3 py-1 shadow-[0_3px_0_var(--game-edge)] whitespace-nowrap">
                            {t("learn.start", undefined, "START")}
                          </span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "btn-3d w-[76px] h-[76px] rounded-full flex items-center justify-center border-4",
                          isLocked
                            ? "bg-gray-200 border-gray-300 [--btn-edge:#a8a29e]"
                            : isDone
                              ? "bg-amber-400 border-amber-300 [--btn-edge:#b45309]"
                              : isStart
                                ? "bg-green-500 border-green-400 [--btn-edge:#15803d] animate-pulse-glow"
                                : "bg-white border-[var(--game-edge)] [--btn-edge:#d6cbb8]"
                        )}
                      >
                        {isLocked
                          ? <Lock size={26} className="text-gray-400" />
                          : isDone
                            ? <Crown size={30} className="text-white fill-white/40" />
                            : <Icon size={28} className={isStart ? "text-white" : "text-gray-400"} strokeWidth={2.5} />}
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 w-[120px] sm:w-[160px]">
                        <p className={cn("text-sm font-extrabold leading-tight", isLocked ? "text-gray-400" : "text-gray-800")}>
                          {t(`learn.lesson.${lesson.id}.title`, {}, lesson.title)}
                        </p>
                        <p className="text-[11px] font-black text-amber-500">+{lesson.xp} XP</p>
                      </div>
                    </div>
                  );
                  return isLocked ? (
                    <div key={lesson.id} aria-disabled="true" className="cursor-not-allowed">{node}</div>
                  ) : (
                    <Link key={lesson.id} href={`/learn/${module.id}/lesson/${lesson.id}`} aria-label={lesson.title}>
                      {node}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="h-24 lg:h-6" />
    </div>
  );
}
