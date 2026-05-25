"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import useBodyScrollLock from "@/app/hooks/useBodyScrollLock";

interface ModalProps {
  /** Si le modal est ouvert */
  isOpen: boolean;
  /** Callback quand on ferme le modal */
  onClose: () => void;
  /** Contenu du modal */
  children: ReactNode;
  /** Classes supplémentaires pour le container */
  className?: string;
  /** Z-index du modal (défaut: 100) */
  zIndex?: string;
}

/**
 * Composant Modal réutilisable avec animation et verrouillage du scroll.
 * Utilise motion/react pour les animations et useBodyScrollLock pour empêcher le scroll du body.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  zIndex = "z-[100]",
}: ModalProps) {
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4 sm:p-6 md:p-12`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`relative w-full max-w-5xl bg-background border border-border shadow-2xl overflow-hidden ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={1} />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
