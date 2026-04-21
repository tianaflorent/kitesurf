"use client";

import { useLanguage } from "@/context/LanguageContext";
import { dictionaries } from "@/context/translations";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQContent() {
  const { lang } = useLanguage();
  const t = dictionaries[lang].faq;

  return (
    <section className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {t.pageTitle}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.pageDescription}
        </p>

        <div className="space-y-4">
          {t.faqItems.map((item: FAQItem, i: number) => (
            <details key={i} className="bg-white rounded-xl shadow p-6 cursor-pointer group">
              <summary className="flex flex-col items-start font-semibold text-lg cursor-pointer">
                <div className="flex justify-between w-full items-center">
                  <span>{item.question}</span>
                  <span className="transition-transform group-open:rotate-45 text-cyan-600 ml-4 shrink-0">+</span>
                </div>
                <span className="text-cyan-600 text-sm mt-1">{t.seeAnswer}</span>
              </summary>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/apropos" className="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-cyan-500 transition">
            {t.backButton}
          </a>
        </div>
      </div>
    </section>
  );
}
