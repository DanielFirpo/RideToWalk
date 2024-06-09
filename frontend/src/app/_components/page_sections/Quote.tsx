import { Quote as QuoteType } from "@pageSectionTypes/Quote";

export default async function Quote(props: { sectionData: QuoteType }) {
  const isLongQuote = props.sectionData.quote.length > 100;

  return (
    <section>
      <blockquote className="mx-14 w-fit text-center lg:mx-24">
        <span className="icon-[ri--double-quotes-l] h-10 w-10 text-metalicCopper text-opacity-50"></span>
        {/* <div className="relative">
          <span className="icon-[ri--double-quotes-l] absolute left-[-60px] top-0 ml-5 h-10 w-10 text-metalicCopper"></span>
        </div> */}
        <p
          className={`py-6 font-baskervilleItalic tracking-wider text-metalicCopper ${isLongQuote ? "text-base sm:text-lg" : "text-xl sm:text-2xl"}`}
        >
          {props.sectionData.quote}
        </p>
        {/* <div className="relative">
          <span className="icon-[ri--double-quotes-r] absolute bottom-0 right-[-60px] mr-5 h-10 w-10 text-metalicCopper"></span>
        </div> */}
        <span className="icon-[ri--double-quotes-r] h-10 w-10 text-metalicCopper text-opacity-50"></span>
        {props.sectionData.attribution && (
          <footer className="pt-6 font-baskerville text-sm font-bold">— {props.sectionData.attribution}</footer>
        )}
      </blockquote>
    </section>
  );
}
