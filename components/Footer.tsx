import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname() || "";
  const langSegment = pathname.split('/')[1];
  const lang = (langSegment === 'fr' || langSegment === 'en') ? langSegment : 'fr';
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
    <footer className="relative bg-zinc-950 text-zinc-100 pt-24 pb-12 overflow-hidden border-t border-zinc-900">
      {/* Arrière-plan subtil */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.35] mix-blend-luminosity grayscale"
        style={{ backgroundImage: `url('/images/IMG-20260304-WA0021.jpg')` }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* BRANDING */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left md:pr-8">
            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight mb-6 wrap-anywhere xl:break-normal text-white">PUREWINDMADAKITESCHOOL</h2>
            <p className="text-zinc-300 font-light leading-relaxed max-w-sm">
              {lang === 'fr' 
                ? "L'excellence du kitesurf dans le sanctuaire de la Baie de Sakalava, Madagascar." 
                : "The excellence of kitesurfing in the sanctuary of Sakalava Bay, Madagascar."}
            </p>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 
              className="font-heading uppercase tracking-widest text-sm text-secondary font-bold mb-8 cursor-pointer select-none"
              onClick={handleContactClick}
              title={lang === "fr" ? "Cliquez 5 fois pour accès Admin" : "Click 5 times for Admin access"}
            >
              {lang === "fr" ? "Contact" : "Contact"}
            </h3>
            <ul className="space-y-5 text-zinc-300 font-light">
              <li className="flex items-center justify-center md:justify-start gap-4 hover:text-white transition-colors">
                <Phone size={18} className="text-secondary/70 shrink-0" />
                <a href="tel:+261377147300">+261 37 71 473 00</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 hover:text-white transition-colors">
                <Mail size={18} className="text-secondary/70 shrink-0" />
                <a href="mailto:purewindmadakiteschool@gmail.com">purewindmadakiteschool@gmail.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 hover:text-white transition-colors">
                <MapPin size={18} className="text-secondary/70 shrink-0" />
                <a href="https://www.google.com/maps/place/Baie+de+Sakalava/@-12.2275,49.3775,15z" target="_blank" rel="noopener noreferrer">
                  {lang === "fr" ? "Baie de Sakalava, Madagascar" : "Sakalava Bay, Madagascar"}
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-heading uppercase tracking-widest text-sm text-secondary font-bold mb-8">
              {lang === "fr" ? "Suivez-nous" : "Follow us"}
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="https://www.facebook.com/profile.php?id=61588059466832" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-zinc-100 hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/pure_winde_kite_school?igsh=MWhxa25xbDk5Znk4dg==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-zinc-100 hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <FaInstagram size={18} />
              </a>
              <a href="https://wa.me/261377147300" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-zinc-100 hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col items-center justify-center gap-6 text-sm text-zinc-400 font-light tracking-wide">
          <p className="text-center">
            © {new Date().getFullYear()} Pure Wind Kite School. <br className="md:hidden" />
            {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}