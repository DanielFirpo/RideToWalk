import { fetchAPI } from "../_utils/strapiApi";
import { Page as PageType } from "@contentTypes/page/content-types/page/page";
import { notFound } from "next/navigation";
import { getPageSection } from "../_utils/utils";

export async function generateStaticParams() {
  const pages: PageType[] = (await fetchAPI("/pages", { populate: "*" })).data;

  return pages.map((page: PageType) => ({
    slug: page.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { page: string } }) {
  type ExtendedPageType = {
    id: number;
    attributes: Omit<PageType["attributes"], "page"> & { page: Array<{ __component: string }> };
  };

  const pageData: ExtendedPageType & {} = (await fetchAPI("/pages", { populate: "*", filters: { slug: { $eq: params.page } } }))
    .data[0];
  if (!pageData) return notFound();
  console.log(pageData.attributes.page[0].__component);
  return <main>{pageData.attributes.page.map((pageSection, i) => getPageSection(pageSection, i))}</main>;
}
