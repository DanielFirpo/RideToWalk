import { Metadata } from "next";
import { fetchAPI } from "../_utils/strapiApi";
import { ContactPage } from "@contentTypes/contact-page/content-types/contact-page/contact-page";
import TitleHeader from "../_components/page_sections/TitleHeader";
import { ContactForm } from "../_components/contact_us/ContactForm";
import { addHighlightsLinksAndNewLines } from "../_utils/utils";
import { z } from "zod";
import { Resend } from "resend";
import Email, { EmailTemplate } from "../_components/contact_us/EmailTemplate";

export async function generateMetadata(): Promise<Metadata> {
  const pageData: ContactPage = (await fetchAPI("/contact-page", { populate: "*" })).data;

  return {
    title: pageData?.attributes.pageTitle,
    description: pageData?.attributes.pageDescription,
  };
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
  honeypot: z.string().optional(),
});

export default async function Page() {
  // async function emailFormData(formData: z.infer<typeof contactFormSchema>) {
  //   "use server";
  //   const result = contactFormSchema.safeParse(formData);

  //   if (result.success) {
  //     if (result.data.honeypot === "") {
  //       const resend = new Resend(process.env.RESEND_KEY);

  //       const email = await resend.emails.send({
  //         from: `${result.data.firstName} ${result.data.lastName} <onboarding@resend.dev>`,
  //         to: [process.env.CONTACT_FORM_TO_ADDRESS ?? ""],
  //         subject: `New RideToWalk.org Contact Form Submission from '${result.data.firstName} ${result.data.lastName}' <${result.data.email}>`,
  //         react: (
  //           <EmailTemplate
  //             firstName={result.data.firstName}
  //             lastName={result.data.lastName}
  //             email={result.data.email}
  //             message={result.data.message}
  //           ></EmailTemplate>
  //         ),
  //         headers: {
  //           "X-Entity-Ref-ID": "123456789",
  //         },
  //         tags: [
  //           {
  //             name: "category",
  //             value: "contact_email",
  //           },
  //         ],
  //       });
  //       console.log(JSON.stringify(email));
  //     }
  //   }
  // }

  const pageData: ContactPage = (await fetchAPI("/contact-page", { populate: "*" })).data;

  return (
    <main>
      <TitleHeader sectionData={{ title: pageData?.attributes.pageTitle }}></TitleHeader>
      {pageData.attributes.aboveFormText && (
        <div className="mt-20 py-10 text-center font-grotesk text-xl font-bold">
          {addHighlightsLinksAndNewLines(pageData.attributes.aboveFormText, [])}
        </div>
      )}
      <ContactForm emailFormData={() => {}}></ContactForm>
      {pageData.attributes.belowFormText && (
        <div className="mb-32 py-10 text-center font-grotesk text-base font-bold">
          {addHighlightsLinksAndNewLines(pageData.attributes.belowFormText, [])}
        </div>
      )}
    </main>
  );
}
