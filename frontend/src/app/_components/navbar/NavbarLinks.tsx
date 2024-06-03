"use client";

import Link from "next/link";
import { Navbar as NavbarType } from "@contentTypes/navbar/content-types/navbar/navbar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/shadcn/navigation-menu";

// Unfortunately we need a client component in order to run the javascript that handles the drop down menus,
// but at least the whole navbar doesn't need to be CSR, just the nav link section. That's what this component is for.
export default function NavbarLinks({ navData }: { navData?: NavbarType }) {
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
      <NavigationMenu>
        <NavigationMenuList className="font-grotesk w-full flex-wrap items-center xl:flex-nowrap">
          {linkCategories.map((linkCategory) =>
            navData?.attributes[linkCategory] && (navData?.attributes[linkCategory].length ?? 0) > 1 ? (
              <NavigationMenuItem key={linkCategory}>
                <NavigationMenuTrigger className="cursor-default px-2 text-sm text-white xl:px-4">
                  {navData?.attributes[linkCategory][0].linkText}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {navData?.attributes[linkCategory].map((navLink) => (
                    <NavigationMenuLink key={navLink.linkText} asChild>
                      <Link
                        className="block w-full select-none space-y-1 text-nowrap p-3 leading-none transition-colors hover:bg-rustyBrown hover:text-white"
                        href={navLink.linkAddress}
                      >
                        {navLink.linkText}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              navData?.attributes[linkCategory] && (
                <li key={linkCategory}>
                  <Link
                    className="flex h-5 w-max items-center justify-center px-2 py-2 text-sm font-medium uppercase text-white transition-colors hover:underline xl:px-4"
                    href={navData?.attributes[linkCategory][0].linkAddress}
                  >
                    {navData?.attributes[linkCategory][0].linkText}
                  </Link>
                </li>
              )
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
