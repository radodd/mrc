const { Request, Response } = require("express");
const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (req: Request, res: Response) => {
  console.log("Incoming request body:", req.body);
  // @ts-ignore.
  const { from, to, subject, html } = req.body;

  if (!from || !to || !subject || !html) {
    // @ts-ignore
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      // @ts-ignore
      return res.status(400).json({ error });
    }

    console.log("Email sent successfully:", data);
    // @ts-ignore
    res.status(200).json({ data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
};
