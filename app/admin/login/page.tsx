"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Lock, Mail, Shield, Eye, EyeClosed } from "lucide-react";
import FormField from "@/components/reusable/FormField";
import TextInput from "@/components/reusable/TextInput";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

type Values = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { lang } = useLanguage();
  const t = translations[lang];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t.invalidCredentials);
      }

      toast.success("Connecté.");
      router.push("/admin/reviews");
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : t.loginError;
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-4xl p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
            <Shield className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{t.adminLoginTitle}</h1>
          <p className="text-slate-500 text-sm mt-2">{t.adminLoginDesc}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label={t.emailLabel}
            icon={Mail}
            error={errors.email?.message}
          >
            <TextInput
              type="email"
              autoComplete="username"
              placeholder="admin@email.com"
              {...register("email", {
                required: t.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t.invalidEmail,
                },
              })}
            />
          </FormField>

          <FormField
            label={t.passwordLabel}
            icon={Lock}
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            }
          >
            <TextInput
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: t.passwordRequired })}
            />
          </FormField>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>{t.loginButton}</span>
            )}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
