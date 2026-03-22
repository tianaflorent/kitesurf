"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StarRating from "./StarRating";

interface ReviewFormTranslations {
  reviewFormTitle?: string;
  namePlaceholder: string;
  firstNamePlaceholder?: string;
  lastNamePlaceholder?: string;
  emailPlaceholder?: string;
  commentPlaceholder: string;
  reviewButton: string;
  fillAllFields: string;
  reviewSuccess: string;
}

interface ReviewFormProps {
  t: ReviewFormTranslations;
  onSuccess?: () => void;
}

type ReviewFormValues = {
  name?: string;
  email?: string;
  comment: string;
  rating: number;
};

/**
 * Formulaire de soumission d'un avis.
 * Champs obligatoires : nom (pseudo), note, commentaire.
 * Champs optionnels : prénom, nom de famille, email.
 * Après soumission, l'avis est en attente de modération.
 */
export default function ReviewForm({ t, onSuccess }: ReviewFormProps) {
  const [hover, setHover] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          name: values.name?.trim() || "",
          email: values.email?.trim() || "",
          comment: values.comment,
          rating: values.rating,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur lors de la soumission.");
      }

      reset();
      toast.success(t.reviewSuccess);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur inconnue.");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-14 max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-blue-900">
        {t.reviewButton}
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Nom et prénom (optionnel)
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          {errors.name?.message && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Email (optionnel)
          </label>
          <input
            type="email"
            placeholder={t.emailPlaceholder ?? "john.doe@email.com"}
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalide.",
              },
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          {errors.email?.message && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        </div>

        {/* Note (étoiles) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">Note *</label>
          <div className="flex justify-center py-2">
            <Controller
              control={control}
              name="rating"
              rules={{
                required: "La note est obligatoire.",
                min: { value: 1, message: "La note est obligatoire." },
              }}
              render={({ field }) => (
                <StarRating
                  rating={field.value}
                  interactive
                  size={32}
                  onChange={field.onChange}
                  hover={hover}
                  onHoverChange={setHover}
                />
              )}
            />
          </div>
          {errors.rating?.message && (
            <p className="text-sm text-red-600 text-center">{errors.rating.message}</p>
          )}
        </div>

        {/* Commentaire */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Commentaire *
          </label>
          <textarea
            rows={5}
            placeholder={t.commentPlaceholder}
            {...register("comment", {
              required: "Le commentaire est obligatoire.",
              validate: (v) => v.trim().length > 0 || "Le commentaire est obligatoire.",
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          {errors.comment?.message && (
            <p className="text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-700 text-white px-10 py-4 rounded-full font-semibold disabled:opacity-60 hover:opacity-90 transition"
          >
            {isSubmitting ? "Envoi en cours..." : t.reviewButton}
          </button>
        </div>
      </form>
    </div>
  );
}
