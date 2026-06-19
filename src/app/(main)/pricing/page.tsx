"use client";
import { motion } from "framer-motion";
import { Check, X, Crown, Zap, MessageCircle, BookMarked, Bot, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const FREE_FEATURES = [
  { label: "All lesson modules (Beginner–Advanced)", ok: true },
  { label: "Adventure Map & Province Lessons", ok: true },
  { label: "Achievements & Leaderboard", ok: true },
  { label: "Thai Alphabet practice", ok: true },
  { label: "Daily streak & XP system", ok: true },
  { label: "Kru AI Chat tutor", ok: false },
  { label: "Grammar Checker", ok: false },
  { label: "AI Dictionary lookups", ok: false },
];

const PRO_FEATURES = [
  { label: "Everything in Free", ok: true },
  { label: "Kru AI Chat — unlimited Thai tutoring", ok: true },
  { label: "AI Grammar Checker for Thai sentences", ok: true },
  { label: "Smart AI Dictionary with examples", ok: true },
  { label: "Priority support", ok: true },
  { label: "Support the project ❤️", ok: true },
];

export default function PricingPage() {
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();
  const isPro = profile?.access_tier === "pro";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-16 h-16 gradient-thai rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Crown size={28} className="text-white" />
        </motion.div>
        <h1 className="text-2xl font-black text-gray-900">Upgrade to Pro</h1>
        <p className="text-gray-500 text-sm mt-1">Unlock AI-powered Thai learning</p>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Free */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "bg-white rounded-2xl border p-5",
            !isPro ? "border-gray-200" : "border-gray-100 opacity-70"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Free Access</h2>
              <p className="text-xs text-gray-400">No cost, always available</p>
            </div>
            <span className="text-2xl font-black text-gray-300">฿0</span>
          </div>
          <div className="space-y-2">
            {FREE_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {f.ok
                  ? <Check size={14} className="text-green-500 flex-shrink-0" />
                  : <X size={14} className="text-gray-300 flex-shrink-0" />}
                <span className={cn("text-sm", f.ok ? "text-gray-700" : "text-gray-300 line-through")}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
          {!isPro && (
            <div className="mt-4 py-2 text-center text-xs font-bold text-green-600 bg-green-50 rounded-xl">
              ✓ Your current plan
            </div>
          )}
        </motion.div>

        {/* Pro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-orange-400 p-5 relative overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <span className="gradient-thai text-white text-[10px] font-black px-2 py-1 rounded-full">
              RECOMMENDED
            </span>
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Pro Access</h2>
              <p className="text-xs text-gray-400">Full AI features included</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-orange-500">฿100</span>
              <p className="text-[10px] text-gray-400">one-time donation</p>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {PRO_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check size={14} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{f.label}</span>
              </div>
            ))}
          </div>
          {isPro ? (
            <div className="py-2 text-center text-xs font-bold text-amber-600 bg-amber-50 rounded-xl">
              ⭐ You have Pro Access!
            </div>
          ) : (
            <Link href="/donate">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full gradient-thai text-white font-black py-3.5 rounded-2xl text-sm"
              >
                Donate & Get Pro Access →
              </motion.button>
            </Link>
          )}
        </motion.div>
      </div>

      {/* AI Features showcase */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-700 text-sm px-1">What Pro unlocks:</h3>
        {[
          { icon: Bot, title: "Kru AI Chat", desc: "Chat with your personal Thai tutor 24/7. Ask anything about Thai language and culture.", color: "text-purple-500", bg: "bg-purple-50" },
          { icon: BookMarked, title: "AI Dictionary", desc: "Instant Thai word lookup with pronunciation, usage examples, and cultural context.", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: MessageCircle, title: "Grammar Checker", desc: "Type any Thai sentence and get instant corrections with explanations.", color: "text-green-500", bg: "bg-green-50" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-2xl"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", item.bg)}>
              <item.icon size={18} className={item.color} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            {!isPro && <Lock size={12} className="text-gray-300 mt-0.5 flex-shrink-0" />}
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 px-4">
        Pro access is activated immediately after donation confirmation.
        No subscription — it&apos;s yours forever. 🙏
      </p>
    </div>
  );
}
