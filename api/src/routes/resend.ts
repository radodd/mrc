import express from "express";
import * as ResendController from "../controllers/resend";
import { Resend } from "resend";
import { send } from "../controllers/resend"

const router = express.Router();

router.post("/send-email", send);

router.post("/", ResendController.send);
router.get("/test", async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Test email",
      html: "<strong>This is a test email.</strong>",
    });

    if (error) {
      console.error("Error sending test email:", error);
      return res.status(400).json({ error });
    }

    console.log("Test email sent successfully:", data);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
