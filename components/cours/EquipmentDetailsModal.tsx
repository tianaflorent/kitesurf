import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { CoursDictionary, EquipmentItem } from "./types";
import { getEquipmentBrandLabel, getCloseLabel } from "./utils";
import Modal from "@/components/reusable/Modal";

interface EquipmentDetailsModalProps {
  t: CoursDictionary;
  lang: Locale;
  selectedEquipment: EquipmentItem | null;
  onClose: () => void;
}

/**
 * Modal affichant les détails d'un équipement.
 */
export default function EquipmentDetailsModal({
  lang,
  selectedEquipment,
  onClose,
}: EquipmentDetailsModalProps) {
  if (!selectedEquipment) return null;

  return (
    <Modal isOpen={!!selectedEquipment} onClose={onClose} className="flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[500px]">
      <div className="w-full md:w-1/2 relative h-64 md:h-full bg-muted/10 flex items-center justify-center p-6">
        <div className="relative w-full h-full min-h-[200px]">
          <Image src={selectedEquipment.img} alt={selectedEquipment.alt} fill className="object-contain" />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
        <span className="text-secondary font-sans uppercase tracking-[0.2em] text-[10px] font-semibold mb-4 block">
          {getEquipmentBrandLabel(lang)}
        </span>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight mb-6">
          {selectedEquipment.title}
        </h2>

        <div className="w-12 h-1 bg-secondary mb-6 rounded-full" />

        <p className="text-muted-foreground font-light leading-relaxed mb-8 text-sm">{selectedEquipment.desc}</p>

        <button
          onClick={onClose}
          className="inline-block text-center w-full uppercase tracking-[0.15em] text-xs py-3.5 bg-primary text-primary-foreground border-2 border-primary rounded-full font-heading font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          {getCloseLabel(lang)}
        </button>
      </div>
    </Modal>
  );
}
