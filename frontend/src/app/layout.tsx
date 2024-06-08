import type { Metadata } from "next";
import { Libre_Baskerville, Alatsi, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";

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

export const metadata: Metadata = {
  title: {
    absolute: "Ride to Walk - Therapeutic Horseback Riding in Penryn, CA | Empowering Individuals through Hippotherapy",
    default: "Ride to Walk - Therapeutic Horseback Riding in Penryn, CA | Empowering Individuals through Hippotherapy",
    template: "%s | Ride to Walk - Therapeutic Horseback Riding in Penryn, CA",
  },
  description:
    "Ride to Walk, located in Penryn, CA, offers therapeutic horseback riding programs for individuals with neurological disabilities. Our hippotherapy sessions improve physical, emotional, and cognitive well-being. Founded in 1985, we are a non-profit dedicated to empowering our community through the healing power of horses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baskerville.variable} ${alatsi.variable} ${grotesk.variable} ${baskervilleItalic.variable}`}>
      <body className="bg-slate-200 blur-3xl filter devOnlyDeleteAfterDone:blur-none devOnlyDeleteAfterDone:filter-none">
        <Navbar></Navbar>
        <div className="mx-auto min-h-screen max-w-[1366px] overflow-x-hidden bg-white shadow-3xl shadow-slate-500">
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
