import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary, ServiceKey } from "./types";
import { getServiceDetailsLabel, getContactToBookLabel } from "./utils";
import Modal from "@/components/reusable/Modal";

interface ServiceDetailsModalProps {
  t: CoursDictionary;
  lang: Locale;
  selectedService: ServiceKey | null;
  onClose: () => void;
}

/**
 * Modal affichant les détails d'un service (excursions ou hébergement).
 */
export default function ServiceDetailsModal({
  t,
  lang,
  selectedService,
  onClose,
}: ServiceDetailsModalProps) {
  if (!selectedService) return null;

  const isExcursions = selectedService === "excursions";

  return (
    <Modal isOpen={!!selectedService} onClose={onClose} className="flex flex-col md:flex-row h-full max-h-[800px]">
      <div className="w-full md:w-1/2 relative h-64 md:h-full">
        <Image
          src={isExcursions ? "/images/IMG-20260305-WA0006.jpg" : "/images/IMG-20260305-WA0005.jpg"}
          alt={isExcursions ? "Excursions" : "Hébergement"}
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
        <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
          {getServiceDetailsLabel(lang)}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-foreground font-light tracking-tighter mb-8">
          {isExcursions ? t.excursions : t.accommodation}
        </h2>

        <div className="w-12 h-px bg-primary mb-8" />

        <p className="text-muted-foreground font-light leading-loose mb-12 text-lg">
          {isExcursions ? t.excursionsDesc : t.accommodationDesc}
        </p>

        <div className="mt-auto">
          <Link
            href={`/${lang}/contact`}
            onClick={onClose}
            className="inline-block text-center w-full uppercase tracking-widest text-xs px-8 py-5 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {getContactToBookLabel(lang)}
          </Link>
        </div>
      </div>
    </Modal>
  );
}
