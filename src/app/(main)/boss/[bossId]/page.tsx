"use client";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Lock, Volume2, Zap, Flame, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useSound } from "@/hooks/useSound";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { speakThai } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { LOOT_BY_BOSS, RARITY } from "@/data/cosmetics";
import { LootReveal, CosmeticPreview } from "@/components/cosmetics/Cosmetics";
import {
  BOSS_BY_ID, BOSS_RULES, bossGate, resolveHit,
  type BattleAnswer, type BossQuestion,
} from "@/data/bosses";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const hasThai = (s: string) => /[฀-๿]/.test(s);

interface ServerResult {
  win: boolean;
  heartsLeft: number;
  correct: number;
  answered: number;
  maxCombo: number;
  firstWin: boolean;
  flawless: boolean;
  xpEarned: number;
  newXP: number;
  newLevel: number;
  /** Cosmetic ids dropped by this win. */
  loot?: string[];
}

type Phase = "intro" | "fight" | "result";

export default function BossPage({ params }: { params: Promise<{ bossId: string }> }) {
  const { bossId } = use(params);
  const boss = BOSS_BY_ID[bossId];
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { completed, loaded: progressLoaded } = useCompletedLessons(profile?.id);
  const { playClick, playCorrect, playWrong, playComplete } = useSound();
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>("intro");
  const [queue, setQueue] = useState<BossQuestion[]>([]);
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [answers, setAnswers] = useState<BattleAnswer[]>([]);
  const [hp, setHp] = useState(boss?.hp ?? 0);
  const [hearts, setHearts] = useState<number>(BOSS_RULES.playerHearts);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<number | null | undefined>(undefined); // undefined = not answered yet, null = timeout
  const [lastDamage, setLastDamage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(BOSS_RULES.secondsPerQuestion);
  const [result, setResult] = useState<ServerResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);

  const current = queue[0];
  const answered = picked !== undefined;
  const over = hp <= 0 || hearts <= 0;

  const nextQuestion = useCallback((remaining: BossQuestion[]) => {
    const q = remaining.length ? remaining : shuffle(boss!.questions);
    setQueue(q);
    setOrder(shuffle([0, 1, 2, 3]));
    setPicked(undefined);
    setSecondsLeft(BOSS_RULES.secondsPerQuestion);
    if (q[0] && hasThai(q[0].prompt)) speakThai(q[0].prompt);
  }, [boss]);

  const start = () => {
    playClick();
    startedAt.current = Date.now();
    setAnswers([]);
    setHp(boss!.hp);
    setHearts(BOSS_RULES.playerHearts);
    setCombo(0);
    setResult(null);
    setError(null);
    setPhase("fight");
    nextQuestion(shuffle(boss!.questions));
  };

  const answer = useCallback((choice: number | null) => {
    if (!current || picked !== undefined) return;
    const { ok, damage, nextCombo } = resolveHit(current, choice, combo);
    setPicked(choice);
    setCombo(nextCombo);
    setLastDamage(damage);
    setAnswers((a) => [...a, { qid: current.id, choice }]);
    if (ok) {
      playCorrect();
      setHp((h) => Math.max(0, h - damage));
    } else {
      playWrong();
      setHearts((h) => h - 1);
    }
  }, [current, picked, combo, playCorrect, playWrong]);

  // Countdown — runs only while a question is open.
  useEffect(() => {
    if (phase !== "fight" || answered || !current) return;
    const id = setTimeout(() => {
      if (secondsLeft <= 1) answer(null);
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearTimeout(id);
  }, [phase, answered, secondsLeft, current, answer]);

  const submit = useCallback(async () => {
    setPhase("result");
    setSaving(true);
    try {
      const res = await fetch("/api/boss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bossId, answers, timeMs: Date.now() - startedAt.current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setResult(data);
      if (data.win) playComplete();
      const p = useAuthStore.getState().profile;
      if (p) {
        setProfile({
          ...p,
          total_xp: data.newXP,
          level: data.newLevel,
          passport_stamps: data.stamp
            ? { ...(p.passport_stamps ?? {}), [bossId]: data.stamp }
            : p.passport_stamps,
          cosmetics: data.loot?.length
            ? {
                ...(p.cosmetics ?? {}),
                ...Object.fromEntries((data.loot as string[]).map((id) => [id, { got_at: new Date().toISOString(), boss: bossId }])),
              }
            : p.cosmetics,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }, [bossId, answers, playComplete, setProfile]);

  const proceed = () => {
    playClick();
    if (over) submit();
    else nextQuestion(queue.slice(1));
  };

  const choiceStyles = useMemo(() => (orig: number) => {
    if (!answered || !current) return "bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50";
    if (orig === current.answer) return "bg-green-50 border-green-400 text-green-800";
    if (orig === picked) return "bg-red-50 border-red-400 text-red-700";
    return "bg-white border-gray-100 opacity-50";
  }, [answered, current, picked]);

  if (!profile) return null;
  if (!boss) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 text-center space-y-4">
        <p className="text-gray-500">{t("boss.notFound", undefined, "Guardian not found.")}</p>
        <Button onClick={() => router.push("/map")}>{t("boss.backToMap", undefined, "Back to map")}</Button>
      </div>
    );
  }

  const gate = bossGate(boss, profile.total_xp, completed, profile.passport_stamps);
  const unlocked = gate.unlocked;
  const stamp = profile.passport_stamps?.[boss.id];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      <button onClick={() => router.push("/map")} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-800">
        <ArrowLeft size={16} /> {t("boss.backToMap", undefined, "Back to map")}
      </button>

      {/* Boss header — HP bar */}
      <div className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${boss.color}cc, ${boss.color})` }}>
        <div className="flex items-center gap-4">
          <motion.div
            key={hp}
            animate={phase === "fight" && answered && lastDamage > 0 ? { x: [0, -10, 10, -6, 0], scale: [1, 0.9, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="text-6xl drop-shadow-lg select-none"
          >
            {phase === "result" && result?.win ? "😵" : boss.emoji}
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold opacity-80">
              {t("boss.guardianOf", { region: boss.region }, `Guardian of the ${boss.region}`)}
            </p>
            <h1 className="text-xl font-black leading-tight">{boss.name_en}</h1>
            <p className="thai-text text-sm opacity-90">{boss.name_th}</p>
            {phase !== "intro" && (
              <div className="mt-2">
                <div className="h-3 bg-black/25 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full"
                    animate={{ width: `${(hp / boss.hp) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>
                <p className="text-[11px] font-bold mt-1 opacity-90">HP {hp}/{boss.hp}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INTRO */}
      {phase === "intro" && (
        <div className="space-y-4">
          <div className="game-card p-5 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">{boss.legend}</p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="thai-text font-bold text-gray-900">“{boss.taunt_th}”</p>
                <p className="text-xs text-gray-500">{boss.taunt_en}</p>
              </div>
              <button onClick={() => speakThai(boss.taunt_th)} aria-label="Play audio"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200">
                <Volume2 size={16} />
              </button>
            </div>
          </div>

          <ul className="game-panel game-rows px-4 py-1 text-sm font-bold text-gray-600 [&>li]:py-2">
            <li>❤️ {t("boss.ruleHearts", { n: BOSS_RULES.playerHearts }, `You have ${BOSS_RULES.playerHearts} hearts. Each wrong answer costs one.`)}</li>
            <li>⏱️ {t("boss.ruleTimer", { n: BOSS_RULES.secondsPerQuestion }, `${BOSS_RULES.secondsPerQuestion} seconds per question`)}</li>
            <li>🔥 {t("boss.ruleCombo", { n: BOSS_RULES.comboForDouble }, `${BOSS_RULES.comboForDouble} correct in a row = double damage`)}</li>
            <li>🛂 {t("boss.ruleStamp", undefined, "Win to earn this region's passport stamp")}</li>
            <li>🎁 ชนะแล้วมีลุ้นของแต่งโปรไฟล์ (ชนะครั้งแรกได้แน่นอน 1 ชิ้น)</li>
          </ul>

          {/* Loot table: what this guardian can drop, owned items in colour */}
          {(LOOT_BY_BOSS[boss.id] ?? []).length > 0 && (
            <div className="game-panel p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-display text-sm text-gray-900">🎁 ของที่ดรอปได้</p>
                <p className="text-[11px] font-extrabold text-gray-500 tabular-nums">
                  {(LOOT_BY_BOSS[boss.id] ?? []).filter((c) => profile?.cosmetics?.[c.id]).length}/{(LOOT_BY_BOSS[boss.id] ?? []).length}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(LOOT_BY_BOSS[boss.id] ?? []).map((c) => {
                  const owned = !!profile?.cosmetics?.[c.id];
                  return (
                    <div key={c.id} className="flex flex-col items-center gap-1" title={owned ? c.name_th : RARITY[c.rarity].label_th}>
                      <div className="rounded-2xl p-0.5" style={{ background: owned ? RARITY[c.rarity].color : "transparent" }}>
                        <CosmeticPreview item={c} size={52} locked={!owned} />
                      </div>
                      <span className="text-[9px] font-black" style={{ color: RARITY[c.rarity].color }}>{RARITY[c.rarity].label_th}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stamp && (
            <p className="text-center text-xs font-bold text-green-600">
              ✓ {t("boss.alreadyStamped", { n: stamp.wins }, `Stamp earned · won ${stamp.wins}×`)}
              {stamp.flawless && " · ⭐ " + t("boss.flawless", undefined, "Flawless")}
            </p>
          )}

          {!progressLoaded ? (
            <Button size="lg" variant="outline" className="w-full" disabled>…</Button>
          ) : unlocked ? (
            <Button size="lg" className="w-full" onClick={start}>
              ⚔️ {t("boss.challenge", undefined, "Challenge the Guardian")}
            </Button>
          ) : (
            <div className="game-panel p-4 space-y-3">
              <p className="font-display text-gray-900 flex items-center gap-1.5"><Lock size={16} /> ยังท้าบอสตัวนี้ไม่ได้</p>
              <ul className="game-rows text-sm font-bold text-gray-600">
                {!gate.xpOk && (
                  <li className="py-2 flex justify-between gap-3">
                    <span>สะสม XP ให้ถึง {boss.unlockXP}</span>
                    <span className="tabular-nums text-orange-500">{profile.total_xp}/{boss.unlockXP}</span>
                  </li>
                )}
                {gate.stagesTotal > 0 && (
                  <li className="py-2 space-y-1.5">
                    <div className="flex justify-between gap-3">
                      <span>ผ่านทุกด่านของจังหวัดในภาคนี้ที่อยู่ก่อนบอส</span>
                      <span className={cn("tabular-nums", gate.stagesDone === gate.stagesTotal ? "text-green-600" : "text-orange-500")}>
                        {gate.stagesDone}/{gate.stagesTotal}
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div className="h-full xp-bar" style={{ width: `${(gate.stagesDone / gate.stagesTotal) * 100}%` }} />
                    </div>
                  </li>
                )}
                {gate.needsBoss && (
                  <li className="py-2 flex justify-between gap-3">
                    <span>ชนะ {gate.needsBoss.name_th} ก่อน</span>
                    <span aria-hidden="true">{gate.needsBoss.emoji}</span>
                  </li>
                )}
              </ul>
              {gate.nextProvince ? (
                <Button size="lg" className="w-full" onClick={() => router.push("/map")}>
                  🗺️ ไปเล่นด่านที่{gate.nextProvince.name_th}
                </Button>
              ) : gate.needsBoss ? (
                <Button size="lg" className="w-full" onClick={() => router.push(`/boss/${gate.needsBoss!.id}`)}>
                  ⚔️ ไปสู้กับ{gate.needsBoss.name_th}
                </Button>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* FIGHT */}
      {phase === "fight" && current && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1" aria-label={`${hearts} hearts`}>
              {Array.from({ length: BOSS_RULES.playerHearts }).map((_, i) => (
                <Heart key={i} size={22} className={i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"} />
              ))}
            </div>
            {combo >= 2 && (
              <span className="flex items-center gap-1 text-sm font-black text-orange-500">
                <Flame size={16} className="fill-orange-400" /> {combo}× combo
              </span>
            )}
            <span className={cn("flex items-center gap-1 text-sm font-black tabular-nums",
              secondsLeft <= 5 && !answered ? "text-red-500" : "text-gray-500")}>
              <Timer size={16} /> {answered ? "—" : secondsLeft}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={answers.length + current.id}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
              <p className="text-xs font-bold text-gray-400">{current.instruction}</p>
              <div className="flex items-center justify-center gap-3">
                <p className={cn("font-black text-gray-900 text-center", hasThai(current.prompt) ? "thai-text text-3xl" : "text-2xl")}>
                  {current.prompt}
                </p>
                {hasThai(current.prompt) && (
                  <button onClick={() => speakThai(current.prompt)} aria-label="Play audio"
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200">
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
              {current.romanization && answered && (
                <p className="text-center text-sm text-gray-400 italic">{current.romanization}</p>
              )}

              <div className="grid grid-cols-1 gap-2">
                {order.map((orig, i) => (
                  <button key={orig} disabled={answered} onClick={() => answer(orig)}
                    className={cn("w-full text-left px-4 py-3 rounded-2xl border-2 font-bold transition-colors flex items-center gap-3",
                      choiceStyles(orig))}>
                    <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className={hasThai(current.choices[orig]) ? "thai-text text-lg" : ""}>{current.choices[orig]}</span>
                  </button>
                ))}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <p className={cn("text-sm font-black",
                    picked === current.answer ? "text-green-600" : "text-red-500")}>
                    {picked === current.answer
                      ? `⚔️ ${t("boss.hit", { n: lastDamage }, `Hit! −${lastDamage} HP`)}`
                      : picked === null
                        ? `⏱️ ${t("boss.timeout", undefined, "Time's up! −1 ❤️")}`
                        : `💥 ${t("boss.miss", undefined, "The guardian strikes back! −1 ❤️")}`}
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">{current.explanation}</p>
                  <Button className="w-full" size="lg" onClick={proceed}>
                    {over ? t("boss.seeResult", undefined, "See result") : t("boss.next", undefined, "Next")}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="game-card p-6 text-center space-y-4">
          {saving ? (
            <p className="text-gray-500 font-bold py-6">{t("common.saving", undefined, "Saving...")}</p>
          ) : error ? (
            <>
              <p className="text-red-500 font-bold">{error}</p>
              <Button onClick={submit} className="w-full">{t("boss.retrySave", undefined, "Try saving again")}</Button>
            </>
          ) : result && (
            <>
              {result.win ? (
                <>
                  <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: -8, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="mx-auto w-36 h-36 rounded-full border-4 border-dashed flex flex-col items-center justify-center"
                    style={{ borderColor: boss.color, color: boss.color }}>
                    <span className="text-4xl">{boss.emoji}</span>
                    <span className="thai-text font-black text-lg leading-tight">{boss.stamp_th}</span>
                    <span className="text-[10px] font-bold">ThaiJourney</span>
                  </motion.div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {result.firstWin ? t("boss.stampEarned", undefined, "Passport stamp earned!") : t("boss.victory", undefined, "Victory!")}
                  </h2>
                  {result.flawless && <p className="text-amber-500 font-black">⭐ {t("boss.flawlessWin", undefined, "Flawless: no hearts lost!")}</p>}
                </>
              ) : (
                <>
                  <div className="text-6xl">{boss.emoji}</div>
                  <h2 className="text-2xl font-black text-gray-900">{t("boss.defeat", undefined, "The guardian wins this time")}</h2>
                  <p className="text-sm text-gray-500">{t("boss.defeatHint", undefined, "Review the words and try again. You'll get it.")}</p>
                </>
              )}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-gray-50 rounded-xl p-2"><p className="font-black text-gray-900">{result.correct}/{result.answered}</p><p className="text-[11px] text-gray-400">{t("boss.correct", undefined, "Correct")}</p></div>
                <div className="bg-gray-50 rounded-xl p-2"><p className="font-black text-gray-900">{result.maxCombo}×</p><p className="text-[11px] text-gray-400">{t("boss.bestCombo", undefined, "Best combo")}</p></div>
                <div className="bg-amber-50 rounded-xl p-2"><p className="font-black text-amber-600 flex items-center justify-center gap-0.5"><Zap size={13} className="fill-amber-400 text-amber-400" />+{result.xpEarned}</p><p className="text-[11px] text-gray-400">XP</p></div>
              </div>
              {result.win && result.loot && result.loot.length > 0 && <LootReveal ids={result.loot} />}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => router.push("/map")}>{t("boss.backToMap", undefined, "Back to map")}</Button>
                <Button className="flex-1" onClick={start}>{t("boss.again", undefined, "Fight again")}</Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

