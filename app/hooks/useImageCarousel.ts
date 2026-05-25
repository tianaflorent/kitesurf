"use client";

import { useState, useEffect } from "react";

interface UseImageCarouselProps {
  /** Liste des URLs d'images */
  images: string[];
  /** Intervalle en millisecondes entre chaque image (défaut: 4000) */
  interval?: number;
}

/**
 * Hook personnalisé pour un carrousel d'images automatique.
 * Fait défiler les images à intervalle régulier.
 * 
 * @param props - Configuration du carrousel
 * @returns currentIndex - L'index de l'image actuellement affichée
 */
export default function useImageCarousel({ images, interval = 4000 }: UseImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const carouselInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(carouselInterval);
  }, [images.length, interval]);

  return currentIndex;
}
