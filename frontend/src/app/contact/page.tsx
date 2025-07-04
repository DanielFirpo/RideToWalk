import { Metadata } from "next";
import { fetchAPI } from "../_utils/strapiApi";
import { ContactPage } from "@contentTypes/contact-page/content-types/contact-page/contact-page";
import TitleHeader from "../_components/page_sections/TitleHeader";
import { ContactForm } from "../_components/contact_us/ContactForm";
import { addHighlightsLinksAndNewLines } from "../_utils/utils";

export async function generateMetadata(): Promise<Metadata> {
  const pageData: ContactPage = (await fetchAPI("/contact-page", { populate: "*" })).data;

  return {
    title: pageData?.attributes.pageTitle,
    description: pageData?.attributes.pageDescription,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_FRONTEND_URL + "/contact",
    },
  };
}

export default async function ContactUs() {
  const pageData: ContactPage = (await fetchAPI("/contact-page", { populate: "*" })).data;

  return (
    <main>
      <TitleHeader sectionData={{ title: pageData?.attributes.pageTitle }}></TitleHeader>
      {pageData.attributes.aboveFormText && (
        <div className="mt-20 py-10 text-center font-grotesk text-xl font-bold">
          {addHighlightsLinksAndNewLines(pageData.attributes.aboveFormText, [])}
        </div>
      )}
      <ContactForm></ContactForm>
      {pageData.attributes.belowFormText && (
        <div className="mb-32 py-10 text-center font-grotesk text-base font-bold">
          {addHighlightsLinksAndNewLines(pageData.attributes.belowFormText, [])}
        </div>
      )}
    </main>
  );
}
