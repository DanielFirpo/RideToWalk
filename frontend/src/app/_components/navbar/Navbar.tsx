import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Navbar as NavbarType } from "@contentTypes/navbar/content-types/navbar/navbar";

import NavbarLinks from "./NavbarLinks";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Button } from "../shadcn/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../shadcn/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/shadcn/accordion";
import MobileNavMenu from "./MobileNavMenu";

export type LinkCategory =
  | "homeLinks"
  | "aboutUsLinks"
  | "takeActionLinks"
  | "ridingProgramLinks"
  | "eventsAndActivitiesLinks"
  | "horseBoardingLinks";

export default async function Navbar() {
  const navData: NavbarType = (await fetchAPI("/navbar", { populate: "*" })).data;

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
            alt={navData.attributes.logo.data.attributes.alternativeText}
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
                <span className="px-2 text-eggshell">{navData?.attributes.announcementText}</span>
                {navData?.attributes.announcementLink && (
                  <Link className="pr-4 text-eggshell underline" href={navData?.attributes.announcementLink?.linkAddress}>
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
                <address className="text-nowrap not-italic">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Ride+To+Walk/@38.8480856,-121.2161017,15z/data=!4m2!3m1!1s0x0:0x226fd13fb123fc4a?sa=X&ved=1t:2428&ictx=111"
                  >
                    {navData?.attributes.address}
                  </a>
                </address>
              </div>
              <div className="flex items-center text-nowrap px-4 text-eggshell">
                <span className="icon-[streamline--send-email-solid] mr-2 h-4 w-4 text-terracottaOrange"></span>
                <a href={"mailto:" + navData?.attributes.email}>{navData?.attributes.email}</a>
              </div>
              <div className="flex items-center text-nowrap px-4 text-eggshell">
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
          <div className="hidden w-full items-center justify-center md:flex 1.5xl:justify-between">
            <div className="min-w-52"></div>
            <NavbarLinks navData={navData}></NavbarLinks>
            <div className="hidden max-h-10 min-w-40 flex-row-reverse flex-wrap gap-3 overflow-hidden 1.5xl:flex">
              {navData?.attributes.donateButton && (
                <Link href={navData?.attributes.donateButton?.linkAddress} target="_blank">
                  <Button className="text-nowrap" size={"small"}>
                    {navData?.attributes.donateButton?.linkText}
                  </Button>
                </Link>
              )}
              {navData?.attributes.contactUsButton && (
                <Link href={navData?.attributes.contactUsButton?.linkAddress} target="_blank">
                  <Button className="text-nowrap" size={"small"}>
                    {navData?.attributes.contactUsButton?.linkText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="ml-auto block md:hidden">
            <MobileNavMenu linkCategories={linkCategories} navData={navData}></MobileNavMenu>
          </div>
        </div>
      </header>
    </>
  );
}
