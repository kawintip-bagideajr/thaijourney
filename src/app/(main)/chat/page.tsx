"use client";
import { useState } from "react";
import { Zap, MessageCircle, SpellCheck2 } from "lucide-react";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { GrammarCheck } from "@/components/ai/GrammarCheck";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [tab, setTab] = useState<"chat" | "grammar">("chat");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">AI Thai Tutor</h1>
          <p className="text-gray-500 text-sm mt-1">Practice Thai with your personal AI tutor</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 border border-purple-100 rounded-full px-3 py-1.5 font-bold flex-shrink-0">
          <Zap size={12} />
          Powered by AI
        </div>
      </div>

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
    </div>
  );
}
