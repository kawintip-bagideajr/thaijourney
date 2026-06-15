import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/firebase/server";
import { cookies } from "next/headers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-exp:free";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const user = await getUserFromSession(cookieStore.get("__session")?.value);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

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
        max_tokens: 512,
        messages: [
          {
            role: "system",
            content: "You are a Thai grammar correction assistant. Always respond with valid JSON only, no markdown code blocks.",
          },
          {
            role: "user",
            content: `The student wrote this Thai sentence or phrase: "${text}"

Check the Thai grammar and respond with this exact JSON format:
{"isCorrect":true/false,"original":"${text}","corrected":"corrected version or same if correct","romanization":"RTGS romanization of the corrected version","explanation":"brief explanation in English","tip":"one grammar tip"}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter grammar error:", err);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: "Could not parse response" }, { status: 502 });

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
