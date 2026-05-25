import Image from "next/image";
import type { AproposDictionary, TeamMember } from "./types";

interface OurTeamSectionProps {
  t: AproposDictionary;
}

/**
 * Section "Notre Équipe" avec la grille des membres.
 */
export default function OurTeamSection({ t }: OurTeamSectionProps) {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
          <div className="max-w-2xl">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-light tracking-tighter">
              {t.ourTeamTitle}
            </h2>
          </div>
          <div className="hidden md:block w-32 h-px bg-border"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {t.teamMembers.map((membre: TeamMember, index: number) => (
            <TeamCard key={index} membre={membre} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TeamCardProps {
  membre: TeamMember;
  t: AproposDictionary;
}

function TeamCard({ membre, t }: TeamCardProps) {
  const initial = membre.nom.charAt(0).toUpperCase();

  return (
    <div className="bg-background group relative flex flex-col p-8 md:p-10">
      <div className="relative aspect-3/4 w-full mb-8 overflow-hidden">
        <Image
          src={membre.image}
          alt={t.teamMemberAlt.replace("{name}", membre.nom).replace("{role}", membre.role)}
          fill
          className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="font-serif text-2xl text-foreground font-light tracking-tight mb-2">{membre.nom}</h3>
      <p className="font-sans uppercase tracking-widest text-[10px] text-secondary font-medium mb-6">{membre.role}</p>
      <p className="text-muted-foreground font-light text-sm leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
        {membre.description}
      </p>
      {/* On mobile, always show description */}
      <p className="text-muted-foreground font-light text-sm leading-relaxed block md:hidden">{membre.description}</p>
    </div>
  );
}
