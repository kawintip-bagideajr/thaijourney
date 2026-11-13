"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSettingsStore, type AppLanguage } from "@/store/settingsStore";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Suggestions + welcome per app language
const SUGGESTIONS: Record<AppLanguage, string[]> = {
  en: [
    "How do I say 'Where is the bathroom?'",
    "Teach me how to count to 10",
    "What's the polite way to greet someone?",
    "Help me order food at a restaurant",
  ],
  th: [
    "สอนพูด 'ห้องน้ำอยู่ที่ไหน' หน่อยครับ",
    "สอนนับเลข 1-10 ให้หน่อย",
    "ทักทายสุภาพเขียนยังไงคะ",
    "สอนสั่งอาหารในร้านอาหารหน่อยครับ",
  ],
  ja: [
    "「トイレはどこですか？」はタイ語で？",
    "1から10まで数える方法を教えて",
    "丁寧な挨拶の仕方は？",
    "レストランで注文する方法を教えて",
  ],
  zh: [
    "「洗手间在哪里？」用泰语怎么说？",
    "教我从1数到10",
    "怎样礼貌地打招呼？",
    "教我在餐厅点餐",
  ],
  ko: [
    "'화장실이 어디예요?'를 태국어로 어떻게 말해요?",
    "1부터 10까지 세는 법을 알려주세요",
    "정중하게 인사하는 방법은?",
    "식당에서 음식 주문하는 법을 알려주세요",
  ],
  fr: [
    "Comment dit-on « Où sont les toilettes ? »",
    "Apprenez-moi à compter jusqu'à 10",
    "Comment saluer poliment ?",
    "Aidez-moi à commander au restaurant",
  ],
};

const WELCOME: Record<AppLanguage, string> = {
  en: "สวัสดีครับ! 👋 I'm Kru AI, your Thai tutor. We can practice a conversation, or you can ask me about grammar and Thai culture.\n\nWhat do you want to learn today?",
  th: "สวัสดีครับ! 👋 ผมครูเอไอ มาฝึกพูดภาษาไทยด้วยกัน หรือจะถามเรื่องไวยากรณ์กับวัฒนธรรมไทยก็ได้ครับ\n\nวันนี้อยากเรียนอะไรดี?",
  ja: "สวัสดีครับ! 👋 私はクルーAI、あなたのタイ語の先生です。会話の練習、文法の説明、タイ文化の質問にお答えします。\n\n今日は何を学びたいですか？",
  zh: "สวัสดีครับ! 👋 我是Kru AI，你的泰语老师。可以帮你练习会话、解释语法、解答关于泰国文化的问题。\n\n今天想学什么呢？",
  ko: "สวัสดีครับ! 👋 저는 크루 AI, 당신의 태국어 선생님입니다. 회화 연습, 문법 설명, 태국 문화 질문을 도와드립니다.\n\n오늘은 무엇을 배우고 싶으신가요?",
  fr: "สวัสดีครับ! 👋 Je suis Kru AI, votre tuteur de thaï. Je peux vous aider à pratiquer la conversation, expliquer la grammaire et répondre aux questions sur la culture thaïlandaise.\n\nQue voulez-vous apprendre aujourd'hui ?",
};

const PLACEHOLDER: Record<AppLanguage, string> = {
  en: "Ask me anything about Thai...",
  th: "ถามเรื่องภาษาไทยได้เลย...",
  ja: "タイ語について質問してください...",
  zh: "问我任何关于泰语的问题...",
  ko: "태국어에 대해 무엇이든 물어보세요...",
  fr: "Posez-moi une question sur le thaï...",
};

// Renders **bold**, *italic*, bullet lists, and newlines from AI markdown
function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-0.5 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        const isBullet = /^[-•]\s/.test(line);
        const lineText = isBullet ? line.replace(/^[-•]\s/, "") : line;
        return (
          <div key={i} className={cn("flex", isBullet && "gap-2")}>
            {isBullet && <span className="text-orange-400 flex-shrink-0">•</span>}
            <span>{parseInline(lineText)}</span>
          </div>
        );
      })}
    </div>
  );
}

function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function ChatWindow() {
  const language = useSettingsStore((s) => s.language);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME.en,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update welcome message when language changes (only while still on the welcome screen)
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].id === "welcome"
        ? [{ ...prev[0], content: WELCOME[language] ?? WELCOME.en }]
        : prev
    );
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.message || data.error || "ขอโทษครับ, something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "ขอโทษครับ, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="game-card flex flex-col overflow-hidden" style={{ height: "min(600px, calc(100dvh - 240px))" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-[var(--game-edge)] bg-orange-50/70 flex-shrink-0">
        <div className="w-11 h-11 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center text-xl" aria-hidden="true">🤖</div>
        <div>
          <p className="font-display text-gray-900 leading-tight">Kru AI</p>
          <p className="text-[11px] text-green-600 font-extrabold">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-base border-2",
                msg.role === "assistant" ? "bg-sky-50 border-sky-200" : "bg-orange-50 border-orange-200"
              )}>
                {msg.role === "assistant" ? <span aria-hidden="true">🤖</span> : <User size={15} className="text-orange-500" />}
              </div>
              <div className={cn(
                "max-w-[80%] min-w-0 break-words px-4 py-3 rounded-2xl text-sm font-semibold",
                msg.role === "assistant"
                  ? "bg-white text-gray-800 rounded-tl-md border-2 border-[var(--game-edge)] shadow-[0_3px_0_var(--game-edge)]"
                  : "bg-orange-500 text-white rounded-tr-md shadow-[0_3px_0_#c2410c]"
              )}>
                <MessageContent content={msg.content} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center" aria-hidden="true">🤖</div>
            <div className="bg-white border-2 border-[var(--game-edge)] shadow-[0_3px_0_var(--game-edge)] rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (shown only on welcome) */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
          {(SUGGESTIONS[language] ?? SUGGESTIONS.en).map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs font-extrabold bg-orange-50 text-orange-600 border-2 border-orange-200 rounded-2xl px-3 py-1.5 hover:bg-orange-100 hover:-translate-y-0.5 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 p-3 sm:p-4 border-t-2 border-[var(--game-edge)] flex-shrink-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder={PLACEHOLDER[language] ?? PLACEHOLDER.en}
          className="h-12 rounded-2xl border-2 border-[var(--game-edge)] font-bold focus-visible:border-orange-300 focus-visible:ring-4 focus-visible:ring-orange-100"
          disabled={isLoading}
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="h-12 w-12 rounded-2xl flex-shrink-0"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </Button>
      </div>
    </div>
  );
}
