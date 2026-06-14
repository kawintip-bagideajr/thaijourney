import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("t") ?? "";
  if (!text) return new NextResponse(null, { status: 400 });

  const q = encodeURIComponent(text);
  const len = text.length;

  // Three attempts in order of quality — 'at' (Android client) has the best Thai tone accuracy
  const attempts: { url: string; headers: Record<string, string> }[] = [
    {
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=th&client=at&ttsspeed=0.85&total=1&idx=0&textlen=${len}`,
      headers: {
        "User-Agent": "GoogleTranslate/6.37.0 (Linux; Android 13; Build/TQ3A.230901.001)",
        Accept: "audio/mpeg,audio/*;q=0.9",
      },
    },
    {
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=th&client=tw-ob&ttsspeed=0.85`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
        Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
      },
    },
    {
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=th&client=gtx&ttsspeed=0.85`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept: "audio/mpeg,audio/*;q=0.9",
      },
    },
  ];

  for (const { url, headers } of attempts) {
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) continue;

      const ct = res.headers.get("content-type") ?? "";
      if (!ct.includes("audio") && !ct.includes("mpeg")) continue;

      const buf = await res.arrayBuffer();
      if (buf.byteLength < 1500) continue;

      return new NextResponse(buf, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=604800",
        },
      });
    } catch {
      continue;
    }
  }

  return new NextResponse(null, { status: 503 });
}
