import type { Metadata } from "next";
import React from "react";
import { FAQJsonLd } from "../components/JsonLd";

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

const faqItems = [
  {
    question: "Comment réserver un cours de kitesurf ?",
    answer: "Vous pouvez réserver directement sur notre site via le formulaire de réservation ou nous contacter par téléphone ou email.",
  },
  {
    question: "Quels équipements dois-je apporter ?",
    answer: "Vous devez apporter un maillot de bain, des chaussures d'eau si souhaité, et une serviette. Tout le reste est fourni.",
  },
  {
    question: "Faut-il avoir une assurance ?",
    answer: "Il est recommandé d'avoir une assurance responsabilité civile ou sportive, mais ce n'est pas obligatoire pour débuter.",
  },
  {
    question: "Proposez-vous des cours pour enfants ?",
    answer: "Oui, nous avons des cours adaptés dès 10 ans, avec des instructeurs formés pour encadrer les enfants.",
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les paiements en espèces, par carte bancaire.",
  },
  {
    question: "Faut-il savoir nager pour commencer le kitesurf ?",
    answer: "Non, nos instructeurs encadrent les débutants et fournissent toutes les instructions pour évoluer en toute sécurité.",
  },
  {
    question: "Quelle est la saison idéale pour le kitesurf à Madagascar ?",
    answer: "La Baie de Sakalava bénéficie de vents constants quasi toute l'année. La saison principale est de mai à décembre avec des vents réguliers et forts.",
  },
  {
    question: "Combien coûte un cours de kitesurf ?",
    answer: "Contactez-nous directement pour obtenir nos tarifs actuels. Des forfaits dégressifs sont disponibles pour plusieurs sessions.",
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd />
      <section className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Foire aux questions – Kitesurf Diego Suarez Madagascar
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Toutes les réponses à vos questions sur les cours de kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details key={i} className="bg-white rounded-xl shadow p-6 cursor-pointer group">
              <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
                <div className="flex justify-between w-full items-center">
                  <span>{item.question}</span>
                  <span className="transition-transform group-open:rotate-45 text-cyan-600 ml-4 shrink-0">+</span>
                </div>
                <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
              </summary>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/apropos" className="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-cyan-500 transition">
            Retour
          </a>
        </div>
      </div>
    </section>
    </>
  );
}