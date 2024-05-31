import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Navbar></Navbar>
        <div className="mx-auto min-h-screen max-w-[1366px] bg-white px-10 pb-10 pt-5">{children}</div>
      </body>
    </html>
  );
}
