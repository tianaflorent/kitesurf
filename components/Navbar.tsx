"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Home,
  BookOpen,
  Images,
  Info,
  Mail,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<null | { email: string; role: string }>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setUser(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) setUser(data?.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!profileRef.current) return;
      if (!profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [profileOpen]);

  const isStaff = user?.role === "ADMIN" || user?.role === "MODERATOR";

  const initials = useMemo(() => {
    const src = user?.email?.trim() || "";
    if (!src) return "A";
    const beforeAt = src.split("@")[0] ?? src;
    const parts = beforeAt.split(/[._\-\s]+/).filter(Boolean);
    const first = (parts[0]?.[0] ?? beforeAt[0] ?? "A").toUpperCase();
    const second = (parts[1]?.[0] ?? beforeAt[1] ?? "").toUpperCase();
    return `${first}${second}`;
  }, [user?.email]);

  const onLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setProfileOpen(false);
      setUser(null);
      router.refresh();
    }
  };

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
        className={`px-3 py-1 text-sm rounded-full transition ${lang === "FR"
          ? "bg-blue-700 text-white"
          : "text-gray-600 hover:text-blue-700"
          }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("EN")}
        className={`px-3 py-1 text-sm rounded-full transition ${lang === "EN"
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
                  className={`flex items-center gap-2 relative font-medium transition ${active
                    ? "text-blue-700"
                    : "text-gray-600 hover:text-blue-700"
                    }`}
                >
                  <Icon size={18} />
                  {menu.name}

                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-blue-700 transition-all duration-300 ${active ? "w-full" : "w-0"
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
            {isStaff ? (
              <div ref={profileRef} className="hidden lg:relative lg:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="relative h-10 w-10 rounded-full bg-blue-700 text-white font-bold shadow-md flex items-center justify-center select-none"
                  aria-label="Profil"
                >
                  {initials}
                  <span
                    className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"
                    aria-hidden="true"
                  />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user?.role}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/admin/reviews"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut size={16} />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                ) : null}
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