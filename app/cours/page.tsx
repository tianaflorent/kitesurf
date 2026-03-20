"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translationCours } from "@/context/translationcours";

export default function CoursPage() {

  const { lang } = useLanguage();
  const t = translationCours[lang];

  const equipments = [
    {
      title: t.kite,
      desc: t.kiteDesc,
      img: "/images/best-ts-2016-8m.jpg",
    },
    {
      title: t.bar,
      desc: t.barDesc,
      img: "/images/fone-atom-bar-2026.jpg",
    },
    {
      title: t.lines,
      desc: t.linesDesc,
      img: "/images/lignes-de-kitesurf-adaptables-toutes-marques.jpg",
    },
    {
      title: t.board,
      desc: t.boardDesc,
      img: "/images/5760.jpg",
    },
    {
      title: t.straps,
      desc: t.strapsDesc,
      img: "/images/Kiteboards-2-Foot-Pad-2-Foot-Strap-Accessory-Set-Deck-Pad-Set-for-Kite-Surf-Accessories.jpg",
    },
    {
      title: t.harness,
      desc: t.harnessDesc,
      img: "/images/harnais-kitesurf-ceinture-homme-prolimit-addict.jpg",
    },
    {
      title: t.vest,
      desc: t.vestDesc,
      img: "/images/IMG-20260305-WA0004.jpg",
    },
    {
      title: t.helmet,
      desc: t.helmetDesc,
      img: "/images/121084_1.jpg",
    },
    {
      title: t.wetsuit,
      desc: t.wetsuitDesc,
      img: "/images/star-5-3-frontzip-combinaison-neoprene-287937.jpg",
    },
  ];

  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section
        className="relative h-80 flex items-center"
        style={{
          backgroundImage: "url('/images/IMG-20260304-WA0026.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.heroTitle}
          </h1>

          <p className="text-lg md:text-xl max-w-xl text-gray-200">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* COURS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        {/* Débutant */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            {t.beginnerTitle}
          </h2>

          <p className="text-black mb-6">
            {t.beginnerDesc}
          </p>

          <ul className="space-y-3 text-black mb-6">
            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.beginner1}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.beginner2}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.beginner3}
            </li>
          </ul>

          <Link
            href="/reservation"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition inline-block text-center font-semibold"
          >
            {t.reserve}
          </Link>
        </div>

        {/* Intermédiaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            {t.intermediateTitle}
          </h2>

          <p className="text-black mb-6">
            {t.intermediateDesc}
          </p>

          <ul className="space-y-3 text-black mb-6">
            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.intermediate1}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.intermediate2}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.intermediate3}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.intermediate4}
            </li>
          </ul>

          <Link
            href="/reservation"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition inline-block text-center font-semibold"
          >
            {t.reserve}
          </Link>
        </div>

        {/* Avancé */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            {t.advancedTitle}
          </h2>

          <p className="text-black mb-6">
            {t.advancedDesc}
          </p>

          <ul className="space-y-3 text-black mb-6">
            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.advanced1}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.advanced2}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.advanced3}
            </li>

            <li className="flex gap-2">
              <CheckCircle className="text-cyan-600" />
              {t.advanced4}
            </li>
          </ul>

          <Link
            href="/reservation"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition inline-block text-center font-semibold"
          >
            {t.reserve}
          </Link>
        </div>

      </section>

      {/* EQUIPEMENTS */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.equipmentTitle}
            </h2>

            <p className="text-black max-w-2xl mx-auto">
              {t.equipmentDesc}
            </p>
          </div>

          <div className="mb-16">
            <img
              src="/images/IMG-20260305-WA0002.jpg"
              alt="equipment"
              className="rounded-2xl shadow-lg mx-auto"
            />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {equipments.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto w-30 h-35 object-cover mb-4"
                />

                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-black text-sm">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* AUTRES SERVICES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.otherServices}
          </h2>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">

            {/* Hébergement */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow text-center flex flex-col items-center">
              <img
                src="/images/IMG-20260305-WA0005.jpg"
                alt="accommodation"
                className="w-full max-w-sm h-48 object-cover rounded-2xl mb-4"
              />

              <h3 className="text-xl font-bold mb-2">
                {t.accommodation}
              </h3>

              <p className="text-black">
                {t.accommodationDesc}
              </p>
            </div>

            {/* Excursions */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow text-center flex flex-col items-center">
              <img
                src="/images/IMG-20260305-WA0006.jpg"
                alt="excursions"
                className="w-full max-w-sm h-48 object-cover rounded-2xl mb-4"
              />

              <h3 className="text-xl font-bold mb-2">
                {t.excursions}
              </h3>

              <p className="text-black">
                {t.excursionsDesc}
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}