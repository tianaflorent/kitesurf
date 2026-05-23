import type { Metadata } from "next";
import AproposContent from "./AproposContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "À propos – Pure Wind Kite School | École de Kitesurf Madagascar"
      : "About Us – Pure Wind Kite School | Kitesurfing School Madagascar",
    description: isFr
      ? "Découvrez l'histoire de Pure Wind Kite School, notre équipe d'instructeurs passionnés et nos valeurs. École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Madagascar."
      : "Discover the history of Pure Wind Kite School, our team of passionate instructors and our values. Kitesurfing school in Sakalava Bay, Antsiranana (Diego Suarez), Madagascar.",
    keywords: [
      "à propos école kitesurf Madagascar",
      "instructeurs kitesurf Diego Suarez",
      "Pure Wind Kite School histoire",
      "équipe kitesurf Antsiranana",
    ],
    openGraph: {
      title: isFr 
        ? "À propos de Pure Wind Kite School Madagascar"
        : "About Pure Wind Kite School Madagascar",
      description: isFr
        ? "Notre histoire, notre équipe et nos valeurs. École de kitesurf à la Baie de Sakalava, Madagascar."
        : "Our history, our team and our values. Kitesurfing school in Sakalava Bay, Madagascar.",
      url: `https://purewindkiteschool.vercel.app/${lang}/apropos`,
      images: [
        {
          url: "/images/IMG-20260304-WA0037.jpg",
          width: 800,
          height: 600,
          alt: "Équipe Pure Wind Kite School – instructeurs à Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `https://purewindkiteschool.vercel.app/${lang}/apropos`,
    },
  };
}

export default async function AproposPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <AproposContent dictionary={dict.apropos} />;
}