"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Map, Zap, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogoIcon } from "@/components/ui/AppLogoIcon";

const FEATURES = [
  { icon: "🗺️", title: "Adventure Map", desc: "Unlock Thailand's 77 provinces as you learn" },
  { icon: "🤖", title: "AI Tutor", desc: "24/7 AI chat partner for conversation practice" },
  { icon: "🎮", title: "Gamification", desc: "XP, streaks, achievements, and leaderboards" },
  { icon: "🔤", title: "Thai Alphabet", desc: "Master consonants, vowels, and tone marks" },
  { icon: "🎧", title: "Audio Lessons", desc: "Native speaker pronunciation for every word" },
  { icon: "✍️", title: "Interactive Exercises", desc: "6 types of exercises to build real skills" },
];

const STATS = [
  { value: "77", label: "Provinces to Unlock" },
  { value: "500+", label: "Vocabulary Words" },
  { value: "6", label: "Exercise Types" },
  { value: "∞", label: "AI Conversations" },
];

const TESTIMONIALS = [
  { name: "Alex M.", country: "🇬🇧", text: "After 30 days, I can actually read menus in Chiang Mai! The adventure map keeps me motivated." },
  { name: "Sarah K.", country: "🇺🇸", text: "The AI chat is incredible. I practice conversations before going out and it's building my confidence." },
  { name: "Hiroshi T.", country: "🇯🇵", text: "Best Thai learning app. The gamification feels like playing a game while actually learning." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppLogoIcon size={36} />
            <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              ThaiJN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-2 text-sm font-bold mb-6 border border-orange-100">
              <Star size={14} className="fill-orange-400" />
              The #1 Thai Learning Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
              Learn Thai Through
              <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Adventure ✨
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Unlock Thailand's 77 provinces as you master the language.
              Gamified lessons, AI tutor, and real cultural context —
              all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="xl" className="gap-3 shadow-xl shadow-orange-200 w-full sm:w-auto">
                  Start for Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  I already have an account
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 relative"
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm mb-4">
                <div className="text-4xl">🏙️</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Bangkok Unlocked!</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-thai rounded-full" />
                    </div>
                    <span className="text-xs text-orange-500 font-bold">75%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["สวัสดี", "ขอบคุณ", "อร่อย"].map((word) => (
                  <div key={word} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-50">
                    <p className="thai-text text-xl font-bold text-gray-900">{word}</p>
                    <div className="flex justify-center mt-1">
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Everything You Need to Learn Thai</h2>
            <p className="text-lg text-gray-500">From alphabet to advanced conversation — all in one journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-200"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-thai-soft">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
            Loved by Learners Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-thai rounded-full flex items-center justify-center text-sm">
                    {t.country}
                  </div>
                  <span className="font-bold text-sm text-gray-900">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Begin Your Thai Adventure Today
          </h2>
          <p className="text-gray-500 mb-8">Free forever. No credit card required.</p>
          <Link href="/signup">
            <Button size="xl" className="shadow-2xl shadow-orange-200 gap-3">
              🇹🇭 Start Learning Thai — Free
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-gray-400">
        <p>© 2026 ThaiJN. Made with ❤️ for Thai language learners worldwide.</p>
      </footer>
    </div>
  );
}
