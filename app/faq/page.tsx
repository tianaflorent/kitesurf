import type { Metadata } from "next";
import React from "react";
import { FAQJsonLd } from "../components/JsonLd";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ – Questions fréquentes Kitesurf Madagascar | Pure Wind Kite School",
  description:
    "Toutes les réponses à vos questions sur les cours de kitesurf à Diego Suarez : équipement, réservation, âge minimum, assurance, paiement. Pure Wind Kite School Madagascar.",
  keywords: [
    "FAQ kitesurf Madagascar",
    "questions kitesurf Diego Suarez",
    "foire aux questions kitesurf",
    "renseignements école kitesurf Antsiranana",
  ],
  openGraph: {
    title: "FAQ – Foire aux Questions Kitesurf | Pure Wind Kite School Madagascar",
    description:
      "Réponses à toutes vos questions sur nos cours de kitesurf à la Baie de Sakalava, Diego Suarez.",
    url: "https://purewindkiteschool.vercel.app/faq",
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
    canonical: "https://purewindkiteschool.vercel.app/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd />
      <FAQContent />
    </>
  );
}