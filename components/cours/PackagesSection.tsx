import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary, PackageItem } from "./types";

interface PackagesSectionProps {
  t: CoursDictionary;
  lang: Locale;
}

/**
 * Section des packages de cours (débutant, intermédiaire, avancé).
 * Cards concises axées sur le contenu pédagogique — les tarifs sont dans PricingSection.
 */
export default function PackagesSection({ t, lang }: PackagesSectionProps) {
  const packages: PackageItem[] = [
    {
      key: "beginner",
      index: "01",
      wrapperClassName: "relative group flex flex-col",
      imageSrc: "/images/IMG-20260304-WA0024.jpg",
      imageAlt: "Débutant",
      title: t.beginnerTitle,
      description: t.beginnerDesc,
      bullets: [t.beginner1, t.beginner2, t.beginner3, t.beginner4, t.beginner5, t.beginner6],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-[0.15em] text-xs px-8 py-4 border-2 border-foreground text-foreground rounded-full font-heading font-semibold hover:bg-foreground hover:text-background transition-all active:scale-[0.98]",
    },
    {
      key: "intermediate",
      index: "02",
      wrapperClassName: "relative group flex flex-col lg:mt-16",
      imageSrc: "/images/IMG-20260304-WA0042.jpg",
      imageAlt: "Intermédiaire",
      title: t.intermediateTitle,
      description: t.intermediateDesc,
      bullets: [t.intermediate1, t.intermediate2, t.intermediate3, t.intermediate4, t.intermediate5, t.intermediate6],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-[0.15em] text-xs px-8 py-4 bg-primary text-primary-foreground border-2 border-primary rounded-full font-heading font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]",
    },
    {
      key: "advanced",
      index: "03",
      wrapperClassName: "relative group flex flex-col lg:mt-32",
      imageSrc: "/images/IMG-20260304-WA0029.jpg",
      imageAlt: "Avancé",
      title: t.advancedTitle,
      description: t.advancedDesc,
      bullets: [t.advanced1, t.advanced2, t.advanced3],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-[0.15em] text-xs px-8 py-4 border-2 border-foreground text-foreground rounded-full font-heading font-semibold hover:bg-foreground hover:text-background transition-all active:scale-[0.98]",
    },
  ];

  return (
    <section className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
          {packages.map((pkg) => (
            <div key={pkg.key} className={pkg.wrapperClassName}>
              <Link href={`/${lang}/reservation`} className="mb-8 relative aspect-4/3 overflow-hidden rounded-2xl shadow-md block cursor-pointer">
                <Image
                  src={pkg.imageSrc}
                  fill
                  alt={pkg.imageAlt}
                  className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex-1 flex flex-col">
                <span className="text-secondary/35 font-heading font-extrabold text-3xl mb-2 block">{pkg.index}</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight mb-4">{pkg.title}</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">{pkg.description}</p>
                <div className="space-y-4 mb-12 border-l border-border pl-6 flex-1">
                  {pkg.bullets.map((bullet, i) => (
                    <p key={i} className="text-sm font-light text-foreground">
                      {bullet}
                    </p>
                  ))}
                </div>
                <Link href={`/${lang}/reservation`} className={pkg.ctaClassName}>
                  {t.reserve}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
