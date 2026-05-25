"use client";

import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  /** Index actuellement sélectionné */
  selectedIndex: number | null;
  /** Nombre total d'éléments */
  totalCount: number;
  /** Callback quand on change l'index */
  onSelectIndex: (index: number) => void;
  /** Callback pour fermer (ex: Escape) */
  onClose?: () => void;
}

/**
 * Hook personnalisé pour la navigation au clavier dans une liste/galerie.
 * Supporte les flèches gauche/droite et Escape pour fermer.
 * 
 * @param props - Configuration de la navigation clavier
 */
export default function useKeyboardNavigation({
  selectedIndex,
  totalCount,
  onSelectIndex,
  onClose,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        onSelectIndex(selectedIndex === 0 ? totalCount - 1 : selectedIndex - 1);
      } else if (e.key === "ArrowRight") {
        onSelectIndex(selectedIndex === totalCount - 1 ? 0 : selectedIndex + 1);
      } else if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, totalCount, onSelectIndex, onClose]);
}
