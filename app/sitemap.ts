import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://crutsanimia-ron.vercel.app";
  const routes = [
    "/",
    "/piata",
    "/logistica",
    "/strunga",
    "/scofaluta",
    "/apa",
    "/cereri",
    "/beta",
    "/investment",
    "/investors",
    "/auth/login",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: path === "/" ? 1 : 0.8,
  }));
}
