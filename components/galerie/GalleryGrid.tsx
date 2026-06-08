import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryItem } from "./types";

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}

/**
 * Grille de galerie avec animation et effet hover.
 */
export default function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  return (
    <section className="bg-background pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-sm">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => onImageClick(index)}
              className="bg-background group relative aspect-square md:aspect-3/4 overflow-hidden cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover opacity-90 md:opacity-70 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                <span className="text-secondary font-heading uppercase tracking-[0.15em] text-[10px] font-bold mb-2 block">
                  Pure Wind
                </span>
                <h3 className="font-heading text-xl text-foreground font-bold tracking-tight">{item.category}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
