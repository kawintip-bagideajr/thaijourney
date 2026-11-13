"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const schema = z.object({ email: z.string().email(t("auth.zodEmail")) });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    setError("");
    try {
      await sendPasswordResetEmail(auth, data.email.trim());
      setSent(true);
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? "";
      if (code.includes("operation-not-allowed")) {
        setError(t("auth.errResetNotAllowed"));
      } else if (code.includes("invalid-email")) {
        setError(t("auth.errValidEmail"));
      } else if (code.includes("too-many-requests")) {
        setError(t("auth.errTooManyReset"));
      } else {
        // Don't reveal if email exists — just show success for security
        setSent(true);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="game-card space-y-6 p-6 sm:p-8">
      {sent ? (
        <div className="text-center py-4" role="status">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-[var(--game-edge)] bg-orange-50">
            <Mail size={48} className="text-orange-500" aria-hidden="true" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">{t("auth.checkInbox")}</h2>
          <p className="text-gray-500 mb-6">{t("auth.resetSent")}</p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/login">{t("auth.backToLogin")}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl text-gray-900">{t("auth.resetPassword")}</h1>
            <p className="text-gray-500 mt-1">{t("auth.resetDesc")}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-bold text-gray-700 mb-1.5">{t("auth.email")}</label>
              <Input
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder={t("auth.emailPh")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "reset-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && <p id="reset-email-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">{errors.email.message}</p>}
            </div>
            {error && (
              <div role="alert" className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : t("auth.sendResetLink")}
            </Button>
          </form>
          <p className="border-t-2 border-dashed border-gray-200 pt-5 text-center text-sm text-gray-500">
            {t("auth.rememberPassword")}{" "}
            <Link href="/login" className="rounded-lg font-bold text-orange-500 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">{t("auth.signInLower")}</Link>
          </p>
        </>
      )}
    </motion.div>
  );
}
