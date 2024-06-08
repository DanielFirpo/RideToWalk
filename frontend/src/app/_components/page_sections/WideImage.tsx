import { WideImage as WideImageType } from "@pageSectionTypes/WideImage";
import Image from "next/image";

export default async function WideImage(props: { sectionData: WideImageType }) {
  return (
    <section>
      <Image
        style={{
          paddingLeft: props.sectionData.addPaddingOnLeftAndRight ? "3.5rem" : 0,
          paddingRight: props.sectionData.addPaddingOnLeftAndRight ? "3.5rem" : 0,
        }}
        alt={props.sectionData.image.data.attributes.alternativeText}
        src={process.env.NEXT_PUBLIC_API_URL + props.sectionData.image.data.attributes.url}
        width={props.sectionData.image.data.attributes.width}
        height={props.sectionData.image.data.attributes.height}
      ></Image>
    </section>
  );
}
