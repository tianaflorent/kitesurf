"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface HeroSectionProps {
  /** Image de fond du hero */
  imageSrc: string;
  /** Texte alternatif de l'image */
  imageAlt: string;
  /** Titre principal */
  title: string;
  /** Sous-titre optionnel */
  subtitle?: string;
  /** Élément décoratif optionnel (ex: "Notre Histoire") */
  decorativeElement?: ReactNode;
  /** Hauteur minimale du hero (défaut: "min-h-[80vh]") */
  minHeight?: string;
  /** Classes supplémentaires */
  className?: string;
}

/**
 * Composant HeroSection réutilisable pour les pages du site.
 * Utilise le style éditorial avec image de fond, overlay sombre et typographie serif.
 */
export default function HeroSection({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  decorativeElement,
  minHeight = "min-h-[80vh]",
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`relative ${minHeight} flex items-end pb-32 ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-8">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
        {decorativeElement && (
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary" />
            {decorativeElement}
          </div>
        )}
      </div>
    </section>
  );
}
