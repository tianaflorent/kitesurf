"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  /** Note actuelle (0-5) */
  rating: number;
  /** Si true, les étoiles sont cliquables */
  interactive?: boolean;
  /** Taille des étoiles (px) */
  size?: number;
  /** Callback appelé quand l'utilisateur clique sur une étoile */
  onChange?: (value: number) => void;
  /** État de survol interne (géré par le parent si interactive) */
  hover?: number;
  onHoverChange?: (value: number) => void;
}

/**
 * Composant étoiles réutilisable.
 * - Mode affichage (interactive=false) : montre la note en lecture seule.
 * - Mode interactif (interactive=true) : permet à l'utilisateur de noter.
 */
export default function StarRating({
  rating,
  interactive = false,
  size = 20,
  onChange,
  hover = 0,
  onHoverChange,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`transition-colors ${
            (hover || rating) >= star
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={interactive && onChange ? () => onChange(star) : undefined}
          onMouseEnter={
            interactive && onHoverChange ? () => onHoverChange(star) : undefined
          }
          onMouseLeave={
            interactive && onHoverChange ? () => onHoverChange(0) : undefined
          }
        />
      ))}
    </div>
  );
}
