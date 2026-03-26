"use client";

import { ShieldCheck, Smile, TrendingUp, Users, MapPin, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="pb-20">

      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/VID-20260304-WA0046~2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10  flex flex-col justify-center text-center h-full px-4 text-white max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">{t.heroTitle}</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">{t.heroSubtitle}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/reservation" className="bg-blue-800 text-center hover:bg-blue-900 transition text-white py-3 px-6 rounded-xl font-semibold shadow-lg">{t.bookButton}</Link>
            <Link href="/cours" className="border text-center border-white bg-amber-100 text-black hover:bg-amber-200 transition py-3 px-6 rounded-xl">{t.coursesButton}</Link>
          </div>
        </div>
      </section>

      {/* ================= VALEURS ================= */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-800">{t.valuesTitle}</h2>
          <p className="mt-4 text-black max-w-2xl mx-auto">{t.valuesDesc}</p>
          <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard Icon={TrendingUp} iconBg="bg-blue-600 group-hover:bg-green-600" iconColor="text-white group-hover:text-white" title={t.progressionTitle} desc={t.progressionDesc} />
            <ValueCard Icon={ShieldCheck} iconBg="bg-red-600 group-hover:bg-blue-600" iconColor="text-white group-hover:text-white" title={t.safetyTitle} desc={t.safetyDesc} />
            <ValueCard Icon={Smile} iconBg="bg-yellow-500 group-hover:bg-yellow-500" iconColor="text-yellow-100 group-hover:text-black" title={t.funTitle} desc={t.funDesc} />
          </div>
        </div>
      </section>

      {/* ================= LOCALISATION ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800">{t.locationTitle}</h2>
            <p className="mt-6 text-black leading-relaxed">{t.locationDesc}</p>
            <div className="flex items-center gap-3 mt-6 text-blue-600">
              <MapPin size={20} />
              <span>Baie de Sakalava, Diego Suarez, Madagascar</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">

            <Image src="/images/IMG-20260304-WA0043.jpg" alt="Baie Sakalava" width={800} height={320} className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* ================= GALERIE ================= */}
      <section className="py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-800">{t.galleryTitle}</h2>
            <p className="mt-4 text-black max-w-2xl mx-auto">{t.galleryDesc}</p>
          </div>
          <GallerySlider t={t} />
        </div>
      </section>

      {/* ================= COMMUNAUTÉ ================= */}
      <section className="py-20 px-6 text-black text-center bg-linear-to-b from-white to-blue-100 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <Users size={40} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold">{t.communityTitle}</h2>
          <p className="mt-6 text-black">{t.communityDesc}</p>
          <Link href="/contact">
          <button className="mt-30 bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition">{t.bookNow}</button>
          </Link>
        </div>
      </section>

      {/* ================= TÉMOIGNAGES ================= */}
      <section className="py-10 px-6 bg-linear-to-b from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto">
          <TestimonialsSection t={t} />
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */
interface ValueCardProps {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
}

function ValueCard({ Icon, iconBg, iconColor, title, desc }: ValueCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full ${iconBg} transition`}>
        <Icon className={`${iconColor}`} size={28} />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-blue-800">{title}</h3>
      <p className="mt-3 text-black">{desc}</p>
    </div>
  );
}

import { TranslationType } from "@/context/translations";

function GallerySlider({ t }: { t: TranslationType }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 scrollbar-hide">
        {["IMG-20260304-WA0042.jpg", "IMG-20260304-WA0029.jpg", "IMG-20260304-WA0024.jpg"].map((img, i) => (
          <div key={i} className="snap-center shrink-0 w-[80%] sm:w-[60%] lg:w-[30%] rounded-2xl overflow-hidden shadow-lg group">
            <Image src={`/images/${img}`} alt={`Kitesurf ${i}`} width={800} height={320} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
          </div>
        ))}
        <div className="snap-center shrink-0 w-[80%] sm:w-[60%] lg:w-[30%] rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer">
          <Image src="/images/IMG-20260304-WA0038.jpg" alt="Voir plus" width={800} height={320} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Link href="/galerie" className="text-white text-xl md:text-2xl font-bold border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">{t.morephoto}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
