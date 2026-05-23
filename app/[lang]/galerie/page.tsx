import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Galerie Photos – Kitesurf à la Baie de Sakalava Madagascar"
      : "Photo Gallery – Kitesurfing in Sakalava Bay Madagascar",
    description: isFr
      ? "Explorez notre galerie de photos et vidéos de kitesurf à la Baie de Sakalava, Diego Suarez (Antsiranana), Madagascar. Paysages, figures, apprentissage et navigation."
      : "Explore our kitesurfing photo and video gallery in Sakalava Bay, Diego Suarez (Antsiranana), Madagascar. Landscapes, tricks, learning and riding.",
    keywords: [
      "galerie kitesurf Madagascar",
      "photos kitesurf Diego Suarez",
      "Baie de Sakalava photos",
      "kitesurf Antsiranana images",
      "spot kitesurf Madagascar paysage",
    ],
    openGraph: {
      title: isFr 
        ? "Galerie Kitesurf – Baie de Sakalava, Diego Suarez, Madagascar"
        : "Kitesurfing Gallery – Sakalava Bay, Diego Suarez, Madagascar",
      description: isFr
        ? "Découvrez nos photos de kitesurf dans les eaux cristallines de la Baie de Sakalava, Diego Suarez."
        : "Discover our kitesurfing photos in the crystal clear waters of Sakalava Bay, Diego Suarez.",
      url: `https://purewindkiteschool.vercel.app/${lang}/galerie`,
      images: [
        {
          url: "/images/IMG-20260305-WA0137.jpg",
          width: 800,
          height: 600,
          alt: "Galerie kitesurf – Baie de Sakalava, Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `https://purewindkiteschool.vercel.app/${lang}/galerie`,
    },
  };
}

export default async function GaleriePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <GalerieContent dictionary={dict.galerie} />;
}