"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import FormField from "./FormField";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import RatingField from "./RatingField";
import PrimaryButton from "./PrimaryButton";
import LoadingSpinner from "./LoadingSpinner";

interface ReviewFormProps {
  t: any;
  onSuccess?: () => void;
}

export default function ReviewForm({ t, onSuccess }: ReviewFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", comment: "", rating: 0 },
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      reset();
      toast.success(t.reviewSuccess);
      onSuccess?.();
    } catch (err) {
      toast.error("Erreur lors de l'envoi");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Votre avis nous intéresse
        </h3>
        <p className="text-slate-500 text-sm mt-2">
          Partagez votre expérience avec la communauté.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <RatingField
          control={control}
          name="rating"
          label="Note globale"
          error={errors.rating ? "Veuillez sélectionner une note" : undefined}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Nom" optionalText="(Optionnel)" icon={User}>
            <TextInput {...register("name")} placeholder="John Doe" />
          </FormField>

          <FormField label="Email" optionalText="(Optionnel)" icon={Mail}>
            <TextInput
              type="email"
              {...register("email")}
              placeholder="john.doe@email.com"
            />
          </FormField>
        </div>

        <FormField
          label="Votre message"
          icon={MessageSquare}
          error={errors.comment ? "Le commentaire est requis" : undefined}
        >
          <TextArea
            rows={4}
            {...register("comment", { required: true })}
            placeholder="Qu'avez-vous pensé de notre service ?"
          />
        </FormField>

        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <>
              <span>Publier mon avis</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </PrimaryButton>
      </form>
    </div>
  );
}