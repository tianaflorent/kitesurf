"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReviewCard from "@/components/reusable/ReviewCard";
import ReviewForm from "@/components/reusable/ReviewForm";
import { Review } from "@/lib/types";

export default function TestimonialsSection({ t }: { t: any }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    try {
      const res = await fetch("/api/reviews/approved");
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("[TestimonialsSection] Erreur de chargement :", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <>
      {/* Titre de la section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900">
          {t.testimonialsTitle}
        </h2>
        <p className="mt-4 text-black max-w-2xl mx-auto">{t.testimonialsDesc}</p>
      </div>

      {/* Aperçu des 3 derniers avis */}
      {reviews.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Lien vers tous les témoignages */}
      <div className="text-center mb-20">
        <Link
          href="/temoignages"
          className="inline-block bg-white px-8 py-3 rounded-full shadow hover:shadow-md transition font-medium"
        >
          {t.seeMore}
        </Link>
      </div>

      {/* Formulaire d'ajout d'un avis */}
      <ReviewForm t={t} onSuccess={loadReviews} />
    </>
  );
}
