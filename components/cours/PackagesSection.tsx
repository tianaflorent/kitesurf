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
      bullets: [t.beginner1, t.beginner2, t.beginner3],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors",
    },
    {
      key: "intermediate",
      index: "02",
      wrapperClassName: "relative group flex flex-col lg:mt-16",
      imageSrc: "/images/IMG-20260304-WA0042.jpg",
      imageAlt: "Intermédiaire",
      title: t.intermediateTitle,
      description: t.intermediateDesc,
      bullets: [t.intermediate1, t.intermediate2, t.intermediate3, t.intermediate4],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-colors",
    },
    {
      key: "advanced",
      index: "03",
      wrapperClassName: "relative group flex flex-col lg:mt-32",
      imageSrc: "/images/IMG-20260304-WA0029.jpg",
      imageAlt: "Avancé",
      title: t.advancedTitle,
      description: t.advancedDesc,
      bullets: [t.advanced1, t.advanced2, t.advanced3, t.advanced4],
      ctaClassName:
        "inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors",
    },
  ];

  return (
    <section className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
          {packages.map((pkg) => (
            <div key={pkg.key} className={pkg.wrapperClassName}>
              <div className="mb-8 relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.imageSrc}
                  fill
                  alt={pkg.imageAlt}
                  className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-secondary font-script text-4xl mb-4">{pkg.index}</span>
                <h2 className="text-3xl font-serif text-foreground font-light tracking-tight mb-4">{pkg.title}</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">{pkg.description}</p>
                <div className="space-y-4 mb-12 border-l border-border pl-6">
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
