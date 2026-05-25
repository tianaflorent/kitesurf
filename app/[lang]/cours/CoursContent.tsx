"use client";

import { useMemo, useState } from "react";
import { type Dictionary } from "@/context/translations";
import type { Locale } from "@/i18n-config";
import useBodyScrollLock from "@/app/hooks/useBodyScrollLock";
import type { CoursDictionary, EquipmentItem, ServiceKey } from "@/components/cours/types";
import CoursHeroSection from "@/components/cours/CoursHeroSection";
import PackagesSection from "@/components/cours/PackagesSection";
import EquipmentSection from "@/components/cours/EquipmentSection";
import OtherServicesSection from "@/components/cours/OtherServicesSection";
import ServiceDetailsModal from "@/components/cours/ServiceDetailsModal";
import EquipmentDetailsModal from "@/components/cours/EquipmentDetailsModal";

interface CoursContentProps {
  dictionary: Dictionary["cours"];
  lang: Locale;
}

/**
 * Page principale des cours de kitesurf.
 * Composant principal qui orchestre les différentes sections.
 */
export default function CoursContent({ dictionary, lang }: CoursContentProps) {
  const t = dictionary as CoursDictionary;
  const [selectedService, setSelectedService] = useState<ServiceKey | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  // Verrouille le scroll du body quand un modal est ouvert
  useBodyScrollLock(Boolean(selectedService || selectedEquipment));

  // Données des équipements
  const equipments = useMemo<EquipmentItem[]>(
    () => [
      { title: t.kite, desc: t.kiteDesc, img: "/images/best-ts-2016-8m.jpg", alt: "Cerf-volant (kite)" },
      { title: t.bar, desc: t.barDesc, img: "/images/fone-atom-bar-2026.jpg", alt: "Barre de contrôle" },
      { title: t.lines, desc: t.linesDesc, img: "/images/lignes-de-kitesurf-adaptables-toutes-marques.jpg", alt: "Lignes" },
      { title: t.board, desc: t.boardDesc, img: "/images/5760.jpg", alt: "Planche twintip" },
      {
        title: t.straps,
        desc: t.strapsDesc,
        img: "/images/Kiteboards-2-Foot-Pad-2-Foot-Strap-Accessory-Set-Deck-Pad-Set-for-Kite-Surf-Accessories.jpg",
        alt: "Straps",
      },
      { title: t.harness, desc: t.harnessDesc, img: "/images/harnais-kitesurf-ceinture-homme-prolimit-addict.jpg", alt: "Harnais" },
      { title: t.vest, desc: t.vestDesc, img: "/images/IMG-20260305-WA0004.jpg", alt: "Gilet" },
      { title: t.helmet, desc: t.helmetDesc, img: "/images/121084_1.jpg", alt: "Casque" },
      { title: t.wetsuit, desc: t.wetsuitDesc, img: "/images/star-5-3-frontzip-combinaison-neoprene-287937.jpg", alt: "Combinaison" },
    ],
    [t]
  );

  return (
    <main className="bg-background overflow-hidden pb-0">
      <CoursHeroSection t={t} lang={lang} />
      <PackagesSection t={t} lang={lang} />
      <EquipmentSection t={t} lang={lang} equipments={equipments} onSelectEquipment={setSelectedEquipment} />
      <OtherServicesSection t={t} lang={lang} onSelectService={setSelectedService} />
      <ServiceDetailsModal t={t} lang={lang} selectedService={selectedService} onClose={() => setSelectedService(null)} />
      <EquipmentDetailsModal t={t} lang={lang} selectedEquipment={selectedEquipment} onClose={() => setSelectedEquipment(null)} />
    </main>
  );
}
