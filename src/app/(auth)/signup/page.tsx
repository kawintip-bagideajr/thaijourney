"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { auth, db } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEMO_MODE = !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const signupSchema = z.object({
  username: z.string().min(3, "At least 3 characters").max(20).regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "At least 8 characters").regex(/[A-Z]/, "Include an uppercase letter").regex(/[0-9]/, "Include a number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

async function createSession(idToken: string) {
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Session creation failed");
  }
}

async function createUserProfile(uid: string, username: string) {
  const now = new Date().toISOString();
  await setDoc(doc(db, "users", uid), {
    username,
    display_name: username,
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
  });
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupForm) => {
    setError("");
    if (DEMO_MODE) { router.push("/dashboard"); return; }
    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(credential.user, { displayName: data.username });
      await createUserProfile(credential.user.uid, data.username);
      const idToken = await credential.user.getIdToken();
      await createSession(idToken);
      router.push("/dashboard");
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? "";
      const msg = (e as { message?: string }).message ?? "";
      if (code.includes("email-already-in-use")) {
        setError("This email is already registered. Try signing in.");
      } else if (code.includes("weak-password")) {
        setError("Password is too weak.");
      } else {
        setError(msg || "Sign up failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    if (DEMO_MODE) { router.push("/dashboard"); return; }
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      // Profile will be auto-created in useAuth if it doesn't exist
      const idToken = await credential.user.getIdToken();
      await createSession(idToken);
      router.push("/dashboard");
    } catch {
      setError("Google sign up failed. Please try again.");
    }
  };

  const strengthChecks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center lg:text-left">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 lg:hidden">
          <div className="w-8 h-8 gradient-thai rounded-xl flex items-center justify-center">🇹🇭</div>
          <span className="font-black text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">ThaiJourney</span>
        </Link>
        <h1 className="text-3xl font-black text-gray-900">Start your journey</h1>
        <p className="text-gray-500 mt-1">Free forever. No credit card needed.</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
        <div className="relative flex justify-center text-xs text-gray-400 uppercase"><span className="bg-white px-2">or</span></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
          <Input placeholder="yourname" {...register("username")} />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...register("password")} className="pr-11" />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex gap-3">
              {strengthChecks.map((c) => (
                <div key={c.label} className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.pass ? "bg-green-500" : "bg-gray-200"}`} />
                  <span className={`text-[10px] ${c.pass ? "text-green-600" : "text-gray-400"}`}>{c.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
          <Input type="password" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Create Free Account 🇹🇭"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500 hover:text-orange-600 font-bold">Sign in</Link>
      </p>
    </motion.div>
  );
}
