import type { Metadata } from "next";
import { Libre_Baskerville, Alatsi, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import { fetchAPI } from "./_utils/strapiApi";
import { MetaData as MetaDataType } from "@contentTypes/meta-data/content-types/meta-data/meta-data";

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
});

const baskervilleItalic = Libre_Baskerville({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-baskerville-italic",
  subsets: ["latin"],
  style: "italic",
});

const alatsi = Alatsi({
  weight: ["400"],
  display: "swap",
  variable: "--font-alatsi",
  subsets: ["latin"],
});

const grotesk = Schibsted_Grotesk({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metaData: MetaDataType = (await fetchAPI("/meta-data", { populate: "*" })).data;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL ?? ""),
    title: {
      absolute: metaData.attributes.homepageTitle,
      default: metaData.attributes.homepageTitle,
      template: metaData.attributes.subsequentPageTitleTemplate,
    },
    description: metaData.attributes.homepageDescription,
    openGraph: {
      type: "website",
      // url: process.env.NEXT_PUBLIC_FRONTEND_URL,
      title: "Ride to Walk",
      description: metaData.attributes.openGraphDescription,
      siteName: "Ride to Walk",
      images: metaData.attributes.openGraphImage?.data.attributes.url,
    },
    applicationName: "Ride to Walk",
    keywords: [
      "Ride to Walk",
      "Ranch",
      "Therapeutic horseback riding",
      "Hippotherapy",
      "Equine therapy",
      "Disabilities",
      "Penryn, CA",
      "Non-profit organization",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaData: MetaDataType = (await fetchAPI("/meta-data", { populate: "*" })).data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ride to Walk",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    logo: metaData.attributes.openGraphImage?.data.attributes.url,
    description: metaData.attributes.homepageDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2460 Delmar Ave",
      addressLocality: "Penryn",
      addressRegion: "CA",
      postalCode: "95663",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-916-791-2747",
      contactType: "customer service",
    },
    sameAs: ["https://www.facebook.com/RideToWalk", "https://www.instagram.com/ride_to_walk/"],
  };

  return (
    <html lang="en" className={`${baskerville.variable} ${alatsi.variable} ${grotesk.variable} ${baskervilleItalic.variable}`}>
      <body className="bg-white blur-3xl filter devOnlyDeleteAfterDone:blur-none devOnlyDeleteAfterDone:filter-none">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar></Navbar>
        <div className="mx-auto min-h-screen max-w-[1366px] overflow-x-hidden bg-white shadow-xl shadow-slate-500">
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
