import { HalfAndHalf as HalfAndHalfType } from "@pageSectionTypes/HalfAndHalf";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/button";
import React from "react";
import { addHighlightsLinksAndNewLines } from "../../_utils/utils";

export default async function HalfAndHalf(props: { sectionData: HalfAndHalfType }) {
  let imageContainerWidth = props.sectionData.image.data.attributes.width;

  if (imageContainerWidth > 500) {
    imageContainerWidth = 500;
  }

  return (
    <section
      className="mx-14 my-5 flex flex-wrap items-center justify-center gap-14"
      style={{ flexDirection: props.sectionData.imagePosition == "Image on Left" ? "row" : "row-reverse" }}
    >
      <div
        className="h-full w-auto flex-col items-center justify-center lg:flex"
        // style={{
        //   minWidth: imageContainerWidth + "px",
        // }}
      >
        <Image
          src={props.sectionData.image.data.attributes.url}
          alt={props.sectionData.image.data.attributes.alternativeText}
          width={props.sectionData.image.data.attributes.width}
          height={props.sectionData.image.data.attributes.height}
          className="max-h-[500px] w-auto"
          priority
        />
        <div className="pt-2 font-baskerville text-base font-bold">{props.sectionData.imageDescription}</div>
      </div>
      <div className="mr-auto w-full font-grotesk font-medium leading-relaxed lg:w-[55%]">
        {props.sectionData.title && (
          <h2 className="mb-7 pr-2 font-baskerville text-2xl leading-snug sm:pr-7 sm:text-2xl">{props.sectionData.title}</h2>
        )}
        {addHighlightsLinksAndNewLines(props.sectionData.text, props.sectionData.linksToInsert)}
        {props.sectionData.button && (
          <Link href={props.sectionData.button.linkAddress} target="_blank">
            <Button className="mt-10" variant="secondary">
              {props.sectionData.button.linkText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
