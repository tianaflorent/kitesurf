"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Dictionary } from "@/context/translations";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import ImgCoursHero from "@/public/images/cours/courHero.jpg"

export default function CoursContent({ dictionary, lang }: { dictionary: Dictionary["cours"], lang: string }) {
  const t = dictionary;
  const [selectedService, setSelectedService] = useState<'excursions' | 'accommodation' | null>(null);

  // Empêcher le scroll quand la modale est ouverte
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedService]);

  const equipments = [
    { title: t.kite, desc: t.kiteDesc, img: "/images/best-ts-2016-8m.jpg", alt: "Cerf-volant (kite)" },
    { title: t.bar, desc: t.barDesc, img: "/images/fone-atom-bar-2026.jpg", alt: "Barre de contrôle" },
    { title: t.lines, desc: t.linesDesc, img: "/images/lignes-de-kitesurf-adaptables-toutes-marques.jpg", alt: "Lignes" },
    { title: t.board, desc: t.boardDesc, img: "/images/5760.jpg", alt: "Planche twintip" },
    { title: t.straps, desc: t.strapsDesc, img: "/images/Kiteboards-2-Foot-Pad-2-Foot-Strap-Accessory-Set-Deck-Pad-Set-for-Kite-Surf-Accessories.jpg", alt: "Straps" },
    { title: t.harness, desc: t.harnessDesc, img: "/images/harnais-kitesurf-ceinture-homme-prolimit-addict.jpg", alt: "Harnais" },
    { title: t.vest, desc: t.vestDesc, img: "/images/IMG-20260305-WA0004.jpg", alt: "Gilet" },
    { title: t.helmet, desc: t.helmetDesc, img: "/images/121084_1.jpg", alt: "Casque" },
    { title: t.wetsuit, desc: t.wetsuitDesc, img: "/images/star-5-3-frontzip-combinaison-neoprene-287937.jpg", alt: "Combinaison" },
  ];

  return (
    <main className="bg-background overflow-hidden pb-0">
      
      {/* 1. HERO INVITATION */}
      <section className="relative min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src={ImgCoursHero}
            alt="Kitesurf Courses Sakalava Bay"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
              {lang === 'fr' ? 'La Pédagogie' : 'The Pedagogy'}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-light tracking-tighter leading-[0.9]">
              {t.heroTitle}
            </h1>
          </div>
          <div className="max-w-md md:text-right border-l md:border-l-0 md:border-r border-secondary/30 pl-6 md:pl-0 md:pr-6">
            <p className="text-lg text-white/90 font-light leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORMULES (Débutant, Intermédiaire, Avancé) */}
      <section className="py-32 px-6 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
            
            {/* Débutant */}
            <div className="relative group flex flex-col">
              <div className="mb-8 relative aspect-[4/3] overflow-hidden">
                <Image src="/images/IMG-20260304-WA0024.jpg" fill alt="Débutant" className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-secondary font-script text-4xl mb-4">01</span>
                <h2 className="text-3xl font-serif text-foreground font-light tracking-tight mb-4">{t.beginnerTitle}</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">{t.beginnerDesc}</p>
                <div className="space-y-4 mb-12 border-l border-border pl-6">
                  <p className="text-sm font-light text-foreground">{t.beginner1}</p>
                  <p className="text-sm font-light text-foreground">{t.beginner2}</p>
                  <p className="text-sm font-light text-foreground">{t.beginner3}</p>
                </div>
                <Link href={`/${lang}/reservation`} className="inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
                  {t.reserve}
                </Link>
              </div>
            </div>

            {/* Intermédiaire */}
            <div className="relative group flex flex-col lg:mt-16">
              <div className="mb-8 relative aspect-[4/3] overflow-hidden">
                <Image src="/images/IMG-20260304-WA0042.jpg" fill alt="Intermédiaire" className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-secondary font-script text-4xl mb-4">02</span>
                <h2 className="text-3xl font-serif text-foreground font-light tracking-tight mb-4">{t.intermediateTitle}</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">{t.intermediateDesc}</p>
                <div className="space-y-4 mb-12 border-l border-border pl-6">
                  <p className="text-sm font-light text-foreground">{t.intermediate1}</p>
                  <p className="text-sm font-light text-foreground">{t.intermediate2}</p>
                  <p className="text-sm font-light text-foreground">{t.intermediate3}</p>
                  <p className="text-sm font-light text-foreground">{t.intermediate4}</p>
                </div>
                <Link href={`/${lang}/reservation`} className="inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-colors">
                  {t.reserve}
                </Link>
              </div>
            </div>

            {/* Avancé */}
            <div className="relative group flex flex-col lg:mt-32">
              <div className="mb-8 relative aspect-[4/3] overflow-hidden">
                <Image src="/images/IMG-20260304-WA0029.jpg" fill alt="Avancé" className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-secondary font-script text-4xl mb-4">03</span>
                <h2 className="text-3xl font-serif text-foreground font-light tracking-tight mb-4">{t.advancedTitle}</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">{t.advancedDesc}</p>
                <div className="space-y-4 mb-12 border-l border-border pl-6">
                  <p className="text-sm font-light text-foreground">{t.advanced1}</p>
                  <p className="text-sm font-light text-foreground">{t.advanced2}</p>
                  <p className="text-sm font-light text-foreground">{t.advanced3}</p>
                  <p className="text-sm font-light text-foreground">{t.advanced4}</p>
                </div>
                <Link href={`/${lang}/reservation`} className="inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
                  {t.reserve}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EQUIPEMENT */}
      <section className="py-32 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
                {lang === 'fr' ? 'Le Matériel' : 'The Gear'}
              </span>
              <h2 className="text-5xl md:text-6xl font-serif text-foreground font-light tracking-tighter mb-6">{t.equipmentTitle}</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">{t.equipmentDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border">
            {equipments.map((item) => (
              <div key={item.title} className="bg-background group relative aspect-[3/4] overflow-hidden flex flex-col justify-end p-6">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover opacity-80 md:opacity-60 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent"></div>
                <div className="relative z-10">
                  <span className="text-secondary font-script text-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 absolute -top-8 -left-2 hidden md:inline">+</span>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-foreground font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-[10px] md:text-xs font-light opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 h-auto md:h-0 md:group-hover:h-auto overflow-hidden">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AUTRES SERVICES */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 relative">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
              {lang === 'fr' ? 'Expérience complète' : 'Full Experience'}
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-foreground font-serif tracking-tighter">
              {t.otherServices}
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-24 items-center">
            
            {/* Excursions */}
            <div className="relative group cursor-pointer" onClick={() => setSelectedService('excursions')}>
              <div className="absolute -inset-4 border border-border translate-x-4 translate-y-4 z-0 hidden md:block transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden z-10">
                <Image
                  src="/images/IMG-20260305-WA0006.jpg"
                  alt="Excursions Madagascar"
                  fill
                  className="object-cover md:grayscale-[20%] md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-md p-8 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif mb-3 tracking-tight">{t.excursions}</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-2">{t.excursionsDesc}</p>
                  </div>
                  <span className="text-secondary uppercase tracking-widest text-[10px] mt-6 md:group-hover:text-foreground transition-colors">
                    {lang === 'fr' ? 'Voir les détails' : 'View details'} &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Hébergement */}
            <div className="relative group cursor-pointer md:mt-32" onClick={() => setSelectedService('accommodation')}>
              <div className="absolute -inset-4 border border-secondary/30 -translate-x-4 translate-y-4 z-0 hidden md:block transition-all duration-500 group-hover:-translate-x-6 group-hover:translate-y-6" />
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden z-10">
                <Image
                  src="/images/IMG-20260305-WA0005.jpg"
                  alt="Hébergement Sakalava"
                  fill
                  className="object-cover md:grayscale-[20%] md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-8 left-8 right-8 bg-background/95 backdrop-blur-md p-8 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif mb-3 tracking-tight">{t.accommodation}</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-2">{t.accommodationDesc}</p>
                  </div>
                  <span className="text-secondary uppercase tracking-widest text-[10px] mt-6 md:group-hover:text-foreground transition-colors">
                    {lang === 'fr' ? 'Voir les détails' : 'View details'} &rarr;
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setSelectedService(null)} />
            
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>

              <div className="w-full md:w-1/2 relative h-64 md:h-full">
                <Image
                  src={selectedService === 'excursions' ? "/images/IMG-20260305-WA0006.jpg" : "/images/IMG-20260305-WA0005.jpg"}
                  alt={selectedService === 'excursions' ? "Excursions" : "Hébergement"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
                  {lang === 'fr' ? 'Détails du service' : 'Service Details'}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter mb-8">
                  {selectedService === 'excursions' ? t.excursions : t.accommodation}
                </h2>
                
                <div className="w-12 h-px bg-primary mb-8" />

                <p className="text-muted-foreground font-light leading-loose mb-12 text-lg">
                  {selectedService === 'excursions' ? t.excursionsDesc : t.accommodationDesc}
                </p>

                <div className="mt-auto">
                  <Link 
                    href={`/${lang}/contact`} 
                    onClick={() => setSelectedService(null)}
                    className="inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {lang === 'fr' ? 'Nous contacter pour réserver' : 'Contact us to book'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
