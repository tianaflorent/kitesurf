import { navTranslations } from "./nav";
import { homeTranslations } from "./home";
import { contactTranslations } from "./contact";
import { coursTranslations } from "./cours";
import { galerieTranslations } from "./galerie";
import { aproposTranslations } from "./apropos";
import { faqTranslations } from "./faq";
import { reservationTranslations } from "./reservation";

export const dictionaries = {
  FR: {
    nav: navTranslations.FR,
    home: homeTranslations.FR,
    contact: contactTranslations.FR,
    cours: coursTranslations.FR,
    galerie: galerieTranslations.FR,
    apropos: aproposTranslations.FR,
    faq: faqTranslations.FR,
    reservation: reservationTranslations.FR,
  },
  EN: {
    nav: navTranslations.EN,
    home: homeTranslations.EN,
    contact: contactTranslations.EN,
    cours: coursTranslations.EN,
    galerie: galerieTranslations.EN,
    apropos: aproposTranslations.EN,
    faq: faqTranslations.EN,
    reservation: reservationTranslations.EN,
  },
} as const;

export type Dictionary = typeof dictionaries.FR;
