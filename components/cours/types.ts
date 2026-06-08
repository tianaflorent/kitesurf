import type { Dictionary } from "@/context/translations";

export type ServiceKey = "excursions" | "accommodation";

export type EquipmentItem = {
  title: string;
  desc: string;
  img: string;
  alt: string;
};

export type CoursDictionary = Dictionary["cours"];

export type PackageItem = {
  key: "beginner" | "intermediate" | "advanced";
  index: "01" | "02" | "03";
  wrapperClassName: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  bullets: string[];
  ctaClassName: string;
};
