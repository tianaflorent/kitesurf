import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import { LocalBusinessJsonLd, FAQJsonLd } from "./components/JsonLd";

export const metadata: Metadata = {
  title: "Cours de Kitesurf à Diego Suarez Madagascar | Pure Wind Kite School",
  description:
    "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Nord de Madagascar. Cours pour débutants et avancés, tout le matériel est fourni. Réservez dès maintenant !",
  openGraph: {
    title: "Cours de Kitesurf à Diego Suarez Madagascar | Pure Wind Kite School",
    description:
      "Découvrez le kitesurf dans les eaux cristallines de la Baie de Sakalava, Diego Suarez. Cours pour tous niveaux, matériel certifié fourni.",
    url: "https://purewindkiteschool.vercel.app",
    images: [
      {
        url: "/images/IMG-20260304-WA0043.jpg",
        width: 800,
        height: 600,
        alt: "Kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar",
      },
    ],
  },
  alternates: {
    canonical: "https://purewindkiteschool.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FAQJsonLd />
      <HomeContent />
    </>
  );
}
