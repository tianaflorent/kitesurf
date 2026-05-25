import type { AproposDictionary } from "./types";

interface OurValuesSectionProps {
  t: AproposDictionary;
}

/**
 * Section "Nos Valeurs" avec les 3 valeurs clés.
 */
export default function OurValuesSection({ t }: OurValuesSectionProps) {
  return (
    <section className="py-24 md:py-32 px-6 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            Engagement
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter">
            {t.ourValuesTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <ValueCard num="01" title={t.passionTitle} desc={t.passionDesc} />
          <ValueCard num="02" title={t.environmentTitle} desc={t.environmentDesc} />
          <ValueCard num="03" title={t.aboutSafetyTitle} desc={t.aboutSafetyDesc} />
        </div>
      </div>
    </section>
  );
}

interface ValueCardProps {
  num: string;
  title: string;
  desc: string;
}

function ValueCard({ num, title, desc }: ValueCardProps) {
  return (
    <div className="flex flex-col group">
      <span className="text-5xl font-script text-secondary mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
        {num}
      </span>
      <h3 className="text-2xl font-serif text-foreground font-light mb-4">{title}</h3>
      <div className="w-12 h-px bg-border mb-6 group-hover:bg-secondary transition-colors duration-500"></div>
      <p className="text-muted-foreground font-light leading-relaxed flex-1">{desc}</p>
    </div>
  );
}
