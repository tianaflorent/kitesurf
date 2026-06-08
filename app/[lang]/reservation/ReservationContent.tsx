"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {  ArrowLeft } from "lucide-react";
import { type Dictionary } from "@/context/translations";

export default function ReservationContent({ dictionary, lang }: { dictionary: Dictionary["reservation"], lang: string }) {
  const t = dictionary;

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [niveau, setNiveau] = useState<string>(t.beginner);
  const [date, setDate] = useState("");
  const [nombre, setNombre] = useState(1);
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "261377147300";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const message = `${t.whatsappMessage}
- ${t.name} : ${nom}
- ${t.email} : ${email}
- ${t.phone} : ${telephone}
- ${t.level} : ${niveau}
- ${t.date} : ${date}
- ${t.people} : ${nombre}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
    }, 800);
  };

  return (
    <main className="bg-background min-h-screen">

      {/* 1. HERO */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260304-WA0043.jpg"
            alt="Réservation de cours de kitesurf – Pure Wind Kite School Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <span className="text-secondary font-heading uppercase tracking-widest text-xs font-bold mb-6 block">
              {lang === "fr" ? "Réservation" : "Booking"}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-extrabold tracking-tight leading-[1.1] mb-8">
              {t.title}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-12 h-1 bg-secondary rounded-full"></span>
            <span className="text-secondary font-heading font-bold text-lg uppercase tracking-widest">Booking</span>
          </div>
        </div>
      </section>

      {/* 2. FORM + SIDEBAR */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT: FORM */}
          <div className="w-full lg:w-7/12">
            <div className="bg-card p-8 md:p-16 border border-border rounded-2xl shadow-sm">
              <span className="text-secondary font-heading uppercase tracking-widest text-xs font-bold mb-6 block">
                {lang === "fr" ? "Formulaire" : "Form"}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground font-bold tracking-tight mb-4">
                {t.title}
              </h2>
              <div className="w-10 h-1 bg-secondary rounded-full mb-12" />

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="relative z-0 w-full mb-10 group">
                  <input type="text" name="nom" id="reservation-nom" placeholder=" " value={nom} onChange={(e) => setNom(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light transition-colors" />
                  <label htmlFor="reservation-nom" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.name}
                  </label>
                </div>

                {/* Email */}
                <div className="relative z-0 w-full mb-10 group">
                  <input type="email" name="email" id="reservation-email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light transition-colors" />
                  <label htmlFor="reservation-email" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.email}
                  </label>
                </div>

                {/* Phone */}
                <div className="relative z-0 w-full mb-10 group">
                  <input type="tel" name="telephone" id="reservation-tel" placeholder=" " value={telephone} onChange={(e) => setTelephone(e.target.value)} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light transition-colors" />
                  <label htmlFor="reservation-tel" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.phone}
                  </label>
                </div>

                {/* Level + Date row */}
                <div className="grid md:grid-cols-2 gap-10 mb-10">
                  <div className="relative z-0 w-full group">
                    <select value={niveau} onChange={(e) => setNiveau(e.target.value)}
                      className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary font-light cursor-pointer">
                      <option className="bg-background text-foreground">{t.beginner}</option>
                      <option className="bg-background text-foreground">{t.intermediate}</option>
                      <option className="bg-background text-foreground">{t.advanced}</option>
                    </select>
                    <label className="absolute text-sm text-muted-foreground uppercase tracking-widest -translate-y-6 scale-75 top-3 origin-left">
                      {t.level}
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input type="date" name="date" id="reservation-date" value={date} onChange={(e) => setDate(e.target.value)} required
                      className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary font-light" />
                    <label htmlFor="reservation-date" className="absolute text-sm text-muted-foreground uppercase tracking-widest -translate-y-6 scale-75 top-3 origin-left">
                      {t.date}
                    </label>
                  </div>
                </div>

                {/* Number of people */}
                <div className="relative z-0 w-full mb-10 group">
                  <input type="number" name="nombre" id="reservation-nombre" min={1} value={nombre} onChange={(e) => setNombre(Number(e.target.value))} required
                    className="block py-3 px-0 w-full text-base text-foreground bg-transparent border-0 border-b border-border appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer font-light transition-colors" />
                  <label htmlFor="reservation-nombre" className="peer-focus:font-medium absolute text-sm text-muted-foreground uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {t.people}
                  </label>
                </div>

                <button type="submit" disabled={loading}
                  className={`w-full cursor-pointer bg-primary hover:bg-primary/90 transition-all text-primary-foreground font-heading uppercase tracking-widest text-xs font-semibold py-4 rounded-full flex items-center justify-center gap-3 mt-12 active:scale-[0.98] ${loading ? "opacity-70" : "opacity-100"}`}
                >
                  {loading ? <span className="animate-pulse">{t.send}...</span> : <>{t.send}</>}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: INFO SIDEBAR */}
          <div className="w-full lg:w-5/12 space-y-16">
            {/* Payment */}
            <div>
              <span className="text-secondary font-heading uppercase tracking-widest text-xs font-bold mb-6 block">
                {lang === "fr" ? "Paiement" : "Payment"}
              </span>
              <h2 className="text-4xl md:text-5xl font-heading text-foreground font-bold tracking-tight mb-12">
                {t.paymentTitle}
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <span className="text-3xl font-heading font-extrabold text-secondary opacity-80 group-hover:opacity-100 transition-all">01</span>
                  <div>
                    <h3 className="font-heading text-xl text-foreground font-semibold mb-1">{t.orangeMoney}</h3>
                    <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground/60">{lang === "fr" ? "Paiement mobile" : "Mobile payment"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <span className="text-3xl font-heading font-extrabold text-secondary opacity-80 group-hover:opacity-100 transition-all">02</span>
                  <div>
                    <h3 className="font-heading text-xl text-foreground font-semibold mb-1">{t.cash}</h3>
                    <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground/60">{lang === "fr" ? "Sur place" : "On site"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-border"></div>

            {/* Help */}
            <div>
              <span className="text-secondary font-heading uppercase tracking-widest text-xs font-bold mb-6 block">
                {lang === "fr" ? "Assistance" : "Support"}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground font-bold tracking-tight mb-8">
                {t.helpTitle}
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">
                {t.helpText}
              </p>

              <div className="space-y-6">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                  className="block bg-card border border-border rounded-xl p-6 hover:border-secondary transition-all duration-300 group shadow-sm hover:shadow-md">
                  <h3 className="font-heading text-lg text-foreground font-bold mb-2 group-hover:text-secondary transition-colors">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.whatsappText}</p>
                </a>
                <a href="mailto:purewindmadakiteschool@gmail.com"
                  className="block bg-card border border-border rounded-xl p-6 hover:border-secondary transition-all duration-300 group shadow-sm hover:shadow-md">
                  <h3 className="font-heading text-lg text-foreground font-bold mb-2 group-hover:text-secondary transition-colors">Email</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.emailText}</p>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="block bg-card border border-border rounded-xl p-6 hover:border-secondary transition-all duration-300 group shadow-sm hover:shadow-md">
                  <h3 className="font-heading text-lg text-foreground font-bold mb-2 group-hover:text-secondary transition-colors">Facebook</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.facebookText}</p>
                </a>
              </div>
            </div>

            {/* Back */}
            <Link href={`/${lang}/cours`}
              className="inline-flex items-center gap-4 text-foreground font-heading uppercase tracking-widest text-xs font-semibold hover:text-secondary transition-colors group mt-8">
              <ArrowLeft size={16} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
              {t.back}
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

