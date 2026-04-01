"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import FormField from "./FormField";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import RatingField from "./RatingField";
import PrimaryButton from "./PrimaryButton";
import LoadingSpinner from "./LoadingSpinner";

import { type Dictionary } from "@/context/translations";

const getReviewSchema = (t: Dictionary['home']) =>
  z.object({
    name: z.string(),
    email: z.union([z.string().email({ message: t.invalidEmail || "Email invalide" }), z.literal("")]),
    comment: z.string().min(1, { message: t.commentError }),
    rating: z.number().min(1, { message: t.ratingError }).max(5),
  });

type ReviewFormValues = z.infer<ReturnType<typeof getReviewSchema>>;

interface ReviewFormProps {
  t: Dictionary['home'];
  onSuccess?: () => void;
}

export default function ReviewForm({ t, onSuccess }: ReviewFormProps) {
  const reviewSchema = getReviewSchema(t);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", email: "", comment: "", rating: 0 },
  });

  const onSubmit = async (values: ReviewFormValues) => {
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
    } catch {
      toast.error(t.reviewError);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-4xl p-8 md:p-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
          {t.reviewFormTitle2}
        </h3>
        <p className="text-slate-500 text-sm mt-2">
          {t.reviewFormSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <RatingField
          control={control}
          name="rating"
          label={t.ratingLabel}
          error={errors.rating ? t.ratingError : undefined}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label={t.nameLabel} optionalText={t.optionalText} icon={User}>
            <TextInput {...register("name")} placeholder={t.namePlaceholder || "John Doe"} />
          </FormField>

          <FormField label={t.emailLabel} optionalText={t.optionalText} icon={Mail}>
            <TextInput
              type="email"
              {...register("email")}
              placeholder={t.emailPlaceholder || "john.doe@email.com"}
            />
          </FormField>
        </div>

        <FormField
          label={t.messageLabel}
          icon={MessageSquare}
          error={errors.comment ? t.commentError : undefined}
        >
          <TextArea
            rows={4}
            {...register("comment")}
            placeholder={t.commentPlaceholder2}
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
              <span>{t.submitReviewBtn}</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </PrimaryButton>
      </form>
    </div>
  );
}