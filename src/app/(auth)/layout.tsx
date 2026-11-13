"use client";
import Link from "next/link";
import { AppLogoIcon } from "@/components/ui/AppLogoIcon";
import { ThaiScene, SCENE_PALETTES } from "@/components/game/ThaiScene";
import { useTranslation } from "@/lib/i18n/useTranslation";

export const dynamic = "force-dynamic";

const PLACES = [
  { emoji: "🏙️", label: "Bangkok" },
  { emoji: "🌸", label: "Chiang Mai" },
  { emoji: "🏖️", label: "Phuket" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="app-cute min-h-dvh overflow-x-hidden">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center px-4 py-6 sm:px-6 lg:py-10">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
          {/* Desktop: illustrated journey panel */}
          <section
            aria-label="ThaiJN"
            className="relative hidden min-h-[600px] overflow-hidden rounded-[2rem] border-[3px] border-[var(--game-edge)] shadow-[0_6px_0_var(--game-edge),0_18px_32px_-18px_var(--game-glow)] lg:flex"
          >
            <ThaiScene palette={SCENE_PALETTES.Central} className="absolute inset-0 h-full w-full" />
            <div className="relative flex w-full flex-col p-8">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-2xl border-2 border-white bg-white/85 px-4 py-2.5 backdrop-blur focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
                >
                  <AppLogoIcon size={44} />
                  <span className="font-display text-2xl text-gray-900">ThaiJN</span>
                </Link>
                <div className="animate-bob select-none text-7xl" aria-hidden="true">🧳</div>
              </div>

              <div className="mt-auto max-w-md rounded-3xl border-2 border-white bg-white/85 p-5 backdrop-blur">
                <p className="font-display text-2xl leading-snug text-gray-900">
                  {t("auth.tagline1")}
                  <br />
                  <span className="text-orange-500">{t("auth.tagline2")}</span>
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {PLACES.map((p) => (
                    <li
                      key={p.label}
                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--game-edge)] bg-white px-3 py-1 text-sm font-bold text-gray-700"
                    >
                      <span aria-hidden="true">{p.emoji}</span>
                      {p.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Form column: one puffy card, centred on phones */}
          <main className="mx-auto flex w-full max-w-md flex-col justify-center lg:max-w-none">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2.5 self-center rounded-2xl px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 lg:hidden"
            >
              <AppLogoIcon size={40} />
              <span className="font-display text-2xl text-gray-900">ThaiJN</span>
            </Link>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
