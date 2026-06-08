"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReviewForm from "@/components/reusable/ReviewForm";
import { type Dictionary } from "@/context/translations";
import { Review } from "@/lib/types";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection({ t, lang }: { t: Dictionary['home'], lang: string }) {
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
    <div className="py-16">
      {/* En-tête de section style éditorial */}
      <div className="text-center mb-24 relative">
        {/* <span className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
          Livre d&apos;Or
        </span> */}
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-tight">
          {t.testimonialsTitle}
        </h2>
        <div className="w-12 h-1 bg-secondary mx-auto mt-6 mb-4 rounded-full" />
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-light text-lg">
          {t.testimonialsDesc}
        </p>
      </div>

      {/* Grille de témoignages épurée */}
      {reviews.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="relative group bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              {/* Grande citation en filigrane */}
              <Quote className="absolute top-6 right-6 size-12 text-primary/8 z-0 transition-transform group-hover:-translate-y-1 group-hover:text-primary/15 duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"} 
                    />
                  ))}
                </div>
                
                <p className="text-foreground/75 font-light leading-relaxed mb-8 grow text-base">
                  &quot;{review.comment}&quot;
                </p>
                
                <div className="mt-auto border-t border-border pt-4">
                  <p className="font-heading font-semibold tracking-wide text-foreground text-sm">
                    {review.name || review.firstName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Voir plus */}
      <div className="text-center mb-20">
        <Button asChild variant="outline" size="lg" className="px-12 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
          <Link href={`/${lang}/temoignages`}>{t.seeMore}</Link>
        </Button>
      </div>

      {/* Zone de formulaire distinguée */}
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
        <ReviewForm t={t} onSuccess={loadReviews} />
      </div>
    </div>
  );
}