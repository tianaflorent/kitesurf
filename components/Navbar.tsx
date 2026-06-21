"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import AnimatedLogo from "@/components/navbar/AnimatedLogo";
import LanguageSwitch from "@/components/navbar/LanguageSwitch";
import StaffProfileMenu from "@/components/navbar/StaffProfileMenu";
import useStaffUser from "@/app/hooks/useStaffUser";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname() || "";
  const langSegment = pathname.split('/')[1];
  const lang = (langSegment === 'fr' || langSegment === 'en') ? langSegment : 'fr';
  const {
    user,
    isStaff,
    initials,
    profileOpen,
    setProfileOpen,
    profileRef,
    onLogout,
  } = useStaffUser(pathname);

  const isImmersive = 
    pathname === `/${lang}` || 
    pathname === `/${lang}/` || 
    pathname === "/" ||
    pathname.startsWith(`/${lang}/cours`) ||
    pathname.startsWith(`/${lang}/galerie`) ||
    pathname.startsWith(`/${lang}/apropos`) ||
    pathname.startsWith(`/${lang}/contact`) ||
    pathname.startsWith(`/${lang}/reservation`) ||
    pathname.startsWith(`/${lang}/temoignages`) ||
    pathname.startsWith(`/${lang}/faq`);

  const navItems = [
    { name: lang === "fr" ? "Accueil" : "Home", link: `/${lang}` },
    { name: lang === "fr" ? "Cours" : "Courses", link: `/${lang}/cours` },
    { name: lang === "fr" ? "Galerie" : "Gallery", link: `/${lang}/galerie` },
    { name: lang === "fr" ? "À propos" : "About", link: `/${lang}/apropos` },
    { name: lang === "fr" ? "Contact" : "Contact", link: `/${lang}/contact` },
  ];

  return (
    <>
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody className="max-w-360 mx-auto justify-between px-6 lg:px-12">
          <Link href={`/${lang}`} className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            <AnimatedLogo />
          </Link>
          
          <NavItems items={navItems} pathname={pathname} />
          
          <div className="flex items-center gap-6 shrink-0">
            <LanguageSwitch />
            {isStaff ? (
              <div ref={profileRef} className="relative block">
                <StaffProfileMenu
                  user={user}
                  initials={initials}
                  open={profileOpen}
                  setOpen={setProfileOpen}
                  onLogout={onLogout}
                />
              </div>
            ) : (
              <NavbarButton 
                as={Link} 
                href={`/${lang}/reservation`} 
                variant="primary" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all  uppercase tracking-[0.15em] text-xs px-6 py-3"
              >
                {lang === "fr" ? "Réserver" : "Book"}
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="justify-between">
            <Link href={`/${lang}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
              <AnimatedLogo />
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitch />
            </div>
          </MobileNavHeader>
        </MobileNav>
      </ResizableNavbar>

      {/* Spacer calibré sur la hauteur (désactivé sur les pages immersives pour le mode transparent) */}
      {!isImmersive && <div className="h-[72px] lg:h-[84px]" />}
    </>
  );
}