import type { Metadata } from "next";
import ReservationContent from "./ReservationContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Réserver un Cours de Kitesurf | Pure Wind Kite School Madagascar"
      : "Book a Kitesurfing Course | Pure Wind Kite School Madagascar",
    description: isFr
      ? "Réservez votre cours de kitesurf à la Baie de Sakalava, Diego Suarez. Débutants bienvenus ! Matériel fourni, instructeurs certifiés. Disponible 7j/7."
      : "Book your kitesurfing course in Sakalava Bay, Diego Suarez. Beginners welcome! Equipment provided, certified instructors. Available 7 days a week.",
    keywords: [
      "réservation cours kitesurf Madagascar",
      "réserver kitesurf Diego Suarez",
      "booking kitesurf Baie de Sakalava",
      "kitesurf Antsiranana réservation",
    ],
    openGraph: {
      title: isFr 
        ? "Réservez votre Cours de Kitesurf – Pure Wind Kite School Madagascar"
        : "Book your Kitesurfing Course – Pure Wind Kite School Madagascar",
      description: isFr
        ? "Réservez rapidement votre session de kitesurf à la Baie de Sakalava, Diego Suarez. Débutants et avancés bienvenus."
        : "Quickly book your kitesurfing session in Sakalava Bay, Diego Suarez. Beginners and advanced welcome.",
      url: `${SITE_URL}/${lang}/reservation`,
      images: [
        {
          url: "/images/IMG-20260304-WA0043.jpg",
          width: 800,
          height: 600,
          alt: "Réserver un cours de kitesurf à Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/reservation`,
    },
  };
}

export default async function ReservationPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <ReservationContent dictionary={dict.reservation} lang={lang} />;
}