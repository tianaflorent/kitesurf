import Image from "next/image";
import type { AproposDictionary } from "./types";

interface OurStorySectionProps {
  t: AproposDictionary;
}

/**
 * Section "Notre Histoire" avec image et texte.
 */
export default function OurStorySection({ t }: OurStorySectionProps) {
  return (
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
  );
}
