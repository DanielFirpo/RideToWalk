import { z } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "../../_components/contact_us/EmailTemplate";

const contactFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = contactFormSchema.safeParse(data);

    if (result.success && result.data.honeypot === "") {
      const resend = new Resend(process.env.RESEND_KEY);

      const email = await resend.emails.send({
        from: `${result.data.firstName} ${result.data.lastName} <${process.env.CONTACT_FORM_FROM_ADDRESS}>`,
        to: [process.env.CONTACT_FORM_TO_ADDRESS ?? ""],
        subject: `New RideToWalk.org Contact Form Submission from '${result.data.firstName} ${result.data.lastName}' <${result.data.email}>`,
        react: (
          <EmailTemplate
            firstName={result.data.firstName}
            lastName={result.data.lastName}
            email={result.data.email}
            message={result.data.message}
          ></EmailTemplate>
        ),
        headers: {
          "X-Entity-Ref-ID": "123456789",
        },
        tags: [
          {
            name: "category",
            value: "contact_email",
          },
        ],
      });
      console.log(JSON.stringify(email));
    } else {
      return new Response("Failed", { status: 500 });
    }

    return new Response("Success", { status: 200 });
  } catch {
    return new Response("Failed", { status: 500 });
  }
}
