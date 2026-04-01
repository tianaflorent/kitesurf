import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";

export const metadata: Metadata = {
  title: "Galerie Photos – Kitesurf à la Baie de Sakalava Madagascar",
  description:
    "Explorez notre galerie de photos et vidéos de kitesurf à la Baie de Sakalava, Diego Suarez (Antsiranana), Madagascar. Paysages, figures, apprentissage et navigation.",
  keywords: [
    "galerie kitesurf Madagascar",
    "photos kitesurf Diego Suarez",
    "Baie de Sakalava photos",
    "kitesurf Antsiranana images",
    "spot kitesurf Madagascar paysage",
  ],
  openGraph: {
    title: "Galerie Kitesurf – Baie de Sakalava, Diego Suarez, Madagascar",
    description:
      "Découvrez nos photos de kitesurf dans les eaux cristallines de la Baie de Sakalava, Diego Suarez.",
    url: "https://purewindkiteschool.vercel.app/galerie",
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
    canonical: "https://purewindkiteschool.vercel.app/galerie",
  },
};

export default function GaleriePage() {
  return <GalerieContent />;
}