"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { type Dictionary } from "@/context/translations";
import ContactHero from "@/public/images/contact/contactHero.jpg";

export default function ContactContent({ dictionary }: { dictionary: Dictionary["contact"] }) {
  const t = dictionary;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "261377147300";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const text = `Bonjour, je m'appelle ${name}___Email: ${email}___Téléphone: ${phone}___Message: ${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
    }, 800);
  };

  return (
    <main className="bg-background min-h-screen">

      {/* 1. HERO INVITATION */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src={ContactHero}
            alt="Contactez Pure Wind Kite School – école de kitesurf à Diego Suarez, Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-8">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-xl">
              {t.heroText}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary"></span>
            <span className="text-secondary font-script text-3xl">Rencontre</span>
          </div>
        </div>
      </section>

      {/* 2. CONTACT SPLIT LAYOUT */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT: INFO */}
          <div className="w-full lg:w-5/12 space-y-16">
            <div>
              <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
                Coordonnées
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter mb-12">
                Nous Trouver
              </h2>
            </div>
            
            <div className="space-y-12">
              <InfoRow icon={<Phone strokeWidth={1} size={28} />} title={t.phoneTitle} subtitle="+261 37 71 473 00" note={t.phoneNote} />
              <InfoRow icon={<Mail strokeWidth={1} size={28} />} title={t.emailTitle} subtitle="purewindmadakiteschool@gmail.com" note={t.emailNote} />
              <InfoRow icon={<MapPin strokeWidth={1} size={28} />} title={t.addressTitle} subtitle="Baie de Sakalava, Antsiranana (Diego Suarez), Madagascar" note={t.addressNote} />
              <InfoRow icon={<Clock strokeWidth={1} size={28} />} title={t.hoursTitle} subtitle={t.hoursWeek} note={t.hoursWeekend} />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="w-full lg:w-7/12">
            <div className="bg-muted/30 p-8 md:p-16 border border-border">
              <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
                Message
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground font-light tracking-tighter mb-12">
                {t.formTitle}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-10 group">
                  <input type="text" name="name" id="name" placeholder=" " value={name} onChange={(e) => setName(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light" />
                  <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.name}
                  </label>
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <input type="email" name="email" id="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light" />
                  <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.email}
                  </label>
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <input type="tel" name="phone" id="phone" placeholder=" " value={phone} onChange={(e) => setPhone(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light" />
                  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.phone}
                  </label>
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <textarea name="message" id="message" placeholder=" " rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light resize-none" />
                  <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.message}
                  </label>
                </div>

                <button type="submit" disabled={loading}
                  className={`w-full cursor-pointer bg-foreground hover:bg-black transition-colors text-background font-sans uppercase tracking-[0.2em] text-xs font-semibold py-5 flex items-center justify-center gap-3 mt-12 ${loading ? "opacity-70" : "opacity-100"}`}
                >
                  {loading ? <span className="animate-pulse">{t.preparing}</span> : <>{t.send} <Send size={16} strokeWidth={1.5} /></>}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* BOUTON FLOTTANT WHATSAPP REDESIGN */}
      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
        aria-label="Contacter Pure Wind Kite School sur WhatsApp"
        className="fixed right-6 bottom-6 z-50 group flex items-center gap-4"
      >
        <span className="bg-background/80 backdrop-blur-md border border-border px-4 py-2 text-xs uppercase tracking-widest font-light text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
          WhatsApp
        </span>
        <div className="w-14 h-14 bg-foreground/90 backdrop-blur-xl flex items-center justify-center text-background hover:bg-[#25D366] transition-colors duration-500 shadow-2xl">
          <MessageCircle size={24} strokeWidth={1.5} />
        </div>
      </a>

    </main>
  );
}

function InfoRow({ icon, title, subtitle, note }: { icon: React.ReactNode; title: string; subtitle: string; note: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="text-secondary mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-2xl text-foreground font-light mb-2">{title}</h3>
        <p className="text-muted-foreground font-light leading-relaxed mb-1">{subtitle}</p>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">{note}</p>
      </div>
    </div>
  );
}
