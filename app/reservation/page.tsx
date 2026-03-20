"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";
import { translationsReservation } from "@/context/translationreservation";

export default function ReservationPage() {
  const { lang } = useLanguage();
  const t = translationsReservation[lang];

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [niveau, setNiveau] = useState(t.beginner);
  const [date, setDate] = useState("");
  const [nombre, setNombre] = useState(1);

  const whatsappNumber = "261377147300";

  const handleSubmit = () => {
    const message = `${t.whatsappMessage}
- ${t.name} : ${nom}
- ${t.email} : ${email}
- ${t.phone} : ${telephone}
- ${t.level} : ${niveau}
- ${t.date} : ${date}
- ${t.people} : ${nombre}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-start py-16 px-6">

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-20">
        <h1 className="text-3xl font-bold text-cyan-700 mb-8 text-center">
          {t.title}
        </h1>

        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label className="block mb-2 font-semibold">{t.name}</label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">{t.phone}</label>
            <input
              type="tel"
              required
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">{t.level}</label>
            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            >
              <option>{t.beginner}</option>
              <option>{t.intermediate}</option>
              <option>{t.advanced}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">{t.date}</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">{t.people}</label>
            <input
              type="number"
              min={1}
              required
              value={nombre}
              onChange={(e) => setNombre(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition font-semibold"
          >
            {t.send}
          </button>
        </form>
      </div>

      <div className="mb-20">
        <Link
          href="/cours"
          className="inline-block mt-12 bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition font-semibold text-center"
        >
          {t.back}
        </Link>
      </div>

    </main>
  );
}