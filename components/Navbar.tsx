"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Images,
  Info,
  Mail,
} from "lucide-react";
import AnimatedLogo from "@/components/navbar/AnimatedLogo";
import DesktopMenu from "@/components/navbar/DesktopMenu";
import LanguageSwitch from "@/components/navbar/LanguageSwitch";
import StaffProfileMenu from "@/components/navbar/StaffProfileMenu";
import useStaffUser from "@/app/hooks/useStaffUser";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const {
    user,
    isStaff,
    initials,
    profileOpen,
    setProfileOpen,
    profileRef,
    onLogout,
  } = useStaffUser(pathname);

  const menus = [
    { name: lang === "FR" ? "Accueil" : "Home", href: "/", icon: Home },
    { name: lang === "FR" ? "Cours" : "Courses", href: "/cours", icon: BookOpen },
    { name: lang === "FR" ? "Galerie" : "Gallery", href: "/galerie", icon: Images },
    { name: lang === "FR" ? "À propos" : "About", href: "/apropos", icon: Info },
    { name: lang === "FR" ? "Contact" : "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* ================= NAVBAR TOP (TOUS ÉCRANS) ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-5 lg:px-1 py-1 lg:py-3">

          {/* LOGO */}
          <Link href="/">
            <AnimatedLogo />
          </Link>

          {/* ---------------- DESKTOP MENU (lg et +) ---------------- */}
          <DesktopMenu items={menus} pathname={pathname} />

          {/* ---------------- ACTIONS ---------------- */}
          <div className="flex items-center gap-4 lg:gap-6">
            <LanguageSwitch lang={lang} setLang={setLang} />

            {/* Bouton visible seulement desktop */}
            {isStaff ? (
              <div ref={profileRef} className="hidden lg:relative lg:block">
                <StaffProfileMenu
                  user={user}
                  initials={initials}
                  open={profileOpen}
                  setOpen={setProfileOpen}
                  onLogout={onLogout}
                />
              </div>
            ) : (
              <Link
                href="/reservation"
                className="hidden lg:block bg-blue-700 hover:bg-blue-600 transition px-6 py-2 rounded-xl text-white font-semibold shadow-md"
              >
                {lang === "FR" ? "Réserver" : "Book"}
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* Spacer top pour éviter overlap */}
      <div className="h-18.75 lg:h-22.5" />
    </>
  );
}