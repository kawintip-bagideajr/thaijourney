import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

function sanitizeAscii(s: string): string {
  return Array.from(s)
    .filter((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126)
    .join("")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // Auth + Pro check
    try {
      const cookieStore = await cookies();
      const user = await getUserFromSession(cookieStore.get("__session")?.value);
      if (!user) {
        return NextResponse.json({ error: "Please log in to use grammar check" }, { status: 401 });
      }
      const profileDoc = await adminDb.collection("profiles").doc(user.uid).get();
      const tier = profileDoc.data()?.access_tier ?? "free";
      if (tier !== "pro") {
        return NextResponse.json({ error: "PRO_REQUIRED" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Authentication error" }, { status: 401 });
    }

    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
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
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content: `You are a Thai grammar checker for English-speaking learners. Reply with valid JSON only — no markdown, no extra text.

JSON format:
{"isCorrect":true/false,"original":"<input>","corrected":"<corrected or same>","romanization":"<RTGS of corrected>","explanation":"<brief English explanation>","tip":"<one short grammar tip>"}`,
          },
          {
            role: "user",
            content: `Check this Thai text: "${text.trim()}"`,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter grammar error:", res.status);
      return NextResponse.json({ error: "AI service unavailable, please try again" }, { status: 502 });
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = (data.choices?.[0]?.message?.content ?? "").trim();

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Grammar: could not parse JSON from:", content.slice(0, 200));
      return NextResponse.json({ error: "Could not parse AI response" }, { status: 502 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
