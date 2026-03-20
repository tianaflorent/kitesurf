"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, Languages } from "lucide-react";
import { Hind } from "next/font/google";
import { translationsContact } from "@/context/translationcontact";
import { useLanguage } from "@/context/LanguageContext";
const mainFont = Hind({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

export default function ContactPage() {
  
    
  

  const { lang } = useLanguage();
  
  const t = translationsContact[lang];

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
    <main className="pb-10 bg-linear-to-br from-orange-50 via-white to-blue-50">

      {/* HERO */}
      <section className="relative h-75 mt-7 rounded-2xl overflow-hidden border border-gray-300 shadow-md">
        <img
          src="/images/IMG-20260304-WA0028.jpg"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white">
          <div className={mainFont.className}>
            <h1 className="text-3xl font-bold mb-2">{t.heroTitle}</h1>
            <p className="text-sm leading-relaxed max-w-sm">
              {t.heroText}
            </p>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="mx-4 mt-6 bg-white rounded-3xl p-5 border border-gray-300 shadow-md">

        <h2 className="text-lg font-semibold text-center mb-4">
          {t.formTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <h3 className="font-serif">{t.name}</h3>
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />

          <h3 className="font-serif">{t.email}</h3>
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />

          <h3 className="font-serif">{t.phone}</h3>
          <input
            type="tel"
            placeholder={t.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />

          <h3 className="font-serif">{t.message}</h3>
          <textarea
            placeholder={t.messagePlaceholder}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md ${
              loading ? "opacity-70 scale-95" : "opacity-100"
            }`}
          >
            {loading ? (
              <span className="animate-pulse">{t.preparing}</span>
            ) : (
              <>
                {t.send} <Send size={18} />
              </>
            )}
          </button>

        </form>
      </section>

      {/* INFOS CONTACT */}
      <section className="mx-4 mt-8 space-y-4">

        <InfoCard
          icon={<Phone />}
          title={t.phoneTitle}
          subtitle="+261 37 71 473 00"
          note={t.phoneNote}
        />

        <InfoCard
          icon={<Mail />}
          title={t.emailTitle}
          subtitle="purewindmadakiteschool@gmail.com"
          note={t.emailNote}
        />

        <InfoCard
          icon={<MapPin />}
          title={t.addressTitle}
          subtitle="Baie de Sakalava"
          note={t.addressNote}
        />

        <InfoCard
          icon={<Clock />}
          title={t.hoursTitle}
          subtitle={t.hoursWeek}
          note={t.hoursWeekend}
        />

      </section>

      {/* BOUTON FLOTTANT */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        className="fixed right-4 bottom-28 z-50 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-xl"
      >
        <Phone className="text-white" />
      </a>

    </main>
  );
}

/* ===== CARTE INFO ===== */

function InfoCard({
  icon,
  title,
  subtitle,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  note: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 flex gap-4 cursor-pointer items-start border border-gray-300 shadow-sm">
      <div className="w-12 h-12 rounded-full text-white bg-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-700">{subtitle}</p>
        <p className="text-xs text-gray-500">{note}</p>
      </div>
    </div>
  );
}