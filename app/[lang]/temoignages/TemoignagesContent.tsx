"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Quote } from "lucide-react";
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
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260304-WA0043.jpg"
            alt="Témoignages – Pure Wind Kite School Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-extrabold tracking-tight leading-[1.1] mb-8">
              {t.allReviewsTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide leading-relaxed max-w-xl">
              {t.allReviewsDesc}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-12 h-1 bg-secondary rounded-full"></span>
            <span className="text-secondary font-heading font-bold text-lg uppercase tracking-widest">
              {lang === "fr" ? "Livre d'or" : "Guestbook"}
            </span>
          </div>
        </div>
      </section>

      {/* 2. AVERAGE RATING */}
      <section className="py-12 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="text-6xl md:text-7xl font-heading font-bold text-foreground tracking-tight leading-none">
              {average.toFixed(1)}
            </span>
            <div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${Math.round(average) >= star ? "text-amber-400 fill-amber-400" : "text-muted fill-muted"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground font-light text-sm">
                {t.basedOnReviews.replace("{count}", String(reviews.length))}
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-primary font-sans uppercase tracking-[0.2em] text-xs font-semibold">
              {t.averageRating}
            </span>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS GRID */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-muted border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-muted-foreground font-light uppercase tracking-widest text-xs">
                  {lang === "fr" ? "Chargement..." : "Loading..."}
                </p>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-heading text-xl font-light">{t.noReviews}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {reviews.map((review) => (
                <EditorialReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* BACK LINK */}
          <div className="mt-20 pt-12 border-t border-border">
            <Link href={`/${lang}`}
              className="inline-flex items-center gap-4 text-foreground font-sans uppercase tracking-[0.2em] text-xs font-semibold hover:text-primary transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/**
 * Editorial-style review card — matches the guestbook cards on home page.
 */
function EditorialReviewCard({ review }: { review: Pick<Review, "id" | "name" | "firstName" | "comment" | "rating" | "createdAt"> }) {
  const authorName = review.name || review.firstName || "Anonymous";
  const initial = authorName.charAt(0).toUpperCase();
  const formattedDate = new Date(review.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
      {/* Decorative Quote mark in background */}
      <Quote className="absolute top-6 right-6 size-12 text-primary/8 z-0 transition-transform group-hover:-translate-y-1 group-hover:text-primary/15 duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${review.rating >= star ? "text-amber-400 fill-amber-400" : "text-muted fill-muted"}`}
              />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-foreground/85 font-sans text-base md:text-lg font-light leading-relaxed mb-6">
            &ldquo;{review.comment}&rdquo;
          </p>
        </div>

        {/* Author details */}
        <div className="border-t border-border pt-4 mt-auto flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-semibold text-sm shrink-0">
            {initial}
          </div>
          <div>
            <h3 className="font-heading text-sm text-foreground font-semibold tracking-wide">{authorName}</h3>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-0.5">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
