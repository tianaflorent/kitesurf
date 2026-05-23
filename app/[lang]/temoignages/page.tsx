import type { Metadata } from "next";
import TemoignagesContent from "./TemoignagesContent";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr 
      ? "Témoignages – Avis Clients Kitesurf Madagascar | Pure Wind Kite School"
      : "Testimonials – Kitesurfing Customer Reviews Madagascar | Pure Wind Kite School",
    description: isFr
      ? "Lisez les avis et témoignages de nos élèves sur leurs expériences de kitesurf à la Baie de Sakalava, Diego Suarez. Plus de 50 sessions et des avis 5 étoiles !"
      : "Read the reviews and testimonials of our students on their kitesurfing experiences in Sakalava Bay, Diego Suarez. Over 50 sessions and 5 star reviews!",
    keywords: [
      "avis kitesurf Madagascar",
      "témoignages école kitesurf Diego Suarez",
      "reviews Pure Wind Kite School",
      "élèves kitesurf Baie de Sakalava",
    ],
    openGraph: {
      title: isFr 
        ? "Témoignages et Avis – Pure Wind Kite School Madagascar"
        : "Testimonials and Reviews – Pure Wind Kite School Madagascar",
      description: isFr
        ? "Découvrez les expériences de nos élèves à la Baie de Sakalava. Plus de 50 formés, avis 5 étoiles."
        : "Discover the experiences of our students in Sakalava Bay. Over 50 trained, 5 star reviews.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/temoignages`,
      images: [
        {
          url: "/images/IMG-20260304-WA0043.jpg",
          width: 800,
          height: 600,
          alt: "Témoignages kitesurf – Pure Wind Kite School, Diego Suarez, Madagascar",
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/temoignages`,
    },
  };
}

export default async function TemoignagesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <TemoignagesContent dictionary={dict.home} lang={lang} />;
}