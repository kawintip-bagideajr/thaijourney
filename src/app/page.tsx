"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Heart, Flame, Zap, Lock, Check, X, Crown, Swords, Play, Sparkles, Bot, Stamp } from "lucide-react";
import { BOSSES, BOSS_RULES, type BossQuestion } from "@/data/bosses";
import { PROVINCES } from "@/data/provinces";
import { ThaiScene, SCENE_PALETTES } from "@/components/game/ThaiScene";
import { AppLogoIcon } from "@/components/ui/AppLogoIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Landing page in the app's candy style. Every number and question on it comes from the game's own data files. */

const DEMO_IDS = ["ya1", "ya3", "nd3", "ya9", "ya7"];
const XP_PER_HIT = 15;
const LEVEL_XP = DEMO_IDS.length * XP_PER_HIT;

/* Same region colours as the in-app map. */
const REGION_COLOR: Record<string, string> = {
  Central: "#F59E0B",
  North: "#8B5CF6",
  Northeast: "#EF4444",
  South: "#0EA5E9",
};

/* The global `* { border-color }` rule is unlayered and beats Tailwind border colours, so set them inline. */
const EDGE = { borderColor: "var(--game-edge)" } as const;
const FOCUS = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/70";

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
          <Heart
            key={k}
            className={cn("h-5 w-5 transition-transform", k < hearts ? "fill-red-500 text-red-500" : "fill-gray-200 text-gray-300 scale-90")}
            strokeWidth={2.5}
          />
        ))}
      </div>
      <div className="hidden sm:flex items-center gap-1.5">
        <Zap className="h-5 w-5 fill-amber-400 text-amber-500" strokeWidth={2.5} />
        <div
          className="h-3.5 w-28 overflow-hidden rounded-full border-2 bg-gray-100"
          style={EDGE}
          role="meter" aria-valuemin={0} aria-valuemax={LEVEL_XP} aria-valuenow={xp} aria-label="Demo XP"
        >
          <div className="xp-bar h-full" style={{ width: `${(xp / LEVEL_XP) * 100}%` }} />
        </div>
        <span className="font-display text-sm text-amber-600 tabular-nums">{xp} XP</span>
      </div>
      <span className={cn("flex items-center gap-0.5 font-display text-sm", combo >= 2 ? "text-orange-500" : "text-gray-400")}>
        <Flame className={cn("h-5 w-5", combo >= 2 && "fill-orange-400")} strokeWidth={2.5} />x{combo}
      </span>
    </div>
  );
}

