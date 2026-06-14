"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, MapPin, Star, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProvinceData } from "@/data/provinces";
import { cn } from "@/lib/utils";
import { speakThai } from "@/lib/speech";

interface ProvinceModalProps {
  province: ProvinceData | null;
  isUnlocked: boolean;
  userXP: number;
  onClose: () => void;
  onStartLesson: (provinceId: string) => void;
}

export function ProvinceModal({ province, isUnlocked, userXP, onClose, onStartLesson }: ProvinceModalProps) {
  if (!province) return null;
  const xpNeeded = province.unlock_xp - userXP;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div
            className="h-40 flex flex-col items-center justify-center relative"
            style={{ background: `linear-gradient(135deg, ${province.color}aa, ${province.color})` }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <span className="text-6xl mb-2">{province.emoji}</span>
            {!isUnlocked && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-t-3xl">
                <Lock size={40} className="text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 uppercase font-bold">{province.region} Thailand</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900">{province.name_en}</h2>
              <p className="thai-text text-lg text-gray-600">{province.name_th}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{province.description}</p>

            {/* Key phrase */}
            {province.key_phrase && (
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <p className="text-xs font-bold text-orange-400 uppercase mb-1">Local Phrase</p>
                <div className="flex items-center gap-3">
                  <p className="thai-text text-xl font-bold text-gray-900 flex-1">{province.key_phrase}</p>
                  <button
                    onClick={() => speakThai(province.key_phrase)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 text-orange-500 transition-colors flex-shrink-0"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">{province.key_phrase_translation}</p>
              </div>
            )}

            {/* Action */}
            {isUnlocked ? (
              <Button
                onClick={() => onStartLesson(province.id)}
                size="lg"
                className="w-full"
              >
                <Star size={18} />
                Start Lessons
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>XP needed</span>
                  <span className="font-bold text-orange-500">{Math.max(0, xpNeeded)} more XP</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full gradient-thai transition-all"
                    style={{ width: `${Math.min(100, (userXP / province.unlock_xp) * 100)}%` }}
                  />
                </div>
                <Button disabled variant="outline" size="lg" className="w-full">
                  <Lock size={18} />
                  Unlock at {province.unlock_xp} XP
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
