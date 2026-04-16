"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiHeart, FiGlobe, FiShield } from "react-icons/fi";

export default function AproposContent() {
  const images = [
    "/images/IMG-20260304-WA0033.jpg",
    "/images/IMG-20260304-WA0025.jpg",
    "/images/IMG-20260304-WA0038.jpg",
    "/images/IMG-20260304-WA0039.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const imagesCount = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagesCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [imagesCount]);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Entête avec images défilantes */}
      <section className="relative h-96 w-full overflow-hidden">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`École de kitesurf Pure Wind à Diego Suarez, Madagascar – photo ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            À propos de Pure Wind Kite School Madagascar
          </h1>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center">Notre histoire</h2>
          <p className="text-black mb-6">
            Pure Wind Mada Kiteschool est née de la passion pour le kitesurf
            et le désir de partager cette expérience unique à Madagascar.
            Notre objectif est de rendre le kitesurf accessible à tous dans
            un environnement sûr et professionnel.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/IMG-20260304-WA0037.jpg"
            alt="L'histoire de Pure Wind Kite School – école de kitesurf à la Baie de Sakalava, Madagascar"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Passion</h3>
              <p className="text-black text-sm">Nous aimons ce que nous faisons et transmettons notre passion à tous nos élèves.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-green-600 p-4 rounded-full mb-4">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Respect de l&apos;environnement</h3>
              <p className="text-black text-sm">Nous pratiquons le kitesurf de manière responsable en respectant nos plages et notre écosystème.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-red-600 p-4 rounded-full mb-4">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sécurité</h3>
              <p className="text-black text-sm">La sécurité est notre priorité. Nos cours et équipements garantissent une expérience sûre pour tous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Notre équipe</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[
              { nom: "Jean Rakoto", role: "Instructeur principal", description: "Passionné de kitesurf depuis 10 ans, Jean guide les débutants et avancés avec patience et expertise.", image: "/images/IMG-20260304-WA0022.jpg" },
              { nom: "Lina Andriam", role: "Instructrice", description: "Experte en sécurité aquatique, Lina assure le bon déroulement des cours et la sécurité des élèves.", image: "/images/IMG-20260304-WA0020.jpg" },
              { nom: "Hery Rabe", role: "Coordinateur", description: "Hery organise les sessions, le matériel et les excursions locales pour une expérience optimale.", image: "/images/IMG-20260304-WA0016.jpg" },
              { nom: "Miora Fidy", role: "Support", description: "Disponible pour répondre à toutes vos questions et assister l'équipe pendant les cours.", image: "/images/IMG-20260304-WA0013.jpg" },
            ].map((membre, index) => (
              <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6">
                <div className="relative w-36 h-36 overflow-hidden rounded-full mb-4">
                  <Image
                    src={membre.image}
                    alt={`${membre.nom} – ${membre.role} à Pure Wind Kite School, Diego Suarez`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{membre.nom}</h3>
                <p className="text-cyan-600 font-medium mb-2">{membre.role}</p>
                <p className="text-black text-sm text-center">{membre.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">Notre Philosophie</h2>
            <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              À la <span className="font-semibold text-gray-900">Pure Wind Kite School Madagascar</span>,
              nous pensons que le kitesurf doit être accessible à tous. Chaque élève progresse à
              son rythme, accompagné par des instructeurs expérimentés et attentifs.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Nous mettons l&apos;accent sur une expérience complète où l&apos;apprentissage se fait
              dans un environnement sécurisé, motivant et agréable.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Foire aux questions (FAQ)</h2>
          <div className="space-y-6">
            {[
              { q: "Faut-il savoir nager pour commencer le kitesurf ?", a: "Non, nos instructeurs encadrent les débutants et fournissent toutes les instructions pour évoluer en toute sécurité, même si vous ne savez pas nager parfaitement." },
              { q: "À partir de quel âge peut-on suivre les cours ?", a: "Nos cours sont adaptés aux enfants dès 10 ans et aux adultes. Chaque session est personnalisée selon le niveau et l'âge de l'élève." },
              { q: "Le matériel est-il fourni ?", a: "Oui, tout le matériel nécessaire (kite, planche, harnais, gilet, combinaison) est fourni et adapté à chaque niveau pour votre confort et sécurité." },
              { q: "Que se passe-t-il en cas de mauvais temps ?", a: "La sécurité est notre priorité. Si les conditions météorologiques ne sont pas favorables, nous reportons la session ou proposons une alternative adaptée." },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl shadow p-6 cursor-pointer group">
                <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
                  <div className="flex justify-between w-full items-center">
                    <span>{item.q}</span>
                    <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
                  </div>
                  <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/faq" className="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-cyan-500 transition">
              Voir plus de questions
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
