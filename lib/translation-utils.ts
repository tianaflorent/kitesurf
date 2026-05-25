import type { Locale } from "@/i18n-config";

/**
 * Utilitaires de traduction centralisés pour éviter la duplication de code.
 * Ces fonctions sont utilisées dans plusieurs composants et pages.
 */

export function getLabelByLang(lang: Locale, frLabel: string, enLabel: string): string {
  return lang === "fr" ? frLabel : enLabel;
}

// Labels pour la page Cours
export function getPedagogyLabel(lang: Locale): string {
  return getLabelByLang(lang, "La Pédagogie", "The Pedagogy");
}

export function getGearLabel(lang: Locale): string {
  return getLabelByLang(lang, "Le Matériel", "The Gear");
}

export function getFullExperienceLabel(lang: Locale): string {
  return getLabelByLang(lang, "Expérience complète", "Full Experience");
}

export function getViewDetailsLabel(lang: Locale): string {
  return getLabelByLang(lang, "Voir les détails", "View details");
}

export function getServiceDetailsLabel(lang: Locale): string {
  return getLabelByLang(lang, "Détails du service", "Service Details");
}

export function getContactToBookLabel(lang: Locale): string {
  return getLabelByLang(lang, "Nous contacter pour réserver", "Contact us to book");
}

export function getEquipmentBrandLabel(lang: Locale): string {
  return getLabelByLang(lang, "Équipement Pure Wind", "Pure Wind Gear");
}

export function getCloseLabel(lang: Locale): string {
  return getLabelByLang(lang, "Fermer", "Close");
}

// Labels pour les formulaires
export function getFormLabel(lang: Locale): string {
  return getLabelByLang(lang, "Formulaire", "Form");
}

export function getPaymentLabel(lang: Locale): string {
  return getLabelByLang(lang, "Paiement", "Payment");
}

export function getMobilePaymentLabel(lang: Locale): string {
  return getLabelByLang(lang, "Paiement mobile", "Mobile payment");
}

export function getOnSiteLabel(lang: Locale): string {
  return getLabelByLang(lang, "Sur place", "On site");
}

export function getAssistanceLabel(lang: Locale): string {
  return getLabelByLang(lang, "Assistance", "Support");
}

export function getLoadingLabel(lang: Locale): string {
  return getLabelByLang(lang, "Chargement...", "Loading...");
}

// Labels pour les boutons et actions
export function getBookLabel(lang: Locale): string {
  return getLabelByLang(lang, "Réserver", "Book");
}

export function getBackLabel(lang: Locale): string {
  return getLabelByLang(lang, "Retour", "Back");
}

export function getSendLabel(lang: Locale): string {
  return getLabelByLang(lang, "Envoyer", "Send");
}

export function getPreparingLabel(lang: Locale): string {
  return getLabelByLang(lang, "Préparation...", "Preparing...");
}
