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
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight mb-8">
          {isExcursions ? t.excursions : t.accommodation}
        </h2>

        <div className="w-12 h-1 bg-secondary mb-8 rounded-full" />

        <p className="text-muted-foreground font-light leading-loose mb-12 text-lg">
          {isExcursions ? t.excursionsDesc : t.accommodationDesc}
        </p>

        <div className="mt-auto">
          <Link
            href={`/${lang}/contact`}
            onClick={onClose}
            className="inline-block text-center w-full uppercase tracking-[0.15em] text-xs px-8 py-4 bg-primary text-primary-foreground border-2 border-primary rounded-full font-heading font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {getContactToBookLabel(lang)}
          </Link>
        </div>
      </div>
    </Modal>
  );
}
