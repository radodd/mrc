import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    firstname,
    lastname,
    phonenumber,
    email,
    position,
    company,
    message,
  } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["danny4004@gmail.com"],
      subject: "Hello world",
      text: "Hello world",
      react: EmailTemplate({
        firstname,
        lastname,
        phonenumber,
        email,
        position,
        company,
        message,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
