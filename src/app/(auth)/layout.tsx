import { AppLogoIcon } from "@/components/ui/AppLogoIcon";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex overflow-x-hidden">
      {/* Left: decorative panel (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 gradient-thai flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6 animate-float">
            <AppLogoIcon size={96} />
          </div>
          <h1 className="text-4xl font-black mb-4">ThaiJourney</h1>
          <p className="text-xl opacity-90 mb-8">
            Unlock Thailand through language.<br />
            Start your adventure today.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { emoji: "🏙️", label: "Bangkok" },
              { emoji: "🌸", label: "Chiang Mai" },
              { emoji: "🏖️", label: "Phuket" },
            ].map((p) => (
              <div key={p.label} className="bg-white/10 rounded-2xl p-3">
                <div className="text-2xl">{p.emoji}</div>
                <p className="text-xs mt-1 opacity-80">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: auth form — scrollable on small screens */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto overflow-x-hidden px-5 py-8 sm:px-8">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
