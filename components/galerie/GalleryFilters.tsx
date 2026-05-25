import { motion } from "motion/react";
import type { Category } from "./types";

interface GalleryFiltersProps {
  categories: Category[];
  active: string;
  onFilterChange: (value: string) => void;
}

/**
 * Composant de filtres pour la galerie avec animation.
 */
export default function GalleryFilters({ categories, active, onFilterChange }: GalleryFiltersProps) {
  return (
    <section className="px-6 py-12 md:py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-8 md:gap-12 w-max mx-auto px-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onFilterChange(cat.value)}
              className={`relative uppercase tracking-[0.2em] text-xs transition-colors py-4 ${
                active === cat.value
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground font-light"
              }`}
            >
              {cat.name}
              {active === cat.value && (
                <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
