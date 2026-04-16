import type { Metadata } from "next";
import TemoignagesContent from "./TemoignagesContent";

export const metadata: Metadata = {
  title: "Témoignages – Avis Clients Kitesurf Madagascar | Pure Wind Kite School",
  description:
    "Lisez les avis et témoignages de nos élèves sur leurs expériences de kitesurf à la Baie de Sakalava, Diego Suarez. Plus de 50 sessions et des avis 5 étoiles !",
  keywords: [
    "avis kitesurf Madagascar",
    "témoignages école kitesurf Diego Suarez",
    "reviews Pure Wind Kite School",
    "élèves kitesurf Baie de Sakalava",
  ],
  openGraph: {
    title: "Témoignages et Avis – Pure Wind Kite School Madagascar",
    description:
      "Découvrez les expériences de nos élèves à la Baie de Sakalava. Plus de 50 formés, avis 5 étoiles.",
    url: "https://purewindkiteschool.vercel.app/temoignages",
    images: [
      {
        url: "/images/IMG-20260304-WA0043.jpg",
        width: 800,
        height: 600,
        alt: "Témoignages kitesurf – Pure Wind Kite School, Diego Suarez, Madagascar",
      },
    ],
  },
  alternates: {
    canonical: "https://purewindkiteschool.vercel.app/temoignages",
  },
};

export default function TemoignagesPage() {
  return <TemoignagesContent />;
}