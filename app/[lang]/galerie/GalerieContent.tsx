"use client";

import { useState } from "react";
import Image from "next/image";
import { type Dictionary } from "@/context/translations";
import galerieHero from "@/public/images/galerie/galerieHero.jpg";
import type { GalleryItem, Category } from "@/components/galerie/types";
import GalleryFilters from "@/components/galerie/GalleryFilters";
import GalleryGrid from "@/components/galerie/GalleryGrid";
import GalleryLightbox from "@/components/galerie/GalleryLightbox";

export default function GalerieContent({ dictionary, lang }: { dictionary: Dictionary["galerie"], lang: string }) {
  const t = dictionary;

  const categories: Category[] = [
    { name: t.all, value: "Tous" },
    { name: t.navigation, value: "Navigation" },
    { name: t.tricks, value: "Figures" },
    { name: t.learning, value: "Apprentissage" },
    { name: t.landscapes, value: "Paysages" },
    { name: t.equipment, value: "Matériel" },
    { name: t.tarif, value: "Tarif" },
  ];

  const gallery: GalleryItem[] = [
    { src: "/images/IMG-20260305-WA0139.jpg", category: "Navigation", alt: "Kitesurf en navigation à la Baie de Sakalava, Diego Suarez" },
    { src: "/images/IMG-20260304-WA0029.jpg", category: "Navigation", alt: "Session de kitesurf sur la baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0006.jpg", category: "Navigation", alt: "Rider de kitesurf en action à Madagascar" },
    { src: "/images/IMG-20260304-WA0010.jpg", category: "Navigation", alt: "Kitesurf avec vue sur les eaux turquoise de Diego Suarez" },
    { src: "/images/IMG-20260304-WA0011.jpg", category: "Navigation", alt: "Planche de kitesurf dans les vagues de la Baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0012.jpg", category: "Navigation", alt: "Kite déployé au-dessus de la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0013.jpg", category: "Navigation", alt: "Navigation kitesurf vents constants Diego Suarez Madagascar" },
    { src: "/images/IMG-20260304-WA0014.jpg", category: "Navigation", alt: "Spot de kitesurf exceptionnel à Antsiranana, Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0017.jpg", category: "Navigation", alt: "Kitesurf en pleine vitesse à la Baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0016.jpg", category: "Navigation", alt: "Pure Wind Kite School – session en mer à Diego Suarez" },
    { src: "/images/IMG-20260304-WA0019.jpg", category: "Navigation", alt: "Kiter expérimenté sur la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0024.jpg", category: "Navigation", alt: "Glisse sur les eaux cristallines de Diego Suarez" },
    { src: "/images/IMG-20260304-WA0023.jpg", category: "Navigation", alt: "Navigation kitesurf eaux bleues Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0031.jpg", category: "Navigation", alt: "Session kitesurf avec vent constant à Sakalava Bay" },
    { src: "/images/IMG-20260305-WA0156.jpg", category: "Navigation", alt: "Kitesurf avancé Baie de Sakalava Madagascar" },
    { src: "/images/IMG-20260305-WA0153.jpg", category: "Navigation", alt: "Rider kitesurf en plein saut sur la Baie de Sakalava" },
    { src: "/images/IMG-20260305-WA0144.jpg", category: "Navigation", alt: "Navigation fluide kitesurf spot Diego Suarez Madagascar" },
    { src: "/images/IMG-20260304-WA0004.jpg", category: "Figures", alt: "Figure kitesurf – jump sur la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0005.jpg", category: "Figures", alt: "Trick de kitesurf à Diego Suarez, Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0009.jpg", category: "Figures", alt: "Saut kitesurf spectaculaire à la Baie de Sakalava" },
    { src: "/images/IMG-20260305-WA0133.jpg", category: "Figures", alt: "Acrobatie kitesurf sur les vagues de Madagascar" },
    { src: "/images/IMG-20260305-WA0143.jpg", category: "Apprentissage", alt: "Cours de kitesurf débutant sur la Baie de Sakalava, Diego Suarez" },
    { src: "/images/IMG-20260304-WA0042.jpg", category: "Apprentissage", alt: "Élève apprenant le kitesurf avec instructeur Pure Wind Madagascar" },
    { src: "/images/IMG-20260304-WA0041.jpg", category: "Apprentissage", alt: "Leçon de kitesurf pour débutants à Antsiranana, Madagascar" },
    { src: "/images/IMG-20260305-WA0134.jpg", category: "Paysages", alt: "Paysage de la Baie de Sakalava, Diego Suarez, Nord Madagascar" },
    { src: "/images/IMG-20260305-WA0127.jpg", category: "Paysages", alt: "Panorama de la baie d'Antsiranana, spot kitesurf Madagascar" },
    { src: "/images/IMG-20260305-WA0135.jpg", category: "Paysages", alt: "Vue côtière de la Baie de Sakalava, plage Madagascar" },
    { src: "/images/IMG-20260305-WA0138.jpg", category: "Paysages", alt: "Coucher de soleil sur la Baie de Sakalava, Diego Suarez" },
    { src: "/images/baie-des-sakalava2.jpg", category: "Paysages", alt: "Baie de Sakalava vue aérienne – meilleur spot kitesurf Madagascar" },
    { src: "/images/IMG-20260305-WA0136.jpg", category: "Paysages", alt: "Eaux turquoise de la Baie de Sakalava, nord de Madagascar" },
    { src: "/images/IMG-20260305-WA0129.jpg", category: "Paysages", alt: "Plage de Sakalava Bay – paradis du kitesurf à Diego Suarez" },
    { src: "/images/IMG-20260305-WA0132.jpg", category: "Paysages", alt: "Vents constants et ciel bleu à la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260305-WA0145.jpg", category: "Paysages", alt: "Nature préservée autour du spot de kitesurf à Diego Suarez" },
    { src: "/images/IMG-20260305-WA0146.jpg", category: "Paysages", alt: "Plage sauvage de la Baie de Sakalava, nord Madagascar" },
    { src: "/images/IMG-20260305-WA0151.jpg", category: "Paysages", alt: "Horizon de la Baie de Sakalava – spot kitesurf exceptionnel" },
    { src: "/images/IMG-20260305-WA0152.jpg", category: "Paysages", alt: "Eaux cristallines et sable blanc de la Baie de Sakalava" },
    { src: "/images/IMG-20260319-WA0000.jpg", category: "Tarif", alt: "Tarifs des cours de kitesurf – Pure Wind Kite School Madagascar" },
  ];

  const [active, setActive] = useState("Tous");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = active === "Tous" ? gallery : gallery.filter((item) => item.category === active);

  const handleFilterChange = (value: string) => {
    setActive(value);
    setSelectedIndex(null);
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filtered.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <main className="bg-background overflow-hidden pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src={galerieHero}
            alt="Galerie kitesurf – Pure Wind Kite School à la Baie de Sakalava, Diego Suarez, Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-8">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-xl">
              {t.heroSubtitle}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary"></span>
            <span className="text-secondary font-script text-3xl">{lang === 'fr' ? "L'Océan" : "The Ocean"}</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <GalleryFilters categories={categories} active={active} onFilterChange={handleFilterChange} />

      {/* Gallery Grid */}
      <GalleryGrid items={filtered} onImageClick={handleImageClick} />

      {/* Lightbox */}
      <GalleryLightbox
        items={filtered}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </main>
  );
}
