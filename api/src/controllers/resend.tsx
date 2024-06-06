import { Request, Response } from "express";
import { Resend } from "resend";
import EmailTemplate from "../../../src/components/EmailTemplate";
import ReactDOMServer from "react-dom/server";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY); // Replace with your actual API key
// const form = "Acrme <onboarding@resend.dev>"
export const send = async (req: Request, res: Response) => {
  const {
    from, // Ensure the 'from' field is included in the request body
    to,
    subject,
    firstname,
    lastname,
    phonenumber,
    email,
    position,
    company,
    message,
  } = req.body;

  if (
    !from ||
    !to ||
    !subject ||
    !firstname ||
    !lastname ||
    !phonenumber ||
    !email ||
    !position ||
    !company ||
    !message
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate
      firstname={firstname}
      lastname={lastname}
      phonenumber={phonenumber}
      email={email}
      position={position}
      company={company}
      message={message}
    />
  );

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: emailHtml,
    });

    if (error) {
      return res.status(400).json({ error });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
