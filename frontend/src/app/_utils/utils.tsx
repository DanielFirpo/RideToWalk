import Banner from "../_components/page_sections/Banner";
import HalfAndHalf from "../_components/page_sections/HalfAndHalf";
import WideImage from "../_components/page_sections/WideImage";
import ImageCarousel from "../_components/page_sections/ImageCarousel";
import TitleHeader from "../_components/page_sections/TitleHeader";
import Video from "../_components/page_sections/Video";
import React from "react";
import Padding from "../_components/page_sections/Padding";
import Subtitle from "../_components/page_sections/Subtitle";
import Button from "../_components/page_sections/Button";
import Text from "../_components/page_sections/Text";
import Quote from "../_components/page_sections/Quote";

export function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

// "__component": "page-section-contents.title-header",
// "__component": "page-section-contents.image-carousel"
// "__component": "page-section-contents.banner",
// "__component": "page-section-contents.image"
// "__component": "page-section-contents.half-and-half"
// "__component": "page-section-contents.video"

export const getPageSection = ({ __component, ...rest }: { __component: string }, index: number): JSX.Element | null => {
  let PageSection: React.ElementType | null = null;

  switch (__component) {
    case "page-section-contents.banner":
      PageSection = Banner;
      break;
    case "page-section-contents.image-carousel":
      PageSection = ImageCarousel;
      break;
    case "page-section-contents.title-header":
      PageSection = TitleHeader;
      break;
    case "page-section-contents.wide-image":
      PageSection = WideImage;
      break;
    case "page-section-contents.half-and-half":
      PageSection = HalfAndHalf;
      break;
    case "page-section-contents.video":
      PageSection = Video;
      break;
    case "page-section-contents.padding":
      PageSection = Padding;
      break;
    case "page-section-contents.subtitle":
      PageSection = Subtitle;
      break;
    case "page-section-contents.button":
      PageSection = Button;
      break;
    case "page-section-contents.text":
      PageSection = Text;
      break;
    case "page-section-contents.quote":
      PageSection = Quote;
      break;
  }

  return PageSection ? <PageSection key={`index-${index}`} sectionData={rest} /> : null;
};
