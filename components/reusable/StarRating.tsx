"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  size?: number;
  onChange?: (value: number) => void;
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
