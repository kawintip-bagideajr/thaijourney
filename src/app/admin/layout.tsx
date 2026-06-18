import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, BarChart3 } from "lucide-react";
import { AppLogoIcon } from "@/components/ui/AppLogoIcon";

const ADMIN_NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col px-4 py-6">
        <Link href="/admin" className="flex items-center gap-2.5 px-2 mb-8">
          <AppLogoIcon size={32} />
          <div>
            <p className="text-sm font-black text-white">ThaiJourney</p>
            <p className="text-[10px] text-gray-400">Admin Panel</p>
          </div>
        </Link>
        <nav className="flex-1 space-y-1">
          {ADMIN_NAV.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 transition-colors">
          ← Back to App
        </Link>
      </aside>

      {/* Content */}
      <main className="flex-1 text-white">
        {children}
      </main>
    </div>
  );
}
