import { fetchAPI } from "../_utils/strapiApi";
import { Page as PageType } from "@contentTypes/page/content-types/page/page";
import { notFound } from "next/navigation";
import { getPageSection } from "../_utils/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pages: PageType[] = (await fetchAPI("/pages", { populate: "*" })).data;

  const page: PageType | undefined = pages.find((page) => {
    return page.attributes.slug === params.page;
  });

  return {
    title: page?.attributes.title,
    description: page?.attributes.description,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_FRONTEND_URL + "/" + page?.attributes.slug,
    },
  };
}

export async function generateStaticParams() {
  const pages: PageType[] = (await fetchAPI("/pages", { populate: "*" })).data;

  return pages.map((page: PageType) => ({
    page: page.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { page: string } }) {
  type ExtendedPageType = {
    id: number;
    attributes: Omit<PageType["attributes"], "page"> & { page: Array<{ __component: string }> };
  };

  const pageData: ExtendedPageType & {} = (await fetchAPI("/pages", { filters: { slug: { $eq: params.page } } })).data[0];

  if (!pageData) return notFound();
  return <main>{pageData.attributes.page.map((pageSection, i) => getPageSection(pageSection, i))}</main>;
}
