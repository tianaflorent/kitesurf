"use client";

import { useState, useEffect } from "react";
import { FiHeart, FiGlobe, FiShield } from "react-icons/fi";
import { ShieldCheck, Smile, TrendingUp } from "lucide-react";

export default function AproposPage() {
  // Liste des images pour l'entête
  const images = [
    "/images/IMG-20260304-WA0033.jpg",
    "/images/IMG-20260304-WA0025.jpg",
    "/images/IMG-20260304-WA0038.jpg",
    "/images/IMG-20260304-WA0039.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Changement d'image toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // 3000ms = 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Entête avec images défilantes */}
      <section className="relative h-96 w-full overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Header ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            À propos de Pure Wind kite school Mada
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
          <img
            src="/images/IMG-20260304-WA0037.jpg"
            alt="Notre Histoire"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Nos valeurs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Passion */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Passion</h3>
              <p className="text-black text-sm">
                Nous aimons ce que nous faisons et transmettons notre passion
                à tous nos élèves.
              </p>
            </div>

            {/* Respect de l’environnement */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-green-600 p-4 rounded-full mb-4">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Respect de l’environnement</h3>
              <p className="text-black text-sm">
                Nous pratiquons le kitesurf de manière responsable en respectant
                nos plages et notre écosystème.
              </p>
            </div>

            {/* Sécurité */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-red-600 p-4 rounded-full mb-4">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sécurité</h3>
              <p className="text-black text-sm">
                La sécurité est notre priorité. Nos cours et équipements
                garantissent une expérience sûre pour tous.
              </p>
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
        {
          nom: "Jean Rakoto",
          role: "Instructeur principal",
          description:
            "Passionné de kitesurf depuis 10 ans, Jean guide les débutants et avancés avec patience et expertise.",
          image: "/images/IMG-20260304-WA0022.jpg",
        },
        {
          nom: "Lina Andriam",
          role: "Instructrice",
          description:
            "Experte en sécurité aquatique, Lina assure le bon déroulement des cours et la sécurité des élèves.",
          image: "/images/IMG-20260304-WA0020.jpg",
        },
        {
          nom: "Hery Rabe",
          role: "Coordinateur",
          description:
            "Hery organise les sessions, le matériel et les excursions locales pour une expérience optimale.",
          image: "/images/IMG-20260304-WA0016.jpg",
        },
        {
          nom: "Miora Fidy",
          role: "Support",
          description:
            "Disponible pour répondre à toutes vos questions et assister l’équipe pendant les cours.",
          image: "/images/IMG-20260304-WA0013.jpg",
        },
      ].map((membre, index) => (
        <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6">
          
          {/* Image cliquable */}
          <div
            className="relative group cursor-pointer w-36 h-36 overflow-hidden rounded-full mb-4"
            onClick={() => {
              const modal = document.getElementById("modal-equipe");
              const modalImg = document.getElementById("modal-img") as HTMLImageElement;
              if (modal && modalImg) {
                modal.style.display = "flex";
                modalImg.src = membre.image;
              }
            }}
          >
            <img
              src={membre.image}
              alt={membre.nom}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
              <span className="text-white font-semibold">Voir</span>
            </div>
          </div>

          {/* Nom et rôle */}
          <h3 className="font-semibold text-lg mb-1">{membre.nom}</h3>
          <p className="text-cyan-600 font-medium mb-2">{membre.role}</p>

          {/* Description */}
          <p className="text-black text-sm text-center">{membre.description}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Modal pour agrandir l'image */}
  <div
    id="modal-equipe"
    className="hidden fixed inset-0 bg-black/70 items-center justify-center z-50"
    onClick={(e) => {
      const target = e.target as HTMLDivElement;
      if (target.id === "modal-equipe") target.style.display = "none";
    }}
  >
    <img
      id="modal-img"
      src=""
      alt="Membre équipe"
      className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
    />
  </div>
</section>

        {/* Philosophie */}

<section className="bg-white py-24">
  <div className="max-w-6xl mx-auto px-6">

    {/* Titre */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold">
        Notre Philosophie
      </h2>

      <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
    </div>

    {/* Texte principal */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
        À la <span className="font-semibold text-gray-900">Kitesurf School Madagascar</span>, 
        nous pensons que le kitesurf doit être accessible à tous. Chaque élève progresse à 
        son rythme, accompagné par des instructeurs expérimentés et attentifs.
      </p>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Nous mettons l’accent sur une expérience complète où l’apprentissage se fait 
        dans un environnement sécurisé, motivant et agréable.
      </p>
    </div>

    

  </div>
</section>




<section className="bg-gray-50 py-20">
  <div className="max-w-6xl mx-auto px-6">
    {/* Titre */}
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      Foire aux questions (FAQ)
    </h2>

    <div className="space-y-6">

      {/* Questions existantes */}
      <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
        <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
          <div className="flex justify-between w-full items-center">
            <span>Faut-il savoir nager pour commencer le kitesurf ?</span>
            <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
          </div>
          <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
        </summary>
        <p className="mt-3 text-gray-600">
          Non, nos instructeurs encadrent les débutants et fournissent toutes les instructions pour évoluer en toute sécurité, même si vous ne savez pas nager parfaitement.
        </p>
      </details>

      <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
        <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
          <div className="flex justify-between w-full items-center">
            <span>À partir de quel âge peut-on suivre les cours ?</span>
            <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
          </div>
          <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
        </summary>
        <p className="mt-3 text-gray-600">
          Nos cours sont adaptés aux enfants dès 10 ans et aux adultes. Chaque session est personnalisée selon le niveau et l’âge de l’élève.
        </p>
      </details>

      <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
        <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
          <div className="flex justify-between w-full items-center">
            <span>Le matériel est-il fourni ?</span>
            <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
          </div>
          <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
        </summary>
        <p className="mt-3 text-gray-600">
          Oui, tout le matériel nécessaire (kite, planche, harnais, gilet, combinaison) est fourni et adapté à chaque niveau pour votre confort et sécurité.
        </p>
      </details>

      <details className="bg-white rounded-xl shadow p-6 cursor-pointer group">
        <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
          <div className="flex justify-between w-full items-center">
            <span>Que se passe-t-il en cas de mauvais temps ?</span>
            <span className="transition-transform group-open:rotate-45 text-cyan-600">+</span>
          </div>
          <span className="text-cyan-600 text-sm mt-1">voir la réponse</span>
        </summary>
        <p className="mt-3 text-gray-600">
          La sécurité est notre priorité. Si les conditions météorologiques ne sont pas favorables, nous reportons la session ou proposons une alternative adaptée.
        </p>
      </details>

    </div>

    {/* Bouton "Voir plus de questions" */}
    <div className="mt-10 text-center">
      <a
        href="/faq" 
        className="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-cyan-500 transition"
      >
        Voir plus de questions
      </a>
    </div>
  </div>
</section>



    </main>
  );
}