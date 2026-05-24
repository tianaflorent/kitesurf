"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isImmersive = 
    pathname === `/${lang}` || 
    pathname === `/${lang}/` || 
    pathname === "/" ||
    pathname.startsWith(`/${lang}/cours`) ||
    pathname.startsWith(`/${lang}/galerie`) ||
    pathname.startsWith(`/${lang}/apropos`);

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
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-light uppercase tracking-[0.15em] text-xs px-6 py-3"
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
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "relative uppercase tracking-widest text-sm transition-colors",
                    isActive ? "text-secondary font-medium" : "text-foreground font-light hover:text-secondary"
                  )}
                >
                  <span className="block">{item.name}</span>
                </Link>
              );
            })}
            <div className="flex w-full flex-col gap-6 mt-8">
              <div className="self-start">
                <LanguageSwitch />
              </div>
              {!isStaff && (
                <NavbarButton
                  as={Link}
                  href={`/${lang}/reservation`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-light uppercase tracking-widest py-4"
                >
                  {lang === "fr" ? "Réserver" : "Book"}
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>

      {/* Spacer calibré sur la hauteur (désactivé sur les pages immersives pour le mode transparent) */}
      {!isImmersive && <div className="h-[72px] lg:h-[84px]" />}
    </>
  );
}