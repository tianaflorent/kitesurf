import Image from "next/image";
import useImageCarousel from "@/app/hooks/useImageCarousel";
import type { AproposDictionary } from "./types";

interface AproposHeroSectionProps {
  t: AproposDictionary;
}

/**
 * Section hero de la page À propos avec carousel d'images en arrière-plan.
 */
export default function AproposHeroSection({ t }: AproposHeroSectionProps) {
  const images = [
    "/images/IMG-20260304-WA0033.jpg",
    "/images/IMG-20260304-WA0025.jpg",
    "/images/IMG-20260304-WA0038.jpg",
    "/images/IMG-20260304-WA0039.jpg",
  ];

  const currentImage = useImageCarousel({ images, interval: 4000 });

  return (
    <section className="relative min-h-[80vh] flex items-end pb-32">
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={t.aboutImageAlt.replace("{index}", String(index + 1))}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-2000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
        <div className="max-w-4xl">
          <span className="text-secondary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            {t.aboutTitle}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-extrabold tracking-tight leading-[1.1] mb-8">
            Pure Wind Kite School
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 pb-4">
          <span className="w-12 h-1 bg-secondary rounded-full"></span>
          <span className="text-secondary font-heading font-bold text-lg uppercase tracking-widest">Notre Histoire</span>
        </div>
      </div>
    </section>
  );
}
