"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Map, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/learn", icon: BookOpen, label: "Learn" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/leaderboard", icon: Trophy, label: "Ranks" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 flex-1">
              <div className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                isActive ? "bg-orange-100" : ""
              )}>
                <Icon
                  size={20}
                  className={cn(isActive ? "text-orange-500" : "text-gray-400")}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span className={cn("text-[10px] font-medium", isActive ? "text-orange-500" : "text-gray-400")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
