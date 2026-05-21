"use client";

type Props = {
  lang: "FR" | "EN";
  setLang: (lang: "FR" | "EN") => void;
};

export default function LanguageSwitch({ lang, setLang }: Props) {
  return (
    <div className="flex items-center gap-2 text-xs font-light tracking-widest text-muted-foreground">
      <button
        onClick={() => setLang("FR")}
        className={`p-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-primary ${
          lang === "FR" ? "text-foreground font-medium" : "hover:text-foreground"
        }`}
      >
        FR
      </button>
      
      <span className="w-[1px] h-3 bg-border" aria-hidden="true" />
      
      <button
        onClick={() => setLang("EN")}
        className={`p-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-primary ${
          lang === "EN" ? "text-foreground font-medium" : "hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}