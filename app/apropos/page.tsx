import type { Metadata } from "next";
import AproposContent from "./AproposContent";

export const metadata: Metadata = {
  title: "À propos – Pure Wind Kite School | École de Kitesurf Madagascar",
  description:
    "Découvrez l'histoire de Pure Wind Kite School, notre équipe d'instructeurs passionnés et nos valeurs. École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Madagascar.",
  keywords: [
    "à propos école kitesurf Madagascar",
    "instructeurs kitesurf Diego Suarez",
    "Pure Wind Kite School histoire",
    "équipe kitesurf Antsiranana",
  ],
  openGraph: {
    title: "À propos de Pure Wind Kite School Madagascar",
    description:
      "Notre histoire, notre équipe et nos valeurs. École de kitesurf à la Baie de Sakalava, Madagascar.",
    url: "https://purewindkiteschool.vercel.app/apropos",
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
    canonical: "https://purewindkiteschool.vercel.app/apropos",
  },
};

export default function AproposPage() {
  return <AproposContent />;
}