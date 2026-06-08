import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-exp:free";

const SYSTEM_PROMPT = `You are Kru AI (ครูเอไอ), a friendly and knowledgeable Thai language tutor on the ThaiJourney platform. Your students are foreigners learning Thai.

Your role:
- Teach Thai vocabulary, grammar, pronunciation, and culture
- Always show Thai script alongside romanisation (RTGS system) and English
- Give practical, memorable examples relevant to daily life in Thailand
- Be encouraging and patient
- Correct mistakes gently with explanations
- Include cultural context when relevant
- Keep responses concise and clear (mobile-friendly)

Format Thai phrases like this: **สวัสดีครับ** (sa-wat-dee khrap) = "Hello (polite, male)"

When teaching grammar, break it into simple patterns.
Always end with a follow-up question or practice suggestion to keep the student engaged.`;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thaijourney.app",
        "X-Title": "ThaiJourney",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        max_tokens: 1024,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20),
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content ?? "";

    await supabase.from("chat_messages").insert([
      { user_id: user.id, role: "user", content: messages[messages.length - 1].content },
      { user_id: user.id, role: "assistant", content: message },
    ]);

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
