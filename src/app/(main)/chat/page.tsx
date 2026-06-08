import { ChatWindow } from "@/components/ai/ChatWindow";
import { Bot, Zap } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">AI Chat Partner</h1>
          <p className="text-gray-500 text-sm mt-1">Practice Thai with your AI tutor anytime</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 border border-purple-100 rounded-full px-3 py-1.5 font-bold">
          <Zap size={12} />
          Powered by Claude
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[
          { icon: "💬", label: "Free Conversation", desc: "Chat naturally in Thai" },
          { icon: "✍️", label: "Grammar Check", desc: "Get corrections explained" },
          { icon: "🌍", label: "Cultural Tips", desc: "Learn etiquette & context" },
        ].map((f) => (
          <div key={f.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="text-2xl mb-2">{f.icon}</div>
            <p className="font-bold text-gray-800 text-xs">{f.label}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{f.desc}</p>
          </div>
        ))}
      </div>

      <ChatWindow />
    </div>
  );
}
