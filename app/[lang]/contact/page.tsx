import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Contact – Pure Wind Kite School | Diego Suarez, Madagascar"
      : "Contact – Pure Wind Kite School | Diego Suarez, Madagascar",
    description: isFr
      ? "Contactez Pure Wind Kite School par téléphone (+261 37 71 473 00), email ou WhatsApp. Baie de Sakalava, Antsiranana (Diego Suarez), Madagascar. Réponse rapide garantie."
      : "Contact Pure Wind Kite School by phone (+261 37 71 473 00), email or WhatsApp. Sakalava Bay, Antsiranana (Diego Suarez), Madagascar. Quick response guaranteed.",
    keywords: [
      "contact école kitesurf Madagascar",
      "téléphone kitesurf Diego Suarez",
      "réserver cours kitesurf Madagascar",
      "WhatsApp Pure Wind Kite School",
      "kitesurf Antsiranana contact",
    ],
    openGraph: {
      title: isFr 
        ? "Contactez Pure Wind Kite School – Kitesurf Diego Suarez Madagascar"
        : "Contact Pure Wind Kite School – Kitesurfing Diego Suarez Madagascar",
      description: isFr
        ? "Par téléphone, email ou WhatsApp – contactez-nous pour réserver votre cours de kitesurf à la Baie de Sakalava."
        : "By phone, email or WhatsApp - contact us to book your kitesurfing course in Sakalava Bay.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/contact`,
      images: [
        {
          url: "/images/IMG-20260304-WA0028.jpg",
          width: 800,
          height: 600,
          alt: "Contact Pure Wind Kite School – Baie de Sakalava, Diego Suarez",
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <ContactContent dictionary={dict.contact} />;
}