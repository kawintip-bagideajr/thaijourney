"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import type { Profile } from "@/types/database";

async function fetchOrCreateProfile(userId: string, email: string | null): Promise<Profile | null> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) return { id: userId, ...snap.data() } as Profile;

  // New Google/OAuth user — create default profile
  const now = new Date().toISOString();
  const defaultProfile: Profile = {
    id: userId,
    username: email?.split("@")[0] ?? `user_${userId.slice(0, 6)}`,
    display_name: email?.split("@")[0] ?? null,
    avatar_url: null,
    bio: null,
    country: null,
    learning_goal: null,
    daily_goal_minutes: 10,
    level: 1,
    total_xp: 0,
    current_streak: 0,
    longest_streak: 0,
    hearts: 5,
    hearts_updated_at: now,
    role: "user",
    created_at: now,
    updated_at: now,
  };
  await setDoc(ref, defaultProfile);
  return defaultProfile;
}

export function useAuth() {
  const { profile, isLoading, setProfile, setLoading, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const p = await fetchOrCreateProfile(user.uid, user.email);
        if (p) setProfile(p);
        else setLoading(false);
      } else {
        clearAuth();
      }
    });
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.push("/");
  };

  return { profile, isLoading, signOut };
}
