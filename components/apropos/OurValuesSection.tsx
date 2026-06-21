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
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
            {t.ourValuesTitle}
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-6 rounded-full" />
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
    <div className="flex flex-col group bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-md transition-all duration-300">
      <span className="text-3xl font-heading font-extrabold text-secondary/30 mb-6 group-hover:text-secondary/60 transition-colors duration-300">
        {num}
      </span>
      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight mb-4">{title}</h3>
      <div className="w-10 h-1 bg-secondary mb-6 rounded-full group-hover:w-16 transition-all duration-500"></div>
      <p className="text-muted-foreground font-light leading-relaxed flex-1">{desc}</p>
    </div>
  );
}
