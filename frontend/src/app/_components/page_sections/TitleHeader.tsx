import { TitleHeader as TitleHeaderType } from "@pageSectionTypes/TitleHeader";

export default async function TitleHeader(props: { sectionData: TitleHeaderType }) {
  return (
    <section className="my-10">
      <div className="mx-10">
        <h1 className="mb-6 font-baskerville text-2xl font-bold leading-normal opacity-100 sm:text-3xl md:text-3xl lg:text-4xl lg:leading-relaxed">
          {props.sectionData.title}
        </h1>
        <hr className="mb-10 h-[1px] border-none bg-[#b9b9b9]" />
      </div>
    </section>
  );
}
