"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { PageLoader } from "@/components/shared/LoadingSpinner";

const FIREBASE_CONFIGURED = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const DEMO_PROFILE = {
  id: "demo-user",
  username: "demo_explorer",
  display_name: "Demo Explorer",
  avatar_url: null,
  bio: "Exploring Thai with ThaiJourney!",
  country: "🌏 International",
  learning_goal: "travel" as const,
  daily_goal_minutes: 15,
  level: 7,
  total_xp: 820,
  current_streak: 12,
  longest_streak: 21,
  hearts: 4,
  hearts_updated_at: new Date().toISOString(),
  role: "user" as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useAuth();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setProfile = useAuthStore((s) => s.setProfile);
  const router = useRouter();
  const pathname = usePathname();
  const isLesson = pathname.includes("/lesson/");

  // Safety net: if Firebase Auth never resolves within 8s, force full sign-out + redirect
  useEffect(() => {
    if (!FIREBASE_CONFIGURED || !isLoading) return;
    const t = setTimeout(async () => {
      try {
        const { signOut } = await import("firebase/auth");
        const { auth } = await import("@/lib/firebase/client");
        await signOut(auth);
      } catch {}
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch {}
      clearAuth();
      router.push("/login");
    }, 8000);
    return () => clearTimeout(t);
  }, [isLoading, clearAuth, router]);

  useEffect(() => {
    if (!FIREBASE_CONFIGURED) {
      setProfile(DEMO_PROFILE);
      return;
    }
    if (!isLoading && !profile) {
      router.push("/login");
    }
  }, [profile, isLoading, router, setProfile]);

  const displayProfile = profile ?? (!FIREBASE_CONFIGURED ? DEMO_PROFILE : null);

  if (!FIREBASE_CONFIGURED && !displayProfile) return <PageLoader />;
  if (FIREBASE_CONFIGURED && isLoading) return <PageLoader />;
  if (FIREBASE_CONFIGURED && !profile) return <PageLoader />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col">
        <TopBar />
        <main className={isLesson ? "flex-1" : "flex-1 pb-20 lg:pb-6"}>
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
