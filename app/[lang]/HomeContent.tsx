import { MapPin } from "lucide-react";
import Link from "next/link";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n-config";
import { type Dictionary } from "@/context/translations";

const SPOT_IMAGE_SRC = "/images/accueil/spot.jpg";
const HERO_VIDEO_SRC = "/videos/video-hero.mp4";

const GALLERY_IMAGES = [
  { img: "IMG-20260304-WA0042.jpg", alt: "Session de kitesurf à la Baie de Sakalava" },
  { img: "IMG-20260304-WA0029.jpg", alt: "Kiters en action à Diego Suarez, Madagascar" },
  { img: "IMG-20260304-WA0024.jpg", alt: "Cours de kitesurf débutant – Pure Wind Kite School" },
] as const;

interface HomeContentProps {
  dictionary: Dictionary["home"];
  lang: Locale;
}

export default function HomeContent({ dictionary, lang }: HomeContentProps) {
  const t = dictionary;
  return (
    <main className="pb-0 bg-background overflow-hidden">
      <HeroSection t={t} lang={lang} />
      <EditorialIntroSection t={t} />
      <LocationSection t={t} lang={lang} />
      <GallerySection t={t} lang={lang} />
      <CommunitySection t={t} lang={lang} />
      <TestimonialsSectionWrapper t={t} lang={lang} />
    </main>
  );
}

type HomeDictionary = Dictionary["home"];

