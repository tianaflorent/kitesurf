import type { Dictionary } from "@/context/translations";

export type AproposDictionary = Dictionary["apropos"];

export interface TeamMember {
  nom: string;
  role: string;
  description: string;
  image: string;
}
