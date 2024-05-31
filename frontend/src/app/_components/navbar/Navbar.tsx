import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Navbar as NavbarType } from "@contentTypes/navbar/content-types/navbar/navbar";

import NavbarLinks from "./NavbarLinks";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default async function Navbar() {
  const navData: NavbarType = (await fetchAPI("/navbar", { populate: "*" })).data;

  console.log("re-rendering Navbar.tsx");

  return (
    <>
      <header className="relative text-nowrap">
        <div className="absolute ml-12 aspect-square h-full bg-white"></div>
        <div className="bg-oliveGreen flex h-10 w-full items-center pl-48 text-xs 2xl:text-sm">
          {navData?.attributes.announcementText && (
            <Marquee className="mx-auto hidden pl-6 2xl:flex" pauseOnHover={true}>
              <span className="text-winterHazel pr-2">{navData?.attributes.announcementText}</span>
              {navData?.attributes.announcementLink && (
                <Link className="text-winterHazel underline" href={navData?.attributes.announcementLink?.linkAddress}>
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
          <div className="ml-auto mr-10 flex items-center">
            <div className="text-eggshell flex items-center px-4">
              <span className="text-terracottaOrange icon-[mdi--address-marker] mr-1 h-5 w-5"></span>
              {navData?.attributes.address}
            </div>
            <div className="text-eggshell flex items-center px-4">
              <span className="text-terracottaOrange icon-[streamline--send-email-solid] mr-2 h-4 w-4"></span>
              {navData?.attributes.email}
            </div>
            <div className="text-eggshell flex items-center px-4">
              <span className="text-terracottaOrange icon-[fa-solid--phone] mr-2 h-4 w-4"></span>
              {navData?.attributes.phoneNumber}
            </div>
            <div className="flex items-center justify-between gap-2">
              {navData.attributes.facebookLink && (
                <Link href={navData.attributes.facebookLink} aria-label="Facebook">
                  <span className="text-terracottaOrange icon-[fa-brands--facebook-f] h-[1.2rem] w-[1.2rem]"></span>
                </Link>
              )}

              {navData.attributes.instagramLink && (
                <Link href={navData.attributes.instagramLink} aria-label="Instagram">
                  <span className="text-terracottaOrange icon-[mdi--instagram] h-[1.4rem] w-[1.4rem]"></span>
                </Link>
              )}

              {navData.attributes.tiktokLink && (
                <Link href={navData.attributes.tiktokLink} aria-label="TikTok">
                  <span className="text-terracottaOrange icon-[ic--baseline-tiktok] h-[1.6rem] w-[1.6rem]"></span>
                </Link>
              )}

              {navData.attributes.youtubeLink && (
                <Link href={navData.attributes.youtubeLink} aria-label="YouTube">
                  <span className="text-terracottaOrange icon-[mdi--youtube] h-7 w-7"></span>
                </Link>
              )}

              {navData.attributes.googleLink && (
                <Link href={navData.attributes.googleLink} aria-label="Google">
                  <span className="text-terracottaOrange icon-[bi--google] h-[1.1rem] w-[1.1rem]"></span>
                </Link>
              )}

              {navData.attributes.twitterLink && (
                <Link href={navData.attributes.twitterLink} aria-label="Twitter">
                  <span className="text-terracottaOrange icon-[pajamas--twitter] h-[1.3rem] w-[1.3rem]"></span>
                </Link>
              )}

              {navData.attributes.linkedInLink && (
                <Link href={navData.attributes.linkedInLink} aria-label="LinkedIn">
                  <span className="text-terracottaOrange icon-[ri--linkedin-fill] mb-0.5 h-[1.6rem] w-[1.6rem]"></span>
                </Link>
              )}

              {navData.attributes.snapchatLink && (
                <Link href={navData.attributes.snapchatLink} aria-label="Snapchat">
                  <span className="text-terracottaOrange icon-[ri--snapchat-fill] h-6 w-6"></span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="bg-rustyBrown flex h-[80px] w-full items-center justify-center">
          <NavbarLinks navData={navData}></NavbarLinks>
        </div>
      </header>
    </>
  );
}
