"use client";

import { type Dictionary } from "@/context/translations";
import type { AproposDictionary } from "@/components/apropos/types";
import AproposHeroSection from "@/components/apropos/AproposHeroSection";
import OurStorySection from "@/components/apropos/OurStorySection";
import OurValuesSection from "@/components/apropos/OurValuesSection";
import OurTeamSection from "@/components/apropos/OurTeamSection";
import PhilosophySection from "@/components/apropos/PhilosophySection";

export default function AproposContent({ dictionary }: { dictionary: Dictionary["apropos"] }) {
  const t = dictionary as AproposDictionary;

  return (
    <main className="bg-background overflow-hidden pb-0">
      <AproposHeroSection t={t} />
      <OurStorySection t={t} />
      <OurValuesSection t={t} />
      <OurTeamSection t={t} />
      <PhilosophySection t={t} />
    </main>
  );
}
