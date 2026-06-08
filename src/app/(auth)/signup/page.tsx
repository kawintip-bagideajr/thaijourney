"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEMO_MODE = !(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
);

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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupForm) => {
    setError("");
    if (DEMO_MODE) {
      router.push("/dashboard");
      return;
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { username: data.username, display_name: data.username },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSuccess(true);
  };

  const handleGoogleSignup = async () => {
    if (DEMO_MODE) {
      router.push("/dashboard");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Check your email!</h2>
        <p className="text-gray-500">We sent a verification link to your email address.</p>
        <Link href="/login">
          <Button className="mt-6">Back to Login</Button>
        </Link>
      </motion.div>
    );
  }

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
