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
import Divider from "../_components/page_sections/Divider";
import { Link as LinkType } from "../../../../backend/src/components/link/interfaces/Link";
import Link from "next/link";

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
    case "page-section-contents.divider":
      PageSection = Divider;
      break;
  }

  return PageSection ? <PageSection key={`index-${index}`} sectionData={rest} /> : null;
};

export const addHighlightsLinksAndNewLines = (text: string, links: LinkType[]) => {
  const lines = text.split("\\n");
  let linkIndex = 0;

  return lines.map((line, lineIndex) => {
    const linkSplit = line.split("\\a");

    return (
      <p className="min-h-7" key={lineIndex}>
        {linkSplit.map((part, partIndex) => {
          const highlightedPart = insertHighlights(part);

          if (partIndex < linkSplit.length - 1 && linkIndex < links.length) {
            const link = links[linkIndex++];
            return (
              <React.Fragment key={partIndex}>
                {highlightedPart}
                <Link href={link.linkAddress} className="text-metalicCopper underline" target="_blank">
                  {link.linkText}
                </Link>
              </React.Fragment>
            );
          }

          return highlightedPart;
        })}
      </p>
    );
  });
};

const insertHighlights = (text: string) => {
  const regex = /\\h(.*?)\\h/g;
  const parts = text.split(regex);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark className="bg-transparent font-bold text-metalicCopper" key={index}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
};
