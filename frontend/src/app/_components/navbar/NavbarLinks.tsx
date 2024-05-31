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
        <NavigationMenuList>
          {linkCategories.map((linkCategory) =>
            navData?.attributes[linkCategory] && (navData?.attributes[linkCategory].length ?? 0) > 1 ? (
              <NavigationMenuItem key={linkCategory}>
                <Link href={navData?.attributes[linkCategory][0].linkAddress}>
                  <NavigationMenuTrigger className="text-white">
                    {navData?.attributes[linkCategory][0].linkText}
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  {navData?.attributes[linkCategory].slice(1).map((navLink) => (
                    <NavigationMenuLink key={linkCategory} asChild>
                      <Link
                        className="hover:bg-rustyBrown block w-full select-none space-y-1 text-nowrap p-3 leading-none transition-colors hover:text-white"
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
                    className="inline-flex h-5 w-max items-center justify-center px-4 py-2 text-sm font-medium uppercase text-white transition-colors hover:underline"
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
