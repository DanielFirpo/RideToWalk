import Link from "next/link";
import { Button } from "./_components/shadcn/button";
import runawayHorse from "../../public/404.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 px-10 pb-20 pt-28">
      <h1 className="font-roboto text-center text-4xl font-bold">Whoa There! This Page Has Bolted!</h1>
      <div>
        <Image
          className="mt-10 sm:max-w-[50vw]"
          src={runawayHorse}
          alt="A runaway horse leaving its rider on the ground in a cloud of dust."
        ></Image>
      </div>
      <div className="font-robotoSlab text-center text-xl">
        Looks like this page decided to take an unscheduled canter. <br></br> <br></br>Might as well head back to the stables:
      </div>
      <Link href="/">
        <Button className="!text-md w-60" variant={"secondary"}>
          Go back to Home
        </Button>
      </Link>

      <h2 className="text-md font-robotoSlab mt-12 text-center font-thin">404 - Page Not Found Error</h2>
    </div>
  );
}
