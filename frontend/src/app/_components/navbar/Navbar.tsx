import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Navbar as NavbarType } from "@contentTypes/navbar/content-types/navbar/navbar";

import NavbarLinks from "./NavbarLinks";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Button } from "../shadcn/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../shadcn/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/shadcn/accordion";

export default async function Navbar() {
  const navData: NavbarType = (await fetchAPI("/navbar", { populate: "*" })).data;

  type LinkCategory =
    | "homeLinks"
    | "aboutUsLinks"
    | "takeActionLinks"
    | "ridingProgramLinks"
    | "eventsAndActivitiesLinks"
    | "horseBoardingLinks";
  const linkCategories: LinkCategory[] = [
    "homeLinks",
    "aboutUsLinks",
    "takeActionLinks",
    "ridingProgramLinks",
    "eventsAndActivitiesLinks",
    "horseBoardingLinks",
  ];

  return (
    <>
      <header className="relative text-nowrap">
        <div className="absolute ml-12 flex h-full w-36 items-center bg-white text-center font-alatsi">
          <Image
            className="p-1 pt-0"
            src={process.env.NEXT_PUBLIC_API_URL + navData.attributes.logo.data.attributes.url}
            alt=""
            width={navData.attributes.logo.data.attributes.width}
            height={navData.attributes.logo.data.attributes.height}
            priority
          />
          {/* <div className="font-gigabold mx-auto text-center text-xl uppercase">{navData.attributes.name}</div>
          <div className="mx-auto text-center text-xs font-bold uppercase">{navData.attributes.slogan}</div> */}
        </div>
        <div className="absolute ml-48 border-l-[.9rem] border-t-[2.5rem] border-solid border-l-[#707a75] border-t-transparent"></div>
        <div className="flex h-10 w-full items-center bg-oliveGreen pl-52 font-grotesk text-xs 2xl:text-sm">
          <div className="hidden w-full md:flex">
            {navData?.attributes.announcementText && (
              <Marquee className="mx-8 !hidden pl-6 xl:!flex" pauseOnHover={true}>
                <span className="px-2 text-[#dfbebe]">{navData?.attributes.announcementText}</span>
                {navData?.attributes.announcementLink && (
                  <Link className="pr-4 text-[#dfbebe] underline" href={navData?.attributes.announcementLink?.linkAddress}>
                    {navData?.attributes.announcementLink?.linkText}
                  </Link>
                )}
              </Marquee>
              // <div className="hidden pl-6 text-xs xl:flex">
              //   <span className="text-winterHazel pr-2">{navData?.attributes.announcementText}</span>
              //   {navData?.attributes.announcementLink && (
              //     <Link className="text-winterHazel underline" href={navData?.attributes.announcementLink?.linkAddress}>
              //       {navData?.attributes.announcementLink?.linkText}
              //     </Link>
              //   )}
              // </div>
            )}
            <div className="ml-auto mr-7 flex items-center">
              <div className="flex items-center pr-4 text-eggshell">
                <span className="icon-[mdi--address-marker] mr-1 h-5 w-5 text-terracottaOrange"></span>
                <address className="not-italic">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Ride+To+Walk/@38.8480856,-121.2161017,15z/data=!4m2!3m1!1s0x0:0x226fd13fb123fc4a?sa=X&ved=1t:2428&ictx=111"
                  >
                    {navData?.attributes.address}
                  </a>
                </address>
              </div>
              <div className="flex items-center px-4 text-eggshell">
                <span className="icon-[streamline--send-email-solid] mr-2 h-4 w-4 text-terracottaOrange"></span>
                <a href={"mailto:" + navData?.attributes.email}>{navData?.attributes.email}</a>
              </div>
              <div className="flex items-center px-4 text-eggshell">
                <span className="icon-[fa-solid--phone] mr-2 h-4 w-4 text-terracottaOrange"></span>
                <a href={"tel:" + navData?.attributes.phoneNumber?.replace(/\D/g, "")}>{navData?.attributes.phoneNumber}</a>
              </div>
              <div className="ml-6 hidden items-center justify-between gap-2 lg:flex">
                {navData.attributes.facebookLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.facebookLink} aria-label="Facebook">
                    <span className="icon-[fa-brands--facebook-f] h-[1.2rem] w-[1.2rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.instagramLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.instagramLink} aria-label="Instagram">
                    <span className="icon-[mdi--instagram] h-[1.4rem] w-[1.4rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.tiktokLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.tiktokLink} aria-label="TikTok">
                    <span className="icon-[ic--baseline-tiktok] h-[1.6rem] w-[1.6rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.youtubeLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.youtubeLink} aria-label="YouTube">
                    <span className="icon-[mdi--youtube] h-7 w-7 text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.googleLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.googleLink} aria-label="Google">
                    <span className="icon-[bi--google] h-[1.1rem] w-[1.1rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.twitterLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.twitterLink} aria-label="Twitter">
                    <span className="icon-[pajamas--twitter] h-[1.3rem] w-[1.3rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.linkedInLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.linkedInLink} aria-label="LinkedIn">
                    <span className="icon-[ri--linkedin-fill] mb-0.5 h-[1.6rem] w-[1.6rem] text-terracottaOrange"></span>
                  </a>
                )}

                {navData.attributes.snapchatLink && (
                  <a target="_blank" className="flex items-center" href={navData.attributes.snapchatLink} aria-label="Snapchat">
                    <span className="icon-[ri--snapchat-fill] h-6 w-6 text-terracottaOrange"></span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex h-[80px] w-full items-center justify-center bg-rustyBrown pr-5 xl:pr-16 1.5xl:pr-8">
          <div className="hidden w-full items-center justify-center md:flex xl:justify-between">
            <div className="w-52"></div>
            <NavbarLinks navData={navData}></NavbarLinks>
            {navData?.attributes.donateButton && (
              <Link className="hidden 1.5xl:flex" href={navData?.attributes.donateButton?.linkAddress} target="_blank">
                <Button size={"large"}>{navData?.attributes.donateButton?.linkText}</Button>
              </Link>
            )}
          </div>
          <div className="ml-auto block md:hidden">
            <Sheet>
              <SheetTrigger>
                <span className="icon-[charm--menu-hamburger] h-10 w-10 text-white"></span>
                <span className="sr-only">Open Navigation Menu</span>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-rustyBrown pt-10">
                <Accordion type="single" className="mt-10 w-full">
                  {linkCategories.map((linkCategory) =>
                    navData?.attributes[linkCategory] && (navData?.attributes[linkCategory].length ?? 0) > 1 ? (
                      <AccordionItem key={linkCategory} value={linkCategory} className="my-8">
                        <AccordionTrigger className="text-white">
                          {navData?.attributes[linkCategory][0].linkText}
                        </AccordionTrigger>
                        {navData?.attributes[linkCategory].map((navLink) => (
                          <AccordionContent key={navLink.linkText}>
                            <Link
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
          </div>
        </div>
      </header>
    </>
  );
}
