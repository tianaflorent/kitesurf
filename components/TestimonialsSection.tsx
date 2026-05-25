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
        <span className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
          Livre d&apos;Or
        </span>
        <h2 className="text-4xl md:text-6xl font-light text-foreground font-serif tracking-tighter">
          {t.testimonialsTitle}
        </h2>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto font-light text-lg">
          {t.testimonialsDesc}
        </p>
      </div>

      {/* Grille de témoignages épurée */}
      {reviews.length > 0 && (
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="relative group">
              {/* Grande citation en filigrane */}
              <Quote className="absolute -top-6 -left-4 size-16 text-muted-foreground/10 rotate-180 z-0 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {/* Génération des étoiles stylisées */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < (review.rating || 5) ? "fill-secondary text-secondary" : "fill-muted text-muted"} 
                    />
                  ))}
                </div>
                
                <p className="text-foreground/80 font-light leading-relaxed mb-8 grow text-lg italic">
                  &quot;{review.comment}&quot;
                </p>
                
                <div className="mt-auto border-t border-border pt-4">
                  <p className="font-sans font-medium tracking-wide text-foreground uppercase text-sm">
                    {review.name || review.firstName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Voir plus */}
      <div className="text-center mb-32">
        <Button asChild variant="outline" size="lg" className="px-12">
          <Link href={`/${lang}/temoignages`}>{t.seeMore}</Link>
        </Button>
      </div>

      {/* Zone de formulaire distinguée avec un fond subtil */}
      <div className="max-w-3xl mx-auto bg-background border border-border p-8 md:p-14 shadow-2xl relative overflow-hidden">
        {/* Accent visuel discret */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary" />
        <ReviewForm t={t} onSuccess={loadReviews} />
      </div>
    </div>
  );
}