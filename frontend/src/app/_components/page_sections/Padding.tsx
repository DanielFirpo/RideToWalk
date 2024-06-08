import { Padding as PaddingType } from "@pageSectionTypes/Padding";

export default async function Padding(props: { sectionData: PaddingType }) {
  return <div style={{ height: `${props.sectionData.pixels}px` }}></div>;
}
