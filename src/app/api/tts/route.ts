import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Try two Google TTS client IDs — they have separate rate-limit buckets
const CLIENTS = ["tw-ob", "gtx"] as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("t") ?? "";
  if (!text) return new NextResponse(null, { status: 400 });

  for (const client of CLIENTS) {
    try {
      const url =
        `https://translate.google.com/translate_tts` +
        `?ie=UTF-8&q=${encodeURIComponent(text)}&tl=th&client=${client}&ttsspeed=1`;

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/",
          Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        },
      });

      if (!res.ok) continue;

      // If Google returned an error page instead of audio, skip this client
      const ct = res.headers.get("content-type") ?? "";
      if (!ct.includes("audio") && !ct.includes("mpeg")) continue;

      const buf = await res.arrayBuffer();
      // A real MP3 is at least a few KB; an error response is tiny HTML
      if (buf.byteLength < 1500) continue;

      return new NextResponse(buf, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });
    } catch {
      continue;
    }
  }

  // Both clients failed — client should fall back to Web Speech API
  return new NextResponse(null, { status: 503 });
}
