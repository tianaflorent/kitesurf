"use client";

type Props = {
  lang: "FR" | "EN";
  setLang: (lang: "FR" | "EN") => void;
};

export default function LanguageSwitch({ lang, setLang }: Props) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLang("FR")}
        className={`px-3 py-1 text-sm rounded-full transition cursor-pointer ${
          lang === "FR" ? "bg-blue-700 text-white" : "text-gray-600 hover:text-blue-700"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("EN")}
        className={`px-3 py-1 text-sm rounded-full transition cursor-pointer ${
          lang === "EN" ? "bg-blue-700 text-white" : "text-gray-600 hover:text-blue-700"
        }`}
      >
        EN
      </button>
    </div>
  );
}
