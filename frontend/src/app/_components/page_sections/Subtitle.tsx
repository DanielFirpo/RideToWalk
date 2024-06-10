import { Subtitle as SubtitleType } from "@pageSectionTypes/Subtitle";

export default async function Subtitle(props: { sectionData: SubtitleType }) {
  return (
    <section className="my-10">
      <div className="mx-14">
        <h2 className="mb-6 font-baskerville text-xl font-bold leading-relaxed opacity-100 lg:text-2xl">
          {props.sectionData.text}
        </h2>
        <hr className="mb-10 h-[1px] border-none bg-[#b9b9b9]" />
      </div>
    </section>
  );
}
