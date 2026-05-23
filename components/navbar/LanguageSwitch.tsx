"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitch() {
  const pathname = usePathname() || "";
  const langSegment = pathname.split('/')[1];
  const lang = (langSegment === 'fr' || langSegment === 'en') ? langSegment : 'fr';

  const switchLanguage = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split('/');
    if (segments[1] === 'fr' || segments[1] === 'en') {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    return segments.join('/') || '/';
  };

  return (
    <div className="flex items-center gap-2 text-xs font-light tracking-widest text-muted-foreground">
      <Link
        href={switchLanguage("fr")}
        className={`p-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-primary ${
          lang === "fr" ? "text-foreground font-medium" : "hover:text-foreground"
        }`}
      >
        FR
      </Link>
      
      <span className="w-px h-3 bg-border" aria-hidden="true" />
      
      <Link
        href={switchLanguage("en")}
        className={`p-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-primary ${
          lang === "en" ? "text-foreground font-medium" : "hover:text-foreground"
        }`}
      >
        EN
      </Link>
    </div>
  );
}