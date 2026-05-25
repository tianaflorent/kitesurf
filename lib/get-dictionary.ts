import { dictionaries, type Dictionary } from "@/context/translations";
import type { Locale } from "@/i18n-config";

export const getDictionary = (locale: Locale): Dictionary => {
  return (dictionaries[locale] ?? dictionaries.fr) as unknown as Dictionary;
};
