"use client";

import { useEffect } from "react";

/**
 * Hook personnalisé pour verrouiller le défilement du body.
 * Utile pour les modals, lightboxes et autres overlays.
 * 
 * @param isLocked - Si true, verrouille le défilement du body
 */
export default function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocked]);
}
