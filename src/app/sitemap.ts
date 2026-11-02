import { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { caseStudiesData } from "@/lib/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://3dspline.cz";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudiesData.map((study) => ({
      url: `${baseUrl}/pribehy-z-dilny/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/obchodni-podminky`,
      lastModified: new Date("2026-10-22"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ochrana-osobnich-udaju`,
      lastModified: new Date("2026-10-22"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
