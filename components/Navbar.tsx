"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Images,
  Info,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();

  const menus = [
    { name: lang === "FR" ? "Accueil" : "Home", href: "/", icon: Home },
    { name: lang === "FR" ? "Cours" : "Courses", href: "/cours", icon: BookOpen },
    { name: lang === "FR" ? "Galerie" : "Gallery", href: "/galerie", icon: Images },
    { name: lang === "FR" ? "À propos" : "About", href: "/apropos", icon: Info },
    { name: lang === "FR" ? "Contact" : "Contact", href: "/contact", icon: Mail },
  ];

  /* ---------------- LOGO AVEC IMAGE ---------------- */
const AnimatedLogo = () => {
  const text = "Pure wind kite";

  return (
    <span className="flex items-center gap-3">
      
      {/* ✅ IMAGE LOGO */}
      <Image
        src="/images/IMG-20260318-WA0001.jpg"
        alt="Kite School Logo"
        width={90}
        height={90}
        className="object-contain"
        priority
      />

      {/* TEXTE ANIMÉ */}
      <span className="text-blue-700 font-bold flex text-lg md:text-xl lg:text-2xl tracking-wide">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-letter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );
};

  /* ---------------- SWITCH LANGUE ---------------- */
  const LanguageSwitch = () => (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLang("FR")}
        className={`px-3 py-1 text-sm rounded-full transition ${
          lang === "FR"
            ? "bg-blue-700 text-white"
            : "text-gray-600 hover:text-blue-700"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("EN")}
        className={`px-3 py-1 text-sm rounded-full transition ${
          lang === "EN"
            ? "bg-blue-700 text-white"
            : "text-gray-600 hover:text-blue-700"
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      {/* ================= NAVBAR TOP (TOUS ÉCRANS) ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-5 lg:px-1 py-1 lg:py-3">

          {/* LOGO */}
          <Link href="/">
            <AnimatedLogo />
          </Link>

          {/* ---------------- DESKTOP MENU (lg et +) ---------------- */}
          <nav className="hidden lg:flex gap-5">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const active = pathname === menu.href;

              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`flex items-center gap-2 relative font-medium transition ${
                    active
                      ? "text-blue-700"
                      : "text-gray-600 hover:text-blue-700"
                  }`}
                >
                  <Icon size={18} />
                  {menu.name}

                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-blue-700 transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---------------- ACTIONS ---------------- */}
          <div className="flex items-center gap-4 lg:gap-6">
            <LanguageSwitch />

            {/* Bouton visible seulement desktop */}
            <Link href="/reservation" className="hidden lg:block bg-blue-700 hover:bg-blue-600 transition px-6 py-2 rounded-xl text-white font-semibold shadow-md">
              {lang === "FR" ? "Réserver" : "Book"}
            </Link>
          </div>

        </div>
      </header>

      {/* Spacer top pour éviter overlap */}
      <div className="h-18.75 lg:h-22.5" />
    </>
  );
}