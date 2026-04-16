import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact – Pure Wind Kite School | Diego Suarez, Madagascar",
  description:
    "Contactez Pure Wind Kite School par téléphone (+261 37 71 473 00), email ou WhatsApp. Baie de Sakalava, Antsiranana (Diego Suarez), Madagascar. Réponse rapide garantie.",
  keywords: [
    "contact école kitesurf Madagascar",
    "téléphone kitesurf Diego Suarez",
    "réserver cours kitesurf Madagascar",
    "WhatsApp Pure Wind Kite School",
    "kitesurf Antsiranana contact",
  ],
  openGraph: {
    title: "Contactez Pure Wind Kite School – Kitesurf Diego Suarez Madagascar",
    description:
      "Par téléphone, email ou WhatsApp – contactez-nous pour réserver votre cours de kitesurf à la Baie de Sakalava.",
    url: "https://purewindkiteschool.vercel.app/contact",
    images: [
      {
        url: "/images/IMG-20260304-WA0028.jpg",
        width: 800,
        height: 600,
        alt: "Contact Pure Wind Kite School – Baie de Sakalava, Diego Suarez",
      },
    ],
  },
  alternates: {
    canonical: "https://purewindkiteschool.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}