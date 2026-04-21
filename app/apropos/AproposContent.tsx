"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiHeart, FiGlobe, FiShield } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { dictionaries } from "@/context/translations";

export default function AproposContent() {
  const { lang } = useLanguage();
  const t = dictionaries[lang].apropos;
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
            alt={t.aboutImageAlt.replace('{index}', String(index + 1))}
            fill
            className={`object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            {t.aboutTitle}
          </h1>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center">{t.ourStoryTitle}</h2>
          <p className="text-black mb-6">
            {t.ourStoryText}
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/IMG-20260304-WA0037.jpg"
            alt={t.ourStoryImageAlt}
            width={600}
            height={400}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t.ourValuesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t.passionTitle}</h3>
              <p className="text-black text-sm">{t.passionDesc}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-green-600 p-4 rounded-full mb-4">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t.environmentTitle}</h3>
              <p className="text-black text-sm">{t.environmentDesc}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-red-600 p-4 rounded-full mb-4">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t.aboutSafetyTitle}</h3>
              <p className="text-black text-sm">{t.aboutSafetyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t.ourTeamTitle}</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {t.teamMembers.map((membre: { nom: string; role: string; description: string; image: string }, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6">
                <div className="relative w-36 h-36 overflow-hidden rounded-full mb-4">
                  <Image
                    src={membre.image}
                    alt={t.teamMemberAlt.replace('{name}', membre.nom).replace('{role}', membre.role)}
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
            <h2 className="text-3xl md:text-4xl font-bold">{t.philosophyTitle}</h2>
            <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {t.philosophyText1}
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {t.philosophyText2}
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}
