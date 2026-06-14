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
      {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
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
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center px-6">
        <div className="text-5xl mb-4 animate-float">🇹🇭</div>
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 font-medium">กำลังโหลด...</p>
        {showRecovery && (
          <button
            onClick={handleReset}
            className="mt-6 text-sm text-orange-500 underline"
          >
            โหลดนานเกิน? คลิกที่นี่เพื่อล้างและเข้าสู่ระบบใหม่
          </button>
        )}
      </div>
    </div>
  );
}
