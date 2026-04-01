import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const BASE_URL = "https://purewindkiteschool.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pure Wind Kite School Madagascar | Cours de Kitesurf à Diego Suarez",
    template: "%s | Pure Wind Kite School Madagascar",
  },
  description:
    "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez), Nord de Madagascar. Cours pour tous niveaux, matériel certifié fourni. Réservez votre session dès maintenant !",
  keywords: [
    "kitesurf",
    "Madagascar",
    "Diego Suarez",
    "Antsiranana",
    "Baie de Sakalava",
    "cours kitesurf",
    "école kitesurf",
    "kite school",
    "kitesurf Madagascar",
    "kite Diego Suarez",
    "apprendre kitesurf",
    "spot kitesurf Madagascar",
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
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: "Pure Wind Kite School Madagascar",
    title: "Pure Wind Kite School Madagascar | Cours de Kitesurf à Diego Suarez",
    description:
      "École de kitesurf à la Baie de Sakalava, Antsiranana (Diego Suarez). Cours pour tous niveaux, matériel certifié fourni.",
    url: BASE_URL,
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
    title: "Pure Wind Kite School Madagascar | Cours de Kitesurf Diego Suarez",
    description:
      "École de kitesurf à la Baie de Sakalava, Diego Suarez. Cours pour tous niveaux, matériel fourni.",
    images: ["/images/IMG-20260304-WA0043.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      fr: BASE_URL,
      en: BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    // À compléter lors de la vérification Google Search Console
    // google: "VOTRE_CODE_VERIFICATION",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen relative bg-slate-50 text-slate-800">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
