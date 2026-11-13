"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, Flame, Zap, Lock, Check, X, Crown, Swords, Play, Sparkles, Bot, Stamp } from "lucide-react";
import { BOSSES, BOSS_RULES, type BossQuestion } from "@/data/bosses";
import { PROVINCES } from "@/data/provinces";

/* Arcade landing page. Every number and question on it comes from the game's own data files. */

const DEMO_IDS = ["ya1", "ya3", "nd3", "ya9", "ya7"];
const XP_PER_HIT = 15;
const LEVEL_XP = DEMO_IDS.length * XP_PER_HIT;

const BOSS_TINT: Record<string, string> = {
  Central: "#F2A007",
  North: "#2BB673",
  Northeast: "#E0136F",
  South: "#22A6E0",
};

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-white px-3 py-1 font-display text-sm text-ink shadow-[3px_3px_0_#1F2A5C] ${className}`}>
      {children}
    </span>
  );
}

function PlayButton({ href, children, big = false, tone = "taxi" }: { href: string; children: React.ReactNode; big?: boolean; tone?: "taxi" | "white" }) {
  const toneCls = tone === "taxi" ? "bg-taxi text-white [--btn-edge:#1F2A5C]" : "bg-white text-ink [--btn-edge:#1F2A5C]";
  return (
    <Link
      href={href}
      className={`btn-3d inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-ink font-display uppercase tracking-wide ${toneCls} ${big ? "px-8 py-4 text-xl sm:text-2xl" : "px-5 py-2.5 text-base"}`}
      style={{ boxShadow: "0 6px 0 #1F2A5C" }}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ the playable demo */

function useDemo() {
  const questions = useMemo(
    () => DEMO_IDS.map((id) => BOSSES.flatMap((b) => b.questions).find((q) => q.id === id)).filter(Boolean) as BossQuestion[],
    []
  );
  const [i, setI] = useState(0);
  const [xp, setXp] = useState(0);
  const [hearts, setHearts] = useState<number>(BOSS_RULES.playerHearts);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [burst, setBurst] = useState(0);

  const q = questions[i];
  const done = i >= questions.length || hearts === 0;

  function pick(choice: number) {
    if (picked !== null || done) return;
    setPicked(choice);
    if (choice === q.answer) {
      setXp((v) => v + XP_PER_HIT);
      setCombo((c) => c + 1);
      setBurst((b) => b + 1);
    } else {
      setHearts((h) => h - 1);
      setCombo(0);
    }
  }
  function next() {
    setPicked(null);
    setI((v) => v + 1);
  }
  function reset() {
    setI(0); setXp(0); setHearts(BOSS_RULES.playerHearts); setCombo(0); setPicked(null);
  }
  return { questions, q, i, xp, hearts, combo, picked, burst, done, pick, next, reset };
}

function Hud({ xp, hearts, combo }: { xp: number; hearts: number; combo: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-0.5" aria-label={`${hearts} hearts left`}>
        {Array.from({ length: BOSS_RULES.playerHearts }).map((_, k) => (
          <Heart key={k} className={`h-5 w-5 transition-transform ${k < hearts ? "fill-lacquer text-lacquer" : "fill-white/40 text-ink/40 scale-90"}`} strokeWidth={2.5} />
        ))}
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <Zap className="h-5 w-5 fill-saffron text-ink" strokeWidth={2.5} />
        <div className="h-4 w-28 overflow-hidden rounded-full border-[3px] border-ink bg-white" role="meter" aria-valuemin={0} aria-valuemax={LEVEL_XP} aria-valuenow={xp} aria-label="Demo XP">
          <div className="h-full bg-saffron transition-[width] duration-500" style={{ width: `${(xp / LEVEL_XP) * 100}%` }} />
        </div>
        <span className="font-display text-sm text-ink tabular-nums">{xp} XP</span>
      </div>
      <span className={`flex items-center gap-1 font-display text-sm ${combo >= 2 ? "text-taxi" : "text-ink/50"}`}>
        <Flame className={`h-5 w-5 ${combo >= 2 ? "fill-taxi" : ""}`} strokeWidth={2.5} />x{combo}
      </span>
    </div>
  );
}

function DemoCard({ demo }: { demo: ReturnType<typeof useDemo> }) {
  const { q, i, questions, picked, burst, done, xp, hearts, pick, next, reset } = demo;

  if (done) {
    const won = hearts > 0;
    return (
      <div className="arcade-card relative bg-white p-6 sm:p-8 text-center animate-bounce-in">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-ink bg-saffron shadow-[4px_4px_0_#1F2A5C]">
          {won ? <Crown className="h-10 w-10 text-ink" strokeWidth={2.5} /> : <Heart className="h-10 w-10 text-ink" strokeWidth={2.5} />}
        </div>
        <p className="font-display text-3xl text-ink">{won ? "Level clear!" : "Out of hearts"}</p>
        <p className="mt-2 text-ink/80">
          {won ? <>You earned <b className="text-ink">{xp} XP</b> in a demo run. Make an account and it starts counting for real.</> : <>That happens. In the game your hearts refill, one every 30 minutes.</>}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <PlayButton href="/signup">Save my run</PlayButton>
          <button onClick={reset} className="font-display text-sm text-ink underline underline-offset-4">Play again</button>
        </div>
      </div>
    );
  }

  const correct = picked !== null && picked === q.answer;
  const wrong = picked !== null && picked !== q.answer;

  return (
    <div key={i} className={`arcade-card relative bg-white p-5 sm:p-7 ${wrong ? "animate-shake" : ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-xs uppercase tracking-widest text-ink/60">Question {i + 1} of {questions.length}</span>
        <span className="rounded-full border-2 border-ink bg-paper px-2 py-0.5 font-display text-xs text-ink">Try it</span>
      </div>
      <p className="text-sm font-semibold text-ink/70">{q.instruction}</p>
      <p className="font-thai-loop mt-1 text-5xl sm:text-6xl font-bold leading-tight text-ink" lang="th">{q.prompt}</p>
      {q.romanization && <p className="mt-1 font-display text-taxi">{q.romanization}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {q.choices.map((c, k) => {
          const isAnswer = picked !== null && k === q.answer;
          const isWrongPick = picked === k && k !== q.answer;
          const base = isAnswer ? "bg-celadon text-white [--btn-edge:#2F6F5A]" : isWrongPick ? "bg-lacquer text-white [--btn-edge:#8C1C1C]" : "bg-white text-ink [--btn-edge:#1F2A5C]";
          return (
            <button
              key={k}
              onClick={() => pick(k)}
              disabled={picked !== null}
              className={`btn-3d min-h-14 rounded-xl border-[3px] border-ink px-3 py-2 text-left font-semibold leading-snug ${base} ${picked !== null && !isAnswer && !isWrongPick ? "opacity-50" : ""}`}
            >
              <span className="flex items-center gap-2">
                {isAnswer && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
                {isWrongPick && <X className="h-4 w-4 shrink-0" strokeWidth={3} />}
                {c}
              </span>
            </button>
          );
        })}
      </div>

      {correct && (
        <span key={burst} className="xp-pop pointer-events-none absolute right-6 top-16 font-display text-3xl text-saffron [-webkit-text-stroke:2px_#1F2A5C]">
          +{XP_PER_HIT} XP
        </span>
      )}

      {picked !== null && (
        <div className={`mt-5 flex items-center justify-between gap-3 rounded-xl border-[3px] border-ink p-3 ${correct ? "bg-celadon/15" : "bg-lacquer/10"}`}>
          <p className="text-sm text-ink">{q.explanation}</p>
          <button onClick={next} className="btn-3d shrink-0 rounded-xl border-[3px] border-ink bg-saffron px-4 py-2 font-display text-ink [--btn-edge:#1F2A5C]">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ the map */

const ROUTE = [...PROVINCES].sort((a, b) => a.unlock_xp - b.unlock_xp);

function MapPath({ vertical }: { vertical: boolean }) {
  const pts = ROUTE.map((_, k) =>
    vertical
      ? { x: [22, 50, 78, 50][k % 4], y: 5 + k * 10 }
      : { x: 5 + k * 10, y: k % 2 === 0 ? 68 : 30 }
  );
  return (
    <div className={`relative ${vertical ? "h-[1100px] lg:hidden" : "hidden lg:block h-[340px]"}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#1F2A5C" strokeWidth="10" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 10" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {ROUTE.map((p, k) => {
        const start = k === 0;
        return (
          <div key={p.id} className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center" style={{ left: `${pts[k].x}%`, top: `${pts[k].y}%` }}>
            {start && <span className="mb-1 rounded-full border-2 border-ink bg-taxi px-2 py-0.5 font-display text-xs uppercase text-white animate-bob">Start</span>}
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink text-2xl shadow-[0_5px_0_#1F2A5C] ${start ? "bg-saffron" : "bg-white"}`}
              aria-hidden="true"
            >
              {start ? <Play className="h-7 w-7 fill-ink text-ink" /> : <span>{p.emoji}</span>}
            </span>
            <span className="mt-2 rounded-lg border-2 border-ink bg-white px-2 py-0.5 font-display text-sm leading-tight text-ink">{p.name_en}</span>
            <span className="mt-1 flex items-center gap-1 font-display text-xs text-ink">
              {start ? "0 XP" : <><Lock className="h-3 w-3" strokeWidth={3} />{p.unlock_xp} XP</>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function LandingPage() {
  const demo = useDemo();

  return (
    <div className="arcade min-h-dvh bg-[#FFD23F] text-ink">
      {/* HUD bar */}
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-[#FFD23F]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex items-center gap-2 font-display text-xl text-ink">
            <img src="/favicon.svg" alt="" width={32} height={32} className="rounded-lg border-2 border-ink" />
            ThaiJN
          </Link>
          <Hud xp={demo.xp} hearts={demo.hearts} combo={demo.combo} />
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline font-display text-ink underline-offset-4 hover:underline">Sign in</Link>
            <PlayButton href="/signup">Play free</PlayButton>
          </div>
        </div>
      </header>

      <main>
        {/* Hero: the game itself */}
        <section className="relative overflow-hidden">
          <div className="arcade-dots absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
            <div>
              <Chip><Sparkles className="h-4 w-4" strokeWidth={2.5} /> Free Thai-learning game</Chip>
              <h1 className="mt-5 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
                <span className="arcade-title block">THAIJN</span>
                <span className="mt-3 block text-3xl sm:text-4xl lg:text-5xl">Learn Thai.<br />Beat the guardians.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-ink/85">
                Answer questions, earn XP, and travel a map of {ROUTE.length} provinces from Bangkok to {ROUTE[ROUTE.length - 1].name_en}. {BOSSES.length} bosses guard the four regions, two in each.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <PlayButton href="/signup" big>
                  <Play className="h-6 w-6 fill-white" /> Start playing
                </PlayButton>
                <span className="font-display text-sm text-ink/80">No card. Runs in your browser.</span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute -top-5 left-6 z-10 rotate-[-4deg] rounded-lg border-[3px] border-ink bg-taxi px-3 py-1 font-display text-sm uppercase text-white shadow-[3px_3px_0_#1F2A5C]">
                Play a round right here
              </span>
              <DemoCard demo={demo} />
            </div>
          </div>
        </section>

        {/* How a run works */}
        <section className="border-y-[3px] border-ink bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <h2 className="font-display text-4xl sm:text-5xl">How a run works</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { icon: <Zap className="h-8 w-8 fill-saffron" strokeWidth={2.5} />, bg: "bg-saffron/25", t: "Clear lessons", d: "Short rounds of questions. Each lesson pays 15 or 20 XP. A wrong answer costs a heart." },
                { icon: <Lock className="h-8 w-8" strokeWidth={2.5} />, bg: "bg-[#22A6E0]/20", t: "Open the map", d: "XP opens the next province: Chiang Mai at 100, Ayutthaya at 150, Koh Samui at 400." },
                { icon: <Swords className="h-8 w-8" strokeWidth={2.5} />, bg: "bg-taxi/15", t: "Fight the guardian", d: `${BOSS_RULES.secondsPerQuestion} seconds a question, ${BOSS_RULES.playerHearts} hearts. Win and its stamp goes in your passport.` },
              ].map((s, k) => (
                <li key={s.t} className="arcade-card relative bg-white p-6">
                  <span className="absolute -top-4 -left-3 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-ink font-display text-lg text-white">{k + 1}</span>
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-ink ${s.bg}`}>{s.icon}</div>
                  <h3 className="font-display text-2xl">{s.t}</h3>
                  <p className="mt-2 text-ink/80">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* World map */}
        <section className="relative overflow-hidden bg-[#4CC9F0]">
          <div className="arcade-waves absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl sm:text-5xl">World map: {ROUTE.length} provinces</h2>
              <Chip><Stamp className="h-4 w-4" strokeWidth={2.5} /> Bangkok is open from day one</Chip>
            </div>
            <div className="mt-12">
              <MapPath vertical={false} />
              <MapPath vertical />
            </div>
          </div>
        </section>

        {/* Boss roster */}
        <section className="relative overflow-hidden border-y-[3px] border-ink bg-ink text-white">
          <div className="arcade-stars absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <h2 className="font-display text-4xl sm:text-5xl">Choose your first boss</h2>
            <p className="mt-3 max-w-xl text-white/85">Each region of Thailand has a guardian taken from Thai legend. Three right answers in a row and every hit does double damage.</p>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BOSSES.map((b) => {
                const tint = BOSS_TINT[b.region] ?? "#F2A007";
                return (
                  <li key={b.id} className="boss-card group rounded-3xl border-[3px] border-ink bg-white p-5 text-ink" style={{ boxShadow: `6px 6px 0 ${tint}` }}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border-2 border-ink px-2 py-0.5 font-display text-xs uppercase" style={{ background: tint }}>{b.region}</span>
                      <span className="font-display text-xs text-ink/60">HP {b.hp}</span>
                    </div>
                    <div className="my-4 flex h-28 items-center justify-center rounded-2xl border-[3px] border-ink text-7xl transition-transform group-hover:-rotate-6 group-hover:scale-110" style={{ background: `${tint}33` }} aria-hidden="true">
                      {b.emoji}
                    </div>
                    <h3 className="font-display text-xl leading-tight">{b.name_en}</h3>
                    <p className="font-thai-loop text-ink/70" lang="th">{b.name_th}</p>
                    <div className="mt-3 flex gap-1" role="meter" aria-label={`${b.hp} hit points`} aria-valuemin={0} aria-valuemax={b.hp} aria-valuenow={b.hp}>
                      {Array.from({ length: b.hp }).map((_, k) => (
                        <span key={k} className="h-3 flex-1 rounded-sm border border-ink" style={{ background: tint }} />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Item shop: pricing */}
        <section className="bg-[#FFD23F]">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <h2 className="font-display text-4xl sm:text-5xl">The shop</h2>
            <p className="mt-3 text-lg text-ink/85">The whole game is free. Pro adds an AI tutor.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="arcade-card bg-white p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-3xl">Free</h3>
                  <span className="font-display text-4xl">$0</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {["Every lesson, Beginner to Advanced", `The map, all ${BOSSES.length} guardians and the passport`, "Thai alphabet practice", "Streaks, daily quests and the leaderboard", "5 hearts, one back every 30 minutes"].map((t) => (
                    <li key={t} className="flex gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-celadon" strokeWidth={3} />{t}</li>
                  ))}
                </ul>
                <div className="mt-7"><PlayButton href="/signup">Start free</PlayButton></div>
              </div>
              <div className="arcade-card relative bg-white p-7" style={{ boxShadow: "8px 8px 0 #E0136F" }}>
                <span className="absolute -top-4 right-6 rotate-3 rounded-lg border-[3px] border-ink bg-taxi px-3 py-1 font-display text-sm uppercase text-white">Power-up</span>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-3xl">Pro</h3>
                  <span className="font-display text-4xl">$5<span className="text-lg">/month</span></span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {["Everything in Free", "Kru, the AI chat tutor, with no message limit", "AI grammar checker for Thai sentences", "AI dictionary with example sentences", "Paid by PromptPay, renewed by hand each month"].map((t) => (
                    <li key={t} className="flex gap-2"><Bot className="mt-0.5 h-5 w-5 shrink-0 text-taxi" strokeWidth={2.5} />{t}</li>
                  ))}
                </ul>
                <div className="mt-7"><PlayButton href="/subscribe" tone="white">Get Pro</PlayButton></div>
              </div>
            </div>
          </div>
        </section>

        {/* Press start */}
        <section className="border-t-[3px] border-ink bg-taxi text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-white/90 animate-pulse">Player 1</p>
            <h2 className="mt-3 font-display text-5xl sm:text-7xl">Press start</h2>
            <p className="mt-4 max-w-md text-lg text-white/90">Your first lesson is in Bangkok. A free account keeps your XP, streak and stamps.</p>
            <div className="mt-8"><PlayButton href="/signup" big tone="white"><Play className="h-6 w-6 fill-ink" /> Start playing</PlayButton></div>
          </div>
        </section>
      </main>

      <footer className="border-t-[3px] border-ink bg-ink text-white/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm">
          <span className="font-display text-white">© 2026 ThaiJN</span>
          <nav className="flex gap-5">
            <Link href="/login" className="hover:text-white">Sign in</Link>
            <Link href="/signup" className="hover:text-white">Create account</Link>
            <Link href="/subscribe" className="hover:text-white">Pro</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
