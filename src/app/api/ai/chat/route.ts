import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

function sanitizeAscii(s: string): string {
  return Array.from(s)
    .filter((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126)
    .join("")
    .trim();
}

const SYSTEM_PROMPT = `You are Kru AI (ครูเอไอ), a friendly Thai language tutor on ThaiJN. Your students are English-speaking foreigners learning Thai.

- Teach vocabulary, grammar, pronunciation, and culture
- Always show: Thai script + romanisation (RTGS) + English meaning
- Format Thai phrases like: **สวัสดีครับ** (sa-wat-dee khrap) = "Hello (polite, male)"
- Keep responses concise and mobile-friendly
- Be encouraging; correct mistakes gently
- End each reply with a short follow-up question or practice tip`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Pro-only check
    try {
      const cookieStore = await cookies();
      const user = await getUserFromSession(cookieStore.get("__session")?.value);
      if (user) {
        const profileDoc = await adminDb.collection("profiles").doc(user.uid).get();
        const tier = profileDoc.data()?.access_tier ?? "free";
        if (tier !== "pro") {
          return NextResponse.json({ error: "PRO_REQUIRED" }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "Authentication error" }, { status: 401 });
    }

    const apiKey = sanitizeAscii(process.env.OPENROUTER_API_KEY ?? "");
    if (!apiKey) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thaijourney.vercel.app",
        "X-Title": "ThaiJN",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        max_tokens: 800,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20),
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("OpenRouter error:", res.status, errText.slice(0, 200));
      return NextResponse.json({ error: "AI service unavailable, please try again" }, { status: 502 });
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const message = (data.choices?.[0]?.message?.content ?? "").trim();

    if (!message) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 });
    }

    // Save to Firestore — best-effort, never fails the request
    try {
      const cookieStore = await cookies();
      const user = await getUserFromSession(cookieStore.get("__session")?.value);
      if (user) {
        const batch = adminDb.batch();
        const now = new Date().toISOString();
        const lastUserContent = messages[messages.length - 1]?.content ?? "";
        batch.set(adminDb.collection("chat_messages").doc(), { user_id: user.uid, role: "user", content: lastUserContent, created_at: now });
        batch.set(adminDb.collection("chat_messages").doc(), { user_id: user.uid, role: "assistant", content: message, created_at: now });
        await batch.commit();
      }
    } catch { /* skip — chat still works without saving */ }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