function DemoCard({ demo }: { demo: ReturnType<typeof useDemo> }) {
  const { q, i, questions, picked, burst, done, xp, hearts, pick, next, reset } = demo;

  if (done) {
    const won = hearts > 0;
    return (
      <div className="game-card relative p-6 sm:p-8 text-center animate-bounce-in">
        <div
          className={cn("mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-[0_5px_0_var(--game-edge)]", won ? "bg-amber-100" : "bg-red-50")}
          style={{ borderColor: "#fff" }}
        >
          {won ? <Crown className="h-10 w-10 fill-amber-300 text-amber-500" strokeWidth={2.5} /> : <Heart className="h-10 w-10 fill-red-200 text-red-500" strokeWidth={2.5} />}
        </div>
        <p className="font-display text-3xl text-gray-900">{won ? "Level clear!" : "Out of hearts"}</p>
        <p className="mt-2 text-gray-600">
          {won ? <>You earned <b className="text-amber-600">{xp} XP</b> in a demo run. Make an account and it starts counting for real.</> : <>That happens. In the game your hearts refill, one every 30 minutes.</>}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button asChild size="lg">
            <Link href="/signup">Save my run</Link>
          </Button>
          <button onClick={reset} className={cn("rounded-full px-2 font-display text-sm text-orange-600 underline underline-offset-4", FOCUS)}>
            Play again
          </button>
        </div>
      </div>
    );
  }

  const correct = picked !== null && picked === q.answer;
  const wrong = picked !== null && picked !== q.answer;

  return (
    <div key={i} className={cn("game-card relative p-5 sm:p-7", wrong && "animate-shake")}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-gray-400">Question {i + 1} of {questions.length}</span>
          <span className="flex gap-1" aria-hidden="true">
            {questions.map((_, k) => (
              <span key={k} className={cn("h-2 w-2 rounded-full", k < i ? "bg-orange-400" : k === i ? "bg-orange-200" : "bg-gray-200")} />
            ))}
          </span>
        </div>
        <span className="rounded-full border-2 bg-amber-50 px-2.5 py-0.5 font-display text-xs text-amber-600" style={{ borderColor: "#fde68a" }}>Try it</span>
      </div>
      <p className="text-sm font-bold text-gray-500">{q.instruction}</p>
      <p className="thai-text mt-1 text-5xl sm:text-6xl font-bold leading-tight text-gray-900" lang="th">{q.prompt}</p>
      {q.romanization && <p className="mt-1 font-display text-orange-500">{q.romanization}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {q.choices.map((c, k) => {
          const isAnswer = picked !== null && k === q.answer;
          const isWrongPick = picked === k && k !== q.answer;
          const tone = isAnswer
            ? { cls: "bg-green-500 text-white", edge: "#15803d", border: "#22c55e" }
            : isWrongPick
              ? { cls: "bg-red-500 text-white", edge: "#b91c1c", border: "#ef4444" }
              : { cls: "bg-white text-gray-800", edge: "var(--game-edge)", border: "var(--game-edge)" };
          return (
            <button
              key={k}
              onClick={() => pick(k)}
              disabled={picked !== null}
              className={cn(
                "btn-3d min-h-14 rounded-2xl border-2 px-3 py-2 text-left font-bold leading-snug",
                FOCUS,
                tone.cls,
                picked !== null && !isAnswer && !isWrongPick && "opacity-50"
              )}
              style={{ borderColor: tone.border, ["--btn-edge" as string]: tone.edge }}
            >
              <span className="relative flex items-center gap-2">
                {isAnswer && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
                {isWrongPick && <X className="h-4 w-4 shrink-0" strokeWidth={3} />}
                {c}
              </span>
            </button>
          );
        })}
      </div>

      {correct && (
        <span
          key={burst}
          className="xp-pop pointer-events-none absolute right-6 top-16 font-display text-3xl text-amber-500 [-webkit-text-stroke:3px_#fff] [paint-order:stroke_fill]"
        >
          +{XP_PER_HIT} XP
        </span>
      )}

      {picked !== null && (
        <div
          className={cn("mt-5 flex items-center justify-between gap-3 rounded-2xl border-2 p-3", correct ? "bg-green-50" : "bg-red-50")}
          style={{ borderColor: correct ? "#bbf7d0" : "#fecaca" }}
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-gray-700">{q.explanation}</p>
          <Button onClick={next} className="shrink-0 font-display">Next</Button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ the route preview */

const ROUTE = [...PROVINCES].sort((a, b) => a.unlock_xp - b.unlock_xp);
const ROW_H = 136;

/** A winding road of round province stops that snakes back and forth, `cols` stops per row. */
function Road({ cols, className }: { cols: number; className: string }) {
  const rows = Math.ceil(ROUTE.length / cols);
  const pts = ROUTE.map((_, k) => {
    const r = Math.floor(k / cols);
    const c = r % 2 === 0 ? k % cols : cols - 1 - (k % cols);
    return { r, c, x: (c + 0.5) * 100, y: r * ROW_H + 44 + (c % 2 === 0 ? -6 : 8) };
  });

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1];
    const b = pts[k];
    if (a.r === b.r) {
      const mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    } else {
      const bulge = a.c === cols - 1 ? 42 : -42;
      d += ` C ${a.x + bulge} ${a.y}, ${b.x + bulge} ${b.y}, ${b.x} ${b.y}`;
    }
  }

  return (
    <div className={cn("relative", className)} style={{ height: rows * ROW_H }}>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${cols * 100} ${rows * ROW_H}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={d} fill="none" stroke="#f7cfc4" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d={d} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <ol className="contents">
        {ROUTE.map((p, k) => {
          const start = k === 0;
          const color = REGION_COLOR[p.region] ?? "#F59E0B";
          return (
            <li
              key={p.id}
              className="absolute flex w-[104px] -translate-x-1/2 flex-col items-center text-center"
              style={{ left: `${((pts[k].c + 0.5) / cols) * 100}%`, top: pts[k].y - 30 }}
            >
              {start && (
                <span className="absolute -top-8 z-10 rounded-full bg-gray-900 px-2.5 py-0.5 font-display text-xs text-white animate-bob">
                  Start
                </span>
              )}
              <span
                className={cn("relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-4 text-[28px]", start ? "bg-orange-500" : "bg-white")}
                style={{ borderColor: start ? "#fff" : color, boxShadow: `0 5px 0 ${start ? "#d9561c" : `${color}88`}` }}
                aria-hidden="true"
              >
                {start ? <Play className="h-7 w-7 fill-white text-white" /> : <span>{p.emoji}</span>}
              </span>
              <span className="mt-2 rounded-xl border-2 bg-white px-2 py-0.5 font-display text-[13px] leading-tight text-gray-900" style={{ borderColor: `${color}55` }}>
                {p.name_en}
              </span>
              <span className={cn("mt-0.5 flex items-center gap-1 text-[11px] font-extrabold tabular-nums", start ? "text-green-600" : "text-orange-500")}>
                {start ? "0 XP" : <><Lock className="h-3 w-3" strokeWidth={3} aria-hidden="true" />{p.unlock_xp} XP</>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function LandingPage() {
  const demo = useDemo();

  const steps = [
    { icon: <Zap className="h-6 w-6 fill-amber-400 text-amber-500" strokeWidth={2.5} />, bg: "bg-amber-100", t: "Clear lessons", d: "Short rounds of questions. Each lesson pays 15 or 20 XP. A wrong answer costs a heart." },
    { icon: <Lock className="h-6 w-6 text-sky-500" strokeWidth={2.5} />, bg: "bg-sky-100", t: "Open the map", d: "XP opens the next province: Chiang Mai at 100, Ayutthaya at 150, Koh Samui at 400." },
    { icon: <Swords className="h-6 w-6 text-rose-500" strokeWidth={2.5} />, bg: "bg-rose-100", t: "Fight the guardian", d: `${BOSS_RULES.secondsPerQuestion} seconds a question, ${BOSS_RULES.playerHearts} hearts. Win and its stamp goes in your passport.` },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-cute min-h-dvh overflow-x-clip text-gray-800">
        {/* HUD bar */}
        <header className="sticky top-0 z-40 border-b-2 bg-white/85 backdrop-blur" style={EDGE}>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
            <Link href="/" className={cn("flex items-center gap-2 rounded-xl font-display text-xl text-gray-900", FOCUS)}>
              <AppLogoIcon size={34} />
              <span className="hidden min-[400px]:inline">ThaiJN</span>
            </Link>
            <Hud xp={demo.xp} hearts={demo.hearts} combo={demo.combo} />
            <div className="flex items-center gap-3">
              <Link href="/login" className={cn("hidden sm:inline rounded-lg font-display text-gray-700 underline-offset-4 hover:text-orange-600 hover:underline", FOCUS)}>
                Sign in
              </Link>
              <Button asChild size="sm" className="h-10 rounded-xl px-4 font-display text-sm">
                <Link href="/signup">Play free</Link>
              </Button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero: the game itself */}
          <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 lg:pt-10 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6"
            >
              <div
                className="relative flex min-h-[460px] flex-col overflow-hidden rounded-[2rem] border-[3px] shadow-[0_6px_0_var(--game-edge),0_18px_30px_-18px_var(--game-glow)]"
                style={{ borderColor: "#fff" }}
              >
                <ThaiScene palette={SCENE_PALETTES.Central} className="absolute inset-0 h-full w-full" />
                <div className="relative flex flex-1 flex-col p-4 sm:p-6">
                  <div className="max-w-lg rounded-3xl border-2 bg-white/85 p-5 backdrop-blur sm:p-6" style={{ borderColor: "#fff" }}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border-2 bg-orange-50 px-3 py-1 text-xs font-extrabold text-orange-600" style={{ borderColor: "#fed7aa" }}>
                      <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} /> Free Thai-learning game
                    </span>
                    <h1 className="mt-4 leading-[0.95]">
                      <span className="block text-6xl text-orange-500 sm:text-7xl">THAIJN</span>
                      <span className="mt-2 block text-3xl text-gray-900 sm:text-4xl">Learn Thai.<br />Beat the guardians.</span>
                    </h1>
                    <p className="mt-4 max-w-md text-base font-semibold text-gray-600 sm:text-lg">
                      Answer questions, earn XP, and travel a map of {ROUTE.length} provinces from Bangkok to {ROUTE[ROUTE.length - 1].name_en}. {BOSSES.length} bosses guard the four regions, two in each.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col items-start gap-3 pt-8 sm:flex-row sm:items-center">
                    <Button asChild size="xl" className="font-display text-xl">
                      <Link href="/signup"><Play className="h-6 w-6 fill-white" /> Start playing</Link>
                    </Button>
                    <span className="rounded-full bg-white/85 px-3 py-1 text-sm font-extrabold text-gray-700 backdrop-blur">No card. Runs in your browser.</span>
                  </div>
                </div>
              </div>

              <div className="relative pt-3 lg:pt-6">
                <span className="absolute left-6 top-0 z-10 -rotate-3 rounded-full bg-rose-500 px-3 py-1 font-display text-sm text-white shadow-[0_3px_0_#be123c] lg:top-3">
                  Play a round right here
                </span>
                <DemoCard demo={demo} />
              </div>
            </motion.div>
          </section>

          {/* How a run works */}
          <section className="mx-auto max-w-6xl px-4 pb-14">
            <h2 className="text-3xl text-gray-900 sm:text-4xl">How a run works</h2>
            <ol className="game-panel mt-6 grid md:grid-cols-3">
              {steps.map((s, k) => (
                <li
                  key={s.t}
                  className={cn("flex gap-4 p-5 sm:p-6 border-dashed", k > 0 && "border-t-2 md:border-t-0 md:border-l-2")}
                  style={EDGE}
                >
                  <div className="relative shrink-0">
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", s.bg)}>{s.icon}</div>
                    <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-gray-900 font-display text-sm text-white" style={{ borderColor: "#fff" }}>
                      {k + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl text-gray-900">{s.t}</h3>
                    <p className="mt-1 text-sm font-semibold text-gray-600">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* World map */}
          <section className="mx-auto max-w-6xl px-4 pb-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-3xl text-gray-900 sm:text-4xl"><span aria-hidden="true">🗺️</span> World map: {ROUTE.length} provinces</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 bg-green-50 px-3 py-1 text-sm font-extrabold text-green-700" style={{ borderColor: "#bbf7d0" }}>
                <Stamp className="h-4 w-4" strokeWidth={2.5} /> Bangkok is open from day one
              </span>
            </div>
            <div
              className="game-panel mt-6 px-2 pb-4 pt-12 sm:px-6"
              style={{ background: "linear-gradient(180deg, #eaf7ff 0%, #fff8ef 55%, #f1fbe9 100%)" }}
            >
              <Road cols={8} className="hidden lg:block" />
              <Road cols={3} className="lg:hidden" />
            </div>
          </section>

          {/* Boss roster */}
          <section className="mx-auto max-w-6xl px-4 pb-14">
            <h2 className="text-3xl text-gray-900 sm:text-4xl"><span aria-hidden="true">⚔️</span> Choose your first boss</h2>
            <p className="mt-2 max-w-xl font-semibold text-gray-600">Each region of Thailand has a guardian taken from Thai legend. Three right answers in a row and every hit does double damage.</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BOSSES.map((b) => (
                <li
                  key={b.id}
                  className="group relative overflow-hidden rounded-3xl p-4 text-white"
                  style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}cc)`, boxShadow: `0 6px 0 ${b.color}99, 0 16px 26px -16px ${b.color}` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-extrabold">{b.region}</span>
                    <span className="text-xs font-extrabold opacity-90">HP {b.hp}</span>
                  </div>
                  <div
                    className="my-3 flex h-24 items-center justify-center rounded-2xl bg-white/20 text-6xl transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
                    aria-hidden="true"
                  >
                    <span className="drop-shadow-lg">{b.emoji}</span>
                  </div>
                  <h3 className="text-lg leading-tight drop-shadow-sm">{b.name_en}</h3>
                  <p className="thai-text text-sm leading-snug opacity-90" lang="th">{b.name_th}</p>
                  <div className="mt-2 flex gap-1" role="meter" aria-label={`${b.hp} hit points`} aria-valuemin={0} aria-valuemax={b.hp} aria-valuenow={b.hp}>
                    {Array.from({ length: b.hp }).map((_, k) => (
                      <span key={k} className="h-2.5 flex-1 rounded-full bg-white/85" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Item shop: pricing */}
          <section className="mx-auto max-w-6xl px-4 pb-14">
            <h2 className="text-3xl text-gray-900 sm:text-4xl"><span aria-hidden="true">🛍️</span> The shop</h2>
            <p className="mt-2 text-lg font-semibold text-gray-600">The whole game is free. Pro adds an AI tutor.</p>
            <div className="mt-6 grid items-start gap-6 md:grid-cols-2">
              <div className="game-panel p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl text-gray-900">Free</h3>
                  <span className="font-display text-4xl text-green-600">$0</span>
                </div>
                <ul className="game-rows mt-4 [&>li]:py-2.5">
                  {["Every lesson, Beginner to Advanced", `The map, all ${BOSSES.length} guardians and the passport`, "Thai alphabet practice", "Streaks, daily quests and the leaderboard", "5 hearts, one back every 30 minutes"].map((t) => (
                    <li key={t} className="flex gap-2 font-semibold text-gray-700"><Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" strokeWidth={3} />{t}</li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-5 font-display">
                  <Link href="/signup">Start free</Link>
                </Button>
              </div>

              <div className="game-card relative p-6">
                <span className="absolute -top-3.5 right-6 rotate-3 rounded-full bg-rose-500 px-3 py-1 font-display text-sm text-white shadow-[0_3px_0_#be123c]">Power-up</span>
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl text-gray-900">Pro</h3>
                  <span className="font-display text-4xl text-rose-500">$5<span className="text-lg text-gray-500">/month</span></span>
                </div>
                <ul className="game-rows mt-4 [&>li]:py-2.5">
                  {["Everything in Free", "Kru, the AI chat tutor, with no message limit", "AI grammar checker for Thai sentences", "AI dictionary with example sentences", "Paid by PromptPay, renewed by hand each month"].map((t) => (
                    <li key={t} className="flex gap-2 font-semibold text-gray-700"><Bot className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" strokeWidth={2.5} />{t}</li>
                  ))}
                </ul>
                <Button asChild size="lg" variant="gold" className="mt-5 font-display">
                  <Link href="/subscribe">Get Pro</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Press start */}
          <section className="mx-auto max-w-6xl px-4 pb-14">
            <div
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 to-rose-500 px-6 py-14 text-center text-white"
              style={{ boxShadow: "0 6px 0 #d9561c, 0 18px 30px -18px rgba(240,106,46,.6)" }}
            >
              <p className="font-display text-sm opacity-90">Player 1</p>
              <h2 className="mt-2 text-5xl sm:text-6xl">Press start</h2>
              <p className="mx-auto mt-3 max-w-md text-lg font-semibold opacity-95">Your first lesson is in Bangkok. A free account keeps your XP, streak and stamps.</p>
              <Button asChild size="xl" variant="secondary" className="mt-7 font-display text-xl text-orange-600" style={{ borderColor: "#fff", ["--btn-edge" as string]: "#c2410c" }}>
                <Link href="/signup"><Play className="h-6 w-6 fill-orange-500 text-orange-500" /> Start playing</Link>
              </Button>
            </div>
          </section>
        </main>

        <footer className="border-t-2 border-dashed bg-white/60" style={EDGE}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-7 text-sm font-bold text-gray-500">
            <span className="flex items-center gap-2 font-display text-gray-700"><AppLogoIcon size={24} /> © 2026 ThaiJN</span>
            <nav className="flex gap-5">
              <Link href="/login" className={cn("rounded hover:text-orange-600", FOCUS)}>Sign in</Link>
              <Link href="/signup" className={cn("rounded hover:text-orange-600", FOCUS)}>Create account</Link>
              <Link href="/subscribe" className={cn("rounded hover:text-orange-600", FOCUS)}>Pro</Link>
            </nav>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
