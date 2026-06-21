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
      <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border z-100 lg:hidden pb-safe">
        <div className="flex justify-around items-center h-16 md:h-20 px-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => handleClick(menu.name)}
                className={`flex flex-col items-center gap-1 transition-colors w-full py-2 ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`relative ${active ? "bg-secondary/10 p-1.5 rounded-full" : "p-1.5"}`}>
                  <Icon
                    size={22}
                    strokeWidth={active ? 2 : 1.5}
                    className={`${shake === menu.name ? "animate-shake" : ""} ${active ? "text-primary" : ""}`}
                  />
                </div>
                <span className="text-[10px] uppercase font-heading tracking-widest font-semibold">{menu.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Spacer pour éviter que le contenu soit caché derrière le nav */}
      <div className="h-16 md:h-20 lg:hidden" />
    </>
  );
}