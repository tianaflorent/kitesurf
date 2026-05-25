import type { Locale } from "@/i18n-config";
import {
  getPedagogyLabel as getPedagogyLabelUtil,
  getGearLabel as getGearLabelUtil,
  getFullExperienceLabel as getFullExperienceLabelUtil,
  getViewDetailsLabel as getViewDetailsLabelUtil,
  getServiceDetailsLabel as getServiceDetailsLabelUtil,
  getContactToBookLabel as getContactToBookLabelUtil,
  getEquipmentBrandLabel as getEquipmentBrandLabelUtil,
  getCloseLabel as getCloseLabelUtil,
} from "@/lib/translation-utils";

/**
 * Fonctions utilitaires pour les labels traduits de la page Cours.
 * Ces fonctions centralisent la logique de traduction pour éviter la duplication.
 * Elles réexportent les fonctions de translation-utils.ts pour maintenir la compatibilité.
 */

export const getPedagogyLabel = getPedagogyLabelUtil;
export const getGearLabel = getGearLabelUtil;
export const getFullExperienceLabel = getFullExperienceLabelUtil;
export const getViewDetailsLabel = getViewDetailsLabelUtil;
export const getServiceDetailsLabel = getServiceDetailsLabelUtil;
export const getContactToBookLabel = getContactToBookLabelUtil;
export const getEquipmentBrandLabel = getEquipmentBrandLabelUtil;
export const getCloseLabel = getCloseLabelUtil;
