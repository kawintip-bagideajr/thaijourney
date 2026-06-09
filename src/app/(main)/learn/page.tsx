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
];

const typeIcons = {
  vocabulary: BookOpen, grammar: Star, listening: Headphones,
  culture: MessageSquare, speaking: MessageSquare,
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
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Learning Path</h1>
        <p className="text-gray-500 text-sm mt-1">Complete lessons to unlock new provinces</p>
      </div>

      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => setActiveTrack(track.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTrack === track.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span>{track.emoji}</span>
            {track.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredModules.map((module, moduleIdx) => {
          const isLocked = userXP < module.requiredXP;
          const completedCount = module.lessons.filter((l) => completedLessons.has(l.id)).length;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIdx * 0.08 }}
              className={cn(
                "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all",
                isLocked ? "opacity-60 border-gray-100" : "border-gray-100 hover:shadow-md"
              )}
            >
              <div className={cn("p-5 flex items-center gap-4", isLocked && "grayscale-[50%]")}>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-3xl", module.bgColor)}>
                  {isLocked ? "🔒" : module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{module.title}</h3>
                    {isLocked ? (
                      <Badge variant="secondary" className="text-[10px]">{module.requiredXP} XP required</Badge>
                    ) : completedCount > 0 ? (
                      <Badge className="text-[10px] bg-green-100 text-green-700 border-0">
                        {completedCount}/{module.lessons.length} done
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-500">{module.description}</p>
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
                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                          isDone ? "bg-green-50" : "bg-gray-100 group-hover:bg-orange-50"
                        )}>
                          <Icon size={16} className={cn(
                            "transition-colors",
                            isDone ? "text-green-500" : "text-gray-400 group-hover:text-orange-500"
                          )} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{lesson.title}</p>
                          <p className="text-xs text-gray-400 capitalize">{lesson.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-500">+{lesson.xp} XP</span>
                          {isDone ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                          )}
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
    </div>
  );
}
