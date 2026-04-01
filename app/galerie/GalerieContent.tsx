"use client";

import { useState } from "react";

import Image from "next/image";
import {
  Menu, Wind, Zap, GraduationCap, Mountain, Package, Grid, Wallet,
} from "lucide-react";
import { dictionaries } from "@/context/translations";
import { useLanguage } from "@/context/LanguageContext";

export default function GalerieContent() {
  const { lang } = useLanguage();
  const t = dictionaries[lang].galerie;

  const categories = [
    { name: t.all, value: "Tous", icon: Grid },
    { name: t.navigation, value: "Navigation", icon: Wind },
    { name: t.tricks, value: "Figures", icon: Zap },
    { name: t.learning, value: "Apprentissage", icon: GraduationCap },
    { name: t.landscapes, value: "Paysages", icon: Mountain },
    { name: t.equipment, value: "Matériel", icon: Package },
    { name: t.tarif, value: "Tarif", icon: Wallet },
  ];

  const gallery = [
    { src: "/images/IMG-20260305-WA0139.jpg", category: "Navigation", alt: "Kitesurf en navigation à la Baie de Sakalava, Diego Suarez" },
    { src: "/images/IMG-20260304-WA0029.jpg", category: "Navigation", alt: "Session de kitesurf sur la baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0006.jpg", category: "Navigation", alt: "Rider de kitesurf en action à Madagascar" },
    { src: "/images/IMG-20260304-WA0010.jpg", category: "Navigation", alt: "Kitesurf avec vue sur les eaux turquoise de Diego Suarez" },
    { src: "/images/IMG-20260304-WA0011.jpg", category: "Navigation", alt: "Planche de kitesurf dans les vagues de la Baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0012.jpg", category: "Navigation", alt: "Kite déployé au-dessus de la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0013.jpg", category: "Navigation", alt: "Navigation kitesurf vents constants Diego Suarez Madagascar" },
    { src: "/images/IMG-20260304-WA0014.jpg", category: "Navigation", alt: "Spot de kitesurf exceptionnel à Antsiranana, Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0017.jpg", category: "Navigation", alt: "Kitesurf en pleine vitesse à la Baie de Sakalava" },
    { src: "/images/IMG-20260304-WA0016.jpg", category: "Navigation", alt: "Pure Wind Kite School – session en mer à Diego Suarez" },
    { src: "/images/IMG-20260304-WA0019.jpg", category: "Navigation", alt: "Kiter expérimenté sur la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0024.jpg", category: "Navigation", alt: "Glisse sur les eaux cristallines de Diego Suarez" },
    { src: "/images/IMG-20260304-WA0023.jpg", category: "Navigation", alt: "Navigation kitesurf eaux bleues Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0031.jpg", category: "Navigation", alt: "Session kitesurf avec vent constant à Sakalava Bay" },
    { src: "/images/IMG-20260305-WA0156.jpg", category: "Navigation", alt: "Kitesurf avancé Baie de Sakalava Madagascar" },
    { src: "/images/IMG-20260305-WA0153.jpg", category: "Navigation", alt: "Rider kitesurf en plein saut sur la Baie de Sakalava" },
    { src: "/images/IMG-20260305-WA0144.jpg", category: "Navigation", alt: "Navigation fluide kitesurf spot Diego Suarez Madagascar" },
    { src: "/images/IMG-20260304-WA0004.jpg", category: "Figures", alt: "Figure kitesurf – jump sur la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260304-WA0005.jpg", category: "Figures", alt: "Trick de kitesurf à Diego Suarez, Nord Madagascar" },
    { src: "/images/IMG-20260304-WA0009.jpg", category: "Figures", alt: "Saut kitesurf spectaculaire à la Baie de Sakalava" },
    { src: "/images/IMG-20260305-WA0133.jpg", category: "Figures", alt: "Acrobatie kitesurf sur les vagues de Madagascar" },
    { src: "/images/IMG-20260305-WA0143.jpg", category: "Apprentissage", alt: "Cours de kitesurf débutant sur la Baie de Sakalava, Diego Suarez" },
    { src: "/images/IMG-20260304-WA0042.jpg", category: "Apprentissage", alt: "Élève apprenant le kitesurf avec instructeur Pure Wind Madagascar" },
    { src: "/images/IMG-20260304-WA0041.jpg", category: "Apprentissage", alt: "Leçon de kitesurf pour débutants à Antsiranana, Madagascar" },
    { src: "/images/IMG-20260305-WA0134.jpg", category: "Paysages", alt: "Paysage de la Baie de Sakalava, Diego Suarez, Nord Madagascar" },
    { src: "/images/IMG-20260305-WA0127.jpg", category: "Paysages", alt: "Panorama de la baie d'Antsiranana, spot kitesurf Madagascar" },
    { src: "/images/IMG-20260305-WA0135.jpg", category: "Paysages", alt: "Vue côtière de la Baie de Sakalava, plage Madagascar" },
    { src: "/images/IMG-20260305-WA0138.jpg", category: "Paysages", alt: "Coucher de soleil sur la Baie de Sakalava, Diego Suarez" },
    { src: "/images/baie-des-sakalava2.jpg", category: "Paysages", alt: "Baie de Sakalava vue aérienne – meilleur spot kitesurf Madagascar" },
    { src: "/images/IMG-20260305-WA0136.jpg", category: "Paysages", alt: "Eaux turquoise de la Baie de Sakalava, nord de Madagascar" },
    { src: "/images/IMG-20260305-WA0129.jpg", category: "Paysages", alt: "Plage de Sakalava Bay – paradis du kitesurf à Diego Suarez" },
    { src: "/images/IMG-20260305-WA0132.jpg", category: "Paysages", alt: "Vents constants et ciel bleu à la Baie de Sakalava, Madagascar" },
    { src: "/images/IMG-20260305-WA0145.jpg", category: "Paysages", alt: "Nature préservée autour du spot de kitesurf à Diego Suarez" },
    { src: "/images/IMG-20260305-WA0146.jpg", category: "Paysages", alt: "Plage sauvage de la Baie de Sakalava, nord Madagascar" },
    { src: "/images/IMG-20260305-WA0151.jpg", category: "Paysages", alt: "Horizon de la Baie de Sakalava – spot kitesurf exceptionnel" },
    { src: "/images/IMG-20260305-WA0152.jpg", category: "Paysages", alt: "Eaux cristallines et sable blanc de la Baie de Sakalava" },
    { src: "/images/IMG-20260319-WA0000.jpg", category: "Tarif", alt: "Tarifs des cours de kitesurf – Pure Wind Kite School Madagascar" },
  ];

  const [active, setActive] = useState("Tous");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const filtered = active === "Tous" ? gallery : gallery.filter((item) => item.category === active);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="relative h-90 flex items-center justify-center text-white">
        <Image src="/images/IMG-20260305-WA0137.jpg" alt="Galerie kitesurf – Pure Wind Kite School à la Baie de Sakalava, Diego Suarez, Madagascar" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl opacity-90">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* FILTRES */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative">
        <div className="flex justify-end mb-10 relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-3 bg-white shadow px-6 py-3 rounded-full hover:shadow-md transition">
            <Menu size={20} />
            {categories.map((c) => {
              if (c.value === active) {
                const Icon = c.icon;
                return (
                  <span key={c.value} className="flex items-center gap-2">
                    <Icon size={18} /> {c.name}
                  </span>
                );
              }
            })}
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-14 bg-white rounded-xl shadow-lg w-56 overflow-hidden z-20">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.value} onClick={() => { setActive(cat.value); setOpen(false); }}
                      className={`flex items-center gap-3 w-full text-left px-5 py-3 hover:bg-gray-100 transition ${active === cat.value ? "text-cyan-600 font-semibold" : "text-gray-700"}`}
                    >
                      <Icon size={18} /> {cat.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* GALERIE */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <div key={index} onClick={() => setSelectedImage({ src: item.src, alt: item.alt })}
              className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-md"
            >
              <Image src={item.src} alt={item.alt} width={600} height={500} className="w-full h-105 object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <Image src={selectedImage.src} alt={selectedImage.alt} width={1200} height={800} className="max-h-[90vh] w-auto rounded-xl" />
        </div>
      )}

    </main>
  );
}
