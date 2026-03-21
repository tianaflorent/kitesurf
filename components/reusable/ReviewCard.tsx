"use client";

import StarRating from "./StarRating";
import { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Pick<Review, "id" | "name" | "comment" | "rating" | "createdAt">;
}

/**
 * Carte d'affichage d'un avis approuvé.
 * Affiche l'avatar avec initiale, le pseudo, les étoiles et le commentaire.
 */
export default function ReviewCard({ review }: ReviewCardProps) {
  const initial = review.name.charAt(0).toUpperCase();

  const formattedDate = new Date(review.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
          {initial}
        </div>
        <div>
          <h3 className="font-semibold text-lg leading-tight">{review.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-black italic mt-4">&ldquo;{review.comment}&rdquo;</p>
    </div>
  );
}
