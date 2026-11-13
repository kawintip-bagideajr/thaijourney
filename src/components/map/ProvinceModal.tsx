"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, MapPin, Volume2, Check, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProvinceData } from "@/data/provinces";
import type { AdventureStage } from "@/data/content/types";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface ProvinceModalProps {
  province: ProvinceData | null;
  isUnlocked: boolean;
  userXP: number;
  /** This province's adventure stages, in play order. */
  stages: AdventureStage[];
  /** Lesson slugs the player has completed. */
  completed: ReadonlySet<string>;
  onClose: () => void;
  onStartStage: (stageId: string) => void;
}

export function ProvinceModal({ province, isUnlocked, userXP, stages, completed, onClose, onStartStage }: ProvinceModalProps) {
  const { t } = useTranslation();
  if (!province) return null;
  const xpNeeded = province.unlock_xp - userXP;
  const doneCount = stages.filter((s) => completed.has(s.id)).length;
  // The first unfinished stage is the one to play; later ones wait until it is done.
  const nextIdx = stages.findIndex((s) => !completed.has(s.id));
  const allDone = stages.length > 0 && nextIdx === -1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="game-card w-full max-w-md overflow-hidden max-h-[92dvh] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={province.name_en}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="h-36 shrink-0 flex flex-col items-center justify-center relative border-b-2 border-[var(--game-edge)]"
            style={{ background: `radial-gradient(circle at 12px 12px, rgba(255,255,255,.35) 2px, transparent 2.5px) 0 0 / 24px 24px, linear-gradient(135deg, ${province.color}aa, ${province.color})` }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 text-gray-600 hover:text-gray-900 flex items-center justify-center border-2 border-white"
            >
              <X size={18} />
            </button>
            <span className="text-6xl drop-shadow-lg" aria-hidden="true">{province.emoji}</span>
            {stages.length > 0 && isUnlocked && (
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 border-2 border-white px-3 py-0.5 text-[11px] font-black text-gray-700 tabular-nums">
                {allDone ? "🏆 " : "🗺️ "}{doneCount}/{stages.length} ด่าน
              </span>
            )}
            {!isUnlocked && (
              <div className="absolute inset-0 bg-gray-900/45 flex items-center justify-center">
                <Lock size={40} className="text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 overflow-y-auto overscroll-contain">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={13} className="text-gray-400" />
                <span className="text-[11px] text-gray-500 font-extrabold">{t("province.regionThailand", { region: province.region })}</span>
              </div>
              <h2 className="font-display text-2xl text-gray-900 leading-tight">{province.name_en}</h2>
              <p className="thai-text text-lg text-gray-600">{province.name_th}</p>
              <p className="text-gray-600 text-sm font-semibold leading-relaxed mt-1">{province.description}</p>
            </div>

            {province.key_phrase && (
              <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-extrabold text-orange-500">💬 Local phrase</p>
                  <p className="thai-text text-lg font-bold text-gray-900">{province.key_phrase}</p>
                  <p className="text-xs font-bold text-gray-500">{province.key_phrase_translation}</p>
                </div>
                <button
                  onClick={() => speakThai(province.key_phrase)}
                  aria-label="Listen"
                  className="btn-3d w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 [--btn-edge:#c2410c]"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            )}

            {isUnlocked ? (
              stages.length > 0 ? (
                <ol className="space-y-2.5" aria-label="Adventure stages">
                  {stages.map((s, i) => {
                    const done = completed.has(s.id);
                    const isNext = i === nextIdx;
                    const locked = !done && !isNext;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          disabled={locked}
                          onClick={() => onStartStage(s.id)}
                          className={cn(
                            "w-full flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100",
                            done && "bg-green-50 border-green-200 hover:border-green-300",
                            isNext && "bg-orange-50 border-orange-300 shadow-[0_4px_0_#fdba74] hover:-translate-y-0.5",
                            locked && "border-dashed border-gray-200 opacity-60 cursor-not-allowed",
                          )}
                        >
                          <span className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-2 shrink-0",
                            done ? "bg-white border-green-300" : isNext ? "bg-white border-orange-300" : "bg-white border-gray-200 grayscale")}>
                            {s.emoji}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[10px] font-black text-gray-400">ด่าน {i + 1}</span>
                            <span className="block font-display text-sm text-gray-900 leading-tight truncate">{s.title}</span>
                            <span className="block thai-text text-xs text-gray-500 truncate">{s.title_th}</span>
                          </span>
                          <span className="flex flex-col items-end gap-1 shrink-0">
                            {done ? (
                              <span className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center"><Check size={15} strokeWidth={3} /></span>
                            ) : isNext ? (
                              <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center"><Play size={13} className="fill-white" /></span>
                            ) : (
                              <Lock size={16} className="text-gray-400" />
                            )}
                            <span className="text-[10px] font-black text-amber-600 flex items-center gap-0.5 tabular-nums"><Zap size={10} className="fill-amber-400 text-amber-400" />{s.xp}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="text-center text-sm font-bold text-gray-500 py-2">🚧 ด่านของจังหวัดนี้ยังไม่เปิด รออีกนิดนะ</p>
              )
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>ต้องการ XP อีก</span>
                  <span className="font-display text-orange-500 tabular-nums">{Math.max(0, xpNeeded)} XP</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full xp-bar" style={{ width: `${Math.min(100, (userXP / Math.max(1, province.unlock_xp)) * 100)}%` }} />
                </div>
                <Button disabled variant="outline" size="lg" className="w-full">
                  <Lock size={18} />
                  ปลดล็อกที่ {province.unlock_xp} XP
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
