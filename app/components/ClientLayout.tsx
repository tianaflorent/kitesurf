"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppSite = !pathname?.startsWith("/admin") && !pathname?.startsWith("/auth");

  return (
    <LanguageProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: { background: "#16a34a", color: "#ffffff" },
            iconTheme: { primary: "#ffffff", secondary: "#16a34a" },
          },
          error: {
            style: { background: "#dc2626", color: "#ffffff" },
            iconTheme: { primary: "#ffffff", secondary: "#dc2626" },
          },
        }}
      />

      {isAppSite && <Navbar />}

      <main className="flex-1">{children}</main>

      {isAppSite && <Footer />}

      {isAppSite && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden">
          <BottomNav />
        </div>
      )}
    </LanguageProvider>
  );
}
