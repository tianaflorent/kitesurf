import type { MetadataRoute } from "next";

const BASE_URL = "https://purewindkiteschool.vercel.app";
const locales = ["fr", "en"];
const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/cours", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/reservation", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/apropos", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/galerie", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/temoignages", priority: 0.6, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    return locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr${route.path}`,
          en: `${BASE_URL}/en${route.path}`,
        },
      },
    }));
  });
}
