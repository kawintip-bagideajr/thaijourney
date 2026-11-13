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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {sent ? (
        <div className="text-center py-8">
          <Mail size={56} className="text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">{t("auth.checkInbox")}</h2>
          <p className="text-gray-500 mb-6">{t("auth.resetSent")}</p>
          <Link href="/login"><Button>{t("auth.backToLogin")}</Button></Link>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{t("auth.resetPassword")}</h1>
            <p className="text-gray-500 mt-1">{t("auth.resetDesc")}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("auth.email")}</label>
              <Input type="email" placeholder={t("auth.emailPh")} {...register("email")} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : t("auth.sendResetLink")}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500">
            {t("auth.rememberPassword")}{" "}
            <Link href="/login" className="text-orange-500 font-bold">{t("auth.signInLower")}</Link>
          </p>
        </>
      )}
    </motion.div>
  );
}
