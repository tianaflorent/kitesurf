"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Lock, Mail, Shield } from "lucide-react";
import FormField from "@/components/reusable/FormField";
import TextInput from "@/components/reusable/TextInput";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";

type Values = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();

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
        throw new Error(data?.error ?? "Identifiants invalides");
      }

      toast.success("Connecté.");
      router.push("/admin/reviews");
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur de connexion";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
            <Shield className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Connexion admin</h1>
          <p className="text-slate-500 text-sm mt-2">Accès réservé à l'administration.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Email"
            icon={Mail}
            error={errors.email?.message}
          >
            <TextInput
              type="email"
              autoComplete="username"
              placeholder="admin@email.com"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email invalide",
                },
              })}
            />
          </FormField>

          <FormField
            label="Mot de passe"
            icon={Lock}
            error={errors.password?.message}
          >
            <TextInput
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: "Le mot de passe est requis" })}
            />
          </FormField>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>Se connecter</span>
            )}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
