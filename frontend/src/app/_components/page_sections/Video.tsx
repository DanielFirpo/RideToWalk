import { Video as VideoType } from "@pageSectionTypes/Video";

export default async function Video(props: { sectionData: VideoType }) {
  return (
    <section className="my-5">
      <div className="mx-4 flex w-fit flex-col items-center justify-center text-white sm:ml-14 sm:mr-14 lg:mx-20">
        <video controls preload="metadata" aria-label="Video player" width="100%" className="aspect-video">
          <source src={props.sectionData.video.data.attributes.url + "#t=0.1"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {props.sectionData.description && (
          <div className="flex h-16 w-full items-center justify-center bg-eggshell px-1 sm:px-16">
            <p className="text-center font-grotesk text-xs font-medium leading-relaxed text-black sm:text-sm">
              {props.sectionData.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
