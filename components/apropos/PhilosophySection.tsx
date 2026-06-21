import type { AproposDictionary } from "./types";

interface PhilosophySectionProps {
  t: AproposDictionary;
}

/**
 * Section "Philosophie" avec citation et branding.
 */
export default function PhilosophySection({ t }: PhilosophySectionProps) {
  return (
    <section className="py-32 px-6 bg-muted border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-secondary/40 font-heading font-extrabold text-8xl mb-4 block leading-none select-none">&ldquo;</span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground tracking-tight leading-snug mb-12">
          {t.philosophyTitle}
        </h2>
        <div className="space-y-8 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
          <p>{t.philosophyText1}</p>
          <p>{t.philosophyText2}</p>
        </div>
        <div className="mt-16 flex items-center justify-center gap-6">
          <div className="w-12 h-1 bg-secondary rounded-full"></div>
          <span className="font-heading font-bold text-lg tracking-widest uppercase text-foreground">Pure Wind</span>
          <div className="w-12 h-1 bg-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
