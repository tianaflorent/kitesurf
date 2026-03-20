// /faq/page.tsx
"use client";

import React from "react";

export default function FAQPage() {
  return (
    <section className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Foire aux questions
        </h1>

        <div className="space-y-6">

          {/* Question 1 */}
          <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
            <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
              <div className="flex justify-between w-full items-center">
                <span>Comment réserver un cours de kitesurf ?</span>
                <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
              </div>
              <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
            </summary>
            <p className="mt-3 text-gray-600">
              Vous pouvez réserver directement sur notre site via le formulaire de réservation ou nous contacter par téléphone ou email.
            </p>
          </details>

          {/* Question 2 */}
          <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
            <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
              <div className="flex justify-between w-full items-center">
                <span>Quels équipements dois-je apporter ?</span>
                <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
              </div>
              <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
            </summary>
            <p className="mt-3 text-gray-600">
              Vous devez apporter un maillot de bain, des chaussures d’eau si souhaité, et une serviette. Tout le reste est fourni.
            </p>
          </details>

          {/* Question 3 */}
          <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
            <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
              <div className="flex justify-between w-full items-center">
                <span>Faut-il avoir une assurance ?</span>
                <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
              </div>
              <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
            </summary>
            <p className="mt-3 text-gray-600">
              Il est recommandé d’avoir une assurance responsabilité civile ou sportive, mais ce n’est pas obligatoire pour débuter.
            </p>
          </details>

          {/* Question 4 */}
          <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
            <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
              <div className="flex justify-between w-full items-center">
                <span>Proposez-vous des cours pour enfants ?</span>
                <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
              </div>
              <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
            </summary>
            <p className="mt-3 text-gray-600">
              Oui, nous avons des cours adaptés dès 10 ans, avec des instructeurs formés pour encadrer les enfants.
            </p>
          </details>

          {/* Question 5 */}
          <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
            <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
              <div className="flex justify-between w-full items-center">
                <span>Quels sont les moyens de paiement acceptés ?</span>
                <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
              </div>
              <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
            </summary>
            <p className="mt-3 text-gray-600">
              Nous acceptons les paiements en espèces, par carte bancaire.
            </p>
          </details>

        </div>

        {/* Bouton "Retour à l'accueil" ou autre lien */}
        <div className="mt-10 text-center">
          <a
            href="/apropos" 
            className="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-cyan-500 transition"
          >
            Retour
          </a>
        </div>

      </div>
    </section>
  );
}