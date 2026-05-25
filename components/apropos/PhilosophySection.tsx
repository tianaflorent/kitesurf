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
  );
}
