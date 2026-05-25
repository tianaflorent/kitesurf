"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { type Dictionary } from "@/context/translations";

export default function FAQContent({ dictionary, lang }: { dictionary: Dictionary["faq"], lang: string }) {
  const t = dictionary;

  return (
    <main className="bg-background min-h-screen">

      {/* HERO */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260304-WA0043.jpg"
            alt="FAQ – Pure Wind Kite School Madagascar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-12 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground font-light tracking-tighter leading-[0.9] mb-6">
              {t.pageTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-xl">
              {t.pageDescription}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 pb-4">
            <span className="w-16 h-px bg-secondary"></span>
            <span className="text-secondary font-script text-3xl">FAQ</span>
          </div>
        </div>
      </section>

      {/* ACCORDION */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="divide-y divide-border border-y border-border">
            {t.faqItems.map((item: { question: string; answer: string }, i: number) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-border">
            <Link href={`/${lang}/contact`}
              className="inline-flex items-center gap-4 text-foreground font-sans uppercase tracking-[0.2em] text-xs font-light hover:text-secondary transition-colors group">
              <ArrowLeft size={16} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
              {t.backButton}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-8 py-8 text-left cursor-pointer"
      >
        <div className="flex items-center gap-6">
          <span className="text-secondary/50 font-script text-2xl min-w-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-lg md:text-xl text-foreground font-light tracking-tight group-hover:text-secondary transition-colors">
            {question}
          </h3>
        </div>
        <div className="text-secondary shrink-0">
          {open ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
        </div>
      </button>
      {open && (
        <div className="pb-8 pl-14 pr-8">
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

