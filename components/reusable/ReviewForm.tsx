"use client";

import { useState } from "react";
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

/**
 * Formulaire de soumission d'un avis.
 * Champs obligatoires : nom (pseudo), note, commentaire.
 * Champs optionnels : prénom, nom de famille, email.
 * Après soumission, l'avis est en attente de modération.
 */
export default function ReviewForm({ t, onSuccess }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !comment.trim() || rating === 0) {
      setError(t.fillAllFields);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, firstName, lastName, email, comment, rating }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur lors de la soumission.");
      }

      // Reset du formulaire
      setName("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
      setRating(0);
      setSuccess(true);
      onSuccess?.();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-14 max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-blue-900">
        {t.reviewButton}
      </h3>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 text-center font-medium">
          ✅ {t.reviewSuccess}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700 text-center font-medium">
          ⚠️ {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Pseudo / nom affiché (obligatoire) */}
        <input
          type="text"
          placeholder={t.namePlaceholder + " *"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        {/* Prénom et Nom (optionnels) */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t.firstNamePlaceholder ?? "Prénom (optionnel)"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            placeholder={t.lastNamePlaceholder ?? "Nom (optionnel)"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Email (optionnel) */}
        <input
          type="email"
          placeholder={t.emailPlaceholder ?? "Email (optionnel)"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        {/* Note (étoiles) */}
        <div className="flex justify-center py-2">
          <StarRating
            rating={rating}
            interactive
            size={32}
            onChange={setRating}
            hover={hover}
            onHoverChange={setHover}
          />
        </div>

        {/* Commentaire */}
        <textarea
          rows={5}
          placeholder={t.commentPlaceholder + " *"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold disabled:opacity-60 hover:opacity-90 transition"
          >
            {loading ? "Envoi en cours..." : t.reviewButton}
          </button>
        </div>
      </form>
    </div>
  );
}
