import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary } from "./types";

interface PricingSectionProps {
  t: CoursDictionary;
  lang: Locale;
}

/**
 * Section tarifaire dédiée — présente les prix de manière scannable
 * dans un layout horizontal compact séparé des descriptions de cours.
 */
export default function PricingSection({ t, lang }: PricingSectionProps) {
  const getPricingLabel = (lang: Locale) =>
    lang === "fr" ? "Tarifs" : "Pricing";
  const getFromLabel = (lang: Locale) =>
    lang === "fr" ? "à partir de" : "from";
  const getPerHourLabel = (lang: Locale) =>
    lang === "fr" ? "/ heure" : "/ hour";

  return (
    <section className="py-28 px-6 bg-muted/10 relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-linear-to-b from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-20">
          <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            {getPricingLabel(lang)}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
            {t.pricePerPerson}
          </h2>
        </div>

        {/* Pricing grid — 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Débutant / Intermédiaire card */}
          <div className="group relative bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-secondary/40 transition-colors duration-500">
            <div className="mb-8">
              <span className="text-secondary/40 font-heading font-extrabold text-2xl block mb-1">01 — 02</span>
              <h3 className="text-xl font-heading font-bold text-foreground tracking-tight">
                {t.beginnerTitle} & {t.intermediateTitle}
              </h3>
            </div>

            <div className="space-y-0 flex-1">
              {[
                { duration: "1h", price: "46 €" },
                { duration: "2h", price: "92 €" },
                { duration: "6h", price: "258 €" },
                { duration: "10h", price: "410 €" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-4 ${
                    i > 0 ? "border-t border-border/50" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground font-light">{item.duration}</span>
                  <span className="text-lg font-heading font-semibold text-foreground">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70 text-center">
              {getFromLabel(lang)} 46 € {getPerHourLabel(lang)}
            </p>
          </div>

          {/* Avancé — highlighted card */}
          <div className="group relative bg-foreground text-background rounded-2xl p-8 flex flex-col shadow-xl">
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-secondary text-secondary-foreground text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-1.5 rounded-full">
                {lang === "fr" ? "Expert" : "Expert"}
              </span>
            </div>

            <div className="mb-8 mt-2">
              <span className="text-secondary/60 font-heading font-extrabold text-2xl block mb-1">03</span>
              <h3 className="text-xl font-heading font-bold tracking-tight">
                {t.advancedTitle}
              </h3>
            </div>

            <div className="space-y-0 flex-1">
              {[
                { duration: "1h", price: "47 €" },
                { duration: "2h", price: "94 €" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-4 ${
                    i > 0 ? "border-t border-background/10" : ""
                  }`}
                >
                  <span className="text-sm font-light opacity-70">{item.duration}</span>
                  <span className="text-lg font-heading font-semibold">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs opacity-50 text-center">
              {getFromLabel(lang)} 47 € {getPerHourLabel(lang)}
            </p>
          </div>

          {/* Location card */}
          <div className="group relative bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-secondary/40 transition-colors duration-500">
            <div className="mb-8">
              <span className="text-secondary/40 font-heading font-extrabold text-2xl block mb-1">+</span>
              <h3 className="text-xl font-heading font-bold text-foreground tracking-tight">
                {t.rentalTitle}
              </h3>
            </div>

            <div className="space-y-0 flex-1">
              {[
                { duration: lang === "fr" ? "½ journée" : "Half day", price: "45 €" },
                { duration: lang === "fr" ? "1 journée" : "1 day", price: "65 €" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-4 ${
                    i > 0 ? "border-t border-border/50" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground font-light">{item.duration}</span>
                  <span className="text-lg font-heading font-semibold text-foreground">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70 text-center leading-relaxed">
              {t.rentalContact}
            </p>
          </div>
        </div>

        {/* Bottom CTA + souvenir photo mention */}
        <div className="text-center space-y-8">
          <p className="text-muted-foreground font-light flex items-center justify-center gap-3 text-sm">
            <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t.rentalEndPhrase}
          </p>

          <Link
            href={`/${lang}/reservation`}
            className="inline-block uppercase tracking-[0.15em] text-xs px-12 py-5 bg-primary text-primary-foreground border-2 border-primary rounded-full font-heading font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {t.reserve}
          </Link>
        </div>
      </div>
    </section>
  );
}
