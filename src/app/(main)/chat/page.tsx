"use client";
import { useState } from "react";
import { Zap, MessageCircle, SpellCheck2, Crown, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { GrammarCheck } from "@/components/ai/GrammarCheck";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

function ProGate() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-12 px-6 space-y-5"
    >
      <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center">
        <Lock size={28} className="text-amber-500" />
      </div>
      <div>
        <h2 className="text-xl font-black text-gray-900">Pro Feature</h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          AI features are available for Pro users. Upgrade once to unlock Kru AI Chat, Grammar Checker, and AI Dictionary forever.
        </p>
      </div>
      <Link href="/pricing">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="gradient-thai text-white font-bold px-8 py-3.5 rounded-2xl flex items-center gap-2"
        >
          <Crown size={16} />
          See Pro Plans
        </motion.button>
      </Link>
      <Link href="/donate" className="text-sm text-orange-500 font-semibold underline underline-offset-2">
        Support ThaiJN & Get Pro →
      </Link>
    </motion.div>
  );
}

export default function ChatPage() {
  const [tab, setTab] = useState<"chat" | "grammar">("chat");
  const profile = useAuthStore((s) => s.profile);
  const isPro = profile?.access_tier === "pro";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">AI Thai Tutor</h1>
          <p className="text-gray-500 text-sm mt-1">Practice Thai with your personal AI tutor</p>
        </div>
        {isPro ? (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 font-bold flex-shrink-0">
            <Crown size={12} />
            Pro
          </div>
        ) : (
          <Link href="/pricing">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1.5 font-bold flex-shrink-0">
              <Zap size={12} />
              Upgrade
            </div>
          </Link>
        )}
      </div>

      {!isPro ? (
        <ProGate />
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            {([
              { id: "chat", icon: MessageCircle, label: "Chat with Kru AI" },
              { id: "grammar", icon: SpellCheck2, label: "Grammar Check" },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all",
                  tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          {tab === "chat" && <ChatWindow />}
          {tab === "grammar" && <GrammarCheck />}
        </>
      )}
    </div>
  );
}
