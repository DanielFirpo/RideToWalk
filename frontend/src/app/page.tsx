import Image, { getImageProps } from "next/image";
import { fetchAPI } from "./_utils/strapiApi";
import { Homepage } from "@contentTypes/homepage/content-types/homepage/homepage";
import { getBackgroundImage } from "./_utils/utils";
import { Button } from "./_components/shadcn/button";
import Link from "next/link";
import { Navbar } from "@contentTypes/navbar/content-types/navbar/navbar";
import { HomepageCarousel } from "./_components/homepage/HomepageCarousel";

export default async function Home() {
  const pageData: Homepage = (await fetchAPI("/homepage", { populate: "*" })).data;
  const navData: Navbar = (await fetchAPI("/navbar", { populate: "*" })).data;

  const {
    heroFallbackImage,
    missionStatementBackgroundImage,
    collageImage1BackgroundImage,
    collageImage2BackgroundImage,
    collageImage3BackgroundImage,
    collageImage4BackgroundImage,
  } = getBackgroundImages(pageData);

  const darkenPecentage = 100 - (pageData.attributes.heroImageDarkenPercent ?? 0);

  return (
    <>
      <main>
        <section className="w-full bg-black">
          <div className="relative">
            <video
              className="hidden w-full sm:block"
              width={pageData.attributes.heroVideo.data.attributes.width}
              height={pageData.attributes.heroVideo.data.attributes.height}
              preload="none"
              autoPlay
              muted
              loop
              style={{
                aspectRatio: "2 / 1",
                background: heroFallbackImage,
                backgroundSize: "cover",
                backgroundPosition: "50% 0",
                filter: `brightness(${darkenPecentage}%)`,
              }}
            >
              <source
                src={process.env.NEXT_PUBLIC_API_URL + pageData.attributes.heroVideo.data.attributes.url}
                type="video/webm"
              />
              {/* fallback image: */}
            </video>
            <div
              className="h-auto w-full sm:hidden"
              style={{
                aspectRatio: "2 / 1",
                background: heroFallbackImage,
                backgroundSize: "cover",
                backgroundPosition: "50% 0",
                filter: `brightness(${darkenPecentage}%)`,
              }}
            ></div>
            <div className="absolute left-1/2 top-1/2 h-full w-[90%] sm:w-[68%]">
              <div className="absolute -left-1/2 -top-1/2 z-10 mb-8 flex h-full w-full flex-col items-center justify-center sm:-top-[60%] sm:mb-28">
                {pageData.attributes.heroImageText.split("\\n").map((line) => {
                  return (
                    <h1
                      key={line}
                      className="text-center font-baskerville text-base leading-normal text-white opacity-100 sm:text-2xl md:text-3xl lg:text-4xl lg:leading-relaxed"
                    >
                      {line}
                    </h1>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative z-20 mr-auto mt-0 flex h-20 w-full items-center justify-start bg-rustyBrown p-4 text-center sm:-mt-24 sm:h-24 sm:w-72 sm:text-left">
            <Image
              className=" max-h-16 max-w-16 rounded-sm border-8 border-white"
              src={process.env.NEXT_PUBLIC_API_URL + pageData.attributes.heroImageCallToActionImage.data.attributes.url}
              alt={pageData.attributes.heroImageCallToActionImage.data.attributes.alternativeText}
              width={pageData.attributes.heroImageCallToActionImage.data.attributes.width}
              height={pageData.attributes.heroImageCallToActionImage.data.attributes.height}
              priority
            />
            <span className="mx-auto pl-5 font-semibold text-white sm:ml-5 sm:mr-0 sm:pl-0">
              {pageData.attributes.heroImageCallToActionText}&nbsp;
              {pageData.attributes.heroImageCallToActionLink && (
                <Link href={pageData.attributes.heroImageCallToActionLink?.linkAddress} className="underline">
                  {pageData.attributes.heroImageCallToActionLink?.linkText}
                </Link>
              )}
            </span>
          </div>
        </section>
        <section className="mt-8 flex flex-col lg:flex-row">
          <div
            className="w-auto bg-contain bg-left bg-no-repeat px-8 pb-24 pr-10 pt-24 sm:ml-8 sm:mr-8 sm:pl-24 lg:ml-32 lg:mr-0 lg:w-1/2 lg:bg-cover lg:bg-right lg:pl-0"
            style={{
              backgroundImage: missionStatementBackgroundImage,
            }}
          >
            {pageData.attributes.missionStatementTitle.split("\\n").map((line) => {
              return (
                <h2 key={line} className="inline pr-2 font-baskerville text-2xl leading-snug sm:block sm:pr-7 sm:text-3xl">
                  {line}
                </h2>
              );
            })}
            <h3 className="py-6 font-baskervilleItalic text-lg tracking-wider text-metalicCopper sm:text-2xl">
              {pageData.attributes.missionStatementSubtitle}
            </h3>
            <p className="font-grotesk text-sm font-medium leading-relaxed sm:text-base">
              {pageData.attributes.missionStatementText}
            </p>
            {pageData.attributes.missionStatementButton && (
              <Link href={pageData.attributes.missionStatementButton.linkAddress} target="_blank">
                <Button className="mt-8" variant={"secondary"}>
                  {pageData.attributes.missionStatementButton.linkText}
                </Button>
              </Link>
            )}
          </div>
          <div className="mx-4 flex w-fit flex-col items-center justify-center p-6 text-white sm:ml-14 sm:mr-14 lg:ml-6 lg:w-1/2">
            <video controls preload="metadata" aria-label="Video player" width="100%" className="aspect-video">
              <source
                src={process.env.NEXT_PUBLIC_API_URL + pageData.attributes.featuredVideo.data.attributes.url + "#t=0.1"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="flex h-16 w-full items-center justify-center bg-eggshell px-1 sm:px-16">
              <p className="text-center font-grotesk text-xs font-medium leading-relaxed text-black sm:text-sm">
                {pageData.attributes.featuredVideoDescription}
              </p>
            </div>
          </div>
        </section>
        <section className="flex items-center">
          <Image
            className="mr-5 mt-auto hidden aspect-square w-2/5 lg:block"
            src={process.env.NEXT_PUBLIC_API_URL + pageData.attributes.detailedAboutSectionImage.data.attributes.url}
            alt={pageData.attributes.detailedAboutSectionImage.data.attributes.alternativeText}
            width={pageData.attributes.detailedAboutSectionImage.data.attributes.width}
            height={pageData.attributes.detailedAboutSectionImage.data.attributes.height}
          />
          <div className="mx-4 p-6 font-grotesk font-medium leading-relaxed sm:mx-14 lg:mr-14">
            {pageData.attributes.detailedAboutSectionText.split("\\n").map((line) => {
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
            <ul className="mb-8 flex flex-col gap-3">
              {pageData.attributes.detailedAboutSectionBulletPoints.map((bullet) => {
                return (
                  <li className="flex items-center" key={bullet.bulletPointText}>
                    <div className="mr-5 h-5 w-5 min-w-5 bg-winterHazel"></div>
                    {bullet.bulletPointText}
                  </li>
                );
              })}
            </ul>
            <Link href={pageData.attributes.detailedAboutSectionButton.linkAddress} target="_blank">
              <Button variant="secondary">{pageData.attributes.detailedAboutSectionButton.linkText}</Button>
            </Link>
          </div>
        </section>
        <section className="relative flex flex-col flex-wrap md:flex-row">
          <div className="absolute left-[calc(50%-5.5rem)] top-[calc(50%-5.5rem)] hidden h-44 w-44 rotate-45 justify-center bg-white pl-1 pt-1 md:flex">
            <div className="-rotate-45 font-alatsi">
              {/*  max-h-32 max-w-32  */}
              <Image
                className="m-auto px-3 pt-1"
                src={process.env.NEXT_PUBLIC_API_URL + navData.attributes.logo.data.attributes.url}
                alt={navData.attributes.logo.data.attributes.alternativeText}
                width={navData.attributes.logo.data.attributes.width}
                height={navData.attributes.logo.data.attributes.height}
                priority
              />
              {/* <h2 className="font-gigabold mx-auto text-center text-lg uppercase">{navData.attributes.name}</h2>
              <h3 className="mx-auto text-center text-xs font-bold uppercase">{navData.attributes.slogan}</h3> */}
            </div>
          </div>
          <div
            className="flex aspect-video w-full items-end p-5 md:w-1/2"
            style={{
              // aspectRatio: "16 / 9",
              backgroundImage: collageImage1BackgroundImage,
              backgroundSize: "cover",
              backgroundPosition: "50% 0",
            }}
          >
            <Link href={pageData.attributes.collageButton1.linkAddress} target="_blank">
              <Button variant={"light"}>{pageData.attributes.collageButton1.linkText}</Button>
            </Link>
          </div>
          <div
            className="flex aspect-video w-full items-end justify-end p-5 md:w-1/2"
            style={{
              aspectRatio: "16 / 9",
              backgroundImage: collageImage2BackgroundImage,
              backgroundSize: "cover",
              backgroundPosition: "50% 0",
            }}
          >
            <Link href={pageData.attributes.collageButton2.linkAddress} target="_blank">
              <Button variant={"light"}>{pageData.attributes.collageButton2.linkText}</Button>
            </Link>
          </div>
          <div
            className="flex aspect-video w-full items-end p-5 md:w-1/2"
            style={{
              aspectRatio: "16 / 9",
              backgroundImage: collageImage3BackgroundImage,
              backgroundSize: "cover",
              backgroundPosition: "50% 0",
            }}
          >
            <Link href={pageData.attributes.collageButton3.linkAddress} target="_blank">
              <Button variant={"light"}>{pageData.attributes.collageButton3.linkText}</Button>
            </Link>
          </div>
          <div
            className="flex aspect-video w-full items-end justify-end p-5 md:w-1/2"
            style={{
              aspectRatio: "16 / 9",
              backgroundImage: collageImage4BackgroundImage,
              backgroundSize: "cover",
              backgroundPosition: "50% 0",
            }}
          >
            <Link href={pageData.attributes.collageButton4.linkAddress} target="_blank">
              <Button variant={"light"}>{pageData.attributes.collageButton4.linkText}</Button>
            </Link>
          </div>
        </section>
        <section className="flex h-24 items-center justify-center bg-eggshell px-4 md:justify-between md:px-14 ">
          <div className="flex items-center text-eggshell md:pr-4">
            <address className="py-6 text-center font-baskervilleItalic text-base tracking-widest text-metalicCopper sm:text-lg md:text-left md:text-xl">
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(navData?.attributes.address)}`}
              >
                {navData?.attributes.address}
              </a>
            </address>
          </div>
          <div className="ml-6 hidden items-center justify-between gap-12 md:flex">
            {navData.attributes.facebookLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.facebookLink} aria-label="Facebook">
                <span className="icon-[fa-brands--facebook-f] h-[1.8rem] w-[1.8rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.instagramLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.instagramLink} aria-label="Instagram">
                <span className="icon-[mdi--instagram] h-[2rem] w-[2rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.tiktokLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.tiktokLink} aria-label="TikTok">
                <span className="icon-[ic--baseline-tiktok] h-[2.2rem] w-[2.2rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.youtubeLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.youtubeLink} aria-label="YouTube">
                <span className="icon-[mdi--youtube] h-8 w-8 text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.googleLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.googleLink} aria-label="Google">
                <span className="icon-[bi--google] h-[1.7rem] w-[1.7rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.twitterLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.twitterLink} aria-label="Twitter">
                <span className="icon-[pajamas--twitter] h-[1.9rem] w-[1.9rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.linkedInLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.linkedInLink} aria-label="LinkedIn">
                <span className="icon-[ri--linkedin-fill] mb-0.5 h-[2.2rem] w-[2.2rem] text-terracottaOrange"></span>
              </a>
            )}

            {navData.attributes.snapchatLink && (
              <a target="_blank" className="flex items-center" href={navData.attributes.snapchatLink} aria-label="Snapchat">
                <span className="icon-[ri--snapchat-fill] h-8 w-8 text-terracottaOrange"></span>
              </a>
            )}
          </div>
        </section>
        <section className="w-full">
          <HomepageCarousel images={pageData.attributes.carouselImages.data}></HomepageCarousel>
        </section>
      </main>
    </>
  );
}

function getBackgroundImages(pageData: Homepage) {
  //NextJS's way to use css background images while still getting the optimization of next/Image:
  const heroProps = getImageProps({
    alt: "",
    width: pageData.attributes.heroFallbackImage.data.attributes.width,
    height: pageData.attributes.heroFallbackImage.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.heroFallbackImage.data.attributes.url,
    priority: true,
  });

  const heroFallbackImage = getBackgroundImage(heroProps.props.srcSet);

  const missionStatementProps = getImageProps({
    alt: "",
    width: pageData.attributes.missionStatementBackgroundImage.data.attributes.width,
    height: pageData.attributes.missionStatementBackgroundImage.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.missionStatementBackgroundImage.data.attributes.url,
  });

  const missionStatementBackgroundImage = getBackgroundImage(missionStatementProps.props.srcSet);

  const collageImage1Props = getImageProps({
    alt: "",
    width: pageData.attributes.collageImage1.data.attributes.width,
    height: pageData.attributes.collageImage1.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.collageImage1.data.attributes.url,
    priority: true,
  });

  const collageImage1BackgroundImage = getBackgroundImage(collageImage1Props.props.srcSet);

  const collageImage2Props = getImageProps({
    alt: "",
    width: pageData.attributes.collageImage2.data.attributes.width,
    height: pageData.attributes.collageImage2.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.collageImage2.data.attributes.url,
    priority: true,
  });

  const collageImage2BackgroundImage = getBackgroundImage(collageImage2Props.props.srcSet);

  const collageImage3Props = getImageProps({
    alt: "",
    width: pageData.attributes.collageImage3.data.attributes.width,
    height: pageData.attributes.collageImage3.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.collageImage3.data.attributes.url,
    priority: true,
  });

  const collageImage3BackgroundImage = getBackgroundImage(collageImage3Props.props.srcSet);

  const collageImage4Props = getImageProps({
    alt: "",
    width: pageData.attributes.collageImage4.data.attributes.width,
    height: pageData.attributes.collageImage4.data.attributes.height,
    src: process.env.NEXT_PUBLIC_API_URL + pageData.attributes.collageImage4.data.attributes.url,
    priority: true,
  });

  const collageImage4BackgroundImage = getBackgroundImage(collageImage4Props.props.srcSet);

  return {
    heroFallbackImage,
    missionStatementBackgroundImage,
    collageImage1BackgroundImage,
    collageImage2BackgroundImage,
    collageImage3BackgroundImage,
    collageImage4BackgroundImage,
  };
}
