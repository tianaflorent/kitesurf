import type { Metadata } from "next";
import ReservationContent from "./ReservationContent";

export const metadata: Metadata = {
  title: "Réserver un Cours de Kitesurf | Pure Wind Kite School Madagascar",
  description:
    "Réservez votre cours de kitesurf à la Baie de Sakalava, Diego Suarez. Débutants bienvenus ! Matériel fourni, instructeurs certifiés. Disponible 7j/7.",
  keywords: [
    "réservation cours kitesurf Madagascar",
    "réserver kitesurf Diego Suarez",
    "booking kitesurf Baie de Sakalava",
    "kitesurf Antsiranana réservation",
  ],
  openGraph: {
    title: "Réservez votre Cours de Kitesurf – Pure Wind Kite School Madagascar",
    description:
      "Réservez rapidement votre session de kitesurf à la Baie de Sakalava, Diego Suarez. Débutants et avancés bienvenus.",
    url: "https://purewindkiteschool.vercel.app/reservation",
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
    canonical: "https://purewindkiteschool.vercel.app/reservation",
  },
};

export default function ReservationPage() {
  return <ReservationContent />;
}