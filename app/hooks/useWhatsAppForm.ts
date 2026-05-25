"use client";

import { useState } from "react";

interface UseWhatsAppFormProps {
  /** Numéro WhatsApp (sans le +, ex: "261377147300") */
  whatsappNumber: string;
  /** Message template avec placeholders */
  messageTemplate: string;
  /** Données du formulaire */
  formData: Record<string, string | number>;
}

/**
 * Hook personnalisé pour gérer l'envoi de formulaires vers WhatsApp.
 * Gère le loading state et la construction de l'URL WhatsApp.
 * 
 * @param props - Configuration du formulaire WhatsApp
 * @returns Object avec loading state et fonction submit
 */
export default function useWhatsAppForm({
  whatsappNumber,
  messageTemplate,
  formData,
}: UseWhatsAppFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    
    // Remplacer les placeholders dans le template
    let message = messageTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, String(value));
    });

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Petit délai pour l'UX
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
    }, 800);
  };

  return { loading, handleSubmit };
}
