import type { Metadata } from "next";
import CoursContent from "./CoursContent";
import { CourseListJsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Cours de Kitesurf – Débutant, Intermédiaire, Avancé | Pure Wind Madagascar",
  description:
    "Nos cours de kitesurf à la Baie de Sakalava (Diego Suarez) s'adaptent à tous les niveaux. Débutant, intermédiaire ou avancé – tout le matériel (kite, planche, harnais) est fourni.",
  keywords: [
    "cours kitesurf Madagascar",
    "leçon kitesurf Diego Suarez",
    "kitesurf débutant Madagascar",
    "apprendre kitesurf Antsiranana",
    "école kitesurf Baie de Sakalava",
  ],
  openGraph: {
    title: "Cours de Kitesurf à Diego Suarez | Pure Wind Kite School Madagascar",
    description:
      "Cours de kitesurf pour tous niveaux à la Baie de Sakalava, Diego Suarez. Matériel certifié fourni, instructeurs expérimentés.",
    url: "https://purewindkiteschool.vercel.app/cours",
    images: [
      {
        url: "/images/IMG-20260304-WA0026.jpg",
        width: 800,
        height: 600,
        alt: "Cours de kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar",
      },
    ],
  },
  alternates: {
    canonical: "https://purewindkiteschool.vercel.app/cours",
  },
};

export default function CoursPage() {
  return (
    <>
      <CourseListJsonLd />
      <CoursContent />
    </>
  );
}