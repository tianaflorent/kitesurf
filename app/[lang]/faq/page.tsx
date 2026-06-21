import type { Metadata } from "next";
import React from "react";
import { FAQJsonLd } from "../../components/JsonLd";
import FAQContent from "./FAQContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "FAQ – Questions fréquentes Kitesurf Madagascar | Pure Wind Kite School"
      : "FAQ – Frequently Asked Questions Kitesurfing Madagascar | Pure Wind Kite School",
    description: isFr
      ? "Toutes les réponses à vos questions sur les cours de kitesurf à Diego Suarez : équipement, réservation, âge minimum, assurance, paiement. Pure Wind Kite School Madagascar."
      : "All answers to your questions about kitesurfing courses in Diego Suarez: equipment, booking, minimum age, insurance, payment. Pure Wind Kite School Madagascar.",
    keywords: [
      "FAQ kitesurf Madagascar",
      "questions kitesurf Diego Suarez",
      "foire aux questions kitesurf",
      "renseignements école kitesurf Antsiranana",
    ],
    openGraph: {
      title: isFr 
        ? "FAQ – Foire aux Questions Kitesurf | Pure Wind Kite School Madagascar"
        : "FAQ – Frequently Asked Questions Kitesurfing | Pure Wind Kite School Madagascar",
      description: isFr
        ? "Réponses à toutes vos questions sur nos cours de kitesurf à la Baie de Sakalava, Diego Suarez."
        : "Answers to all your questions about our kitesurfing courses in Sakalava Bay, Diego Suarez.",
      url: `${SITE_URL}/${lang}/faq`,
      images: [
        {
          url: "/images/IMG-20260304-WA0043.jpg",
          width: 800,
          height: 600,
          alt: "FAQ kitesurf – Pure Wind Kite School Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/faq`,
    },
  };
}

export default async function FAQPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <FAQJsonLd />
      <FAQContent dictionary={dict.faq} lang={lang} />
    </>
  );
}