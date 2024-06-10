"use client";

import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Navbar as NavbarType } from "@contentTypes/navbar/content-types/navbar/navbar";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../shadcn/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/shadcn/accordion";
import { LinkCategory } from "@components/navbar/Navbar";
import { useState } from "react";

export default function MobileNavMenu({ linkCategories, navData }: { linkCategories: LinkCategory[]; navData: NavbarType }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <span className="icon-[charm--menu-hamburger] h-10 w-10 text-white"></span>
        <span className="sr-only">Open Navigation Menu</span>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto bg-rustyBrown pt-10">
        <Accordion type="single" className="mt-10 w-full">
          {linkCategories.map((linkCategory) =>
            navData?.attributes[linkCategory] && (navData?.attributes[linkCategory].length ?? 0) > 1 ? (
              <AccordionItem key={linkCategory} value={linkCategory} className="my-8">
                <AccordionTrigger className="text-white">{navData?.attributes[linkCategory][0].linkText}</AccordionTrigger>
                {navData?.attributes[linkCategory].map((navLink) => (
                  <AccordionContent key={navLink.linkText}>
                    <Link
                      onClick={() => setSheetOpen(false)}
                      className="block w-full select-none text-nowrap pl-3 font-grotesk text-base text-white underline transition-colors"
                      href={navLink.linkAddress}
                    >
                      {navLink.linkText}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            ) : (
              navData?.attributes[linkCategory] && (
                <Link
                  onClick={() => setSheetOpen(false)}
                  key={linkCategory}
                  className="mt-10 block w-full select-none text-nowrap font-grotesk text-base font-semibold text-white underline transition-colors"
                  href={navData?.attributes[linkCategory][0].linkAddress}
                >
                  {navData?.attributes[linkCategory][0].linkText}
                </Link>
              )
            ),
          )}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
