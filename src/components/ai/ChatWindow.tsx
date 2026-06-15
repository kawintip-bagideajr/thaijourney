"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CHAT_SUGGESTIONS = [
  "How do I say 'Where is the bathroom?'",
  "Teach me how to count to 10",
  "What's the polite way to greet someone?",
  "Help me order food at a restaurant",
];

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "สวัสดีครับ! 👋 I'm Kru AI, your Thai language tutor. I can help you practice Thai conversation, explain grammar, and answer questions about Thai culture.\n\nWhat would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.message || data.error || "ขอโทษครับ — something went wrong. Please try again.";
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
          content: "ขอโทษครับ — something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" style={{ height: "min(600px, calc(100dvh - 280px))" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-gradient-to-r from-orange-50 to-amber-50 flex-shrink-0">
        <div className="w-10 h-10 gradient-thai rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <p className="font-bold text-gray-900">Kru AI</p>
          <p className="text-xs text-green-500 font-medium">● Online</p>
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
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm",
                msg.role === "assistant" ? "gradient-thai" : "bg-gray-200"
              )}>
                {msg.role === "assistant" ? "🤖" : <User size={14} className="text-gray-500" />}
              </div>
              <div className={cn(
                "max-w-[80%] px-4 py-3 rounded-2xl text-sm",
                msg.role === "assistant"
                  ? "bg-gray-50 text-gray-800 rounded-tl-sm"
                  : "bg-orange-500 text-white rounded-tr-sm"
              )}>
                <MessageContent content={msg.content} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-thai flex items-center justify-center">🤖</div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (shown only on welcome) */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
          {CHAT_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs bg-orange-50 text-orange-600 border border-orange-100 rounded-full px-3 py-1.5 hover:bg-orange-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 p-4 border-t flex-shrink-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Ask me anything about Thai..."
          className="rounded-2xl"
          disabled={isLoading}
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="rounded-2xl flex-shrink-0"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </Button>
      </div>
    </div>
  );
}
