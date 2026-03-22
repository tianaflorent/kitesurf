// import "./globals.css";
// import BottomNav from "@/components/BottomNav";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fr">
//       <body className="bg-white text-gray-800 flex flex-col min-h-screen">

//         {/* Navbar */}
//         <Navbar />

//         {/* Contenu principal */}
//         <main className="flex-1 md:pt-20">
//           {children}
//         </main>

//         {/* Footer */}
//         <div className="mb-17.5 md:mb-0"> {/* marge pour BottomNav mobile */}
//           <Footer />
//         </div>

//         {/* Bottom Navigation (mobile) */}
//         <div className="fixed bottom-0 left-0 right-0 md:hidden">
//           <BottomNav />
//         </div>

//       </body>
//     </html>
//   );
// }

// 


"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext"; // <-- nouveau
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen relative">
        <LanguageProvider> {/* <-- enveloppe tout le site */}

          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  background: "#16a34a",
                  color: "#ffffff",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#16a34a",
                },
              },
              error: {
                style: {
                  background: "#dc2626",
                  color: "#ffffff",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#dc2626",
                },
              },
            }}
          />

          {/* Navbar */}
          <Navbar />

          {/* Contenu principal */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* BottomNav fixe mobile */}
          <div className="fixed bottom-0 left-0 right-0 lg:hidden">
            <BottomNav />
          </div>

        </LanguageProvider>
      </body>
    </html>
  );
}




