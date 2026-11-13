"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Copy, Check, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";

const AMOUNTS: { label?: string; labelKey?: string; value: number; descKey: string; emoji: string }[] = [
  { label: "฿20",   value: 20,  descKey: "donate.coffee", emoji: "☕" },
  { label: "฿50",   value: 50,  descKey: "donate.smallTreat", emoji: "🧋" },
  { label: "฿100",  value: 100, descKey: "donate.superSupporter", emoji: "🌟" },
  { labelKey: "donate.custom", value: 0,  descKey: "donate.yourChoice", emoji: "✏️" },
];
const MIN_AMOUNT = 20;
const PROMPTPAY_NUMBER = "0922673327";

export default function DonatePage() {
  const [selected, setSelected] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [thanked, setThanked] = useState(false);
  const { t } = useTranslation();

  const amount = AMOUNTS[selected].value || parseInt(customAmount) || 0;
  const canConfirm = amount >= MIN_AMOUNT;

  const qrUrl = amount >= MIN_AMOUNT
    ? `https://promptpay.io/${PROMPTPAY_NUMBER}/${amount}.png`
    : `https://promptpay.io/${PROMPTPAY_NUMBER}.png`;

  const copyId = () => {
    navigator.clipboard.writeText(PROMPTPAY_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => setThanked(true);

  if (thanked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 pb-28">
        <div className="game-card p-6 flex flex-col items-center text-center space-y-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="w-24 h-24 rounded-3xl bg-rose-50 border-2 border-rose-200 shadow-[0_5px_0_#fecdd3] flex items-center justify-center"
          >
            <span className="text-6xl select-none" aria-hidden="true">💖</span>
          </motion.div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-gray-900">{t("donate.thankYou")}</h1>
            <p className="text-sm font-bold text-gray-500 mt-2 leading-relaxed">
              {t("donate.supportMsg")}
            </p>
          </div>
          <p className="text-sm font-extrabold text-rose-700">
            {t("donate.whereItGoes")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-5">
      {/* Short heading on the page background */}
      <header className="px-1">
        <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight">💝 {t("donate.supportThaiJN")}</h1>
        <p className="text-sm font-bold text-gray-500 mt-1">{t("donate.keepFree")}</p>
      </header>

      {/* Amount picker: the hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card !rounded-[2rem] p-5 sm:p-6"
      >
        <h2 className="font-display text-lg text-gray-900 mb-3">
          💰 {t("donate.chooseAmount")} <span className="text-xs font-extrabold text-gray-400">{t("donate.minimum", { n: MIN_AMOUNT })}</span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {AMOUNTS.map((a, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100",
                selected === i
                  ? "border-rose-300 bg-rose-50 shadow-[0_5px_0_#fda4af]"
                  : "border-[var(--game-edge)] bg-white shadow-[0_4px_0_var(--game-edge)] hover:bg-rose-50/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xl text-gray-900 tabular-nums">{a.label ?? t(a.labelKey ?? "")}</p>
                <span className="text-xl leading-none" aria-hidden="true">{a.emoji}</span>
              </div>
              <p className="text-[11px] font-extrabold text-gray-500 mt-0.5">{t(a.descKey)}</p>
            </motion.button>
          ))}
        </div>
        {selected === 3 && (
          <div className="mt-3 flex items-center gap-2 h-12 rounded-2xl border-2 border-[var(--game-edge)] bg-white px-4 focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100">
            <span className="text-gray-500 font-black">฿</span>
            <input
              type="number"
              min={MIN_AMOUNT}
              placeholder={t("donate.minPh", { n: MIN_AMOUNT })}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 font-bold text-lg"
            />
          </div>
        )}
        {selected === 3 && amount > 0 && amount < MIN_AMOUNT && (
          <p className="text-xs font-bold text-red-500 mt-2 px-1">{t("donate.minError", { n: MIN_AMOUNT })}</p>
        )}
      </motion.section>

      {/* Payment info */}
      <section className="game-panel overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center border-2 bg-sky-50 border-sky-200 shrink-0">
            <QrCode size={16} className="text-sky-500" />
          </span>
          <h2 className="font-display text-lg text-gray-900">
            {t("donate.payPromptPay")}
          </h2>
        </div>
        <div className="px-5 pb-5 flex flex-col items-center gap-4">
          {/* Dynamic QR from promptpay.io */}
          <div className="w-56 h-56 bg-white rounded-3xl flex items-center justify-center overflow-hidden border-2 border-[var(--game-edge)] shadow-[0_5px_0_var(--game-edge)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="PromptPay QR"
              className="w-48 h-48 object-contain"
            />
          </div>

          {amount >= MIN_AMOUNT && (
            <p className="font-display text-2xl text-rose-500 tabular-nums">฿{amount} บาท</p>
          )}

          <div className="w-full">
            <p className="text-[11px] font-extrabold text-gray-500 mb-1 text-center">{t("donate.promptPayNumber")}</p>
            <div className="flex items-center gap-2 rounded-2xl bg-orange-50 border-2 border-orange-100 pl-4 pr-2 py-2">
              <span className="flex-1 font-mono font-black text-gray-900 tracking-widest text-center">
                {PROMPTPAY_NUMBER}
              </span>
              <button
                onClick={copyId}
                className="btn-3d w-10 h-10 rounded-xl bg-white border-2 border-[var(--game-edge)] text-gray-500 flex items-center justify-center [--btn-edge:var(--game-edge)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
              >
                {copied ? <Check size={16} strokeWidth={3} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <p className="text-xs font-bold text-sky-700 text-center leading-relaxed">
            📱 สแกน QR ด้วยแอปธนาคารใดก็ได้ · รับทุกธนาคาร
          </p>
        </div>
      </section>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => canConfirm && handleConfirm()}
        className={cn(
          "w-full h-14 rounded-2xl font-display text-base flex items-center justify-center gap-2 px-4",
          canConfirm
            ? "btn-3d bg-rose-500 text-white [--btn-edge:#be123c]"
            : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
        )}
      >
        <Heart size={18} className={canConfirm ? "fill-white/60" : ""} />
        {canConfirm ? `โอนแล้ว ฿${amount} ขอบคุณ! 🙏` : `เลือกจำนวนขั้นต่ำ ฿${MIN_AMOUNT}`}
      </motion.button>

      {/* What donations go to */}
      <section className="game-panel px-5 pt-4 pb-1">
        <p className="text-xs font-extrabold text-gray-500 mb-1">🎯 {t("donate.helpsFund")}</p>
        <div className="game-rows">
          {[t("donate.item1"), t("donate.item2"), t("donate.item3"), t("donate.item4")].map((item) => (
            <p key={item} className="text-sm font-bold text-gray-700 py-2.5">{item}</p>
          ))}
        </div>
      </section>

      <p className="text-center text-xs font-bold text-gray-400 px-4">
        {t("donate.note")}{" "}
        <a href="/subscribe" className="underline text-orange-500">{t("donate.subscribeNote")}</a> {t("donate.toUnlock")}
      </p>

    </div>
  );
}
