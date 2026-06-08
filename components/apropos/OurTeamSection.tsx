import Image from "next/image";
import type { AproposDictionary, TeamMember } from "./types";

interface OurTeamSectionProps {
  t: AproposDictionary;
}

/**
 * Section "Notre Équipe" avec la grille des membres.
 * S'adapte selon le nombre de membres : spotlight horizontal pour 1, grille pour plusieurs.
 */
export default function OurTeamSection({ t }: OurTeamSectionProps) {
  const members: readonly TeamMember[] = t.teamMembers;
  const isSolo = members.length === 1;

  const gridCols =
    members.length === 2
      ? "sm:grid-cols-2"
      : members.length === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
          <div className="max-w-2xl">
            <span className="text-secondary font-sans uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
              {t.ourTeamTitle}
            </h2>
          </div>
          <div className="hidden md:block w-32 h-px bg-border"></div>
        </div>

        {isSolo ? (
          <SoloMemberSpotlight membre={members[0]} t={t} />
        ) : (
          <div className={`grid ${gridCols} gap-px bg-border rounded-2xl overflow-hidden shadow-sm`}>
            {members.map((membre: TeamMember, index: number) => (
              <TeamCard key={index} membre={membre} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface TeamCardProps {
  membre: TeamMember;
  t: AproposDictionary;
}

/** Carte compacte dans la grille multi-membres */
function TeamCard({ membre, t }: TeamCardProps) {
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
      <h3 className="font-heading font-bold text-xl text-foreground tracking-tight mb-2">{membre.nom}</h3>
      <p className="font-heading uppercase tracking-widest text-[10px] text-secondary font-semibold mb-6">{membre.role}</p>
      <p className="text-muted-foreground font-light text-sm leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
        {membre.description}
      </p>
      {/* Mobile: always show description */}
      <p className="text-muted-foreground font-light text-sm leading-relaxed block md:hidden">{membre.description}</p>
    </div>
  );
}

/** Spotlight horizontal pour un seul membre */
function SoloMemberSpotlight({ membre, t }: TeamCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row group max-w-3xl mx-auto">
      <div className="relative w-full md:w-72 shrink-0 aspect-3/4 md:aspect-auto md:h-auto overflow-hidden">
        <Image
          src={membre.image}
          alt={t.teamMemberAlt.replace("{name}", membre.nom).replace("{role}", membre.role)}
          fill
          className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12 gap-4">
        <span className="text-secondary font-heading uppercase tracking-[0.2em] text-xs font-semibold">
          {membre.role}
        </span>
        <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">
          {membre.nom}
        </h3>
        <div className="w-10 h-1 bg-secondary rounded-full" />
        <p className="text-muted-foreground font-light leading-relaxed text-base">
          {membre.description}
        </p>
      </div>
    </div>
  );
}
