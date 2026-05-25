"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, Images, Info, PhoneCall } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname() || "";
  const langSegment = pathname.split('/')[1];
  const lang = (langSegment === 'fr' || langSegment === 'en') ? langSegment : 'fr';
  const [shake, setShake] = useState<string | null>(null);

  const menus = [
    { name: lang === "fr" ? "Accueil" : "Home", href: `/${lang}`, icon: Home },
    { name: lang === "fr" ? "Cours" : "Courses", href: `/${lang}/cours`, icon: BookOpen },
    { name: lang === "fr" ? "Galerie" : "Gallery", href: `/${lang}/galerie`, icon: Images },
    { name: lang === "fr" ? "À propos" : "About", href: `/${lang}/apropos`, icon: Info },
    { name: lang === "fr" ? "Contact" : "Contact", href: `/${lang}/contact`, icon: PhoneCall },
  ];

  const handleClick = (name: string) => {
    setShake(name);
    setTimeout(() => setShake(null), 400); // durée de l'animation
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around items-center h-16">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => handleClick(menu.name)}
                className={`flex flex-col items-center text-xs transition-colors ${
                  active
                    ? "text-blue-800 font-semibold"
                    : "text-black font-semibold hover:text-blue-800"
                }`}
              >
                <Icon
                  size={25}
                  className={`${shake === menu.name ? "animate-shake" : ""}`}
                />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Permet de laisser un espace pour le nav fixe */}
      <div className="h-16 lg:hidden" />
    </>
  );
}