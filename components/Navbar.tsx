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
      {/* ================= NAVBAR TOP ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 lg:px-8 py-3 lg:py-4">

          {/* LOGO */}
          <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            <AnimatedLogo />
          </Link>

          {/* ---------------- DESKTOP MENU ---------------- */}
          <DesktopMenu items={menus} pathname={pathname} />

          {/* ---------------- ACTIONS ---------------- */}
          <div className="flex items-center gap-6 lg:gap-8">
            <LanguageSwitch lang={lang} setLang={setLang} />

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
                className="hidden lg:flex h-12 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-8 text-xs font-medium tracking-[0.2em] uppercase rounded-none shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {lang === "FR" ? "Réserver" : "Book"}
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* Spacer calibré sur la nouvelle hauteur */}
      <div className="h-[72px] lg:h-[84px]" />
    </>
  );
}