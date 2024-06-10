import { Button as ButtonType } from "@pageSectionTypes/Button";
import Link from "next/link";
import { Button as ButtonComponent } from "../shadcn/button";

export default async function Button(props: { sectionData: ButtonType }) {
  return (
    <section>
      <Link href={props.sectionData.link.linkAddress} target="_blank">
        <ButtonComponent className="ml-14 mr-14" variant="secondary">
          {props.sectionData.link.linkText}
        </ButtonComponent>
      </Link>
    </section>
  );
}
