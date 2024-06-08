import { Banner as BannerType } from "@pageSectionTypes/Banner";

export default async function Banner(props: { sectionData: BannerType }) {
  return (
    <section className="flex h-24 items-center justify-center bg-eggshell px-4 md:justify-between md:px-14 ">
      <div className="flex items-center text-eggshell md:pr-4">
        <address className="py-6 text-center font-baskervilleItalic text-base tracking-widest text-metalicCopper sm:text-lg md:text-left md:text-xl">
          {props.sectionData?.leftText}
        </address>
      </div>
      <div className="ml-6 hidden items-center justify-between gap-12 md:flex">
        {props.sectionData.facebookLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.facebookLink} aria-label="Facebook">
            <span className="icon-[fa-brands--facebook-f] h-[1.8rem] w-[1.8rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.instagramLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.instagramLink} aria-label="Instagram">
            <span className="icon-[mdi--instagram] h-[2rem] w-[2rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.tiktokLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.tiktokLink} aria-label="TikTok">
            <span className="icon-[ic--baseline-tiktok] h-[2.2rem] w-[2.2rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.youtubeLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.youtubeLink} aria-label="YouTube">
            <span className="icon-[mdi--youtube] h-8 w-8 text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.googleLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.googleLink} aria-label="Google">
            <span className="icon-[bi--google] h-[1.7rem] w-[1.7rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.twitterLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.twitterLink} aria-label="Twitter">
            <span className="icon-[pajamas--twitter] h-[1.9rem] w-[1.9rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.linkedInLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.linkedInLink} aria-label="LinkedIn">
            <span className="icon-[ri--linkedin-fill] mb-0.5 h-[2.2rem] w-[2.2rem] text-terracottaOrange"></span>
          </a>
        )}

        {props.sectionData.snapchatLink && (
          <a target="_blank" className="flex items-center" href={props.sectionData.snapchatLink} aria-label="Snapchat">
            <span className="icon-[ri--snapchat-fill] h-8 w-8 text-terracottaOrange"></span>
          </a>
        )}
      </div>
    </section>
  );
}
