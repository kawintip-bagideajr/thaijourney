"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Map, Trophy, MessageCircle,
  Star, User, Settings, LogOut, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/learn", icon: BookOpen, label: "Learn" },
  { href: "/alphabet", icon: Star, label: "Alphabet" },
  { href: "/map", icon: Map, label: "Adventure Map" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/chat", icon: MessageCircle, label: "AI Chat" },
  { href: "/achievements", icon: Star, label: "Achievements" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const profile = useAuthStore((s) => s.profile);

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 px-4 py-6 gap-2 fixed left-0 top-0 z-40">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-6">
        <div className="w-10 h-10 gradient-thai rounded-xl flex items-center justify-center text-xl shadow-md">
          🇹🇭
        </div>
        <div>
          <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            ThaiJourney
          </span>
          <p className="text-[10px] text-gray-400 -mt-1">Learn Thai Adventurously</p>
        </div>
      </Link>

      {/* User streak mini */}
      {profile && (
        <div className="mx-2 mb-4 flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2">
          <Flame size={16} className="text-orange-500" />
          <span className="text-sm font-bold text-orange-600">{profile.current_streak} day streak</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-600 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={18} className={isActive ? "text-orange-500" : "text-gray-400"} />
                {label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t pt-4 flex flex-col gap-1">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings size={18} className="text-gray-400" />
            Settings
          </div>
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
