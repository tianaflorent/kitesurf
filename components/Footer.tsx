// "use client";
// import { Phone, Mail, MapPin } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import { useLanguage } from "@/context/LanguageContext";

// export default function Footer() {
//   const { lang } = useLanguage();

//   return (
//     <footer className="text-gray-300 md:mt-0 mt-0">

//       {/* Image de fond */}
//       <div
//         className="relative bg-cover bg-center"
//         style={{ backgroundImage: `url('/images/IMG-20260304-WA0021.jpg')` }}
//       >
//         {/* Overlay sombre */}
//         <div className="bg-black/70">
//           <div className="px-6 py-20 md:py-32 max-w-6xl mx-auto text-center">

//             {/* CONTACT */}
//             <div className="mb-10">
//               <h3 className="text-white text-2xl font-semibold mb-4">
//                 {lang === "FR" ? "Contact" : "Contact"}
//               </h3>

//               <ul className="space-y-3 text-sm text-gray-200">
//                 <li className="flex items-center justify-center gap-3">
//                   <Phone size={20} />
//                   <span>+261 37 71 473 00</span>
//                 </li>

//                 <li className="flex items-center justify-center gap-3">
//                   <Mail size={20} />
//                   <span>purewindmadakiteschool@gmail.com</span>
//                 </li>

//                 <li className="flex items-center justify-center gap-3">
//                   <MapPin size={20} />
//                   <span>
//                     {lang === "FR" ? "Baie de Sakalava" : "Sakalava Bay"}
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* RESEAUX SOCIAUX */}
//             <div className="mb-8">
//               <h3 className="text-white text-2xl font-semibold mb-4">
//                 {lang === "FR" ? "Suivez-nous" : "Follow us"}
//               </h3>

//               <div className="flex justify-center items-center gap-8 text-3xl">
//                 <a href="https://www.facebook.com/tianaflorent.5" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
//                   <FaFacebookF className="text-blue-600 hover:text-blue-400" />
//                 </a>
//                 <a href="https://www.instagram.com/flo_tour_guide/" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
//                   <FaInstagram className="text-pink-500 hover:text-pink-400" />
//                 </a>
//                 <a href="https://wa.me/261377147300" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
//                   <FaWhatsapp className="text-green-500 hover:text-green-400" />
//                 </a>
//               </div>
//             </div>

//             {/* COPYRIGHT + DEVELOPPEUR */}
//             <div className="border-t border-gray-500 pt-6 flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-gray-300">

//               <span>
//                 © 2026 Purewindkiteschoolmadagascar <br />
//                 {lang === "FR"
//                   ? "Tous droits réservés."
//                   : "All rights reserved."}
//               </span>

//               <a
//                 href="https://wa.me/261328422916"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 hover:text-white transition"
//               >
//                 <img
//                   src="/images/10.jpg"
//                   alt="Florent"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <span>
//                   {lang === "FR" ? "Développé par" : "Developed by"}{" "}
//                   <span className="text-white font-semibold">
//                     TIANA Florent
//                   </span>
//                 </span>
//               </a>

//             </div>

//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }






"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const router = useRouter();

  const [clickCount, setClickCount] = useState(0);

  const handleContactClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      router.push("/admin/login"); // redirige vers la page login admin
      setClickCount(0); // reset le compteur
    }
  };

  return (
    <footer className="text-gray-300 md:mt-0 mt-0">
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url('/images/IMG-20260304-WA0021.jpg')` }}
      >
        <div className="bg-black/70">
          <div className="px-6 py-20 md:py-32 max-w-6xl mx-auto text-center">

            {/* CONTACT */}
            <div className="mb-10">
              <h3
                className="text-white text-2xl font-semibold mb-4 cursor-pointer select-none"
                onClick={handleContactClick}
              >
                {lang === "FR" ? "Contact" : "Contact"}
              </h3>

              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex items-center justify-center gap-3">
                  <Phone size={20} />
                  <span>+261 37 71 473 00</span>
                </li>

                <li className="flex items-center justify-center gap-3">
                  <Mail size={20} />
                  <span>purewindmadakiteschool@gmail.com</span>
                </li>

                <li className="flex items-center justify-center gap-3">
                  <MapPin size={20} />
                  <span>
                    {lang === "FR" ? "Baie de Sakalava" : "Sakalava Bay"}
                  </span>
                </li>
              </ul>
            </div>

            {/* RESEAUX SOCIAUX */}
            <div className="mb-8">
              <h3 className="text-white text-2xl font-semibold mb-4">
                {lang === "FR" ? "Suivez-nous" : "Follow us"}
              </h3>

              <div className="flex justify-center items-center gap-8 text-3xl">
                <a href="https://www.facebook.com/tianaflorent.5" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
                  <FaFacebookF className="text-blue-600 hover:text-blue-400" />
                </a>
                <a href="https://www.instagram.com/flo_tour_guide/" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
                  <FaInstagram className="text-pink-500 hover:text-pink-400" />
                </a>
                <a href="https://wa.me/261377147300" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
                  <FaWhatsapp className="text-green-500 hover:text-green-400" />
                </a>
              </div>
            </div>

            {/* COPYRIGHT + DEVELOPPEUR */}
            <div className="border-t border-gray-500 pt-6 flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-gray-300">
              <span>
                © 2026 Purewindkiteschoolmadagascar <br />
                {lang === "FR" ? "Tous droits réservés." : "All rights reserved."}
              </span>

              <a
                href="https://wa.me/261328422916"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <img
                  src="/images/10.jpg"
                  alt="Florent"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span>
                  {lang === "FR" ? "Développé par" : "Developed by"}{" "}
                  <span className="text-white font-semibold">TIANA Florent</span>
                </span>
              </a>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}