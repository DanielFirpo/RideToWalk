"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/shadcn/carousel";
import { Media } from "@strapiTypes/schemas-to-ts/Media";

export function HomepageCarousel({ images }: { images: Media[] }) {
  const plugin = React.useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full p-2"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image.attributes.url}
            className="mr-2 aspect-square basis-[33.1%] bg-metalicCopper p-0 md:basis-[16.2%]"
          >
            <Image
              className="h-full w-full"
              src={image.attributes.url}
              alt={image.attributes.alternativeText}
              width={image.attributes.width}
              height={image.attributes.height}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
