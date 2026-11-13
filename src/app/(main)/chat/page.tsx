"use client";
import { useState } from "react";
import { Zap, MessageCircle, SpellCheck2, Crown, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { GrammarCheck } from "@/components/ai/GrammarCheck";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { cn } from "@/lib/utils";

function ProGate() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="game-card flex flex-col items-center text-center py-10 px-6 space-y-5"
    >
      <div className="relative">
        <div className="text-6xl grayscale opacity-60 select-none" aria-hidden="true">🤖</div>
        <div className="absolute -bottom-1 -right-3 w-9 h-9 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
          <Lock size={16} className="text-amber-500" />
        </div>
      </div>
      <div>
        <h2 className="font-display text-xl text-gray-900">{t("chat.proFeature")}</h2>
        <p className="text-gray-500 text-sm font-bold mt-2 leading-relaxed">
          {t("chat.aiFeaturesDesc")}
        </p>
      </div>
      <Link href="/pricing" className="rounded-2xl">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="btn-3d shimmer h-12 px-8 rounded-2xl bg-orange-500 text-white font-display flex items-center gap-2 [--btn-edge:#c2410c]"
        >
          <Crown size={16} />
          {t("chat.seeProPlans")}
        </motion.button>
      </Link>
      <Link href="/subscribe" className="text-sm text-orange-500 font-extrabold underline underline-offset-2">
        {t("chat.subscribeToPro")}
      </Link>
    </motion.div>
  );
}

export default function ChatPage() {
  const [tab, setTab] = useState<"chat" | "grammar">("chat");
  const profile = useAuthStore((s) => s.profile);
  const isPro = profile?.access_tier === "pro";
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
      {/* Slim title row */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-xl sm:text-2xl text-gray-900 leading-tight">💬 {t("chat.title")}</h1>
          <p className="text-xs sm:text-sm font-bold text-gray-500">{t("chat.subtitle")}</p>
        </div>
        {isPro ? (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border-2 border-amber-200 rounded-2xl px-3 py-1.5 font-extrabold flex-shrink-0 self-start">
            <Crown size={12} />
            {t("common.pro")}
          </div>
        ) : (
          <Link href="/pricing" className="flex-shrink-0 self-start rounded-2xl">
            <div className="btn-3d flex items-center gap-1.5 text-xs text-gray-700 bg-white border-2 border-[var(--game-edge)] rounded-2xl px-3 py-1.5 font-extrabold [--btn-edge:var(--game-edge)]">
              <Zap size={12} className="text-amber-500 fill-amber-400" />
              {t("common.upgrade")}
            </div>
          </Link>
        )}
      </div>

      {!isPro ? (
        <ProGate />
      ) : (
        <>
          {/* Tabs */}
          <div className="game-panel p-1 flex gap-1.5">
            {([
              { id: "chat", icon: MessageCircle, label: t("chat.chatWithKru") },
              { id: "grammar", icon: SpellCheck2, label: t("chat.grammarCheck") },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex-1 min-w-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-2xl text-sm font-extrabold transition-colors",
                  tab === id ? "btn-3d bg-orange-500 text-white [--btn-edge:#c2410c]" : "text-gray-500 hover:bg-orange-50"
                )}
              >
                <Icon size={15} className="shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {tab === "chat" && <ChatWindow />}
            {tab === "grammar" && <GrammarCheck />}
          </motion.div>
        </>
      )}
    </div>
  );
}
