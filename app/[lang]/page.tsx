import type { Metadata } from "next";
import HomeContent from "../HomeContent";
import { LocalBusinessJsonLd, FAQJsonLd } from "../components/JsonLd";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Cours de Kitesurf à Diego Suarez Madagascar | Pure Wind Kite School" 
      : "Kitesurf Courses in Diego Suarez Madagascar | Pure Wind Kite School",
    description: isFr 
      ? "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Nord de Madagascar. Cours pour débutants et avancés, tout le matériel est fourni. Réservez dès maintenant !"
      : "Kitesurf school in Sakalava Bay, Antsiranana (Diego Suarez), North Madagascar. Courses for beginners and advanced, all equipment is provided. Book now!",
    openGraph: {
      title: isFr 
        ? "Cours de Kitesurf à Diego Suarez Madagascar | Pure Wind Kite School"
        : "Kitesurf Courses in Diego Suarez Madagascar | Pure Wind Kite School",
      description: isFr 
        ? "Découvrez le kitesurf dans les eaux cristallines de la Baie de Sakalava, Diego Suarez. Cours pour tous niveaux, matériel certifié fourni."
        : "Discover kitesurfing in the crystal clear waters of Sakalava Bay, Diego Suarez. Courses for all levels, certified equipment provided.",
      url: `https://purewindkiteschool.vercel.app/${lang}`,
      images: [
        {
          url: "/images/IMG-20260304-WA0043.jpg",
          width: 800,
          height: 600,
          alt: "Kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `https://purewindkiteschool.vercel.app/${lang}`,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <LocalBusinessJsonLd />
      <FAQJsonLd />
      <HomeContent dictionary={dict.home} lang={lang} />
    </>
  );
}
