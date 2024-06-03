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
  title: "Ride to Walk",
  description:
    "Ride to Walk is a nonprofit organization located in Penryn, CA providing therapeutic horse riding for children and adults with special needs ranging from learning disabilities to quadriplegia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baskerville.variable} ${alatsi.variable} ${grotesk.variable} ${baskervilleItalic.variable}`}>
      <body className="devOnlyDeleteAfterDone:blur-none devOnlyDeleteAfterDone:filter-none bg-slate-200 blur-3xl filter">
        <Navbar></Navbar>
        <div className="shadow-3xl mx-auto min-h-screen max-w-[1366px] overflow-x-hidden bg-white shadow-slate-500">
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
