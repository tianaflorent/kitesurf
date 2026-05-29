import type { Metadata } from "next";
import "../globals.css";
import ClientLayout from "../components/ClientLayout";
import { Plus_Jakarta_Sans, Inter, Great_Vibes } from "next/font/google";
import { cn } from "@/lib/utils";
import { i18n, type Locale } from "@/i18n-config";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sans' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-script' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isFr 
        ? "Pure Wind Kite School Madagascar | Cours de Kitesurf à Diego Suarez" 
        : "Pure Wind Kite School Madagascar | Kitesurf Courses in Diego Suarez",
      template: "%s | Pure Wind Kite School Madagascar",
    },
    description: isFr 
      ? "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Nord de Madagascar. Cours pour tous niveaux, matériel certifié fourni. Réservez votre session dès maintenant !"
      : "Kitesurf school in Sakalava Bay, Antsiranana (Diego Suarez), North Madagascar. Courses for all levels, certified equipment provided. Book your session now!",
    keywords: [
      "kitesurf", "Madagascar", "Diego Suarez", "Antsiranana", "Baie de Sakalava", 
      "cours kitesurf", "école kitesurf", "kite school", "kitesurf Madagascar", 
      "kite Diego Suarez", "apprendre kitesurf", "spot kitesurf Madagascar"
    ],
    authors: [{ name: "Pure Wind Kite School Madagascar" }],
    creator: "Pure Wind Kite School",
    publisher: "Pure Wind Kite School",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      siteName: "Pure Wind Kite School Madagascar",
      title: isFr ? "Pure Wind Kite School Madagascar | Cours de Kitesurf à Diego Suarez" : "Pure Wind Kite School Madagascar | Kitesurf Courses",
      description: isFr 
        ? "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez). Cours pour tous niveaux, matériel certifié fourni."
        : "Kitesurf school in Sakalava Bay, Antsiranana (Diego Suarez). Courses for all levels, certified equipment provided.",
      url: `${BASE_URL}/${lang}`,
      images: [
        {
          url: "/images/IMG-20260304-WA0043.jpg",
          width: 800,
          height: 600,
          alt: "Kitesurf à la Baie de Sakalava, Diego Suarez, Madagascar – Pure Wind Kite School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Pure Wind Kite School Madagascar | Cours de Kitesurf" : "Pure Wind Kite School Madagascar | Kitesurf Courses",
      description: isFr 
        ? "École de kitesurf à la Baie de Sakalava, Diego Suarez. Cours pour tous niveaux, matériel fourni."
        : "Kitesurf school in Sakalava Bay, Diego Suarez. Courses for all levels, equipment provided.",
      images: ["/images/IMG-20260304-WA0043.jpg"],
    },
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={cn("font-sans", inter.variable, plusJakartaSans.variable, greatVibes.variable)}>
      <body className="flex flex-col min-h-screen relative bg-background text-foreground selection:bg-secondary/40 selection:text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
