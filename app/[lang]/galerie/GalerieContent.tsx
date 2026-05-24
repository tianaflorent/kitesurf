"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Dictionary } from "@/context/translations";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalerieContent({ dictionary, lang }: { dictionary: Dictionary["galerie"], lang: string }) {
  const t = dictionary;

  const categories = [
    { name: t.all, value: "Tous" },
    { name: t.navigation, value: "Navigation" },
    { name: t.tricks, value: "Figures" },
    { name: t.learning, value: "Apprentissage" },
    { name: t.landscapes, value: "Paysages" },
    { name: t.equipment, value: "Matériel" },
    { name: t.tarif, value: "Tarif" },
  ];

  const gallery = [
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

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex(selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex(selectedIndex === filtered.length - 1 ? 0 : selectedIndex + 1);
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filtered.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filtered.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <main className="bg-background overflow-hidden pb-0">
      
      {/* 1. HERO INVITATION */}
      <section className="relative min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/IMG-20260305-WA0137.jpg"
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

      {/* 2. FILTRES */}
      <section className="px-6 py-12 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 md:gap-12 w-max mx-auto px-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setActive(cat.value); setSelectedIndex(null); }}
                className={`relative uppercase tracking-[0.2em] text-xs transition-colors py-4 ${
                  active === cat.value 
                    ? "text-foreground font-semibold" 
                    : "text-muted-foreground hover:text-foreground font-light"
                }`}
              >
                {cat.name}
                {active === cat.value && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GALERIE */}
      <section className="bg-background pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div 
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedIndex(index)}
                className="bg-background group relative aspect-square md:aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover opacity-90 md:opacity-70 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                  <span className="text-secondary font-sans uppercase tracking-[0.2em] text-[10px] font-semibold mb-2 block">
                    Pure Wind
                  </span>
                  <h3 className="font-serif text-lg text-foreground font-light">
                    {item.category}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-6"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setSelectedIndex(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full pointer-events-auto">
                <Image 
                  src={filtered[selectedIndex].src} 
                  alt={filtered[selectedIndex].alt} 
                  fill 
                  className="object-contain" 
                  sizes="100vw"
                  priority
                />
              </div>
              
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 md:top-0 md:right-0 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
              >
                <X size={24} strokeWidth={1} />
              </button>

              {filtered.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
                  >
                    <ChevronLeft size={24} strokeWidth={1} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
                  >
                    <ChevronRight size={24} strokeWidth={1} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-auto">
                <span className="inline-block bg-background/50 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-widest text-foreground font-light">
                  {selectedIndex + 1} / {filtered.length} — {filtered[selectedIndex].category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
