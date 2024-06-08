import { MetadataRoute } from "next";
import { fetchAPI } from "./_utils/strapiApi";
import { Page as PageType } from "@contentTypes/page/content-types/page/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: PageType[] = (await fetchAPI("/pages", { populate: "*" })).data;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_FRONTEND_URL ?? "",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = pages.map((page: PageType) => ({
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${page.attributes.slug}`,
    lastModified: new Date(page.attributes.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
