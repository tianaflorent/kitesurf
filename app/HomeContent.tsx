"use client";

import { ShieldCheck, Smile, Wind, MapPin, ArrowRight, Play, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { dictionaries, type Dictionary } from "@/context/translations";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomeContent() {
  const { lang } = useLanguage();
  const t: Dictionary["home"] = dictionaries[lang].home;

  return (
    <main className="pb-0 bg-background selection:bg-primary/30">
      {/* ================= HERO (Premium Cinematic) ================= */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 animate-pulse-slow">
            <source src="/videos/VID-20260304-WA0046~2.mp4" type="video/mp4" />
          </video>
          {/* Overlay dégradé plus sophistiqué pour le luxe */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-16">
          <span className="text-secondary/90 font-sans uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6 animate-slide-in-left">
            Sakalava Bay, Madagascar
          </span>
          <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-[1.1] animate-slide-in-left font-heading drop-shadow-2xl">
            L'Élégance du <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Kitesurf</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl font-light tracking-wide drop-shadow-md">
            {t.heroSubtitle}
          </p>
          
          <div className="mt-14 flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
            <Button asChild size="lg" className="rounded-none bg-white text-black hover:bg-secondary hover:text-black transition-all duration-300 px-10 py-7 text-lg font-medium tracking-wide">
              <Link href="/reservation">
                {t.bookButton} <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none border-white/40 text-white backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white px-10 py-7 text-lg font-light transition-all duration-300">
              <Link href="/cours">
                <Play className="mr-3 h-4 w-4 fill-current" /> {t.coursesButton}
              </Link>
            </Button>
          </div>
        </div>

        {/* Indicateur de scroll (Souris) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white to-white/0 animate-pulse" />
        </div>
      </section>

      {/* ================= VALEURS (Minimalist Luxury) ================= */}
      <section className="py-32 px-6 relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">L&apos;Expérience Pure Wind</span>
              <h2 className="text-4xl md:text-6xl font-light text-foreground font-heading tracking-tighter leading-tight">
                L&apos;excellence sur <br/><span className="font-bold">l&apos;eau</span>.
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-md font-light leading-relaxed">
              {t.valuesDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            <ValueCard 
              Icon={Wind} 
              title={t.progressionTitle} 
              desc={t.progressionDesc} 
              number="01"
            />
            <ValueCard 
              Icon={ShieldCheck} 
              title={t.safetyTitle} 
              desc={t.safetyDesc} 
              number="02"
            />
            <ValueCard 
              Icon={Smile} 
              title={t.funTitle} 
              desc={t.funDesc} 
              number="03"
            />
          </div>
        </div>
      </section>

      {/* ================= LOCALISATION (Editorial Parallax) ================= */}
      <section className="py-32 px-6 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1 z-10">
            <span className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Le Sanctuaire</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground font-heading leading-tight tracking-tighter mb-8">
              {t.locationTitle}
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
              {t.locationDesc}
            </p>
            <div className="flex items-center gap-6">
              <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-primary transition-colors px-8 py-6 text-md font-medium">
                 <Link href="/contact">Découvrir le spot</Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                <MapPin size={16} className="text-primary" /> Diego Suarez
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative group">
            {/* Effet d'ombre décalée pour le côté premium */}
            <div className="absolute -inset-4 bg-primary/5 translate-x-8 translate-y-8 -z-10 transition-transform duration-500 group-hover:translate-x-12 group-hover:translate-y-12" />
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20260304-WA0043.jpg"
                alt="Baie de Sakalava vue du ciel"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= GALERIE (Magazine Layout) ================= */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground font-heading tracking-tighter">{t.galleryTitle}</h2>
          </div>
          <GallerySlider t={t} />
        </div>
      </section>

      {/* ================= COMMUNAUTÉ ================= */}
      <section className="py-32 px-6 relative bg-background">
        <div className="max-w-6xl mx-auto relative overflow-hidden bg-foreground text-background shadow-2xl">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
             <Image src="/images/IMG-20260304-WA0042.jpg" alt="Texture" fill className="object-cover grayscale" />
          </div>
          
          <div className="relative z-10 px-6 py-32 text-center flex flex-col items-center">
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={24} className="fill-secondary text-secondary" />
              ))}
            </div>
            <h2 className="text-4xl md:text-6xl font-light font-heading mb-8 tracking-tighter leading-tight max-w-3xl">
              {t.communityTitle}
            </h2>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed">
              {t.communityDesc}
            </p>
            <Button asChild size="lg" className="rounded-none bg-secondary text-foreground hover:bg-white transition-colors px-12 py-7 text-lg font-medium tracking-wide">
              <Link href="/contact">
                {t.bookNow}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= TÉMOIGNAGES ================= */}
      <section className="py-32 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <TestimonialsSection t={t} />
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */
interface ValueCardProps {
  Icon: React.ElementType;
  title: string;
  desc: string;
  number: string;
}

function ValueCard({ Icon, title, desc, number }: ValueCardProps) {
  return (
    <div className="group relative border-t border-border pt-8 hover:border-primary transition-colors duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon strokeWidth={1.5} size={32} />
        </div>
        <span className="text-4xl font-heading font-light text-muted-foreground/30 group-hover:text-primary/20 transition-colors duration-300">{number}</span>
      </div>
      <h3 className="text-2xl font-heading font-medium text-foreground tracking-tight mb-4">{title}</h3>
      <p className="text-muted-foreground font-light leading-relaxed">{desc}</p>
    </div>
  );
}

function GallerySlider({ t }: { t: Dictionary['home'] }) {
  const images = [
    { img: "IMG-20260304-WA0042.jpg", alt: "Session de kitesurf à la Baie de Sakalava" },
    { img: "IMG-20260304-WA0029.jpg", alt: "Kiters en action à Diego Suarez, Madagascar" },
    { img: "IMG-20260304-WA0024.jpg", alt: "Cours de kitesurf débutant – Pure Wind Kite School" },
  ];

  return (
    <div className="relative">
      <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 scrollbar-hide px-4 md:px-0">
        {images.map(({ img, alt }, i) => (
          <div key={i} className="snap-center shrink-0 w-[85%] sm:w-[60%] lg:w-[450px] aspect-[4/5] relative group overflow-hidden bg-muted">
            <Image 
              src={`/images/${img}`} 
              alt={alt} 
              fill
              className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-in-out" 
            />
          </div>
        ))}
        
        <div className="snap-center shrink-0 w-[85%] sm:w-[60%] lg:w-[450px] aspect-[4/5] relative group cursor-pointer overflow-hidden bg-foreground flex items-center justify-center">
          <Image 
            src="/images/IMG-20260304-WA0038.jpg" 
            alt="Galerie photos kitesurf" 
            fill
            className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700" 
          />
          <div className="relative z-10 text-center">
            <Button asChild variant="link" className="text-white hover:text-secondary text-2xl font-light tracking-wide">
               <Link href="/galerie">{t.morephoto} <ArrowRight className="ml-2 inline" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}