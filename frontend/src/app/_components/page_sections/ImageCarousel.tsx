import { HomepageCarousel } from "../homepage/HomepageCarousel";
import { ImageCarousel as ImageCarouselType } from "@pageSectionTypes/ImageCarousel";

export default async function ImageCarousel(props: { sectionData: ImageCarouselType }) {
  return (
    <section className="w-full">
      <HomepageCarousel images={props.sectionData.images.data}></HomepageCarousel>
    </section>
  );
}
