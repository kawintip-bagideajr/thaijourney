import { NextRequest, NextResponse } from "next/server";

function sanitizeAscii(s: string): string {
  // Keep only printable ASCII (32–126) — removes BOM (65279), control chars, newlines
  return Array.from(s)
    .filter((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126)
    .join("")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Strip zero-width / invisible Unicode chars from the search word
    const word = (typeof body.word === "string" ? body.word : "")
      .replace(/[​‌‍­﻿]/g, "")
      .trim();

    if (!word) {
      return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    // Strip BOM, newlines, non-ASCII from API key before using it as an HTTP header
    const apiKey = sanitizeAscii(process.env.ANTHROPIC_API_KEY ?? "");

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 350,
        system: `You are a Thai-English dictionary assistant. Respond ONLY in this format:

**[Thai word]** ([romanization]) — [English meaning]
*Part of speech:* [noun/verb/adj/adv/phrase/proper noun]
Example: [Thai sentence] ([romanization]) — "[English translation]"

Rules:
- English input → give Thai equivalent(s)
- Thai input → translate to English
- List top 2 meanings if multiple exist
- Proper nouns/names: identify them as such
- No extra commentary`,
        messages: [{ role: "user", content: word }],
      }),
    });

    if (!anthropicRes.ok) {
      let errMsg = `API error ${anthropicRes.status}`;
      try {
        const errData = await anthropicRes.json() as { error?: { message?: string } };
        errMsg = errData?.error?.message ?? errMsg;
      } catch { /* ignore parse failure */ }
      console.error("Anthropic error:", errMsg);
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    const data = await anthropicRes.json() as { content: Array<{ type: string; text: string }> };
    const result = data.content?.[0]?.type === "text" ? data.content[0].text : "";

    if (!result) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Dictionary lookup error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
