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
    <div className="flex items-center bg-background/50 backdrop-blur-md border border-border rounded-full p-1 text-[10px] font-heading font-semibold tracking-widest">
      <Link
        href={switchLanguage("fr")}
        className={`px-3 py-1.5 rounded-full transition-all cursor-pointer focus-visible:outline-none ${
          lang === "fr" 
            ? "bg-primary text-background shadow-md" 
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </Link>
      
      <Link
        href={switchLanguage("en")}
        className={`px-3 py-1.5 rounded-full transition-all cursor-pointer focus-visible:outline-none ${
          lang === "en" 
            ? "bg-primary text-background shadow-md" 
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Link>
    </div>
  );
}