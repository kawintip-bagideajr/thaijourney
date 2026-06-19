import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession, adminDb } from "@/lib/firebase/server";

function sanitizeAscii(s: string): string {
  return Array.from(s)
    .filter((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126)
    .join("")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // Pro-only check
    try {
      const cookieStore = await cookies();
      const user = await getUserFromSession(cookieStore.get("__session")?.value);
      if (!user) {
        return NextResponse.json({ error: "Please log in to use AI Dictionary" }, { status: 401 });
      }
      const profileDoc = await adminDb.collection("profiles").doc(user.uid).get();
      const tier = profileDoc.data()?.access_tier ?? "free";
      if (tier !== "pro") {
        return NextResponse.json({ error: "PRO_REQUIRED" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Authentication error" }, { status: 401 });
    }

    const body = await req.json();
    const word = (typeof body.word === "string" ? body.word : "")
      .replace(/[​‌‍­﻿]/g, "")
      .trim();

    if (!word) {
      return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    const apiKey = sanitizeAscii(process.env.OPENROUTER_API_KEY ?? "");

    if (!apiKey || apiKey.length < 20) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY ไม่ได้ตั้งค่า" },
        { status: 500 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thaijourney.vercel.app",
        "X-Title": "ThaiJN Dictionary",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        max_tokens: 160,
        messages: [
          {
            role: "system",
            content: `Thai-English dictionary for English speakers. Respond in exactly 3 lines:

Line 1: Thai script (romanization) · part of speech
Line 2: Meaning: English definition
Line 3: Example: Thai sentence — English translation

No extra text. Always include the Thai script characters on line 1.`,
          },
          {
            role: "user",
            content: word,
          },
        ],
      }),
    });

    if (!res.ok) {
      let errMsg = `API error ${res.status}`;
      try {
        const errData = await res.json() as { error?: { message?: string } };
        errMsg = errData?.error?.message ?? errMsg;
      } catch { /* ignore */ }
      console.error("[lookup] OpenRouter error:", errMsg);
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const result = (data.choices?.[0]?.message?.content ?? "").trim();

    if (!result) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[lookup] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
