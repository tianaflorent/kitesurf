import type { Metadata } from "next";
import CoursContent from "./CoursContent";
import { CourseListJsonLd } from "../../components/JsonLd";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Cours de Kitesurf – Débutant, Intermédiaire, Avancé | Pure Wind Madagascar"
      : "Kitesurf Courses – Beginner, Intermediate, Advanced | Pure Wind Madagascar",
    description: isFr
      ? "Nos cours de kitesurf à la Baie de Sakalava (Diego Suarez) s'adaptent à tous les niveaux. Débutant, intermédiaire ou avancé – tout le matériel (kite, planche, harnais) est fourni."
      : "Our kitesurfing courses in Sakalava Bay (Diego Suarez) adapt to all levels. Beginner, intermediate or advanced - all equipment is provided.",
    keywords: [
      "cours kitesurf Madagascar",
      "leçon kitesurf Diego Suarez",
      "kitesurf débutant Madagascar",
      "apprendre kitesurf Antsiranana",
      "école kitesurf Baie de Sakalava",
    ],
    openGraph: {
      title: isFr 
        ? "Cours de Kitesurf à Diego Suarez | Pure Wind Kite School Madagascar"
        : "Kitesurf Courses in Diego Suarez | Pure Wind Kite School Madagascar",
      description: isFr
        ? "Cours de kitesurf pour tous niveaux à la Baie de Sakalava, Diego Suarez. Matériel certifié fourni, instructeurs expérimentés."
        : "Kitesurf courses for all levels in Sakalava Bay, Diego Suarez. Certified equipment provided, experienced instructors.",
      url: `https://purewindkiteschool.vercel.app/${lang}/cours`,
      images: [
        {
          url: "/images/IMG-20260304-WA0026.jpg",
          width: 800,
          height: 600,
          alt: "Cours de kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `https://purewindkiteschool.vercel.app/${lang}/cours`,
    },
  };
}

export default async function CoursPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <CourseListJsonLd />
      <CoursContent dictionary={dict.cours} lang={lang} />
    </>
  );
}