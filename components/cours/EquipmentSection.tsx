import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary, EquipmentItem } from "./types";
import { getGearLabel } from "./utils";

interface EquipmentSectionProps {
  t: CoursDictionary;
  lang: Locale;
  equipments: EquipmentItem[];
  onSelectEquipment: (item: EquipmentItem) => void;
}

/**
 * Section présentant le matériel de kitesurf avec grille interactive.
 */
export default function EquipmentSection({
  t,
  lang,
  equipments,
  onSelectEquipment,
}: EquipmentSectionProps) {
  return (
    <section className="py-32 px-6 bg-muted/20 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
              {getGearLabel(lang)}
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-foreground font-light tracking-tighter mb-6">
              {t.equipmentTitle}
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">{t.equipmentDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border">
          {equipments.map((item) => (
            <div
              key={item.title}
              onClick={() => onSelectEquipment(item)}
              className="bg-background group relative aspect-[3/4] overflow-hidden flex flex-col justify-end p-6 cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className="object-cover opacity-80 md:opacity-60 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-secondary font-script text-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 absolute -top-8 -left-2 hidden md:inline">
                  +
                </span>
                <h3 className="font-sans text-xs uppercase tracking-widest text-foreground font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs font-light hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
