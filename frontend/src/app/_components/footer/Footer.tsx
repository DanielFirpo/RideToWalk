import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Footer as FooterType } from "@contentTypes/footer/content-types/footer/footer";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Button } from "../shadcn/button";
import Image, { getImageProps } from "next/image";
import { getBackgroundImage } from "../../_utils/utils";

export default async function Footer() {
  const footerData: FooterType = (await fetchAPI("/footer", { populate: "*" })).data;

  let cornerProps;
  let cornerBackgroundImage;
  if (footerData.attributes.bottomRightDecoration) {
    cornerProps = getImageProps({
      alt: "",
      width: footerData.attributes.bottomRightDecoration.data.attributes.width,
      height: footerData.attributes.bottomRightDecoration.data.attributes.height,
      src: process.env.NEXT_PUBLIC_API_URL + footerData.attributes.bottomRightDecoration.data.attributes.url,
      priority: true,
    });

    cornerBackgroundImage = getBackgroundImage(cornerProps.props.srcSet);
  }

  return (
    <footer
      className="mt-9 flex bg-[center_top_1000rem] pr-20 sm:bg-right-bottom"
      style={{
        backgroundImage: cornerBackgroundImage,
        backgroundSize: "12rem auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="m-10 mr-5 mt-0 hidden w-1/2 bg-eggshell lg:block"></div>
      <div className="font-baskerville ml-12 text-sm leading-6 md:ml-5 lg:w-1/2">
        <div className="font-alatsi mb-5 flex w-fit flex-col items-center">
          <Image
            className="h-40 w-auto pt-1"
            src={process.env.NEXT_PUBLIC_API_URL + footerData.attributes.logo.data.attributes.url}
            alt=""
            width={footerData.attributes.logo.data.attributes.width}
            height={footerData.attributes.logo.data.attributes.height}
          />
          {/* <h2 className="font-gigabold text-center text-2xl uppercase">{footerData.attributes.logoTitle}</h2>
          <h3 className="text-center text-sm font-bold uppercase">{footerData.attributes.logoSubtitle}</h3> */}
        </div>

        <address className="mb-5 not-italic">{footerData.attributes.address}</address>
        {footerData.attributes.bodyText.split("\\n").map((paragraph) => {
          return (
            <p key={paragraph} className="mb-4">
              {paragraph}
            </p>
          );
        })}
        <div className="mt-8 flex flex-wrap sm:w-9/12">
          {footerData.attributes.accoladesOrSponsorImages?.data.map((img) => (
            <div className="basis-1/3" key={img.attributes.url}>
              <Image
                className="mb-5 aspect-square h-28 w-28 min-w-28"
                src={process.env.NEXT_PUBLIC_API_URL + img.attributes.url}
                alt=""
                width={img.attributes.width}
                height={img.attributes.height}
              />
            </div>
          ))}
        </div>
        <div className="mb-8 flex flex-wrap gap-6 text-sm sm:mr-32">
          {footerData.attributes.links.map((link) => (
            <Link className="text-nowrap" key={link.linkText} href={link.linkAddress}>
              {link.linkText}
            </Link>
          ))}
        </div>
        <div className="pb-10 text-xs sm:mr-32">{footerData.attributes.copyrightNotice}</div>
      </div>
    </footer>
  );
}