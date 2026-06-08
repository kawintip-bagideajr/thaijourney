import { Users, BookOpen, Zap, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "1,248", change: "+12%", icon: Users, color: "text-blue-400" },
  { label: "Active Today", value: "342", change: "+5%", icon: TrendingUp, color: "text-green-400" },
  { label: "Lessons Completed", value: "8,920", change: "+22%", icon: BookOpen, color: "text-orange-400" },
  { label: "XP Distributed", value: "124K", change: "+18%", icon: Zap, color: "text-amber-400" },
];

const RECENT_USERS = [
  { name: "Alex Morrison", email: "alex@example.com", joined: "Today", level: 3, xp: 280 },
  { name: "Yuki Tanaka", email: "yuki@example.com", joined: "Yesterday", level: 7, xp: 920 },
  { name: "Maria Garcia", email: "maria@example.com", joined: "2 days ago", level: 5, xp: 640 },
  { name: "Tom Watson", email: "tom@example.com", joined: "3 days ago", level: 2, xp: 180 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Platform overview and key metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <div className="flex items-start justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
              <span className="text-xs font-bold text-green-400">{stat.change}</span>
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">Recent Sign-ups</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Level</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">XP</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_USERS.map((user) => (
              <tr key={user.email} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-white text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-bold">
                    Lv {user.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-amber-400">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popular lessons */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-bold text-white mb-4">Most Popular Lessons</h2>
        <div className="space-y-3">
          {[
            { title: "Basic Greetings", completions: 892, module: "Greetings" },
            { title: "Numbers 1–10", completions: 743, module: "Numbers" },
            { title: "Food Vocabulary", completions: 621, module: "Food" },
            { title: "Getting Around", completions: 498, module: "Transport" },
          ].map((lesson, i) => (
            <div key={lesson.title} className="flex items-center gap-4">
              <span className="text-gray-500 font-bold w-5 text-sm">#{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{lesson.title}</p>
                <p className="text-xs text-gray-400">{lesson.module}</p>
              </div>
              <div className="w-24">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-thai rounded-full"
                    style={{ width: `${(lesson.completions / 892) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{lesson.completions}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
