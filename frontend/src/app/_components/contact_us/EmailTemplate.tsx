import * as React from "react";
import { Html, Button } from "@react-email/components";

export function EmailTemplate({
  firstName,
  lastName,
  email,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  return (
    <Html lang="en">
      <h1 className="text-lg font-bold text-red-700">DO NOT REPLY TO THIS EMAIL. Send response to {email}.</h1>
      <h2 className="text-lg">
        &apos;{firstName} {lastName}&apos; says:
      </h2>
      <p>{message}</p>
    </Html>
  );
}

export default EmailTemplate;
