import type { Metadata } from "next";
import AdminLayoutClient from "./AdminLayoutClient";
import "../globals.css";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-sans' });

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  title: "Admin – Pure Wind Kite School",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jost.variable}>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
