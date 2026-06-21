import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary } from "./types";
import ImgCoursHero from "@/public/images/cours/courHero.jpg";
import { getPedagogyLabel } from "./utils";

interface CoursHeroSectionProps {
  t: CoursDictionary;
  lang: Locale;
}

/**
 * Section hero de la page Cours avec image de fond et titre.
 */
export default function CoursHeroSection({ t, lang }: CoursHeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-32">
      <div className="absolute inset-0 z-0">
        <Image src={ImgCoursHero} alt="Kitesurf Courses Sakalava Bay" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
        <div className="max-w-3xl">
          <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            {getPedagogyLabel(lang)}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-extrabold tracking-tight leading-[1.1]">
            {t.heroTitle}
          </h1>
        </div>
        <div className="max-w-md md:text-right border-l md:border-l-0 md:border-r border-secondary/30 pl-6 md:pl-0 md:pr-6">
          <p className="text-lg text-white/90 font-light leading-relaxed">{t.heroDesc}</p>
        </div>
      </div>
    </section>
  );
}
