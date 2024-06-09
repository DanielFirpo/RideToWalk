import { TitleHeader as TitleHeaderType } from "@pageSectionTypes/TitleHeader";

export default async function TitleHeader(props: { sectionData: TitleHeaderType }) {
  return (
    <section className="mx-10 my-10">
      <hr className="mb-10 h-[1px] border-none bg-[#b9b9b9]" />
    </section>
  );
}
