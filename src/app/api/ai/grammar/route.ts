import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [{
        role: "user",
        content: `You are a Thai grammar correction assistant. The student wrote this Thai sentence or phrase: "${text}"

Please:
1. Check if it's grammatically correct
2. If incorrect, provide the corrected version
3. Explain the correction in simple English
4. Provide the romanisation (RTGS)
5. Give a brief tip about the grammar rule

Format as JSON: { "isCorrect": boolean, "original": string, "corrected": string, "romanization": string, "explanation": string, "tip": string }`,
      }],
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse response" };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
