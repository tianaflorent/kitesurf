"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Dictionary } from "@/context/translations";

export default function AproposContent({ dictionary }: { dictionary: Dictionary["apropos"] }) {
  const t = dictionary;
  const images = [
    "/images/IMG-20260304-WA0033.jpg",
    "/images/IMG-20260304-WA0025.jpg",
    "/images/IMG-20260304-WA0038.jpg",
    "/images/IMG-20260304-WA0039.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // slightly slower for a more cinematic feel
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="bg-background overflow-hidden pb-0">

      {/* 1. HERO INVITATION */}
      <section className="relative min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={t.aboutImageAlt.replace('{index}', String(index + 1))}
              fill
              priority={index === 0}
              className={`object-cover transition-opacity duration-2000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-8">
              {t.aboutTitle}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary"></span>
            <span className="text-secondary font-script text-3xl">Notre Histoire</span>
          </div>
        </div>
      </section>

      {/* 2. NOTRE HISTOIRE */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-4/5 w-full">
              <Image
                src="/images/IMG-20260304-WA0037.jpg"
                alt={t.ourStoryImageAlt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-secondary hidden md:block"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
              Origines
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter mb-10">
              {t.ourStoryTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
              {t.ourStoryText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. NOS VALEURS */}
      <section className="py-24 md:py-32 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-24">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
              Engagement
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter">
              {t.ourValuesTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col group">
              <span className="text-5xl font-script text-secondary mb-6 opacity-80 group-hover:opacity-100 transition-opacity">01</span>
              <h3 className="text-2xl font-serif text-foreground font-light mb-4">{t.passionTitle}</h3>
              <div className="w-12 h-px bg-border mb-6 group-hover:bg-secondary transition-colors duration-500"></div>
              <p className="text-muted-foreground font-light leading-relaxed flex-1">{t.passionDesc}</p>
            </div>
            
            <div className="flex flex-col group">
              <span className="text-5xl font-script text-secondary mb-6 opacity-80 group-hover:opacity-100 transition-opacity">02</span>
              <h3 className="text-2xl font-serif text-foreground font-light mb-4">{t.environmentTitle}</h3>
              <div className="w-12 h-px bg-border mb-6 group-hover:bg-secondary transition-colors duration-500"></div>
              <p className="text-muted-foreground font-light leading-relaxed flex-1">{t.environmentDesc}</p>
            </div>
            
            <div className="flex flex-col group">
              <span className="text-5xl font-script text-secondary mb-6 opacity-80 group-hover:opacity-100 transition-opacity">03</span>
              <h3 className="text-2xl font-serif text-foreground font-light mb-4">{t.aboutSafetyTitle}</h3>
              <div className="w-12 h-px bg-border mb-6 group-hover:bg-secondary transition-colors duration-500"></div>
              <p className="text-muted-foreground font-light leading-relaxed flex-1">{t.aboutSafetyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOTRE ÉQUIPE */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
            <div className="max-w-2xl">
              <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
                Expertise
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-light tracking-tighter">
                {t.ourTeamTitle}
              </h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-border"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {t.teamMembers.map((membre: { nom: string; role: string; description: string; image: string }, index: number) => (
              <div key={index} className="bg-background group relative flex flex-col p-8 md:p-10">
                <div className="relative aspect-3/4 w-full mb-8 overflow-hidden">
                  <Image
                    src={membre.image}
                    alt={t.teamMemberAlt.replace('{name}', membre.nom).replace('{role}', membre.role)}
                    fill
                    className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-foreground font-light tracking-tight mb-2">{membre.nom}</h3>
                <p className="font-sans uppercase tracking-widest text-[10px] text-secondary font-medium mb-6">{membre.role}</p>
                <p className="text-muted-foreground font-light text-sm leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
                  {membre.description}
                </p>
                {/* On mobile, always show description */}
                <p className="text-muted-foreground font-light text-sm leading-relaxed block md:hidden">
                  {membre.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHIE */}
      <section className="py-32 px-6 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl font-serif text-secondary opacity-30 mb-8 block leading-none">"</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground font-light tracking-tighter leading-tight mb-12">
            {t.philosophyTitle}
          </h2>
          <div className="space-y-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <p>{t.philosophyText1}</p>
            <p>{t.philosophyText2}</p>
          </div>
          <div className="mt-16 flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-border"></div>
            <span className="font-script text-3xl text-foreground">Pure Wind</span>
            <div className="w-16 h-px bg-border"></div>
          </div>
        </div>
      </section>

    </main>
  );
}
