"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, BookOpen, Headphones, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MODULES = [
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
    icon: "🔢", color: "from-blue-400 to-cyan-400", bgColor: "bg-blue-50", requiredXP: 50,
    lessons: [
      { id: "numbers-1-10", title: "Numbers 1–10", type: "vocabulary", xp: 15 },
      { id: "numbers-11-100", title: "Numbers 11–100", type: "vocabulary", xp: 15 },
      { id: "classifiers", title: "Number Classifiers", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "food", track: "beginner",
    title: "Food & Restaurants", description: "Order food, describe taste, and eat like a local",
    icon: "🍜", color: "from-red-400 to-pink-400", bgColor: "bg-red-50", requiredXP: 100,
    lessons: [
      { id: "food-vocab", title: "Thai Food Vocabulary", type: "vocabulary", xp: 15 },
      { id: "ordering-food", title: "Ordering Food", type: "grammar", xp: 20 },
      { id: "food-listening", title: "At the Restaurant", type: "listening", xp: 20 },
    ],
  },
  {
    id: "transport", track: "beginner",
    title: "Getting Around", description: "Tuk-tuks, taxis, BTS — get anywhere in Thailand",
    icon: "🛺", color: "from-green-400 to-emerald-400", bgColor: "bg-green-50", requiredXP: 150,
    lessons: [
      { id: "transport-vocab", title: "Transport Vocabulary", type: "vocabulary", xp: 15 },
      { id: "directions", title: "Asking Directions", type: "grammar", xp: 20 },
    ],
  },
  {
    id: "shopping", track: "intermediate",
    title: "Shopping & Bargaining", description: "Master the art of Thai market bargaining",
    icon: "🛍️", color: "from-purple-400 to-violet-400", bgColor: "bg-purple-50", requiredXP: 250,
    lessons: [
      { id: "shopping-vocab", title: "Shopping Vocabulary", type: "vocabulary", xp: 20 },
      { id: "bargaining", title: "Bargaining Phrases", type: "grammar", xp: 25 },
    ],
  },
  {
    id: "emergency", track: "intermediate",
    title: "Emergency & Health", description: "Critical phrases for when you need help",
    icon: "🚑", color: "from-rose-400 to-red-500", bgColor: "bg-rose-50", requiredXP: 300,
    lessons: [
      { id: "emergency-phrases", title: "Emergency Phrases", type: "vocabulary", xp: 25 },
      { id: "hospital", title: "At the Hospital", type: "grammar", xp: 25 },
    ],
  },
  {
    id: "family", track: "beginner",
    title: "Family & Relationships", description: "Talk about your family and relationships in Thai",
    icon: "👨‍👩‍👧", color: "from-pink-400 to-rose-400", bgColor: "bg-pink-50", requiredXP: 200,
    lessons: [
      { id: "family-vocab", title: "Family Members", type: "vocabulary", xp: 20 },
      { id: "relationships", title: "Relationships & Status", type: "grammar", xp: 20 },
      { id: "family-conversation", title: "Talking About Family", type: "listening", xp: 25 },
    ],
  },
  {
    id: "time", track: "beginner",
    title: "Time & Date", description: "Tell the time, days of the week, and schedule plans",
    icon: "🕐", color: "from-cyan-400 to-blue-400", bgColor: "bg-cyan-50", requiredXP: 260,
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
    title: "Thai Culture & Festivals", description: "Deep dive into customs, etiquette and celebrations",
    icon: "🏯", color: "from-amber-400 to-orange-500", bgColor: "bg-amber-50", requiredXP: 350,
    lessons: [
      { id: "customs", title: "Customs & Etiquette", type: "culture", xp: 30 },
      { id: "festivals", title: "Thai Festivals", type: "culture", xp: 30 },
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
];

const typeIcons = {
  vocabulary: BookOpen, grammar: Star, listening: Headphones,
  culture: MessageSquare, speaking: MessageSquare, conversation: MessageSquare,
};

export default function LearnPage() {
  const profile = useAuthStore((s) => s.profile);
  const userXP = profile?.total_xp ?? 0;
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
    { id: "beginner", label: "Beginner", emoji: "🌱" },
    { id: "intermediate", label: "Intermediate", emoji: "🌿" },
    { id: "advanced", label: "Advanced", emoji: "🌳" },
  ] as const;

  const filteredModules = MODULES.filter((m) => m.track === activeTrack);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Learning Path</h1>
        <p className="text-gray-500 text-sm mt-0.5">Complete lessons to unlock new provinces</p>
      </div>

      <div className="flex gap-1.5 p-1 bg-gray-100 rounded-2xl">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => setActiveTrack(track.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold transition-all min-w-0",
              "text-xs sm:text-sm",
              activeTrack === track.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 active:bg-white/50"
            )}
          >
            <span className="text-sm leading-none">{track.emoji}</span>
            <span className="truncate">{track.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredModules.map((module, moduleIdx) => {
          const isLocked = userXP < module.requiredXP;
          const completedCount = module.lessons.filter((l) => completedLessons.has(l.id)).length;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIdx * 0.06 }}
              className={cn(
                "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all",
                isLocked ? "opacity-60 border-gray-100" : "border-gray-100 hover:shadow-md"
              )}
            >
              <div className={cn("p-4 flex items-center gap-3", isLocked && "grayscale-[50%]")}>
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0", module.bgColor)}>
                  {isLocked ? "🔒" : module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{module.title}</h3>
                    {isLocked ? (
                      <Badge variant="secondary" className="text-[9px] shrink-0">{module.requiredXP} XP</Badge>
                    ) : completedCount > 0 ? (
                      <Badge className="text-[9px] bg-green-100 text-green-700 border-0 shrink-0">
                        {completedCount}/{module.lessons.length} done
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{module.description}</p>
                </div>
              </div>

              {!isLocked && (
                <div className="border-t border-gray-50 divide-y divide-gray-50">
                  {module.lessons.map((lesson) => {
                    const Icon = typeIcons[lesson.type as keyof typeof typeIcons] ?? BookOpen;
                    const isDone = completedLessons.has(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${module.id}/lesson/${lesson.id}`}
                        className="flex items-center gap-3 px-4 py-3 active:bg-gray-50 hover:bg-gray-50 transition-colors group"
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                          isDone ? "bg-green-50" : "bg-gray-100 group-hover:bg-orange-50"
                        )}>
                          <Icon size={15} className={cn(isDone ? "text-green-500" : "text-gray-400 group-hover:text-orange-500")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{lesson.title}</p>
                          <p className="text-[11px] text-gray-400 capitalize mt-0.5">{lesson.type}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-bold text-amber-500">+{lesson.xp}</span>
                          {isDone
                            ? <CheckCircle size={15} className="text-green-500" />
                            : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="h-24 lg:h-6" />
    </div>
  );
}
