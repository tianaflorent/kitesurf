import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary, ServiceKey } from "./types";
import { getFullExperienceLabel, getViewDetailsLabel } from "./utils";

interface OtherServicesSectionProps {
  t: CoursDictionary;
  lang: Locale;
  onSelectService: (service: ServiceKey) => void;
}

/**
 * Section présentant les services additionnels (excursions, hébergement).
 */
export default function OtherServicesSection({
  t,
  lang,
  onSelectService,
}: OtherServicesSectionProps) {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 relative">
          <span className="text-secondary font-sans uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
            {getFullExperienceLabel(lang)}
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-foreground font-serif tracking-tighter">
            {t.otherServices}
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group cursor-pointer" onClick={() => onSelectService("excursions")}>
            <div className="absolute -inset-4 border border-border translate-x-4 translate-y-4 z-0 hidden md:block transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden z-10">
              <Image
                src="/images/IMG-20260305-WA0006.jpg"
                alt="Excursions Madagascar"
                fill
                className="object-cover md:grayscale-20 md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-md p-8 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif mb-3 tracking-tight">{t.excursions}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-2">
                    {t.excursionsDesc}
                  </p>
                </div>
                <span className="text-secondary uppercase tracking-widest text-[10px] mt-6 md:group-hover:text-foreground transition-colors">
                  {getViewDetailsLabel(lang)} &rarr;
                </span>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer md:mt-32" onClick={() => onSelectService("accommodation")}>
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
                  <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-2">
                    {t.accommodationDesc}
                  </p>
                </div>
                <span className="text-secondary uppercase tracking-widest text-[10px] mt-6 md:group-hover:text-foreground transition-colors">
                  {getViewDetailsLabel(lang)} &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
