import { Divider as DividerType } from "@pageSectionTypes/Divider";

export default async function Divider(props: { sectionData: DividerType }) {
  return (
    <section className="mx-10 my-10">
      <hr className="mb-10 h-[1px] border-none bg-[#b9b9b9]" />
    </section>
  );
}
