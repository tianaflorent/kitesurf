"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function TemoignagesPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [reviews, setReviews] = useState<any[]>([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      const parsed = JSON.parse(saved);
      setReviews(parsed);

      const total = parsed.reduce((acc: number, review: any) => acc + review.rating, 0);
      const avg = parsed.length ? total / parsed.length : 0;
      setAverage(avg);
    }
  }, []);

  return (
    <main className="min-h-screen py-24 px-6 bg-linear-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900">{t.allReviewsTitle}</h1>
          <p className="mt-4 text-gray-600">{t.allReviewsDesc}</p>
        </div>

        {/* NOTE MOYENNE */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{t.averageRating}</h2>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={star <= Math.round(average) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>

          <p className="text-xl font-bold text-blue-900">{average.toFixed(1)} / 5</p>
          <p className="text-gray-500 mt-2">{t.basedOnReviews.replace("{count}", reviews.length)}</p>
        </div>

        {/* LISTE DES AVIS */}
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">{t.noReviews}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                </div>

                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic">"{review.comment}"</p>
              </div>
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