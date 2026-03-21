"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import ReviewCard from "@/components/reusable/ReviewCard";
import StarRating from "@/components/reusable/StarRating";
import { Review } from "@/lib/types";

export default function TemoignagesPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews/approved");
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data: Review[] = await res.json();
        setReviews(data);

        if (data.length > 0) {
          const total = data.reduce((acc, r) => acc + r.rating, 0);
          setAverage(total / data.length);
        }
      } catch (err) {
        console.error("[TemoignagesPage] Erreur de chargement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="min-h-screen py-24 px-6 bg-linear-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
            {t.allReviewsTitle}
          </h1>
          <p className="mt-4 text-gray-600">{t.allReviewsDesc}</p>
        </div>

        {/* NOTE MOYENNE */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{t.averageRating}</h2>
          <div className="flex justify-center mb-4">
            <StarRating rating={Math.round(average)} size={28} />
          </div>
          <p className="text-xl font-bold text-blue-900">{average.toFixed(1)} / 5</p>
          <p className="text-gray-500 mt-2">
            {t.basedOnReviews.replace("{count}", String(reviews.length))}
          </p>
        </div>

        {/* LISTE DES AVIS */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Chargement...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">{t.noReviews}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* BOUTON RETOUR */}
        <div className="text-center mt-20">
          <Link
            href="/"
            className="inline-block bg-linear-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            {t.backHome}
          </Link>
        </div>

      </div>
    </main>
  );
}