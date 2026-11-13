"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClass = { sm: "h-4 w-4 border-2", md: "h-8 w-8 border-2", lg: "h-12 w-12 border-4" }[size];
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("animate-spin rounded-full border-orange-200 border-t-orange-500", sizeClass)} />
      {text && <p className="text-sm font-bold text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
}

export function PageLoader() {
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowRecovery(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleReset = async () => {
    try {
      const { signOut } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase/client");
      await signOut(auth);
    } catch {}
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fff7e8] z-50">
      <div className="game-card text-center px-8 py-7 mx-4 max-w-sm">
        <div className="text-6xl mb-4" aria-hidden="true">🇹🇭</div>
        <LoadingSpinner size="lg" />
        <p className="mt-4 font-display text-lg text-gray-700">กำลังโหลด...</p>
        {showRecovery && (
          <button
            onClick={handleReset}
            className="btn-3d mt-6 px-4 py-2.5 rounded-2xl bg-white border-2 border-[var(--game-edge)] text-sm font-extrabold text-orange-600 [--btn-edge:var(--game-edge)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
          >
            โหลดนานผิดปกติ? กดตรงนี้เพื่อออกจากระบบแล้วเข้าใหม่
          </button>
        )}
      </div>
    </div>
  );
}
