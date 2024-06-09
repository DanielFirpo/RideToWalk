import { Text as TextType } from "@pageSectionTypes/Text";

export default async function Text(props: { sectionData: TextType }) {
  return (
    <section className="mx-14 my-5">
      <div
        className={`font-grotesk font-medium leading-relaxed lg:max-w-[80%] ${props.sectionData.centerAlign ? "mx-auto text-center" : "mx-0 text-left"}`}
      >
        {props.sectionData.title && (
          <h2 className="mb-7 pr-2 font-baskerville text-2xl leading-snug sm:pr-7 sm:text-2xl">{props.sectionData.title}</h2>
        )}
        {props.sectionData.text.split("\\n").map((line) => {
          const regex = /\\h(.*?)\\h/g;
          const parts = line.split(regex);
          return (
            <p className="pb-5" key={line}>
              {parts.map((part, index) =>
                index % 2 === 1 ? (
                  <mark className="bg-transparent font-bold text-metalicCopper" key={index}>
                    {part}
                  </mark>
                ) : (
                  part
                ),
              )}
            </p>
          );
        })}
      </div>
    </section>
  );
}
