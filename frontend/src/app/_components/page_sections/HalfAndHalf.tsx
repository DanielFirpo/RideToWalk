import { HalfAndHalf as HalfAndHalfType } from "@pageSectionTypes/HalfAndHalf";
import { Link as LinkType } from "../../../../../backend/src/components/link/interfaces/Link";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/button";
import React from "react";

export default async function HalfAndHalf(props: { sectionData: HalfAndHalfType }) {
  let imageContainerWidth = props.sectionData.image.data.attributes.width;

  if (imageContainerWidth > 500) {
    imageContainerWidth = 500;
  }

  return (
    <section
      className="mx-14 my-5 flex items-center justify-between gap-14"
      style={{ flexDirection: props.sectionData.imagePosition == "Image on Left" ? "row" : "row-reverse" }}
    >
      <div
        className="hidden h-full w-full flex-col items-center justify-center lg:flex"
        style={{
          minWidth: imageContainerWidth + "px",
        }}
      >
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + props.sectionData.image.data.attributes.url}
          alt={props.sectionData.image.data.attributes.alternativeText}
          width={props.sectionData.image.data.attributes.width}
          height={props.sectionData.image.data.attributes.height}
          className="max-h-[500px] w-auto"
        />
        <div className="pt-2 font-baskerville text-base font-bold">{props.sectionData.imageDescription}</div>
      </div>
      <div className="font-grotesk font-medium leading-relaxed">
        {props.sectionData.title && (
          <h2 className="inline pr-2 font-baskerville text-2xl leading-snug sm:block sm:pr-7 sm:text-2xl">
            {props.sectionData.title}
          </h2>
        )}
        {props.sectionData.text.split("\\n").map((line) => {
          const regex = /\\h(.*?)\\h/g;
          const parts = line.split(regex);
          return (
            <p className="pt-7" key={line}>
              {insertLinksAndHighlights(line, props.sectionData.linksToInsert)}
            </p>
          );
        })}
        {props.sectionData.button && (
          <Link href={props.sectionData.button.linkAddress}>
            <Button className="mt-10" variant="secondary">
              {props.sectionData.button.linkText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}

const insertLinksAndHighlights = (text: string, links: LinkType[]) => {
  const linkSplit = text.split("\\a");
  let linkIndex = 0;

  return linkSplit.map((part, index) => {
    if (index < linkSplit.length - 1) {
      const link = links[linkIndex++];
      return (
        <React.Fragment key={index}>
          {insertHighlights(part)}
          <Link href={link.linkAddress} className="text-blue-500 underline">
            {link.linkText}
          </Link>
        </React.Fragment>
      );
    }
    return insertHighlights(part);
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
