import { fetchAPI } from "@/src/app/_utils/strapiApi";
import { Footer as FooterType } from "@contentTypes/footer/content-types/footer/footer";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Button } from "../shadcn/button";
import Image, { getImageProps } from "next/image";
import { addHighlightsLinksAndNewLines, getBackgroundImage } from "../../_utils/utils";

export default async function Footer() {
  const footerData: FooterType = (await fetchAPI("/footer", { populate: "*" })).data;

  let cornerProps;
  let cornerBackgroundImage;
  if (footerData.attributes.bottomRightDecoration) {
    cornerProps = getImageProps({
      alt: "",
      width: footerData.attributes.bottomRightDecoration.data.attributes.width,
      height: footerData.attributes.bottomRightDecoration.data.attributes.height,
      src: footerData.attributes.bottomRightDecoration.data.attributes.url,
      priority: true,
    });

    cornerBackgroundImage = getBackgroundImage(cornerProps.props.srcSet);
  }

  return (
    <footer
      className="mt-9 flex bg-[center_top_1000rem] pb-10 pr-20 sm:bg-right-bottom"
      style={{
        backgroundImage: cornerBackgroundImage,
        backgroundSize: "12rem auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="ml-10 mr-5 hidden w-1/2 flex-col items-center justify-center text-center lg:flex">
        <Image
          className="mb-5 max-h-[550px] w-full object-contain"
          src={footerData.attributes.leftImage.data.attributes.url}
          alt={footerData.attributes.leftImage.data.attributes.alternativeText}
          width={footerData.attributes.leftImage.data.attributes.width}
          height={footerData.attributes.leftImage.data.attributes.height}
        />
        {footerData.attributes.leftColumnText && (
          <span className="font-baskerville text-sm leading-6">
            {addHighlightsLinksAndNewLines(footerData.attributes.leftColumnText, [
              { linkAddress: "/contact", linkText: "contact us" },
            ])}
          </span>
        )}
      </div>
      <div className="ml-12 font-baskerville text-sm leading-6 md:ml-5 lg:w-1/2">
        <div className="mb-5 flex w-fit flex-col items-center font-alatsi">
          <Image
            className="h-48 w-auto pt-1"
            src={footerData.attributes.logo.data.attributes.url}
            alt={footerData.attributes.logo.data.attributes.alternativeText}
            width={footerData.attributes.logo.data.attributes.width}
            height={footerData.attributes.logo.data.attributes.height}
          />
          {/* <h2 className="font-gigabold text-center text-2xl uppercase">{footerData.attributes.logoTitle}</h2>
          <h3 className="text-center text-sm font-bold uppercase">{footerData.attributes.logoSubtitle}</h3> */}
        </div>

        <address className="mb-5 not-italic">{footerData.attributes.address}</address>
        <div className="font-bold">
          {addHighlightsLinksAndNewLines(footerData.attributes.bodyText, [{ linkAddress: "/contact", linkText: "Contact Page" }])}
        </div>
        <div className="mt-8 flex flex-wrap items-stretch gap-3 sm:w-9/12 sm:gap-0">
          {footerData.attributes.accoladesOrSponsorImages?.data &&
            footerData.attributes.accoladesOrSponsorImages?.data.map((img) => (
              <div className="sm:basis-1/3" key={img.attributes.url}>
                <Image
                  className="mb-5 h-28 w-auto"
                  src={img.attributes.url}
                  alt={img.attributes.alternativeText}
                  width={img.attributes.width}
                  height={img.attributes.height}
                />
              </div>
            ))}
        </div>
        {footerData.attributes.footerButton && (
          <Link href={footerData.attributes.footerButton.linkAddress}>
            <Button variant="secondary" size="large" className="mb-10">
              {footerData.attributes.footerButton.linkText}
            </Button>
          </Link>
        )}
        <div className="flex flex-wrap gap-6 text-sm sm:mr-32">
          {footerData.attributes.links.map((link) => (
            <Link className="text-nowrap py-3" key={link.linkText} href={link.linkAddress}>
              {link.linkText}
            </Link>
          ))}
        </div>
        <div className="mt-20 text-xs sm:mr-32">{footerData.attributes.copyrightNotice}</div>
      </div>
    </footer>
  );
}
