"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { type Dictionary } from "@/context/translations";
import { Review } from "@/lib/types";

export default function TemoignagesContent({ dictionary, lang }: { dictionary: Dictionary["home"], lang: string }) {
  const t = dictionary;

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
    <main className="bg-background min-h-screen">

      {/* 1. HERO */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260304-WA0043.jpg"
            alt="Témoignages – Pure Wind Kite School Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-6">
              {t.allReviewsTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-xl">
              {t.allReviewsDesc}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary"></span>
            <span className="text-secondary font-script text-3xl">Avis</span>
          </div>
        </div>
      </section>

      {/* 2. AVERAGE RATING */}
      <section className="py-16 md:py-20 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <span className="text-7xl md:text-8xl font-serif text-foreground font-light tracking-tighter leading-none">
              {average.toFixed(1)}
            </span>
            <div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${Math.round(average) >= star ? "text-secondary fill-secondary" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground font-light text-sm">
                {t.basedOnReviews.replace("{count}", String(reviews.length))}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold">
              {t.averageRating}
            </span>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS GRID */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border border-border border-t-secondary animate-spin mx-auto mb-6"></div>
                <p className="text-muted-foreground font-light uppercase tracking-widest text-xs">
                  {lang === "fr" ? "Chargement..." : "Loading..."}
                </p>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-serif text-2xl font-light">{t.noReviews}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {reviews.map((review) => (
                <EditorialReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* BACK LINK */}
          <div className="mt-20 pt-16 border-t border-border">
            <Link href={`/${lang}`}
              className="inline-flex items-center gap-4 text-foreground font-sans uppercase tracking-[0.2em] text-xs font-light hover:text-secondary transition-colors group">
              <ArrowLeft size={16} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/**
 * Editorial-style review card — replaces the old rounded shadow card.
 */
function EditorialReviewCard({ review }: { review: Pick<Review, "id" | "name" | "comment" | "rating" | "createdAt"> }) {
  const initial = review.name.charAt(0).toUpperCase();
  const formattedDate = new Date(review.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background p-8 md:p-10 flex flex-col group">
      {/* Stars */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${review.rating >= star ? "text-secondary fill-secondary" : "text-border"}`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground font-serif text-lg md:text-xl font-light leading-relaxed flex-1 mb-10">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-border">
        <div className="w-10 h-10 bg-muted flex items-center justify-center text-foreground font-serif text-sm">
          {initial}
        </div>
        <div>
          <h3 className="font-sans text-sm text-foreground font-medium tracking-wide">{review.name}</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-0.5">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

