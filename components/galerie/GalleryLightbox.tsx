import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useBodyScrollLock from "@/app/hooks/useBodyScrollLock";
import useKeyboardNavigation from "@/app/hooks/useKeyboardNavigation";
import type { GalleryItem } from "./types";

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Lightbox pour la galerie avec navigation clavier et boutons.
 */
export default function GalleryLightbox({
  items,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  useBodyScrollLock(selectedIndex !== null);
  useKeyboardNavigation({
    selectedIndex: selectedIndex ?? 0,
    totalCount: items.length,
    onSelectIndex: (index) => {
      if (selectedIndex === null) return;
      if (index === selectedIndex) return;
      if (index < selectedIndex) {
        onPrevious();
      } else {
        onNext();
      }
    },
    onClose,
  });

  if (selectedIndex === null) return null;

  const currentItem = items[selectedIndex];

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-6"
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full pointer-events-auto">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-0 md:right-0 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
              aria-label="Fermer"
            >
              <X size={24} strokeWidth={1} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  onClick={onPrevious}
                  className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={24} strokeWidth={1} />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors pointer-events-auto"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={24} strokeWidth={1} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-auto">
              <span className="inline-block bg-background/50 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-widest text-foreground font-light">
                {selectedIndex + 1} / {items.length} — {currentItem.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
