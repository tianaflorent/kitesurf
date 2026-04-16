"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useEffect } from "react";

const moderatorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'adresse email est invalide"),
});

type ModeratorFormValues = z.infer<typeof moderatorSchema>;

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ModeratorFormModalProps {
  mode: "create" | "edit" | "delete";
  moderator: Moderator | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ModeratorFormValues) => Promise<void>;
  onDelete: () => Promise<void>;
  actionLoading: string | null;
}

export default function ModeratorFormModal({
  mode,
  moderator,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  actionLoading,
}: ModeratorFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModeratorFormValues>({
    resolver: zodResolver(moderatorSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  useEffect(() => {
    if (isOpen && mode !== "delete") {
      if (mode === "edit" && moderator) {
        reset({
          firstName: moderator.firstName,
          lastName: moderator.lastName,
          email: moderator.email,
        });
      } else {
        reset({ firstName: "", lastName: "", email: "" });
      }
    }
  }, [isOpen, mode, moderator, reset]);

  if (!isOpen) return null;

  const isFormLoading = actionLoading === "form";
  const isDeleteLoading = actionLoading?.endsWith("DELETE");

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {mode === "create"
                ? "Inviter un modérateur"
                : mode === "edit"
                  ? "Modifier le modérateur"
                  : "Confirmer la suppression"}
            </h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {mode === "delete" ? (
            <div className="space-y-6">
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-800 leading-relaxed">
                  Êtes-vous sûr de vouloir supprimer{" "}
                  <strong>
                    {moderator?.firstName} {moderator?.lastName}
                  </strong>{" "}
                  ? Cette action est irréversible.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={!!isDeleteLoading}
                  className="px-5 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isDeleteLoading ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Prénom
                  </label>
                  <input
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.firstName ? "border-red-300" : "border-slate-200"
                      } text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition`}
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Nom
                  </label>
                  <input
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.lastName ? "border-red-300" : "border-slate-200"
                      } text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition`}
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  className={`w-full px-3 py-2.5 rounded-xl border ${errors.email ? "border-red-300" : "border-slate-200"
                    } text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isFormLoading}
                  className="px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFormLoading
                    ? "Chargement..."
                    : mode === "create"
                      ? "Inviter"
                      : "Enregistrer"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