function HeroSection({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center border-b border-border pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-start text-left px-6 lg:px-12 w-full max-w-7xl mx-auto">
        <span className="font-script text-4xl md:text-6xl text-white mb-6 font-light transform -rotate-2 drop-shadow-md">
          {t.heroTagline}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white tracking-tight leading-[1.1] animate-slide-in-left drop-shadow-lg  max-w-3xl">
          {t.heroTitle}
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 max-w-xl font-sans font-light tracking-wide leading-relaxed">
          {t.heroSubtitle}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="text-xs md:text-sm px-8 py-6 uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all border border-primary"
          >
            <Link href={`/${lang}/reservation`}>{t.bookButton}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-xs md:text-sm px-8 py-6 uppercase tracking-widest bg-transparent text-white border-white/40 hover:bg-white hover:text-black transition-all"
          >
            <Link href={`/${lang}/cours`}>{t.coursesButton}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function EditorialIntroSection({ t }: { t: HomeDictionary }) {
  return (
    <section className="py-32 px-6 relative bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute -left-6 -top-6 w-32 h-32 border-t border-l border-border/60" />
          <h2 className="text-4xl md:text-6xl font-serif text-foreground font-light tracking-tighter leading-tight">
            {t.experienceTitle} <br />
            <span className="font-script text-5xl md:text-7xl text-secondary block mt-2 ml-10">
              {t.experienceSubtitle}
            </span>
          </h2>
          <div className="w-12 h-px bg-primary my-10" />
          <p className="text-muted-foreground text-lg font-light leading-loose tracking-wide">{t.valuesDesc}</p>
        </div>
        <div className="grid grid-cols-1 gap-12 border-l border-border pl-12">
          <EditorialValueCard num="01" title={t.progressionTitle} desc={t.progressionDesc} />
          <EditorialValueCard num="02" title={t.safetyTitle} desc={t.safetyDesc} />
          <EditorialValueCard num="03" title={t.funTitle} desc={t.funDesc} />
        </div>
      </div>
    </section>
  );
}

function LocationSection({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <section className="py-32 px-6 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-5/12 order-2 lg:order-1 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">{t.spotLabel}</span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground font-light leading-[0.9] tracking-tighter mb-8">
            {t.locationTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12">{t.locationDesc}</p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="uppercase tracking-widest text-xs px-8 py-6 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <Link href={`/${lang}/contact`}>{t.discoverSanctuary}</Link>
          </Button>
        </div>

        <div className="lg:w-7/12 order-1 lg:order-2 relative w-full">
          <div className="absolute -inset-4 border border-secondary/30 translate-x-4 translate-y-4 z-0 hidden md:block" />
          <div className="relative aspect-4/3 w-full overflow-hidden z-10">
            <Image
              src={SPOT_IMAGE_SRC}
              alt="Baie de Sakalava vue du ciel"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000 grayscale-20 hover:grayscale-0"
            />
          </div>
          <a
            href="https://www.google.com/maps/place/Baie+de+Sakalava/@-12.2275,49.3775,15z"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-4 left-4 md:-bottom-8 md:-left-8 bg-background py-2 px-3 md:py-4 md:px-6 border border-border z-20 flex items-center gap-2 md:gap-4 shadow-2xl hover:border-secondary transition-colors duration-500 cursor-pointer group/badge"
          >
            <MapPin className="text-secondary group-hover/badge:scale-110 transition-transform w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
            <span className="font-serif italic text-xs md:text-lg tracking-wide">{t.sakalavaBay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-360 mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground font-light tracking-tighter">{t.galleryTitle}</h2>
            <span className="font-script text-4xl text-secondary ml-12">en images</span>
          </div>
          <p className="mt-6 md:mt-0 text-muted-foreground text-lg max-w-md font-light leading-relaxed text-right hidden md:block">
            {t.galleryDesc}
          </p>
        </div>
        <GalleryEditorial t={t} lang={lang} />
      </div>
    </section>
  );
}

function CommunitySection({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <section className="py-32 px-6 relative bg-primary">
      <div className="absolute inset-0 bg-[url('/images/IMG-20260304-WA0042.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      <div className="max-w-4xl mx-auto relative z-10 text-center text-primary-foreground">
        <span className="font-script text-5xl md:text-6xl text-secondary mb-6 block transform -rotate-2">{t.communityTagline}</span>
        <h2 className="text-5xl md:text-7xl font-serif font-light uppercase tracking-tighter mb-10 border-y border-primary-foreground/20 py-8">
          {t.communityTitle}
        </h2>
        <p className="text-xl font-light text-primary-foreground/80 leading-relaxed mb-16 px-4">{t.communityDesc}</p>
        <Button
          asChild
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 uppercase tracking-[0.2em] px-12 py-8 text-sm transition-all border-none"
        >
          <Link href={`/${lang}/contact`}>{t.bookNow}</Link>
        </Button>
      </div>
    </section>
  );
}

function TestimonialsSectionWrapper({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <section className="py-32 px-6 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <TestimonialsSection t={t} lang={lang} />
      </div>
    </section>
  );
}

interface EditorialValueCardProps {
  num: string;
  title: string;
  desc: string;
}

function EditorialValueCard({ num, title, desc }: EditorialValueCardProps) {
  return (
    <div className="group relative">
      <div className="flex items-start gap-6">
        <span className="font-serif text-3xl text-secondary/50 font-light italic mt-1">{num}</span>
        <div>
          <h3 className="text-2xl font-serif text-foreground font-medium tracking-tight mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed font-light">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function GalleryEditorial({ t, lang }: { t: HomeDictionary; lang: Locale }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {GALLERY_IMAGES.map(({ img, alt }, i) => (
        <div key={i} className={`relative aspect-3/4 group overflow-hidden ${i % 2 !== 0 ? "md:mt-16" : ""}`}>
          <Image
            src={`/images/${img}`}
            alt={alt}
            fill
            className="object-cover md:grayscale-30 md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      ))}
      <div className="relative aspect-3/4 group overflow-hidden bg-muted flex items-center justify-center p-8 text-center border border-border hover:border-secondary transition-colors md:mt-16 cursor-pointer">
        <Link href={`/${lang}/galerie`} className="absolute inset-0 z-10" />
        <div>
          <span className="block font-script text-4xl text-secondary mb-4">+</span>
          <span className="block font-serif text-2xl font-light uppercase tracking-widest">{t.morephoto}</span>
        </div>
      </div>
    </div>
  );
}
